import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/Avatar";

const chatBubbleVariants = cva(
  "relative flex max-w-[85%] flex-col gap-1 rounded-2xl px-4 py-3 text-sm leading-relaxed",
  {
    variants: {
      variant: {
        user: "ml-auto rounded-br-sm bg-primary text-primary-foreground",
        assistant: "mr-auto rounded-bl-sm bg-muted text-foreground",
        system: "mx-auto rounded-sm bg-secondary text-secondary-foreground text-xs",
      },
    },
    defaultVariants: {
      variant: "assistant",
    },
  }
);

export interface ChatBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleVariants> {
  avatarSrc?: string;
  avatarInitials?: string;
  avatarFallback?: string;
  senderName?: string;
  timestamp?: string;
  showAvatar?: boolean;
}

function ChatBubble({
  variant = "assistant",
  avatarSrc,
  avatarInitials,
  avatarFallback,
  senderName,
  timestamp,
  showAvatar = true,
  className,
  children,
  ...props
}: ChatBubbleProps & { ref?: React.Ref<HTMLDivElement> }) {
  const isUser = variant === "user";
  const isSystem = variant === "system";

  if (isSystem) {
    return (
      <div
        className={cn(chatBubbleVariants({ variant }), className)}
        role="status"
        {...props}
      >
        {children}
        {timestamp && (
          <time className="text-xs opacity-70" dateTime={timestamp}>
            {timestamp}
          </time>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-end gap-2",
        isUser ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      {showAvatar && !isUser && (
        <Avatar size="sm" className="shrink-0">
          {avatarSrc && (
            <AvatarImage src={avatarSrc} alt={senderName ?? "Assistant"} />
          )}
          <AvatarFallback>
            {avatarInitials ?? avatarFallback ?? senderName?.slice(0, 2).toUpperCase() ?? "AI"}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col gap-1">
        {senderName && !isUser && (
          <span className="text-xs font-medium text-muted-foreground">
            {senderName}
          </span>
        )}
        <div
          className={cn(chatBubbleVariants({ variant }))}
          role="article"
          aria-label={`${isUser ? "You" : senderName ?? "Assistant"} message`}
          {...props}
        >
          {children}
        </div>
        {timestamp && (
          <time
            className={cn(
              "text-xs text-muted-foreground",
              isUser ? "text-right" : "text-left"
            )}
            dateTime={timestamp}
          >
            {timestamp}
          </time>
        )}
      </div>
    </div>
  );
}
ChatBubble.displayName = "ChatBubble";

function ChatBubbleContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      className={cn("prose prose-sm dark:prose-invert max-w-none", className)}
      {...props}
    />
  );
}
ChatBubbleContent.displayName = "ChatBubbleContent";

function ChatBubbleCode({
  className,
  ...props
}: React.HTMLAttributes<HTMLPreElement> & { ref?: React.Ref<HTMLPreElement> }) {
  return (
    <pre
      className={cn(
        "my-2 overflow-x-auto rounded-md bg-background/50 p-3 font-mono text-xs",
        className
      )}
      {...props}
    />
  );
}
ChatBubbleCode.displayName = "ChatBubbleCode";

function ChatBubbleCodeInline({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }) {
  return (
    <code
      className={cn(
        "rounded bg-background/50 px-1.5 py-0.5 font-mono text-xs",
        className
      )}
      {...props}
    />
  );
}
ChatBubbleCodeInline.displayName = "ChatBubbleCodeInline";

export {
  ChatBubble,
  ChatBubbleContent,
  ChatBubbleCode,
  ChatBubbleCodeInline,
  chatBubbleVariants,
};
