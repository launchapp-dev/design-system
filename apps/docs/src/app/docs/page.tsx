import type { Metadata } from "next";
import Link from "next/link";
import { components } from "@/lib/registry";
import { blocks } from "@/lib/blocks-registry";

export const metadata: Metadata = {
  title: "Introduction — LaunchApp Design System",
  description:
    "A comprehensive component library built on Radix UI Primitives and Tailwind CSS 4. Accessible, customizable, and production-ready.",
};

export default function IntroductionPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Introduction</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          LaunchApp Design System is a comprehensive component library built on{" "}
          <a
            href="https://www.radix-ui.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Radix UI Primitives
          </a>{" "}
          and{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Tailwind CSS 4
          </a>
          . Every component is accessible, themeable, and production-ready.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10 p-4 rounded-xl border bg-muted/30">
        <div className="text-center p-3">
          <div className="text-3xl font-bold text-primary">{components.length}</div>
          <div className="text-sm text-muted-foreground mt-1">Components</div>
        </div>
        <div className="text-center p-3 border-l">
          <div className="text-3xl font-bold text-primary">{blocks.length}+</div>
          <div className="text-sm text-muted-foreground mt-1">Blocks</div>
        </div>
        <div className="text-center p-3 border-l">
          <div className="text-3xl font-bold text-primary">100%</div>
          <div className="text-sm text-muted-foreground mt-1">Accessible</div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">Features</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>
                <strong className="text-foreground">Accessible</strong> — built on Radix UI primitives, WAI-ARIA
                compliant out of the box
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>
                <strong className="text-foreground">Themeable</strong> — CSS custom properties (
                <code className="text-xs bg-muted px-1 py-0.5 rounded">--la-*</code>) make theming trivial
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>
                <strong className="text-foreground">Dark mode</strong> — first-class dark mode support via the{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">dark</code> class strategy
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>
                <strong className="text-foreground">TypeScript</strong> — fully typed with strict TypeScript
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>
                <strong className="text-foreground">shadcn compatible</strong> — install individual components via
                the shadcn CLI
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Quick start</h2>
          <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm space-y-1">
            <p className="text-muted-foreground"># Install via npm</p>
            <p>npm install @launchapp/design-system</p>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            See{" "}
            <Link href="/docs/installation" className="text-primary hover:underline">
              Installation
            </Link>{" "}
            for full setup instructions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Next steps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/docs/installation"
              className="rounded-lg border p-4 hover:border-primary hover:bg-accent/50 transition-all"
            >
              <div className="font-medium mb-1">Installation</div>
              <div className="text-sm text-muted-foreground">Set up the package in your project</div>
            </Link>
            <Link
              href="/docs/theming"
              className="rounded-lg border p-4 hover:border-primary hover:bg-accent/50 transition-all"
            >
              <div className="font-medium mb-1">Theming</div>
              <div className="text-sm text-muted-foreground">Customize colors, typography, and spacing</div>
            </Link>
            <Link
              href="/docs/dark-mode"
              className="rounded-lg border p-4 hover:border-primary hover:bg-accent/50 transition-all"
            >
              <div className="font-medium mb-1">Dark Mode</div>
              <div className="text-sm text-muted-foreground">Add dark mode to your application</div>
            </Link>
            <Link
              href="/components/button"
              className="rounded-lg border p-4 hover:border-primary hover:bg-accent/50 transition-all"
            >
              <div className="font-medium mb-1">Components</div>
              <div className="text-sm text-muted-foreground">Browse all {components.length} components</div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
