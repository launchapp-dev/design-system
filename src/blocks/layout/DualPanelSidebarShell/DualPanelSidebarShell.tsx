"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ScrollArea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { TooltipRoot as Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/Tooltip";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/Sheet";
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

export interface DualPanelNavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  isActive?: boolean;
  badge?: string | number;
  disabled?: boolean;
  onClick?: () => void;
}

export interface DualPanelSidebarShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon-only primary nav (leftmost, narrow) */
  primaryNavItems?: DualPanelNavItem[];
  /** Secondary panel content (wider, contextual) */
  secondaryPanel?: React.ReactNode;
  /** Secondary panel title */
  secondaryPanelTitle?: string;
  /** Whether secondary panel is visible */
  secondaryPanelOpen?: boolean;
  /** Logo shown in the primary sidebar */
  logo?: React.ReactNode;
  /** User info shown at the bottom of primary sidebar */
  user?: {
    name: string;
    email?: string;
    avatarSrc?: string;
    avatarFallback?: string;
  };
  /** Top header content */
  header?: React.ReactNode;
  /** Top header actions */
  headerActions?: React.ReactNode;
  /** Width of the primary (icon) sidebar */
  primaryWidth?: number;
  /** Width of the secondary panel */
  secondaryWidth?: number;
  /** Mobile drawer open state */
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

// ── Primary nav item ──────────────────────────────────────────────────────────

const PrimaryNavItem = ({ item }: { item: DualPanelNavItem }) => {
  const cls = cn(
    "relative flex h-10 w-10 items-center justify-center rounded-[--la-radius] transition-colors",
    "text-[hsl(var(--la-muted-foreground))]",
    "hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-1",
    item.isActive && "bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))] hover:bg-[hsl(var(--la-primary))] hover:text-[hsl(var(--la-primary-foreground))]",
    item.disabled && "pointer-events-none opacity-50",
  );

  const inner = (
    <>
      <span className="shrink-0">{item.icon}</span>
      {item.badge != null && (
        <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(var(--la-destructive))] text-[10px] font-bold text-[hsl(var(--la-destructive-foreground))]">
          {typeof item.badge === "number" && item.badge > 9 ? "9+" : item.badge}
        </span>
      )}
    </>
  );

  const el = item.href ? (
    <a href={item.href} className={cls} aria-current={item.isActive ? "page" : undefined} aria-label={item.label}>
      {inner}
    </a>
  ) : (
    <button type="button" className={cls} disabled={item.disabled} onClick={item.onClick} aria-label={item.label}>
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

const DrawerNavItem = ({ item }: { item: DualPanelNavItem }) => {
  const cls = cn(
    "flex w-full items-center gap-3 rounded-[--la-radius] px-3 py-2.5 text-sm font-medium transition-colors",
    "text-[hsl(var(--la-foreground))]",
    "hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))]",
    item.isActive && "bg-[hsl(var(--la-accent))] text-[hsl(var(--la-accent-foreground))]",
    item.disabled && "pointer-events-none opacity-50",
  );

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

// ── Main Component ────────────────────────────────────────────────────────────

const DualPanelSidebarShell = React.forwardRef<HTMLDivElement, DualPanelSidebarShellProps>(
  (
    {
      primaryNavItems = [],
      secondaryPanel,
      secondaryPanelTitle = "Navigation",
      secondaryPanelOpen = true,
      logo,
      user,
      header,
      headerActions,
      primaryWidth = 64,
      secondaryWidth = 240,
      mobileOpen: controlledOpen,
      onMobileOpenChange,
      children,
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
          {/* Primary icon sidebar (desktop) */}
          <aside
            className="hidden md:flex h-full flex-col items-center border-r border-[hsl(var(--la-border))] bg-[hsl(var(--la-card))] z-20"
            style={{ width: primaryWidth }}
            aria-label="Primary navigation"
          >
            <div className="flex h-14 w-full items-center justify-center border-b border-[hsl(var(--la-border))]">
              {logo || (
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--la-primary))]">
                  <span className="text-xs font-bold text-[hsl(var(--la-primary-foreground))]">A</span>
                </div>
              )}
            </div>
            <ScrollArea className="flex-1 w-full">
              <nav className="flex flex-col items-center gap-1 py-3 px-2" aria-label="App navigation">
                {primaryNavItems.map((item) => (
                  <PrimaryNavItem key={item.label} item={item} />
                ))}
              </nav>
            </ScrollArea>
            {user && (
              <div className="flex w-full items-center justify-center border-t border-[hsl(var(--la-border))] py-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-1" aria-label={user.name}>
                      <Avatar className="h-8 w-8">
                        {user.avatarSrc && <AvatarImage src={user.avatarSrc} alt={user.name} />}
                        <AvatarFallback>{user.avatarFallback || user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="font-medium">{user.name}</p>
                    {user.email && <p className="text-xs text-[hsl(var(--la-muted-foreground))]">{user.email}</p>}
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </aside>

          {/* Secondary panel (desktop) */}
          {secondaryPanelOpen && secondaryPanel && (
            <aside
              className="hidden md:flex h-full flex-col border-r border-[hsl(var(--la-border))] bg-[hsl(var(--la-background))]"
              style={{ width: secondaryWidth }}
              aria-label="Secondary navigation"
            >
              <div className="flex h-14 items-center border-b border-[hsl(var(--la-border))] px-4">
                <span className="text-sm font-semibold text-[hsl(var(--la-foreground))]">{secondaryPanelTitle}</span>
              </div>
              <ScrollArea className="flex-1">
                {secondaryPanel}
              </ScrollArea>
            </aside>
          )}

          {/* Mobile drawer */}
          <Sheet open={mobileOpen} onOpenChange={handleMobileOpenChange}>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="border-b border-[hsl(var(--la-border))] p-4">
                <SheetTitle asChild>
                  <div className="flex items-center gap-2">
                    {logo || <span className="font-semibold">{secondaryPanelTitle}</span>}
                  </div>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 overflow-y-auto p-3" aria-label="Mobile navigation">
                {primaryNavItems.map((item) => (
                  <DrawerNavItem key={item.label} item={item} />
                ))}
              </nav>
              {secondaryPanel && (
                <>
                  <Separator />
                  <div className="overflow-y-auto p-3">{secondaryPanel}</div>
                </>
              )}
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
                      {user.email && <p className="truncate text-xs text-[hsl(var(--la-muted-foreground))]">{user.email}</p>}
                    </div>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>

          {/* Main area */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <header className="flex h-14 items-center gap-4 border-b border-[hsl(var(--la-border))] bg-[hsl(var(--la-background))] px-4">
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
DualPanelSidebarShell.displayName = "DualPanelSidebarShell";

export { DualPanelSidebarShell };
