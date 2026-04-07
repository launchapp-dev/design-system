import type * as React from "react";
import { CardHeader, CardTitle } from "@/components/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { ScrollArea } from "@/components/ScrollArea";
import { Separator } from "@/components/Separator";
import { cn } from "@/lib/utils";

export interface InboxMessage {
  id: string;
  sender: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  starred?: boolean;
  pinned?: boolean;
  tags?: string[];
  priority?: "normal" | "urgent" | "low";
}

export interface InboxFolder {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface InboxManagerProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: InboxMessage[];
  folders?: InboxFolder[];
  activeFolder?: string;
  onFolderChange?: (folderId: string) => void;
  selectedMessageId?: string;
  onMessageSelect?: (message: InboxMessage) => void;
  onMessageStar?: (id: string) => void;
  onMessageArchive?: (id: string) => void;
  onMessageDelete?: (id: string) => void;
  onMarkAllRead?: () => void;
  title?: string;
  maxListHeight?: number | string;
}

function InboxManager({
  messages,
  folders = [],
  activeFolder = "inbox",
  onFolderChange,
  selectedMessageId,
  onMessageSelect,
  onMessageStar,
  onMessageArchive,
  onMessageDelete,
  onMarkAllRead,
  title = "Inbox",
  maxListHeight = 480,
  className,
  ...props
}: InboxManagerProps) {
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div ref={null} className={cn("flex gap-0 border rounded-[--la-radius]", className)} {...props}>
      {folders.length > 0 && (
        <div className="w-44 border-r bg-muted/20 shrink-0">
          <div className="p-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Folders</h3>
            <nav className="space-y-0.5">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => onFolderChange?.(folder.id)}
                  className={cn(
                    "w-full flex items-center justify-between rounded-[--la-radius] px-2 py-1.5 text-sm transition-colors",
                    activeFolder === folder.id
                      ? "bg-[hsl(var(--la-accent))] text-[hsl(var(--la-accent-foreground))] font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <span className="flex items-center gap-2">
                    {folder.icon}
                    {folder.label}
                  </span>
                  {folder.count !== undefined && (
                    <Badge variant="secondary" className="text-[10px] h-4">{folder.count}</Badge>
                  )}
                </button>
              ))}
            </nav>
          </div>
          {unreadCount > 0 && (
            <>
              <Separator className="mx-3" />
              <div className="p-3 pt-2">
                <Button variant="ghost" size="sm" className="w-full text-xs" onClick={onMarkAllRead}>
                  Mark all as read
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <CardHeader className="border-b py-3 px-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{title}</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">{unreadCount} unread</Badge>
            )}
          </div>
        </CardHeader>

        <ScrollArea style={{ maxHeight }}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-50" aria-hidden="true">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <p className="text-sm">No messages</p>
            </div>
          ) : (
            <div className="divide-y">
              {messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => onMessageSelect?.(message)}
                  className={cn(
                    "w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-[hsl(var(--la-accent))]",
                    !message.read && "bg-muted/30",
                    selectedMessageId === message.id && "bg-[hsl(var(--la-accent))]",
                  )}
                >
                  <Avatar size="sm" className="shrink-0 mt-0.5">
                    {message.sender.avatar && <AvatarImage src={message.sender.avatar} alt={message.sender.name} />}
                    <AvatarFallback className="text-xs">{message.sender.initials ?? message.sender.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn("text-sm truncate", !message.read && "font-semibold")}>
                        {message.sender.name}
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0">{message.timestamp}</span>
                    </div>
                    <p className={cn("text-sm truncate", !message.read && "font-medium")}>{message.subject}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{message.preview}</p>
                    {message.tags && message.tags.length > 0 && (
                      <div className="flex gap-1 mt-1.5 flex-wrap">
                        {message.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px] h-4">{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {message.priority === "urgent" && (
                      <span className="h-2 w-2 rounded-full bg-red-500" title="Urgent" />
                    )}
                    {message.starred && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="text-amber-500" aria-label="Starred">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

InboxManager.displayName = "InboxManager";

export { InboxManager };
export type { InboxMessage, InboxFolder, InboxManagerProps };