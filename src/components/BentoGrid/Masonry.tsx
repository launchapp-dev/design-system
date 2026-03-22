import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const masonryVariants = cva("w-full", {
  variants: {
    columns: {
      1: "columns-1",
      2: "columns-1 sm:columns-2",
      3: "columns-1 sm:columns-2 lg:columns-3",
      4: "columns-1 sm:columns-2 lg:columns-3 xl:columns-4",
      5: "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
  },
  defaultVariants: {
    columns: 3,
    gap: "md",
  },
});

export interface MasonryProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof masonryVariants> {}

const Masonry = React.forwardRef<HTMLDivElement, MasonryProps>(
  ({ className, columns, gap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(masonryVariants({ columns, gap }), className)}
        {...props}
      />
    );
  }
);
Masonry.displayName = "Masonry";

const masonryItemVariants = cva("break-inside-avoid mb-0", {
  variants: {
    gap: {
      none: "mb-0",
      sm: "mb-2",
      md: "mb-4",
      lg: "mb-6",
      xl: "mb-8",
    },
  },
  defaultVariants: {
    gap: "md",
  },
});

export interface MasonryItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof masonryItemVariants> {}

const MasonryItem = React.forwardRef<HTMLDivElement, MasonryItemProps>(
  ({ className, gap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(masonryItemVariants({ gap }), className)}
        {...props}
      />
    );
  }
);
MasonryItem.displayName = "MasonryItem";

export {
  Masonry,
  MasonryItem,
  masonryVariants,
  masonryItemVariants,
};
