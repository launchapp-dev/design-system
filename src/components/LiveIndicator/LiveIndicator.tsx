import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const liveIndicatorVariants = cva("inline-flex items-center font-medium", {
  variants: {
    size: {
      sm: "gap-1.5 text-xs",
      md: "gap-2 text-sm",
      lg: "gap-2.5 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const liveDotVariants = cva("rounded-full flex-shrink-0", {
  variants: {
    size: {
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-3 w-3",
    },
    status: {
      online: "bg-success",
      offline: "bg-muted-foreground",
      degraded: "bg-warning",
    },
  },
  defaultVariants: {
    size: "md",
    status: "online",
  },
});

export interface LiveIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof liveIndicatorVariants> {
  status?: "online" | "offline" | "degraded";
  label?: string;
  pulse?: boolean;
}

function LiveIndicator({
  className,
  size,
  status = "online",
  label = "Live",
  pulse = true,
  ...props
}: LiveIndicatorProps) {
  const shouldPulse = pulse && status !== "offline";
  return (
    <span className={cn(liveIndicatorVariants({ size }), className)} {...props}>
      <span className="relative inline-flex">
        {shouldPulse && (
          <span
            className={cn(
              "absolute inline-flex animate-ping rounded-full opacity-75",
              liveDotVariants({ size, status }),
            )}
          />
        )}
        <span className={cn(liveDotVariants({ size, status }))} />
      </span>
      <span>{label}</span>
    </span>
  );
}

LiveIndicator.displayName = "LiveIndicator";
export type LiveIndicatorVariants = VariantProps<typeof liveIndicatorVariants>;
export type LiveDotVariants = VariantProps<typeof liveDotVariants>;

export { LiveIndicator, liveIndicatorVariants, liveDotVariants };
