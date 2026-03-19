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

## Non-Goals
- Mobile-native components (React Native) — this is web only
- CSS framework agnosticism — we are committed to Tailwind CSS
- Backward compatibility with non-Radix component APIs
- Server components (all components are client-side; consumers wrap as needed)
