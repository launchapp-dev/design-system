import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { ScrollArea } from "@/components/ScrollArea";
import { Separator } from "@/components/Separator";
import { cn } from "@/lib/utils";

export interface InboxItem {
  id: string;
  sender: string;
  senderInitials?: string;
  senderAvatarSrc?: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
}

export interface InboxViewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items: InboxItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onMarkRead?: (id: string) => void;
  title?: string;
  maxHeight?: number | string;
}

const InboxView = React.forwardRef<HTMLDivElement, InboxViewProps>(
  (
    {
      items,
      selectedId,
      onSelect,
      onMarkRead,
      title = "Inbox",
      maxHeight = 500,
      className,
      ...props
    },
    ref,
  ) => {
    const unreadCount = items.filter((item) => !item.read).length;

    return (
      <Card ref={ref} className={cn("flex flex-col", className)} {...props}>
        <CardHeader className="border-b pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{title}</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount} unread
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea style={{ maxHeight }}>
            {items.length === 0 ? (
              <p className="px-6 py-12 text-center text-sm text-muted-foreground">
                Your inbox is empty
              </p>
            ) : (
              <ul>
                {items.map((item, index) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelect?.(item.id);
                        if (!item.read) onMarkRead?.(item.id);
                      }}
                      aria-pressed={selectedId === item.id}
                      className={cn(
                        "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                        selectedId === item.id && "bg-muted",
                        !item.read && "bg-primary/5",
                      )}
                    >
                      <Avatar size="sm" className="mt-0.5 shrink-0">
                        {item.senderAvatarSrc && (
                          <AvatarImage
                            src={item.senderAvatarSrc}
                            alt={item.sender}
                          />
                        )}
                        <AvatarFallback>
                          {item.senderInitials ??
                            item.sender.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span
                            className={cn(
                              "truncate text-sm",
                              !item.read
                                ? "font-semibold"
                                : "font-medium text-muted-foreground",
                            )}
                          >
                            {item.sender}
                          </span>
                          <time
                            className="shrink-0 text-xs text-muted-foreground"
                            dateTime={item.date}
                          >
                            {item.date}
                          </time>
                        </div>
                        <p
                          className={cn(
                            "truncate text-sm",
                            !item.read
                              ? "font-medium"
                              : "text-muted-foreground",
                          )}
                        >
                          {item.subject}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {item.preview}
                        </p>
                      </div>
                      {!item.read && (
                        <span
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                          aria-label="Unread"
                        />
                      )}
                    </button>
                    {index < items.length - 1 && <Separator />}
                  </li>
                ))}
              </ul>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    );
  },
);
InboxView.displayName = "InboxView";

export { InboxView };
