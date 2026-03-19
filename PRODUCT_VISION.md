# Design System — Product Vision

## Mission
The most advanced open-source React design system for 2026. Built on Radix UI primitives with deep theming, full accessibility, complex pre-built blocks, shadcn/ui registry compatibility, and publishable as a standalone npm package. This is not just a component library — it's a complete design infrastructure.

## Design Principles
1. **Accessibility first** — Every component uses Radix primitives. WCAG AA minimum. Keyboard navigation and screen reader support are non-negotiable.
2. **Composable over configurable** — Prefer compound components (Card.Header, Card.Content) over mega-prop APIs. Let consumers compose behavior.
3. **Themeable by default** — All colors use CSS custom property tokens. Light and dark mode out of the box. Consumers can override tokens to brand the entire system.
4. **Consistent variants** — Sizes (sm, md, lg) and variants (default, outline, ghost, destructive) follow the same naming and scaling conventions across all components.
5. **Zero runtime overhead** — CVA + Tailwind CSS. No runtime CSS-in-JS. Tree-shakeable ESM exports.
6. **Open-source first** — MIT licensed. Clear documentation, easy onboarding, contributor-friendly.
7. **Registry compatible** — Components can be consumed via shadcn/ui registry protocol OR as a standalone npm package.

## Target Consumers
- Any React 18/19 project that wants a best-in-class component library
- Developers who want shadcn/ui quality as an installable npm package
- Teams that need a themeable, accessible design system without copy-pasting components
- Projects that want pre-built complex blocks (auth pages, dashboards, settings panels)

## Distribution Strategy
1. **Standalone npm package** — `npm install @launchapp/design-system` for full library
2. **shadcn/ui registry** — Individual component installation via `npx shadcn add` using our custom registry
3. **Blocks registry** — Pre-composed complex UI blocks available through the registry

## Component Roadmap

### Phase 1 — Foundation (DONE)
- Build system (tsup, Tailwind, cn utility)
- Storybook documentation
- CSS custom property token system (light/dark)

### Phase 2 — Core Components (DONE)
- Button, Input, Label, Checkbox, Switch, Select
- Card, Badge, Avatar, Separator, Tooltip
- Dialog, Alert Dialog, Popover, Dropdown Menu
- Toast, Tabs, Accordion, Toggle, Toggle Group, Progress

### Phase 3 — Extended Components
- **Forms**: Radio Group, Slider, Textarea, Form (with react-hook-form + zod validation)
- **Navigation**: Navigation Menu, Breadcrumb, Pagination, Command Palette (cmdk)
- **Data Display**: Table (sortable, filterable), Data Table (with @tanstack/react-table), Skeleton, Collapsible
- **Layout**: Sheet (slide-over panel), Scroll Area, Aspect Ratio, Resizable (with react-resizable-panels)
- **Feedback**: Alert (static banners), Sonner (modern toast alternative)

### Phase 4 — Advanced Patterns
- **Composition**: Calendar (with date-fns), Date Picker, Combobox (searchable select), Multi-Select
- **Rich Content**: Toolbar, Context Menu, Menubar
- **Utilities**: Visually Hidden, Portal, Focus Scope
- **Data**: Chart components (with recharts), KPI cards, Stat displays

### Phase 5 — Complex Blocks
Pre-composed, production-ready UI blocks that combine multiple components:
- **Auth blocks**: Login form, Sign-up form, Forgot password, OTP verification
- **Dashboard blocks**: Stats overview, Activity feed, Metric cards with charts
- **Settings blocks**: Profile settings, Account settings, Notification preferences, Billing page
- **Navigation blocks**: Sidebar with collapsible sections, Top nav with user menu, Mobile nav drawer
- **Data blocks**: Data table with search/filter/sort/pagination, Kanban board, Timeline
- **Marketing blocks**: Hero sections, Feature grids, Pricing tables, Testimonial carousels
- **E-commerce blocks**: Product cards, Shopping cart, Checkout form

### Phase 6 — shadcn/ui Registry
- Implement shadcn registry protocol (registry.json schema)
- Each component available as individual registry entry
- Blocks available as registry entries with dependency resolution
- CLI support: `npx shadcn add <component>` from our registry
- Documentation site with live previews and copy-paste code

### Phase 7 — Polish & DX
- Comprehensive Storybook stories for every component and block
- Design tokens documentation page
- Installation and usage guide (npm package + registry)
- Changelog automation (conventional commits + auto-release)
- NPM publishing pipeline (GitHub Actions)
- Visual regression testing (Chromatic or Playwright)
- Figma token sync (optional)
- CLI tool for scaffolding themed instances

## Quality Gates
- Every component must pass TypeScript strict mode
- Every component must use React.forwardRef
- Every component must accept and merge className via cn()
- Every interactive component must use a Radix primitive
- Every component must support dark mode via the "dark" class strategy
- Every component must have at least one Storybook story
- Every block must be responsive (mobile, tablet, desktop)
- Every block must include a Storybook story showing all variants

## Workflow Automation Skills

The AO agent orchestrator integrates the following skills into automated workflows:

| Skill | Agent | Schedule | Purpose |
|-------|-------|----------|---------|
| product-skills (UX Researcher) | `ux-researcher` | Weekly Mon 10am | Nielsen heuristic audits, interaction pattern analysis, API ergonomics |
| product-skills (UI Design System) | `design-engineer` | On component PRs | Visual hierarchy, spacing scale, color semantics, interaction states |
| frontend-design | `design-engineer` | On component PRs | Production-grade design quality, avoids generic aesthetics |
| simplify | `code-quality-reviewer` | Mon/Thu 9am | Dead code, over-engineering, prop explosion, CVA correctness |
| ao-skills (composition-patterns) | `design-advisor` | On component PRs | Compound component patterns, CVA axis naming, forwardRef |
| product-skills (Agile Product Owner) | `product-owner` | Every 10 min | RICE scoring, OKR alignment, requirement lifecycle management |
| product-skills (Product Strategist) | `product-strategist` | Quarterly (1st of quarter) | OKR health review, RICE roadmap sequencing, quarterly planning |

### OKR Framework

All work is tracked against three quarterly objectives:

| Objective | Key Results |
|-----------|-------------|
| O1 — Ship Phase 3 Extended Components | KR1: 15 components shipped and passing quality gates; KR2: All have Storybook stories; KR3: Zero WCAG AA violations |
| O2 — Achieve complete accessibility | KR1: Every interactive component uses a Radix primitive; KR2: A11y audit creates zero new critical violations; KR3: Keyboard nav verified across all components |
| O3 — Deliver a publishable npm package | KR1: Build pipeline green on all PRs; KR2: shadcn/ui registry implemented; KR3: Package published as @launchapp/design-system |

### RICE Prioritization

Every new task is scored before creation using the RICE formula:

```
Score = (Reach × Impact × Confidence) / Effort

Reach:      components/consumers affected (1–10)
Impact:     0.25 minimal / 0.5 low / 1 medium / 2 high / 3 massive
Confidence: 20% low / 50% medium / 80% high / 100% certain
Effort:     person-weeks (min 0.5)

Score ≥ 8  → critical priority
Score 4–7  → high priority
Score 1–3  → medium priority
Score < 1  → low priority
```

### Workflow Integration
- `component` workflow includes `design-engineering-review` and `code-quality` gates before PR
- `ux-research` runs weekly against all components in `src/components/`
- `code-quality-sweep` runs Mon/Thu to catch drift across all recent changes
- `product-review` runs every 10 min to advance requirement lifecycle and surface new work
- `quarterly-planning` runs on the 1st of each quarter for OKR health review and roadmap sequencing

## OKRs

Active Objectives and Key Results tracked by the `product-owner` agent. The agent scores candidate tasks with RICE (Reach × Impact × Confidence / Effort) and maps scores to priorities before creating or ordering work.

### O1 — Ship a complete, production-ready component library
- **KR1.1**: All Phase 3 components implemented and exported (target: 100% of list in roadmap)
- **KR1.2**: Every component has a passing Storybook story (target: 0 missing stories)
- **KR1.3**: WCAG AA compliance on all components (target: 0 open a11y violations)

### O2 — Deliver complex pre-built blocks for real product use cases
- **KR2.1**: All Phase 5 block categories have at least one production block (target: 7/7 categories)
- **KR2.2**: Each block is documented with a Storybook story (target: 100%)

### O3 — Establish a reliable, automated development pipeline
- **KR3.1**: Build passes on every merge to main (target: 0 broken builds)
- **KR3.2**: Dependency versions stay within 1 major version of latest (target: 0 severely outdated deps)

### RICE Prioritization Thresholds
| RICE Score | Priority |
|------------|----------|
| ≥ 6        | critical / high |
| 3 – 5.9    | medium   |
| < 3        | low      |

## Non-Goals
- Mobile-native components (React Native) — this is web only
- CSS framework agnosticism — we are committed to Tailwind CSS
- Backward compatibility with non-Radix component APIs
- Server components (all components are client-side; consumers wrap as needed)
