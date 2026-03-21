import * as React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../Popover";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const notificationBellVariants = cva("relative inline-flex items-center justify-center", {
  variants: {
    size: {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface NotificationBellProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof notificationBellVariants> {
  count?: number;
  maxCount?: number;
  showBadge?: boolean;
  children: React.ReactNode;
}

const NotificationBell = React.forwardRef<HTMLButtonElement, NotificationBellProps>(
  ({ className, size, count = 0, maxCount = 99, showBadge = true, children, ...props }, ref) => {
    const displayCount = count > maxCount ? `${maxCount}+` : count;

    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            className={cn(
              notificationBellVariants({ size }),
              "rounded-full bg-transparent hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
              className
            )}
            aria-label={`Notifications${count > 0 ? `, ${count} unread` : ""}`}
            {...props}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size === "sm" ? 18 : size === "lg" ? 28 : 22}
              height={size === "sm" ? 18 : size === "lg" ? 28 : 22}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            {showBadge && count > 0 && (
              <span
                className={cn(
                  "absolute -right-1 -top-1 flex min-h-[1.25rem] min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground shadow-sm",
                  size === "sm" && "min-h-[1rem] min-w-[1rem] text-[9px]",
                  size === "lg" && "min-h-[1.5rem] min-w-[1.5rem] text-xs"
                )}
                role="status"
                aria-label={`${count} unread notifications`}
              >
                {displayCount}
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={8}
          className="w-80 p-0"
        >
          {children}
        </PopoverContent>
      </Popover>
    );
  }
);
NotificationBell.displayName = "NotificationBell";

export interface NotificationBellContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  onMarkAllRead?: () => void;
  emptyMessage?: string;
  count?: number;
}

function NotificationBellContent({
  className,
  title = "Notifications",
  onMarkAllRead,
  emptyMessage = "No notifications",
  count,
  children,
  ...props
}: NotificationBellContentProps) {
  const unreadCount = count ?? 0;

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        {unreadCount > 0 && onMarkAllRead && (
          <button
            onClick={onMarkAllRead}
            className="text-xs text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:underline"
          >
            Mark all read
          </button>
        )}
      </div>
      <div className="max-h-72 overflow-y-auto">
        {children || (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}
NotificationBellContent.displayName = "NotificationBellContent";

export interface NotificationBellItemProps extends React.HTMLAttributes<HTMLDivElement> {
  unread?: boolean;
  avatar?: React.ReactNode;
  title: string;
  description?: string;
  timestamp?: string;
  onMarkRead?: () => void;
}

function NotificationBellItem({
  className,
  unread = false,
  avatar,
  title,
  description,
  timestamp,
  children,
  onMarkRead,
  ...props
}: NotificationBellItemProps) {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors hover:bg-accent/50 focus-visible:bg-accent focus-visible:outline-none",
        unread && "bg-primary/5",
        className
      )}
      role="button"
      tabIndex={0}
      onClick={onMarkRead}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onMarkRead?.();
        }
      }}
      {...props}
    >
      {avatar && <div className="shrink-0">{avatar}</div>}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-sm", unread && "font-semibold")}>{title}</p>
          {unread && (
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />
          )}
        </div>
        {description && (
          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{description}</p>
        )}
        {timestamp && (
          <time className="mt-1 block text-xs text-muted-foreground" dateTime={timestamp}>
            {timestamp}
          </time>
        )}
        {children}
      </div>
    </div>
  );
}
NotificationBellItem.displayName = "NotificationBellItem";

export { NotificationBell, NotificationBellContent, NotificationBellItem, notificationBellVariants };
