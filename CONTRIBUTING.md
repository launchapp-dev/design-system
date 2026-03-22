# Contributing to @launchapp/design-system

## Release Process

Releases are managed using [Changesets](https://github.com/changesets/changesets) for semantic versioning and automated changelog generation.

### Known Limitation

The current repository structure has the main package (`@launchapp/design-system`) at the root level, which is not fully compatible with changesets' expectations. For complete automation, the package should be moved to `packages/design-system/`. The current setup provides the infrastructure for changesets, but manual intervention may be needed for version management.

### Making Changes

1. When making changes that should be included in the next release, add a changeset:
   ```bash
   npm run changeset
   ```
   
   This will prompt you to:
   - Select the change type (patch, minor, or major)
   - Write a description of the change

2. Commit the generated changeset file (in `.changeset/`) along with your code changes.

### Release Workflow

The release process is automated via GitHub Actions when changes are merged to the `main` branch:

1. **Version Bump**: The Changesets GitHub Action automatically:
   - Creates or updates a "Version Packages" PR with version bumps and changelog updates
   - Consumes changeset files

2. **Publishing**: When the "Version Packages" PR is merged:
   - The package is automatically published to npm
   - A git tag is created for the new version
   - A GitHub release is created

### Manual Release (Current Workaround)

Due to the monorepo structure limitation, you may need to manually manage releases:

```bash
# 1. Update version in package.json manually
npm version patch  # or minor, or major

# 2. Update CHANGELOG.md with your changes

# 3. Build and publish
npm run build
npm publish --access public

# 4. Push changes and tags
git push origin main --follow-tags
```

### Required Secret

The repository must have `NPM_TOKEN` set in GitHub Actions secrets with publish access to the `@launchapp` npm scope.

#### Setting up NPM_TOKEN

1. Create an npm account or use an existing one
2. Generate an automation token:
   - Go to https://www.npmjs.com/settings/<username>/tokens
   - Click "Generate New Token" → "Classic Token"
   - Select "Automation" type
   - Copy the token
3. Add the token to GitHub:
   - Go to repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: paste your npm token
4. Ensure the token has publish access to `@launchapp` organization

### Dry Run

To verify what will be published without actually publishing:

```bash
npm run build
npm publish --dry-run
```

Only the `dist/` directory is included in the published package (controlled by the `files` field in `package.json`).

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
