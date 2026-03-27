/**
 * Figma token synchronization module
 * Enables bidirectional sync between code design tokens and Figma
 */

// Export types
export * from './types';

// Export export utilities
export {
  createExportMetadata,
  validatePaletteForExport,
  validatePalettesForExport,
  exportPalettesToTokenSet,
  convertToFigmaVariableValue,
  generateFigmaVariableName,
  generateFigmaTokenSetName,
  generateFigmaExport,
  generateTokensPluginFormat,
  type FigmaVariableValue,
  type ExportWithFigmaVariables,
} from './export';

// Export import utilities
export {
  parseFigmaVariableName,
  convertFigmaRGBToHSL,
  validateFigmaVariables,
  convertFigmaVariablesToTokenSet,
  importFigmaVariablesToPalettes,
  comparePalettes,
  hasDestructiveChanges,
  generateImportReport,
  type PaletteComparison,
} from './import';
