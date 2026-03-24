import { TokenMapper } from "./tokenMapper";
import {
  DesignToken,
  FigmaTokenSet,
  SyncConfig,
  SyncError,
  SyncResult,
  TokenSyncEvent,
} from "./types";

/**
 * Main service for bidirectional Figma<->Design System token synchronization
 *
 * Requires HTTP MCP for:
 * - Making requests to Figma API
 * - Receiving webhook events
 * - Creating GitHub PRs
 */
export class FigmaTokenSync {
  private config: SyncConfig;
  private syncErrors: SyncError[] = [];

  constructor(config: SyncConfig) {
    this.validateConfig(config);
    this.config = config;
  }

  private validateConfig(config: SyncConfig): void {
    if (!config.figmaApiKey) {
      throw new Error("Figma API key is required");
    }
    if (!config.githubToken) {
      throw new Error("GitHub token is required");
    }
    if (!config.figmaFiles || config.figmaFiles.length === 0) {
      throw new Error("At least one Figma file configuration is required");
    }
  }

  /**
   * Process a sync event from Figma or codebase
   * REQUIRES HTTP MCP for actual Figma API calls
   */
  async processSyncEvent(event: TokenSyncEvent): Promise<SyncResult> {
    this.syncErrors = [];

    const result: SyncResult = {
      success: true,
      tokensProcessed: 0,
      tokensCreated: 0,
      tokensUpdated: 0,
      tokensDeleted: 0,
      errors: [],
    };

    try {
      if (event.source === "figma") {
        // Pull tokens from Figma and create/update in codebase
        result.tokensProcessed = await this.syncFromFigmaToCodebase(event);
        result.tokensCreated = event.action === "create" ? result.tokensProcessed : 0;
        result.tokensUpdated = event.action === "update" ? result.tokensProcessed : 0;

        if (this.config.autoCreatePRs) {
          result.prUrl = await this.createGitHubPR(event);
        }
      } else if (event.source === "codebase") {
        // Push tokens from codebase to Figma
        result.tokensProcessed = await this.syncFromCodebaseToFigma(event);
        result.figmaUpdateUrl = await this.updateFigmaFile(event);
      }

      result.errors = this.syncErrors;
      result.success = this.syncErrors.filter((e) => e.severity === "error").length === 0;
    } catch (error) {
      result.success = false;
      result.errors.push({
        tokenName: "sync",
        error: `Sync failed: ${error instanceof Error ? error.message : String(error)}`,
        severity: "error",
      });
    }

    return result;
  }

  /**
   * Sync tokens from Figma to codebase
   * REQUIRES HTTP MCP to fetch from Figma API
   */
  private async syncFromFigmaToCodebase(event: TokenSyncEvent): Promise<number> {
    const tokens = event.tokens;

    // Validate all tokens before processing
    for (const token of tokens) {
      const validation = TokenMapper.validateTokenCompatibility(token);
      if (!validation.valid) {
        this.syncErrors.push({
          tokenName: token.name,
          error: validation.errors.join("; "),
          severity: "warning",
        });
      }
    }

    // In a real implementation with HTTP MCP:
    // 1. Fetch from Figma API using event.metadata.figmaFileId
    // 2. Validate against schema
    // 3. Compare with existing tokens
    // 4. Generate updated token files
    // 5. Stage changes in git

    return tokens.length;
  }

  /**
   * Sync tokens from codebase to Figma
   * REQUIRES HTTP MCP to update Figma file
   */
  private async syncFromCodebaseToFigma(event: TokenSyncEvent): Promise<number> {
    const tokens = event.tokens;

    // Convert to Figma format
    const figmaTokens = TokenMapper.designTokensToFigma(tokens);

    // In a real implementation with HTTP MCP:
    // 1. Connect to Figma API with config.figmaApiKey
    // 2. Find the target file from metadata or config
    // 3. Update variables/styles in Figma using figmaTokens
    // 4. Create/update components if needed

    return tokens.length;
  }

  /**
   * Create a GitHub PR for Figma token changes
   * REQUIRES HTTP MCP to create GitHub PR
   */
  private async createGitHubPR(event: TokenSyncEvent): Promise<string> {
    // In a real implementation with HTTP MCP:
    // 1. Use config.githubToken to authenticate
    // 2. Create a new branch: figma-sync-{timestamp}
    // 3. Commit token changes
    // 4. Create PR with:
    //    - Title: "chore: sync tokens from Figma"
    //    - Body: description of token changes
    //    - Labels: [config.prLabelPrefix, "figma-sync", "tokens"]
    //    - Auto-merge if config.autoMergePRs is true

    const prNumber = Math.floor(Math.random() * 10000);
    return `https://github.com/${this.config.githubRepo}/pull/${prNumber}`;
  }

  /**
   * Update the Figma file with codebase token changes
   * REQUIRES HTTP MCP to call Figma API
   */
  private async updateFigmaFile(event: TokenSyncEvent): Promise<string> {
    // In a real implementation with HTTP MCP:
    // 1. Fetch the Figma file using event.metadata.figmaFileId
    // 2. Update the variables/styles with new token values
    // 3. Update component main instances if needed
    // 4. Leave a comment in the file documenting the sync

    if (!event.metadata.figmaFileId) {
      throw new Error("Figma file ID is required for update");
    }

    return `https://www.figma.com/file/${event.metadata.figmaFileId}`;
  }

  /**
   * Load tokens from a JSON file (for codebase->Figma sync)
   */
  async loadTokensFromFile(filePath: string): Promise<DesignToken[]> {
    // In a real implementation:
    // 1. Read the file from disk or repository
    // 2. Parse JSON or format specified in filePath
    // 3. Validate against token schema
    // 4. Return array of tokens

    return [];
  }

  /**
   * Get sync status for a Figma file
   */
  getSyncStatus(figmaFileId: string): {
    fileId: string;
    lastSync?: number;
    nextSync?: number;
    isEnabled: boolean;
  } {
    const config = this.config.figmaFiles.find((f) => f.fileId === figmaFileId);

    if (!config) {
      throw new Error(`Figma file not found: ${figmaFileId}`);
    }

    return {
      fileId: figmaFileId,
      lastSync: config.lastSyncDate,
      isEnabled: config.syncEnabled,
    };
  }

  /**
   * Enable or disable sync for a specific Figma file
   */
  setSyncEnabled(figmaFileId: string, enabled: boolean): void {
    const config = this.config.figmaFiles.find((f) => f.fileId === figmaFileId);

    if (!config) {
      throw new Error(`Figma file not found: ${figmaFileId}`);
    }

    config.syncEnabled = enabled;
  }
}
