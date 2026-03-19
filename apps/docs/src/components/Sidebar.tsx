"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  components,
  ALL_CATEGORIES,
  CATEGORY_LABELS,
  type ComponentCategory,
} from "@/lib/registry";

export function Sidebar() {
  const pathname = usePathname();
  const [search, setSearch] = React.useState("");

  const filtered = search
    ? components.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.description.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  const grouped = ALL_CATEGORIES.reduce(
    (acc, cat) => {
      const items = filtered
        ? filtered.filter((c) => c.category === cat)
        : components.filter((c) => c.category === cat);
      if (items.length > 0) acc[cat] = items;
      return acc;
    },
    {} as Partial<Record<ComponentCategory, typeof components>>
  );

  return (
    <aside className="fixed inset-y-0 left-0 w-64 flex flex-col border-r bg-sidebar z-30">
      <div className="flex h-14 items-center border-b px-4 shrink-0">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">AG</span>
          </div>
          <span>Design System</span>
        </Link>
      </div>

      <div className="px-3 pt-3 shrink-0">
        <div className="relative">
          <svg
            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            placeholder="Search components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6 pt-2">
        <div className="mb-2">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              pathname === "/"
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Overview
          </Link>
          <Link
            href="/tokens"
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              pathname === "/tokens"
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Design Tokens
          </Link>
        </div>

        {ALL_CATEGORIES.map((cat) => {
          const items = grouped[cat];
          if (!items || items.length === 0) return null;
          return (
            <div key={cat} className="mt-4">
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {CATEGORY_LABELS[cat]}
              </div>
              <div className="mt-1 space-y-0.5">
                {items.map((component) => {
                  const href = `/components/${component.slug}`;
                  const active = pathname === href;
                  return (
                    <Link
                      key={component.slug}
                      href={href}
                      className={cn(
                        "flex items-center rounded-md px-2 py-1.5 text-sm transition-colors",
                        active
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {component.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
