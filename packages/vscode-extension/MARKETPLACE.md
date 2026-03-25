# VS Code Marketplace Publishing Guide

## Marketplace Assets

This document describes the marketplace assets and how to create them.

### Extension Icon

- **Location**: `icons/icon.png`
- **Size**: 128x128 pixels
- **Format**: PNG
- **Status**: ✅ Created

The extension icon is displayed in the VS Code marketplace and extension list.

### Screenshot Assets

The `assets/` directory contains marketplace screenshots:

- `screenshot1.png` - Component snippets in action (1280x720px recommended)
- `screenshot2.png` - Prop autocomplete feature (1280x720px recommended)
- `screenshot3.png` - Design token preview (1280x720px recommended)

**How to create screenshots:**

1. Open VS Code with a LaunchApp design system project
2. Create a `.tsx` file with sample component usage
3. Take screenshots showing:
   - Component snippet suggestions appearing
   - Autocomplete with prop hints
   - Hover preview of design tokens

4. Optimize screenshots:
   - Use 1280x720 resolution minimum
   - Ensure good contrast and readability
   - Include meaningful code context
   - Highlight key features with visual indicators

### Marketplace Description

The marketplace description is pulled from:
- `displayName`: Short name (max 50 characters)
- `description`: One-line description (max 200 characters)
- `README.md`: Full documentation

Current values:
- **Display Name**: "LaunchApp Design System"
- **Description**: "VS Code extension providing component snippets, prop autocomplete, and design token preview"

### Keywords

The extension is tagged with these keywords for discoverability:
- design-system
- components
- snippets
- react
- typescript
- tailwind
- radix-ui
- autocomplete
- tokens

### Publishing Details

- **Publisher**: launchapp
- **Repository**: https://github.com/launchapp-dev/design-system
- **License**: MIT
- **VS Code Requirement**: ^1.85.0

## Publishing Steps

### Prerequisites

1. Create a VS Code Marketplace account at https://marketplace.visualstudio.com
2. Create a Personal Access Token (PAT) for publishing:
   - Go to https://dev.azure.com/
   - Create a new personal access token with "Marketplace" scope
   - Save the token securely

3. Add the token to GitHub:
   - Go to your GitHub repository Settings → Secrets and variables → Actions
   - Create a new secret named `VSCE_PAT`
   - Paste the Azure token

### Publishing via GitHub Actions

The extension will automatically publish to the marketplace when:

1. **On Release Tag**: Push a tag matching the pattern `vscode-extension-v*`
   ```bash
   git tag vscode-extension-v0.2.0
   git push origin vscode-extension-v0.2.0
   ```

2. **Manual Workflow**: Trigger the workflow manually with custom pre-release option

### Publishing Locally (Alternative)

```bash
cd packages/vscode-extension

# Login to VS Code Marketplace
vsce login launchapp

# Publish the extension
npm run publish

# Or publish as pre-release
npm run publish:pre
```

## Marketplace Listing Checklist

- [x] Icon (128x128 PNG) created
- [x] Display name set
- [x] Description provided
- [x] Keywords added
- [x] Repository URL configured
- [x] License specified (MIT)
- [x] VS Code version requirement defined
- [ ] Screenshots added to assets/ (manual step)
- [ ] Changelog added to README
- [ ] GitHub Actions token configured
- [ ] First release published

## Marketplace Policies

Ensure your extension complies with:
- VS Code Marketplace Policies: https://code.visualstudio.com/api/references/extension-manifest
- Usage agreements: https://marketplace.visualstudio.com/explore
- No telemetry without user consent
- Proper error handling and logging
- Clear documentation

## Monitoring & Updates

After publishing:

1. Monitor marketplace page for user reviews
2. Track download statistics
3. Keep changelog updated
4. Publish updates regularly
5. Respond to user feedback

## Version Bumping

To release a new version:

1. Update `version` in `package.json`
2. Update `CHANGELOG.md` with new features/fixes
3. Commit changes: `git commit -m "chore: bump vscode extension version to X.Y.Z"`
4. Tag release: `git tag vscode-extension-vX.Y.Z`
5. Push: `git push origin --tags`

The GitHub Actions workflow will automatically build, package, and publish.
