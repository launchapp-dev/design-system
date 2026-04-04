import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../Button";
import { ScrollArea } from "../ScrollArea";
import { Separator } from "../Separator";

const notificationBellVariants = cva(
  "relative inline-flex items-center justify-center rounded-[--la-radius] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-11 w-11",
      },
      variant: {
        default:
          "bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))] hover:bg-[hsl(var(--la-primary)/0.9)]",
        outline:
          "border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
        ghost:
          "hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "ghost",
    },
  },
);

const badgeVariants = cva(
  "absolute flex items-center justify-center rounded-full bg-[hsl(var(--la-destructive))] text-[hsl(var(--la-destructive-foreground))] font-bold pointer-events-none",
  {
    variants: {
      size: {
        sm: "-right-0.5 -top-0.5 h-4 min-w-4 px-1 text-[9px]",
        md: "-right-0.5 -top-0.5 h-4 min-w-4 px-1 text-[10px]",
        lg: "-right-1 -top-1 h-5 min-w-5 px-1.5 text-[10px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  read: boolean;
}

export interface NotificationBellProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>,
      "children"
    >,
    VariantProps<typeof notificationBellVariants> {
  notifications: NotificationItem[];
  onRead?: (id: string) => void;
  onReadAll?: () => void;
  className?: string;
  contentClassName?: string;
  title?: string;
  emptyMessage?: string;
  maxVisible?: number;
}

const BellIcon = () => (
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

const NotificationBell = React.forwardRef<
  HTMLButtonElement,
  NotificationBellProps
>(
  (
    {
      notifications,
      onRead,
      onReadAll,
      className,
      contentClassName,
      size,
      variant,
      title = "Notifications",
      emptyMessage = "No notifications",
      maxVisible = 10,
      open,
      onOpenChange,
      defaultOpen,
    },
    ref,
  ) => {
    const unreadCount = notifications.filter((n) => !n.read).length;
    const displayCount = unreadCount > 99 ? "99+" : unreadCount;

    return (
      <PopoverPrimitive.Root
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
      >
        <PopoverPrimitive.Trigger asChild>
          <button
            ref={ref}
            className={cn(
              notificationBellVariants({ size, variant, className }),
            )}
            aria-label={
              unreadCount > 0 ? `${title} (${unreadCount} unread)` : title
            }
            type="button"
          >
            <BellIcon />
            {unreadCount > 0 && (
              <span className={cn(badgeVariants({ size }))} aria-hidden="true">
                {displayCount}
              </span>
            )}
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            className={cn(
              "z-50 w-80 rounded-lg border border-[hsl(var(--la-border))] bg-[hsl(var(--la-popover))] p-0 text-[hsl(var(--la-popover-foreground))] shadow-lg outline-none",
              "data-[state=open]:animate-scale-in data-[state=closed]:animate-fade-out",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              contentClassName,
            )}
            align="end"
            sideOffset={8}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-[hsl(var(--la-foreground))]">
                  {title}
                </h2>
                {unreadCount > 0 && (
                  <span className="inline-flex items-center rounded-full bg-[hsl(var(--la-primary))] px-2 py-0.5 text-xs font-medium text-[hsl(var(--la-primary-foreground))]">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && onReadAll && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onReadAll}
                  className="h-auto px-2 py-1 text-xs text-[hsl(var(--la-muted-foreground))] hover:text-[hsl(var(--la-foreground))]"
                >
                  Mark all read
                </Button>
              )}
            </div>
            <Separator />
            <ScrollArea className="max-h-80">
              {notifications.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-[hsl(var(--la-muted-foreground))]">
                  {emptyMessage}
                </p>
              ) : (
                <ul className="py-1">
                  {notifications.slice(0, maxVisible).map((notification) => (
                    <li key={notification.id}>
                      <article
                        className={cn(
                          "flex items-start gap-3 px-4 py-3 transition-colors",
                          "focus-within:bg-[hsl(var(--la-accent))]",
                          !notification.read &&
                            "bg-[hsl(var(--la-primary)/0.05)]",
                        )}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={cn(
                                "text-sm text-[hsl(var(--la-foreground))]",
                                !notification.read && "font-semibold",
                              )}
                            >
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span
                                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[hsl(var(--la-primary))]"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          {notification.description && (
                            <p className="mt-0.5 line-clamp-2 text-xs text-[hsl(var(--la-muted-foreground))]">
                              {notification.description}
                            </p>
                          )}
                          <div className="mt-1.5 flex items-center gap-2">
                            <time
                              className="text-xs text-[hsl(var(--la-muted-foreground))]"
                              dateTime={notification.timestamp}
                            >
                              {notification.timestamp}
                            </time>
                            {!notification.read && onRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onRead(notification.id)}
                                className="h-auto gap-1 px-1.5 py-0.5 text-xs text-[hsl(var(--la-muted-foreground))] hover:text-[hsl(var(--la-foreground))]"
                              >
                                <CheckIcon />
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              )}
            </ScrollArea>
            {notifications.length > maxVisible && (
              <>
                <Separator />
                <div className="px-4 py-2 text-center text-xs text-[hsl(var(--la-muted-foreground))]">
                  {notifications.length - maxVisible} more notifications
                </div>
              </>
            )}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);

NotificationBell.displayName = "NotificationBell";

export type NotificationBellVariants = VariantProps<
  typeof notificationBellVariants
>;
export type BadgeVariants = VariantProps<typeof badgeVariants>;

export { NotificationBell, notificationBellVariants };
