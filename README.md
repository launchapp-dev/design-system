# @launchapp/design-system

[![npm version](https://img.shields.io/npm/v/@launchapp/design-system?label=%40launchapp%2Fdesign-system)](https://www.npmjs.com/package/@launchapp/design-system)
[![Chromatic](https://img.shields.io/badge/Chromatic-visual%20tests-4a48f5?logo=chromatic)](https://www.chromatic.com/library?appId=your-app-id)

A React + TypeScript component library built on Radix UI primitives, styled with Tailwind CSS 4. Ships **108+ components** and **191+ pre-built blocks** across 30 categories.

Live previews: [design.launchapp.dev](https://design.launchapp.dev)

## Quick start

```bash
npm install @launchapp/design-system
```

```tsx
import { Button } from "@launchapp/design-system";
import "@launchapp/design-system/styles.css";

export default function App() {
  return <Button>Hello world</Button>;
}
```

---

## Installation

### Install the package

```bash
npm install @launchapp/design-system
# or
pnpm add @launchapp/design-system
```

Current version: **v0.3.0**

### Peer dependencies

```bash
npm install react@^18 react-dom@^18
```

### Configure Tailwind CSS 4

This library uses **Tailwind CSS 4**. There is no `tailwind.config.ts` — configuration is CSS-first via `@theme` blocks.

In your app's entry CSS file:

```css
@import "tailwindcss";
@import "@launchapp/design-system/styles.css";

/* Optional: bridge --la-* tokens into Tailwind utility classes */
@theme inline {
  --color-primary: hsl(var(--la-primary));
  --color-primary-foreground: hsl(var(--la-primary-foreground));
  --color-secondary: hsl(var(--la-secondary));
  --color-secondary-foreground: hsl(var(--la-secondary-foreground));
  --color-destructive: hsl(var(--la-destructive));
  --color-muted: hsl(var(--la-muted));
  --color-muted-foreground: hsl(var(--la-muted-foreground));
  --color-accent: hsl(var(--la-accent));
  --color-border: hsl(var(--la-border));
  --color-background: hsl(var(--la-background));
  --color-foreground: hsl(var(--la-foreground));
}
```

Configure PostCSS to use the Tailwind CSS 4 plugin:

```js
// postcss.config.js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Install the PostCSS plugin:

```bash
npm install -D @tailwindcss/postcss
```

---

## Vue 3 / Nuxt

Vue 3 SFC wrappers are available for 90 components via a separate entry point:

```bash
npm install @launchapp/design-system vue@^3
```

```vue
<script setup lang="ts">
import { LaButton, LaBadge } from "@launchapp/design-system/vue";
import "@launchapp/design-system/styles.css";
</script>

<template>
  <LaButton variant="outline">Hello</LaButton>
  <LaBadge>New</LaBadge>
</template>
```

All Vue components use the `La` prefix (e.g. `LaButton`, `LaCard`, `LaDialog`). The API mirrors the React components — same props, same variants.

---

## shadcn registry installation

Components and blocks are also available individually via the shadcn CLI. This copies source directly into your project for full customization.

### Install a single component

```bash
npx shadcn@latest add --registry https://launchapp-dev.github.io/design-system/registry.json button
```

### Install multiple components

```bash
npx shadcn@latest add --registry https://launchapp-dev.github.io/design-system/registry.json \
  button input label card badge
```

### Install all components

```bash
npx shadcn@latest add --registry https://launchapp-dev.github.io/design-system/registry.json
```

Available slugs match component names in lowercase-hyphenated form (e.g. `kpi-card`, `multi-step-wizard`).

---

## Blocks

191 pre-built page sections and UI patterns across 30 categories:

`activity` · `admin` · `app` · `auth` · `billing` · `blog` · `community` · `dashboard` · `data` · `ecommerce` · `errors` · `files` · `forms` · `inbox` · `integrations` · `landing` · `layout` · `marketing` · `messaging` · `metrics` · `navigation` · `notifications` · `onboarding` · `profile` · `project` · `search` · `settings` · `team` · `timeline`

Browse live previews at [design.launchapp.dev/blocks](https://design.launchapp.dev/blocks).

Install a block via shadcn:

```bash
npx shadcn@latest add --registry https://launchapp-dev.github.io/design-system/registry.json \
  hero-split pricing-cards dashboard-overview
```

---

## Theming

All design tokens are CSS custom properties prefixed with `--la-`. Override them in your own stylesheet:

```css
:root {
  /* Brand color (HSL channel values — no hsl() wrapper) */
  --la-primary: 210 100% 50%;
  --la-primary-foreground: 0 0% 100%;

  /* Border radius */
  --la-radius: 0.375rem;

  /* Typography */
  --la-font-sans: "My Brand Font";
}
```

You can scope overrides to a part of the page:

```css
.marketing-section {
  --la-primary: 160 84% 39%;
}
```

### Available tokens

**Semantic colors** (HSL channel values, used as `hsl(var(--la-*))`)

| Token | Default (light) | Purpose |
|---|---|---|
| `--la-background` | `0 0% 100%` | Page background |
| `--la-foreground` | `240 10% 3.9%` | Default text |
| `--la-primary` | `262 83% 58%` | Primary actions |
| `--la-primary-foreground` | `0 0% 98%` | Text on primary |
| `--la-secondary` | `240 4.8% 95.9%` | Secondary actions |
| `--la-secondary-foreground` | `240 5.9% 10%` | Text on secondary |
| `--la-destructive` | `0 84.2% 60.2%` | Destructive actions |
| `--la-destructive-foreground` | `0 0% 98%` | Text on destructive |
| `--la-success` | `142 71% 45%` | Success states |
| `--la-success-foreground` | `0 0% 98%` | Text on success |
| `--la-muted` | `240 4.8% 95.9%` | Muted surfaces |
| `--la-muted-foreground` | `240 3.8% 46.1%` | Muted text |
| `--la-accent` | `240 4.8% 95.9%` | Accent surfaces |
| `--la-border` | `240 5.9% 90%` | Border color |
| `--la-ring` | `262 83% 58%` | Focus ring |
| `--la-card` | `0 0% 100%` | Card background |
| `--la-popover` | `0 0% 100%` | Popover background |

**Layout**

| Token | Default | Purpose |
|---|---|---|
| `--la-radius` | `0.5rem` | Border radius base |

**Typography**

| Token | Default | Purpose |
|---|---|---|
| `--la-font-sans` | `"Inter"` | Sans-serif font |
| `--la-font-mono` | `"JetBrains Mono"` | Monospace font |

**Animation**

| Token | Default | Purpose |
|---|---|---|
| `--la-duration-fast` | `150ms` | Fast transitions |
| `--la-duration-normal` | `250ms` | Normal transitions |
| `--la-duration-slow` | `400ms` | Slow transitions |
| `--la-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Ease out (default) |
| `--la-ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Spring |

**Charts** — `--la-chart-1` through `--la-chart-5`: five distinct colors for data visualization.

---

## Dark mode

Dark mode is driven by the `dark` class on a parent element (typically `<html>`):

```ts
document.documentElement.classList.toggle("dark");
```

All `--la-*` tokens have dark-mode values defined in the stylesheet — no extra configuration needed.

### Next.js with next-themes

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## TypeScript

All component props are exported as named types. The package ships `.d.ts` declarations and is compatible with TypeScript strict mode.

```ts
import { Button, type ButtonProps } from "@launchapp/design-system";

const props: ButtonProps = {
  variant: "outline",
  size: "lg",
  onClick: () => console.log("clicked"),
};
```

---

## Component reference

108 components available. All import from `@launchapp/design-system`.

**Form**
`Button` · `Checkbox` · `ColorPicker` · `Combobox` · `DatePicker` · `Form` · `Input` · `Label` · `MultiSelect` · `RadioGroup` · `Select` · `Slider` · `Switch` · `TagInput` · `Textarea` · `Toggle` · `ToggleGroup`

**Layout**
`Accordion` · `AspectRatio` · `Card` · `Collapsible` · `DashboardGrid` · `Masonry` · `Resizable` · `ScrollArea` · `Separator` · `Sheet` · `Tabs`

**Overlay**
`AlertDialog` · `ContextMenu` · `Dialog` · `DropdownMenu` · `Menubar` · `NavigationMenu` · `Popover` · `Tooltip`

**Feedback**
`Alert` · `Badge` · `Banner` · `Progress` · `Skeleton` · `Sonner` · `Toast`

**Data display**
`Avatar` · `BentoGrid` · `Breadcrumb` · `Carousel` · `Chart` · `DataTable` · `FunnelChart` · `Gauge` · `Heatmap` · `KPICard` · `Pagination` · `Sparkline` · `StatDisplay` · `Table` · `TreeMap`

**Animation**
`AnimatedBackground` · `AnimatedBorder` · `AnimatedHeight` · `AnimatedText` · `MagicCard` · `Marquee` · `PageTransition` · `ScrollAnimate` · `ScrollEffects` · `StaggeredList` · `TextAnimate`

**Navigation**
`Dock` · `MobileNav` · `Toolbar`

**Theming**
`PaletteSwitcher` · `SmartThemingGenerator` · `ThemeCard` · `ThemeGenerator` · `ThemePreview`

**AI / Streaming**
`ChatBubble` · `ChatInput` · `CopilotPanel` · `StreamingText` · `ThinkingIndicator`

**Misc**
`Background` · `Calendar` · `Changelog` · `Command` · `CookieConsent` · `ImageComparison` · `InlineEditable` · `Lightbox` · `LiveIndicator` · `MultiStepWizard` · `NotificationBell` · `Portal` · `RealtimeTicker` · `SankeyDiagram` · `Spotlight` · `StatusPage` · `Terminal` · `VideoPlayer` · `VisuallyHidden`

Full documentation and live examples: [design.launchapp.dev/components](https://design.launchapp.dev/components)

---

## License

MIT
