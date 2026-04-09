#!/usr/bin/env node
/**
 * generate-blocks-registry.mjs
 *
 * Scans src/blocks/ and ensures every block source file has an entry in
 * apps/docs/src/lib/blocks-registry.ts.  For any block that is missing,
 * a stub entry is appended with:
 *   - id        — kebab-case of the component filename
 *   - name      — human-readable split of the component name
 *   - description — placeholder (edit manually)
 *   - category  — inferred from the src/blocks/<category>/ directory name
 *   - sourcePath — relative path under src/blocks/
 *   - code       — minimal import snippet
 *
 * Flags:
 *   --check   Dry-run: exit 1 if any blocks are unregistered (for CI gates).
 *   --verbose Print extra detail.
 *
 * Usage:
 *   node apps/docs/scripts/generate-blocks-registry.mjs           # add stubs
 *   node apps/docs/scripts/generate-blocks-registry.mjs --check   # CI check
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const docsDir = resolve(__dirname, "..");
const repoRoot = resolve(docsDir, "../..");
const blocksSourceDir = resolve(repoRoot, "src/blocks");
const registryPath = resolve(docsDir, "src/lib/blocks-registry.ts");

const checkMode = process.argv.includes("--check");
const verbose = process.argv.includes("--verbose");

// ── Valid BlockCategory values (keep in sync with blocks-registry.ts) ─────────
const VALID_CATEGORIES = new Set([
  "auth", "dashboard", "settings", "navigation", "data", "ecommerce",
  "marketing", "app-shells", "admin", "app", "billing", "blog", "community",
  "errors", "files", "forms", "integrations", "landing", "messaging",
  "notifications", "onboarding", "search", "team",
]);

/**
 * Maps src/blocks directory names → BlockCategory values.
 * Directories that already match a valid category are handled automatically.
 */
const DIR_TO_CATEGORY = {
  activity: "dashboard",
  inbox: "messaging",
  layout: "app-shells",
  marketing: "marketing",
  metrics: "dashboard",
  profile: "community",
  project: "data",
  timeline: "data",
};

function inferCategory(dirName) {
  if (VALID_CATEGORIES.has(dirName)) return dirName;
  return DIR_TO_CATEGORY[dirName] ?? "app";
}

// ── Utilities ─────────────────────────────────────────────────────────────────

function toKebab(str) {
  return str
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/([a-z\d])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toReadableName(str) {
  // Insert space before each uppercase letter that follows a lowercase or digit
  return str
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .trim();
}

// ── Scan src/blocks/ for all block source files ───────────────────────────────

async function collectBlockSourceFiles() {
  const blocks = [];

  let categories;
  try {
    categories = await readdir(blocksSourceDir, { withFileTypes: true });
  } catch {
    console.error(`[error] Cannot read ${blocksSourceDir}`);
    process.exit(1);
  }

  for (const cat of categories) {
    if (!cat.isDirectory()) continue;
    const catDir = resolve(blocksSourceDir, cat.name);
    const entries = await readdir(catDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name === "index.ts" || entry.name === "index.tsx") continue;

      if (entry.isFile()) {
        if (
          !entry.name.endsWith(".tsx") && !entry.name.endsWith(".ts")
        ) continue;
        if (
          entry.name.includes(".stories.") ||
          entry.name.includes(".test.") ||
          entry.name.includes(".spec.")
        ) continue;
        blocks.push({
          category: cat.name,
          sourcePath: `${cat.name}/${entry.name}`,
          componentName: basename(entry.name, extname(entry.name)),
        });
      } else if (entry.isDirectory()) {
        const subDir = resolve(catDir, entry.name);
        const subEntries = await readdir(subDir, { withFileTypes: true });
        for (const subEntry of subEntries) {
          if (!subEntry.isFile()) continue;
          if (subEntry.name === "index.ts" || subEntry.name === "index.tsx") continue;
          if (
            subEntry.name.includes(".stories.") ||
            subEntry.name.includes(".test.") ||
            subEntry.name.includes(".spec.")
          ) continue;
          if (!subEntry.name.endsWith(".tsx") && !subEntry.name.endsWith(".ts")) continue;
          blocks.push({
            category: cat.name,
            sourcePath: `${cat.name}/${entry.name}/${subEntry.name}`,
            componentName: basename(subEntry.name, extname(subEntry.name)),
          });
        }
      }
    }
  }

  return blocks;
}

// ── Parse registered sourcePaths from blocks-registry.ts ─────────────────────

async function getRegisteredSourcePaths() {
  const content = await readFile(registryPath, "utf-8");
  const matches = [...content.matchAll(/sourcePath:\s*"([^"]+)"/g)];
  return new Set(matches.map((m) => m[1]));
}

// ── Build a stub entry for a new block ───────────────────────────────────────

function buildStub({ category, sourcePath, componentName }) {
  const id = toKebab(componentName);
  const name = toReadableName(componentName);
  const blockCategory = inferCategory(category);

  // Derive the import path from sourcePath:
  // e.g. "auth/LoginForm.tsx" → "@launchapp/design-system/blocks/auth"
  // e.g. "data/KanbanBoard/KanbanBoard.tsx" → "@launchapp/design-system/blocks/data"
  const importPath = `@launchapp/design-system/blocks/${category}`;

  const code = `import { ${componentName} } from "${importPath}";

export default function Page() {
  return <${componentName} />;
}`;

  return `  // AUTO-GENERATED STUB — update name, description, and code before merging
  {
    id: "${id}",
    name: "${name}",
    description: "TODO: Add a description for ${name}.",
    category: "${blockCategory}",
    sourcePath: "${sourcePath}",
    code: \`${code}\`,
  },`;
}

// ── Insert stubs into blocks-registry.ts ────────────────────────────────────

async function insertStubs(stubs) {
  const content = await readFile(registryPath, "utf-8");

  // Find the closing `];` of the `blocks` array.
  // The file ends with:
  //   ...last entry,
  // ];
  //
  // export function getBlocksByCategory ...
  const insertionPoint = content.lastIndexOf("\n];");
  if (insertionPoint === -1) {
    console.error("[error] Could not find closing `];` in blocks-registry.ts");
    process.exit(1);
  }

  const before = content.slice(0, insertionPoint);
  const after = content.slice(insertionPoint);

  const stubBlock = "\n\n  // ── NEW STUBS (auto-generated) ──\n" + stubs.join("\n") + "\n";
  const updated = before + stubBlock + after;

  await writeFile(registryPath, updated, "utf-8");
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const [allBlocks, registeredSourcePaths] = await Promise.all([
    collectBlockSourceFiles(),
    getRegisteredSourcePaths(),
  ]);

  const missing = allBlocks.filter((b) => !registeredSourcePaths.has(b.sourcePath));

  if (missing.length === 0) {
    console.log(`✓  blocks-registry.ts is up to date (${allBlocks.length} blocks, all registered).`);
    process.exit(0);
  }

  console.log(`Found ${missing.length} unregistered block(s):\n`);
  for (const b of missing) {
    const id = toKebab(b.componentName);
    console.log(`  • ${b.sourcePath}  →  id: "${id}"`);
  }
  console.log();

  if (checkMode) {
    console.error(
      "✗  blocks-registry.ts is out of date.\n" +
      "   Run: node apps/docs/scripts/generate-blocks-registry.mjs\n" +
      "   to add stubs for the missing entries, then fill in descriptions and code."
    );
    process.exit(1);
  }

  const stubs = missing.map(buildStub);
  await insertStubs(stubs);

  console.log(
    `✓  Added ${stubs.length} stub(s) to blocks-registry.ts.\n` +
    "   Edit the new entries (description, code) before merging."
  );

  if (verbose) {
    console.log("\nGenerated stubs:\n");
    for (const stub of stubs) {
      console.log(stub);
      console.log();
    }
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("[error]", err);
  process.exit(1);
});
