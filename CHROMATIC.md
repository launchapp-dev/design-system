# Chromatic Visual Regression Testing

This document describes the Chromatic visual regression testing setup for the design system.

## Setup

### 1. Create a Chromatic Account

1. Go to [chromatic.com](https://www.chromatic.com) and sign up
2. Connect your GitHub repository
3. Note the project token from the Chromatic dashboard

### 2. Add the Project Token

Add the `CHROMATIC_PROJECT_TOKEN` secret to your GitHub repository:

1. Go to your repository **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Name: `CHROMATIC_PROJECT_TOKEN`
4. Value: paste your project token from Chromatic

### 3. Running Locally

To run Chromatic locally:

```bash
# Install dependencies
npm install

# Run chromatic (requires CHROMATIC_PROJECT_TOKEN)
npx chromatic --project-token=<your-token>
```

Or use the npm script (requires the token to be set):

```bash
npm run chromatic
```

## How It Works

- **On Push to Main**: Chromatic builds and publishes the Storybook, comparing against the baseline
- **On Pull Requests**: Chromatic runs visual tests and posts a comment with any changes
- **Auto-approve**: Non-breaking visual changes are auto-approved when the target branch is `main`

## CI Workflow

The GitHub Actions workflow (`.github/workflows/chromatic.yml`) runs Chromatic:

- **Trigger**: On every push to `main` and on all pull requests
- **Features**:
  - Caches node_modules for faster builds
  - Uses parallel builds for speed
  - Auto-accepts changes on `main`
  - Only tests changed stories when possible

## Storybook Configuration

The Storybook is configured in `.storybook/main.ts` with the Chromatic addon:

```typescript
addons: ['@storybook/addon-docs', '@chromatic-com/storybook'],
```

The preview configuration (`.storybook/preview.ts`) includes:

- Dark/Light theme switching
- Centered layout for component stories
- Global decorator support

## Visual Test Files

Stories using Chromatic's interaction testing can use the `@chromatic-com/storybook` addon for:

- Visual comparison after interactions
- Component state testing
- Responsive behavior testing

## Interpreting Results

- **No changes**: Build passes, no action needed
- **Visual changes detected**: Review the diffs in the Chromatic UI
- **Breaking changes**: Must be manually approved (requires PR approval)
- **Auto-approved**: Non-breaking changes are auto-approved on main branch

## Troubleshooting

### Build Fails

Check that:
- `CHROMATIC_PROJECT_TOKEN` is set as a GitHub secret
- Storybook builds successfully locally (`npm run build:storybook`)

### Missing Stories

Ensure stories are in the correct location:
- Pattern: `src/**/*.stories.@(ts|tsx)`
- Export a default component with stories

### Performance Issues

- Enable `onlyChanged: true` to test only affected stories
- Use parallel builds with `parallel: 3` in the config
