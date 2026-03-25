# LaunchApp Design System VS Code Extension

Intelligent autocomplete for LaunchApp design system components with type hints, documentation, and variant suggestions.

## Features

- **Component Prop Autocomplete** - Intelligent suggestions for all component props
- **Type Information** - Full TypeScript type information displayed in autocomplete
- **Default Values** - Shows default values for optional props
- **Variant-Specific Suggestions** - Autocomplete for variant props shows available options
- **Documentation** - JSDoc comments displayed inline
- **Multi-Variant Support** - Handles components with multiple variants (size, variant, etc.)

## How It Works

The extension extracts prop definitions directly from component TypeScript files and provides intelligent autocomplete suggestions as you type.

### Supported Components

All 60+ components from the LaunchApp design system are supported, including:
- Button, Card, Input, Label
- Select, Checkbox, Switch, Radio
- Tabs, Accordion, Dialog, Popover
- And many more...

### Autocomplete Triggers

- **Prop Names**: Type a space after the component name or another prop
- **Prop Values**: Type equals and open quote for variant-specific suggestions

## Configuration

Add to your VS Code settings (`.vscode/settings.json`):

```json
{
  "launchapp.enableAutocomplete": true,
  "launchapp.showDocumentation": true
}
```

## Development

```bash
npm install
npm run build
```

## License

MIT
