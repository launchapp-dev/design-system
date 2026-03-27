# LaunchApp Design System VS Code Extension

Intelligent autocomplete, snippets, design token preview, and quick-insert actions for LaunchApp design system components. Works with TypeScript, JavaScript, CSS, and more.

## Features

### 📝 Component Snippets
- **843+ Ready-to-Use Snippets** - Pre-configured snippets for all components
- **Variant-Specific Snippets** - Quick access to common variants (sizes, styles, etc.)
- **Auto-Completion** - Snippets auto-expand with proper formatting

### 🎯 Prop Autocomplete
- **Intelligent Suggestions** - Full prop suggestions for all components
- **Type Information** - Complete TypeScript type hints in autocomplete
- **Default Values** - Shows default values for optional props
- **Variant Options** - Auto-complete suggests valid variant values
- **JSDoc Documentation** - Inline documentation for all props

### 🎨 Design Token Preview
- **Hover Information** - Preview design tokens on hover
- **Token Auto-Complete** - Suggest available design tokens
- **Color Swatches** - Visual preview of color tokens
- **Examples** - Shows usage examples for each token

### ⚡ Quick-Insert Actions
- **Insert Component** (Ctrl+Shift+C / Cmd+Shift+C) - Pick from list and insert component template
- **Insert Block** (Ctrl+Shift+B / Cmd+Shift+B) - Quick-insert pre-built block layouts
- **Show Documentation** - Display detailed component documentation

## How It Works

The extension:
1. Generates 843+ snippets from component definitions
2. Extracts prop and variant information from TypeScript files
3. Provides real-time autocomplete as you type
4. Indexes design tokens for quick preview and completion
5. Offers quick-insert commands for common patterns

## Supported Components

100+ components including:
- Basic: Button, Card, Input, Label, Checkbox, Radio, Switch
- Forms: Form, FormField, FormLabel, Input, Select, Textarea
- Navigation: Menu, Tabs, Breadcrumb, Pagination
- Dialogs: Dialog, AlertDialog, Popover, Tooltip
- Data: Table, DataGrid, Tree
- Layout: Sidebar, Header, Container
- And many more...

## Keyboard Shortcuts

| Shortcut | Action | OS |
|----------|--------|-----|
| `Ctrl+Shift+C` | Insert Component | Windows/Linux |
| `Cmd+Shift+C` | Insert Component | macOS |
| `Ctrl+Shift+B` | Insert Block | Windows/Linux |
| `Cmd+Shift+B` | Insert Block | macOS |

## Configuration

Customize the extension in `.vscode/settings.json`:

```json
{
  "launchapp.enableAutocomplete": true,
  "launchapp.showTokenPreview": true,
  "launchapp.showDocumentation": true
}
```

### Configuration Options

- `launchapp.enableAutocomplete` (boolean, default: true) - Enable component prop autocomplete
- `launchapp.showTokenPreview` (boolean, default: true) - Show design token preview on hover
- `launchapp.showDocumentation` (boolean, default: true) - Show detailed documentation in autocomplete

## Installation & Publishing

The extension is published to the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=launchapp.design-system).

To install:
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "LaunchApp Design System"
4. Click Install

## Development

### Build the extension:

The extension uses TypeScript which must be compiled to JavaScript. Due to monorepo configuration, use the provided build script:

```bash
./build.sh
```

This will compile TypeScript sources in `src/` to JavaScript in `dist/`.

### Watch mode (auto-compile on changes):

```bash
npx -p typescript tsc --watch --project . --outDir dist
```

### Type checking:

```bash
npx -p typescript tsc --noEmit
```

### Package for distribution:

First ensure the extension is built, then:

```bash
npx vsce package
```

This creates a `.vsix` file that can be installed locally or published to the marketplace.

### Publish to VS Code Marketplace:

1. Create a publisher account at https://marketplace.visualstudio.com
2. Install vsce: `npm install -g vsce`
3. Create a Personal Access Token on the publisher account
4. Login to vsce: `vsce login <publisher-name>`
5. Publish: `vsce publish [major|minor|patch]`

### Generate snippets:

```bash
cd ../../ && npm run generate-vscode-snippets
```

## File Structure

```
apps/vscode-extension/
├── src/
│   ├── extension.ts           # Extension entry point
│   ├── completion-provider.ts # Component prop autocomplete
│   ├── prop-extractor.ts      # Extracts props from components
│   ├── token-provider.ts      # Design token hover and completion
│   ├── quick-insert.ts        # Quick-insert commands
│   ├── vscode.d.ts           # VS Code API type definitions
├── dist/                      # Compiled JavaScript (built by build.sh)
├── build.sh                  # Build script (recommended for monorepo)
├── package.json              # Extension manifest
├── tsconfig.json            # TypeScript compiler options
└── README.md
```

## Build Dependencies

- **Node.js** ≥ 16.19.0
- **npm** ≥ 8.19.3 (or pnpm ≥ 8.0 for monorepo workspace)
- **TypeScript** (installed automatically via npx)
- **@types/node** and **@types/vscode** (dev dependencies)

The extension has no runtime dependencies - all dependencies are dev tools for building and testing.

## License

MIT

## Support

For issues, suggestions, or contributions, visit [GitHub](https://github.com/launchapp-dev/design-system/issues)
