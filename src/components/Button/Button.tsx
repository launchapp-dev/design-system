import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[--la-radius] font-medium ring-offset-[hsl(var(--la-background))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))] hover:bg-[hsl(var(--la-primary)/0.9)]",
        destructive:
          "bg-[hsl(var(--la-destructive))] text-[hsl(var(--la-destructive-foreground))] hover:bg-[hsl(var(--la-destructive)/0.9)]",
        outline:
          "border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
        secondary:
          "bg-[hsl(var(--la-secondary))] text-[hsl(var(--la-secondary-foreground))] hover:bg-[hsl(var(--la-secondary)/0.8)]",
        ghost: "hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
        link: "text-[hsl(var(--la-primary))] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-11 md:h-9 rounded-[--la-radius] px-3 text-sm min-h-[44px] md:min-h-0",
        md: "h-12 md:h-10 px-4 py-2 text-sm min-h-[44px] md:min-h-0",
        lg: "h-12 rounded-[--la-radius] px-8 text-base min-h-[44px]",
        icon: "h-11 w-11 md:h-10 md:w-10 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, disabled, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={disabled}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled ?? loading}
        {...props}
      >
        {loading && (
          <svg
            className="size-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export { Button, buttonVariants };
