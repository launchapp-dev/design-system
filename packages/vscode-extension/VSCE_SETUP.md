# VSCE Configuration & Publishing Setup

## Overview

VSCE (Visual Studio Code Extension Manager) is used to package and publish the extension to the VS Code marketplace.

## Installation

### Global Installation

```bash
npm install -g @vscode/vsce
vsce --version
```

### Verify Installation

```bash
vsce verify-pat
# Should return version info if properly installed
```

## Azure Personal Access Token (PAT) Setup

### Step 1: Create Azure DevOps Organization

1. Go to https://dev.azure.com/
2. Sign in with your Microsoft/GitHub account
3. Create a new organization (or use existing)

### Step 2: Create Personal Access Token

1. In Azure DevOps, click your profile icon (top-right)
2. Select "Personal access tokens"
3. Click "New Token"
4. Configure:
   - **Name**: "VS Code Extension Publishing"
   - **Organization**: Select your organization
   - **Expiration**: 1 year (or custom)
   - **Scopes**:
     - ☑ Marketplace (Manage)
5. Click "Create"
6. **Copy and save the token** (you won't see it again)

### Step 3: Store PAT in GitHub Secrets

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. **Name**: `VSCE_PAT`
5. **Secret**: Paste your Azure PAT
6. Click "Add secret"

### Step 4: Local VSCE Login (Optional)

For local testing/publishing:

```bash
vsce login launchapp
# Paste your Azure PAT when prompted
# Token is stored locally in ~/.vsce file (DON'T commit)
```

## VS Code Marketplace Publisher Account

### Create Publisher Account

1. Go to https://marketplace.visualstudio.com/
2. Sign in with Microsoft account
3. Go to "Create publisher" or manage existing publisher
4. Enter publisher name: **launchapp**
5. Verify account with email confirmation

### Add Account to Organization (Recommended)

1. In marketplace publisher dashboard
2. Go to Team Management
3. Add team members or service accounts
4. Set permissions for publishing

## Extension Manifest Configuration

The `package.json` contains all marketplace configuration:

```json
{
  "name": "@launchapp/vscode-design-system",
  "displayName": "LaunchApp Design System",
  "description": "...",
  "publisher": "launchapp",
  "version": "0.1.0",
  "icon": "icons/icon.png",
  "keywords": [...],
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/launchapp-dev/design-system"
  }
}
```

**Key fields:**
- `publisher`: Must match your marketplace publisher name
- `version`: Semantic versioning (major.minor.patch)
- `icon`: 128x128 PNG image path
- `displayName`: Used in marketplace (max 50 chars)
- `description`: Short summary (max 200 chars)

## VSCE Configuration File

The `.vscerc` file provides additional VSCE options:

```json
{
  "baseContentUrl": "https://github.com/launchapp-dev/design-system/tree/main/packages/vscode-extension",
  "baseImagesUrl": "https://github.com/launchapp-dev/design-system/raw/main/packages/vscode-extension",
  "github": true
}
```

**Options:**
- `baseContentUrl`: Base URL for relative links in README
- `baseImagesUrl`: Base URL for relative image paths
- `github`: Enable GitHub-specific features in marketplace

## Packaging

### Create Package Locally

```bash
cd packages/vscode-extension

# Method 1: Using npm script
npm run package
# Creates: vscode-design-system.vsix

# Method 2: Using VSCE directly
vsce package
# Creates: vscode-design-system-0.1.0.vsix
```

### Package Contents

The VSIX is a ZIP archive containing:
- `dist/extension.js` - Compiled extension code
- `package.json` - Manifest
- `icons/icon.png` - Extension icon
- `snippets/` - Snippet definitions
- `README.md` - Documentation
- `node_modules/@launchapp/design-system/` - Dependencies

Files excluded by `.vscodeignore`:
- TypeScript source files (`src/`)
- Build config files
- Development dependencies
- Test files

## Publishing

### Method 1: GitHub Actions (Recommended)

Automatic publishing on release:

```bash
# Tag release
git tag vscode-extension-v0.2.0

# Push tag (triggers workflow)
git push origin vscode-extension-v0.2.0
```

Workflow will:
1. Build the extension
2. Create VSIX package
3. Publish to marketplace
4. Create GitHub release

### Method 2: Local Publishing

```bash
cd packages/vscode-extension

# Ensure logged in
vsce login launchapp

# Publish
vsce publish

# Or publish pre-release
vsce publish --pre-release

# Or publish patch version (auto-increment)
vsce publish patch
```

## Version Management

### Semantic Versioning

Format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

Examples:
- `0.1.0` - Initial release
- `0.2.0` - Add new features
- `0.2.1` - Bug fix
- `1.0.0` - First stable release

### Version Bumping

```bash
cd packages/vscode-extension

# Bump patch (0.1.0 → 0.1.1)
vsce publish patch

# Bump minor (0.1.0 → 0.2.0)
vsce publish minor

# Bump major (0.1.0 → 1.0.0)
vsce publish major

# Publish specific version
vsce publish 1.0.0
```

## Pre-release Publishing

For alpha/beta versions:

```bash
cd packages/vscode-extension

# Publish as pre-release
vsce publish --pre-release

# Or using npm script
npm run publish:pre
```

Pre-release versions:
- Display as "Pre-Release" in marketplace
- Not installed by default (users opt-in)
- Don't affect version history for stable releases

## Marketplace Analytics

After publishing, monitor:

1. **Marketplace Page**
   - https://marketplace.visualstudio.com/items?itemName=launchapp.vscode-design-system
   - View ratings, reviews, download stats

2. **Extension Publishing Dashboard**
   - https://marketplace.visualstudio.com/manage/publishers/launchapp
   - Detailed analytics and settings

3. **GitHub Releases**
   - https://github.com/launchapp-dev/design-system/releases
   - Track all releases

## Troubleshooting

### "Not Authorized" Error

```
Error: Not authorized to publish to launchapp
```

Solutions:
- Verify PAT is valid and not expired
- Check publisher name matches in package.json
- Ensure PAT has Marketplace (Manage) scope

### Version Already Exists

```
Error: The extension version 0.1.0 already exists
```

Solutions:
- Use unique version number
- Don't publish same version twice
- Update package.json version before publishing

### Icon Not Found

```
Error: Icon file not found
```

Solutions:
- Ensure `icons/icon.png` exists
- Use correct relative path in package.json
- File must be exactly 128x128 pixels

### PAT Expired

```
Token expired or invalid
```

Solutions:
- Generate new PAT in Azure DevOps
- Update GitHub secret with new token
- Update local VSCE login

## Security Best Practices

1. **PAT Management**
   - Never commit PAT to repository
   - Use GitHub secrets for CI/CD
   - Rotate PAT annually
   - Limit PAT expiration to 1 year

2. **Publisher Account**
   - Use strong password
   - Enable two-factor authentication
   - Review team member access
   - Audit publishing history

3. **Publishing Process**
   - Review changes before publishing
   - Test in development first
   - Use signed commits
   - Maintain changelog

## Next Steps

1. Create Azure DevOps account
2. Generate personal access token
3. Add token to GitHub secrets
4. Test publishing with pre-release
5. Deploy to marketplace
6. Monitor analytics and feedback
