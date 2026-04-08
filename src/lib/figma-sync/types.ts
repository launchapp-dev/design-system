/**
 * Type definitions for Figma token synchronization
 * Supports bidirectional sync between code design tokens and Figma
 */

/**
 * HSL color format as stored in code: "262 83% 58%"
 */
export type HSLString = string & { readonly __hslBrand: true };

/**
 * RGB color format as returned by Figma API (0-1 normalized)
 */
export interface RGBColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * Semantic token names in the design system
 */
export type SemanticTokenName =
  | "background"
  | "foreground"
  | "card"
  | "card-foreground"
  | "popover"
  | "popover-foreground"
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "muted"
  | "muted-foreground"
  | "accent"
  | "accent-foreground"
  | "destructive"
  | "destructive-foreground"
  | "success"
  | "success-foreground"
  | "border"
  | "input"
  | "ring";

/**
 * A single token value mapping
 */
export interface Token {
  name: SemanticTokenName;
  value: HSLString;
  description?: string;
}

/**
 * Token set for a single theme variant (light/dark)
 */
export type TokenSet = Record<SemanticTokenName, HSLString>;

/**
 * Palette with light and dark variants
 */
export interface PaletteTokens {
  light: TokenSet;
  dark: TokenSet;
}

/**
 * Full palette definition with metadata
 */
export interface Palette {
  name: string;
  label: string;
  description?: string;
  tokens: PaletteTokens;
}

/**
 * Token sync metadata
 */
export interface SyncMetadata {
  version: string;
  timestamp: string; // ISO 8601
  figmaFileKey?: string;
  figmaFileId?: string;
  lastSyncBy?: string;
  lastSyncAt?: string;
}

/**
 * Export format for sending tokens to Figma
 */
export interface TokenSyncExport {
  metadata: SyncMetadata;
  palettes: Palette[];
}

/**
 * Figma variable definition
 */
export interface FigmaVariable {
  id: string;
  name: string;
  resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
  valuesByMode: Record<string, RGBColor | number | string | boolean>;
  description?: string;
}

/**
 * Figma token set (collection of variables)
 */
export interface FigmaTokenSet {
  id: string;
  name: string;
  variables: FigmaVariable[];
}

/**
 * Import data from Figma
 */
export interface FigmaImportData {
  tokenSetName: string;
  tokenSet: FigmaTokenSet;
  sourceFileKey: string;
  sourceFileName: string;
  importedAt: string;
}

/**
 * Sync result with change tracking
 */
export interface SyncResult {
  success: boolean;
  direction: "export" | "import";
  palettesAffected: string[];
  changesApplied: {
    added: number;
    modified: number;
    removed: number;
  };
  errors: SyncError[];
  warnings: string[];
  timestamp: string;
}

/**
 * Sync error details
 */
export interface SyncError {
  code: string;
  message: string;
  context?: {
    palette?: string;
    token?: string;
    value?: string;
  };
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Type guards
 */

export const SEMANTIC_TOKEN_NAMES: SemanticTokenName[] = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "success",
  "success-foreground",
  "border",
  "input",
  "ring",
];

/**
 * Check if a value is a valid SemanticTokenName
 */
export function isSemanticTokenName(value: unknown): value is SemanticTokenName {
  return typeof value === "string" && SEMANTIC_TOKEN_NAMES.includes(value as SemanticTokenName);
}

/**
 * Check if a string is valid HSL format
 * Expected format: "262 83% 58%"
 */
export function isValidHSL(value: string): boolean {
  const hslRegex = /^(\d{1,3})\s+(\d{1,3})%\s+(\d{1,3})%$/;
  if (!hslRegex.test(value)) {
    return false;
  }

  const match = value.match(hslRegex);
  if (!match) return false;

  const h = parseInt(match[1], 10);
  const s = parseInt(match[2], 10);
  const l = parseInt(match[3], 10);

  return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100;
}

/**
 * Create a branded HSL string
 */
export function createHSLString(hue: number, saturation: number, lightness: number): HSLString {
  return `${Math.round(hue)} ${Math.round(saturation)}% ${Math.round(lightness)}%` as HSLString;
}

/**
 * Parse HSL string to components
 */
export function parseHSL(hsl: string): { h: number; s: number; l: number } | null {
  const match = hsl.match(/^(\d{1,3})\s+(\d{1,3})%\s+(\d{1,3})%$/);
  if (!match) return null;

  return {
    h: parseInt(match[1], 10),
    s: parseInt(match[2], 10),
    l: parseInt(match[3], 10),
  };
}

/**
 * Convert HSL to RGB (0-1 normalized for Figma)
 */
export function hslToRGB(hsl: string): RGBColor | null {
  const parsed = parseHSL(hsl);
  if (!parsed) return null;

  const { h, s, l } = parsed;
  const h_normalized = h / 360;
  const s_normalized = s / 100;
  const l_normalized = l / 100;

  let r: number, g: number, b: number;

  if (s_normalized === 0) {
    r = g = b = l_normalized;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q =
      l_normalized < 0.5
        ? l_normalized * (1 + s_normalized)
        : l_normalized + s_normalized - l_normalized * s_normalized;
    const p = 2 * l_normalized - q;

    r = hue2rgb(p, q, h_normalized + 1 / 3);
    g = hue2rgb(p, q, h_normalized);
    b = hue2rgb(p, q, h_normalized - 1 / 3);
  }

  return { r, g, b, a: 1 };
}

/**
 * Convert RGB to HSL
 */
export function rgbToHSL(rgb: RGBColor): HSLString {
  const { r, g, b } = rgb;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number = 0;
  let s: number = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return createHSLString(h * 360, s * 100, l * 100);
}
