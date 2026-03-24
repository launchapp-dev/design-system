/**
 * JSON Schema for design system tokens that are synced with Figma
 *
 * This schema defines the structure and validation rules for tokens
 * that can be bidirectionally synced between Figma and the design system.
 */

export const DESIGN_TOKEN_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "LaunchApp Design System Tokens",
  description:
    "Design tokens for the LaunchApp design system, synced with Figma",
  type: "object",

  definitions: {
    token: {
      type: "object",
      required: ["name", "category", "value"],
      properties: {
        name: {
          type: "string",
          pattern: "^--la-[a-z0-9-]+$",
          description: 'Token name in CSS custom property format (--la-*)',
        },
        category: {
          type: "string",
          enum: [
            "color",
            "typography",
            "spacing",
            "sizing",
            "border-radius",
            "shadow",
            "opacity",
            "other",
          ],
          description: "Token category for grouping and processing",
        },
        value: {
          oneOf: [
            { type: "string" },
            { type: "number" },
            {
              type: "object",
              required: ["light", "dark"],
              properties: {
                light: {
                  oneOf: [{ type: "string" }, { type: "number" }],
                },
                dark: {
                  oneOf: [{ type: "string" }, { type: "number" }],
                },
              },
            },
          ],
          description: "Token value (can be dual-mode for light/dark)",
        },
        description: {
          type: "string",
          description: "Human-readable description of the token",
        },
        deprecated: {
          type: "boolean",
          default: false,
          description: "Mark token as deprecated for removal",
        },
      },
    },

    colorToken: {
      allOf: [
        { $ref: "#/definitions/token" },
        {
          properties: {
            category: { const: "color" },
            value: {
              oneOf: [
                {
                  type: "string",
                  pattern:
                    "^(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{8}|rgb\\(|hsl\\(|var\\(|[a-z-]+).*$",
                },
                {
                  type: "object",
                  properties: {
                    light: {
                      type: "string",
                      pattern:
                        "^(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{8}|rgb\\(|hsl\\(|var\\(|[a-z-]+).*$",
                    },
                    dark: {
                      type: "string",
                      pattern:
                        "^(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{8}|rgb\\(|hsl\\(|var\\(|[a-z-]+).*$",
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    },

    spacingToken: {
      allOf: [
        { $ref: "#/definitions/token" },
        {
          properties: {
            category: { const: "spacing" },
            value: {
              oneOf: [
                {
                  type: "string",
                  pattern: "^\\d+(px|rem|em|%)$|^var\\(",
                },
                { type: "number" },
                {
                  type: "object",
                  properties: {
                    light: {
                      oneOf: [
                        { type: "string", pattern: "^\\d+(px|rem|em|%)$" },
                        { type: "number" },
                      ],
                    },
                    dark: {
                      oneOf: [
                        { type: "string", pattern: "^\\d+(px|rem|em|%)$" },
                        { type: "number" },
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    },

    typographyToken: {
      allOf: [
        { $ref: "#/definitions/token" },
        {
          properties: {
            category: { const: "typography" },
            value: {
              oneOf: [
                { type: "string" },
                {
                  type: "object",
                  properties: {
                    light: { type: "string" },
                    dark: { type: "string" },
                  },
                },
              ],
            },
          },
        },
      ],
    },
  },

  properties: {
    colors: {
      type: "object",
      title: "Color Tokens",
      additionalProperties: {
        $ref: "#/definitions/colorToken",
      },
    },

    spacing: {
      type: "object",
      title: "Spacing Tokens",
      additionalProperties: {
        $ref: "#/definitions/spacingToken",
      },
    },

    typography: {
      type: "object",
      title: "Typography Tokens",
      additionalProperties: {
        $ref: "#/definitions/typographyToken",
      },
    },

    sizing: {
      type: "object",
      title: "Sizing Tokens",
      additionalProperties: {
        $ref: "#/definitions/token",
      },
    },

    borderRadius: {
      type: "object",
      title: "Border Radius Tokens",
      additionalProperties: {
        $ref: "#/definitions/token",
      },
    },

    shadows: {
      type: "object",
      title: "Shadow Tokens",
      additionalProperties: {
        $ref: "#/definitions/token",
      },
    },

    opacity: {
      type: "object",
      title: "Opacity Tokens",
      additionalProperties: {
        $ref: "#/definitions/token",
      },
    },
  },
};

/**
 * Example token file structure
 */
export const EXAMPLE_TOKEN_FILE = {
  colors: {
    "--la-primary": {
      category: "color",
      value: {
        light: "hsl(262 83% 58%)",
        dark: "hsl(262 70% 60%)",
      },
      description: "Primary brand color",
    },
    "--la-destructive": {
      category: "color",
      value: "hsl(0 84% 60%)",
      description: "Color for destructive actions",
    },
  },

  spacing: {
    "--la-spacing-xs": {
      category: "spacing",
      value: "0.25rem",
      description: "Extra small spacing (4px)",
    },
    "--la-spacing-sm": {
      category: "spacing",
      value: "0.5rem",
      description: "Small spacing (8px)",
    },
    "--la-spacing-md": {
      category: "spacing",
      value: "1rem",
      description: "Medium spacing (16px)",
    },
  },

  typography: {
    "--la-font-base": {
      category: "typography",
      value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto",
      description: "Base font family",
    },
  },

  borderRadius: {
    "--la-radius-sm": {
      category: "border-radius",
      value: "0.375rem",
      description: "Small border radius (6px)",
    },
    "--la-radius-md": {
      category: "border-radius",
      value: "0.5rem",
      description: "Medium border radius (8px)",
    },
  },

  shadows: {
    "--la-shadow-sm": {
      category: "shadow",
      value: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      description: "Small shadow",
    },
    "--la-shadow-md": {
      category: "shadow",
      value:
        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      description: "Medium shadow",
    },
  },
};

/**
 * Validation utilities for token schemas
 */
export class TokenSchemaValidator {
  /**
   * Validate a token against the schema
   */
  static validateToken(token: unknown): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (typeof token !== "object" || token === null) {
      return { valid: false, errors: ["Token must be an object"] };
    }

    const t = token as Record<string, unknown>;

    // Validate required fields
    if (!t.name || typeof t.name !== "string") {
      errors.push("Token must have a string 'name' field");
    }
    if (!t.category || typeof t.category !== "string") {
      errors.push("Token must have a string 'category' field");
    }
    if (!t.value) {
      errors.push("Token must have a 'value' field");
    }

    // Validate name format
    if (t.name && typeof t.name === "string") {
      if (!/^--la-[a-z0-9-]+$/.test(t.name)) {
        errors.push(
          `Token name must match pattern '^--la-[a-z0-9-]+$': ${t.name}`
        );
      }
    }

    // Validate category
    const validCategories = [
      "color",
      "typography",
      "spacing",
      "sizing",
      "border-radius",
      "shadow",
      "opacity",
      "other",
    ];
    if (t.category && !validCategories.includes(t.category as string)) {
      errors.push(`Invalid category: ${t.category}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate multiple tokens
   */
  static validateTokens(tokens: unknown[]): {
    valid: boolean;
    errors: Map<number, string[]>;
  } {
    const errors = new Map<number, string[]>();
    let hasErrors = false;

    for (let i = 0; i < tokens.length; i++) {
      const result = TokenSchemaValidator.validateToken(tokens[i]);
      if (!result.valid) {
        errors.set(i, result.errors);
        hasErrors = true;
      }
    }

    return {
      valid: !hasErrors,
      errors,
    };
  }
}
