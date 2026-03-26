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

```bash
npm run build
```

### Watch mode (auto-compile on changes):

```bash
npm run dev
```

### Type checking:

```bash
npm run typecheck
```

### Generate snippets:

```bash
npm run generate-vscode-snippets
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
├── dist/                      # Compiled JavaScript
├── package.json              # Extension manifest
└── README.md
```

## License

MIT

## Support

For issues, suggestions, or contributions, visit [GitHub](https://github.com/launchapp-dev/design-system/issues)
