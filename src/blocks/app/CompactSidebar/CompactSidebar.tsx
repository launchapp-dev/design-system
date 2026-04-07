import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/Avatar";
import { TooltipRoot, TooltipContent, TooltipTrigger } from "@/components/Tooltip";
import { ScrollArea } from "@/components/ScrollArea";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/DropdownMenu";

export interface CompactNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface CompactSidebarUser {
  name: string;
  email: string;
  avatarUrl?: string;
  fallbackInitials?: string;
}

export interface CompactSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CompactNavItem[];
  activeItemId?: string;
  onItemClick?: (item: CompactNavItem) => void;
  onUserMenuAction?: (action: "profile" | "settings" | "logout") => void;
  user?: CompactSidebarUser;
  logo?: React.ReactNode;
}

const _HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

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

function CompactSidebar({
  items,
  activeItemId,
  onItemClick,
  onUserMenuAction,
  user,
  logo,
  className,
  ...props
}: CompactSidebarProps) {
  return (
    <div
      className={cn(
        "flex h-screen w-[72px] flex-shrink-0 flex-col border-r border-border bg-background",
        className,
      )}
      {...props}
    >
      <div className="flex h-14 items-center justify-center border-b border-border">
        {logo || <span className="font-bold text-xl">D</span>}
      </div>

      <ScrollArea className="flex-1 py-3">
        <nav className="flex flex-col items-center gap-1 px-2">
          {items.map((item) => {
            const isActive = item.id === activeItemId;
            const button = (
              <button
                key={item.id}
                type="button"
                onClick={() => !item.disabled && onItemClick?.(item)}
                disabled={item.disabled}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  item.disabled && "cursor-not-allowed opacity-50",
                )}
              >
                {item.icon || <span className="text-xs font-medium">{item.label.charAt(0)}</span>}
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                    {typeof item.badge === "number" && item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </button>
            );

            if (!isActive) {
              return (
                <TooltipRoot key={item.id} delayDuration={0}>
                  <TooltipTrigger asChild>{button}</TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    {item.label}
                  </TooltipContent>
                </TooltipRoot>
              );
            }
            return <React.Fragment key={item.id}>{button}</React.Fragment>;
          })}
        </nav>
      </ScrollArea>

      <div className="border-t border-border p-2">
        <TooltipRoot delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => onItemClick?.({ id: "settings", label: "Settings" } as CompactNavItem)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Settings"
            >
              <SettingsIcon />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="ml-2">
            Settings
          </TooltipContent>
        </TooltipRoot>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="User menu"
              >
                <Avatar size="sm">
                  {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                  <AvatarFallback>
                    {user.fallbackInitials || user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
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
        )}
      </div>
    </div>
  );
}

CompactSidebar.displayName = "CompactSidebar";

export { CompactSidebar };
