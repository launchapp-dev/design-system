"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Separator } from "@/components/Separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/Avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/Sheet";
import { ScrollArea } from "@/components/ScrollArea";
import { Badge } from "@/components/Badge";

// ── Icons ─────────────────────────────────────────────────────────────────────

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AppShellNavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  badge?: string | number;
  disabled?: boolean;
  children?: AppShellNavItem[];
}

export interface AppShellNavSection {
  title?: string;
  items: AppShellNavItem[];
}

export interface AppShellHeaderAction {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  badge?: string | number;
  disabled?: boolean;
}

export interface AppShellUser {
  name: string;
  email?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  menuItems?: Array<{
    label: string;
    onClick?: () => void;
    destructive?: boolean;
  }>;
}

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Navigation sections rendered in the sidebar */
  navSections?: AppShellNavSection[];
  /** Logo / brand element shown at the top of the sidebar */
  logo?: React.ReactNode;
  /** Collapsed logo shown when sidebar is minimized */
  logoCollapsed?: React.ReactNode;
  /** User object rendered in the sidebar footer */
  user?: AppShellUser;
  /** Actions rendered in the top header bar */
  headerActions?: AppShellHeaderAction[];
  /** Custom header content */
  header?: React.ReactNode;
  /** Sidebar collapsed state */
  sidebarCollapsed?: boolean;
  /** Controlled sidebar open state (mobile drawer) */
  mobileOpen?: boolean;
  /** Called when mobile drawer open state should change */
  onMobileOpenChange?: (open: boolean) => void;
  /** Sidebar width when expanded */
  sidebarWidth?: number;
  /** Sidebar width when collapsed */
  sidebarCollapsedWidth?: number;
  /** Whether sidebar is collapsible */
  collapsible?: boolean;
  /** Content area */
  children?: React.ReactNode;
}

// ── Sidebar nav item ───────────────────────────────────────────────────────────

interface SidebarNavItemProps {
  item: AppShellNavItem;
  collapsed: boolean;
}

const SidebarNavItem = ({ item, collapsed }: SidebarNavItemProps) => {
  const [open, setOpen] = React.useState(false);

  const itemClass = cn(
    "flex w-full items-center gap-3 rounded-[--la-radius] px-3 py-2 text-sm font-medium transition-colors",
    "text-[hsl(var(--la-foreground))]",
    "hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-1",
    item.isActive && "bg-[hsl(var(--la-accent))] text-[hsl(var(--la-accent-foreground))]",
    item.disabled && "pointer-events-none opacity-50",
    collapsed && "justify-center px-2"
  );

  if (item.children && item.children.length > 0) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className={cn(collapsed && "relative")}>
          <CollapsibleTrigger asChild>
            <button className={itemClass} type="button">
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge != null && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronDownIcon />
                </>
              )}
            </button>
          </CollapsibleTrigger>
          {!collapsed && (
            <CollapsibleContent>
              <div className="ml-4 mt-1 space-y-1 border-l border-border pl-2">
                {item.children.map((child) => (
                  <SidebarNavItem key={child.label} item={child} collapsed={false} />
                ))}
              </div>
            </CollapsibleContent>
          )}
        </div>
      </Collapsible>
    );
  }

  if (item.href) {
    return (
      <a href={item.href} className={itemClass}>
        {item.icon && <span className="shrink-0">{item.icon}</span>}
        {!collapsed && (
          <>
            <span className="flex-1">{item.label}</span>
            {item.badge != null && (
              <Badge variant="secondary" className="ml-auto text-xs">
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </a>
    );
  }

  return (
    <button className={itemClass} type="button" disabled={item.disabled}>
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      {!collapsed && (
        <>
          <span className="flex-1">{item.label}</span>
          {item.badge != null && (
            <Badge variant="secondary" className="ml-auto text-xs">
              {item.badge}
            </Badge>
          )}
        </>
      )}
    </button>
  );
};

// ── Sidebar ───────────────────────────────────────────────────────────────────

interface AppShellSidebarProps {
  navSections?: AppShellNavSection[];
  logo?: React.ReactNode;
  logoCollapsed?: React.ReactNode;
  user?: AppShellUser;
  collapsed: boolean;
  sidebarWidth: number;
  sidebarCollapsedWidth: number;
  collapsible: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  mobile?: boolean;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
}

const AppShellSidebar = React.forwardRef<HTMLDivElement, AppShellSidebarProps>(
  (
    {
      navSections,
      logo,
      logoCollapsed,
      sidebarCollapsedWidth,
      sidebarWidth,
      user,
      collapsed,
      collapsible,
      onCollapsedChange,
      mobile,
      mobileOpen,
      onMobileOpenChange,
    },
    ref
  ) => {
    const sidebarContent = (
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div
          className={cn(
            "flex h-14 items-center border-b border-border px-4",
            collapsed && mobile ? "justify-center px-2" : "gap-3"
          )}
        >
          {!collapsed ? (
            logo || <span className="font-semibold text-lg">App</span>
          ) : (
            logoCollapsed || logo || <span className="font-semibold text-lg">A</span>
          )}
        </div>

        {/* Nav */}
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-4">
            {navSections?.map((section, sIdx) => (
              <div key={section.title || sIdx}>
                {section.title && !collapsed && (
                  <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--la-muted-foreground))]">
                    {section.title}
                  </p>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <SidebarNavItem key={item.label} item={item} collapsed={collapsed} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* User footer */}
        {user && (
          <div className="border-t border-border p-3">
            {user.menuItems ? (
              <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
                <Avatar className="h-8 w-8 shrink-0">
                  {user.avatarSrc && <AvatarImage src={user.avatarSrc} alt={user.name} />}
                  <AvatarFallback>{user.avatarFallback || user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    {user.email && (
                      <p className="truncate text-xs text-[hsl(var(--la-muted-foreground))]">
                        {user.email}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
                <Avatar className="h-8 w-8 shrink-0">
                  {user.avatarSrc && <AvatarImage src={user.avatarSrc} alt={user.name} />}
                  <AvatarFallback>{user.avatarFallback || user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    {user.email && (
                      <p className="truncate text-xs text-[hsl(var(--la-muted-foreground))]">
                        {user.email}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );

    if (mobile) {
      return (
        <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
          <SheetContent side="left" className="w-full p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="h-full w-full">{sidebarContent}</div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <aside
        ref={ref}
        className={cn(
          "hidden md:flex h-full flex-col border-r border-border bg-card transition-all duration-200",
          collapsed ? `w-[${sidebarCollapsedWidth || 64}px]` : `w-[${sidebarWidth}px]`
        )}
        style={{
          width: collapsed ? (sidebarCollapsedWidth || 64) : sidebarWidth,
        }}
      >
        {sidebarContent}
        {collapsible && (
          <div className="absolute right-0 top-20 z-10 translate-x-1/2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full border border-border bg-background shadow-sm"
              onClick={() => onCollapsedChange(!collapsed)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </Button>
          </div>
        )}
      </aside>
    );
  }
);
AppShellSidebar.displayName = "AppShellSidebar";

// ── Main Component ─────────────────────────────────────────────────────────────

const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  (
    {
      navSections,
      logo,
      logoCollapsed,
      user,
      headerActions,
      header,
      sidebarCollapsed: controlledCollapsed,
      mobileOpen: controlledMobileOpen,
      onMobileOpenChange,
      sidebarWidth = 256,
      sidebarCollapsedWidth = 64,
      collapsible = true,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(false);
    const [internalMobileOpen, setInternalMobileOpen] = React.useState(false);

    const isControlled = controlledCollapsed !== undefined;
    const collapsed = isControlled ? controlledCollapsed : uncontrolledCollapsed;

    const isMobileControlled = controlledMobileOpen !== undefined;
    const mobileOpen = isMobileControlled ? controlledMobileOpen : internalMobileOpen;

    const handleCollapsedChange = (next: boolean) => {
      if (!isControlled) setUncontrolledCollapsed(next);
    };

    const handleMobileOpenChange = (next: boolean) => {
      if (!isMobileControlled) setInternalMobileOpen(next);
      onMobileOpenChange?.(next);
    };

    const sidebarWidthPx = collapsed ? (sidebarCollapsedWidth || 64) : sidebarWidth;

    return (
      <div ref={ref} className={cn("flex h-screen overflow-hidden", className)} {...props}>
        {/* Mobile sidebar */}
        <AppShellSidebar
          navSections={navSections}
          logo={logo}
          logoCollapsed={logoCollapsed}
          user={user}
          collapsed={true}
          sidebarWidth={sidebarWidth}
          sidebarCollapsedWidth={sidebarCollapsedWidth}
          collapsible={false}
          onCollapsedChange={handleCollapsedChange}
          mobile
          mobileOpen={mobileOpen}
          onMobileOpenChange={handleMobileOpenChange}
        />

        {/* Desktop sidebar */}
        <AppShellSidebar
          navSections={navSections}
          logo={logo}
          logoCollapsed={logoCollapsed}
          user={user}
          collapsed={collapsed}
          sidebarWidth={sidebarWidth}
          sidebarCollapsedWidth={sidebarCollapsedWidth}
          collapsible={collapsible}
          onCollapsedChange={handleCollapsedChange}
        />

        {/* Main area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
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

            {header ? (
              header
            ) : (
              <div className="flex-1" />
            )}

            {headerActions && headerActions.length > 0 && (
              <div className="flex items-center gap-1">
                {headerActions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    size="icon"
                    onClick={action.onClick}
                    disabled={action.disabled}
                    aria-label={action.label}
                  >
                    {action.icon}
                    {action.badge != null && (
                      <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(var(--la-destructive))] text-[10px] font-bold text-destructive-foreground">
                        {typeof action.badge === "number" && action.badge > 9 ? "9+" : action.badge}
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    );
  }
);
AppShell.displayName = "AppShell";

export { AppShell };
