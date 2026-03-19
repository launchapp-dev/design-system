import * as React from "react";
import Link from "next/link";
import { Button } from "@audiogenius/design-system";
import { Badge } from "@audiogenius/design-system";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@audiogenius/design-system";

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Accessible by Default",
    description: "Built on Radix UI primitives — keyboard navigation, ARIA attributes, and focus management are included out of the box.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
    title: "Dark Mode Ready",
    description: "Full dark mode support via CSS custom properties. Toggle instantly without flicker using the class strategy.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="8" height="8" x="2" y="2" rx="2" />
        <path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
        <path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
        <rect width="8" height="8" x="2" y="14" rx="2" />
        <path d="M14 14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
        <path d="M20 14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
      </svg>
    ),
    title: "Composable Components",
    description: "54+ components built with compound patterns. Use them individually or compose them into complex UI patterns.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
    title: "Consistent Design Language",
    description: "Unified variant system with size (sm/md/lg) and variant (default/outline/ghost/destructive) across all interactive components.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M12 12v9" />
        <path d="m16 16-4-4-4 4" />
      </svg>
    ),
    title: "Full Type Safety",
    description: "Written entirely in TypeScript with full type inference, CVA variant types, and exported component prop types.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22V12" />
        <path d="m17 7-5-5-5 5" />
        <path d="M5 22h14" />
      </svg>
    ),
    title: "Tree-Shakeable",
    description: "Import only what you need. ESM and CJS bundles with full tree-shaking support keeps your bundle lean.",
  },
];

export function HeroSection() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-background py-20 sm:py-28 lg:py-36">
        <div
          className="absolute inset-0 -z-10 opacity-40 dark:opacity-20"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 50% -10%, hsl(262 83% 58% / 0.3), transparent)",
          }}
        />
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-6 inline-flex gap-1.5 py-1 px-3 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              v0.1.0 — Now available
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              The design system for{" "}
              <span className="text-primary">AudioGenius</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              A production-ready React component library built on Radix UI primitives. 54+ accessible,
              composable components with full dark mode, TypeScript support, and consistent design tokens.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/docs/installation">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/components">Browse Components</Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                54+ components
              </span>
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                WCAG AA accessible
              </span>
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                TypeScript first
              </span>
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                Dark mode built-in
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built for teams who want accessible, beautiful UI without the overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="flex flex-col">
                <CardHeader>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-24">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Start building today
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Install the package, import components, and ship faster.
            </p>

            <div className="mt-8">
              <Card className="inline-block text-left">
                <CardContent className="p-4">
                  <pre className="text-sm font-mono text-foreground">
                    <code>npm install @audiogenius/design-system</code>
                  </pre>
                </CardContent>
              </Card>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/docs">Read the Docs</Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link href="https://github.com/audiogenius/design-system">
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
