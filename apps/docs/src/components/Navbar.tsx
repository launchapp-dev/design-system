"use client";

import * as React from "react";
import Link from "next/link";
import { DarkModeToggle } from "./DarkModeToggle";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/docs", label: "Documentation" },
  { href: "/components", label: "Components" },
  { href: "/examples", label: "Examples" },
  { href: "https://github.com/audiogenius/design-system", label: "GitHub" },
] as const;

function AudioGeniusLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
        AG
      </div>
      <span className="hidden sm:inline-block">AudioGenius UI</span>
    </Link>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <AudioGeniusLogo />

        <nav className="hidden md:flex items-center gap-1 ml-4" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <DarkModeToggle />
          <div className="md:hidden">
            <MobileNav links={navLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}
