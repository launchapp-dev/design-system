import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { useOffline } from "./OfflineProvider";
import { useReducedMotion } from "../../lib/animation";

const indicatorVariants = cva(
  "fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 px-4 py-2 transition-all duration-300",
  {
    variants: {
      position: {
        bottom: "bottom-0",
        top: "top-0",
      },
      variant: {
        default: "bg-muted text-muted-foreground",
        warning: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100",
        destructive: "bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      position: "bottom",
      variant: "default",
    },
  }
);

interface OfflineIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof indicatorVariants> {
  dismissible?: boolean;
  onDismiss?: () => void;
  showIcon?: boolean;
  label?: string;
}

function OfflineIndicator({
  className,
  position,
  variant,
  dismissible = true,
  onDismiss,
  showIcon = true,
  label,
  ...props
}: OfflineIndicatorProps): React.JSX.Element | null {
  const { isOffline } = useOffline();
  const reducedMotion = useReducedMotion();
  const [dismissed, setDismissed] = React.useState(false);

  const handleDismiss = React.useCallback(() => {
    setDismissed(true);
    onDismiss?.();
  }, [onDismiss]);

  React.useEffect(() => {
    if (isOffline) {
      setDismissed(false);
    }
  }, [isOffline]);

  if (!isOffline || dismissed) {
    return <></>;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        indicatorVariants({ position, variant }),
        reducedMotion ? "" : "animate-slide-in-from-bottom",
        className
      )}
      {...props}
    >
      {showIcon && (
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
          className="shrink-0"
        >
          <path d="M12 20h.01" />
          <path d="M8.5 16.429a5 5 0 0 1 7 0" />
          <path d="M5 12.859a10 10 0 0 1 5.17-2.69" />
          <path d="M19 12.859a10 10 0 0 0-2.007-1.523" />
          <path d="M2 8.82a15 15 0 0 1 4.177-2.643" />
          <path d="M22 8.82a15 15 0 0 0-11.288-3.764" />
          <path d="m2 2 20 20" />
        </svg>
      )}
      <span className="text-sm font-medium">
        {label || "You are currently offline"}
      </span>
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="ml-auto rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Dismiss offline notification"
        >
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export { OfflineIndicator, indicatorVariants };
export type { OfflineIndicatorProps };
