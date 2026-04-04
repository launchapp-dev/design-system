/**
 * Figma token synchronization module
 * Enables bidirectional sync between code design tokens and Figma
 */

// Export export utilities
export {
  convertToFigmaVariableValue,
  createExportMetadata,
  type ExportWithFigmaVariables,
  exportPalettesToTokenSet,
  type FigmaVariableValue,
  generateFigmaExport,
  generateFigmaTokenSetName,
  generateFigmaVariableName,
  generateTokensPluginFormat,
  validatePaletteForExport,
  validatePalettesForExport,
} from "./export";
// Export import utilities
export {
  comparePalettes,
  convertFigmaRGBToHSL,
  convertFigmaVariablesToTokenSet,
  generateImportReport,
  hasDestructiveChanges,
  importFigmaVariablesToPalettes,
  type PaletteComparison,
  parseFigmaVariableName,
  validateFigmaVariables,
} from "./import";
// Export types
export * from "./types";
