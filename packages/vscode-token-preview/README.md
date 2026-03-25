# Design Token Preview

A VS Code extension that provides hover previews for design tokens from the LaunchApp design system.

## Features

- **Color Token Previews**: Hover over `--la-*` color tokens to see a visual swatch and RGB/HSL values
- **Typography Token Info**: Display font family information for typography tokens
- **Spacing Token Details**: Show spacing and sizing token values
- **Automatic Token Detection**: Works across CSS, SCSS, Less, HTML, TypeScript, and JavaScript files
- **Hot Reload**: Automatically reloads tokens when the configuration file changes

## Supported Tokens

The extension extracts and previews tokens matching the `--la-*` pattern from the design system:

- **Color tokens**: `--la-primary`, `--la-secondary`, `--la-accent`, `--la-destructive`, etc.
- **Typography tokens**: `--la-font-sans`, `--la-font-mono`
- **Spacing tokens**: `--la-radius`

## Installation

1. Install the extension from VS Code Marketplace (when published)
2. Or, load it locally during development

## Configuration

The extension looks for the design tokens configuration file in these locations (in order):

1. `./src/styles/globals.css` (default)
2. `./styles/globals.css`
3. `./src/globals.css`
4. `./globals.css`

To customize the config path, add to your `.vscode/settings.json`:

```json
{
  "designTokenPreview.configPath": "./path/to/your/globals.css"
}
```

To customize the token pattern:

```json
{
  "designTokenPreview.tokenPattern": "--your-prefix-.*"
}
```

## Usage

Simply hover over a design token in any supported file:

```css
/* Hover over --la-primary to see the color swatch */
color: hsl(var(--la-primary));

/* Hover over --la-font-sans to see the font family */
font-family: var(--la-font-sans);
```

## Development

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

## File Structure

- `src/extension.ts` - Main extension activation code
- `src/hoverProvider.ts` - Implements the hover provider
- `src/tokenExtractor.ts` - Extracts tokens from CSS files
- `dist/` - Compiled JavaScript output

## License

MIT
