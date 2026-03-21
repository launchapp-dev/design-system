import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Button } from "../Button";

const bannerVariants = cva("relative w-full px-4 py-3", {
  variants: {
    variant: {
      default: "bg-background border border-border text-foreground",
      info: "bg-blue-50 border border-blue-200 text-blue-900 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-100",
      warning: "bg-amber-50 border border-amber-200 text-amber-900 dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-100",
      error: "bg-red-50 border border-red-200 text-red-900 dark:bg-red-950/50 dark:border-red-800 dark:text-red-100",
      success: "bg-green-50 border border-green-200 text-green-900 dark:bg-green-950/50 dark:border-green-800 dark:text-green-100",
    },
    sticky: {
      true: "sticky top-0 z-50",
    },
  },
  defaultVariants: {
    variant: "default",
    sticky: false,
  },
});

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
  dismissible?: boolean;
  onDismiss?: () => void;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  actionOnClick?: () => void;
  secondaryAction?: React.ReactNode;
  secondaryActionOnClick?: () => void;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      variant,
      sticky,
      dismissible = false,
      onDismiss,
      title,
      description,
      action,
      actionOnClick,
      secondaryAction,
      secondaryActionOnClick,
      children,
      ...props
    },
    ref
  ) => {
    const [dismissed, setDismissed] = React.useState(false);

    const handleDismiss = () => {
      setDismissed(true);
      onDismiss?.();
    };

    if (dismissed) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(bannerVariants({ variant, sticky }), className)}
        role={variant === "error" || variant === "warning" ? "alert" : "status"}
        aria-live={variant === "error" ? "assertive" : "polite"}
        {...props}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            {variant && variant !== "default" && (
              <BannerIcon variant={variant} className="mt-0.5 shrink-0" />
            )}
            <div className="flex flex-col gap-0.5">
              {title && (
                <p className="text-sm font-semibold">{title}</p>
              )}
              {description && (
                <p className="text-sm opacity-90">{description}</p>
              )}
              {children}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {secondaryAction && (
              <Button
                variant="ghost"
                size="sm"
                onClick={secondaryActionOnClick}
                className={cn(
                  "h-auto px-2 py-1 text-xs",
                  variant === "default" && "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {secondaryAction}
              </Button>
            )}
            {action && (
              <Button
                variant={variant === "default" ? "secondary" : "outline"}
                size="sm"
                onClick={actionOnClick}
                className={cn(
                  "h-auto px-3 py-1 text-xs",
                  variant === "info" && "border-blue-300 bg-blue-100 text-blue-900 hover:bg-blue-200 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800",
                  variant === "warning" && "border-amber-300 bg-amber-100 text-amber-900 hover:bg-amber-200 dark:border-amber-700 dark:bg-amber-900 dark:text-amber-100 dark:hover:bg-amber-800",
                  variant === "error" && "border-red-300 bg-red-100 text-red-900 hover:bg-red-200 dark:border-red-700 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800",
                  variant === "success" && "border-green-300 bg-green-100 text-green-900 hover:bg-green-200 dark:border-green-700 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800"
                )}
              >
                {action}
              </Button>
            )}
            {dismissible && (
              <button
                onClick={handleDismiss}
                className={cn(
                  "rounded p-1 opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  variant === "default" && "text-foreground",
                  variant === "info" && "text-blue-900 hover:bg-blue-200/50 dark:text-blue-100",
                  variant === "warning" && "text-amber-900 hover:bg-amber-200/50 dark:text-amber-100",
                  variant === "error" && "text-red-900 hover:bg-red-200/50 dark:text-red-100",
                  variant === "success" && "text-green-900 hover:bg-green-200/50 dark:text-green-100"
                )}
                aria-label="Dismiss banner"
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
            )}
          </div>
        </div>
      </div>
    );
  }
);
Banner.displayName = "Banner";

function BannerIcon({ variant, className }: { variant: string; className?: string }) {
  if (variant === "info") {
    return (
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
        className={className}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    );
  }
  if (variant === "warning") {
    return (
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
        className={className}
        aria-hidden="true"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    );
  }
  if (variant === "error") {
    return (
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
        className={className}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
      </svg>
    );
  }
  if (variant === "success") {
    return (
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
        className={className}
        aria-hidden="true"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    );
  }
  return null;
}

export { Banner, bannerVariants };
