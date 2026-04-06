/**
 * Import design tokens from Figma format
 */

import {
  type Palette,
  type RGBColor,
  type TokenSet,
  type HSLString,
  type FigmaVariable,
  type ValidationResult,
  type SyncError,
  rgbToHSL,
  isSemanticTokenName,
  type SemanticTokenName,
  SEMANTIC_TOKEN_NAMES,
} from './types';

/**
 * Parse Figma variable name to extract components
 * Expected format: launchapp/{palette}/{variant}/{tokenName}
 */
export function parseFigmaVariableName(variableName: string): {
  palette: string;
  variant: 'light' | 'dark';
  tokenName: SemanticTokenName;
} | null {
  const parts = variableName.split('/');
  if (parts.length !== 4 || parts[0] !== 'launchapp') {
    return null;
  }

  const [, palette, variant, tokenName] = parts;

  if (variant !== 'light' && variant !== 'dark') {
    return null;
  }

  if (!isSemanticTokenName(tokenName)) {
    return null;
  }

  return { palette, variant, tokenName };
}

/**
 * Extract HSL from Figma RGB color value
 */
export function convertFigmaRGBToHSL(rgb: RGBColor): HSLString {
  return rgbToHSL(rgb);
}

/**
 * Validate imported Figma variables
 */
export function validateFigmaVariables(
  variables: FigmaVariable[]
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!Array.isArray(variables) || variables.length === 0) {
    return {
      valid: false,
      errors: ['No variables provided'],
      warnings,
    };
  }

  const parsedVariables = new Map<string, { palette: string; variant: 'light' | 'dark'; tokenName: string }>();
  const paletteMap = new Map<string, { light: Set<SemanticTokenName>; dark: Set<SemanticTokenName> }>();

  for (const variable of variables) {
    if (variable.resolvedType !== 'COLOR') {
      warnings.push(
        `Skipping non-color variable: ${variable.name} (type: ${variable.resolvedType})`
      );
      continue;
    }

    const parsed = parseFigmaVariableName(variable.name);
    if (!parsed) {
      warnings.push(`Skipping variable with unexpected name format: ${variable.name}`);
      continue;
    }

    parsedVariables.set(variable.id, parsed);

    // Track palettes and their token coverage
    if (!paletteMap.has(parsed.palette)) {
      paletteMap.set(parsed.palette, {
        light: new Set(),
        dark: new Set(),
      });
    }

    const palette = paletteMap.get(parsed.palette) as { light: Set<string>; dark: Set<string> };
    palette[parsed.variant].add(parsed.tokenName);
  }

  // Validate that all required tokens are present for each palette variant
  for (const [paletteName, variants] of paletteMap) {
    const requiredTokens = new Set(SEMANTIC_TOKEN_NAMES);

    const lightTokens = variants.light;
    const darkTokens = variants.dark;

    for (const tokenName of requiredTokens) {
      if (!lightTokens.has(tokenName)) {
        warnings.push(
          `[${paletteName}] Missing light variant token: ${tokenName}`
        );
      }
      if (!darkTokens.has(tokenName)) {
        warnings.push(
          `[${paletteName}] Missing dark variant token: ${tokenName}`
        );
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Convert Figma variables to internal TokenSet format
 */
export function convertFigmaVariablesToTokenSet(
  variables: FigmaVariable[],
  modeId: string
): { tokenSet: TokenSet; errors: SyncError[] } | null {
  const errors: SyncError[] = [];
  const tokens: Partial<TokenSet> = {};

  for (const variable of variables) {
    if (variable.resolvedType !== 'COLOR') {
      continue;
    }

    const parsed = parseFigmaVariableName(variable.name);
    if (!parsed) {
      continue;
    }

    const colorValue = variable.valuesByMode[modeId];
    if (!colorValue || typeof colorValue === 'string' || typeof colorValue === 'number' || typeof colorValue === 'boolean') {
      errors.push({
        code: 'INVALID_COLOR_VALUE',
        message: `Invalid color value for variable`,
        context: {
          token: variable.name,
        },
      });
      continue;
    }

    const hsl = convertFigmaRGBToHSL(colorValue as RGBColor);
    tokens[parsed.tokenName] = hsl;
  }

  if (Object.keys(tokens).length === 0) {
    return null;
  }

  return {
    tokenSet: tokens as TokenSet,
    errors,
  };
}

/**
 * Import Figma variables and create Palette objects
 */
export function importFigmaVariablesToPalettes(
  variables: FigmaVariable[],
  lightModeId: string = 'default',
  darkModeId: string = 'dark'
): { palettes: Palette[]; errors: SyncError[] } {
  const errors: SyncError[] = [];
  const paletteMap = new Map<string, Partial<Palette>>();

  // Group variables by palette
  for (const variable of variables) {
    if (variable.resolvedType !== 'COLOR') {
      continue;
    }

    const parsed = parseFigmaVariableName(variable.name);
    if (!parsed) {
      continue;
    }

    if (!paletteMap.has(parsed.palette)) {
      paletteMap.set(parsed.palette, {
        name: parsed.palette,
        label: parsed.palette.charAt(0).toUpperCase() + parsed.palette.slice(1),
        tokens: {
          light: {} as unknown as TokenSet,
          dark: {} as unknown as TokenSet,
        },
      });
    }

    const palette = paletteMap.get(parsed.palette) as NonNullable<ReturnType<typeof paletteMap.get>>;
    const modeId = parsed.variant === 'light' ? lightModeId : darkModeId;
    const colorValue = variable.valuesByMode[modeId];

    if (!colorValue || typeof colorValue === 'string' || typeof colorValue === 'number' || typeof colorValue === 'boolean') {
      errors.push({
        code: 'INVALID_COLOR_VALUE',
        message: `Invalid color value for variable`,
        context: {
          palette: parsed.palette,
          token: parsed.tokenName,
        },
      });
      continue;
    }

    const hsl = convertFigmaRGBToHSL(colorValue as RGBColor);
    if (!palette.tokens) {
      palette.tokens = { light: {} as unknown as TokenSet, dark: {} as unknown as TokenSet };
    }

    const variantTokens = palette.tokens?.[parsed.variant];
    if (variantTokens) {
      variantTokens[parsed.tokenName] = hsl;
    }
  }

  // Convert to Palette objects
  const palettes: Palette[] = [];
  for (const [, paletteData] of paletteMap) {
    if (paletteData.name && paletteData.tokens?.light && paletteData.tokens.dark) {
      palettes.push({
        name: paletteData.name,
        label: paletteData.label || paletteData.name,
        tokens: {
          light: paletteData.tokens.light as TokenSet,
          dark: paletteData.tokens.dark as TokenSet,
        },
      });
    }
  }

  return { palettes, errors };
}

/**
 * Validate imported palettes against existing ones
 */
export interface PaletteComparison {
  palette: string;
  changes: {
    added: string[];
    modified: string[];
    removed: string[];
  };
}

export function comparePalettes(
  existing: Palette,
  imported: Palette
): PaletteComparison {
  const result: PaletteComparison = {
    palette: existing.name,
    changes: {
      added: [],
      modified: [],
      removed: [],
    },
  };

  // Compare light variant
  const existingLightTokens = Object.entries(existing.tokens.light);
  const importedLightTokens = Object.entries(imported.tokens.light);

  for (const [tokenName] of importedLightTokens) {
    const existingValue = existing.tokens.light[tokenName as SemanticTokenName];
    const importedValue = imported.tokens.light[tokenName as SemanticTokenName];

    if (!existingValue) {
      result.changes.added.push(`light/${tokenName}`);
    } else if (existingValue !== importedValue) {
      result.changes.modified.push(`light/${tokenName}`);
    }
  }

  for (const [tokenName] of existingLightTokens) {
    if (!imported.tokens.light[tokenName as SemanticTokenName]) {
      result.changes.removed.push(`light/${tokenName}`);
    }
  }

  // Compare dark variant
  const existingDarkTokens = Object.entries(existing.tokens.dark);
  const importedDarkTokens = Object.entries(imported.tokens.dark);

  for (const [tokenName] of importedDarkTokens) {
    const existingValue = existing.tokens.dark[tokenName as SemanticTokenName];
    const importedValue = imported.tokens.dark[tokenName as SemanticTokenName];

    if (!existingValue) {
      result.changes.added.push(`dark/${tokenName}`);
    } else if (existingValue !== importedValue) {
      result.changes.modified.push(`dark/${tokenName}`);
    }
  }

  for (const [tokenName] of existingDarkTokens) {
    if (!imported.tokens.dark[tokenName as SemanticTokenName]) {
      result.changes.removed.push(`dark/${tokenName}`);
    }
  }

  return result;
}

/**
 * Detect destructive changes (removed tokens)
 */
export function hasDestructiveChanges(comparison: PaletteComparison): boolean {
  return comparison.changes.removed.length > 0;
}

/**
 * Generate a report of all changes
 */
export function generateImportReport(
  comparisons: PaletteComparison[]
): {
  totalPalettes: number;
  totalChanges: number;
  hasDestructive: boolean;
  summary: string;
} {
  let totalAdded = 0;
  let totalModified = 0;
  let totalRemoved = 0;
  let hasDestructive = false;

  for (const comparison of comparisons) {
    totalAdded += comparison.changes.added.length;
    totalModified += comparison.changes.modified.length;
    totalRemoved += comparison.changes.removed.length;

    if (hasDestructiveChanges(comparison)) {
      hasDestructive = true;
    }
  }

  const summary = `${totalAdded} added, ${totalModified} modified, ${totalRemoved} removed`;

  return {
    totalPalettes: comparisons.length,
    totalChanges: totalAdded + totalModified + totalRemoved,
    hasDestructive,
    summary,
  };
}
