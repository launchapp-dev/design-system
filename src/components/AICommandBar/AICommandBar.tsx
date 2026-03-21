import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ScrollArea";
import { Button } from "@/components/Button";

const aiCommandBarVariants = cva(
  "fixed left-1/2 top-[15%] z-50 w-full max-w-2xl -translate-x-1/2 overflow-hidden rounded-xl border bg-popover shadow-2xl",
  {
    variants: {
      size: {
        sm: "max-w-md",
        md: "max-w-2xl",
        lg: "max-w-3xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const AICommandBar = DialogPrimitive.Root;

const AICommandBarTrigger = DialogPrimitive.Trigger;

function AICommandBarOverlay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & { ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Overlay>> }) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
        className
      )}
      {...props}
    />
  );
}
AICommandBarOverlay.displayName = DialogPrimitive.Overlay.displayName;

export interface AICommandBarContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof aiCommandBarVariants> {
  placeholder?: string;
  aiPlaceholder?: string;
}

function AICommandBarContent({
  size = "md",
  placeholder = "Search commands...",
  aiPlaceholder = "Ask anything...",
  className,
  children,
  ...props
}: AICommandBarContentProps & { ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Content>> }) {
  const [query, setQuery] = React.useState("");
  const [mode, setMode] = React.useState<"command" | "ai">("command");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "/" && mode === "ai") {
      e.preventDefault();
      setMode("command");
    } else if (e.key === "Escape") {
      if (query) {
        setQuery("");
      }
    }
  };

  return (
    <DialogPrimitive.Portal>
      <AICommandBarOverlay />
      <DialogPrimitive.Content
        className={cn(aiCommandBarVariants({ size }), className)}
        onOpenAutoFocus={(e) => e.preventDefault()}
        {...props}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2 border-b px-3 py-2">
            <span className="shrink-0 text-muted-foreground">
              {mode === "ai" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              )}
            </span>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={mode === "ai" ? aiPlaceholder : placeholder}
              className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              aria-label={mode === "ai" ? "AI search" : "Command search"}
            />
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMode(mode === "ai" ? "command" : "ai")}
                className={cn(
                  "rounded px-1.5 py-0.5 text-xs font-medium transition-colors",
                  mode === "ai"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
                aria-label={`Switch to ${mode === "ai" ? "command" : "AI"} mode`}
              >
                AI
              </button>
            </div>
          </div>
          <ScrollArea className="max-h-[400px]">
            {children && typeof children === "function"
              ? (children as (query: string, mode: "command" | "ai") => React.ReactNode)(query, mode)
              : children}
          </ScrollArea>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
AICommandBarContent.displayName = "AICommandBarContent";

function AICommandBarList({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-2", className)}
      {...props}
    />
  );
}
AICommandBarList.displayName = "AICommandBarList";

function AICommandBarEmpty({
  className,
  children = "No results found.",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("py-6 text-center text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </div>
  );
}
AICommandBarEmpty.displayName = "AICommandBarEmpty";

export interface AICommandBarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  shortcut?: string;
  selected?: boolean;
  aiSuggestion?: boolean;
}

function AICommandBarItem({
  icon,
  shortcut,
  selected,
  aiSuggestion,
  className,
  children,
  ...props
}: AICommandBarItemProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
        selected && "bg-accent text-accent-foreground",
        "hover:bg-accent hover:text-accent-foreground",
        aiSuggestion && "border border-primary/20 bg-primary/5",
        className
      )}
      {...props}
    >
      {aiSuggestion && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
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
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </svg>
        </span>
      )}
      {icon && !aiSuggestion && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground">
          {icon}
        </span>
      )}
      <span className="flex-1 truncate">{children}</span>
      {shortcut && (
        <span className="text-xs text-muted-foreground">{shortcut}</span>
      )}
    </button>
  );
}
AICommandBarItem.displayName = "AICommandBarItem";

function AICommandBarGroup({
  heading,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { heading?: string }) {
  return (
    <div className={cn("py-1", className)} {...props}>
      {heading && (
        <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
          {heading}
        </div>
      )}
      {children}
    </div>
  );
}
AICommandBarGroup.displayName = "AICommandBarGroup";

function AICommandBarSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}
AICommandBarSeparator.displayName = "AICommandBarSeparator";

export interface AIResponseProps
  extends React.HTMLAttributes<HTMLDivElement> {
  streaming?: boolean;
}

function AIResponse({
  streaming,
  className,
  children,
  ...props
}: AIResponseProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 p-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
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
          <path d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" />
          <path d="M20 14h2" />
          <path d="M15 13v2" />
          <path d="M9 13v2" />
        </svg>
        AI Response
        {streaming && (
          <span className="animate-pulse">thinking...</span>
        )}
      </div>
      <div className="prose prose-sm dark:prose-invert max-w-none text-sm">
        {children}
      </div>
    </div>
  );
}
AIResponse.displayName = "AIResponse";

export {
  AICommandBar,
  AICommandBarTrigger,
  AICommandBarOverlay,
  AICommandBarContent,
  AICommandBarList,
  AICommandBarEmpty,
  AICommandBarItem,
  AICommandBarGroup,
  AICommandBarSeparator,
  AIResponse,
  aiCommandBarVariants,
};
