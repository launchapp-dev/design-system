import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[--ag-radius] font-medium ring-offset-[hsl(var(--ag-background))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ag-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--ag-primary))] text-[hsl(var(--ag-primary-foreground))] hover:bg-[hsl(var(--ag-primary)/0.9)]",
        destructive:
          "bg-[hsl(var(--ag-destructive))] text-[hsl(var(--ag-destructive-foreground))] hover:bg-[hsl(var(--ag-destructive)/0.9)]",
        outline:
          "border border-[hsl(var(--ag-input))] bg-[hsl(var(--ag-background))] hover:bg-[hsl(var(--ag-accent))] hover:text-[hsl(var(--ag-accent-foreground))]",
        secondary:
          "bg-[hsl(var(--ag-secondary))] text-[hsl(var(--ag-secondary-foreground))] hover:bg-[hsl(var(--ag-secondary)/0.8)]",
        ghost:
          "hover:bg-[hsl(var(--ag-accent))] hover:text-[hsl(var(--ag-accent-foreground))]",
        link: "text-[hsl(var(--ag-primary))] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 rounded-[--ag-radius] px-3 text-sm",
        md: "h-10 px-4 py-2 text-sm",
        lg: "h-11 rounded-[--ag-radius] px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
