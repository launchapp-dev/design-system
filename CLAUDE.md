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
