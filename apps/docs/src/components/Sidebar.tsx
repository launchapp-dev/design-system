"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, CommandInput } from "@launchapp/design-system";
import { cn } from "@/lib/utils";
import {
  components,
  ALL_CATEGORIES,
  CATEGORY_LABELS,
  type ComponentCategory,
} from "@/lib/registry";
import {
  ALL_BLOCK_CATEGORIES,
  BLOCK_CATEGORY_LABELS,
} from "@/lib/blocks-registry";

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function SidebarContent({
  onNavClick,
}: {
  onNavClick?: () => void;
}) {
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
    <>
      <div className="flex h-14 items-center border-b px-4 shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground"
          onClick={onNavClick}
        >
          <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">AG</span>
          </div>
          <span>Design System</span>
        </Link>
      </div>

      <div className="px-3 pt-3 shrink-0">
        <Command shouldFilter={false} className="rounded-md border border-input bg-background">
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
            onClick={onNavClick}
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
            href="/templates"
            onClick={onNavClick}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              pathname === "/templates" || pathname.startsWith("/templates/")
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Templates
          </Link>
          <Link
            href="/tokens"
            onClick={onNavClick}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              pathname === "/tokens"
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Design Tokens
          </Link>
          <Link
            href="/palettes"
            onClick={onNavClick}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              pathname === "/palettes"
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
                  onClick={onNavClick}
                  className={cn(
                    "flex items-center rounded-md px-2 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
                      onClick={onNavClick}
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
    </>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 flex-col border-r bg-sidebar z-30">
        <SidebarContent />
      </aside>

      {/* Mobile: hamburger trigger rendered into the header via portal-like sibling layout */}
      <div className="lg:hidden fixed top-0 left-0 z-40 flex h-14 items-center px-4">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <MenuIcon />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <aside className="relative z-50 flex w-72 flex-col border-r bg-sidebar shadow-xl">
            <div className="absolute top-3 right-3">
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <XIcon />
              </button>
            </div>
            <SidebarContent onNavClick={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
