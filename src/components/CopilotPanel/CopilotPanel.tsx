import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "../Sheet";
import { ScrollArea } from "../ScrollArea";
import { ChatInput } from "../ChatInput";
import { ChatBubbleGroup } from "../ChatBubble";
import { cn } from "../../lib/utils";

const copilotPanelVariants = cva(
  "flex flex-col",
  {
    variants: {
      size: {
        sm: "w-[320px]",
        md: "w-[400px]",
        lg: "w-[500px]",
        full: "w-full max-w-md",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const copilotSuggestionVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border bg-background hover:bg-accent hover:text-accent-foreground",
        primary: "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20",
        secondary: "border-secondary bg-secondary/50 text-secondary-foreground hover:bg-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CopilotPanelProps
  extends React.ComponentPropsWithoutRef<typeof SheetContent>,
    VariantProps<typeof copilotPanelVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CopilotPanel = React.forwardRef<
  React.ComponentRef<typeof SheetContent>,
  CopilotPanelProps
>(({ className, size, open, onOpenChange, children, ...props }, ref) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent
      ref={ref}
      side="right"
      className={cn(copilotPanelVariants({ size }), "h-full p-0", className)}
      {...props}
    >
      {children}
    </SheetContent>
  </Sheet>
));
CopilotPanel.displayName = "CopilotPanel";

const CopilotPanelTrigger = SheetTrigger;

const CopilotPanelClose = SheetClose;

const CopilotPanelHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-1.5 border-b px-6 py-4",
      className
    )}
    {...props}
  />
));
CopilotPanelHeader.displayName = "CopilotPanelHeader";

const CopilotPanelTitle = React.forwardRef<
  React.ComponentRef<typeof SheetTitle>,
  React.ComponentPropsWithoutRef<typeof SheetTitle>
>(({ className, ...props }, ref) => (
  <SheetTitle
    ref={ref}
    className={cn(
      "flex items-center gap-2 text-lg font-semibold text-foreground",
      className
    )}
    {...props}
  />
));
CopilotPanelTitle.displayName = "CopilotPanelTitle";

const CopilotPanelDescription = React.forwardRef<
  React.ComponentRef<typeof SheetDescription>,
  React.ComponentPropsWithoutRef<typeof SheetDescription>
>(({ className, ...props }, ref) => (
  <SheetDescription
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CopilotPanelDescription.displayName = "CopilotPanelDescription";

const CopilotPanelContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <ScrollArea className="flex-1">
    <div
      ref={ref}
      className={cn("flex flex-col gap-4 p-6", className)}
      {...props}
    >
      {children}
    </div>
  </ScrollArea>
));
CopilotPanelContent.displayName = "CopilotPanelContent";

const CopilotPanelFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-3 border-t px-6 py-4",
      className
    )}
    {...props}
  />
));
CopilotPanelFooter.displayName = "CopilotPanelFooter";

export interface CopilotPanelContextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  label: string;
  value?: string;
}

const CopilotPanelContext = React.forwardRef<
  HTMLDivElement,
  CopilotPanelContextProps
>(({ className, icon, label, value, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-start gap-3 rounded-lg border bg-muted/30 p-3",
      className
    )}
    {...props}
  >
    {icon && (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground">
        {icon}
      </span>
    )}
    <div className="flex min-w-0 flex-col gap-0.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {value && (
        <span className="truncate text-sm text-foreground">{value}</span>
      )}
      {children}
    </div>
  </div>
));
CopilotPanelContext.displayName = "CopilotPanelContext";

export interface CopilotPanelContextListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CopilotPanelContextList = React.forwardRef<
  HTMLDivElement,
  CopilotPanelContextListProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    role="list"
    aria-label="Context information"
    {...props}
  >
    {children}
  </div>
));
CopilotPanelContextList.displayName = "CopilotPanelContextList";

export interface CopilotSuggestionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof copilotSuggestionVariants> {
  icon?: React.ReactNode;
}

const CopilotPanelSuggestion = React.forwardRef<
  HTMLButtonElement,
  CopilotSuggestionProps
>(({ className, variant, icon, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(copilotSuggestionVariants({ variant }), className)}
    {...props}
  >
    {icon && <span className="shrink-0">{icon}</span>}
    {children}
  </button>
));
CopilotPanelSuggestion.displayName = "CopilotPanelSuggestion";

export interface CopilotPanelSuggestionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const CopilotPanelSuggestions = React.forwardRef<
  HTMLDivElement,
  CopilotPanelSuggestionsProps
>(({ className, title = "Suggestions", children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  >
    <span className="text-xs font-medium text-muted-foreground">{title}</span>
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Action suggestions"
    >
      {children}
    </div>
  </div>
));
CopilotPanelSuggestions.displayName = "CopilotPanelSuggestions";

const CopilotPanelDivider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("h-px bg-border", className)}
    {...props}
  />
));
CopilotPanelDivider.displayName = "CopilotPanelDivider";

export interface CopilotPanelInputProps
  extends React.ComponentPropsWithoutRef<typeof ChatInput> {
  onSend?: (value: string) => void;
}

const CopilotPanelInput = React.forwardRef<
  HTMLTextAreaElement,
  CopilotPanelInputProps
>(({ onSend, ...props }, ref) => (
  <ChatInput
    ref={ref}
    onSend={onSend}
    size="md"
    placeholder="Ask me anything..."
    {...props}
  />
));
CopilotPanelInput.displayName = "CopilotPanelInput";

export interface CopilotPanelChatHistoryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CopilotPanelChatHistory = React.forwardRef<
  HTMLDivElement,
  CopilotPanelChatHistoryProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-4", className)}
    role="log"
    aria-label="Chat history"
    aria-live="polite"
    {...props}
  >
    {children ? children : <ChatBubbleGroup>{null}</ChatBubbleGroup>}
  </div>
));
CopilotPanelChatHistory.displayName = "CopilotPanelChatHistory";

export type CopilotPanelVariants = VariantProps<typeof copilotPanelVariants>;
export type CopilotSuggestionVariants = VariantProps<typeof copilotSuggestionVariants>;

export {
  CopilotPanel,
  CopilotPanelTrigger,
  CopilotPanelClose,
  CopilotPanelHeader,
  CopilotPanelTitle,
  CopilotPanelDescription,
  CopilotPanelContent,
  CopilotPanelFooter,
  CopilotPanelContext,
  CopilotPanelContextList,
  CopilotPanelSuggestions,
  CopilotPanelSuggestion,
  CopilotPanelDivider,
  CopilotPanelInput,
  CopilotPanelChatHistory,
  copilotPanelVariants,
  copilotSuggestionVariants,
};
