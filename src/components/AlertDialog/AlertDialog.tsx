import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";

const AlertDialogRoot = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

function AlertDialogOverlay({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> & { ref?: React.Ref<React.ComponentRef<typeof AlertDialogPrimitive.Overlay>> }) {
  return (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
      className
    )}
    {...props}
  />
);
}
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

function AlertDialogContent({ className, children, ref, ...props }: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> & { ref?: React.Ref<React.ComponentRef<typeof AlertDialogPrimitive.Content>> }) {
  return (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-4 md:p-6 shadow-lg duration-200 data-[state=open]:animate-scale-in data-[state=closed]:animate-fade-out max-h-[90vh] overflow-y-auto",
        "pt-[calc(1rem+env(safe-area-inset-top))] md:pt-6",
        "pb-[calc(1rem+env(safe-area-inset-bottom))] md:pb-6",
        "pl-[calc(1rem+env(safe-area-inset-left))] md:pl-6",
        "pr-[calc(1rem+env(safe-area-inset-right))] md:pr-6",
        className
      )}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Content>
  </AlertDialogPortal>
);
}
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

function AlertDialogTitle({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> & { ref?: React.Ref<React.ComponentRef<typeof AlertDialogPrimitive.Title>> }) {
  return (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight text-foreground", className)}
    {...props}
  />
);
}
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

function AlertDialogDescription({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> & { ref?: React.Ref<React.ComponentRef<typeof AlertDialogPrimitive.Description>> }) {
  return (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);
}
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

function AlertDialogAction({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & { ref?: React.Ref<React.ComponentRef<typeof AlertDialogPrimitive.Action>> }) {
  return (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(
      "inline-flex h-12 md:h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] md:min-h-0",
      className
    )}
    {...props}
  />
);
}
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

function AlertDialogCancel({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> & { ref?: React.Ref<React.ComponentRef<typeof AlertDialogPrimitive.Cancel>> }) {
  return (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      "inline-flex h-12 md:h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] md:min-h-0",
      className
    )}
    {...props}
  />
);
}
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
