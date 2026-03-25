# Contributing to @launchapp/design-system

## Release Process

This project uses [Changesets](https://github.com/changesets/changesets) to manage versioning and publishing to npm. Releases are published automatically to npm via GitHub Actions when changes are merged to `main`.

### Creating a Changeset

Changesets allow you to document version bumps and changelogs alongside your code changes. To create a changeset:

1. Add a `.changeset/*.md` file describing the changes:
   ```bash
   # Automatic (interactive prompt)
   npm run changeset

   # Manual: create `.changeset/my-feature.md`
   ---
   "@launchapp/design-system": minor
   ---

   Description of the changes in this release
   ```

   Version bump types:
   - `patch` - Bug fixes and minor improvements (0.1.0 → 0.1.1)
   - `minor` - New features (0.1.0 → 0.2.0)
   - `major` - Breaking changes (0.1.0 → 1.0.0)

2. Commit the changeset file alongside your code changes

3. When the PR is merged to `main`, the `release.yml` GitHub Actions workflow will:
   - Create a "Version Packages" PR that applies all pending changesets
   - Update `package.json` version and `CHANGELOG.md`
   - Publish the new version to npm with `npm publish --access public`

### Pre-release (Alpha) Versions

To publish a pre-release version (e.g., `0.2.1-alpha.0`):

1. Create a changeset as above
2. Enter pre-release mode:
   ```bash
   npm run changeset -- pre enter alpha
   ```
3. Create another changeset for the alpha bump:
   ```bash
   npm run changeset -- add --empty
   # Edit the changeset to specify patch/minor/major bump
   ```
4. Run locally to test:
   ```bash
   npm run changeset:version  # Bumps version to X.Y.Z-alpha.0
   npm run build             # Build dist files
   npm publish --tag alpha --access public  # Publish with alpha tag (requires npm auth)
   ```

5. Install the pre-release:
   ```bash
   npm install @launchapp/design-system@alpha
   ```

6. After publishing the alpha version, exit pre-release mode:
   ```bash
   npm run changeset -- pre exit
   ```

### Verifying Pre-release Versions

After publishing:
- View on npm: https://www.npmjs.com/package/@launchapp/design-system
- Install alpha tag: `npm install @launchapp/design-system@alpha`
- View GitHub Releases for changelog: https://github.com/launchapp-dev/design-system/releases

### Publishing a New Version

The traditional npm version approach is no longer used. All releases now go through changesets:

1. Create and commit a changeset file (see above)
2. Push to a branch and create a PR
3. When merged to `main`, the GitHub Actions workflow handles versioning and publishing

### Required Secrets

The repository must have the following GitHub Actions secrets configured:

- `NPM_TOKEN` - npm token with publish access to the `@launchapp` npm scope. Generate at https://www.npmjs.com/settings/~/tokens with "Automation" type for CI/CD
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions

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
