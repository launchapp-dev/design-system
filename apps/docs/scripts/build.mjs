#!/usr/bin/env node
/**
 * Stable build script for Vercel deployments.
 *
 * Uses __dirname-based absolute paths instead of shell `cd` commands to avoid
 * intermittent failures caused by CWD-switching in Vercel's build environment.
 */
import { execSync } from "node:child_process";
import { copyFileSync, cpSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const docsDir = resolve(__dirname, "..");
const repoRoot = resolve(docsDir, "../..");
const registryScript = resolve(repoRoot, "scripts/generate-registry.mjs");
const registrySrc = resolve(repoRoot, "registry.json");
const registryDest = resolve(docsDir, "public/registry.json");

console.log("[build] repo root:", repoRoot);
console.log("[build] docs dir:", docsDir);

// Step 1: generate registry.json at repo root
console.log("[build] generating registry...");
execSync(`node ${registryScript}`, { cwd: repoRoot, stdio: "inherit" });

// Step 2: copy to docs public/
console.log("[build] copying registry.json → apps/docs/public/registry.json");
mkdirSync(resolve(docsDir, "public"), { recursive: true });
copyFileSync(registrySrc, registryDest);

// Step 3: next build (CWD must be docs dir so Next.js finds its config)
// Use `pnpm exec` to reliably resolve the next binary regardless of PATH
console.log("[build] running next build...");
execSync("pnpm exec next build", {
  cwd: docsDir,
  stdio: "inherit",
  env: { ...process.env },
});

// Step 4 (Vercel only): copy public/ to repo root so @vercel/next serves
// static assets (registry.json, theme-template.json) at the correct URLs.
// distDir is set to ../../.next on Vercel, so both .next and public/ land
// at the project root where the framework adapter expects them.
if (process.env.VERCEL) {
  console.log("[build] copying apps/docs/public/ → repo root public/");
  mkdirSync(resolve(repoRoot, "public"), { recursive: true });
  cpSync(resolve(docsDir, "public"), resolve(repoRoot, "public"), { recursive: true });
}
