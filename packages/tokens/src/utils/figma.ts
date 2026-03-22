import type { FigmaTokensSchema, FigmaTokenGroup, ThemeTokens, ThemeConfig, FigmaTokenValue } from "../utils/types.js";
import { hexToHsl, hslToHex } from "../utils/color.js";

const TOKEN_PREFIX = "la-";

function flattenTokens(group: FigmaTokenGroup, prefix = ""): Map<string, string> {
  const result = new Map<string, string>();

  for (const [key, value] of Object.entries(group)) {
    const fullKey = prefix ? `${prefix}-${key}` : key;

    if (typeof value === "object" && value !== null && "value" in value) {
      result.set(fullKey, (value as FigmaTokenValue).value);
    } else if (typeof value === "object" && value !== null) {
      const nested = flattenTokens(value as FigmaTokenGroup, fullKey);
      for (const [k, v] of nested) {
        result.set(k, v);
      }
    }
  }

  return result;
}

function mapFigmaTokensToTheme(tokens: FigmaTokenGroup): ThemeTokens {
  const flat = flattenTokens(tokens);
  const get = (key: string): string => {
    const withPrefix = key.startsWith(TOKEN_PREFIX) ? key : `${TOKEN_PREFIX}${key}`;
    const withoutPrefix = key.replace(/^la-/, "");
    
    const candidates = [
      withPrefix,
      `colors-${withoutPrefix}`,
      `charts-${withoutPrefix}`,
      withoutPrefix,
      key,
    ];

    for (const candidate of candidates) {
      const value = flat.get(candidate);
      if (value) {
        if (value.startsWith("{") && value.endsWith("}")) {
          const ref = value.slice(1, -1);
          const resolved = flat.get(ref) || flat.get(`colors-${ref}`) || flat.get(`charts-${ref}`);
          if (resolved) {
            return resolved.startsWith("#") ? hexToHsl(resolved) : resolved;
          }
          return value;
        }
        return value.startsWith("#") ? hexToHsl(value) : value;
      }
    }
    return "";
  };

  return {
    colors: {
      background: get("background"),
      foreground: get("foreground"),
      card: get("card"),
      "card-foreground": get("card-foreground"),
      popover: get("popover"),
      "popover-foreground": get("popover-foreground"),
      primary: get("primary"),
      "primary-foreground": get("primary-foreground"),
      secondary: get("secondary"),
      "secondary-foreground": get("secondary-foreground"),
      muted: get("muted"),
      "muted-foreground": get("muted-foreground"),
      accent: get("accent"),
      "accent-foreground": get("accent-foreground"),
      destructive: get("destructive"),
      "destructive-foreground": get("destructive-foreground"),
      border: get("border"),
      input: get("input"),
      ring: get("ring"),
    },
    charts: {
      "chart-1": get("chart-1"),
      "chart-2": get("chart-2"),
      "chart-3": get("chart-3"),
      "chart-4": get("chart-4"),
      "chart-5": get("chart-5"),
    },
    radius: get("radius") || "0.5rem",
    fontSans: get("font-sans") || "Inter",
    fontMono: get("font-mono") || "JetBrains Mono",
  };
}

export function parseFigmaTokens(schema: FigmaTokensSchema): ThemeConfig {
  const light = schema["light"] || schema["Light"] || schema["global"] || schema["Global"] || {};
  const dark = schema["dark"] || schema["Dark"] || schema["global"] || schema["Global"] || {};

  return {
    light: mapFigmaTokensToTheme(light),
    dark: mapFigmaTokensToTheme(dark),
  };
}

function hslTokenValueToHex(hslValue: string): string {
  if (hslValue.startsWith("#")) {
    return hslValue;
  }
  try {
    return hslToHex(hslValue);
  } catch {
    return hslValue;
  }
}

export function themeToFigmaTokens(config: ThemeConfig): FigmaTokensSchema {
  const createToken = (value: string, type: "color" | "dimension" | "fontFamily" = "color") => ({
    value: type === "color" ? hslTokenValueToHex(value) : value,
    type,
  });

  const buildColorGroup = (colors: ThemeTokens["colors"]): FigmaTokenGroup => ({
    background: createToken(colors.background),
    foreground: createToken(colors.foreground),
    card: createToken(colors.card),
    "card-foreground": createToken(colors["card-foreground"]),
    popover: createToken(colors.popover),
    "popover-foreground": createToken(colors["popover-foreground"]),
    primary: createToken(colors.primary),
    "primary-foreground": createToken(colors["primary-foreground"]),
    secondary: createToken(colors.secondary),
    "secondary-foreground": createToken(colors["secondary-foreground"]),
    muted: createToken(colors.muted),
    "muted-foreground": createToken(colors["muted-foreground"]),
    accent: createToken(colors.accent),
    "accent-foreground": createToken(colors["accent-foreground"]),
    destructive: createToken(colors.destructive),
    "destructive-foreground": createToken(colors["destructive-foreground"]),
    border: createToken(colors.border),
    input: createToken(colors.input),
    ring: createToken(colors.ring),
  });

  const buildChartGroup = (charts: ThemeTokens["charts"]): FigmaTokenGroup => ({
    "chart-1": createToken(charts["chart-1"]),
    "chart-2": createToken(charts["chart-2"]),
    "chart-3": createToken(charts["chart-3"]),
    "chart-4": createToken(charts["chart-4"]),
    "chart-5": createToken(charts["chart-5"]),
  });

  const buildThemeGroup = (theme: ThemeTokens): FigmaTokenGroup => ({
    colors: buildColorGroup(theme.colors),
    charts: buildChartGroup(theme.charts),
    radius: createToken(theme.radius, "dimension"),
    "font-sans": createToken(theme.fontSans, "fontFamily"),
    "font-mono": createToken(theme.fontMono, "fontFamily"),
  });

  return {
    light: buildThemeGroup(config.light),
    dark: buildThemeGroup(config.dark),
  };
}
