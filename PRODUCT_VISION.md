# LaunchApp Design System — Product Vision

## Mission
The most powerful open-source React design system ever built. 60+ components, 52+ pre-built blocks, 10+ theme palettes, animated primitives, a live documentation site, and a fully autonomous AI development pipeline — all MIT licensed. Built to make every other design system feel incomplete.

## What We've Built

### The Numbers
- **60 components** on Radix UI primitives — every one accessible, dark-mode ready, fully typed
- **52 pre-built blocks** across 14 categories — production-ready, responsive, copy-paste
- **10+ theme palettes** with runtime switching and a `createTheme()` generator
- **Animated primitives** — text reveals, scroll animations, magic cards, gradient backgrounds
- **Live docs site** at https://launchapp-dev.github.io/design-system/
- **Storybook 10** with every component and block documented
- **136+ tasks completed autonomously** by AI agents across 4 model providers

### Component Library (60 components)
Accordion, Alert, AlertDialog, AnimatedHeight, AspectRatio, Avatar, Background, Badge, Breadcrumb, Button, Calendar, Card, Chart, Checkbox, Collapsible, Combobox, Command, ContextMenu, DataTable, DatePicker, Dialog, DropdownMenu, FocusScope, Form, Input, KPICard, Label, MagicCard, Menubar, MultiSelect, NavigationMenu, Pagination, PaletteSwitcher, Popover, Portal, Progress, RadioGroup, Resizable, ScrollAnimate, ScrollArea, Select, Separator, Sheet, Skeleton, Slider, Sonner, StaggeredList, StatDisplay, Switch, TabContentCrossfade, Table, Tabs, TextAnimate, Textarea, Toast, Toggle, ToggleGroup, Toolbar, Tooltip, VisuallyHidden

### Block Library (14 categories, 52 blocks)
- **Auth**: Login, Sign-up, Forgot Password, OTP Verification
- **Dashboard**: Stats Overview, Activity Feed, Metric Cards
- **Settings**: Profile, Account, Notifications, Billing
- **Navigation**: Sidebar, Top Nav, Mobile Drawer
- **Marketing**: Hero Sections, Feature Grid, Pricing Table, Testimonials
- **E-commerce**: Product Cards, Shopping Cart, Checkout Form
- **Data**: Searchable Data Table, Kanban Board
- **Blog**: Post List, Post Detail, Author Card, Newsletter Signup
- **Errors**: 404, 500, Maintenance Mode
- **Onboarding**: Multi-step Wizard, Checklist, Welcome Screen
- **Files**: Drag-and-Drop Upload, File List, Image Gallery
- **Messaging**: Chat Interface, Message Bubbles, Typing Indicator
- **Notifications**: Notification Center, Activity Timeline, Inbox
- **Landing**: Full SaaS Landing Page Templates

## Design Principles
1. **Accessibility first** — Every component uses Radix primitives. WCAG AA minimum. Keyboard navigation and screen reader support are non-negotiable.
2. **Composable over configurable** — Compound components (Card.Header, Card.Content) over mega-prop APIs.
3. **Themeable by default** — CSS custom property tokens, 10+ palettes, `createTheme()` generator, runtime palette switching.
4. **Consistent variants** — Sizes (sm, md, lg) and variants (default, outline, ghost, destructive) follow the same conventions everywhere.
5. **Zero runtime overhead** — CVA + Tailwind CSS v4. No runtime CSS-in-JS. Tree-shakeable ESM exports.
6. **Beautiful by default** — Animated primitives, smooth transitions, micro-interactions. Not just functional — delightful.
7. **Open-source first** — MIT licensed. Public repo, live docs, contributor-friendly.

## Distribution
1. **npm package** — `npm install @launchapp/design-system`
2. **shadcn/ui registry** — `npx shadcn add <component>` from our custom registry
3. **Blocks registry** — Pre-composed UI blocks with dependency resolution
4. **GitHub Pages** — Live docs at https://launchapp-dev.github.io/design-system/
5. **Storybook** — Interactive component explorer with all variants

## Tech Stack
- React 19 + TypeScript 5.9
- Radix UI Primitives (accessibility layer)
- Tailwind CSS v4 + CVA (styling)
- Next.js 16 (docs site)
- Storybook 10 (component explorer)
- Recharts (data visualization)
- @tanstack/react-table (data tables)
- react-hook-form + zod (form validation)
- cmdk (command palette)
- date-fns + react-day-picker (calendar/dates)
- Framer Motion patterns (animations)

## Autonomous Development Pipeline

This design system is built and maintained by an autonomous AI agent pipeline powered by AO (Agent Orchestrator). The pipeline runs 24/7 with zero human intervention:

### Agent Fleet (27 agents across 3 AI providers)
| Provider | Model | Agents | Role |
|---|---|---|---|
| Kimi K2.5 | oai-runner | 8 | Reasoning — planning, review, product ownership |
| Gemini 3.1 Pro | gemini | 7 | Implementation — components, stories, docs |
| MiniMax M2.7 | oai-runner | 12 | Bulk work — audits, updates, analysis |

### Autonomous Cron Schedules
| Schedule | Interval | Purpose |
|---|---|---|
| work-planner | 5 min | Scans tasks, respects deps, enqueues work (queue cap: 10) |
| pr-reviewer | 3 min | Reviews PRs, merges approved, queues rebases for conflicts |
| task-reconciler | 10 min | Fixes stale state, unblocks stuck tasks |
| product-review | 10 min | Reads PRODUCT_VISION.md, manages requirements, creates next-phase tasks |
| dependency-update | 6 hrs | Scans for outdated packages, creates update tasks |
| a11y-audit | 4 hrs | Audits components for WCAG compliance |
| sync-main | 5 min | Keeps main branch current |

### Self-Healing Capabilities
- Product-owner catches false-done tasks and creates remediations
- Reviewer queues rebase-and-retry for conflicting PRs
- Reconciler drops stale queue entries and unblocks tasks
- A11y auditor creates fix tasks for accessibility regressions
- Dependency updater keeps packages current with migration guide checks

## What's Next

### Phase 8 — Enterprise & Scale
- **Monorepo support** — Turborepo/Nx integration for multi-app design system consumption
- **Design tokens CLI** — `npx @launchapp/tokens init` to scaffold a themed instance
- **Figma sync** — Bidirectional token sync between Figma and code (pending AO HTTP MCP support)
- **Visual regression** — Chromatic integration for automated screenshot testing
- **NPM publishing pipeline** — Automated semantic versioning and changelog generation
- **Internationalization** — RTL support, locale-aware formatting components

### Phase 9 — AI-Native Features
- **AI component generator** — Describe a component in natural language, get production code
- **Smart theming** — Generate palettes from a brand URL or screenshot
- **Accessibility auto-fix** — AI agent that fixes a11y violations automatically
- **Design-to-code** — Figma frame → component code via Figma MCP (when HTTP MCP lands)

### Phase 10 — Ecosystem
- **VS Code extension** — Component snippets, prop autocomplete, token preview
- **CLI** — `npx @launchapp/ds create-app` to scaffold a full app with the design system
- **Template gallery** — Full app templates (SaaS dashboard, marketing site, admin panel)
- **Community themes** — User-contributed palette packs
- **Plugin system** — Extend components with custom variants and behaviors

## Quality Gates
- Every component passes TypeScript strict mode
- Every component uses React.forwardRef
- Every component accepts and merges className via cn()
- Every interactive component uses a Radix primitive
- Every component supports dark mode via the "dark" class strategy
- Every component has at least one Storybook story
- Every block is responsive (mobile, tablet, desktop)
- Every block uses only design system components — no raw HTML

## Non-Goals
- Mobile-native components (React Native) — web only
- CSS framework agnosticism — committed to Tailwind CSS
- Backward compatibility with non-Radix component APIs
- Server components (client-side; consumers wrap as needed)
