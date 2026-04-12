import type * as React from "react";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export interface NotificationBellNotification {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  read: boolean;
  avatarSrc?: string;
  avatarInitials?: string;
  type?: string;
}

export interface NotificationBellProps extends React.HTMLAttributes<HTMLButtonElement> {
  notifications: NotificationBellNotification[];
  onRead?: (id: string) => void;
  onReadAll?: () => void;
  badgeCount?: number;
  variant?: "ghost" | "outline" | "default";
  size?: "sm" | "md" | "lg";
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

function NotificationBell({
  notifications,
  onRead,
  onReadAll,
  badgeCount,
  variant = "ghost",
  size = "md",
  className,
  ...props
}: NotificationBellProps) {
  const unreadCount = badgeCount ?? notifications.filter((n) => !n.read).length;

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
    lg: "h-11 w-11",
  };

  const variantClasses = {
    ghost: "hover:bg-accent text-foreground",
    outline:
      "border border-input bg-background hover:bg-accent",
    default:
      "bg-primary text-primary-foreground hover:bg-primary/90",
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "relative rounded-[--la-radius] p-0",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      aria-label={`Notifications — ${unreadCount} unread`}
      {...props}
    >
      <BellIcon />
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
}

NotificationBell.displayName = "NotificationBell";

export { NotificationBell };
