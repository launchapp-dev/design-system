import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { ScrollArea } from "@/components/ScrollArea";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/DropdownMenu";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/Collapsible";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/Sheet";

export interface CollapsibleNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: string | number;
  disabled?: boolean;
  children?: CollapsibleNavItem[];
}

export interface CollapsibleSidebarUser {
  name: string;
  email: string;
  avatarUrl?: string;
  fallbackInitials?: string;
}

export interface CollapsibleSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CollapsibleNavItem[];
  activeItemId?: string;
  onItemClick?: (item: CollapsibleNavItem) => void;
  onUserMenuAction?: (action: "profile" | "settings" | "logout") => void;
  user?: CollapsibleSidebarUser;
  logo?: React.ReactNode;
  defaultCollapsed?: boolean;
}

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

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

function NavItemRenderer({
  item,
  collapsed,
  activeItemId,
  onItemClick,
  level = 0,
}: {
  item: CollapsibleNavItem;
  collapsed: boolean;
  activeItemId?: string;
  onItemClick?: (item: CollapsibleNavItem) => void;
  level?: number;
}) {
  const [open, setOpen] = React.useState(false);
  const hasSubItems = item.children && item.children.length > 0;
  const isActive = item.id === activeItemId;

  const handleClick = (e: React.MouseEvent) => {
    if (item.href) {
      e.preventDefault();
      onItemClick?.(item);
    } else if (!hasSubItems) {
      onItemClick?.(item);
    }
  };

  if (hasSubItems) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
              collapsed && "justify-center px-2",
              level > 0 && "ml-4",
            )}
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                <span className={cn("shrink-0 transition-transform", open && "rotate-90")}>
                  <ChevronRightIcon />
                </span>
              </>
            )}
          </button>
        </CollapsibleTrigger>
        {!collapsed && (
          <CollapsibleContent className="space-y-1 pt-1">
            {item.children?.map((child) => (
              <NavItemRenderer
                key={child.id}
                item={child}
                collapsed={collapsed}
                activeItemId={activeItemId}
                onItemClick={onItemClick}
                level={level + 1}
              />
            ))}
          </CollapsibleContent>
        )}
      </Collapsible>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={item.disabled}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        collapsed && "justify-center px-2",
        item.disabled && "cursor-not-allowed opacity-50",
        level > 0 && "ml-4",
      )}
    >
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      {!collapsed && (
        <>
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge !== undefined && (
            <Badge variant="secondary" className="h-5 min-w-5 px-1.5 text-xs">
              {item.badge}
            </Badge>
          )}
        </>
      )}
    </button>
  );
}

function CollapsibleSidebar({
  items,
  activeItemId,
  onItemClick,
  onUserMenuAction,
  user,
  logo,
  defaultCollapsed = false,
  className,
  ...props
}: CollapsibleSidebarProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const SidebarContent = ({ forMobile = false }: { forMobile?: boolean }) => (
    <div className={cn("flex flex-col h-full", !forMobile && collapsed ? "w-[72px]" : "w-64")}>
      <div className="flex h-14 items-center px-4 border-b border-border">
        {!collapsed || forMobile ? (
          <div className="flex items-center gap-2 overflow-hidden">
            {logo || <span className="font-semibold text-lg">Dashboard</span>}
          </div>
        ) : (
          <div className="w-full flex justify-center">
            {logo || <span className="font-bold text-xl">D</span>}
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {items.map((item) => (
            <NavItemRenderer
              key={item.id}
              item={item}
              collapsed={collapsed || forMobile}
              activeItemId={activeItemId}
              onItemClick={onItemClick}
            />
          ))}
        </nav>
      </ScrollArea>

      {!collapsed || forMobile ? (
        <div className="p-3 border-t border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Avatar size="sm">
                  {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                  <AvatarFallback>
                    {user?.fallbackInitials || user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left overflow-hidden">
                  <p className="text-sm font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => onUserMenuAction?.("profile")}>
                <UserIcon />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUserMenuAction?.("settings")}>
                <SettingsIcon />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onUserMenuAction?.("logout")}>
                <LogoutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className={cn("flex h-screen", className)} {...props}>
      <aside className="hidden lg:flex h-screen flex-shrink-0 flex-col border-r border-border bg-background transition-all duration-300">
        <SidebarContent />
        {!collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="absolute top-1/2 -right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-muted"
            aria-label="Collapse sidebar"
          >
            <ChevronLeftIcon />
          </button>
        )}
        {collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="absolute top-1/2 -right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-muted"
            aria-label="Expand sidebar"
          >
            <ChevronRightIcon />
          </button>
        )}
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetHeader className="p-4 border-b border-border">
            <SheetTitle>
              {logo || <span className="font-semibold">Dashboard</span>}
            </SheetTitle>
          </SheetHeader>
          <SidebarContent forMobile />
        </SheetContent>
      </Sheet>
    </div>
  );
}

CollapsibleSidebar.displayName = "CollapsibleSidebar";

export { CollapsibleSidebar };
