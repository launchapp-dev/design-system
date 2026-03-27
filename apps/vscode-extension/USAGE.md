# Using the LaunchApp Design System Extension

This guide explains how to use all the features of the LaunchApp Design System VS Code extension.

## 1. Component Snippets

### Quick Snippet Insertion
Component snippets are the fastest way to add components to your code.

#### Example: Insert Button Component
1. In a `.tsx` or `.jsx` file, type the snippet prefix:
   ```
   button
   ```
2. Press `Tab` or `Enter` to insert:
   ```tsx
   <Button className="">
     {/* Content goes here */}
   </Button>
   ```

#### Available Snippet Prefixes
All component names work as snippet prefixes. Common ones:

- `button` → `<Button />`
- `card` → `<Card />`
- `input` → `<Input />`
- `dialog` → `<Dialog />`
- `table` → `<Table />`
- `form` → `<Form />`
- `select` → `<Select />`
- `tabs` → `<Tabs />`
- `alert` → `<Alert />`
- `badge` → `<Badge />`

**843+ snippets** are available - one for each component and common variant combination.

### Variant-Specific Snippets
Use variant prefixes for quick insertion with specific props:

- `button-primary` → `<Button variant="primary" />`
- `button-outline` → `<Button variant="outline" />`
- `button-ghost` → `<Button variant="ghost" />`
- `alert-destructive` → `<Alert variant="destructive" />`
- `alert-info` → `<Alert variant="info" />`

## 2. Prop Autocomplete

### Smart Autocomplete for Component Props
Get intelligent suggestions as you type component props.

#### Example: Complete Button Props
1. Start typing a Button component:
   ```tsx
   <Button
   ```
2. The extension suggests available props:
   - `className` - CSS class
   - `variant` - Visual variant
   - `size` - Component size
   - `disabled` - Disable state
   - `asChild` - Render as child element
   - ...and more

3. Type a prop name to filter suggestions:
   ```tsx
   <Button var
   ```
   Suggestion: `variant`

4. Press `Tab` or `Enter` to accept:
   ```tsx
   <Button variant=
   ```

### Variant Value Completion
Get suggestions for valid variant values:

1. After typing a variant prop:
   ```tsx
   <Button variant="
   ```

2. See available values:
   - `primary` (highlighted as default)
   - `secondary`
   - `outline`
   - `ghost`
   - `destructive`

3. Select one:
   ```tsx
   <Button variant="primary"
   ```

### Inline Documentation
Every autocomplete item shows detailed documentation:

- **Type information** - TypeScript type
- **Default value** - If applicable
- **Description** - What the prop does
- **Usage examples** - Common usage patterns

Hover over a suggestion to see full documentation, or expand by pressing `Ctrl+Space` for more details.

### Required vs Optional Props
The extension indicates whether a prop is required:

- Required props show a `*` indicator
- Optional props show "_(optional)_" in documentation
- Missing required props are highlighted

## 3. Design Token Preview

### Hover for Token Information
Preview design tokens by hovering over them in your code.

#### Example: View Color Token
1. In any file (CSS, TSX, JSX), type a token reference:
   ```css
   color: var(--la-primary);
   ```

2. Hover over `--la-primary`:
   - See token name: **Primary**
   - View description: "Primary brand color"
   - Check category: **Color**
   - View usage examples

### Available Design Tokens

#### Color Tokens
- `--la-primary` - Primary brand color
- `--la-secondary` - Secondary brand color
- `--la-destructive` - Destructive action color
- `--la-muted` - Muted background color
- `--la-accent` - Accent/highlight color
- `--la-background` - Background color
- `--la-foreground` - Foreground/text color
- `--la-border` - Border color
- `--la-input` - Input field color
- `--la-ring` - Focus ring color
- `--la-card` - Card background
- `--la-popover` - Popover background
- `--la-chart-1` through `--la-chart-5` - Chart colors

#### Typography Tokens
- `--la-font-sans` - Sans-serif font stack
- `--la-font-mono` - Monospace font stack

#### Spacing Tokens
- `--la-radius` - Border radius

### Token Autocomplete
Get completions for token names when typing:

1. Start typing a token reference:
   ```css
   background: var(--la-
   ```

2. See autocomplete suggestions:
   - `--la-primary`
   - `--la-secondary`
   - `--la-muted`
   - ...and more

3. Select a token to auto-complete:
   ```css
   background: var(--la-primary);
   ```

## 4. Quick-Insert Commands

### Insert Component (Cmd+Shift+C / Ctrl+Shift+C)

**Purpose:** Quickly insert a component from a searchable list.

#### Usage:
1. Press `Cmd+Shift+C` (macOS) or `Ctrl+Shift+C` (Windows/Linux)
2. A component picker opens showing all available components
3. Type to search (e.g., "button")
4. Press `Enter` to insert
5. Component template is inserted at cursor position

#### Example:
```
Input: "Card"
Output:
<Card className="">
  {/* Content goes here */}
</Card>
```

### Insert Block (Cmd+Shift+B / Ctrl+Shift+B)

**Purpose:** Quickly insert pre-built, common block layouts.

#### Available Blocks:
- **Card** - Card container with header/content sections
- **Dialog** - Modal dialog with trigger and content
- **FormGroup** - Label and input combination
- **Header** - Page header layout
- **Sidebar** - Sidebar navigation layout
- **Tabs** - Tab navigation with multiple tabs
- **Table** - Data table with header and body

#### Usage:
1. Press `Cmd+Shift+B` (macOS) or `Ctrl+Shift+B` (Windows/Linux)
2. A block picker opens
3. Select a block (or type to search)
4. Press `Enter` to insert the complete block template

#### Example - Insert Card Block:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Show Component Documentation

**Purpose:** Display detailed documentation for a component in a side panel.

#### Usage:
1. Command Palette → `Cmd+Shift+P` / `Ctrl+Shift+P`
2. Search "Show Component Documentation"
3. Select the command
4. A documentation panel opens in a new column
5. Shows component props, types, and usage examples

## 5. Keyboard Shortcuts Quick Reference

| Shortcut | Action | Platform |
|----------|--------|----------|
| `Cmd+Shift+C` | Insert Component | macOS |
| `Ctrl+Shift+C` | Insert Component | Windows/Linux |
| `Cmd+Shift+B` | Insert Block | macOS |
| `Ctrl+Shift+B` | Insert Block | Windows/Linux |
| `Cmd+Space` | Trigger Autocomplete | macOS |
| `Ctrl+Space` | Trigger Autocomplete | Windows/Linux |
| `Ctrl+K Ctrl+I` | Show Hover Information | Both |
| `Cmd+Shift+P` | Open Command Palette | macOS |
| `Ctrl+Shift+P` | Open Command Palette | Windows/Linux |

## 6. Tips & Tricks

### Snippet Tabstops
When inserting snippets, use `Tab` to jump between placeholder positions:

```tsx
<Button variant="$1" size="$2" className="$3">
  {/* $4: Content */}
</Button>
```

Press `Tab` to move from `$1` → `$2` → `$3` → `$4`

### Component Searching
When using quick-insert commands, you can search by:
- Component name: "button"
- Partial match: "butt"
- Fuzzy search: "btn" matches "button"

### Autocomplete Filtering
As you type props, autocomplete filters to matching items:

```tsx
<Button dis
```
Shows only: `disabled`, `disableAnimation`, etc.

### Accessibility
All components support standard HTML attributes:
- `className` - Custom styling
- `id` - Element ID
- `key` - React key (for lists)
- `ref` - Forward ref
- `children` - Child elements

### Common Workflows

#### Creating a Form
1. Use `form` snippet or Insert Block → FormGroup
2. Add `<Label>` components
3. Add input components (`<Input>`, `<Select>`, etc.)
4. Use autocomplete to add prop constraints

#### Building a Layout
1. Use Insert Block → Header, Sidebar
2. Autocomplete prop values for responsive classes
3. Use CSS custom properties for consistent spacing

#### Styling with Tokens
1. Type `var(--la-` in CSS/className
2. Get token autocomplete
3. Hover to preview token values
4. Maintains consistency across your app

## 7. Settings & Configuration

### Disable Features
Open VS Code settings and customize:

```json
{
  // Disable autocomplete
  "launchapp.enableAutocomplete": false,

  // Hide token preview on hover
  "launchapp.showTokenPreview": false,

  // Hide detailed documentation
  "launchapp.showDocumentation": false
}
```

### Access Settings
1. Command Palette → "Preferences: Open Settings (JSON)"
2. Or UI: Settings → Search "launchapp"
3. Toggle switches or edit JSON directly

## 8. Troubleshooting

### Snippets not showing up
- Ensure you're in a `.tsx` or `.jsx` file
- Check file language is detected (bottom right status bar)
- Try typing full component name followed by space

### Autocomplete not triggering
- Type component name followed by space: `<Button `
- Or manually trigger: `Cmd+Space` / `Ctrl+Space`
- Check extension is enabled in extensions view

### Token preview not showing on hover
- Make sure cursor is over a valid token like `--la-primary`
- Check "launchapp.showTokenPreview" is true in settings
- Try hovering for 1-2 seconds

### Quick-insert not working
- Verify keyboard shortcut: macOS = Cmd+Shift+C/B, Windows/Linux = Ctrl+Shift+C/B
- Check VS Code file is in focus
- Check shortcut isn't conflicting with other extensions

---

For more help, see [Installation Guide](./INSTALLATION.md) or [README](./README.md)

Happy building! 🚀
