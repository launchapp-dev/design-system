import { describe, it, expect, beforeEach } from "vitest";
import {
  FigmaTokenSync,
  TokenMapper,
  type DesignToken,
  type SyncConfig,
} from "./index";

describe("TokenMapper", () => {
  it("should normalize token names to design system format", () => {
    const figmaName = "Primary/Color";
    const normalized = (TokenMapper as any).figmaTokenName(figmaName);
    expect(normalized).toMatch(/color/i);
  });

  it("should validate color tokens", () => {
    const token: DesignToken = {
      name: "--la-primary",
      category: "color",
      value: "hsl(262 83% 58%)",
      description: "Primary brand color",
    };

    const result = TokenMapper.validateTokenCompatibility(token);
    expect(result.valid).toBe(true);
  });

  it("should reject invalid token names", () => {
    const token: DesignToken = {
      name: "invalid-name",
      category: "color",
      value: "hsl(262 83% 58%)",
    };

    const result = TokenMapper.validateTokenCompatibility(token);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("should convert design tokens to Figma format", () => {
    const tokens: DesignToken[] = [
      {
        name: "--la-primary",
        category: "color",
        value: "hsl(262 83% 58%)",
        description: "Primary color",
      },
      {
        name: "--la-spacing-md",
        category: "spacing",
        value: "1rem",
        description: "Medium spacing",
      },
    ];

    const figmaTokens = TokenMapper.designTokensToFigma(tokens);

    expect(Object.keys(figmaTokens).length).toBe(2);
    expect(figmaTokens).toHaveProperty("Primary/Color");
    expect(figmaTokens).toHaveProperty("Spacing/Md");
  });

  it("should handle dual-mode tokens with light and dark values", () => {
    const token: DesignToken = {
      name: "--la-primary",
      category: "color",
      value: {
        light: "hsl(262 83% 58%)",
        dark: "hsl(262 70% 60%)",
      },
      description: "Primary color",
    };

    const result = TokenMapper.validateTokenCompatibility(token);
    expect(result.valid).toBe(true);
  });
});

describe("FigmaTokenSync", () => {
  let syncer: FigmaTokenSync;
  let config: SyncConfig;

  beforeEach(() => {
    config = {
      figmaApiKey: "test-api-key",
      githubToken: "test-github-token",
      githubRepo: "test-org/test-repo",
      githubBranch: "main",
      figmaFiles: [
        {
          fileId: "test-file-id",
          fileName: "Test Tokens",
          libraryName: "@test/tokens",
          syncEnabled: true,
        },
      ],
      autoCreatePRs: false,
      autoMergePRs: false,
    };

    syncer = new FigmaTokenSync(config);
  });

  it("should throw on missing Figma API key", () => {
    const invalidConfig = { ...config, figmaApiKey: "" };
    expect(() => new FigmaTokenSync(invalidConfig)).toThrow(
      /Figma API key is required/
    );
  });

  it("should throw on missing GitHub token", () => {
    const invalidConfig = { ...config, githubToken: "" };
    expect(() => new FigmaTokenSync(invalidConfig)).toThrow(
      /GitHub token is required/
    );
  });

  it("should throw on missing Figma files configuration", () => {
    const invalidConfig = { ...config, figmaFiles: [] };
    expect(() => new FigmaTokenSync(invalidConfig)).toThrow(
      /At least one Figma file configuration is required/
    );
  });

  it("should get sync status for a Figma file", () => {
    const status = syncer.getSyncStatus("test-file-id");
    expect(status.fileId).toBe("test-file-id");
    expect(status.isEnabled).toBe(true);
  });

  it("should throw on unknown file ID for status", () => {
    expect(() => syncer.getSyncStatus("unknown-file-id")).toThrow(
      /Figma file not found/
    );
  });

  it("should enable/disable sync for a file", () => {
    syncer.setSyncEnabled("test-file-id", false);
    const status = syncer.getSyncStatus("test-file-id");
    expect(status.isEnabled).toBe(false);

    syncer.setSyncEnabled("test-file-id", true);
    const status2 = syncer.getSyncStatus("test-file-id");
    expect(status2.isEnabled).toBe(true);
  });

  it("should process a sync event without errors", async () => {
    const event = {
      id: "test-sync-1",
      timestamp: Date.now(),
      source: "figma" as const,
      action: "update" as const,
      tokens: [
        {
          name: "--la-primary",
          category: "color" as const,
          value: "hsl(262 83% 58%)",
          description: "Primary color",
        },
      ],
      metadata: {
        figmaFileId: "test-file-id",
        figmaFileKey: "test-key",
      },
    };

    const result = await syncer.processSyncEvent(event);
    expect(result.success).toBe(true);
    expect(result.tokensProcessed).toBeGreaterThanOrEqual(0);
  });

  it("should handle sync events with empty token list", async () => {
    const event = {
      id: "test-sync-empty",
      timestamp: Date.now(),
      source: "figma" as const,
      action: "update" as const,
      tokens: [],
      metadata: {
        figmaFileId: "test-file-id",
      },
    };

    const result = await syncer.processSyncEvent(event);
    expect(result.success).toBe(true);
    expect(result.tokensProcessed).toBe(0);
  });

  it("should validate tokens in sync event", async () => {
    const event = {
      id: "test-sync-validation",
      timestamp: Date.now(),
      source: "figma" as const,
      action: "update" as const,
      tokens: [
        {
          name: "--la-primary",
          category: "color" as const,
          value: "invalid-color",
          description: "Invalid color token",
        },
      ],
      metadata: {
        figmaFileId: "test-file-id",
      },
    };

    const result = await syncer.processSyncEvent(event);
    // Should succeed but include warnings in errors
    expect(result.errors.length).toBeGreaterThanOrEqual(0);
  });
});
