/**
 * Token sync types for bidirectional Figma<->Design System synchronization
 */

export interface DesignTokenValue {
  light: string | number;
  dark: string | number;
}

export interface DesignToken {
  name: string;
  category: TokenCategory;
  value: DesignTokenValue | string | number;
  description?: string;
  deprecated?: boolean;
}

export type TokenCategory =
  | "color"
  | "typography"
  | "spacing"
  | "sizing"
  | "border-radius"
  | "shadow"
  | "opacity"
  | "other";

export interface FigmaTokenSet {
  [tokenName: string]: FigmaTokenValue;
}

export interface FigmaTokenValue {
  value: string | number | Record<string, unknown>;
  type: string;
  description?: string;
  $extensions?: Record<string, unknown>;
}

export interface TokenSyncEvent {
  id: string;
  timestamp: number;
  source: "figma" | "codebase";
  action: "create" | "update" | "delete";
  tokens: DesignToken[];
  metadata: {
    figmaFileId?: string;
    figmaFileKey?: string;
    branch?: string;
    committedBy?: string;
  };
}

export interface SyncResult {
  success: boolean;
  tokensProcessed: number;
  tokensCreated: number;
  tokensUpdated: number;
  tokensDeleted: number;
  errors: SyncError[];
  prUrl?: string;
  figmaUpdateUrl?: string;
}

export interface SyncError {
  tokenName: string;
  error: string;
  severity: "error" | "warning";
}

export interface FigmaFileConfig {
  fileId: string;
  fileName: string;
  libraryName: string;
  syncEnabled: boolean;
  lastSyncDate?: number;
  tokenPageId?: string;
}

export interface SyncConfig {
  figmaApiKey: string;
  figmaFiles: FigmaFileConfig[];
  githubToken: string;
  githubRepo: string;
  githubBranch: string;
  autoCreatePRs: boolean;
  autoMergePRs: boolean;
  prLabelPrefix?: string;
}
