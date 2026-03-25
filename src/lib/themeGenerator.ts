import { createTheme, type ThemeResult, type ThemeTokens } from "../themes/createTheme";

export interface ThemeGeneratorOptions {
  primaryColor: string;
  secondaryColor?: string;
  mutedColor?: string;
  accentColor?: string;
  destructiveColor?: string;
}

export interface GeneratedTheme {
  tokens: {
    primary: string;
    secondary: string;
    muted: string;
    accent: string;
    destructive: string;
  };
  theme: ThemeResult;
  css: string;
  lightTokens: ThemeTokens;
  darkTokens: ThemeTokens;
}

export function generateTheme(options: ThemeGeneratorOptions): GeneratedTheme {
  const theme = createTheme(options.primaryColor);

  return {
    tokens: {
      primary: options.primaryColor,
      secondary: options.secondaryColor || "#06b6d4",
      muted: options.mutedColor || "#94a3b8",
      accent: options.accentColor || "#f59e0b",
      destructive: options.destructiveColor || "#ef4444",
    },
    theme,
    css: theme.cssString,
    lightTokens: theme.light,
    darkTokens: theme.dark,
  };
}

export function exportThemeAsCss(theme: ThemeResult): string {
  return theme.cssString;
}

export function exportThemeAsJson(theme: ThemeResult): object {
  return {
    light: theme.light,
    dark: theme.dark,
  };
}

export function exportThemeAsTailwindConfig(theme: ThemeResult): object {
  const formatTokens = (tokens: ThemeTokens) =>
    Object.fromEntries(
      Object.entries(tokens).map(([key, value]) => [
        key,
        `hsl(${value})`,
      ])
    );

  return {
    theme: {
      extend: {
        colors: {
          light: formatTokens(theme.light),
          dark: formatTokens(theme.dark),
        },
      },
    },
  };
}

export function applyThemeToElement(
  theme: ThemeResult,
  element: HTMLElement,
  mode: "light" | "dark" = "light"
): void {
  const tokens = mode === "light" ? theme.light : theme.dark;

  Object.entries(tokens).forEach(([key, value]) => {
    element.style.setProperty(`--la-${key}`, value);
  });

  if (mode === "dark") {
    element.classList.add("dark");
  } else {
    element.classList.remove("dark");
  }
}

export function getThemeTokens(
  theme: ThemeResult,
  mode: "light" | "dark" = "light"
): ThemeTokens {
  return mode === "light" ? theme.light : theme.dark;
}
