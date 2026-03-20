# Contributing to @launchapp/design-system

## Release Process

Releases are published automatically to npm via GitHub Actions when a version tag is pushed.

### Publishing a New Version

1. Update the version in `package.json`:
   ```bash
   npm version patch   # 0.1.0 → 0.1.1
   npm version minor   # 0.1.0 → 0.2.0
   npm version major   # 0.1.0 → 1.0.0
   ```
   This creates a commit and a git tag automatically.

2. Push the commit and tag:
   ```bash
   git push origin main --follow-tags
   ```

3. The `release.yml` workflow triggers on `v*.*.*` tags and:
   - Installs dependencies
   - Runs `npm run build` (tsup)
   - Publishes to npm with `npm publish --access public`

### Required Secret

The repository must have `NPM_TOKEN` set in GitHub Actions secrets with publish access to the `@launchapp` npm scope.

## Visual Regression Testing

This project uses [Chromatic](https://www.chromatic.com/) for visual regression testing. Chromatic captures snapshots of every Storybook story and detects unintended UI changes on every PR.

### How It Works

The `chromatic.yml` workflow runs on every push to any branch. It builds Storybook and uploads snapshots to Chromatic, which compares them against the accepted baseline.

### Reviewing Visual Changes

When Chromatic detects visual differences, the PR check will fail. Visit the Chromatic UI to review each change and either:
- **Accept** the change as the new baseline (intentional update)
- **Deny** the change to block the PR (unintended regression)

### Required Secret

The repository must have `CHROMATIC_PROJECT_TOKEN` set in GitHub Actions secrets. To get the token:
1. Go to [chromatic.com](https://www.chromatic.com/) and sign in with GitHub
2. Create or select the project for this repository
3. Copy the project token from the project's Manage page
4. Add it as a secret named `CHROMATIC_PROJECT_TOKEN` in the repository's Settings → Secrets and variables → Actions

### Running Chromatic Locally

```bash
CHROMATIC_PROJECT_TOKEN=<your-token> npm run chromatic
```

### Dry Run

To verify what will be published without actually publishing:

```bash
npm run build
npm publish --dry-run
```

Only the `dist/` directory is included in the published package (controlled by the `files` field in `package.json` and `.npmignore`).

## shadcn Registry

The `registry.json` file is hosted on GitHub Pages at:

```
https://launchapp-dev.github.io/design-system/registry.json
```

It is published automatically via the `pages.yml` workflow whenever `registry.json` changes on `main`.

To add a component from the registry using the shadcn CLI:

```bash
npx shadcn@latest add --registry https://launchapp-dev.github.io/design-system/registry.json button
```
