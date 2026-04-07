"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/Sheet";
import { Button } from "@/components/Button";
import { ScrollArea } from "@/components/ScrollArea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Separator } from "@/components/Separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible";

// ── Icons ─────────────────────────────────────────────────────────────────────

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────

export interface MobileNavDrawerShellNavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  badge?: string | number;
  disabled?: boolean;
  onClick?: () => void;
  children?: MobileNavDrawerShellNavItem[];
}

export interface MobileNavDrawerShellNavSection {
  title?: string;
  items: MobileNavDrawerShellNavItem[];
}

export interface MobileNavDrawerShellProps extends React.HTMLAttributes<HTMLDivElement> {
  navSections?: MobileNavDrawerShellNavSection[];
  logo?: React.ReactNode;
  /** Custom top-bar content (rendered beside the hamburger) */
  topBar?: React.ReactNode;
  /** Actions rendered in the top bar (right side) */
  topBarActions?: React.ReactNode;
  user?: {
    name: string;
    email?: string;
    avatarSrc?: string;
    avatarFallback?: string;
  };
  /** Controlled open state of the drawer */
  drawerOpen?: boolean;
  onDrawerOpenChange?: (open: boolean) => void;
  /** Drawer slide-in side */
  drawerSide?: "left" | "right";
  children?: React.ReactNode;
}

// ── Recursive nav item ────────────────────────────────────────────────────────

const DrawerNavItem = ({ item, depth = 0 }: { item: MobileNavDrawerShellNavItem; depth?: number }) => {
  const [open, setOpen] = React.useState(false);

  const cls = cn(
    "flex w-full items-center gap-3 rounded-[--la-radius] py-2.5 text-sm font-medium transition-colors",
    "text-[hsl(var(--la-foreground))]",
    "hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))]",
    item.isActive && "bg-[hsl(var(--la-accent))] text-[hsl(var(--la-accent-foreground))]",
    item.disabled && "pointer-events-none opacity-50",
    depth === 0 ? "px-3" : "pl-8 pr-3",
  );

  if (item.children && item.children.length > 0) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button type="button" className={cls}>
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span className="flex-1 truncate text-left">{item.label}</span>
            {item.badge != null && (
              <Badge variant="secondary" className="ml-auto mr-1 text-xs">{item.badge}</Badge>
            )}
            <span className={cn("shrink-0 transition-transform duration-200", open && "rotate-180")}>
              <ChevronDownIcon />
            </span>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-1 flex flex-col gap-0.5">
            {item.children.map((child) => (
              <DrawerNavItem key={child.label} item={child} depth={depth + 1} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  if (item.href) {
    return (
      <a href={item.href} className={cls} aria-current={item.isActive ? "page" : undefined}>
        {item.icon && <span className="shrink-0">{item.icon}</span>}
        <span className="flex-1 truncate">{item.label}</span>
        {item.badge != null && <Badge variant="secondary" className="ml-auto text-xs">{item.badge}</Badge>}
      </a>
    );
  }

  return (
    <button type="button" className={cls} disabled={item.disabled} onClick={item.onClick}>
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      <span className="flex-1 truncate text-left">{item.label}</span>
      {item.badge != null && <Badge variant="secondary" className="ml-auto text-xs">{item.badge}</Badge>}
    </button>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const MobileNavDrawerShell = React.forwardRef<HTMLDivElement, MobileNavDrawerShellProps>(
  (
    {
      navSections = [],
      logo,
      topBar,
      topBarActions,
      user,
      drawerOpen: controlledOpen,
      onDrawerOpenChange,
      drawerSide = "left",
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const handleOpenChange = (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onDrawerOpenChange?.(next);
    };

    return (
      <div ref={ref} className={cn("flex h-screen flex-col overflow-hidden", className)} {...props}>
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[hsl(var(--la-border))] bg-[hsl(var(--la-background))] px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleOpenChange(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
          >
            <MenuIcon />
          </Button>

          {logo && (
            <div className="flex items-center">
              {logo}
            </div>
          )}

          {topBar ? (
            <div className="flex flex-1 items-center">{topBar}</div>
          ) : (
            <div className="flex-1" />
          )}

          {topBarActions && (
            <div className="flex items-center gap-1">{topBarActions}</div>
          )}
        </header>

        {/* Drawer */}
        <Sheet open={open} onOpenChange={handleOpenChange}>
          <SheetContent
            id="mobile-nav-drawer"
            side={drawerSide}
            className="flex w-[280px] flex-col p-0 sm:max-w-[300px]"
          >
            <SheetHeader className="border-b border-[hsl(var(--la-border))] p-4">
              <SheetTitle asChild>
                <div className="flex items-center gap-2">
                  {logo || <span className="text-base font-semibold">Navigation</span>}
                </div>
              </SheetTitle>
            </SheetHeader>

            <ScrollArea className="flex-1">
              <nav className="flex flex-col gap-1 p-3" aria-label="Main navigation">
                {navSections.map((section, idx) => (
                  <div key={section.title || idx} className="flex flex-col gap-0.5">
                    {section.title && (
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--la-muted-foreground))]">
                        {section.title}
                      </p>
                    )}
                    {section.items.map((item) => (
                      <DrawerNavItem key={item.label} item={item} />
                    ))}
                    {idx < navSections.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </nav>
            </ScrollArea>

            {user && (
              <>
                <Separator />
                <div className="flex items-center gap-3 p-4">
                  <Avatar className="h-8 w-8 shrink-0">
                    {user.avatarSrc && <AvatarImage src={user.avatarSrc} alt={user.name} />}
                    <AvatarFallback>{user.avatarFallback || user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    {user.email && (
                      <p className="truncate text-xs text-[hsl(var(--la-muted-foreground))]">{user.email}</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>

        {/* Page content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    );
  },
);
MobileNavDrawerShell.displayName = "MobileNavDrawerShell";

export { MobileNavDrawerShell };
