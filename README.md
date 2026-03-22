# @launchapp/design-system

A React + TypeScript component library built on Radix UI primitives, styled with Tailwind CSS.

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

## npm installation

### Install the package

```bash
npm install @launchapp/design-system
```

### Peer dependencies

```bash
npm install react@^18 react-dom@^18 tailwindcss
```

### Configure Tailwind CSS

Add the library's source to your `tailwind.config.ts` content paths and extend the theme with the `--la-*` CSS custom properties:

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@launchapp/design-system/dist/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--la-border))",
        input: "hsl(var(--la-input))",
        ring: "hsl(var(--la-ring))",
        background: "hsl(var(--la-background))",
        foreground: "hsl(var(--la-foreground))",
        primary: {
          DEFAULT: "hsl(var(--la-primary))",
          foreground: "hsl(var(--la-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--la-secondary))",
          foreground: "hsl(var(--la-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--la-destructive))",
          foreground: "hsl(var(--la-destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--la-muted))",
          foreground: "hsl(var(--la-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--la-accent))",
          foreground: "hsl(var(--la-accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--la-radius)",
        md: "calc(var(--la-radius) - 2px)",
        sm: "calc(var(--la-radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
```

### Import CSS tokens

In your app's entry point (e.g. `src/main.tsx` or `app/layout.tsx`), import the stylesheet:

```ts
import "@launchapp/design-system/styles.css";
```

This file includes all `--la-*` CSS custom property definitions for both light and dark modes, plus Tailwind base/components/utilities directives.

---

## shadcn registry installation

Components are also available individually via the shadcn CLI. This copies component source directly into your project so you can customise it freely.

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

Available component slugs match the names listed in [Component reference](#component-reference) below (lowercase, hyphenated).

---

## Theming

All design tokens are CSS custom properties prefixed with `--la-`. Override them in your own stylesheet to apply custom branding:

```css
:root {
  /* Brand color (HSL values, no `hsl()` wrapper) */
  --la-primary: 210 100% 50%;
  --la-primary-foreground: 0 0% 100%;

  /* Border radius */
  --la-radius: 0.375rem;

  /* Typography */
  --la-font-sans: "My Brand Font";
}
```

You can scope overrides to a specific part of the page:

```css
.marketing-section {
  --la-primary: 160 84% 39%;
}
```

### Available tokens

| Token | Default (light) | Purpose |
|---|---|---|
| `--la-background` | `0 0% 100%` | Page background |
| `--la-foreground` | `240 10% 3.9%` | Default text |
| `--la-primary` | `262 83% 58%` | Primary actions |
| `--la-secondary` | `240 4.8% 95.9%` | Secondary actions |
| `--la-destructive` | `0 84.2% 60.2%` | Destructive actions |
| `--la-muted` | `240 4.8% 95.9%` | Muted surfaces |
| `--la-accent` | `240 4.8% 95.9%` | Accent surfaces |
| `--la-border` | `240 5.9% 90%` | Border color |
| `--la-radius` | `0.5rem` | Border radius |

---

## Dark mode

Dark mode is driven by the `dark` class on a parent element (typically `<html>`). Toggle it with JavaScript:

```ts
document.documentElement.classList.toggle("dark");
```

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

All `--la-*` tokens have corresponding dark-mode values defined in the stylesheet under the `.dark` selector — no additional configuration required.

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

Types are co-located with each component and re-exported from the package root.

---

## Component reference

| Component | Import |
|---|---|
| `Button` | `import { Button } from "@launchapp/design-system"` |
| `Input` | `import { Input } from "@launchapp/design-system"` |
| `Label` | `import { Label } from "@launchapp/design-system"` |
| `Card` | `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@launchapp/design-system"` |
| `Badge` | `import { Badge } from "@launchapp/design-system"` |
| `Checkbox` | `import { Checkbox } from "@launchapp/design-system"` |
| `Switch` | `import { Switch } from "@launchapp/design-system"` |
| `Select` | `import { SelectRoot, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@launchapp/design-system"` |
| `Dialog` | `import { DialogRoot, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@launchapp/design-system"` |
| `Tabs` | `import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "@launchapp/design-system"` |
| `Accordion` | `import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from "@launchapp/design-system"` |
| `Tooltip` | `import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@launchapp/design-system"` |
| `Avatar` | `import { Avatar, AvatarImage, AvatarFallback } from "@launchapp/design-system"` |
| `Separator` | `import { Separator } from "@launchapp/design-system"` |
| `Toast` | `import { Toaster, useToast } from "@launchapp/design-system"` |

Full component documentation is available in the docs app.

---

## Visual Regression Testing

This project uses [Chromatic](https://www.chromatic.com/) for visual regression testing. Chromatic automatically captures snapshots of every Storybook story and detects unintended UI changes on every pull request.

### How It Works

- **Automated Testing**: Every PR triggers Chromatic to build Storybook and capture screenshots
- **Visual Diff Detection**: Chromatic compares screenshots against the accepted baseline
- **PR Comments**: Visual changes are automatically flagged in PR comments with detailed diffs
- **Auto-Approval**: Changes on the `main` branch are auto-approved to keep baselines up to date

### Setup for Contributors

The visual regression tests run automatically in CI. To run Chromatic locally:

```bash
CHROMATIC_PROJECT_TOKEN=<your-token> npm run chromatic
```

For detailed setup instructions, see [CHROMATIC.md](./CHROMATIC.md).

---

## License

MIT
