"use client";

import {
  builtinPalettes,
  createTheme,
  type Palette,
} from "@launchapp/design-system";
import * as React from "react";
import { cn } from "@/lib/utils";

const SWATCH_TOKENS = [
  { key: "--la-primary", label: "Primary" },
  { key: "--la-secondary", label: "Secondary" },
  { key: "--la-accent", label: "Accent" },
  { key: "--la-destructive", label: "Destructive" },
  { key: "--la-muted", label: "Muted" },
  { key: "--la-background", label: "Background" },
  { key: "--la-foreground", label: "Foreground" },
];

function applyPalette(palette: Palette) {
  const isDark = document.documentElement.classList.contains("dark");
  const tokens = isDark ? palette.tokens.dark : palette.tokens.light;
  Object.entries(tokens).forEach(([prop, val]) => {
    document.documentElement.style.setProperty(prop, val);
  });
}

function PaletteCard({
  palette,
  isActive,
  onClick,
}: {
  palette: Palette;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative rounded-xl border bg-card text-left transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive
          ? "border-primary ring-2 ring-primary ring-offset-2"
          : "border-border",
      )}
      aria-pressed={isActive}
      aria-label={`Apply ${palette.label} palette`}
    >
      {isActive && (
        <span className="absolute -top-2 -right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
      )}

      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="h-4 w-4 rounded-full border border-black/10 shadow-sm"
            style={{ backgroundColor: palette.previewColor }}
            aria-hidden="true"
          />
          <span className="font-medium text-sm capitalize">
            {palette.label}
          </span>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground mb-1.5">
            Light
          </div>
          <div className="flex gap-1">
            {SWATCH_TOKENS.map(({ key, label }) => (
              <div
                key={key}
                className="h-6 flex-1 rounded-sm border border-black/5"
                style={{ backgroundColor: `hsl(${palette.tokens.light[key]})` }}
                title={`${label}: hsl(${palette.tokens.light[key]})`}
                aria-label={`${label} light`}
              />
            ))}
          </div>

          <div className="text-xs font-medium text-muted-foreground mb-1.5 mt-2">
            Dark
          </div>
          <div className="flex gap-1">
            {SWATCH_TOKENS.map(({ key, label }) => (
              <div
                key={key}
                className="h-6 flex-1 rounded-sm border border-white/10"
                style={{ backgroundColor: `hsl(${palette.tokens.dark[key]})` }}
                title={`${label}: hsl(${palette.tokens.dark[key]})`}
                aria-label={`${label} dark`}
              />
            ))}
          </div>
        </div>

        <div className="mt-3 flex gap-1 flex-wrap">
          {SWATCH_TOKENS.map(({ label }) => (
            <span key={label} className="text-[10px] text-muted-foreground">
              {label}
            </span>
          )).reduce<React.ReactNode[]>((acc, el, i) => {
            if (i > 0)
              acc.push(
                <span
                  key={`sep-${i}`}
                  className="text-[10px] text-muted-foreground/40"
                >
                  ·
                </span>,
              );
            acc.push(el);
            return acc;
          }, [])}
        </div>
      </div>
    </button>
  );
}

function CustomThemeDemo() {
  const [color, setColor] = React.useState("#6d28d9");
  const [cssOutput, setCssOutput] = React.useState("");

  React.useEffect(() => {
    try {
      const result = createTheme(color);
      setCssOutput(result.cssString);
    } catch {
      setCssOutput("/* Invalid color */");
    }
  }, [color]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label
          htmlFor="brand-color"
          className="text-sm font-medium whitespace-nowrap"
        >
          Brand color
        </label>
        <div className="flex items-center gap-2">
          <input
            id="brand-color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-9 w-12 cursor-pointer rounded border border-input bg-transparent p-0.5"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-9 w-28 rounded-md border border-input bg-background px-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="#6d28d9"
            spellCheck={false}
          />
        </div>
      </div>

      <pre className="overflow-x-auto rounded-lg border bg-muted/50 p-4 text-xs font-mono text-muted-foreground max-h-64">
        {cssOutput}
      </pre>
    </div>
  );
}

export default function PalettesPage() {
  const [activePalette, setActivePalette] = React.useState<string | null>(null);

  const handleSelect = React.useCallback((palette: Palette) => {
    setActivePalette(palette.name);
    applyPalette(palette);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Palettes</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Ten built-in color palettes for the LaunchApp design system. Click any
          palette to apply it live to this documentation site. Each card shows
          both light and dark mode swatches.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {builtinPalettes.map((palette) => (
          <PaletteCard
            key={palette.name}
            palette={palette}
            isActive={activePalette === palette.name}
            onClick={() => handleSelect(palette)}
          />
        ))}
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Import a palette CSS file
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Each palette ships as a standalone CSS file. Import it in your app
            entry point to apply the palette globally.
          </p>
          <pre className="rounded-lg border bg-muted/50 p-4 text-sm font-mono text-muted-foreground overflow-x-auto">
            {`import '@launchapp/design-system/themes/ocean.css';

/* Or any other palette: */
import '@launchapp/design-system/themes/forest.css';
import '@launchapp/design-system/themes/sunset.css';
import '@launchapp/design-system/themes/rose.css';
import '@launchapp/design-system/themes/amber.css';
import '@launchapp/design-system/themes/violet.css';
import '@launchapp/design-system/themes/slate.css';
import '@launchapp/design-system/themes/midnight.css';
import '@launchapp/design-system/themes/emerald.css';`}
          </pre>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            Generate a custom palette
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Use{" "}
            <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
              createTheme(brandColor)
            </code>{" "}
            to generate a full token set from a single brand color. Pass a hex
            value, HSL string, or space-separated HSL values.
          </p>

          <div className="mb-4 rounded-lg border bg-muted/50 p-4">
            <pre className="text-sm font-mono text-muted-foreground overflow-x-auto">
              {`import { createTheme } from '@launchapp/design-system/themes/createTheme';

const { light, dark, cssString } = createTheme('#6d28d9');

/* Apply to the document */
Object.entries(light).forEach(([prop, val]) => {
  document.documentElement.style.setProperty(prop, val);
});`}
            </pre>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-sm font-semibold mb-4">Live demo</h3>
            <CustomThemeDemo />
          </div>
        </section>
      </div>
    </div>
  );
}
