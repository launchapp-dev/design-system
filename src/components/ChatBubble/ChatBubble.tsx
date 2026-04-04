import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";

const chatBubbleVariants = cva("flex gap-3", {
  variants: {
    variant: {
      user: "flex-row-reverse",
      assistant: "flex-row",
      system: "flex-row justify-center",
    },
  },
  defaultVariants: {
    variant: "assistant",
  },
});

const chatBubbleContentVariants = cva(
  "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
  {
    variants: {
      variant: {
        user: "rounded-tr-sm bg-primary text-primary-foreground",
        assistant: "rounded-tl-sm bg-muted text-foreground",
        system:
          "rounded-sm bg-secondary/50 text-muted-foreground text-center text-xs italic max-w-full",
      },
    },
    defaultVariants: {
      variant: "assistant",
    },
  },
);

const codeBlockVariants = cva(
  "my-2 rounded-md bg-background/80 p-3 font-mono text-xs overflow-x-auto border",
  {
    variants: {
      variant: {
        user: "border-primary-foreground/20",
        assistant: "border-border",
        system: "border-border",
      },
    },
    defaultVariants: {
      variant: "assistant",
    },
  },
);

export interface ChatBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleVariants> {
  avatarSrc?: string;
  avatarAlt?: string;
  avatarFallback?: string;
  timestamp?: string;
  showAvatar?: boolean;
}

function renderMarkdown(
  text: string,
  variant: "user" | "assistant" | "system",
): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let key = 0;

  const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
  const inlineCodeRegex = /`([^`]+)`/g;
  const boldRegex = /\*\*([^*]+)\*\*/g;
  const italicRegex = /(?<!\*)\*([^*]+)\*(?!\*)|_([^_]+)_/g;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  let lastIndex = 0;
  let result;

  const processText = (str: string): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    let idx = 0;
    let tempStr = str;

    const patterns = [
      { regex: inlineCodeRegex, type: "inlineCode" },
      { regex: boldRegex, type: "bold" },
      { regex: italicRegex, type: "italic" },
      { regex: linkRegex, type: "link" },
    ];

    while (tempStr.length > 0) {
      let earliestMatch: {
        index: number;
        length: number;
        type: string;
        match: RegExpExecArray;
      } | null = null;

      for (const { regex, type } of patterns) {
        regex.lastIndex = 0;
        const match = regex.exec(tempStr);
        if (
          match &&
          match.index >= 0 &&
          (!earliestMatch || match.index < earliestMatch.index)
        ) {
          earliestMatch = {
            index: match.index,
            length: match[0].length,
            type,
            match,
          };
        }
      }

      if (earliestMatch && earliestMatch.index >= 0) {
        if (earliestMatch.index > 0) {
          elements.push(tempStr.slice(0, earliestMatch.index));
        }

        const { match, type } = earliestMatch;
        if (type === "inlineCode") {
          elements.push(
            <code
              key={idx++}
              className="rounded bg-background/50 px-1.5 py-0.5 font-mono text-xs"
            >
              {match[1]}
            </code>,
          );
        } else if (type === "bold") {
          elements.push(
            <strong key={idx++} className="font-semibold">
              {match[1]}
            </strong>,
          );
        } else if (type === "italic") {
          elements.push(
            <em key={idx++} className="italic">
              {match[1] || match[2]}
            </em>,
          );
        } else if (type === "link") {
          elements.push(
            <a
              key={idx++}
              href={match[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              {match[1]}
            </a>,
          );
        }

        tempStr = tempStr.slice(earliestMatch.index + earliestMatch.length);
      } else {
        elements.push(tempStr);
        break;
      }
    }

    return elements;
  };

  while ((result = codeBlockRegex.exec(text)) !== null) {
    if (result.index > lastIndex) {
      const beforeText = text.slice(lastIndex, result.index);
      parts.push(
        ...processText(beforeText).map((el, i) =>
          React.isValidElement(el)
            ? React.cloneElement(el, { key: `text-${key}-${i}` })
            : el,
        ),
      );
      key++;
    }

    const language = result[1] || "";
    const code = result[2].trim();

    parts.push(
      <div
        key={`codeblock-${key++}`}
        className={cn(codeBlockVariants({ variant }))}
      >
        {language && (
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              {language}
            </span>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(code)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Copy code to clipboard"
            >
              Copy
            </button>
          </div>
        )}
        <pre className="whitespace-pre-wrap break-words">
          <code>{code}</code>
        </pre>
      </div>,
    );

    lastIndex = result.index + result[0].length;
  }

  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    parts.push(
      ...processText(remainingText).map((el, i) =>
        React.isValidElement(el)
          ? React.cloneElement(el, { key: `text-${key}-${i}` })
          : el,
      ),
    );
  }

  return parts.length > 0 ? parts : text;
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  (
    {
      className,
      variant = "assistant",
      avatarSrc,
      avatarAlt,
      avatarFallback,
      timestamp,
      showAvatar = true,
      children,
      ...props
    },
    ref,
  ) => {
    const isSystem = variant === "system";
    const effectiveVariant = variant ?? "assistant";

    return (
      <div
        ref={ref}
        className={cn(chatBubbleVariants({ variant }), className)}
        role="article"
        aria-label={`${effectiveVariant} message`}
        {...props}
      >
        {showAvatar && !isSystem && (
          <Avatar size="sm" className="shrink-0 self-end">
            {avatarSrc && (
              <AvatarImage
                src={avatarSrc}
                alt={avatarAlt ?? effectiveVariant}
              />
            )}
            <AvatarFallback>
              {avatarFallback ?? effectiveVariant.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        <div
          className={cn(
            "flex flex-col gap-1",
            effectiveVariant === "user" ? "items-end" : "items-start",
          )}
        >
          <div className={cn(chatBubbleContentVariants({ variant }))}>
            {typeof children === "string"
              ? renderMarkdown(children, effectiveVariant)
              : children}
          </div>
          {timestamp && (
            <time
              className={cn(
                "text-xs text-muted-foreground",
                effectiveVariant === "user" ? "text-right" : "text-left",
              )}
              dateTime={timestamp}
            >
              {timestamp}
            </time>
          )}
        </div>
      </div>
    );
  },
);
ChatBubble.displayName = "ChatBubble";

export interface ChatBubbleGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ChatBubbleGroup = React.forwardRef<HTMLDivElement, ChatBubbleGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-4", className)}
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
      {...props}
    >
      {children}
    </div>
  ),
);
ChatBubbleGroup.displayName = "ChatBubbleGroup";

export interface LinkPreviewProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  title?: string;
  description?: string;
  image?: string;
  url: string;
}

const ChatBubbleLinkPreview = React.forwardRef<
  HTMLAnchorElement,
  LinkPreviewProps
>(({ className, title, description, image, url, ...props }, ref) => (
  <a
    ref={ref}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "flex gap-3 rounded-lg border bg-background/50 p-3 transition-colors hover:bg-background/80 mt-2",
      className,
    )}
    {...props}
  >
    {image && (
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
    )}
    <div className="flex min-w-0 flex-col gap-1">
      {title && (
        <span className="truncate text-sm font-medium text-foreground">
          {title}
        </span>
      )}
      {description && (
        <span className="line-clamp-2 text-xs text-muted-foreground">
          {description}
        </span>
      )}
      <span className="truncate text-xs text-muted-foreground/70">
        {new URL(url).hostname}
      </span>
    </div>
  </a>
));
ChatBubbleLinkPreview.displayName = "ChatBubbleLinkPreview";

export type ChatBubbleVariants = VariantProps<typeof chatBubbleVariants>;
export type ChatBubbleContentVariants = VariantProps<
  typeof chatBubbleContentVariants
>;
export type CodeBlockVariants = VariantProps<typeof codeBlockVariants>;

export {
  ChatBubble,
  ChatBubbleGroup,
  ChatBubbleLinkPreview,
  chatBubbleContentVariants,
  chatBubbleVariants,
};
