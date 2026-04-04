import type * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/Avatar";
import { Button } from "../../components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/DropdownMenu";
import { cn } from "../../lib/utils";

const SearchIcon = () => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const BellIcon = () => (
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
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
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

const LogOutIcon = () => (
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
    <line x1="21" y1="12" x2="9" y2="12" />
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

export interface TopNavItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

export interface TopNavUser {
  name: string;
  email?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

export interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  items?: TopNavItem[];
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
  notificationCount?: number;
  user?: TopNavUser;
}

function TopNav({
  className,
  logo,
  items = [],
  onSearchClick,
  onNotificationClick,
  notificationCount,
  user,
  ref,
  ...props
}: TopNavProps & { ref?: React.Ref<HTMLElement> }) {
  return (
    <header
      ref={ref}
      className={cn(
        "flex h-14 items-center gap-4 border-b border-[hsl(var(--la-border))] bg-[hsl(var(--la-background))] px-4",
        className,
      )}
      {...props}
    >
      {logo && (
        <div className="flex shrink-0 items-center gap-2 font-semibold text-[hsl(var(--la-foreground))]">
          {logo}
        </div>
      )}

      {items.length > 0 && (
        <nav
          className="hidden flex-1 items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href ?? "#"}
              className={cn(
                "rounded-[--la-radius] px-3 py-1.5 text-sm font-medium transition-colors",
                "hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))]",
                item.isActive
                  ? "text-[hsl(var(--la-foreground))]"
                  : "text-[hsl(var(--la-muted-foreground))]",
              )}
              aria-current={item.isActive ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}

      <div className="ml-auto flex items-center gap-1">
        {onSearchClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onSearchClick}
            aria-label="Search"
          >
            <SearchIcon />
          </Button>
        )}

        {onNotificationClick && (
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={onNotificationClick}
              aria-label={
                notificationCount
                  ? `Notifications (${notificationCount} unread)`
                  : "Notifications"
              }
            >
              <BellIcon />
            </Button>
            {notificationCount && notificationCount > 0 ? (
              <span
                className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[hsl(var(--la-destructive))] px-1 text-[10px] font-bold text-[hsl(var(--la-destructive-foreground))]"
                aria-hidden="true"
              >
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            ) : null}
          </div>
        )}

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open user menu"
                className="rounded-full"
              >
                <Avatar size="sm">
                  <AvatarImage src={user.avatarSrc} alt={user.name} />
                  <AvatarFallback>
                    {user.avatarFallback ?? user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-[hsl(var(--la-foreground))]">
                    {user.name}
                  </span>
                  {user.email && (
                    <span className="truncate text-xs text-[hsl(var(--la-muted-foreground))]">
                      {user.email}
                    </span>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user.onProfileClick && (
                <DropdownMenuItem onClick={user.onProfileClick}>
                  <UserIcon />
                  Profile
                </DropdownMenuItem>
              )}
              {user.onSettingsClick && (
                <DropdownMenuItem onClick={user.onSettingsClick}>
                  <SettingsIcon />
                  Settings
                </DropdownMenuItem>
              )}
              {user.onLogoutClick && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={user.onLogoutClick}
                    className="text-[hsl(var(--la-destructive))] focus:text-[hsl(var(--la-destructive))]"
                  >
                    <LogOutIcon />
                    Log out
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

TopNav.displayName = "TopNav";

export { TopNav };
