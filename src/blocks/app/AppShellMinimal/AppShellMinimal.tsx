import type * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/DropdownMenu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/Avatar";

export interface AppShellMinimalUser {
  name: string;
  email: string;
  avatarUrl?: string;
  fallbackInitials?: string;
}

export interface AppShellMinimalNavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface AppShellMinimalProps extends React.HTMLAttributes<HTMLDivElement> {
  navItems?: AppShellMinimalNavItem[];
  activeItemId?: string;
  onItemClick?: (item: AppShellMinimalNavItem) => void;
  user?: AppShellMinimalUser;
  onUserMenuAction?: (action: "profile" | "logout") => void;
  logo?: React.ReactNode;
  children: React.ReactNode;
  topBar?: React.ReactNode;
}

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

function AppShellMinimal({
  navItems = [],
  activeItemId,
  onItemClick,
  user,
  onUserMenuAction,
  logo,
  children,
  topBar,
  className,
  ...props
}: AppShellMinimalProps) {
  return (
    <div className={cn("flex min-h-screen flex-col", className)} {...props}>
      <header className="flex h-14 items-center justify-between border-b border-border bg-background px-6">
        <div className="flex items-center gap-6">
          {logo || <span className="font-semibold text-lg">App</span>}
          {navItems.length > 0 && (
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = item.id === activeItemId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => !item.disabled && onItemClick?.(item)}
                    disabled={item.disabled}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-sm transition-colors",
                      isActive
                        ? "bg-muted text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      item.disabled && "cursor-not-allowed opacity-50",
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3">
          {topBar}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                  <Avatar size="sm">
                    {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                    <AvatarFallback>
                      {user.fallbackInitials || user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onUserMenuAction?.("profile")}>
                  <UserIcon />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onUserMenuAction?.("logout")}>
                  <LogoutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

AppShellMinimal.displayName = "AppShellMinimal";

export { AppShellMinimal };
