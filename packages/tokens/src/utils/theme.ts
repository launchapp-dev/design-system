import type { ThemeConfig, ThemeTokens } from "./types.js";
import { hexToHsl } from "./color.js";

export function createDefaultTheme(opts: {
  primaryColor: string;
  primaryDarkColor: string;
  borderRadius: string;
  fontSans: string;
  fontMono: string;
}): ThemeConfig {
  const primaryHsl = hexToHsl(opts.primaryColor);
  const primaryDarkHsl = hexToHsl(opts.primaryDarkColor);

  const light: ThemeTokens = {
    colors: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      "card-foreground": "240 10% 3.9%",
      popover: "0 0% 100%",
      "popover-foreground": "240 10% 3.9%",
      primary: primaryHsl,
      "primary-foreground": "0 0% 98%",
      secondary: "240 4.8% 95.9%",
      "secondary-foreground": "240 5.9% 10%",
      muted: "240 4.8% 95.9%",
      "muted-foreground": "240 3.8% 46.1%",
      accent: "240 4.8% 95.9%",
      "accent-foreground": "240 5.9% 10%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 98%",
      border: "240 5.9% 90%",
      input: "240 5.9% 90%",
      ring: primaryHsl,
    },
    charts: {
      "chart-1": primaryHsl,
      "chart-2": "200 80% 50%",
      "chart-3": "150 60% 45%",
      "chart-4": "30 90% 55%",
      "chart-5": "350 80% 55%",
    },
    radius: opts.borderRadius,
    fontSans: opts.fontSans,
    fontMono: opts.fontMono,
  };

  const dark: ThemeTokens = {
    colors: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      card: "240 10% 3.9%",
      "card-foreground": "0 0% 98%",
      popover: "240 10% 3.9%",
      "popover-foreground": "0 0% 98%",
      primary: primaryDarkHsl,
      "primary-foreground": "0 0% 98%",
      secondary: "240 3.7% 15.9%",
      "secondary-foreground": "0 0% 98%",
      muted: "240 3.7% 15.9%",
      "muted-foreground": "240 5% 64.9%",
      accent: "240 3.7% 15.9%",
      "accent-foreground": "0 0% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 98%",
      border: "240 3.7% 15.9%",
      input: "240 3.7% 15.9%",
      ring: primaryDarkHsl,
    },
    charts: {
      "chart-1": primaryDarkHsl,
      "chart-2": "200 75% 60%",
      "chart-3": "150 55% 55%",
      "chart-4": "30 85% 65%",
      "chart-5": "350 75% 65%",
    },
    radius: opts.borderRadius,
    fontSans: opts.fontSans,
    fontMono: opts.fontMono,
  };

  return { light, dark };
}
