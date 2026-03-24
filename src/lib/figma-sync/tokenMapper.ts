import {
  DesignToken,
  DesignTokenValue,
  FigmaTokenSet,
  FigmaTokenValue,
  TokenCategory,
} from "./types";

/**
 * Maps between Figma token format and design system token format
 */

const FIGMA_TYPE_TO_CATEGORY: Record<string, TokenCategory> = {
  color: "color",
  typography: "typography",
  sizing: "sizing",
  spacing: "spacing",
  borderRadius: "border-radius",
  shadow: "shadow",
  opacity: "opacity",
};

export class TokenMapper {
  /**
   * Convert Figma token set to design system tokens
   */
  static figmaToDesignTokens(
    figmaTokens: FigmaTokenSet,
    fileKey: string
  ): DesignToken[] {
    return Object.entries(figmaTokens).map(([tokenName, tokenValue]) =>
      TokenMapper.figmaTokenToDesignToken(tokenName, tokenValue, fileKey)
    );
  }

  /**
   * Convert a single Figma token to design system token
   */
  private static figmaTokenToDesignToken(
    tokenName: string,
    figmaValue: FigmaTokenValue,
    fileKey: string
  ): DesignToken {
    const category = TokenMapper.inferCategory(figmaValue.type, tokenName);

    return {
      name: TokenMapper.normalizeName(tokenName),
      category,
      value: TokenMapper.extractValue(figmaValue),
      description: figmaValue.description,
      deprecated: false,
    };
  }

  /**
   * Convert design system tokens to Figma token set format
   */
  static designTokensToFigma(tokens: DesignToken[]): FigmaTokenSet {
    const figmaTokens: FigmaTokenSet = {};

    for (const token of tokens) {
      figmaTokens[TokenMapper.figmaTokenName(token.name)] = {
        value: TokenMapper.valueToFigmaValue(token.value),
        type: TokenMapper.categoryToFigmaType(token.category),
        description: token.description,
      };
    }

    return figmaTokens;
  }

  /**
   * Extract value from Figma token, handling both single and dual-mode tokens
   */
  private static extractValue(
    figmaValue: FigmaTokenValue
  ): string | number | DesignTokenValue {
    // Check if token has light/dark variations in extensions
    if (
      figmaValue.$extensions?.["com.figma.design"] &&
      typeof figmaValue.$extensions["com.figma.design"] === "object"
    ) {
      const ext = figmaValue.$extensions["com.figma.design"] as Record<
        string,
        unknown
      >;
      if (ext.light !== undefined && ext.dark !== undefined) {
        return {
          light: ext.light,
          dark: ext.dark,
        };
      }
    }

    return figmaValue.value;
  }

  /**
   * Infer token category from Figma type
   */
  private static inferCategory(
    figmaType: string,
    tokenName: string
  ): TokenCategory {
    const type = figmaType.toLowerCase();

    // Direct mapping
    if (type in FIGMA_TYPE_TO_CATEGORY) {
      return FIGMA_TYPE_TO_CATEGORY[type];
    }

    // Heuristic: check token name for hints
    const lowerName = tokenName.toLowerCase();
    if (lowerName.includes("color")) return "color";
    if (lowerName.includes("font") || lowerName.includes("text"))
      return "typography";
    if (lowerName.includes("space") || lowerName.includes("gap"))
      return "spacing";
    if (lowerName.includes("size")) return "sizing";
    if (lowerName.includes("radius")) return "border-radius";
    if (lowerName.includes("shadow")) return "shadow";
    if (lowerName.includes("opacity")) return "opacity";

    return "other";
  }

  /**
   * Normalize token name to design system convention (--la-*)
   */
  private static normalizeName(figmaName: string): string {
    // Convert from Figma naming (e.g., "Primary/Color") to CSS custom property (--la-primary-color)
    const parts = figmaName
      .split("/")
      .map((p) => p.trim().toLowerCase().replace(/\s+/g, "-"));

    const normalized = parts.join("-");
    return `--la-${normalized}`;
  }

  /**
   * Convert design system token name to Figma format
   */
  private static figmaTokenName(dsName: string): string {
    // Remove --la- prefix if present and convert to Figma path format
    let name = dsName.startsWith("--la-")
      ? dsName.substring(5)
      : dsName.substring(2);

    // Convert kebab-case to PascalCase with slashes
    const parts = name.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1));

    return parts.join("/");
  }

  /**
   * Convert token value to Figma value
   */
  private static valueToFigmaValue(
    value: string | number | DesignTokenValue
  ): unknown {
    if (typeof value === "object" && "light" in value && "dark" in value) {
      // For dual-mode tokens, store in extensions
      return value.light; // Primary value, dark variant goes in extensions
    }

    return value;
  }

  /**
   * Get Figma type from token category
   */
  private static categoryToFigmaType(category: TokenCategory): string {
    const typeMap: Record<TokenCategory, string> = {
      color: "COLOR",
      typography: "TYPOGRAPHY",
      spacing: "SIZING",
      sizing: "SIZING",
      "border-radius": "BORDER_RADIUS",
      shadow: "SHADOW",
      opacity: "OPACITY",
      other: "OTHER",
    };

    return typeMap[category];
  }

  /**
   * Validate token compatibility between systems
   */
  static validateTokenCompatibility(
    dsToken: DesignToken
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate name format
    if (!dsToken.name.startsWith("--la-")) {
      errors.push(`Token name must start with '--la-': ${dsToken.name}`);
    }

    // Validate category
    if (!Object.values(FIGMA_TYPE_TO_CATEGORY).includes(dsToken.category)) {
      errors.push(`Invalid token category: ${dsToken.category}`);
    }

    // Validate value for color tokens
    if (dsToken.category === "color") {
      if (!TokenMapper.isValidColor(dsToken.value)) {
        errors.push(`Invalid color value for ${dsToken.name}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Check if a value is a valid CSS color
   */
  private static isValidColor(value: unknown): boolean {
    if (typeof value === "string") {
      // Check hex, rgb, hsl, or CSS color name
      const colorRegex =
        /^(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{8}|rgb|hsl|var\(|\w+).*$/;
      return colorRegex.test(value);
    }

    return false;
  }
}
