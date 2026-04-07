import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Theming — LaunchApp Design System",
  description: "Customize the LaunchApp Design System with CSS custom properties and design tokens.",
};

const TOKEN_GROUPS = [
  {
    title: "Base",
    tokens: [
      { name: "--la-background", description: "Page background" },
      { name: "--la-foreground", description: "Default text color" },
    ],
  },
  {
    title: "Brand",
    tokens: [
      { name: "--la-primary", description: "Primary brand color" },
      { name: "--la-primary-foreground", description: "Text on primary" },
      { name: "--la-secondary", description: "Secondary brand color" },
      { name: "--la-secondary-foreground", description: "Text on secondary" },
    ],
  },
  {
    title: "Semantic",
    tokens: [
      { name: "--la-muted", description: "Muted background" },
      { name: "--la-muted-foreground", description: "Muted text" },
      { name: "--la-accent", description: "Accent / hover background" },
      { name: "--la-destructive", description: "Error / danger color" },
    ],
  },
  {
    title: "UI Chrome",
    tokens: [
      { name: "--la-border", description: "Default border color" },
      { name: "--la-ring", description: "Focus ring color" },
      { name: "--la-card", description: "Card surface color" },
      { name: "--la-popover", description: "Popover surface color" },
    ],
  },
];

export default function ThemingPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Theming</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Customize the design system by overriding CSS custom properties. All design tokens use
          the <code className="text-base bg-muted px-1.5 py-0.5 rounded">--la-*</code> prefix.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-4">How theming works</h2>
          <p className="text-muted-foreground mb-4">
            Every component references CSS custom properties instead of hard-coded values. Override
            any token in your global stylesheet to change the appearance across all components at
            once.
          </p>
          <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm space-y-1">
            <p className="text-muted-foreground">{"/* globals.css */"}</p>
            <p>{":root {"}</p>
            <p>{"  --la-primary: hsl(262 83% 58%);"}</p>
            <p>{"  --la-primary-foreground: hsl(0 0% 98%);"}</p>
            <p>{"  --la-background: hsl(0 0% 100%);"}</p>
            <p>{"  --la-foreground: hsl(240 10% 3.9%);"}</p>
            <p>{"  /* ... override any token */"}</p>
            <p>{"}"}</p>
            <p className="mt-2">{"/* Dark mode overrides */"}</p>
            <p>{".dark {"}</p>
            <p>{"  --la-primary: hsl(263 70% 50%);"}</p>
            <p>{"  --la-background: hsl(240 10% 3.9%);"}</p>
            <p>{"  --la-foreground: hsl(0 0% 98%);"}</p>
            <p>{"}"}</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Design tokens</h2>
          <p className="text-muted-foreground mb-4">
            All available{" "}
            <code className="text-sm bg-muted px-1 py-0.5 rounded">--la-*</code> tokens with their
            semantic meaning. See the full{" "}
            <Link href="/tokens" className="text-primary hover:underline">
              Design Tokens reference
            </Link>{" "}
            for light/dark values.
          </p>
          <div className="space-y-6">
            {TOKEN_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  {group.title}
                </h3>
                <div className="rounded-lg border overflow-hidden">
                  {group.tokens.map((token, i) => (
                    <div
                      key={token.name}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm ${
                        i > 0 ? "border-t" : ""
                      }`}
                    >
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{token.name}</code>
                      <span className="text-muted-foreground text-xs">{token.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Custom brand example</h2>
          <p className="text-muted-foreground mb-4">
            Override the primary color to match your brand:
          </p>
          <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm space-y-1">
            <p className="text-muted-foreground">{"/* Use your brand color */"}</p>
            <p>{":root {"}</p>
            <p>{"  --la-primary: hsl(221 83% 53%); /* blue */"}</p>
            <p>{"  --la-primary-foreground: hsl(0 0% 100%);"}</p>
            <p>{"  --la-ring: hsl(221 83% 53%);"}</p>
            <p>{"}"}</p>
          </div>
        </section>

        <div className="flex gap-4 pt-4 border-t">
          <Link
            href="/docs/installation"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Installation
          </Link>
          <Link
            href="/docs/dark-mode"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
          >
            Dark Mode →
          </Link>
        </div>
      </div>
    </div>
  );
}
