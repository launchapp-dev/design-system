# Publishing the VS Code Extension

This guide explains how to publish the LaunchApp Design System extension to the VS Code Marketplace.

## Prerequisites

1. **VS Code Marketplace Publisher Account**
   - Create an account at https://marketplace.visualstudio.com/publishers
   - You need to be part of the `launchapp` publisher organization or create your own

2. **Personal Access Token (PAT)**
   - Generate a PAT from your publisher account settings
   - Required for automated publishing
   - Store as `VSCE_PAT` in GitHub repository secrets

3. **Required Tools**
   - Node.js >= 18
   - vsce (VS Code Extension CLI): `npm install -g @vscode/vsce`

## Automated Publishing (Recommended)

The extension automatically builds and publishes when you:

1. Push to the `main` branch with changes in `apps/vscode-extension/` directory
2. Or manually trigger via GitHub Actions:
   - Go to Actions → "Publish VS Code Extension"
   - Click "Run workflow"
   - Check "Publish to marketplace" checkbox
   - Click "Run workflow"

### Setup for Automated Publishing

1. **Add Secret to GitHub**
   - Go to repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `VSCE_PAT`
   - Value: Your Personal Access Token from VS Code Marketplace
   - Click "Add secret"

2. **Configure Workflow (if needed)**
   - Edit `.github/workflows/publish-vscode-extension.yml`
   - Ensure `VSCE_PAT` secret is configured in the workflow

## Manual Publishing

### 1. Build the Extension

```bash
cd apps/vscode-extension
bash build.sh
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### 2. Install vsce (if not already installed)

```bash
npm install -g @vscode/vsce
```

### 3. Login to Publisher Account

```bash
vsce login launchapp
```

You'll be prompted to enter your Personal Access Token.

### 4. Package the Extension

```bash
cd apps/vscode-extension
vsce package
```

This creates a `.vsix` file (e.g., `launchapp-vscode-extension-0.1.0.vsix`)

### 5. Publish to Marketplace

```bash
vsce publish
```

Or publish a specific version bump:

```bash
vsce publish patch     # 0.1.0 → 0.1.1
vsce publish minor     # 0.1.0 → 0.2.0
vsce publish major     # 0.1.0 → 1.0.0
```

### 6. Verify Publication

- Check https://marketplace.visualstudio.com/items?itemName=launchapp.design-system
- Wait 5-10 minutes for the listing to appear in marketplace search
- The extension should be installable from VS Code Extensions view

## Version Management

The extension version is defined in `apps/vscode-extension/package.json`:

```json
{
  "version": "0.1.0"
}
```

When publishing with vsce, it automatically:
- Updates the version
- Commits to git
- Creates a git tag
- Publishes to marketplace

## Troubleshooting

### "vsce publish" fails with authentication error

1. Verify your PAT is still valid
2. Re-login: `vsce login launchapp`
3. Check that your account is part of the `launchapp` publisher

### Extension not appearing in marketplace after publishing

1. Publishing takes 5-10 minutes to sync
2. Clear VS Code extension cache: Cmd+Shift+P → "Developer: Clear Extension Cache"
3. Refresh browser at marketplace.visualstudio.com

### Build fails with TypeScript errors

1. Check Node.js version: `node --version` (should be >= 18)
2. Run `bash build.sh` from `apps/vscode-extension/` directory
3. Check for TypeScript errors: `npx -p typescript tsc --noEmit`

### vsce not found

Install globally:
```bash
npm install -g @vscode/vsce
```

## Post-Publication

### Update Marketplace Listing

Edit the following in the marketplace:
- Icon (512x512 PNG)
- Banner color
- Description and keywords
- Categories and tags
- Links (repository, issues, etc.)

### Monitor Usage

- Check monthly downloads and ratings
- Review user reviews and feedback
- Fix reported issues in GitHub

## Rollback

If you need to unpublish a version:

```bash
vsce unpublish launchapp.design-system --version 0.1.0
```

Note: You can't delete a published version but can upload a fixed version.

## References

- [VS Code Extension Publishing Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [vsce Documentation](https://github.com/microsoft/vscode-vsce)
- [Extension Marketplace](https://marketplace.visualstudio.com)
