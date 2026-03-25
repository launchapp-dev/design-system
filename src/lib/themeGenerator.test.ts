import { describe, it, expect, beforeEach } from "vitest";
import {
  generateTheme,
  exportThemeAsCss,
  exportThemeAsJson,
  exportThemeAsTailwindConfig,
  applyThemeToElement,
  getThemeTokens,
} from "./themeGenerator";

describe("themeGenerator", () => {
  const primaryColor = "#3b82f6";

  beforeEach(() => {
    // Clean up any styles applied to test elements
    document.body.innerHTML = "";
  });

  describe("generateTheme", () => {
    it("generates a complete theme from primary color", () => {
      const result = generateTheme({ primaryColor });

      expect(result).toHaveProperty("tokens");
      expect(result).toHaveProperty("theme");
      expect(result).toHaveProperty("css");
      expect(result).toHaveProperty("lightTokens");
      expect(result).toHaveProperty("darkTokens");
    });

    it("includes primary color in tokens", () => {
      const result = generateTheme({ primaryColor });
      expect(result.tokens.primary).toBe(primaryColor);
    });

    it("includes default colors when not provided", () => {
      const result = generateTheme({ primaryColor });
      expect(result.tokens.secondary).toBeDefined();
      expect(result.tokens.muted).toBeDefined();
      expect(result.tokens.accent).toBeDefined();
      expect(result.tokens.destructive).toBeDefined();
    });

    it("includes custom colors when provided", () => {
      const result = generateTheme({
        primaryColor,
        secondaryColor: "#06b6d4",
        accentColor: "#f59e0b",
        destructiveColor: "#ef4444",
      });

      expect(result.tokens.secondary).toBe("#06b6d4");
      expect(result.tokens.accent).toBe("#f59e0b");
      expect(result.tokens.destructive).toBe("#ef4444");
    });

    it("theme includes light and dark tokens", () => {
      const result = generateTheme({ primaryColor });
      expect(result.theme.light).toBeDefined();
      expect(result.theme.dark).toBeDefined();
      expect(result.lightTokens).toEqual(result.theme.light);
      expect(result.darkTokens).toEqual(result.theme.dark);
    });

    it("css string contains CSS custom properties", () => {
      const result = generateTheme({ primaryColor });
      expect(result.css).toContain("--la-");
      expect(result.css).toContain(":root");
      expect(result.css).toContain(".dark");
    });
  });

  describe("exportThemeAsCss", () => {
    it("returns CSS string", () => {
      const { theme } = generateTheme({ primaryColor });
      const css = exportThemeAsCss(theme);
      expect(typeof css).toBe("string");
      expect(css).toContain("--la-");
      expect(css).toContain(":root");
    });

    it("includes both light and dark modes", () => {
      const { theme } = generateTheme({ primaryColor });
      const css = exportThemeAsCss(theme);
      expect(css).toContain(".dark");
    });
  });

  describe("exportThemeAsJson", () => {
    it("returns JSON object with light and dark tokens", () => {
      const { theme } = generateTheme({ primaryColor });
      const json = exportThemeAsJson(theme);

      expect(json).toHaveProperty("light");
      expect(json).toHaveProperty("dark");
      expect(typeof json.light).toBe("object");
      expect(typeof json.dark).toBe("object");
    });

    it("preserves token structure", () => {
      const { theme } = generateTheme({ primaryColor });
      const json = exportThemeAsJson(theme);

      expect(json.light).toHaveProperty("primary");
      expect(json.light).toHaveProperty("foreground");
      expect(json.dark).toHaveProperty("primary");
      expect(json.dark).toHaveProperty("foreground");
    });
  });

  describe("exportThemeAsTailwindConfig", () => {
    it("returns Tailwind config object", () => {
      const { theme } = generateTheme({ primaryColor });
      const config = exportThemeAsTailwindConfig(theme);

      expect(config).toHaveProperty("theme");
      expect(config.theme).toHaveProperty("extend");
      expect(config.theme.extend).toHaveProperty("colors");
    });

    it("includes light and dark color objects", () => {
      const { theme } = generateTheme({ primaryColor });
      const config = exportThemeAsTailwindConfig(theme);

      expect(config.theme.extend.colors).toHaveProperty("light");
      expect(config.theme.extend.colors).toHaveProperty("dark");
    });

    it("formats colors as hsl values", () => {
      const { theme } = generateTheme({ primaryColor });
      const config = exportThemeAsTailwindConfig(theme);
      const lightColors = config.theme.extend.colors.light as Record<
        string,
        string
      >;
      const firstColor = Object.values(lightColors)[0];

      expect(typeof firstColor).toBe("string");
      expect(firstColor).toContain("hsl(");
    });
  });

  describe("applyThemeToElement", () => {
    it("applies light theme to element", () => {
      const element = document.createElement("div");
      const { theme } = generateTheme({ primaryColor });

      applyThemeToElement(theme, element, "light");

      expect(element.style.getPropertyValue("--la-primary")).toBeTruthy();
      expect(element.classList.contains("dark")).toBe(false);
    });

    it("applies dark theme to element", () => {
      const element = document.createElement("div");
      const { theme } = generateTheme({ primaryColor });

      applyThemeToElement(theme, element, "dark");

      expect(element.style.getPropertyValue("--la-primary")).toBeTruthy();
      expect(element.classList.contains("dark")).toBe(true);
    });

    it("applies all token properties", () => {
      const element = document.createElement("div");
      const { theme } = generateTheme({ primaryColor });

      applyThemeToElement(theme, element, "light");

      const keys = Object.keys(theme.light);
      keys.forEach((key) => {
        expect(element.style.getPropertyValue(`--la-${key}`)).toBeTruthy();
      });
    });
  });

  describe("getThemeTokens", () => {
    it("returns light tokens by default", () => {
      const { theme } = generateTheme({ primaryColor });
      const tokens = getThemeTokens(theme);

      expect(tokens).toEqual(theme.light);
    });

    it("returns light tokens when specified", () => {
      const { theme } = generateTheme({ primaryColor });
      const tokens = getThemeTokens(theme, "light");

      expect(tokens).toEqual(theme.light);
    });

    it("returns dark tokens when specified", () => {
      const { theme } = generateTheme({ primaryColor });
      const tokens = getThemeTokens(theme, "dark");

      expect(tokens).toEqual(theme.dark);
    });

    it("tokens have correct structure", () => {
      const { theme } = generateTheme({ primaryColor });
      const tokens = getThemeTokens(theme);

      expect(tokens).toHaveProperty("primary");
      expect(tokens).toHaveProperty("foreground");
      expect(tokens).toHaveProperty("background");
      expect(tokens).toHaveProperty("card");
      expect(tokens).toHaveProperty("border");
    });
  });
});
