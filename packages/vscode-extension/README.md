# LaunchApp Design System VS Code Extension

A comprehensive VS Code extension providing enhanced developer experience for the LaunchApp Design System.

## Features

- **Component Snippets**: Quick access to all design system components with pre-configured props
- **Prop Autocomplete**: Intelligent autocomplete for component properties with type hints
- **Design Token Preview**: Inline preview of colors and typography tokens
- **Quick Actions**: Common component insertion shortcuts
- **Component Explorer**: Browse and insert components from the extension sidebar

## Installation

Install from the VS Code Marketplace:

```
LaunchApp Design System
```

Or install directly from the command line:

```bash
code --install-extension launchapp.vscode-design-system
```

## Usage

### Component Snippets

Type component names in a TSX/JSX file to see available components:

```tsx
<Button
```

Press `Ctrl+Space` (Windows/Linux) or `Cmd+Space` (Mac) to trigger autocomplete.

### Design Token Preview

Hover over design token references to see their values:

```tsx
className="text-[--la-primary]"
```

### Insert Component

Use the keyboard shortcut `Ctrl+Shift+L` (Windows/Linux) or `Cmd+Shift+L` (Mac) to open the component insertion quick picker.

## Features

### Prop Autocomplete

Get intelligent autocomplete suggestions for component props with:
- Type hints
- Documentation snippets
- Default values
- Variant suggestions

### Token Preview

Inline color and typography previews for design tokens:
- Color swatches
- Typography scale information
- Token value display

### Quick Actions

Common component insertion patterns via commands:
- Insert Button with primary variant
- Insert Input with label
- Insert Dialog with trigger

## Troubleshooting

If the extension isn't working:

1. Ensure you have the LaunchApp Design System installed in your project
2. Check that your project is a TypeScript/JavaScript React project
3. Reload VS Code window (Cmd+R / Ctrl+R)

## Contributing

To contribute to this extension, please follow the contribution guidelines in the main design system repository.

## License

MIT - See LICENSE file
