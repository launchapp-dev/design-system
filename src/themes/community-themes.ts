export type CommunityThemeAuthor = {
  name: string;
  url?: string;
  email?: string;
};

export type CommunityThemeTokens = {
  "--la-background": string;
  "--la-foreground": string;
  "--la-card": string;
  "--la-card-foreground": string;
  "--la-popover": string;
  "--la-popover-foreground": string;
  "--la-primary": string;
  "--la-primary-foreground": string;
  "--la-secondary": string;
  "--la-secondary-foreground": string;
  "--la-muted": string;
  "--la-muted-foreground": string;
  "--la-accent": string;
  "--la-accent-foreground": string;
  "--la-destructive": string;
  "--la-destructive-foreground": string;
  "--la-border": string;
  "--la-input": string;
  "--la-ring": string;
};

export type CommunityThemeScreenshot = {
  url: string;
  caption?: string;
};

export type CommunityTheme = {
  id: string;
  name: string;
  description: string;
  author: CommunityThemeAuthor;
  version: string;
  license: string;
  previewColor?: string;
  keywords?: string[];
  repository?: string;
  screenshots?: CommunityThemeScreenshot[];
  tokens: {
    light: CommunityThemeTokens;
    dark: CommunityThemeTokens;
  };
};

export function validateHslValue(value: string): boolean {
  const hslRegex = /^(\d{1,3})\s+(\d{1,3})%\s+(\d{1,3})%$/;
  const match = value.match(hslRegex);
  if (!match) return false;

  const [, h, s, l] = match.map(Number);
  return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100;
}

export function validateCommunityTheme(theme: unknown): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!theme || typeof theme !== "object") {
    return { valid: false, errors: ["Theme must be an object"] };
  }

  const t = theme as Record<string, unknown>;

  if (typeof t.id !== "string" || !/^[a-z0-9-]+$/.test(t.id)) {
    errors.push("id must be a string with lowercase alphanumeric characters and hyphens");
  }

  if (typeof t.name !== "string" || t.name.length === 0) {
    errors.push("name must be a non-empty string");
  }

  if (typeof t.description !== "string" || t.description.length === 0) {
    errors.push("description must be a non-empty string");
  }

  if (!t.author || typeof t.author !== "object") {
    errors.push("author must be an object");
  } else {
    const author = t.author as Record<string, unknown>;
    if (typeof author.name !== "string" || author.name.length === 0) {
      errors.push("author.name must be a non-empty string");
    }
  }

  if (typeof t.version !== "string" || !/^\d+\.\d+\.\d+$/.test(t.version)) {
    errors.push("version must be a semantic version (e.g., 1.0.0)");
  }

  if (typeof t.license !== "string" || t.license.length === 0) {
    errors.push("license must be a non-empty string");
  }

  if (!t.tokens || typeof t.tokens !== "object") {
    errors.push("tokens must be an object");
  } else {
    const tokens = t.tokens as Record<string, unknown>;

    if (!tokens.light || typeof tokens.light !== "object") {
      errors.push("tokens.light must be an object");
    } else {
      validateTokenSet(tokens.light as Record<string, unknown>, "tokens.light", errors);
    }

    if (!tokens.dark || typeof tokens.dark !== "object") {
      errors.push("tokens.dark must be an object");
    } else {
      validateTokenSet(tokens.dark as Record<string, unknown>, "tokens.dark", errors);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function validateTokenSet(tokenSet: Record<string, unknown>, path: string, errors: string[]): void {
  const requiredTokens = [
    "--la-background",
    "--la-foreground",
    "--la-card",
    "--la-card-foreground",
    "--la-popover",
    "--la-popover-foreground",
    "--la-primary",
    "--la-primary-foreground",
    "--la-secondary",
    "--la-secondary-foreground",
    "--la-muted",
    "--la-muted-foreground",
    "--la-accent",
    "--la-accent-foreground",
    "--la-destructive",
    "--la-destructive-foreground",
    "--la-border",
    "--la-input",
    "--la-ring",
  ];

  for (const token of requiredTokens) {
    if (!tokenSet[token]) {
      errors.push(`${path} is missing required token: ${token}`);
    } else if (typeof tokenSet[token] !== "string") {
      errors.push(`${path}.${token} must be a string`);
    } else if (!validateHslValue(tokenSet[token] as string)) {
      errors.push(
        `${path}.${token} must be a valid HSL value (e.g., "262 83% 58%"), got "${tokenSet[token]}"`,
      );
    }
  }
}

export function getCommunityThemesCssString(theme: CommunityTheme): string {
  const renderTokens = (tokens: CommunityThemeTokens, selector: string) => {
    const entries = Object.entries(tokens)
      .map(([key, value]) => `    ${key}: ${value};`)
      .join("\n");
    return `  ${selector} {\n${entries}\n  }`;
  };

  return `@layer base {\n${renderTokens(
    theme.tokens.light,
    ":root",
  )}\n\n${renderTokens(theme.tokens.dark, ".dark")}\n}`;
}
