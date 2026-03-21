import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { useOffline } from "./OfflineProvider";
import { useReducedMotion } from "../../lib/animation";

const wrapperVariants = cva(
  "relative",
  {
    variants: {
      stale: {
        true: "opacity-80",
        false: "",
      },
    },
  }
);

const indicatorVariants = cva(
  "absolute top-2 right-2 flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-all",
  {
    variants: {
      stale: {
        true: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100",
        false: "bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-100",
      },
    },
  }
);

interface CachedDataWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapperVariants> {
  cachedAt?: number | null;
  staleThreshold?: number;
  showIndicator?: boolean;
  indicatorLabel?: string;
  isLoading?: boolean;
  children: React.ReactNode;
}

function CachedDataWrapper({
  className,
  stale,
  cachedAt,
  staleThreshold = 5 * 60 * 1000,
  showIndicator = true,
  indicatorLabel,
  isLoading = false,
  children,
  ...props
}: CachedDataWrapperProps): React.JSX.Element {
  const { isOffline } = useOffline();
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isStale = React.useMemo(() => {
    if (stale !== undefined) return stale;
    if (!cachedAt) return false;
    return Date.now() - cachedAt > staleThreshold;
  }, [stale, cachedAt, staleThreshold]);

  const showStaleIndicator = showIndicator && (isStale || isOffline) && !isLoading;

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div
      className={cn(wrapperVariants({ stale: isStale }), className)}
      {...props}
    >
      {children}
      {showStaleIndicator && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            indicatorVariants({ stale: true }),
            reducedMotion ? "" : "animate-fade-in"
          )}
        >
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
            <path d="M12 20h.01" />
            <path d="M8.5 16.429a5 5 0 0 1 7 0" />
            <path d="M5 12.859a10 10 0 0 1 5.17-2.69" />
            <path d="M19 12.859a10 10 0 0 0-2.007-1.523" />
            <path d="M2 8.82a15 15 0 0 1 4.177-2.643" />
            <path d="M22 8.82a15 15 0 0 0-11.288-3.764" />
            <path d="m2 2 20 20" />
          </svg>
          <span>
            {indicatorLabel ||
              (isOffline ? "Showing cached data (offline)" : "Showing stale data")}
          </span>
        </div>
      )}
    </div>
  );
}

export { CachedDataWrapper, wrapperVariants, indicatorVariants };
export type { CachedDataWrapperProps };
