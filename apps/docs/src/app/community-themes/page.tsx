"use client";

import * as React from "react";
import Link from "next/link";
import {
  type CommunityTheme,
  getCommunityThemeRegistry,
  getCommunityThemesCssString,
  getFeaturedCommunityThemeIds,
} from "@launchapp/design-system";
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

function applyTheme(theme: CommunityTheme) {
  const isDark = document.documentElement.classList.contains("dark");
  const tokens = isDark ? theme.tokens.dark : theme.tokens.light;
  Object.entries(tokens).forEach(([prop, val]) => {
    document.documentElement.style.setProperty(prop, val);
  });
}

function CommunityThemeCard({
  theme,
  isActive,
  onClick,
}: {
  theme: CommunityTheme;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative rounded-xl border bg-card text-left transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"
      )}
      aria-pressed={isActive}
      aria-label={`Apply ${theme.name} theme`}
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
          {theme.previewColor && (
            <span
              className="h-4 w-4 rounded-full border border-black/10 shadow-sm"
              style={{ backgroundColor: `hsl(${theme.previewColor})` }}
              aria-hidden="true"
            />
          )}
          <div>
            <span className="font-medium text-sm">{theme.name}</span>
            {theme.author && (
              <p className="text-xs text-muted-foreground">by {theme.author.name}</p>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-3">{theme.description}</p>

        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground mb-1.5">Light</div>
          <div className="flex gap-1">
            {SWATCH_TOKENS.map(({ key, label }) => (
              <div
                key={key}
                className="h-6 flex-1 rounded-sm border border-black/5"
                style={{ backgroundColor: `hsl(${theme.tokens.light[key as keyof typeof theme.tokens.light]})` }}
                title={`${label}: hsl(${theme.tokens.light[key as keyof typeof theme.tokens.light]})`}
                aria-label={`${label} light`}
              />
            ))}
          </div>

          <div className="text-xs font-medium text-muted-foreground mb-1.5 mt-2">Dark</div>
          <div className="flex gap-1">
            {SWATCH_TOKENS.map(({ key, label }) => (
              <div
                key={key}
                className="h-6 flex-1 rounded-sm border border-white/10"
                style={{ backgroundColor: `hsl(${theme.tokens.dark[key as keyof typeof theme.tokens.dark]})` }}
                title={`${label}: hsl(${theme.tokens.dark[key as keyof typeof theme.tokens.dark]})`}
                aria-label={`${label} dark`}
              />
            ))}
          </div>
        </div>

        {theme.keywords && theme.keywords.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {theme.keywords.map((keyword) => (
              <span key={keyword} className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

function ThemeDetailsPanel({ theme }: { theme: CommunityTheme }) {
  const [cssOutput, setCssOutput] = React.useState("");

  React.useEffect(() => {
    setCssOutput(getCommunityThemesCssString(theme));
  }, [theme]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">{theme.name}</h3>
        <p className="text-muted-foreground">{theme.description}</p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">Author</h4>
          <div className="text-sm">
            <p>{theme.author.name}</p>
            {theme.author.url && (
              <a href={theme.author.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {theme.author.url}
              </a>
            )}
            {theme.author.email && (
              <p className="text-muted-foreground">{theme.author.email}</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">Details</h4>
          <dl className="text-sm space-y-1">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Version:</dt>
              <dd className="font-mono">{theme.version}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">License:</dt>
              <dd>{theme.license}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">ID:</dt>
              <dd className="font-mono text-xs">{theme.id}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Installation</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Install this community theme using the CLI:
        </p>
        <pre className="rounded-lg border bg-muted/50 p-3 text-xs font-mono text-muted-foreground overflow-x-auto">
          {`npx @launchapp/create-design-system add ${theme.id}`}
        </pre>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">CSS Output</h4>
        <pre className="rounded-lg border bg-muted/50 p-3 text-xs font-mono text-muted-foreground overflow-x-auto max-h-48 overflow-y-auto">
          {cssOutput}
        </pre>
      </div>
    </div>
  );
}

export default function CommunityThemesPage() {
  const [activeThemeId, setActiveThemeId] = React.useState<string | null>(null);
  const [themes, setThemes] = React.useState<CommunityTheme[]>([]);
  const [featuredIds, setFeaturedIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    const registry = getCommunityThemeRegistry();
    const communityThemes = registry.map((entry) => entry.theme);
    setThemes(communityThemes);
    setFeaturedIds(getFeaturedCommunityThemeIds());
    if (communityThemes.length > 0) {
      setActiveThemeId(communityThemes[0].id);
    }
  }, []);

  const activeTheme = themes.find((t) => t.id === activeThemeId);
  const featuredThemes = themes.filter((t) => featuredIds.includes(t.id));
  const otherThemes = themes.filter((t) => !featuredIds.includes(t.id));

  const handleSelect = React.useCallback((theme: CommunityTheme) => {
    setActiveThemeId(theme.id);
    applyTheme(theme);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Community Themes</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          Explore and install color themes contributed by the LaunchApp community. Click any theme to preview it
          and see installation instructions.
        </p>
        <Link
          href="/community-themes/contribute"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm"
        >
          Submit Your Theme
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
          {featuredThemes.length > 0 && (
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Featured Themes</h2>
                <p className="text-sm text-muted-foreground">Handpicked community contributions</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredThemes.map((theme) => (
                  <CommunityThemeCard
                    key={theme.id}
                    theme={theme}
                    isActive={activeThemeId === theme.id}
                    onClick={() => handleSelect(theme)}
                  />
                ))}
              </div>
            </div>
          )}

          {otherThemes.length > 0 && (
            <div>
              {featuredThemes.length > 0 && (
                <div className="h-px bg-border my-6" />
              )}
              <div className="mb-4">
                <h2 className="text-xl font-semibold">All Themes</h2>
                <p className="text-sm text-muted-foreground">{otherThemes.length} more available</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherThemes.map((theme) => (
                  <CommunityThemeCard
                    key={theme.id}
                    theme={theme}
                    isActive={activeThemeId === theme.id}
                    onClick={() => handleSelect(theme)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {activeTheme && (
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-lg border bg-card p-6">
              <ThemeDetailsPanel theme={activeTheme} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
