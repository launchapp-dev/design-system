import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Installation — LaunchApp Design System",
  description: "How to install and set up the LaunchApp Design System in your project.",
};

export default function InstallationPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Installation</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Get started with the LaunchApp Design System in your React project.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-4">Option 1 — npm package</h2>
          <p className="text-muted-foreground mb-4">
            Install the full package to get all components and the default styles.
          </p>
          <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm space-y-1">
            <p>npm install @launchapp/design-system</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Then import the styles once in your app entry (e.g.{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">app/layout.tsx</code> or{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">main.tsx</code>):
          </p>
          <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm mt-2 space-y-1">
            <p className="text-muted-foreground">{"// Import once at the root of your app"}</p>
            <p>{"import \"@launchapp/design-system/styles.css\";"}</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Option 2 — shadcn CLI</h2>
          <p className="text-muted-foreground mb-4">
            Install individual components into your project using the shadcn CLI. This copies the
            component source directly so you own it.
          </p>
          <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm space-y-1">
            <p className="text-muted-foreground"># Install a single component</p>
            <p>
              npx shadcn@latest add --registry https://launchapp-dev.github.io/design-system/registry.json
              button
            </p>
          </div>
          <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm mt-3 space-y-1">
            <p className="text-muted-foreground"># Install multiple components</p>
            <p>
              npx shadcn@latest add --registry https://launchapp-dev.github.io/design-system/registry.json
              button card dialog
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Usage</h2>
          <p className="text-muted-foreground mb-4">Import components from the package:</p>
          <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm space-y-1">
            <p>{"import { Button, Card, Dialog } from \"@launchapp/design-system\";"}</p>
            <p className="mt-2">{"export default function App() {"}</p>
            <p>{"  return <Button variant=\"default\">Click me</Button>;"}</p>
            <p>{"}"}</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Requirements</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-foreground font-medium w-32 shrink-0">React</span>
              <span>18 or 19</span>
            </li>
            <li className="flex gap-2">
              <span className="text-foreground font-medium w-32 shrink-0">TypeScript</span>
              <span>5.0+ (recommended)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-foreground font-medium w-32 shrink-0">Tailwind CSS</span>
              <span>4.x</span>
            </li>
          </ul>
        </section>

        <div className="flex gap-4 pt-4 border-t">
          <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Introduction
          </Link>
          <Link
            href="/docs/theming"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
          >
            Theming →
          </Link>
        </div>
      </div>
    </div>
  );
}
