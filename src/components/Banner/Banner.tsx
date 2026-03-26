import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const bannerVariants = cva(
  "relative flex w-full items-center justify-between gap-3 px-4 py-3 text-sm [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        info: "bg-blue-500/15 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
        warning: "bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
        error: "bg-red-500/15 text-red-700 dark:bg-red-500/20 dark:text-red-300 [&>svg]:text-red-600 dark:[&>svg]:text-red-400",
        success: "bg-green-500/15 text-green-700 dark:bg-green-500/20 dark:text-green-300 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
      },
      position: {
        inline: "rounded-lg",
        stickyTop: "sticky top-0 z-50 border-b border-inherit",
        stickyBottom: "sticky bottom-0 z-50 border-t border-inherit",
      },
    },
    defaultVariants: {
      variant: "info",
      position: "inline",
    },
  }
);

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className,
  variant,
  position,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = true,
  ...props }, ref) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  
  const handleDismiss = React.useCallback(() => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setUncontrolledOpen(false);
    }
  }, [onOpenChange]);

  if (!isOpen) {
    return null;
  }

  const role = variant === "error" || variant === "warning" ? "alert" : "status";

  return (
    <div
      ref={ref}
      role={role}
      className={cn(
        bannerVariants({ variant, position }),
        "animate-slide-in-from-top",
        className
      )}
      {...props}
    />
  );
});
Banner.displayName = "Banner";

const BannerContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-1 items-center gap-3", className)}
      {...props}
    />
  );
}
);
BannerContent.displayName = "BannerContent";

const BannerTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("font-medium", className)}
      {...props}
    />
  );
}
);
BannerTitle.displayName = "BannerTitle";

const BannerDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm opacity-90", className)}
      {...props}
    />
  );
}
);
BannerDescription.displayName = "BannerDescription";

export interface BannerActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const BannerAction = React.forwardRef<HTMLButtonElement, BannerActionProps>(
  ({ className, asChild = false ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        "bg-transparent hover:bg-black/10 dark:hover:bg-white/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
);
BannerAction.displayName = "BannerAction";

const BannerActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}
);
BannerActions.displayName = "BannerActions";

function BannerDismiss({ className, onOpenChange, ref, ...props }: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & { 
  ref?: React.Ref<HTMLButtonElement>;
  onOpenChange?: (open: boolean) => void;
}) {
  const handleClick = React.useCallback(() => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  }, [onOpenChange]);

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md p-1 opacity-70 transition-opacity hover:opacity-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2",
        className
      )}
      onClick={handleClick}
      aria-label="Dismiss banner"
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
    </button>
  );
}
BannerDismiss.displayName = "BannerDismiss";

export { 
  Banner, 
  BannerContent,
  BannerTitle, 
  BannerDescription, 
  BannerAction,
  BannerActions,
  BannerDismiss,
  bannerVariants 
};
