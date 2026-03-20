import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { cn } from "@/lib/utils";

export interface BubbleMessage {
  id: string;
  content: string;
  sender: "sent" | "received";
  senderName?: string;
  timestamp?: string;
  avatarSrc?: string;
  avatarInitials?: string;
}

export interface MessageBubblesProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: BubbleMessage[];
}

const MessageBubbles = React.forwardRef<HTMLDivElement, MessageBubblesProps>(
  ({ messages, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-3 p-4", className)}
      role="log"
      aria-label="Messages"
      aria-live="polite"
      {...props}
    >
      {messages.map((message) => {
        const isSent = message.sender === "sent";
        return (
          <div
            key={message.id}
            className={cn("flex items-end gap-2", isSent ? "flex-row-reverse" : "flex-row")}
          >
            {!isSent && (
              <Avatar size="sm" className="shrink-0">
                {message.avatarSrc && (
                  <AvatarImage src={message.avatarSrc} alt={message.senderName ?? "User"} />
                )}
                <AvatarFallback>
                  {message.avatarInitials ?? message.senderName?.slice(0, 2).toUpperCase() ?? "?"}
                </AvatarFallback>
              </Avatar>
            )}
            <div className={cn("flex max-w-[75%] flex-col gap-1", isSent ? "items-end" : "items-start")}>
              {message.senderName && !isSent && (
                <span className="text-xs font-medium text-muted-foreground">
                  {message.senderName}
                </span>
              )}
              <div
                className={cn(
                  "rounded-2xl px-4 py-2 text-sm leading-relaxed",
                  isSent
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-muted text-foreground"
                )}
              >
                {message.content}
              </div>
              {message.timestamp && (
                <time className="text-xs text-muted-foreground" dateTime={message.timestamp}>
                  {message.timestamp}
                </time>
              )}
            </div>
          </div>
        );
      })}
    </div>
  )
);
MessageBubbles.displayName = "MessageBubbles";

export { MessageBubbles };
