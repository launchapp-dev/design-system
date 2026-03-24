#!/usr/bin/env node

/**
 * Sync design tokens bidirectionally between Figma and the codebase
 *
 * Usage:
 *   npx ts-node scripts/sync-figma-tokens.ts --direction figma-to-code [--file-id <id>]
 *   npx ts-node scripts/sync-figma-tokens.ts --direction code-to-figma [--file-id <id>]
 *
 * Environment Variables (required):
 *   FIGMA_API_KEY - Figma API token
 *   GITHUB_TOKEN - GitHub API token
 *   FIGMA_FILE_ID - Figma file ID (can be overridden with --file-id)
 *
 * BLOCKED: This script requires HTTP MCP for:
 *   - Making HTTP requests to Figma API (https://api.figma.com)
 *   - Creating GitHub API requests
 *   - Handling webhook payloads from Figma
 */

import path from "path";
import { fileURLToPath } from "url";
import { FigmaTokenSync, TokenMapper } from "../src/lib/figma-sync/index";
import type { SyncConfig, TokenSyncEvent } from "../src/lib/figma-sync/index";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

type SyncDirection = "figma-to-code" | "code-to-figma" | "bidirectional";

interface CliOptions {
  direction: SyncDirection;
  fileId?: string;
  verbose?: boolean;
  dryRun?: boolean;
}

async function main() {
  try {
    const options = parseArguments();
    validateEnvironment();

    const config = buildSyncConfig();
    const syncer = new FigmaTokenSync(config);

    console.log(`🔄 Starting token sync: ${options.direction}`);

    if (options.dryRun) {
      console.log("📋 DRY RUN - no changes will be made");
    }

    const event = createSyncEvent(options);

    if (options.verbose) {
      console.log("📊 Sync event:", JSON.stringify(event, null, 2));
    }

    const result = await syncer.processSyncEvent(event);

    if (result.success) {
      console.log("✅ Sync completed successfully");
      console.log(`   Tokens processed: ${result.tokensProcessed}`);
      console.log(`   Created: ${result.tokensCreated}`);
      console.log(`   Updated: ${result.tokensUpdated}`);
      console.log(`   Deleted: ${result.tokensDeleted}`);

      if (result.prUrl) {
        console.log(`   PR: ${result.prUrl}`);
      }
      if (result.figmaUpdateUrl) {
        console.log(`   Figma: ${result.figmaUpdateUrl}`);
      }

      process.exit(0);
    } else {
      console.error("❌ Sync failed");
      for (const error of result.errors) {
        console.error(`   [${error.severity}] ${error.tokenName}: ${error.error}`);
      }
      process.exit(1);
    }
  } catch (error) {
    console.error(
      "💥 Error:",
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
}

function parseArguments(): CliOptions {
  const args = process.argv.slice(2);
  const options: CliOptions = {
    direction: "bidirectional",
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--direction" && i + 1 < args.length) {
      options.direction = args[++i] as SyncDirection;
    } else if (arg === "--file-id" && i + 1 < args.length) {
      options.fileId = args[++i];
    } else if (arg === "--verbose" || arg === "-v") {
      options.verbose = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    }
  }

  return options;
}

function validateEnvironment(): void {
  const required = ["FIGMA_API_KEY", "GITHUB_TOKEN"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing environment variables: ${missing.join(", ")}\n` +
        "Please set these before running the sync script."
    );
  }

  console.log("✓ Environment variables validated");
}

function buildSyncConfig(): SyncConfig {
  const figmaFileId = process.env.FIGMA_FILE_ID || "default";

  return {
    figmaApiKey: process.env.FIGMA_API_KEY!,
    githubToken: process.env.GITHUB_TOKEN!,
    githubRepo: process.env.GITHUB_REPO || "launchapp-dev/design-system",
    githubBranch: process.env.GITHUB_BRANCH || "main",
    figmaFiles: [
      {
        fileId: figmaFileId,
        fileName: process.env.FIGMA_FILE_NAME || "LaunchApp Design Tokens",
        libraryName: "@launchapp/design-system",
        syncEnabled: true,
      },
    ],
    autoCreatePRs: process.env.AUTO_CREATE_PRS !== "false",
    autoMergePRs: process.env.AUTO_MERGE_PRS === "true",
    prLabelPrefix: "chore",
  };
}

function createSyncEvent(options: CliOptions): TokenSyncEvent {
  return {
    id: `sync-${Date.now()}`,
    timestamp: Date.now(),
    source: options.direction.startsWith("figma") ? "figma" : "codebase",
    action: "update",
    tokens: [],
    metadata: {
      figmaFileId: process.env.FIGMA_FILE_ID,
      branch: process.env.GITHUB_BRANCH || "main",
      committedBy: process.env.GITHUB_ACTOR || "sync-bot",
    },
  };
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

export { main, parseArguments, validateEnvironment, buildSyncConfig };
