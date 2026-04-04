"use client";

import { Command, CommandInput } from "@launchapp/design-system";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  ALL_BLOCK_CATEGORIES,
  BLOCK_CATEGORY_LABELS,
} from "@/lib/blocks-registry";
import {
  ALL_CATEGORIES,
  CATEGORY_LABELS,
  type ComponentCategory,
  components,
} from "@/lib/registry";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const [search, setSearch] = React.useState("");

  const filtered = search
    ? components.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.description.toLowerCase().includes(search.toLowerCase()),
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
    {} as Partial<Record<ComponentCategory, typeof components>>,
  );

  return (
    <aside className="fixed inset-y-0 left-0 w-64 flex flex-col border-r bg-sidebar z-30">
      <div className="flex h-14 items-center border-b px-4 shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground"
        >
          <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">
              AG
            </span>
          </div>
          <span>Design System</span>
        </Link>
      </div>

      <div className="px-3 pt-3 shrink-0">
        <Command
          shouldFilter={false}
          className="rounded-md border border-input bg-background"
        >
          <CommandInput
            placeholder="Search components..."
            value={search}
            onValueChange={setSearch}
          />
        </Command>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6 pt-2">
        <div className="mb-2">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              pathname === "/"
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            Overview
          </Link>
          <Link
            href="/templates"
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              pathname === "/templates" || pathname.startsWith("/templates/")
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            Templates
          </Link>
          <Link
            href="/tokens"
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              pathname === "/tokens"
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            Design Tokens
          </Link>
          <Link
            href="/palettes"
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              pathname === "/palettes"
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            Palettes
          </Link>
        </div>

        <div className="mt-4">
          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Blocks
          </div>
          <div className="mt-1 space-y-0.5">
            {ALL_BLOCK_CATEGORIES.map((cat) => {
              const href = `/blocks/${cat}`;
              const active = pathname === href;
              return (
                <Link
                  key={cat}
                  href={href}
                  className={cn(
                    "flex items-center rounded-md px-2 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {BLOCK_CATEGORY_LABELS[cat]}
                </Link>
              );
            })}
          </div>
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
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
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
