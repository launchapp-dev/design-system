# Installation Guide

## Install from VS Code Marketplace (Recommended)

The easiest way to install the LaunchApp Design System extension is directly from the VS Code Marketplace:

### 1. Open VS Code
Launch Visual Studio Code on your machine.

### 2. Open Extensions View
Use the keyboard shortcut:
- **Windows/Linux:** `Ctrl+Shift+X`
- **macOS:** `Cmd+Shift+X`

Or click the Extensions icon in the left sidebar.

### 3. Search for the Extension
In the extensions search box, type:
```
LaunchApp Design System
```

Or search for:
```
launchapp design system
```

### 4. Click Install
Find "LaunchApp Design System" in the results and click the **Install** button.

### 5. Reload VS Code
After installation, you may be prompted to reload VS Code. Click **Reload Window** or close and reopen VS Code.

## Alternative: Install from VSIX File

If you have a `.vsix` file, you can install it directly:

### Using VS Code UI
1. Open Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. Click the "..." menu (top-right of extensions panel)
3. Select "Install from VSIX..."
4. Choose the `.vsix` file from your computer
5. Click **Install**

### Using Command Line
```bash
code --install-extension /path/to/launchapp-vscode-extension-0.1.0.vsix
```

## Verify Installation

After installation, you should see:

1. **Extension Listed**
   - Extensions view shows "LaunchApp Design System" as installed
   - Check mark or "Uninstall" button indicates successful installation

2. **Features Active**
   - Create or open a `.tsx` or `.jsx` file
   - Type `<Button` - autocomplete suggestions appear
   - Hover over a CSS variable like `--la-primary` - token preview appears
   - Use `Cmd+Shift+C` (macOS) or `Ctrl+Shift+C` (Windows/Linux) - component picker opens

## Uninstall

To remove the extension:

1. Open Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. Find "LaunchApp Design System"
3. Click the **Uninstall** button
4. Reload VS Code if prompted

## Troubleshooting

### Extension doesn't appear in VS Code Marketplace
- Ensure you have VS Code v1.85.0 or later: Check Help → About
- Try clearing the extension cache: Command Palette → "Developer: Clear Extension Cache"
- Manually search for `launchapp.design-system` in the marketplace web UI

### Features not working after install
1. Verify the file is `.tsx` or `.jsx` (JSX files only)
2. Check extension is enabled: Extensions view → "LaunchApp Design System" → Click to enable if needed
3. Reload window: Command Palette → "Developer: Reload Window"
4. Check your settings haven't disabled features:
   - Command Palette → "Preferences: Open Settings (JSON)"
   - Ensure these are not set to `false`:
     ```json
     {
       "launchapp.enableAutocomplete": true,
       "launchapp.showTokenPreview": true,
       "launchapp.showDocumentation": true
     }
     ```

### Autocomplete not triggering
- Make sure you're in a `.tsx` or `.jsx` file
- Type `<Button ` (with a space after component name)
- Autocomplete should show available props
- If not, try: Command Palette → "Editor: Trigger Suggest"

### Token preview not showing
- Hover over a CSS variable starting with `--la-`
- Examples: `--la-primary`, `--la-radius`, `--la-font-sans`
- Check that `launchapp.showTokenPreview` is enabled in settings

### Extension requires newer VS Code version
- Update VS Code to the latest version: Help → Check for Updates
- Minimum required: VS Code 1.85.0 (released November 2023)

## System Requirements

- **VS Code:** v1.85.0 or later (free, [download here](https://code.visualstudio.com))
- **Node.js:** Not required for using the extension (only for development)
- **Operating System:**
  - macOS 10.12+
  - Windows 7+
  - Linux (any modern distribution)

## Data & Privacy

The LaunchApp Design System extension:
- **Does not collect any data** - Fully local, no telemetry
- **Does not require authentication** - Works out of the box
- **Does not modify your code** - Only provides suggestions and previews
- **Does not access the internet** - All features work offline

## Support & Feedback

- **Issues or Bugs:** [GitHub Issues](https://github.com/launchapp-dev/design-system/issues)
- **Feature Requests:** [GitHub Discussions](https://github.com/launchapp-dev/design-system/discussions)
- **Documentation:** [Read the Full Docs](https://github.com/launchapp-dev/design-system)

## Next Steps

After installation, check out:
1. [README.md](./README.md) - Feature overview
2. [Using the Extension](#using-the-extension) - How to use snippets, autocomplete, etc.
3. [Configuration](#configuration) - Customization options

---

**Happy coding with LaunchApp Design System! 🚀**
