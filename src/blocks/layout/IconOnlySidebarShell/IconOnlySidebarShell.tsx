"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TooltipRoot as Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/Tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { ScrollArea } from "@/components/ScrollArea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/Sheet";
import { Button } from "@/components/Button";
import { Separator } from "@/components/Separator";

// ── Icons ─────────────────────────────────────────────────────────────────────

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────

export interface IconOnlyNavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  isActive?: boolean;
  badge?: string | number;
  disabled?: boolean;
  onClick?: () => void;
}

export interface IconOnlyNavSection {
  title?: string;
  items: IconOnlyNavItem[];
}

export interface IconOnlySidebarShellProps extends React.HTMLAttributes<HTMLDivElement> {
  navSections?: IconOnlyNavSection[];
  logo?: React.ReactNode;
  user?: {
    name: string;
    email?: string;
    avatarSrc?: string;
    avatarFallback?: string;
  };
  header?: React.ReactNode;
  headerActions?: React.ReactNode;
  sidebarWidth?: number;
  children?: React.ReactNode;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
}

// ── Nav item with tooltip ─────────────────────────────────────────────────────

const IconNavItem = ({ item }: { item: IconOnlyNavItem }) => {
  const base = cn(
    "relative flex h-10 w-10 items-center justify-center rounded-[--la-radius] transition-colors",
    "text-muted-foreground",
    "hover:bg-accent hover:text-accent-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
    item.isActive && "bg-accent text-accent-foreground",
    item.disabled && "pointer-events-none opacity-50",
  );

  const inner = (
    <>
      <span className="shrink-0">{item.icon}</span>
      {item.badge != null && (
        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
          {typeof item.badge === "number" && item.badge > 9 ? "9+" : item.badge}
        </span>
      )}
    </>
  );

  const el = item.href ? (
    <a href={item.href} className={base} aria-current={item.isActive ? "page" : undefined} aria-label={item.label}>
      {inner}
    </a>
  ) : (
    <button type="button" className={base} disabled={item.disabled} onClick={item.onClick} aria-label={item.label}>
      {inner}
    </button>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>{el}</TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
};

// ── Mobile drawer nav item ────────────────────────────────────────────────────

const DrawerNavItem = ({ item }: { item: IconOnlyNavItem }) => {
  const cls = cn(
    "flex w-full items-center gap-3 rounded-[--la-radius] px-3 py-2.5 text-sm font-medium transition-colors",
    "text-foreground",
    "hover:bg-accent hover:text-accent-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    item.isActive && "bg-accent text-accent-foreground",
    item.disabled && "pointer-events-none opacity-50",
  );

  if (item.href) {
    return (
      <a href={item.href} className={cls} aria-current={item.isActive ? "page" : undefined}>
        {item.icon && <span className="shrink-0">{item.icon}</span>}
        <span className="flex-1 truncate">{item.label}</span>
        {item.badge != null && (
          <Badge variant="secondary" className="ml-auto text-xs">{item.badge}</Badge>
        )}
      </a>
    );
  }
  return (
    <button type="button" className={cls} disabled={item.disabled} onClick={item.onClick}>
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      <span className="flex-1 truncate text-left">{item.label}</span>
      {item.badge != null && (
        <Badge variant="secondary" className="ml-auto text-xs">{item.badge}</Badge>
      )}
    </button>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const IconOnlySidebarShell = React.forwardRef<HTMLDivElement, IconOnlySidebarShellProps>(
  (
    {
      navSections = [],
      logo,
      user,
      header,
      headerActions,
      sidebarWidth = 64,
      children,
      mobileOpen: controlledOpen,
      onMobileOpenChange,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isControlled = controlledOpen !== undefined;
    const mobileOpen = isControlled ? controlledOpen : internalOpen;

    const handleMobileOpenChange = (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onMobileOpenChange?.(next);
    };

    return (
      <TooltipProvider delayDuration={0}>
        <div ref={ref} className={cn("flex h-screen overflow-hidden", className)} {...props}>
          {/* Icon-only sidebar (desktop) */}
          <aside
            className="hidden md:flex h-full flex-col items-center border-r border-border bg-card"
            style={{ width: sidebarWidth }}
            aria-label="Primary navigation"
          >
            {/* Logo */}
            <div className="flex h-14 w-full items-center justify-center border-b border-border">
              {logo || (
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                  <span className="text-xs font-bold text-primary-foreground">A</span>
                </div>
              )}
            </div>

            {/* Nav */}
            <ScrollArea className="flex-1 w-full">
              <nav className="flex flex-col items-center gap-1 py-3 px-2" aria-label="Main navigation">
                {navSections.map((section, sIdx) => (
                  <React.Fragment key={section.title || sIdx}>
                    {sIdx > 0 && <Separator className="my-1 w-8" />}
                    {section.items.map((item) => (
                      <IconNavItem key={item.label} item={item} />
                    ))}
                  </React.Fragment>
                ))}
              </nav>
            </ScrollArea>

            {/* User avatar */}
            {user && (
              <div className="flex w-full items-center justify-center border-t border-border py-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1" aria-label={user.name}>
                      <Avatar className="h-8 w-8">
                        {user.avatarSrc && <AvatarImage src={user.avatarSrc} alt={user.name} />}
                        <AvatarFallback>{user.avatarFallback || user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="font-medium">{user.name}</p>
                    {user.email && <p className="text-xs text-muted-foreground">{user.email}</p>}
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </aside>

          {/* Mobile drawer */}
          <Sheet open={mobileOpen} onOpenChange={handleMobileOpenChange}>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="border-b border-border p-4">
                <SheetTitle asChild>
                  <div className="flex items-center gap-2">
                    {logo || <span className="font-semibold">Navigation</span>}
                  </div>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 overflow-y-auto p-3" aria-label="Mobile navigation">
                {navSections.map((section, sIdx) => (
                  <div key={section.title || sIdx}>
                    {section.title && (
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {section.title}
                      </p>
                    )}
                    {section.items.map((item) => (
                      <DrawerNavItem key={item.label} item={item} />
                    ))}
                    {sIdx < navSections.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </nav>
              {user && (
                <>
                  <Separator />
                  <div className="flex items-center gap-3 p-4">
                    <Avatar className="h-8 w-8">
                      {user.avatarSrc && <AvatarImage src={user.avatarSrc} alt={user.name} />}
                      <AvatarFallback>{user.avatarFallback || user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{user.name}</p>
                      {user.email && <p className="truncate text-xs text-muted-foreground">{user.email}</p>}
                    </div>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>

          {/* Main area */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <header className="flex h-14 items-center gap-4 border-b border-border bg-background px-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => handleMobileOpenChange(true)}
                aria-label="Open navigation"
              >
                <MenuIcon />
              </Button>
              {header ? header : <div className="flex-1" />}
              {headerActions && <div className="flex items-center gap-1">{headerActions}</div>}
            </header>
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>
      </TooltipProvider>
    );
  },
);
IconOnlySidebarShell.displayName = "IconOnlySidebarShell";

export { IconOnlySidebarShell };
