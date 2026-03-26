import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {}

const Progress = React.forwardRef<React.Ref<React.ComponentRef<typeof ProgressPrimitive.Root>>, ProgressProps>(
  ({ className, size, value, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, ...props }, ref) => {
  if (process.env.NODE_ENV !== "production" && !ariaLabel && !ariaLabelledBy) {
    console.warn("Progress: provide `aria-label` or `aria-labelledby` for WCAG 4.1.2 compliance.");
  }
  return (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ size }), className)}
    value={value}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out"
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
  );
}

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
