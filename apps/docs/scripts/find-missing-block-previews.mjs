#!/usr/bin/env node
/**
 * find-missing-block-previews.mjs
 *
 * Detects two classes of gaps:
 *   1. Block source files in src/blocks/ that are not registered in blocks-registry.ts
 *   2. Registered blocks that have no preview image in public/previews/
 *
 * Exit codes:
 *   0 — everything is in sync
 *   1 — gaps found (use --strict to enforce in CI)
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const docsDir = resolve(__dirname, "..");
const repoRoot = resolve(docsDir, "../..");
const blocksSourceDir = resolve(repoRoot, "src/blocks");
const previewsDir = resolve(docsDir, "public/previews");
const registryPath = resolve(docsDir, "src/lib/blocks-registry.ts");

const strict = process.argv.includes("--strict");

// ── helpers ──────────────────────────────────────────────────────────────────

/** Convert PascalCase or CamelCase to kebab-case */
function toKebab(str) {
  return str
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/([a-z\d])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// ── 1. Collect all block source files from src/blocks/ ───────────────────────

async function collectBlockSourcePaths() {
  const sourcePaths = [];

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

      if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts"))) {
        // Skip stories and test files
        if (entry.name.includes(".stories.") || entry.name.includes(".test.") || entry.name.includes(".spec.")) continue;
        // Direct flat file: category/Component.tsx
        sourcePaths.push(`${cat.name}/${entry.name}`);
      } else if (entry.isDirectory()) {
        // Subdirectory block: category/Component/Component.tsx
        const subDir = resolve(catDir, entry.name);
        const subEntries = await readdir(subDir, { withFileTypes: true });
        for (const subEntry of subEntries) {
          if (!subEntry.isFile()) continue;
          if (subEntry.name === "index.ts" || subEntry.name === "index.tsx") continue;
          if (subEntry.name.includes(".stories.") || subEntry.name.includes(".test.") || subEntry.name.includes(".spec.")) continue;
          if (subEntry.name.endsWith(".tsx") || subEntry.name.endsWith(".ts")) {
            sourcePaths.push(`${cat.name}/${entry.name}/${subEntry.name}`);
          }
        }
      }
    }
  }

  return sourcePaths;
}

// ── 2. Extract registered sourcePaths and block IDs from blocks-registry.ts ──

async function parseRegistry() {
  let content = await readFile(registryPath, "utf-8");

  // Strip template literal content so we don't match IDs inside code snippets.
  // Replace `...` template literal bodies with empty backtick pairs.
  const stripped = content.replace(/`[\s\S]*?`/g, "``");

  const sourcePathMatches = [...stripped.matchAll(/sourcePath:\s*"([^"]+)"/g)];
  const registeredSourcePaths = new Set(sourcePathMatches.map((m) => m[1]));

  // Match top-level block entry IDs: 4-space indent, id: "...", inside the blocks array
  const idMatches = [...stripped.matchAll(/^\s{4}id:\s*"([^"]+)"/gm)];
  const registeredIds = idMatches.map((m) => m[1]);

  return { registeredSourcePaths, registeredIds };
}

// ── 3. Check which block IDs have preview images ──────────────────────────────

async function collectPreviewIds() {
  const existing = new Set();
  try {
    const files = await readdir(previewsDir);
    for (const f of files) {
      if (f.endsWith(".png") || f.endsWith(".jpg") || f.endsWith(".webp")) {
        existing.add(f.replace(/\.[^.]+$/, ""));
      }
    }
  } catch {
    // previews dir might not exist yet
  }
  return existing;
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const [sourceFiles, { registeredSourcePaths, registeredIds }, previewIds] =
    await Promise.all([collectBlockSourcePaths(), parseRegistry(), collectPreviewIds()]);

  // Gap 1: source files not in registry
  const unregistered = sourceFiles.filter((sp) => !registeredSourcePaths.has(sp));

  // Gap 2: registered blocks missing a preview
  const missingPreviews = registeredIds.filter((id) => !previewIds.has(id));

  const hasGaps = unregistered.length > 0 || missingPreviews.length > 0;

  console.log("╔══════════════════════════════════════════════════════════════╗");
  console.log("║           blocks-registry gap report                        ║");
  console.log("╚══════════════════════════════════════════════════════════════╝\n");

  if (unregistered.length > 0) {
    console.log(`⚠  ${unregistered.length} block file(s) not in blocks-registry.ts:`);
    for (const sp of unregistered) {
      const componentName = basename(sp, extname(sp));
      const suggestedId = toKebab(componentName);
      console.log(`   • ${sp}  →  suggested id: "${suggestedId}"`);
    }
    console.log();
    console.log("   Run: node apps/docs/scripts/generate-blocks-registry.mjs");
    console.log("   to add stubs for the missing entries.\n");
  } else {
    console.log("✓  All source blocks are registered.\n");
  }

  if (missingPreviews.length > 0) {
    console.log(`⚠  ${missingPreviews.length} registered block(s) missing preview images:`);
    for (const id of missingPreviews) {
      console.log(`   • ${id}  →  public/previews/${id}.png`);
    }
    console.log();
    console.log("   Run: node apps/docs/scripts/capture-block-previews.mjs");
    console.log("   to regenerate previews.\n");
  } else {
    console.log(`✓  All ${registeredIds.length} registered blocks have previews.\n`);
  }

  console.log("─".repeat(64));
  console.log(`  Source blocks total  : ${sourceFiles.length}`);
  console.log(`  Registered blocks    : ${registeredSourcePaths.size}`);
  console.log(`  Preview images       : ${previewIds.size}`);
  console.log(`  Unregistered blocks  : ${unregistered.length}`);
  console.log(`  Missing previews     : ${missingPreviews.length}`);
  console.log("─".repeat(64));

  if (hasGaps && strict) {
    console.error("\n[strict] Gaps found. Exiting with code 1.");
    process.exit(1);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("[error]", err);
  process.exit(1);
});
