# Figma Tokens Plugin Compatibility Guide

## Overview

This guide explains how to use the LaunchApp design system tokens with the [Figma Tokens](https://tokens.studio/) plugin (formerly Tokens Studio). The plugin provides a visual interface for managing and applying design tokens in Figma.

## Prerequisites

1. **Figma Account**: With edit access to the design file
2. **Figma Tokens Plugin**: Install from Figma Community
3. **LaunchApp Design System**: Access to token export files
4. **Knowledge**: Basic understanding of design tokens and Figma

## Installation

### Step 1: Install the Plugin

1. Open Figma
2. Go to **Plugins** → **Search Community**
3. Search for "Tokens" and find the official Tokens plugin
4. Click **Install**
5. Go to **Plugins** → **Development** → **Tokens**

### Step 2: Configure Token Source

The plugin can import tokens from multiple sources:

**Option A: From JSON File (Recommended)**
1. Export tokens from LaunchApp: `npm run figma-sync:export`
2. Copy the generated `tokens.json` file
3. In Figma Tokens plugin: **Settings** → **Token Files** → **Upload JSON**
4. Select the LaunchApp tokens.json file

**Option B: From Git Repository**
1. Configure GitHub repository access in plugin settings
2. Point to: `https://github.com/launchapp-dev/design-system`
3. Token file path: `exports/tokens.json`

**Option C: From URL**
1. Host tokens.json on a static server
2. Plugin settings: **Token Files** → **URL**
3. Enter: `https://your-domain.com/exports/tokens.json`

## Token Set Structure

The plugin expects token sets in this structure:

```json
{
  "default-light": {
    "colors": {
      "background": {
        "value": "#ffffff",
        "type": "color"
      },
      "primary": {
        "value": "#a855f7",
        "type": "color"
      }
    }
  },
  "default-dark": {
    "colors": {
      "background": {
        "value": "#0a0a0a",
        "type": "color"
      },
      "primary": {
        "value": "#c77dff",
        "type": "color"
      }
    }
  }
}
```

## Naming Convention

LaunchApp uses a specific naming convention for token sets:

```
{palette}-{variant}

Examples:
- default-light
- default-dark
- ocean-light
- ocean-dark
- forest-light
- forest-dark
```

### Available Palettes

- **default**: LaunchApp default palette
- **ocean**: Ocean blue palette
- **forest**: Forest green palette
- **sunset**: Warm sunset palette
- **rose**: Rose pink palette
- **slate**: Slate gray palette
- **amber**: Warm amber palette
- **teal**: Teal palette
- **violet**: Violet purple palette
- **ruby**: Ruby red palette

Each palette has two variants:
- **light**: Light theme colors
- **dark**: Dark theme colors

## Using Tokens in Figma

### Applying Tokens to Components

Once imported, you can apply tokens to component properties:

1. **Select a component** in your Figma design
2. **Open Figma Tokens plugin**
3. **Select a token set** (e.g., "default-light")
4. **Click on a color property** in your component
5. **Select a token** from the plugin panel
6. The color will be applied and linked to the token

### Creating Token Groups

Tokens can be organized into groups in the JSON:

```json
{
  "default-light": {
    "colors": {
      "semantic": {
        "primary": { "value": "#a855f7", "type": "color" },
        "secondary": { "value": "#f0f0f0", "type": "color" }
      },
      "backgrounds": {
        "surface": { "value": "#ffffff", "type": "color" },
        "card": { "value": "#f9f9f9", "type": "color" }
      }
    }
  }
}
```

This creates a hierarchical structure in the plugin UI:
```
colors/
  semantic/
    primary
    secondary
  backgrounds/
    surface
    card
```

## Theme Switching

The plugin supports theme switching through token sets:

### Method 1: Manual Theme Selection

1. Open **Figma Tokens** panel
2. At the top, select the desired theme/set
3. Click the **apply** button to update all linked components

### Method 2: Automated Theme Switching

Use the plugin's **Auto-switch themes based on Figma light/dark mode**:

1. Plugin **Settings** → **Appearance**
2. Enable **Auto-apply theme**
3. Map token sets to Figma themes:
   - Light mode → `{palette}-light`
   - Dark mode → `{palette}-dark`

## Token Type Support

Figma Tokens plugin supports multiple token types:

### Color Tokens (Primary)
```json
{
  "primary": {
    "value": "#a855f7",
    "type": "color",
    "description": "Primary action color"
  }
}
```

### Sizing Tokens (Future)
```json
{
  "spacing-small": {
    "value": "8",
    "type": "sizing"
  }
}
```

### Typography Tokens (Future)
```json
{
  "heading-large": {
    "value": {
      "fontFamily": "Inter",
      "fontWeight": "700",
      "fontSize": "32"
    },
    "type": "typography"
  }
}
```

### Border Tokens (Future)
```json
{
  "border-default": {
    "value": {
      "strokeWidth": "1",
      "strokeColor": "#cccccc",
      "strokeStyle": "solid"
    },
    "type": "border"
  }
}
```

## Sync Workflow

### Export from LaunchApp to Figma

1. **Run export script**:
   ```bash
   npm run figma-sync:export
   ```

2. **Generated files**:
   - `exports/tokens.json` - Figma Tokens plugin format
   - `exports/tokens.figma.json` - Figma API format (for HTTP MCP)

3. **Update plugin**:
   - Plugin will auto-detect changes if using Git/URL source
   - Or manually re-upload JSON if using file upload

4. **Apply in designs**:
   - Team applies updated tokens to designs
   - Changes propagate to all linked components

### Import from Figma to LaunchApp

**Currently blocked pending HTTP MCP support**

Once available:

1. **Export from Figma Tokens plugin**:
   - Plugin menu → **Export** → Download JSON

2. **Run import script**:
   ```bash
   npm run figma-sync:import --file=/path/to/exported-tokens.json
   ```

3. **Review changes**:
   - Script generates PR with proposed changes
   - Team reviews color changes
   - Merge approved changes

## Troubleshooting

### Plugin Not Detecting Tokens

**Problem**: Tokens don't appear in plugin panel

**Solutions**:
1. Check JSON syntax - use [jsonlint.com](https://jsonlint.com)
2. Verify token file location (if using Git)
3. Reload plugin: Close and reopen Figma
4. Check browser console for errors (Figma → Menu → Plugins → Development)

### Colors Not Updating

**Problem**: Changes to token values don't reflect in designs

**Solutions**:
1. Re-apply token to component (token links may be broken)
2. Check if component is using token or manual color
3. Ensure token set is active (check theme dropdown)
4. Sync token file if using Git source

### Token Values Appear Incorrect

**Problem**: Colors look different in Figma vs design system

**Solutions**:
1. Check color space settings (RGB vs HSL)
2. Verify Figma's color management settings
3. Compare exported hex values with source HSL
4. Check browser/OS color profile

### Merge Conflicts in tokens.json

**Problem**: Git merge conflicts when multiple people update tokens

**Solutions**:
1. Use structured token file organization
2. Assign token ownership (palette responsibility)
3. Pull latest before making changes
4. Communicate token changes in team channel

## Best Practices

### 1. Organize Token Sets Logically

```json
{
  "colors": {
    "semantic": { ... },
    "backgrounds": { ... }
  },
  "spacing": { ... },
  "typography": { ... }
}
```

### 2. Use Descriptive Token Names

**Good**:
- `primary-action-background`
- `destructive-button-foreground`
- `card-border-subtle`

**Avoid**:
- `color1`, `color2`
- `red`, `blue` (not semantic)
- `bg`, `fg` (ambiguous)

### 3. Document Token Purpose

```json
{
  "primary": {
    "value": "#a855f7",
    "type": "color",
    "description": "Primary action color - use for CTA buttons, active states"
  }
}
```

### 4. Group Related Tokens

Organize hierarchically for better UX:
```
Colors
  ├── Semantic
  │   ├── Primary
  │   ├── Secondary
  │   └── Destructive
  └── Backgrounds
      ├── Surface
      └── Card
```

### 5. Version Your Tokens

Include version in metadata:
```json
{
  "metadata": {
    "version": "1.0.0",
    "updated": "2026-03-26"
  }
}
```

## Advanced Features

### Token Aliases

Reference other tokens within definitions:

```json
{
  "default-light": {
    "colors": {
      "primary": {
        "value": "#a855f7",
        "type": "color"
      },
      "primary-hover": {
        "value": "{primary}",
        "type": "color",
        "description": "Uses primary token as reference"
      }
    }
  }
}
```

### Conditional Tokens

Support different token sets based on conditions:

```json
{
  "default-light": { ... },
  "default-dark": { ... },
  "high-contrast-light": { ... },
  "high-contrast-dark": { ... }
}
```

## Integration with CI/CD

### GitHub Actions Integration

```yaml
name: Export Design Tokens

on:
  push:
    branches: [main]
    paths: ['src/themes/**']

jobs:
  export:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm run figma-sync:export
      - uses: actions/upload-artifact@v3
        with:
          name: tokens
          path: exports/tokens.json
```

### Automated PR Creation

When tokens change in Figma:

1. Webhook triggers GitHub workflow
2. Pulls latest tokens from Figma
3. Creates PR with changes
4. Team reviews and merges

## Figma Tokens Plugin vs. HTTP MCP

### Current State (Figma Tokens Plugin)
✅ Manual token management
✅ Visual interface
✅ Theme switching
✅ One-way export from code

### Future State (with HTTP MCP)
✅ Automated bidirectional sync
✅ Real-time updates
✅ Webhook-based triggers
✅ Audit logs and versioning
✅ No manual file management

## References

- [Figma Tokens Documentation](https://tokens.studio/docs)
- [Figma Tokens Plugin GitHub](https://github.com/tokens-studio/figma-plugin)
- [Figma Variables API](https://www.figma.com/developers/api#variables)
- [LaunchApp Design System](https://github.com/launchapp-dev/design-system)

## Support

For issues or questions:

1. **Figma Tokens Plugin**: Check [Community Slack](https://tokens.studio/slack)
2. **LaunchApp Design System**: Create GitHub issue
3. **HTTP MCP Blocking**: Track in main project board

## Roadmap

### Q2 2026
- [ ] HTTP MCP support available
- [ ] Automated Figma sync enabled
- [ ] Real-time token updates

### Q3 2026
- [ ] Component variant mapping
- [ ] Multi-brand token support
- [ ] Advanced styling tokens

### Q4 2026
- [ ] AI-powered token suggestions
- [ ] Design handoff automation
