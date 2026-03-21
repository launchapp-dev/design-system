import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const masonryVariants = cva("columns-1 gap-4", {
  variants: {
    cols: {
      1: "columns-1",
      2: "columns-1 sm:columns-2",
      3: "columns-1 sm:columns-2 lg:columns-3",
      4: "columns-1 sm:columns-2 lg:columns-3 xl:columns-4",
      5: "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5",
    },
    gap: {
      none: "gap-0 [&>*]:mb-0",
      sm: "gap-2 [&>*]:mb-2",
      md: "gap-4 [&>*]:mb-4",
      lg: "gap-6 [&>*]:mb-6",
      xl: "gap-8 [&>*]:mb-8",
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

export interface MasonryItemProps extends React.HTMLAttributes<HTMLDivElement> {
  breakInside?: boolean;
}

const MasonryItem = React.forwardRef<HTMLDivElement, MasonryItemProps>(
  ({ className, breakInside = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "break-inside-avoid",
          breakInside && "break-inside-avoid",
          className
        )}
        {...props}
      />
    );
  }
);
MasonryItem.displayName = "MasonryItem";

export { Masonry, MasonryItem, masonryVariants };
