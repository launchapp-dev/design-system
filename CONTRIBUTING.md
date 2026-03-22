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

The visual testing pipeline consists of two workflows:

1. **`chromatic.yml`** - Runs on every push to `main` and every pull request
   - Builds the complete Storybook
   - Captures visual snapshots of all stories
   - Compares against the baseline
   - Updates PR comments with results
   - Fails the build if visual changes are detected on PRs

2. **`chromatic-pr-comment.yml`** - Runs after Chromatic completes
   - Posts detailed visual diff information to PRs
   - Provides links to Chromatic UI for review
   - Explains next steps for reviewers

### Screenshot Generation

Every Storybook story (components, blocks, and examples) is captured as a screenshot:
- **Desktop viewport**: 1280x720
- **Mobile viewport**: 375x667 (if configured)
- **Interactions**: Stories with interactions are captured in all states
- **Dark mode**: Both light and dark mode variants are captured

### Auto-Approval Rules

Visual changes are handled differently based on the branch:

| Branch | Behavior | Reason |
|--------|----------|--------|
| `main` | **Auto-accepted** | Updates the baseline for all future comparisons |
| PR branches | **Requires review** | Prevents unintended visual regressions |
| All branches | **Small changes** | May be auto-approved based on tolerance settings |

#### Configuring Auto-Approval

Auto-approval can be fine-tuned in the Chromatic project settings:
1. Go to your Chromatic project settings
2. Navigate to "Manage" → "UI Review"
3. Configure "Auto-accept changes" thresholds
4. Set tolerance levels for minor visual differences

### Reviewing Visual Changes

When Chromatic detects visual differences on a PR:

1. **Check the PR comment** - It will show the status and link to Chromatic UI
2. **Visit Chromatic UI** - Click the build URL to see the visual diffs
3. **Review each change**:
   - **Accept** ✅ - Mark as intentional design update
   - **Deny** ❌ - Block the PR (unintended regression)
4. **Merge only after review** - All changes should be reviewed before merging

### UI Change Detection

Chromatic flags UI changes in PRs through:

1. **PR Status Check** - Fails if visual changes are detected
2. **PR Comments** - Detailed information about the changes
3. **GitHub Summary** - Build information in the Actions summary
4. **Email Notifications** - Alerts for subscribed users

### Required Secret

The repository must have `CHROMATIC_PROJECT_TOKEN` set in GitHub Actions secrets. To get the token:

1. Go to [chromatic.com](https://www.chromatic.com/) and sign in with GitHub
2. Create or select the project for this repository
3. Copy the project token from the project's Manage page
4. Add it as a secret named `CHROMATIC_PROJECT_TOKEN` in:
   - Repository Settings → Secrets and variables → Actions
   - Or organization secrets for multiple repositories

### Running Chromatic Locally

To run visual tests locally before pushing:

```bash
# Set your Chromatic project token
export CHROMATIC_PROJECT_TOKEN=<your-token>

# Run Chromatic
npm run chromatic

# Or run with specific options
npm run chromatic -- --only-changed --skip "@(Header|Footer)*"
```

### Baseline Management

Baselines are automatically managed by Chromatic:

- **Main branch**: Always treated as the source of truth
- **PR branches**: Compared against main's baseline
- **Merging PRs**: Accepted changes become the new baseline
- **Reverting changes**: Chromatic detects the regression and flags it

### Troubleshooting

#### No visual changes detected but build failed

This can happen if:
- Storybook failed to build
- Dependencies are missing
- Environment variables are not set

Check the workflow logs for detailed error messages.

#### False positives (unchanged components flagged)

Solutions:
- Add `skip` parameter to ignore flaky stories
- Configure tolerances in Chromatic settings
- Use `onlyChanged: true` for faster builds

#### Missing screenshots

If some stories aren't captured:
- Verify the story file follows `*.stories.tsx` pattern
- Check `.storybook/main.ts` stories glob pattern
- Ensure story exports are correct

### CI/CD Integration

Visual tests are integrated into the CI pipeline:

```
Pull Request → Chromatic Tests → Visual Review → Merge → Deploy
     ↓              ↓                ↓            ↓        ↓
  Run tests    Capture UI      Accept/Deny   Update   Publish
               snapshots        changes      baseline  to npm
```

### Best Practices

1. **Write deterministic stories** - Avoid random data, dates, or animations
2. **Use consistent data** - Mock data should be stable across runs
3. **Test all variants** - Include stories for all component states
4. **Review regularly** - Check Chromatic UI frequently for flagged changes
5. **Keep baselines updated** - Merge PRs with accepted visual changes promptly

### Advanced Configuration

For advanced Chromatic configuration, you can:

1. **Customize build script** in `.github/workflows/chromatic.yml`
2. **Add Storybook addons** for better testing
3. **Configure viewports** in `.storybook/preview.ts`
4. **Set up Percy integration** for additional coverage

See [Chromatic docs](https://www.chromatic.com/docs/) for more options.

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
