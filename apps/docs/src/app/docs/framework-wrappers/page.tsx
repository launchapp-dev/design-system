import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Framework Wrappers — LaunchApp Design System",
  description:
    "Use LaunchApp Design System components in Vue 3 and Svelte 5 projects via the included framework wrappers.",
};

export default function FrameworkWrappersPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
          New in v0.4.0
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Framework Wrappers</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The design system ships Vue 3 SFC wrappers and Svelte 5 components alongside the core
          React library. Both framework variants use the same{" "}
          <code className="text-sm font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
            --la-*
          </code>{" "}
          CSS tokens and Tailwind utilities, so they look identical to their React counterparts.
        </p>
      </div>

      <div className="space-y-12">
        {/* Vue 3 */}
        <section>
          <h2 className="text-2xl font-semibold mb-1">Vue 3 SFC Wrappers</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            90 components available as{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">.vue</code> Single-File
            Components built with the Composition API and{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">&lt;script setup&gt;</code>.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Installation</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Install the package and import the global styles once at your app entry point (e.g.{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">main.ts</code>):
              </p>
              <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm space-y-1">
                <p>npm install @launchapp/design-system</p>
              </div>
              <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm mt-3 space-y-1">
                <p className="text-muted-foreground">{"// main.ts"}</p>
                <p>{"import \"@launchapp/design-system/styles.css\";"}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Usage</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Import Vue components from the{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  @launchapp/design-system/vue
                </code>{" "}
                sub-path:
              </p>
              <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm space-y-1">
                <p className="text-muted-foreground">{"<!-- MyComponent.vue -->"}</p>
                <p className="text-muted-foreground">{"<script setup lang=\"ts\">"}</p>
                <p>{"import { Button, Card, Badge } from \"@launchapp/design-system/vue\";"}</p>
                <p className="text-muted-foreground">{"</script>"}</p>
                <p className="mt-3 text-muted-foreground">{"<template>"}</p>
                <p>{"  <Button variant=\"default\">Click me</Button>"}</p>
                <p>{"  <Badge variant=\"secondary\">New</Badge>"}</p>
                <p className="text-muted-foreground">{"</template>"}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Composables</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Several headless composables are included for complex interaction patterns:
              </p>
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Composable</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["useAccordion", "Manage accordion open/close state with single or multiple mode"],
                      ["useCollapsible", "Toggle open state for a single collapsible section"],
                      ["useDisclosure", "Boolean open/close state with toggle, open, and close helpers"],
                      ["useDropdownMenu", "Track open state and trigger ref for dropdown menus"],
                      ["usePopover", "Anchor-aware open state for popovers"],
                      ["useRadioGroup", "Controlled value binding for radio groups"],
                      ["useSelect", "Controlled value and open state for select widgets"],
                      ["useTabs", "Active tab state management"],
                      ["useToggleGroup", "Single or multi-select toggle group state"],
                    ].map(([name, desc]) => (
                      <tr key={name} className="border-b last:border-0">
                        <td className="px-4 py-3 align-middle">
                          <code className="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                            {name}
                          </code>
                        </td>
                        <td className="px-4 py-3 align-middle text-sm text-muted-foreground">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm mt-3 space-y-1">
                <p className="text-muted-foreground">{"<script setup lang=\"ts\">"}</p>
                <p>{"import { useDisclosure } from \"@launchapp/design-system/vue\";"}</p>
                <p>{"import { Dialog } from \"@launchapp/design-system/vue\";"}</p>
                <p className="mt-2">{"const { isOpen, open, close, toggle } = useDisclosure();"}</p>
                <p className="text-muted-foreground">{"</script>"}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Notes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>Requires Vue 3.3+ (uses <code className="text-xs bg-muted px-1 py-0.5 rounded">defineProps</code> generics)</li>
                <li>All props mirror the React component API — same variant names, same defaults</li>
                <li>Event names follow Vue conventions (e.g. <code className="text-xs bg-muted px-1 py-0.5 rounded">@dismiss</code> instead of <code className="text-xs bg-muted px-1 py-0.5 rounded">onDismiss</code>)</li>
                <li>Slot content uses <code className="text-xs bg-muted px-1 py-0.5 rounded">&lt;slot /&gt;</code> — named slots are documented per component</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="border-t" />

        {/* Svelte 5 */}
        <section>
          <h2 className="text-2xl font-semibold mb-1">Svelte 5 Components</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            161 components available as{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">.svelte</code> files built
            with the Svelte 5 runes API (
            <code className="text-xs bg-muted px-1 py-0.5 rounded">$props()</code>,{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">$derived()</code>,{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">$state()</code>).
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Installation</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Install the package and import styles in your root layout:
              </p>
              <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm space-y-1">
                <p>npm install @launchapp/design-system</p>
              </div>
              <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm mt-3 space-y-1">
                <p className="text-muted-foreground">{"<!-- +layout.svelte -->"}</p>
                <p>{"<script>"}</p>
                <p>{"  import \"@launchapp/design-system/styles.css\";"}</p>
                <p>{"</script>"}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Usage</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Import Svelte components from the{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  @launchapp/design-system/svelte
                </code>{" "}
                sub-path:
              </p>
              <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm space-y-1">
                <p className="text-muted-foreground">{"<!-- MyComponent.svelte -->"}</p>
                <p>{"<script lang=\"ts\">"}</p>
                <p>{"  import { Button, Card, Badge } from \"@launchapp/design-system/svelte\";"}</p>
                <p>{"</script>"}</p>
                <p className="mt-3">{"<Button variant=\"default\">Click me</Button>"}</p>
                <p>{"<Badge variant=\"secondary\">New</Badge>"}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Snippet API (children)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Components accept content via Svelte 5 snippets. Use{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">{"{@render children?.()}"}</code>{" "}
                is handled internally — pass content as slot markup:
              </p>
              <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm space-y-1">
                <p>{"<Card>"}</p>
                <p>{"  <CardHeader>Title</CardHeader>"}</p>
                <p>{"  <CardContent>"}</p>
                <p>{"    <p>Body text goes here.</p>"}</p>
                <p>{"  </CardContent>"}</p>
                <p>{"</Card>"}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Notes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>Requires Svelte 5.0+ (uses runes — not compatible with Svelte 4 syntax)</li>
                <li>All props mirror the React component API — same variant names, same defaults</li>
                <li>Extra attributes spread via <code className="text-xs bg-muted px-1 py-0.5 rounded">...restProps</code> onto the root element</li>
                <li>Custom classes passed via <code className="text-xs bg-muted px-1 py-0.5 rounded">class</code> prop, merged with <code className="text-xs bg-muted px-1 py-0.5 rounded">cn()</code></li>
                <li>TypeScript declarations are included via <code className="text-xs bg-muted px-1 py-0.5 rounded">svelte-shims.d.ts</code></li>
              </ul>
            </div>
          </div>
        </section>

        <div className="flex gap-4 pt-4 border-t">
          <Link href="/docs/dark-mode" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Dark Mode
          </Link>
          <Link
            href="/components/button"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
          >
            Components →
          </Link>
        </div>
      </div>
    </div>
  );
}
