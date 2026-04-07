import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dark Mode — LaunchApp Design System",
  description: "How to add dark mode to your application using the LaunchApp Design System.",
};

export default function DarkModePage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Dark Mode</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The LaunchApp Design System uses the{" "}
          <code className="text-base bg-muted px-1.5 py-0.5 rounded">dark</code> class strategy.
          Add the <code className="text-base bg-muted px-1.5 py-0.5 rounded">dark</code> class to
          your <code className="text-base bg-muted px-1.5 py-0.5 rounded">&lt;html&gt;</code>{" "}
          element to activate dark mode across all components.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-4">CSS setup</h2>
          <p className="text-muted-foreground mb-4">
            Dark mode tokens are defined under the{" "}
            <code className="text-sm bg-muted px-1 py-0.5 rounded">.dark</code> selector in your
            stylesheet. The design system ships with defaults — override as needed:
          </p>
          <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm space-y-1">
            <p className="text-muted-foreground">{"/* globals.css */"}</p>
            <p>{":root {"}</p>
            <p>{"  --la-background: hsl(0 0% 100%);"}</p>
            <p>{"  --la-foreground: hsl(240 10% 3.9%);"}</p>
            <p>{"  --la-primary: hsl(262 83% 58%);"}</p>
            <p>{"}"}</p>
            <p className="mt-2">{".dark {"}</p>
            <p>{"  --la-background: hsl(240 10% 3.9%);"}</p>
            <p>{"  --la-foreground: hsl(0 0% 98%);"}</p>
            <p>{"  --la-primary: hsl(263 70% 50%);"}</p>
            <p>{"}"}</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Next.js with next-themes</h2>
          <p className="text-muted-foreground mb-4">
            The easiest way to implement dark mode in Next.js is{" "}
            <code className="text-sm bg-muted px-1 py-0.5 rounded">next-themes</code>:
          </p>
          <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm space-y-1 mb-4">
            <p>npm install next-themes</p>
          </div>
          <p className="text-muted-foreground mb-3">
            Wrap your app with <code className="text-sm bg-muted px-1 py-0.5 rounded">ThemeProvider</code>:
          </p>
          <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm space-y-1 mb-4">
            <p className="text-muted-foreground">{"// app/layout.tsx"}</p>
            <p>{"import { ThemeProvider } from \"next-themes\";"}</p>
            <p className="mt-2">{"export default function RootLayout({ children }) {"}</p>
            <p>{"  return ("}</p>
            <p>{"    <html suppressHydrationWarning>"}</p>
            <p>{"      <body>"}</p>
            <p>{"        <ThemeProvider attribute=\"class\" defaultTheme=\"system\">"}</p>
            <p>{"          {children}"}</p>
            <p>{"        </ThemeProvider>"}</p>
            <p>{"      </body>"}</p>
            <p>{"    </html>"}</p>
            <p>{"  );"}</p>
            <p>{"}"}</p>
          </div>
          <p className="text-muted-foreground mb-3">Then add a toggle button anywhere:</p>
          <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm space-y-1">
            <p>{"\"use client\";"}</p>
            <p className="mt-1">{"import { useTheme } from \"next-themes\";"}</p>
            <p className="mt-2">{"export function ThemeToggle() {"}</p>
            <p>{"  const { theme, setTheme } = useTheme();"}</p>
            <p>{"  return ("}</p>
            <p>{"    <button onClick={() => setTheme(theme === \"dark\" ? \"light\" : \"dark\")}>"}</p>
            <p>{"      Toggle theme"}</p>
            <p>{"    </button>"}</p>
            <p>{"  );"}</p>
            <p>{"}"}</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Manual toggle</h2>
          <p className="text-muted-foreground mb-4">
            Without a library, toggle the{" "}
            <code className="text-sm bg-muted px-1 py-0.5 rounded">dark</code> class directly:
          </p>
          <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm space-y-1">
            <p>{"document.documentElement.classList.toggle(\"dark\");"}</p>
          </div>
        </section>

        <div className="flex gap-4 pt-4 border-t">
          <Link
            href="/docs/theming"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Theming
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
