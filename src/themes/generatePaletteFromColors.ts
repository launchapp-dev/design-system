import type { ExtractedColor } from "../lib/extract-brand-colors";
import type { Palette, PaletteTokens } from "./index";

type HSL = { h: number; s: number; l: number };

function hexToHsl(hex: string): HSL {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function tok(h: number, s: number, l: number): string {
  return `${h} ${s}% ${l}%`;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function _categorizeColorByHue(h: number): "dark" | "light" | "neutral" {
  if (h >= 0 && h <= 30) return "light";
  if (h >= 30 && h <= 60) return "light";
  if (h >= 300 && h <= 360) return "light";
  if (h >= 150 && h <= 210) return "light";
  return "neutral";
}

export function generatePaletteFromColors(
  colors: ExtractedColor[],
  paletteName: string = "generated"
): Palette {
  const hslColors = colors.map((c) => ({
    ...c,
    hsl: hexToHsl(c.hex),
  }));

  const sortedBySaturation = [...hslColors].sort(
    (a, b) => b.hsl.s - a.hsl.s
  );
  const [primaryColor, ...otherColors] = sortedBySaturation;

  const h = primaryColor.hsl.h;
  const s = primaryColor.hsl.s;
  const l = primaryColor.hsl.l;

  const primaryL = clamp(l, 35, 65);
  const darkPrimaryL = clamp(primaryL + 10, 45, 70);
  const ss = Math.round(s * 0.12);
  const sf = (n: number) => Math.round(s * n);

  const light: PaletteTokens = {
    background: tok(0, 0, 100),
    foreground: tok(h, sf(0.08), 4),
    card: tok(0, 0, 100),
    "card-foreground": tok(h, sf(0.08), 4),
    popover: tok(0, 0, 100),
    "popover-foreground": tok(h, sf(0.08), 4),
    primary: tok(h, s, primaryL),
    "primary-foreground": tok(0, 0, 98),
    secondary: tok(h, ss, 96),
    "secondary-foreground": tok(h, sf(0.25), 10),
    muted: tok(h, Math.max(ss - 2, 0), 96),
    "muted-foreground": tok(h, Math.max(ss - 2, 0), 46),
    accent: otherColors.length > 0
      ? tok(otherColors[0].hsl.h, otherColors[0].hsl.s, clamp(otherColors[0].hsl.l, 40, 70))
      : tok(h, ss, 96),
    "accent-foreground": tok(0, 0, 98),
    destructive: tok(0, 84, 60),
    "destructive-foreground": tok(0, 0, 98),
    border: tok(h, Math.max(ss - 2, 0), 90),
    input: tok(h, Math.max(ss - 2, 0), 90),
    ring: tok(h, s, primaryL),
  };

  const dark: PaletteTokens = {
    background: tok(h, Math.max(ss - 2, 0), 4),
    foreground: tok(0, 0, 98),
    card: tok(h, Math.max(ss - 2, 0), 4),
    "card-foreground": tok(0, 0, 98),
    popover: tok(h, Math.max(ss - 2, 0), 4),
    "popover-foreground": tok(0, 0, 98),
    primary: tok(h, Math.round(s * 0.85), darkPrimaryL),
    "primary-foreground": tok(0, 0, 98),
    secondary: tok(h, Math.max(ss - 2, 0), 16),
    "secondary-foreground": tok(0, 0, 98),
    muted: tok(h, Math.max(ss - 4, 0), 16),
    "muted-foreground": tok(h, Math.max(ss - 4, 0), 65),
    accent: otherColors.length > 0
      ? tok(
          otherColors[0].hsl.h,
          Math.round(otherColors[0].hsl.s * 0.85),
          clamp(otherColors[0].hsl.l + 15, 40, 75)
        )
      : tok(h, Math.max(ss - 2, 0), 16),
    "accent-foreground": tok(0, 0, 98),
    destructive: tok(0, 63, 31),
    "destructive-foreground": tok(0, 0, 98),
    border: tok(h, Math.max(ss - 4, 0), 16),
    input: tok(h, Math.max(ss - 4, 0), 16),
    ring: tok(h, Math.round(s * 0.85), darkPrimaryL),
  };

  const tokensToCss = (tokens: PaletteTokens) =>
    Object.entries(tokens)
      .map(([key, value]) => `  --la-${key}: ${value};`)
      .join("\n");

  const _cssString = `:root {\n${tokensToCss(light)}\n}\n\n.dark {\n${tokensToCss(dark)}\n}`;

  return {
    name: paletteName,
    light,
    dark,
  };
}
