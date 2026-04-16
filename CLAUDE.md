# @launchapp/design-system

LaunchApp design system — a React + TypeScript component library built on Radix UI primitives, styled with Tailwind CSS 4.

## Tech Stack

- **Framework:** React 18/19, TypeScript
- **Primitives:** Radix UI
- **Styling:** Tailwind CSS 4, class-variance-authority (CVA), clsx, tailwind-merge
- **Docs:** Storybook 10
- **Testing:** Vitest, React Testing Library
- **Build:** tsup
- **Visual Testing:** Chromatic
- **Versioning:** Changesets
- **Registry:** shadcn CLI compatible

## Install (npm)

```bash
npm install @launchapp/design-system
```

```tsx
import { Button } from "@launchapp/design-system";
import "@launchapp/design-system/styles.css";
```

## Install (shadcn registry)

```bash
npx shadcn@latest add --registry https://launchapp-dev.github.io/design-system/registry.json button
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start Storybook on port 6006 |
| `npm run build` | Build library with tsup |
| `npm run build:storybook` | Build static Storybook |
| `npm run lint` | ESLint across src/ |
| `npm test` | Run Vitest tests |
| `npm run typecheck` | TypeScript type checking (tsc --noEmit) |
| `npm run generate-registry` | Generate shadcn registry.json |
| `npm run generate-vscode-snippets` | Generate VS Code snippets |
| `npm run fix-a11y` | Run accessibility fixer |
| `npm run chromatic` | Run Chromatic visual tests |
| `npm run changeset` | Create a changeset |
| `npm run release` | Publish via changesets |
| `npm run clean` | Remove dist/ |

## Project Structure

```
src/
  components/       # UI components (Accordion, Button, Card, Dialog, etc.)
  blocks/           # Pre-built page blocks by category
    auth/
    dashboard/
    data/
    ecommerce/
    landing/
    marketing/
    messaging/
    navigation/
    notifications/
    onboarding/
    settings/
  lib/              # Utilities (cn, animation, a11y-fixer, AI generators)
  index.ts          # Package entry — all public exports
apps/
  docs/             # Documentation app
  vscode-extension/ # VS Code extension
registry.json       # shadcn CLI registry
```

## Components (106)

Accordion, Alert, AlertDialog, AnimatedBackground, AnimatedBorder, AnimatedHeight, AnimatedText, AspectRatio, Avatar, Background, Badge, Banner, BentoGrid, Breadcrumb, Button, Calendar, Card, Carousel, Changelog, Chart, ChatBubble, ChatInput, Checkbox, Collapsible, ColorPicker, Combobox, Command, ContextMenu, CookieConsent, CopilotPanel, DashboardGrid, DataTable, DatePicker, Dialog, Dock, DropdownMenu, FocusScope, Form, FunnelChart, Gauge, Heatmap, ImageComparison, InlineEditable, Input, KPICard, Label, Lightbox, LiveIndicator, MagicCard, Marquee, Masonry, Menubar, MobileNav, MultiSelect, MultiStepWizard, NavigationMenu, NotificationBell, PageTransition, Pagination, PaletteSwitcher, Popover, Portal, Progress, RadioGroup, RealtimeTicker, Resizable, SankeyDiagram, ScrollAnimate, ScrollArea, ScrollEffects, Select, Separator, Sheet, Skeleton, Slider, SmartThemingGenerator, Sonner, Sparkline, Spotlight, StaggeredList, StatDisplay, StatusPage, StreamingText, Switch, TabContentCrossfade, Table, Tabs, TagInput, Terminal, TextAnimate, Textarea, ThemeCard, ThemeGenerator, ThemePreview, ThinkingIndicator, Toast, Toggle, ToggleGroup, Toolbar, Tooltip, TreeMap, VideoPlayer, VisuallyHidden

## Conventions

- Each component lives in `src/components/<ComponentName>/<ComponentName>.tsx`
- Export from `src/components/<ComponentName>/index.ts`
- Re-export from `src/index.ts`
- Use CVA for variants (size: sm/md/lg, variant: default/outline/ghost/destructive)
- Use `React.forwardRef` for all components
- Merge className with `cn()` from `src/lib/utils.ts`
- Design tokens use `--la-*` CSS custom property prefix
- Dark mode via `dark` class strategy
- Semantic color tokens: primary, secondary, destructive, muted, accent
- Compose over Radix primitives — never reimplement accessibility
- Do not add comments in code unless requested
- Do not add yourself as author or co-author in commits

## Fleet Rule: No Mock Data in Production Paths

**All data on user-facing surfaces must be real and come from the database via Drizzle.**
This is a fleet-wide rule (TASK-008 in `ao-templates`). "Looks done" ≠ "done": buyers
pay for templates that run end-to-end, and mock data hides bugs in loading/empty/error
states that only surface once a real user hits them.

**Banned** in production code paths (anything served from `apps/web` to users):
- Inline `const mockUsers`, `fakeOrgs`, `demoDeals`, `placeholderStats` arrays/objects
- JSON files used as fake backends
- `Lorem ipsum`, `John Doe`, `Jane Doe`, `Acme Corp`, `test@example.com` placeholder copy
- Components named `Mock*` / `Fake*` / `Demo*` / `Stub*` rendered as the default UI
- Hardcoded stat numbers on marketing or dashboard surfaces (e.g. `"1,247 active users"`)
- Imports `from "@/data/mock-..."` (or similar) into production files

**Acceptable** (not flagged):
- Storybook previews (`*.stories.*`, `.storybook/**`)
- Tests (`*.test.*`, `*.spec.*`, `**/__tests__/**`, `**/e2e/**`)
- Fixtures and MSW handlers (`**/fixtures/**`, `**/__mocks__/**`, `**/mocks/handlers.*`)
- Seed scripts (`**/seed/**`, `**/db/seed/**`) — they populate the real DB with
  meaningful starter data so a fresh clone shows real content, not empty states
- HTML form `placeholder="..."` attributes that hint expected input shape
- Per-repo justified exceptions in `ao-templates/.ao/mock-data-ignore.txt` (each entry
  must carry a `# why:` comment)

**When implementing a feature**: if the data isn't already in the DB, add the schema
and seed data first, then build the UI against `db.select(...)`. Don't ship a hardcoded
array thinking "we'll wire it up later" — that's how mock data leaks into production.
The fleet scanner (`scripts/scan-mock-data.sh <repo-id>` in `ao-templates`) must score
≥ 90 for a PR to merge.

> **Design-system exception**: `apps/docs/**` and `src/blocks/**/demo*` showcase pages
> MAY render illustrative sample data — that's the documentation purpose. The rule
> applies to non-docs application code (e.g. authenticated dashboards, settings pages).

## CRITICAL: Registry Must Be Regenerated After Adding Blocks

After adding or modifying any files in `src/blocks/`, you MUST run:

```bash
node scripts/generate-registry.mjs
```

Then include `registry.json` in your commit. Failing to do this means the blocks will be invisible on design.launchapp.dev (the docs site reads from registry.json).

CI will fail if `registry.json` is stale — the `Check registry is up to date` step in CI regenerates it and diffs the result.

**Checklist for any block task:**
1. Add/modify files in `src/blocks/`
2. Run `node scripts/generate-registry.mjs`
3. Run `node apps/docs/scripts/generate-blocks-registry.mjs` (adds stubs for new blocks to blocks-registry.ts — edit description and code before merging)
4. `git add src/blocks/ registry.json apps/docs/src/lib/blocks-registry.ts`
5. Commit both together

**Detecting gaps:**
- `node apps/docs/scripts/find-missing-block-previews.mjs` — shows which blocks lack preview images and which source files are not yet registered
- `node apps/docs/scripts/generate-blocks-registry.mjs --check` — CI check (exits 1 if any blocks are unregistered)
