---
name: token-audit
description: Audit the design system for CSS design token compliance. Finds unused --ag-* tokens, undefined token references, and hardcoded colors in component files. Creates AO tasks for issues found. Use when a user asks to audit tokens or check for hardcoded colors.
---

# Design Token Audit

Audit the design system codebase for CSS design token compliance.

## When to Use

Use this skill when the user:

- Asks to audit design tokens (e.g. "run a token audit")
- Wants to find hardcoded colors in components
- Wants to check for unused or undefined `--ag-*` CSS custom properties
- Asks about token coverage or compliance

## What the Audit Checks

1. **Unused tokens** — `--ag-*` tokens defined in `src/styles/globals.css` but never referenced in `src/`
2. **Undefined references** — `--ag-*` tokens used in `src/**/*.tsx` but not defined in `globals.css`
3. **Hardcoded colors** — hex, `rgb()`, `rgba()`, or bare `hsl()` values in component TSX files that should use `--ag-*` tokens

## How to Run

1. Create an AO task for the token audit:
   - title: "Design token audit"
   - description: "Audit --ag-* CSS tokens vs usage across all src/ files."
   - task_type: "chore", priority: "medium"

2. Set the task status to "ready".

3. Enqueue with workflow_ref: "design-token-audit".

4. Confirm to the user the audit is queued. The daemon will run the audit and create follow-up tasks for any issues found.

## Output

The audit agent will:

- Create `chore` tasks (priority: low) for unused tokens
- Create `bugfix` tasks (priority: high) for undefined token references
- Create `chore` tasks (priority: medium) for components with hardcoded colors
- Output a compliance summary if no issues are found

## Example

User: "can you run a token audit on the design system?"

Create task "Design token audit", set to ready, enqueue with `design-token-audit` workflow.
