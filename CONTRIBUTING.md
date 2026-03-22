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

The `chromatic.yml` workflow runs on every push and pull request to any branch. It builds Storybook and uploads snapshots to Chromatic, which compares them against the accepted baseline.

**Key Features:**
- **Screenshot diffs**: Every Storybook story is captured and compared against baselines
- **PR comments**: Chromatic automatically comments on PRs with links to visual diffs when changes are detected
- **Auto-approval**: Changes on the `main` branch are automatically accepted as new baselines
- **Exit safely**: The workflow uses `exitZeroOnChanges: true` to avoid blocking CI on visual changes (reviewers decide in Chromatic UI)

### Initial Setup

To set up Chromatic for this project:

1. **Create a Chromatic project:**
   ```bash
   npx chromatic --project-token=<your-token>
   ```
   This will guide you through creating a new Chromatic project.

2. **Get your project token:**
   - Go to [chromatic.com](https://www.chromatic.com/) and sign in with GitHub
   - Select or create the project for this repository
   - Copy the project token from the project's Manage page

3. **Add the token to GitHub:**
   - Go to the repository's Settings → Secrets and variables → Actions
   - Add a new secret named `CHROMATIC_PROJECT_TOKEN` with your token value

4. **Update the Chromatic badge:**
   - After creating the project, get your Chromatic app ID from the project URL or settings
   - Update the badge URL in `README.md`:
     ```
     [![Chromatic](https://img.shields.io/badge/Chromatic-visual%20testing-4a48f5?logo=chromatic&labelColor=4a48f5)](https://www.chromatic.com/library?appId=YOUR_APP_ID)
     ```

### Reviewing Visual Changes

When Chromatic detects visual differences, the PR check will fail. Visit the Chromatic UI to review each change and either:
- **Accept** the change as the new baseline (intentional update)
- **Deny** the change to block the PR (unintended regression)

Chromatic will automatically comment on your PR with a link to review the visual changes.

### Running Chromatic Locally

```bash
CHROMATIC_PROJECT_TOKEN=<your-token> npm run chromatic
```

This is useful for:
- Testing visual changes before pushing
- Debugging story issues
- Reviewing baselines locally

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
