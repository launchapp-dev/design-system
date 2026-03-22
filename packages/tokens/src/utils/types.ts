export interface SemanticColorTokens {
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
  border: string;
  input: string;
  ring: string;
}

export interface ChartTokens {
  "chart-1": string;
  "chart-2": string;
  "chart-3": string;
  "chart-4": string;
  "chart-5": string;
}

export interface ThemeTokens {
  colors: SemanticColorTokens;
  charts: ChartTokens;
  radius: string;
  fontSans: string;
  fontMono: string;
}

export interface ThemeConfig {
  light: ThemeTokens;
  dark: ThemeTokens;
}

export interface FigmaTokenValue {
  value: string;
  type: "color" | "dimension" | "fontFamily" | "custom-fontStyle";
  description?: string;
}

export interface FigmaTokenGroup {
  [key: string]: FigmaTokenValue | FigmaTokenGroup;
}

export interface FigmaTokensSchema {
  [tokenSet: string]: FigmaTokenGroup;
}

export interface InitOptions {
  projectName: string;
  primaryColor: string;
  primaryDarkColor: string;
  borderRadius: string;
  fontSans: string;
  fontMono: string;
  includeStorybook: boolean;
  outputDir: string;
}

export interface ImportOptions {
  input: string;
  output?: string;
  format: "figma" | "json";
}

export interface ExportOptions {
  input?: string;
  output: string;
  format: "figma" | "json" | "css";
}
