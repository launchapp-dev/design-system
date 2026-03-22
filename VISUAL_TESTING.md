# Visual Testing Guide

This guide provides comprehensive documentation for visual regression testing with Chromatic in the LaunchApp Design System.

## Overview

Visual regression testing ensures that UI changes are intentional and documented. Every Storybook story is captured as a screenshot and compared against a baseline to detect unintended visual changes.

## What Gets Tested

### Components
All UI components in `src/components/` with Storybook stories:
- **Primitives**: Button, Input, Select, Dialog, etc.
- **Composed**: Form fields, Cards, Navigation, etc.
- **Complex**: DataTable, Charts, etc.

### Blocks
Pre-built page sections and layouts:
- Landing pages (Startup, SaaS, Portfolio, Agency)
- Settings pages (Account, Billing, Profile, Notifications)
- E-commerce components (Checkout, Product Cards)

### Examples
Usage examples and patterns demonstrating component combinations.

## CI/CD Integration

### Workflow Triggers

| Event | Branch | Behavior |
|-------|--------|----------|
| Push | `main` | Auto-accept changes, update baseline |
| Pull Request | Any | Require manual review, fail on changes |

### Workflow Steps

1. **Checkout** - Fetch complete git history for baseline comparison
2. **Setup** - Install Node.js 20 and dependencies
3. **Build** - Compile Storybook with all stories
4. **Test** - Capture screenshots and compare against baseline
5. **Report** - Post results to PR comments and GitHub summary

### Status Checks

- ✅ **Pass**: No visual changes detected
- ⚠️ **Changes**: Visual differences found (requires review)
- ❌ **Fail**: Build error or denied changes

## Auto-Approval Configuration

### Main Branch
Changes pushed directly to `main` are automatically accepted:
```
Branch: main → Auto-accept: true
```

**Rationale**: Main represents the production state. Changes here become the new baseline.

### Pull Requests
PRs require manual review of visual changes:
```
Branch: feature/* → Auto-accept: false → Review required
```

**Rationale**: Prevents unintended regressions from being merged.

### Small Changes Tolerance
Minor visual differences may be auto-approved based on:
- **Pixel threshold**: Changes affecting < 0.1% of pixels
- **Component scope**: Changes limited to specific components
- **Story patterns**: Stories matching certain patterns

Configure in Chromatic project settings under "UI Review".

## Reviewing Visual Changes

### In Chromatic UI

1. **Access the build** from the PR comment or email notification
2. **Review changes**:
   - Side-by-side comparison (before/after)
   - Diff overlay (highlighted differences)
   - Toggle between states
3. **Take action**:
   - **Accept** ✅ - Mark as intentional, update baseline on merge
   - **Deny** ❌ - Block PR, require fixes
4. **Add comments** for context (optional)

### In GitHub PR

1. Check the **PR comment** for summary
2. Click **build URL** to open Chromatic
3. Review all flagged changes
4. Ensure all changes are accepted before merging

### Review Guidelines

**Accept changes when:**
- ✅ Intentional design updates
- ✅ New features or components
- ✅ Bug fixes that improve appearance
- ✅ Theme or color changes

**Deny changes when:**
- ❌ Unintended style regressions
- ❌ Layout breaks
- ❌ Accessibility issues (color contrast, spacing)
- ❌ Inconsistent styling

## Local Development

### Running Tests Locally

```bash
# Set your token (one-time setup)
export CHROMATIC_PROJECT_TOKEN=your-token-here

# Run Chromatic
npm run chromatic

# Run with specific options
npm run chromatic -- --only-changed
npm run chromatic -- --skip "Button*"
npm run chromatic -- --preserve-missing
```

### Options Reference

| Flag | Description | Use Case |
|------|-------------|----------|
| `--only-changed` | Test only changed stories | Faster PR builds |
| `--skip <pattern>` | Skip matching stories | Ignore flaky stories |
| `--preserve-missing` | Don't fail on missing stories | WIP components |
| `--externals` | External dependencies | Third-party libraries |

### Best Practices

1. **Deterministic Data**
   ```tsx
   // ❌ Bad: Random data
   export const Random: Story = {
     args: {
       value: Math.random(),
     },
   };

   // ✅ Good: Fixed data
   export const Fixed: Story = {
     args: {
       value: 0.5,
     },
   };
   ```

2. **Stable Dates**
   ```tsx
   // ❌ Bad: Current date
   export const Today: Story = {
     args: {
       date: new Date(),
     },
   };

   // ✅ Good: Fixed date
   export const FixedDate: Story = {
     args: {
       date: new Date('2024-01-15'),
     },
   };
   ```

3. **Mock Async Data**
   ```tsx
   // ✅ Good: Mock loading state
   export const Loading: Story = {
     args: {
       isLoading: true,
     },
   };

   // ✅ Good: Mock loaded state
   export const Loaded: Story = {
     args: {
       isLoading: false,
       data: mockData,
     },
   };
   ```

4. **Test All Variants**
   ```tsx
   export const AllSizes: Story = {
     render: () => (
       <Stack>
         <Button size="sm">Small</Button>
         <Button size="md">Medium</Button>
         <Button size="lg">Large</Button>
       </Stack>
     ),
   };
   ```

## Baseline Management

### Updating Baselines

Baselines update automatically when:
1. Changes are accepted in Chromatic UI
2. PR is merged to `main`
3. New build runs on `main`

### Reverting Changes

If a PR introduces unwanted changes:
1. Deny the changes in Chromatic UI
2. Update the PR code to fix the issue
3. Chromatic will re-test automatically
4. Merge only when all changes are accepted

### Multiple Branches

Chromatic tracks baselines per branch:
- Each branch has its own baseline
- Merging updates the target branch baseline
- Branch baselines are compared against main

## Troubleshooting

### Build Failures

**Storybook build fails:**
```bash
# Check for errors
npm run build:storybook

# Common fixes:
# - Missing dependencies
# - Import errors
# - TypeScript errors
```

**No stories found:**
```bash
# Verify story pattern
cat .storybook/main.ts

# Should match your story files
stories: ['../src/**/*.stories.@(ts|tsx)']
```

### False Positives

**Components flagged but unchanged:**
1. Check for dynamic data (dates, random values)
2. Look for CSS-in-JS runtime injection
3. Verify font loading is consistent
4. Consider adding `skip` pattern for flaky stories

**Solutions:**
```yaml
# In chromatic.yml
- name: Run Chromatic
  uses: chromaui/action@v11
  with:
    skip: "@(AnimatedComponent|LiveFeed)*"
```

### Missing Screenshots

**Stories not captured:**
1. Verify story file naming (`*.stories.tsx`)
2. Check story exports
3. Ensure component is imported correctly
4. Review Storybook console for errors

### Performance Issues

**Builds taking too long:**
```yaml
# Enable TurboSnap for faster builds
- name: Run Chromatic
  uses: chromaui/action@v11
  with:
    onlyChanged: true  # Only test changed stories
    untraced: "*.config.*"  # Ignore config files
```

## Configuration Reference

### GitHub Actions

```yaml
# .github/workflows/chromatic.yml
- uses: chromaui/action@v11
  with:
    # Required
    projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
    
    # Behavior
    exitZeroOnChanges: false  # Fail on visual changes
    autoAcceptChanges: "main"  # Auto-accept main branch
    onlyChanged: false  # Test all stories
    
    # Performance
    skip: "@(StoryPattern)*"  # Skip matching stories
    untraced: "*.md"  # Ignore these files
    
    # Debugging
    preserveMissing: true  # Don't fail on missing stories
```

### Storybook

```typescript
// .storybook/main.ts
export default {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  // Add viewport configuration
};
```

```typescript
// .storybook/preview.ts
export const parameters = {
  viewport: {
    viewports: {
      mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
      desktop: { name: 'Desktop', styles: { width: '1280px', height: '720px' } },
    },
  },
};
```

## Advanced Topics

### Testing Interactions

Use `@storybook/test` for interaction testing:

```tsx
import { userEvent, waitFor } from '@storybook/test';

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    await userEvent.click(button);
    await waitFor(() => {
      expect(canvas.getByText('Clicked')).toBeInTheDocument();
    });
  },
};
```

### Dark Mode Testing

Capture both light and dark modes:

```tsx
export const DarkMode: Story = {
  parameters: {
    themes: { themeOverride: 'dark' },
  },
};
```

### Accessibility Testing

Integrate with a11y testing:

```typescript
// .storybook/main.ts
export default {
  addons: [
    '@storybook/addon-a11y',  // Add a11y addon
  ],
};
```

## Resources

- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [Storybook for React](https://storybook.js.org/docs/react/get-started/introduction)
- [Visual Testing Handbook](https://www.chromatic.com/visual-testing-handbook)
- [WCAG AA Compliance](https://www.w3.org/WAI/WCAG2AA-Conformance)

## Support

For issues or questions:
1. Check this guide and [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Review [Chromatic's troubleshooting docs](https://www.chromatic.com/docs/troubleshooting)
3. Open an issue in the repository
4. Contact the maintainers
