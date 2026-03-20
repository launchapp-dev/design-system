---
name: component-scaffold
description: Scaffold a new Radix UI design system component. Creates ComponentName.tsx, index.ts, and updates src/index.ts exports. Use when a user asks to create a new component or scaffold component boilerplate.
---

# Component Scaffold

Scaffold production-ready boilerplate for a new Radix UI design system component.

## When to Use

Use this skill when the user:

- Asks to scaffold or create a new component (e.g. "scaffold a Tooltip component")
- Wants to add a new Radix UI component to the design system
- Needs the standard component boilerplate (CVA variants, forwardRef, className merging)

## What Gets Created

Running this skill will scaffold:

1. `src/components/<ComponentName>/<ComponentName>.tsx` — Component with CVA variants, `React.forwardRef`, and `cn()` className merging
2. `src/components/<ComponentName>/index.ts` — Barrel export
3. Updated `src/index.ts` — Re-export added to the library barrel

## How to Run

Extract the `ComponentName` (PascalCase) from the user's request. Optionally note the Radix primitive to compose over.

1. Create an AO task describing the component to scaffold:
   - title: "Scaffold <ComponentName> component"
   - description includes the ComponentName and Radix primitive (if any)
   - task_type: "feature", priority: "medium"

2. Set the task status to "ready".

3. Enqueue with workflow_ref: "radix-component-scaffold".

4. Confirm to the user the scaffold task is queued and the daemon will execute it.

## Component Conventions

- **CVA variants**: `variant` (default/outline/ghost/destructive) and `size` (sm/md/lg)
- **forwardRef**: Always uses `React.forwardRef` with correct ref type
- **className merging**: Uses `cn()` from `../../lib/utils`
- **Design tokens**: Uses `--ag-*` CSS custom properties for all colors
- **Radix primitive**: Composed over the appropriate `@radix-ui/react-*` primitive
- **Accessibility**: Full keyboard navigation and ARIA attributes via Radix

## Example

User: "scaffold a new ToggleGroup component using Radix ToggleGroup"

Create task "Scaffold ToggleGroup component", set to ready, enqueue with `radix-component-scaffold` workflow.
