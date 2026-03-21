import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const thinkingIndicatorVariants = cva(
  "inline-flex items-center gap-2 rounded-2xl bg-muted",
  {
    variants: {
      size: {
        sm: "px-2 py-1",
        md: "px-3 py-2",
        lg: "px-4 py-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const dotVariants = cva("rounded-full bg-muted-foreground", {
  variants: {
    size: {
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-2.5 w-2.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface ThinkingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof thinkingIndicatorVariants> {
  label?: string;
}

const ThinkingIndicator = React.forwardRef<HTMLDivElement, ThinkingIndicatorProps>(
  ({ label = "Thinking…", size, className, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-label={label}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <div className={cn(thinkingIndicatorVariants({ size }))}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(dotVariants({ size }))}
            style={{
              animation: "thinking-pulse 1.4s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
      {label && (
        <span className="text-xs text-muted-foreground">{label}</span>
      )}
      <style>{`
        @keyframes thinking-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
);
ThinkingIndicator.displayName = "ThinkingIndicator";

export { ThinkingIndicator, thinkingIndicatorVariants };
