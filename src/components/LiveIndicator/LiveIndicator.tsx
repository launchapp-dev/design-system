import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const liveIndicatorVariants = cva("inline-flex items-center gap-2", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const dotVariants = cva("rounded-full", {
  variants: {
    color: {
      default: "bg-primary",
      red: "bg-red-500",
      green: "bg-green-500",
      amber: "bg-amber-500",
      blue: "bg-blue-500",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

export interface LiveIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof liveIndicatorVariants> {
  dotColor?: VariantProps<typeof dotVariants>["color"];
  label?: string;
  showLabel?: boolean;
  pulse?: boolean;
}

const LiveIndicator = React.forwardRef<HTMLSpanElement, LiveIndicatorProps>(
  ({ className, size, dotColor = "default", label = "Live", showLabel = true, pulse = true, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(liveIndicatorVariants({ size }), "font-medium", className)}
        role="status"
        aria-label={label}
        aria-live="polite"
        {...props}
      >
        <span
          className={cn(
            dotVariants({ color: dotColor }),
            size === "sm" && "h-2 w-2",
            size === "md" && "h-2.5 w-2.5",
            size === "lg" && "h-3 w-3",
            pulse && "animate-pulse"
          )}
          aria-hidden="true"
        />
        {showLabel && <span>{label}</span>}
      </span>
    );
  }
);
LiveIndicator.displayName = "LiveIndicator";

export { LiveIndicator, liveIndicatorVariants, dotVariants };
