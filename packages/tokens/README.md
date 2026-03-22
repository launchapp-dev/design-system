# @launchapp/tokens

CLI tool for design token management and theme scaffolding. Works with the LaunchApp Design System and supports Figma Tokens plugin format.

## Installation

```bash
npm install -g @launchapp/tokens
# or
npx @launchapp/tokens init
```

## Commands

### `init`

Initialize a new themed design system instance with interactive prompts.

```bash
launchapp-tokens init
```

Or with options:

```bash
launchapp-tokens init \
  --name my-theme \
  --primary "#4C3AFF" \
  --primary-dark "#7C5FFF" \
  --radius "0.5rem" \
  --font-sans "Inter" \
  --font-mono "JetBrains Mono" \
  --output ./my-project
```

**Options:**
- `-n, --name <name>` - Project name
- `-p, --primary <hex>` - Primary color in hex format
- `-d, --primary-dark <hex>` - Primary color for dark mode
- `-r, --radius <value>` - Border radius (e.g. 0.5rem)
- `-s, --font-sans <font>` - Sans-serif font family
- `-m, --font-mono <font>` - Monospace font family
- `-o, --output <dir>` - Output directory (default: current directory)
- `--storybook` - Include Storybook configuration

**Generated Files:**
- `src/styles/globals.css` - CSS custom properties for light/dark themes
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `tokens.json` - Exportable theme tokens

### `import`

Import tokens from Figma Tokens or JSON format and generate theme files.

```bash
launchapp-tokens import tokens.json --format figma
```

**Arguments:**
- `<input>` - Input file path (Figma Tokens JSON or theme JSON)

**Options:**
- `-o, --output <dir>` - Output directory for generated files
- `-f, --format <format>` - Input format: `figma` or `json` (default: `figma`)

### `export`

Export tokens to various formats.

```bash
launchapp-tokens export figma-tokens.json --format figma
```

**Arguments:**
- `<output>` - Output file path

**Options:**
- `-i, --input <file>` - Input tokens file (default: `tokens.json`)
- `-f, --format <format>` - Output format: `figma`, `json`, or `css`

## Figma Tokens Format

This CLI supports the [Figma Tokens](https://figmatokens.com/) plugin format. Example structure:

```json
{
  "light": {
    "la-background": {
      "value": "#FFFFFF",
      "type": "color"
    },
    "la-foreground": {
      "value": "#0F172A",
      "type": "color"
    },
    "la-primary": {
      "value": "#4C3AFF",
      "type": "color"
    },
    "la-radius": {
      "value": "0.5rem",
      "type": "dimension"
    }
  },
  "dark": {
    "la-background": {
      "value": "#0F172A",
      "type": "color"
    },
    "la-primary": {
      "value": "#7C5FFF",
      "type": "color"
    }
  }
}
```

## Token Schema

The internal token schema follows this structure:

```typescript
interface ThemeTokens {
  colors: {
    background: string;      // HSL format: "0 0% 100%"
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
  };
  charts: {
    "chart-1": string;
    "chart-2": string;
    "chart-3": string;
    "chart-4": string;
    "chart-5": string;
  };
  radius: string;           // CSS length: "0.5rem"
  fontSans: string;         // Font family: "Inter"
  fontMono: string;         // Font family: "JetBrains Mono"
}

interface ThemeConfig {
  light: ThemeTokens;
  dark: ThemeTokens;
}
```

## License

MIT
