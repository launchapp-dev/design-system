import * as React from "react";
import { cva, } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/Avatar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/Collapsible";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/Sheet";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem as BreadcrumbItemPrimitive,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/Breadcrumb";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/DropdownMenu";
import { NotificationBell, type NotificationItem } from "@/components/NotificationBell";
import { ScrollArea } from "@/components/ScrollArea";

const sidebarVariants = cva(
  "fixed inset-y-0 left-0 z-40 flex flex-col bg-background border-r border-border transition-all duration-300 ease-in-out",
  {
    variants: {
      collapsed: {
        true: "w-[72px]",
        false: "w-64",
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
);

export interface DashboardNavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  items?: DashboardNavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  fallbackInitials?: string;
}

export interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebarCollapsed?: boolean;
  onSidebarCollapse?: (collapsed: boolean) => void;
  navigation: DashboardNavItem[];
  breadcrumbs?: BreadcrumbItem[];
  user: UserProfile;
  notifications?: NotificationItem[];
  onNotificationRead?: (id: string) => void;
  onNotificationReadAll?: () => void;
  onNavigate?: (href: string) => void;
  onUserMenuAction?: (action: "profile" | "settings" | "billing" | "logout") => void;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
  logo?: React.ReactNode;
  logoCollapsed?: React.ReactNode;
}

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
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
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CreditCardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

function DashboardNavItemRenderer({
  item,
  collapsed,
  onNavigate,
  level = 0,
}: {
  item: DashboardNavItem;
  collapsed: boolean;
  onNavigate?: (href: string) => void;
  level?: number;
}) {
  const [open, setOpen] = React.useState(false);
  const hasSubItems = item.items && item.items.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    if (item.href && onNavigate) {
      e.preventDefault();
      onNavigate(item.href);
    }
  };

  if (hasSubItems) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-[--la-radius] text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              item.active && "bg-primary text-primary-foreground hover:bg-primary/90",
              collapsed && "justify-center px-2",
              level > 0 && "ml-4"
            )}
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                <span
                  className={cn(
                    "shrink-0 transition-transform",
                    open && "rotate-90"
                  )}
                >
                  <ChevronRightIcon />
                </span>
              </>
            )}
          </button>
        </CollapsibleTrigger>
        {!collapsed && (
          <CollapsibleContent className="space-y-1 pt-1">
            {item.items?.map((subItem) => (
              <DashboardNavItemRenderer
                key={subItem.id}
                item={subItem}
                collapsed={collapsed}
                onNavigate={onNavigate}
                level={level + 1}
              />
            ))}
          </CollapsibleContent>
        )}
      </Collapsible>
    );
  }

  return (
    <a
      href={item.href || "#"}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-[--la-radius] text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        item.active && "bg-primary text-primary-foreground hover:bg-primary/90",
        collapsed && "justify-center px-2"
      )}
    >
      {item.icon ? (
        <span className="shrink-0">{item.icon}</span>
      ) : collapsed ? (
        <span className="shrink-0 w-[18px] h-[18px] flex items-center justify-center text-xs font-medium">
          {item.label.charAt(0).toUpperCase()}
        </span>
      ) : null}
      {!collapsed && <span>{item.label}</span>}
    </a>
  );
}

function MobileNav({
  navigation,
  user,
  logo,
  onNavigate,
  onUserMenuAction,
}: {
  navigation: DashboardNavItem[];
  user: UserProfile;
  logo?: React.ReactNode;
  onNavigate?: (href: string) => void;
  onUserMenuAction?: (action: "profile" | "settings" | "billing" | "logout") => void;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <MenuIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="p-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            {logo || (
              <span className="font-semibold text-lg">Dashboard</span>
            )}
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-[calc(100vh-80px)]">
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <DashboardNavItemRenderer
                  key={item.id}
                  item={item}
                  collapsed={false}
                  onNavigate={onNavigate}
                />
              ))}
            </nav>
          </ScrollArea>
          <div className="p-4 border-t border-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-[--la-radius] hover:bg-accent transition-colors">
                  <Avatar size="sm">
                    {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                    <AvatarFallback>{user.fallbackInitials || user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onUserMenuAction?.("profile")}>
                  <UserIcon />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUserMenuAction?.("settings")}>
                  <SettingsIcon />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUserMenuAction?.("billing")}>
                  <CreditCardIcon />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onUserMenuAction?.("logout")}>
                  <LogoutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DashboardShell({
  sidebarCollapsed = false,
  onSidebarCollapse,
  navigation,
  breadcrumbs,
  user,
  notifications = [],
  onNotificationRead,
  onNotificationReadAll,
  onNavigate,
  onUserMenuAction,
  headerActions,
  children,
  logo,
  logoCollapsed,
  className,
  ref,
  ...props
}: DashboardShellProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [collapsed, setCollapsed] = React.useState(sidebarCollapsed);

  React.useEffect(() => {
    setCollapsed(sidebarCollapsed);
  }, [sidebarCollapsed]);

  const handleCollapse = (newCollapsed: boolean) => {
    setCollapsed(newCollapsed);
    onSidebarCollapse?.(newCollapsed);
  };

  return (
    <div
      ref={ref}
      className={cn("min-h-screen bg-muted", className)}
      {...props}
    >
      {/* Desktop Sidebar */}
      <aside className={cn(sidebarVariants({ collapsed }), "hidden lg:flex")}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-4 border-b border-border">
          {collapsed ? (
            <div className="w-full flex justify-center">
              {logoCollapsed || logo || (
                <span className="font-bold text-xl">D</span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 overflow-hidden">
              {logo || <span className="font-semibold text-lg">Dashboard</span>}
            </div>
          )}
        </div>

        {/* Sidebar Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <DashboardNavItemRenderer
                key={item.id}
                item={item}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            ))}
          </nav>
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-[--la-radius] hover:bg-accent transition-colors",
                  collapsed && "justify-center px-2"
                )}
              >
                <Avatar size="sm">
                  {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                  <AvatarFallback>{user.fallbackInitials || user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56" side={collapsed ? "right" : "top"}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onUserMenuAction?.("profile")}>
                <UserIcon />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUserMenuAction?.("settings")}>
                <SettingsIcon />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUserMenuAction?.("billing")}>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onUserMenuAction?.("logout")}>
                <LogoutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          collapsed ? "lg:ml-[72px]" : "lg:ml-64"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 flex items-center gap-4 px-4 border-b border-border bg-background">
          <div className="flex items-center gap-2">
            <MobileNav
              navigation={navigation}
              user={user}
              logo={logo}
              onNavigate={onNavigate}
              onUserMenuAction={onUserMenuAction}
            />
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => handleCollapse(!collapsed)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </Button>
          </div>

          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItemPrimitive>
                  <BreadcrumbLink
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.("/");
                    }}
                    className="flex items-center gap-1"
                  >
                    <HomeIcon />
                  </BreadcrumbLink>
                </BreadcrumbItemPrimitive>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItemPrimitive>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={crumb.href || "#"}
                          onClick={(e) => {
                            if (crumb.href && onNavigate) {
                              e.preventDefault();
                              onNavigate(crumb.href);
                            }
                          }}
                        >
                          {crumb.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItemPrimitive>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}

          <div className="flex-1" />

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {headerActions}

            {/* Notifications */}
            <NotificationBell
              notifications={notifications}
              onRead={onNotificationRead}
              onReadAll={onNotificationReadAll}
              title="Notifications"
              emptyMessage="No notifications"
            />

            {/* Mobile User Menu */}
            <div className="lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar size="sm">
                      {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                      <AvatarFallback>{user.fallbackInitials || user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onUserMenuAction?.("profile")}>
                    <UserIcon />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUserMenuAction?.("settings")}>
                    <SettingsIcon />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUserMenuAction?.("billing")}>
                    <CreditCardIcon />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onUserMenuAction?.("logout")}>
                    <LogoutIcon />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

DashboardShell.displayName = "DashboardShell";

export { DashboardShell };
