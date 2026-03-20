import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { useToast } from "./useToast";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-slide-in-from-bottom data-[state=closed]:animate-fade-out",
  {
    variants: {
      variant: {
        default:
          "border-border bg-background text-foreground",
        success:
          "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900/20 dark:text-green-100",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const ToastProvider = ToastPrimitive.Provider;

function ToastViewport({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> & { ref?: React.Ref<React.ComponentRef<typeof ToastPrimitive.Viewport>> }) {
  return (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px]",
      className
    )}
    {...props}
  />
);
}
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

function ToastRoot({ className, variant, ref, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> &
    VariantProps<typeof toastVariants> & { ref?: React.Ref<React.ComponentRef<typeof ToastPrimitive.Root>> }) {
  return (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
);
}
ToastRoot.displayName = ToastPrimitive.Root.displayName;

function ToastTitle({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title> & { ref?: React.Ref<React.ComponentRef<typeof ToastPrimitive.Title>> }) {
  return (
  <ToastPrimitive.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
);
}
ToastTitle.displayName = ToastPrimitive.Title.displayName;

function ToastDescription({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description> & { ref?: React.Ref<React.ComponentRef<typeof ToastPrimitive.Description>> }) {
  return (
  <ToastPrimitive.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
);
}
ToastDescription.displayName = ToastPrimitive.Description.displayName;

function ToastAction({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action> & { ref?: React.Ref<React.ComponentRef<typeof ToastPrimitive.Action>> }) {
  return (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-destructive-foreground/30 group-[.destructive]:hover:bg-destructive-foreground/10 group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
);
}
ToastAction.displayName = ToastPrimitive.Action.displayName;

function ToastClose({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close> & { ref?: React.Ref<React.ComponentRef<typeof ToastPrimitive.Close>> }) {
  return (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring group-hover:opacity-100 group-[.destructive]:text-destructive-foreground/50 group-[.destructive]:hover:text-destructive-foreground",
      className
    )}
    aria-label="Close"
    toast-close=""
    {...props}
  >
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  </ToastPrimitive.Close>
);
}
ToastClose.displayName = ToastPrimitive.Close.displayName;

function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, open, onOpenChange, ...props }) => (
        <ToastRoot key={id} variant={variant} open={open} onOpenChange={onOpenChange} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </ToastRoot>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

export {
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  Toaster,
  toastVariants,
};
export type { VariantProps };
