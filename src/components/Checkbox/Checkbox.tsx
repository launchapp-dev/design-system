import type * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const checkboxVariants = cva(
  "peer shrink-0 rounded-sm border border-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
  {
    variants: {
      size: {
        sm: "h-5 w-5 md:h-3.5 md:w-3.5 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 p-2.5 md:p-0",
        md: "h-6 w-6 md:h-4 md:w-4 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 p-2.5 md:p-0",
        lg: "h-6 w-6 min-h-[44px] min-w-[44px] p-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

function Checkbox({ className, size, ref, ...props }: CheckboxProps & { ref?: React.Ref<React.ComponentRef<typeof CheckboxPrimitive.Root>> }) {
  return (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ size }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="group flex items-center justify-center text-current">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "group-data-[state=indeterminate]:hidden",
          size === "sm" ? "h-3 w-3 md:h-3 md:w-3" : size === "lg" ? "h-3.5 w-3.5" : "h-3 w-3 md:h-3 md:w-3"
        )}
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className={cn(
          "group-data-[state=checked]:hidden",
          size === "sm" ? "h-3 w-3 md:h-3 md:w-3" : size === "lg" ? "h-3.5 w-3.5" : "h-3 w-3 md:h-3 md:w-3"
        )}
      >
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
}

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;

export { Checkbox };
