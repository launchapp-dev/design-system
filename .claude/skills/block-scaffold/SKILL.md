---
name: block-scaffold
description: Scaffold a new design system block (pre-composed UI section). Creates the block file and updates src/index.ts. Use when a user asks to create a new block or scaffold block boilerplate for a given category.
---

# Block Scaffold

Scaffold production-ready boilerplate for a new design system block.

## When to Use

Use this skill when the user:

- Asks to scaffold or create a new block (e.g. "scaffold a HeroSection block")
- Wants to add a pre-composed UI section to the blocks library
- Needs a block that composes existing design system components

## Valid Categories

`auth`, `navigation`, `settings`, `marketing`, `dashboard`, `data`, `ecommerce`

## What Gets Created

Running this skill will scaffold:

1. `src/blocks/<category>/<BlockName>.tsx` — Block component composing existing design system components
2. Updated `src/index.ts` — Re-export added to the library barrel

## How to Run

Extract the `BlockName` (PascalCase) and `category` from the user's request.

1. Create an AO task describing the block to scaffold:
   - title: "Scaffold <BlockName> block"
   - description includes the BlockName and category
   - task_type: "feature", priority: "medium"

2. Set the task status to "ready".

3. Enqueue with workflow_ref: "block-scaffold".

4. Confirm to the user the scaffold task is queued and the daemon will execute it.

## Block Conventions

- **Composition**: Composes existing design system components; never re-implements primitives
- **forwardRef**: Uses `React.forwardRef<HTMLDivElement, <BlockName>Props>`
- **Design tokens**: Uses `--ag-*` CSS custom properties for all colors (no hardcoded colors)
- **Layout**: Uses Tailwind CSS for responsive layout
- **Structure**: Flat (`src/blocks/<category>/<BlockName>.tsx`) by default, nested for complex blocks

## Example

User: "scaffold a UserProfile block in the settings category"

Create task "Scaffold UserProfile block", set to ready, enqueue with `block-scaffold` workflow.
