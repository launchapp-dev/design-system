/**
 * Export design tokens from code to Figma format
 */

import {
  Palette,
  TokenSyncExport,
  SyncMetadata,
  HSLString,
  ValidationResult,
  isValidHSL,
  hslToRGB,
  RGBColor,
  SyncError,
} from './types';

/**
 * Create metadata for the export
 */
export function createExportMetadata(
  figmaFileKey?: string,
  lastSyncBy?: string
): SyncMetadata {
  return {
    version: '1.0',
    timestamp: new Date().toISOString(),
    figmaFileKey,
    lastSyncBy,
    lastSyncAt: new Date().toISOString(),
  };
}

/**
 * Validate a palette structure before export
 */
export function validatePaletteForExport(palette: Palette): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate palette name
  if (!palette.name || palette.name.trim().length === 0) {
    errors.push('Palette name is required');
  }

  if (!/^[a-z0-9-]+$/.test(palette.name || '')) {
    errors.push(`Palette name must be lowercase alphanumeric with hyphens: "${palette.name}"`);
  }

  // Validate tokens structure
  if (!palette.tokens || !palette.tokens.light || !palette.tokens.dark) {
    errors.push('Palette must have both light and dark token sets');
    return { valid: false, errors, warnings };
  }

  // Validate all required token names exist
  const expectedTokens = [
    'background',
    'foreground',
    'card',
    'card-foreground',
    'popover',
    'popover-foreground',
    'primary',
    'primary-foreground',
    'secondary',
    'secondary-foreground',
    'muted',
    'muted-foreground',
    'accent',
    'accent-foreground',
    'destructive',
    'destructive-foreground',
    'border',
    'input',
    'ring',
  ];

  for (const tokenName of expectedTokens) {
    if (!palette.tokens.light[tokenName as keyof typeof palette.tokens.light]) {
      errors.push(`Missing light variant token: ${tokenName}`);
    }
    if (!palette.tokens.dark[tokenName as keyof typeof palette.tokens.dark]) {
      errors.push(`Missing dark variant token: ${tokenName}`);
    }
  }

  // Validate HSL format for all tokens
  const validateTokenSet = (
    tokens: Record<string, HSLString>,
    variant: 'light' | 'dark'
  ) => {
    for (const [tokenName, value] of Object.entries(tokens)) {
      if (!isValidHSL(value)) {
        errors.push(
          `Invalid HSL format in ${variant} variant, token "${tokenName}": "${value}"`
        );
      }
    }
  };

  validateTokenSet(palette.tokens.light, 'light');
  validateTokenSet(palette.tokens.dark, 'dark');

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate all palettes before export
 */
export function validatePalettesForExport(palettes: Palette[]): ValidationResult {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];

  if (!palettes || palettes.length === 0) {
    return {
      valid: false,
      errors: ['At least one palette is required'],
      warnings: [],
    };
  }

  for (const palette of palettes) {
    const result = validatePaletteForExport(palette);
    if (!result.valid) {
      allErrors.push(...result.errors.map((e) => `[${palette.name}] ${e}`));
    }
    allWarnings.push(...result.warnings);
  }

  // Check for duplicate palette names
  const names = new Set<string>();
  for (const palette of palettes) {
    if (names.has(palette.name)) {
      allErrors.push(`Duplicate palette name: "${palette.name}"`);
    }
    names.add(palette.name);
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
  };
}

/**
 * Create the export format for sending to Figma
 */
export function exportPalettesToTokenSet(
  palettes: Palette[],
  figmaFileKey?: string,
  lastSyncBy?: string
): TokenSyncExport {
  return {
    metadata: createExportMetadata(figmaFileKey, lastSyncBy),
    palettes,
  };
}

/**
 * Convert HSL tokens to Figma variable format
 */
export interface FigmaVariableValue {
  type: 'COLOR';
  value: RGBColor;
}

export function convertToFigmaVariableValue(hsl: string): FigmaVariableValue | null {
  const rgb = hslToRGB(hsl);
  if (!rgb) return null;

  return {
    type: 'COLOR',
    value: rgb,
  };
}

/**
 * Generate Figma variable name from semantic token
 * Format: launchapp/{palette}/{variant}/{tokenName}
 */
export function generateFigmaVariableName(
  palette: string,
  variant: 'light' | 'dark',
  token: string
): string {
  return `launchapp/${palette}/${variant}/${token}`;
}

/**
 * Generate Figma token set name
 * Format: launchapp-{palette}-{variant}
 */
export function generateFigmaTokenSetName(palette: string, variant: 'light' | 'dark'): string {
  return `launchapp-${palette}-${variant}`;
}

/**
 * Generate a complete export with Figma variable definitions
 */
export interface ExportWithFigmaVariables {
  export: TokenSyncExport;
  figmaVariables: Array<{
    tokenSetName: string;
    variableName: string;
    description: string;
    value: FigmaVariableValue;
  }>;
  errors: SyncError[];
}

export function generateFigmaExport(
  palettes: Palette[],
  figmaFileKey?: string,
  lastSyncBy?: string
): ExportWithFigmaVariables {
  const errors: SyncError[] = [];

  // Validate first
  const validation = validatePalettesForExport(palettes);
  if (!validation.valid) {
    for (const error of validation.errors) {
      errors.push({
        code: 'VALIDATION_ERROR',
        message: error,
      });
    }
  }

  const figmaVariables: ExportWithFigmaVariables['figmaVariables'] = [];

  for (const palette of palettes) {
    // Process light variant
    for (const [tokenName, hslValue] of Object.entries(palette.tokens.light)) {
      const figmaValue = convertToFigmaVariableValue(hslValue);
      if (!figmaValue) {
        errors.push({
          code: 'HSL_CONVERSION_ERROR',
          message: `Failed to convert HSL value for token`,
          context: {
            palette: palette.name,
            token: tokenName,
            value: hslValue,
          },
        });
        continue;
      }

      figmaVariables.push({
        tokenSetName: generateFigmaTokenSetName(palette.name, 'light'),
        variableName: generateFigmaVariableName(palette.name, 'light', tokenName),
        description: `[${palette.label}] Light variant - ${tokenName}`,
        value: figmaValue,
      });
    }

    // Process dark variant
    for (const [tokenName, hslValue] of Object.entries(palette.tokens.dark)) {
      const figmaValue = convertToFigmaVariableValue(hslValue);
      if (!figmaValue) {
        errors.push({
          code: 'HSL_CONVERSION_ERROR',
          message: `Failed to convert HSL value for token`,
          context: {
            palette: palette.name,
            token: tokenName,
            value: hslValue,
          },
        });
        continue;
      }

      figmaVariables.push({
        tokenSetName: generateFigmaTokenSetName(palette.name, 'dark'),
        variableName: generateFigmaVariableName(palette.name, 'dark', tokenName),
        description: `[${palette.label}] Dark variant - ${tokenName}`,
        value: figmaValue,
      });
    }
  }

  return {
    export: exportPalettesToTokenSet(palettes, figmaFileKey, lastSyncBy),
    figmaVariables,
    errors,
  };
}

/**
 * Generate Figma Tokens plugin-compatible JSON
 * See: https://tokens.studio/
 */
export function generateTokensPluginFormat(
  palettes: Palette[]
): Record<string, Record<string, Record<string, unknown>>> {
  const result: Record<string, Record<string, Record<string, unknown>>> = {};

  for (const palette of palettes) {
    // Light theme
    const lightKey = `${palette.name}-light`;
    result[lightKey] = {
      colors: {},
    };

    for (const [tokenName, hslValue] of Object.entries(palette.tokens.light)) {
      const rgb = hslToRGB(hslValue);
      if (rgb) {
        // Convert RGB to hex
        const hex = rgbToHex(rgb);
        (result[lightKey].colors as Record<string, unknown>)[tokenName] = {
          value: hex,
          type: 'color',
          description: tokenName,
        };
      }
    }

    // Dark theme
    const darkKey = `${palette.name}-dark`;
    result[darkKey] = {
      colors: {},
    };

    for (const [tokenName, hslValue] of Object.entries(palette.tokens.dark)) {
      const rgb = hslToRGB(hslValue);
      if (rgb) {
        const hex = rgbToHex(rgb);
        (result[darkKey].colors as Record<string, unknown>)[tokenName] = {
          value: hex,
          type: 'color',
          description: tokenName,
        };
      }
    }
  }

  return result;
}

/**
 * Helper to convert RGB to hex format
 */
function rgbToHex(rgb: RGBColor): string {
  const toHex = (n: number): string => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}
