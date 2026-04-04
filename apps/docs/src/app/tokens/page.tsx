import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Tokens — LaunchApp Design System",
  description:
    "Visual reference for all --la-* CSS custom properties used in the LaunchApp design system.",
};

interface Token {
  name: string;
  variable: string;
  lightValue: string;
  darkValue: string;
  description: string;
  type: "color" | "size" | "font";
}

interface TokenGroup {
  title: string;
  tokens: Token[];
}

const TOKEN_GROUPS: TokenGroup[] = [
  {
    title: "Base",
    tokens: [
      {
        name: "Background",
        variable: "--la-background",
        lightValue: "hsl(0 0% 100%)",
        darkValue: "hsl(240 10% 3.9%)",
        description: "Page background color",
        type: "color",
      },
      {
        name: "Foreground",
        variable: "--la-foreground",
        lightValue: "hsl(240 10% 3.9%)",
        darkValue: "hsl(0 0% 98%)",
        description: "Default text color",
        type: "color",
      },
    ],
  },
  {
    title: "Brand",
    tokens: [
      {
        name: "Primary",
        variable: "--la-primary",
        lightValue: "hsl(262 83% 58%)",
        darkValue: "hsl(263 70% 50%)",
        description: "Primary brand color",
        type: "color",
      },
      {
        name: "Primary Foreground",
        variable: "--la-primary-foreground",
        lightValue: "hsl(0 0% 98%)",
        darkValue: "hsl(0 0% 98%)",
        description: "Text on primary color",
        type: "color",
      },
      {
        name: "Secondary",
        variable: "--la-secondary",
        lightValue: "hsl(240 4.8% 95.9%)",
        darkValue: "hsl(240 3.7% 15.9%)",
        description: "Secondary brand color",
        type: "color",
      },
      {
        name: "Secondary Foreground",
        variable: "--la-secondary-foreground",
        lightValue: "hsl(240 5.9% 10%)",
        darkValue: "hsl(0 0% 98%)",
        description: "Text on secondary color",
        type: "color",
      },
    ],
  },
  {
    title: "Semantic",
    tokens: [
      {
        name: "Destructive",
        variable: "--la-destructive",
        lightValue: "hsl(0 84.2% 60.2%)",
        darkValue: "hsl(0 62.8% 30.6%)",
        description: "Danger / error color",
        type: "color",
      },
      {
        name: "Destructive Foreground",
        variable: "--la-destructive-foreground",
        lightValue: "hsl(0 0% 98%)",
        darkValue: "hsl(0 0% 98%)",
        description: "Text on destructive",
        type: "color",
      },
      {
        name: "Muted",
        variable: "--la-muted",
        lightValue: "hsl(240 4.8% 95.9%)",
        darkValue: "hsl(240 3.7% 15.9%)",
        description: "Muted / subdued background",
        type: "color",
      },
      {
        name: "Muted Foreground",
        variable: "--la-muted-foreground",
        lightValue: "hsl(240 3.8% 46.1%)",
        darkValue: "hsl(240 5% 64.9%)",
        description: "Muted text color",
        type: "color",
      },
      {
        name: "Accent",
        variable: "--la-accent",
        lightValue: "hsl(240 4.8% 95.9%)",
        darkValue: "hsl(240 3.7% 15.9%)",
        description: "Accent / hover background",
        type: "color",
      },
      {
        name: "Accent Foreground",
        variable: "--la-accent-foreground",
        lightValue: "hsl(240 5.9% 10%)",
        darkValue: "hsl(0 0% 98%)",
        description: "Text on accent",
        type: "color",
      },
    ],
  },
  {
    title: "UI Chrome",
    tokens: [
      {
        name: "Card",
        variable: "--la-card",
        lightValue: "hsl(0 0% 100%)",
        darkValue: "hsl(240 10% 3.9%)",
        description: "Card surface color",
        type: "color",
      },
      {
        name: "Card Foreground",
        variable: "--la-card-foreground",
        lightValue: "hsl(240 10% 3.9%)",
        darkValue: "hsl(0 0% 98%)",
        description: "Text on card",
        type: "color",
      },
      {
        name: "Popover",
        variable: "--la-popover",
        lightValue: "hsl(0 0% 100%)",
        darkValue: "hsl(240 10% 3.9%)",
        description: "Popover surface color",
        type: "color",
      },
      {
        name: "Popover Foreground",
        variable: "--la-popover-foreground",
        lightValue: "hsl(240 10% 3.9%)",
        darkValue: "hsl(0 0% 98%)",
        description: "Text on popover",
        type: "color",
      },
      {
        name: "Border",
        variable: "--la-border",
        lightValue: "hsl(240 5.9% 90%)",
        darkValue: "hsl(240 3.7% 15.9%)",
        description: "Default border color",
        type: "color",
      },
      {
        name: "Input",
        variable: "--la-input",
        lightValue: "hsl(240 5.9% 90%)",
        darkValue: "hsl(240 3.7% 15.9%)",
        description: "Form input border color",
        type: "color",
      },
      {
        name: "Ring",
        variable: "--la-ring",
        lightValue: "hsl(262 83% 58%)",
        darkValue: "hsl(263 70% 50%)",
        description: "Focus ring color",
        type: "color",
      },
    ],
  },
  {
    title: "Charts",
    tokens: [
      {
        name: "Chart 1",
        variable: "--la-chart-1",
        lightValue: "hsl(262 83% 58%)",
        darkValue: "hsl(263 70% 65%)",
        description: "Primary chart color",
        type: "color",
      },
      {
        name: "Chart 2",
        variable: "--la-chart-2",
        lightValue: "hsl(200 80% 50%)",
        darkValue: "hsl(200 75% 60%)",
        description: "Secondary chart color",
        type: "color",
      },
      {
        name: "Chart 3",
        variable: "--la-chart-3",
        lightValue: "hsl(150 60% 45%)",
        darkValue: "hsl(150 55% 55%)",
        description: "Tertiary chart color",
        type: "color",
      },
      {
        name: "Chart 4",
        variable: "--la-chart-4",
        lightValue: "hsl(30 90% 55%)",
        darkValue: "hsl(30 85% 65%)",
        description: "Quaternary chart color",
        type: "color",
      },
      {
        name: "Chart 5",
        variable: "--la-chart-5",
        lightValue: "hsl(350 80% 55%)",
        darkValue: "hsl(350 75% 65%)",
        description: "Quinary chart color",
        type: "color",
      },
    ],
  },
  {
    title: "Spacing & Shape",
    tokens: [
      {
        name: "Radius",
        variable: "--la-radius",
        lightValue: "0.5rem",
        darkValue: "0.5rem",
        description: "Base border radius",
        type: "size",
      },
    ],
  },
  {
    title: "Typography",
    tokens: [
      {
        name: "Font Sans",
        variable: "--la-font-sans",
        lightValue: '"Inter"',
        darkValue: '"Inter"',
        description: "Sans-serif font family",
        type: "font",
      },
      {
        name: "Font Mono",
        variable: "--la-font-mono",
        lightValue: '"JetBrains Mono"',
        darkValue: '"JetBrains Mono"',
        description: "Monospace font family",
        type: "font",
      },
    ],
  },
];

function ColorSwatch({
  lightValue,
  darkValue,
}: {
  lightValue: string;
  darkValue: string;
}) {
  return (
    <div className="flex gap-1.5 items-center">
      <div
        className="h-8 w-8 rounded border border-border/50 shadow-sm"
        style={{ background: lightValue }}
        title={`Light: ${lightValue}`}
      />
      <div
        className="h-8 w-8 rounded border border-border/50 shadow-sm"
        style={{ background: darkValue }}
        title={`Dark: ${darkValue}`}
      />
    </div>
  );
}

function TokenRow({ token }: { token: Token }) {
  return (
    <tr className="border-b last:border-0">
      <td className="px-4 py-3 align-middle">
        {token.type === "color" && (
          <ColorSwatch
            lightValue={token.lightValue}
            darkValue={token.darkValue}
          />
        )}
        {token.type === "size" && (
          <div
            className="rounded bg-primary/20 border border-primary/30"
            style={{
              width: token.lightValue,
              minWidth: "8px",
              height: "24px",
              display: "inline-block",
            }}
          />
        )}
        {token.type === "font" && (
          <span style={{ fontFamily: token.lightValue }} className="text-base">
            Aa
          </span>
        )}
      </td>
      <td className="px-4 py-3 align-middle font-medium text-sm">
        {token.name}
      </td>
      <td className="px-4 py-3 align-middle">
        <code className="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
          {token.variable}
        </code>
      </td>
      <td className="px-4 py-3 align-middle">
        <div className="flex flex-col gap-0.5">
          <code className="text-xs font-mono text-muted-foreground">
            {token.lightValue}
          </code>
          {token.lightValue !== token.darkValue && (
            <code className="text-xs font-mono text-muted-foreground/70">
              dark: {token.darkValue}
            </code>
          )}
        </div>
      </td>
      <td className="px-4 py-3 align-middle text-sm text-muted-foreground">
        {token.description}
      </td>
    </tr>
  );
}

export default function TokensPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Design Tokens
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          CSS custom properties (variables) that power the LaunchApp design
          system. All tokens use the{" "}
          <code className="text-sm font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
            --la-*
          </code>{" "}
          prefix and support both light and dark modes.
        </p>
      </div>

      <div className="mb-8 rounded-lg border overflow-hidden bg-muted/30 p-4">
        <h2 className="text-sm font-semibold mb-3">Usage</h2>
        <pre className="text-sm font-mono text-muted-foreground bg-background rounded border p-3 overflow-x-auto">
          {`/* In your CSS */
.my-element {
  color: hsl(var(--la-foreground));
  background: hsl(var(--la-background));
  border-color: hsl(var(--la-border));
}

/* In Tailwind (via theme extension) */
<div className="bg-primary text-primary-foreground" />`}
        </pre>
      </div>

      <div className="space-y-8">
        {TOKEN_GROUPS.map((group) => (
          <div key={group.title}>
            <h2 className="text-lg font-semibold mb-3">{group.title}</h2>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground w-24">
                      Preview
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground w-32">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Variable
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Value
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {group.tokens.map((token) => (
                    <TokenRow key={token.variable} token={token} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border bg-muted/30 p-6">
        <h2 className="font-semibold mb-2">Color Preview Grid</h2>
        <p className="text-sm text-muted-foreground mb-4">
          All semantic color tokens rendered side by side.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            { label: "Background", var: "--la-background" },
            { label: "Foreground", var: "--la-foreground" },
            { label: "Primary", var: "--la-primary" },
            { label: "Secondary", var: "--la-secondary" },
            { label: "Muted", var: "--la-muted" },
            { label: "Accent", var: "--la-accent" },
            { label: "Destructive", var: "--la-destructive" },
            { label: "Border", var: "--la-border" },
            { label: "Ring", var: "--la-ring" },
            { label: "Chart 1", var: "--la-chart-1" },
            { label: "Chart 2", var: "--la-chart-2" },
            { label: "Chart 3", var: "--la-chart-3" },
            { label: "Chart 4", var: "--la-chart-4" },
            { label: "Chart 5", var: "--la-chart-5" },
          ].map(({ label, var: cssVar }) => (
            <div key={cssVar} className="rounded-lg overflow-hidden border">
              <div
                className="h-14"
                style={{ background: `hsl(var(${cssVar}))` }}
              />
              <div className="px-2.5 py-2 bg-background">
                <div className="text-xs font-medium">{label}</div>
                <div className="text-xs font-mono text-muted-foreground mt-0.5">
                  {cssVar}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
