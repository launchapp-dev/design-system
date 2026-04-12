import type * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/DropdownMenu";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { ScrollArea } from "@/components/ScrollArea";
import { cn } from "@/lib/utils";

export interface AppNotification {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  read: boolean;
  avatarSrc?: string;
  avatarInitials?: string;
  type?: string;
}

export interface NotificationCenterProps {
  notifications: AppNotification[];
  onRead?: (id: string) => void;
  onReadAll?: () => void;
  trigger?: React.ReactNode;
  title?: string;
}

const NotificationCenter = ({
  notifications,
  onRead,
  onReadAll,
  trigger,
  title = "Notifications",
}: NotificationCenterProps) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="sm"
      className="relative h-9 w-9 p-0"
      aria-label={`${title} — ${unreadCount} unread`}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
        />
      </svg>
      {unreadCount > 0 && (
        <Badge
          className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[10px]"
          aria-label={`${unreadCount} unread`}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </Badge>
      )}
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger ?? defaultTrigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-3 py-2">
          <DropdownMenuLabel className="p-0 text-sm font-semibold">
            {title}
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {unreadCount} new
              </Badge>
            )}
          </DropdownMenuLabel>
          {unreadCount > 0 && onReadAll && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReadAll}
              className="h-auto px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
            >
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator className="my-0" />
        <ScrollArea className="max-h-80">
          {notifications.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">No notifications</p>
          ) : (
            <div>
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  onClick={() => !notification.read && onRead?.(notification.id)}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 px-3 py-3 focus:bg-accent",
                    !notification.read && "bg-primary/5",
                  )}
                >
                  <Avatar size="sm" className="mt-0.5 shrink-0">
                    {notification.avatarSrc && <AvatarImage src={notification.avatarSrc} alt="" />}
                    <AvatarFallback>
                      {notification.avatarInitials ??
                        notification.type?.slice(0, 2).toUpperCase() ??
                        "N"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                      <p className={cn("text-sm", !notification.read && "font-semibold")}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span
                          className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary"
                          aria-label="Unread"
                        />
                      )}
                    </div>
                    {notification.description && (
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {notification.description}
                      </p>
                    )}
                    <time
                      className="text-xs text-muted-foreground"
                      dateTime={notification.timestamp}
                    >
                      {notification.timestamp}
                    </time>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
NotificationCenter.displayName = "NotificationCenter";

export { NotificationCenter };
