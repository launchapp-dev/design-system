# LaunchApp Design System VS Code Extension

The LaunchApp Design System VS Code extension provides intelligent component insertion, code completion, and design token preview to streamline development with the LaunchApp design system.

## Features

### Quick Component Insertion (Ctrl+Shift+L)
Press `Ctrl+Shift+L` (or `Cmd+Shift+L` on Mac) to open the component picker. Select a component to insert with:
- Pre-filled template with common prop patterns
- Automatic import statements added to the file
- Support for all LaunchApp design system components

### Supported Components
- **Button** - Interactive button component
- **Input** - Text input component
- **Dialog** - Modal dialog component
- **Card** - Container component with border and padding
- **Label** - Form label component
- **Checkbox** - Checkbox input component
- **Select** - Dropdown select component
- **Tabs** - Tabbed interface component
- **Toast** - Notification toast component
- **Accordion** - Collapsible accordion component

### Component Snippets
Use snippet shortcuts to quickly type component JSX:
- `labutton` - Button component
- `lainput` - Input component
- `ladialog` - Dialog component
- `lacard` - Card component
- `lalabel` - Label component
- `lacheckbox` - Checkbox component
- `laselect` - Select component
- `latabs` - Tabs component
- `laaccordion` - Accordion component

### Import Snippets
- `laImport` - Generic design system import
- `laImportButton` - Button import
- `laImportInput` - Input import
- `laImportDialog` - Dialog imports
- `laImportCard` - Card imports

## Installation

Install from the VS Code Marketplace or build locally:

```bash
npm install
npm run build
npm run package
```

## Usage

### Quick Component Insertion
1. Open a TypeScript/TSX file
2. Press `Ctrl+Shift+L` (Windows/Linux) or `Cmd+Shift+L` (Mac)
3. Select a component from the quick pick menu
4. The component template is inserted with imports automatically added

### Snippets
Start typing snippet shortcuts like `labutton` and press Tab to expand.

## Development

```bash
npm install
npm run watch   # Watch for changes during development
npm run build   # Build the extension
```

## Extension Settings

The extension automatically activates when you open TypeScript, JavaScript, JSX, or TSX files.

## License

MIT - See LICENSE file for details
