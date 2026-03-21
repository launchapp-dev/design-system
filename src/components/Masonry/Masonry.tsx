import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const masonryVariants = cva("", {
  variants: {
    cols: {
      1: "columns-1",
      2: "columns-1 sm:columns-2",
      3: "columns-1 sm:columns-2 md:columns-3",
      4: "columns-1 sm:columns-2 md:columns-3 lg:columns-4",
      5: "columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5",
      6: "columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
  },
  defaultVariants: {
    cols: 3,
    gap: "md",
  },
});

export interface MasonryProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof masonryVariants> {}

const Masonry = React.forwardRef<HTMLDivElement, MasonryProps>(
  ({ className, cols, gap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(masonryVariants({ cols, gap }), className)}
        {...props}
      />
    );
  }
);
Masonry.displayName = "Masonry";

const masonryItemVariants = cva(
  "break-inside-avoid overflow-hidden",
  {
    variants: {
      variant: {
        default: "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
        outlined: "rounded-xl border-2 border-border bg-transparent",
        elevated: "rounded-xl bg-card text-card-foreground shadow-lg",
        flat: "bg-muted/50",
        ghost: "bg-transparent",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
      hover: {
        default: "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
        glow: "transition-all duration-200 hover:shadow-lg hover:shadow-primary/20",
        scale: "transition-all duration-200 hover:scale-[1.02]",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      hover: "default",
    },
  }
);

export interface MasonryItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof masonryItemVariants> {}

const MasonryItem = React.forwardRef<HTMLDivElement, MasonryItemProps>(
  ({ className, variant, padding, hover, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(masonryItemVariants({ variant, padding, hover }), className)}
        {...props}
      />
    );
  }
);
MasonryItem.displayName = "MasonryItem";

export { Masonry, masonryVariants, MasonryItem, masonryItemVariants };
