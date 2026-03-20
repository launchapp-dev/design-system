---
name: story-generator
description: Auto-generate CSF3 Storybook stories for design system components that lack .stories.tsx files. Can target a specific component or scan all components. Use when a user asks to generate stories or add Storybook coverage.
---

# Story Generator

Auto-generate CSF3 Storybook stories for design system components.

## When to Use

Use this skill when the user:

- Asks to generate stories for a component (e.g. "generate stories for Badge")
- Wants to add Storybook coverage to components that lack it
- Asks to scan for components missing `.stories.tsx` files
- Wants to batch-generate stories for the whole library

## What Gets Created

For each component without stories, the skill creates:

`src/components/<ComponentName>/<ComponentName>.stories.tsx` — CSF3 stories including:

- **Default** story with default args
- **AllVariants** grid (if CVA `variant` prop exists)
- **AllSizes** grid (if CVA `size` prop exists)
- **Disabled** story (if component supports disabled state)
- Compound component examples (for components with sub-parts)

## How to Run

If the user names a specific component, extract the `ComponentName`. Otherwise, the audit will scan all components.

1. Create an AO task for story generation:
   - title: "Generate stories for <ComponentName>" (or "Generate missing Storybook stories" for a full scan)
   - description includes the target component name if specified
   - task_type: "chore", priority: "medium"

2. Set the task status to "ready".

3. Enqueue with workflow_ref: "storybook-story-generator".

4. Confirm to the user the story generation is queued and the daemon will execute it.

## Story Conventions

Generated stories follow these conventions:

- **Format**: CSF3 (`Meta<typeof Component>` + `StoryObj<typeof Component>`)
- **Import**: From local index (`import { Component } from "./index"`)
- **Layout**: Inline styles for story layout (flex/gap), not Tailwind classes
- **Grid renders**: `(["v1", "v2"] as const).map(...)` pattern for variant/size grids
- **Title**: `"Components/<ComponentName>"`

## Example

User: "generate Storybook stories for the Badge component"

Create task "Generate stories for Badge", set to ready, enqueue with `storybook-story-generator` workflow.
