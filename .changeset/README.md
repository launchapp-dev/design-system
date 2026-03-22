# Changesets

This directory contains changeset files that describe changes to the package.

## How to Use

When you make changes that should be included in the next release:

```bash
npm run changeset
```

This will prompt you to:
1. Select the type of change (patch, minor, or major)
2. Write a description of the change

The generated markdown file should be committed along with your code changes.

## Note on Monorepo Structure

The current monorepo structure has the main `@launchapp/design-system` package at the root level, which is not fully compatible with changesets' expectations for workspace packages. 

For full changesets support, consider restructuring the repository to move the main package into `packages/design-system/` directory.

For now, manual version management may be required until this restructuring is complete.
