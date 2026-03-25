# VS Code Extension Testing & Validation Guide

## Build & Package Testing

### 1. Build Verification

```bash
cd packages/vscode-extension

# Verify TypeScript compilation
npm run build

# Expected output:
# - dist/extension.js should be created
# - No TypeScript errors
# - Output file size > 0
```

### 2. Package Creation Test

```bash
# Create the VSIX package
npm run test-package

# Expected output:
# - test-build.vsix file created
# - File size > 50KB
# - ✓ Package created successfully message
```

### 3. VSIX Content Validation

```bash
# List contents of the package
unzip -l test-build.vsix

# Verify contents include:
# - dist/extension.js (compiled code)
# - package.json (manifest)
# - icons/icon.png (extension icon)
# - snippets/components.json
# - snippets/imports.json
# - README.md
# - node_modules/@launchapp/design-system
# - NOT: src/*.ts files
# - NOT: tsconfig.json
```

## Local Installation Testing

### 1. Install from VSIX

```bash
cd packages/vscode-extension

# Create a package
npm run test-package

# Install in VS Code (via CLI)
code --install-extension test-build.vsix

# Or install via VS Code UI:
# - Open Extensions view (Ctrl+Shift+X)
# - Click "..." menu → "Install from VSIX..."
# - Select test-build.vsix
```

### 2. Verify Extension Loading

- Open VS Code
- Go to Extensions (Ctrl+Shift+X)
- Search for "LaunchApp Design System"
- Verify extension shows as installed
- Check "About" shows version 0.1.0

### 3. Test Activation Events

Open a file with these extensions to trigger activation:
- Create `test.tsx` (triggers `onLanguage:typescriptreact`)
- Create `test.ts` (triggers `onLanguage:typescript`)
- Create `test.jsx` (triggers `onLanguage:jsx`)
- Create `test.js` (triggers `onLanguage:javascript`)

Check:
- No errors in Extension Host output
- Extension appears in "Installed Extensions"

### 4. Test Component Snippets

In a `.tsx` file, test snippet insertion:

```bash
# Test 1: Button component snippet
# Type: Button
# Trigger Ctrl+Space and select "Button component"
# Expected: Component snippet with props appears

# Test 2: Input component snippet
# Type: Input
# Trigger Ctrl+Space and select "Input component"
# Expected: Input snippet appears

# Test 3: Form submission
# Type: Form
# Trigger Ctrl+Space to see suggestions
```

### 5. Test Keyboard Shortcuts

```bash
# Test Insert Component shortcut
# Press Ctrl+Shift+L (Cmd+Shift+L on Mac)
# Expected: Quick picker appears with component list
# Select a component and verify it's inserted
```

### 6. Test Hover Provider

Hover over component element names and verify:
- Tooltip appears with component description
- No console errors

## Marketplace Testing

### 1. Pre-publish Validation

```bash
# Use VSCE to validate package
npm install -g @vscode/vsce
cd packages/vscode-extension

# Validate against marketplace requirements
vsce show

# Check for warnings/errors in output
```

### 2. Metadata Verification

Verify in `package.json`:
```json
{
  "name": "@launchapp/vscode-design-system",
  "displayName": "LaunchApp Design System",
  "description": "VS Code extension providing component snippets...",
  "publisher": "launchapp",
  "version": "0.1.0",
  "icon": "icons/icon.png"
}
```

### 3. Icon Validation

```bash
# Verify icon exists and is valid PNG
file packages/vscode-extension/icons/icon.png
# Expected: PNG image data, 128 x 128

# Check for transparency/quality
identify packages/vscode-extension/icons/icon.png
```

### 4. README Validation

Verify README.md includes:
- Clear description of features
- Installation instructions
- Usage examples
- Keyboard shortcuts
- Links to marketplace
- Contributing guidelines
- License information

## GitHub Actions Workflow Testing

### 1. Workflow File Validation

```bash
# Validate GitHub Actions syntax
cd .github/workflows
# Check publish-extension.yml for:
# - Valid YAML syntax
# - Proper indentation
# - All required fields present
```

### 2. Dry-run Testing

```bash
# Create a test release tag
git tag vscode-extension-v0.1.0-test

# Push to test branch or staging
# Monitor GitHub Actions:
# - Workflow should trigger
# - All steps should pass
# - VSIX artifact created
```

### 3. Secret Configuration

Verify in GitHub repository settings:
- `VSCE_PAT` secret is configured
- Token has Marketplace publish scope
- No token leaks in logs

## Manual Publishing Test

### Test Locally First:

```bash
cd packages/vscode-extension

# Install VSCE globally
npm install -g @vscode/vsce

# Login with test account
vsce login launchapp

# Create test package
vsce package

# Verify output
ls -lh *.vsix
```

### Pre-publish Checks:

1. **Version verification**: Ensure version is unique
2. **Dependency check**: All dependencies are available
3. **Changelog updated**: Release notes prepared
4. **Documentation**: README and guides current
5. **Tests passing**: No console errors

## Acceptance Testing Checklist

- [ ] Build completes without errors
- [ ] VSIX package created successfully
- [ ] Package contents are correct
- [ ] Icon is properly sized (128x128 PNG)
- [ ] Extension installs from VSIX
- [ ] Extension activates on file open
- [ ] Component snippets work
- [ ] Keyboard shortcut functions
- [ ] Hover provider shows info
- [ ] No console errors
- [ ] VS Code version requirement correct
- [ ] Marketplace metadata complete
- [ ] README is accurate
- [ ] License specified
- [ ] Repository links work
- [ ] GitHub Actions workflow valid
- [ ] VSCE PAT token configured
- [ ] No secrets in code/logs

## Troubleshooting

### Build Fails
- Ensure Node.js 18+ installed
- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npx tsc --noEmit`

### VSIX Creation Fails
- Verify esbuild output exists: `ls dist/extension.js`
- Check .vscodeignore syntax
- Ensure icon file exists: `ls icons/icon.png`

### Extension Won't Activate
- Check activation events in manifest
- Verify language identifiers (tsx, ts, jsx, js)
- Review VS Code output panel for errors

### Publishing Fails
- Verify VSCE PAT is valid and in secrets
- Check version is unique (not already published)
- Ensure publisher name matches in package.json

## Performance Testing

1. **Startup Impact**: Measure VS Code startup time with/without extension
2. **Memory Usage**: Monitor memory in Activity Monitor (Mac) or Task Manager (Windows)
3. **Autocomplete Response**: Test suggestion latency
4. **Hover Response**: Test hover provider latency

Target metrics:
- Extension activation: < 500ms
- Snippet suggestions: < 100ms
- Hover display: < 200ms
- Memory overhead: < 50MB

## Security Testing

1. **No Telemetry**: Verify no data sent to external services
2. **Permission Checks**: Ensure only necessary VS Code APIs used
3. **Input Validation**: Test with malformed component files
4. **Error Handling**: Graceful handling of errors
5. **Dependency Audit**: `npm audit` should have no critical issues

## Rollback Plan

If issues found after publishing:

1. **Immediate fix**: Unpublish from marketplace if critical
2. **Prepare patch**: Create bug-fix release
3. **Tag patch**: `git tag vscode-extension-v0.1.1`
4. **Re-publish**: Push tag to trigger workflow
5. **Communicate**: Update marketplace listing with notes

## Continuous Testing

After publishing, monitor:
- Marketplace reviews and ratings
- User issue reports
- Performance metrics
- Download statistics
- Update frequencies from users
