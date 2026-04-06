export type PaletteTokenSet = Record<string, string>;

export type Palette = {
  name: string;
  label: string;
  previewColor: string;
  tokens: {
    light: PaletteTokenSet;
    dark: PaletteTokenSet;
  };
};

const buildTokens = (
  h: number,
  s: number,
  primaryL: number,
  darkPrimaryL: number,
): { light: PaletteTokenSet; dark: PaletteTokenSet } => {
  const ss = Math.round(s * 0.12);
  const sr = (n: number) => Math.round(s * n);

  return {
    light: {
      "--la-background": "0 0% 100%",
      "--la-foreground": `${h} ${sr(0.1)} 4%`,
      "--la-card": "0 0% 100%",
      "--la-card-foreground": `${h} ${sr(0.1)} 4%`,
      "--la-popover": "0 0% 100%",
      "--la-popover-foreground": `${h} ${sr(0.1)} 4%`,
      "--la-primary": `${h} ${s}% ${primaryL}%`,
      "--la-primary-foreground": "0 0% 98%",
      "--la-secondary": `${h} ${ss}% 96%`,
      "--la-secondary-foreground": `${h} ${sr(0.25)} 10%`,
      "--la-muted": `${h} ${Math.max(ss - 2, 0)}% 96%`,
      "--la-muted-foreground": `${h} ${Math.max(ss - 2, 0)}% 46%`,
      "--la-accent": `${h} ${ss}% 96%`,
      "--la-accent-foreground": `${h} ${sr(0.25)} 10%`,
      "--la-destructive": "0 84% 60%",
      "--la-destructive-foreground": "0 0% 98%",
      "--la-border": `${h} ${Math.max(ss - 2, 0)}% 90%`,
      "--la-input": `${h} ${Math.max(ss - 2, 0)}% 90%`,
      "--la-ring": `${h} ${s}% ${primaryL}%`,
    },
    dark: {
      "--la-background": `${h} ${Math.max(ss - 2, 0)}% 4%`,
      "--la-foreground": "0 0% 98%",
      "--la-card": `${h} ${Math.max(ss - 2, 0)}% 4%`,
      "--la-card-foreground": "0 0% 98%",
      "--la-popover": `${h} ${Math.max(ss - 2, 0)}% 4%`,
      "--la-popover-foreground": "0 0% 98%",
      "--la-primary": `${h} ${Math.round(s * 0.85)}% ${darkPrimaryL}%`,
      "--la-primary-foreground": "0 0% 98%",
      "--la-secondary": `${h} ${Math.max(ss - 2, 0)}% 16%`,
      "--la-secondary-foreground": "0 0% 98%",
      "--la-muted": `${h} ${Math.max(ss - 4, 0)}% 16%`,
      "--la-muted-foreground": `${h} ${Math.max(ss - 4, 0)}% 65%`,
      "--la-accent": `${h} ${Math.max(ss - 2, 0)}% 16%`,
      "--la-accent-foreground": "0 0% 98%",
      "--la-destructive": "0 63% 31%",
      "--la-destructive-foreground": "0 0% 98%",
      "--la-border": `${h} ${Math.max(ss - 4, 0)}% 16%`,
      "--la-input": `${h} ${Math.max(ss - 4, 0)}% 16%`,
      "--la-ring": `${h} ${Math.round(s * 0.85)}% ${darkPrimaryL}%`,
    },
  };
};

export const builtinPalettes: Palette[] = [
  {
    name: "default",
    label: "Default",
    previewColor: "hsl(262 83% 58%)",
    tokens: buildTokens(262, 83, 58, 60),
  },
  {
    name: "ocean",
    label: "Ocean",
    previewColor: "hsl(199 89% 45%)",
    tokens: buildTokens(199, 89, 45, 55),
  },
  {
    name: "forest",
    label: "Forest",
    previewColor: "hsl(142 71% 40%)",
    tokens: buildTokens(142, 71, 40, 50),
  },
  {
    name: "sunset",
    label: "Sunset",
    previewColor: "hsl(24 95% 50%)",
    tokens: buildTokens(24, 95, 50, 58),
  },
  {
    name: "rose",
    label: "Rose",
    previewColor: "hsl(347 77% 50%)",
    tokens: buildTokens(347, 77, 50, 60),
  },
  {
    name: "slate",
    label: "Slate",
    previewColor: "hsl(215 25% 47%)",
    tokens: buildTokens(215, 25, 47, 55),
  },
  {
    name: "amber",
    label: "Amber",
    previewColor: "hsl(38 92% 46%)",
    tokens: buildTokens(38, 92, 46, 55),
  },
  {
    name: "teal",
    label: "Teal",
    previewColor: "hsl(174 80% 36%)",
    tokens: buildTokens(174, 80, 36, 48),
  },
  {
    name: "violet",
    label: "Violet",
    previewColor: "hsl(258 90% 62%)",
    tokens: buildTokens(258, 90, 62, 66),
  },
  {
    name: "ruby",
    label: "Ruby",
    previewColor: "hsl(0 72% 48%)",
    tokens: buildTokens(0, 72, 48, 58),
  },
];
