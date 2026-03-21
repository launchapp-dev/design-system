import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { ScrollArea } from "@/components/ScrollArea";

const copilotPanelVariants = cva(
  "fixed z-50 flex flex-col bg-background shadow-xl transition ease-in-out",
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 h-full w-full border-r data-[state=open]:animate-slide-in-from-left data-[state=closed]:animate-slide-out-to-left sm:max-w-md",
        right:
          "inset-y-0 right-0 h-full w-full border-l data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right sm:max-w-md",
        bottom:
          "inset-x-0 bottom-0 h-auto max-h-[80vh] border-t data-[state=open]:animate-slide-in-from-bottom data-[state=closed]:animate-slide-out-to-bottom",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

const CopilotPanel = DialogPrimitive.Root;

const CopilotPanelTrigger = DialogPrimitive.Trigger;

const CopilotPanelClose = DialogPrimitive.Close;

function CopilotPanelOverlay({
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
CopilotPanelOverlay.displayName = DialogPrimitive.Overlay.displayName;

export interface CopilotPanelContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof copilotPanelVariants> {
  title?: string;
  description?: string;
  showCloseButton?: boolean;
}

function CopilotPanelContent({
  side = "right",
  title,
  description,
  showCloseButton = true,
  className,
  children,
  ...props
}: CopilotPanelContentProps & { ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Content>> }) {
  return (
    <DialogPrimitive.Portal>
      <CopilotPanelOverlay />
      <DialogPrimitive.Content
        className={cn(copilotPanelVariants({ side }), className)}
        aria-describedby={description ? undefined : undefined}
        {...props}
      >
        <div className="flex flex-col h-full">
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div>
                {title && (
                  <DialogPrimitive.Title className="text-lg font-semibold">
                    {title}
                  </DialogPrimitive.Title>
                )}
                {description && (
                  <DialogPrimitive.Description className="text-sm text-muted-foreground">
                    {description}
                  </DialogPrimitive.Description>
                )}
              </div>
              {showCloseButton && (
                <DialogPrimitive.Close
                  className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label="Close"
                >
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
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </DialogPrimitive.Close>
              )}
            </div>
          )}
          <ScrollArea className="flex-1">{children}</ScrollArea>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
CopilotPanelContent.displayName = "CopilotPanelContent";

function CopilotPanelHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 px-4 py-4", className)}
      {...props}
    />
  );
}
CopilotPanelHeader.displayName = "CopilotPanelHeader";

function CopilotPanelFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border-t px-4 py-3",
        className
      )}
      {...props}
    />
  );
}
CopilotPanelFooter.displayName = "CopilotPanelFooter";

export interface SuggestionChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  active?: boolean;
}

function SuggestionChip({
  icon,
  active,
  className,
  children,
  ...props
}: SuggestionChipProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
        "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground",
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
SuggestionChip.displayName = "SuggestionChip";

function SuggestionChipGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    />
  );
}
SuggestionChipGroup.displayName = "SuggestionChipGroup";

export interface ContextDisplayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  label: string;
  value: string;
}

function ContextDisplay({
  icon,
  label,
  value,
  className,
  ...props
}: ContextDisplayProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-md bg-muted/50 px-3 py-2",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="mt-0.5 text-muted-foreground">{icon}</span>
      )}
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <p className="text-sm truncate">{value}</p>
      </div>
    </div>
  );
}
ContextDisplay.displayName = "ContextDisplay";

function ContextDisplayGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}
ContextDisplayGroup.displayName = "ContextDisplayGroup";

export {
  CopilotPanel,
  CopilotPanelTrigger,
  CopilotPanelClose,
  CopilotPanelContent,
  CopilotPanelHeader,
  CopilotPanelFooter,
  CopilotPanelOverlay,
  SuggestionChip,
  SuggestionChipGroup,
  ContextDisplay,
  ContextDisplayGroup,
  copilotPanelVariants,
};
