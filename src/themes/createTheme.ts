export type ThemeTokens = {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  success: string;
  "success-foreground": string;
  border: string;
  input: string;
  ring: string;
};

export type ThemeResult = {
  light: ThemeTokens;
  dark: ThemeTokens;
  cssString: string;
};

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

function parseColor(color: string): HSL {
  const trimmed = color.trim();
  if (trimmed.startsWith("#")) {
    return hexToHsl(trimmed);
  }
  const hslFn = trimmed.match(/hsl\(\s*(\d+)\s+(\d+)%\s+(\d+)%\s*\)/);
  if (hslFn) {
    return { h: parseInt(hslFn[1], 10), s: parseInt(hslFn[2], 10), l: parseInt(hslFn[3], 10) };
  }
  const bare = trimmed.match(/^(\d+)\s+(\d+)%?\s+(\d+)%?$/);
  if (bare) {
    return { h: parseInt(bare[1], 10), s: parseInt(bare[2], 10), l: parseInt(bare[3], 10) };
  }
  throw new Error(`Cannot parse color: ${color}`);
}

function tok(h: number, s: number, l: number): string {
  return `${h} ${s}% ${l}%`;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function createTheme(brandColor: string): ThemeResult {
  const { h, s, l } = parseColor(brandColor);
  const primaryL = clamp(l, 35, 65);
  const darkPrimaryL = clamp(primaryL + 10, 45, 70);
  const ss = Math.round(s * 0.12);
  const sf = (n: number) => Math.round(s * n);

  const light: ThemeTokens = {
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
    accent: tok(h, ss, 96),
    "accent-foreground": tok(h, sf(0.25), 10),
    destructive: tok(0, 84, 60),
    "destructive-foreground": tok(0, 0, 98),
    success: tok(142, 71, 45),
    "success-foreground": tok(0, 0, 98),
    border: tok(h, Math.max(ss - 2, 0), 90),
    input: tok(h, Math.max(ss - 2, 0), 90),
    ring: tok(h, s, primaryL),
  };

  const dark: ThemeTokens = {
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
    accent: tok(h, Math.max(ss - 2, 0), 16),
    "accent-foreground": tok(0, 0, 98),
    destructive: tok(0, 63, 31),
    "destructive-foreground": tok(0, 0, 98),
    success: tok(142, 69, 58),
    "success-foreground": tok(0, 0, 98),
    border: tok(h, Math.max(ss - 4, 0), 16),
    input: tok(h, Math.max(ss - 4, 0), 16),
    ring: tok(h, Math.round(s * 0.85), darkPrimaryL),
  };

  const tokensToCss = (tokens: ThemeTokens) =>
    Object.entries(tokens)
      .map(([key, value]) => `  --la-${key}: ${value};`)
      .join("\n");

  const cssString = `:root {\n${tokensToCss(light)}\n}\n\n.dark {\n${tokensToCss(dark)}\n}`;

  return { light, dark, cssString };
}
