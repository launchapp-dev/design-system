import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { ScrollArea } from "@/components/ScrollArea";
import { Separator } from "@/components/Separator";
import { cn } from "@/lib/utils";

export interface AppNotification {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  read: boolean;
  avatarSrc?: string;
  avatarInitials?: string;
  type?: "comment" | "mention" | "pr" | "build" | "team" | "billing" | string;
  group?: "today" | "earlier" | "this-week";
}

export interface NotificationCenterProps {
  notifications: AppNotification[];
  onRead?: (id: string) => void;
  onReadAll?: () => void;
  onViewPreferences?: () => void;
  preferencesHref?: string;
  trigger?: React.ReactNode;
  title?: string;
  align?: "start" | "center" | "end";
}

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
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

export interface EmptyNotificationsProps {
  message?: string;
  className?: string;
}

function EmptyNotifications({
  message = "You're all caught up",
  className,
}: EmptyNotificationsProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 px-4 py-10 text-center",
        className,
      )}
      aria-live="polite"
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{ background: "var(--la-color-muted, hsl(var(--muted)))" }}
      >
        <BellIcon />
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

EmptyNotifications.displayName = "EmptyNotifications";

export interface NotificationItemProps {
  notification: AppNotification;
  onRead?: (id: string) => void;
  className?: string;
}

function NotificationItem({ notification, onRead, className }: NotificationItemProps) {
  return (
    <article
      className={cn(
        "group relative flex items-start gap-3 px-4 py-3 transition-colors",
        "hover:bg-accent/50 focus-within:bg-accent/50",
        !notification.read &&
          "bg-[var(--la-color-primary-subtle,color-mix(in_srgb,var(--la-color-primary,hsl(var(--primary)))_6%,transparent))]",
        className,
      )}
    >
      {!notification.read && (
        <span
          className="absolute left-1.5 top-4 h-1.5 w-1.5 rounded-full bg-[var(--la-color-primary,hsl(var(--primary)))]"
          aria-hidden="true"
        />
      )}
      <Avatar size="sm" className="mt-0.5 shrink-0">
        {notification.avatarSrc && <AvatarImage src={notification.avatarSrc} alt="" />}
        <AvatarFallback>
          {notification.avatarInitials ??
            notification.type?.slice(0, 2).toUpperCase() ??
            "N"}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 space-y-0.5">
        <p
          className={cn(
            "text-sm leading-snug text-foreground",
            !notification.read && "font-medium",
          )}
        >
          {notification.title}
        </p>
        {notification.description && (
          <p className="line-clamp-2 text-xs text-muted-foreground">{notification.description}</p>
        )}
        <div className="flex items-center gap-2">
          <time className="text-xs text-muted-foreground" dateTime={notification.timestamp}>
            {notification.timestamp}
          </time>
          {!notification.read && onRead && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRead(notification.id);
              }}
              className="hidden items-center gap-1 rounded px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground group-hover:inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Mark "${notification.title}" as read`}
            >
              <CheckIcon />
              Mark read
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

NotificationItem.displayName = "NotificationItem";

export interface NotificationGroupProps {
  label: string;
  notifications: AppNotification[];
  onRead?: (id: string) => void;
  className?: string;
}

function NotificationGroup({ label, notifications, onRead, className }: NotificationGroupProps) {
  if (notifications.length === 0) return null;

  return (
    <div className={cn("", className)}>
      <div className="sticky top-0 z-10 bg-popover px-4 py-1.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      </div>
      <ul role="list">
        {notifications.map((n) => (
          <li key={n.id}>
            <NotificationItem notification={n} onRead={onRead} />
          </li>
        ))}
      </ul>
    </div>
  );
}

NotificationGroup.displayName = "NotificationGroup";

export interface NotificationListProps {
  notifications: AppNotification[];
  onRead?: (id: string) => void;
  emptyMessage?: string;
  className?: string;
}

function groupNotifications(
  notifications: AppNotification[],
): { label: string; key: string; items: AppNotification[] }[] {
  const today: AppNotification[] = [];
  const earlier: AppNotification[] = [];
  const thisWeek: AppNotification[] = [];

  for (const n of notifications) {
    if (n.group === "today") {
      today.push(n);
    } else if (n.group === "this-week") {
      thisWeek.push(n);
    } else if (n.group === "earlier") {
      earlier.push(n);
    } else {
      today.push(n);
    }
  }

  const groups: { label: string; key: string; items: AppNotification[] }[] = [];
  if (today.length > 0) groups.push({ label: "Today", key: "today", items: today });
  if (thisWeek.length > 0) groups.push({ label: "This Week", key: "this-week", items: thisWeek });
  if (earlier.length > 0) groups.push({ label: "Earlier", key: "earlier", items: earlier });

  return groups;
}

function NotificationList({
  notifications,
  onRead,
  emptyMessage = "You're all caught up",
  className,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return <EmptyNotifications message={emptyMessage} />;
  }

  const groups = groupNotifications(notifications);

  if (groups.length === 1 && groups[0].key === "today") {
    return (
      <ul role="list" className={className}>
        {notifications.map((n) => (
          <li key={n.id}>
            <NotificationItem notification={n} onRead={onRead} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={className}>
      {groups.map((group, idx) => (
        <React.Fragment key={group.key}>
          {idx > 0 && <Separator />}
          <NotificationGroup label={group.label} notifications={group.items} onRead={onRead} />
        </React.Fragment>
      ))}
    </div>
  );
}

NotificationList.displayName = "NotificationList";

const NotificationCenter = ({
  notifications,
  onRead,
  onReadAll,
  onViewPreferences,
  preferencesHref,
  trigger,
  title = "Notifications",
  align = "end",
}: NotificationCenterProps) => {
  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayCount = unreadCount > 99 ? "99+" : unreadCount;

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-9 w-9 rounded-[--la-radius]"
      aria-label={
        unreadCount > 0
          ? `${title} — ${displayCount} unread`
          : title
      }
    >
      <BellIcon />
      {unreadCount > 0 && (
        <Badge
          className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[10px]"
          aria-hidden="true"
        >
          {displayCount}
        </Badge>
      )}
    </Button>
  );

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{trigger ?? defaultTrigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={align}
          sideOffset={8}
          className={cn(
            "z-50 w-[22rem] rounded-[--la-radius-lg] border border-border bg-popover p-0 shadow-lg outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
            "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
          )}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-foreground">{title}</h2>
              {unreadCount > 0 && (
                <Badge
                  variant="secondary"
                  className="rounded-full px-2 py-0.5 text-xs"
                >
                  {displayCount} new
                </Badge>
              )}
            </div>
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
          <Separator />
          <ScrollArea className="max-h-[22rem]">
            <NotificationList notifications={notifications} onRead={onRead} />
          </ScrollArea>
          {(preferencesHref || onViewPreferences) && (
            <>
              <Separator />
              <div className="px-4 py-2">
                {preferencesHref ? (
                  <a
                    href={preferencesHref}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:underline"
                  >
                    <SettingsIcon />
                    Notification preferences
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onViewPreferences}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:underline"
                  >
                    <SettingsIcon />
                    Notification preferences
                  </button>
                )}
              </div>
            </>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

NotificationCenter.displayName = "NotificationCenter";

export {
  NotificationCenter,
  NotificationList,
  NotificationItem,
  NotificationGroup,
  EmptyNotifications,
};
