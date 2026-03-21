import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const bentoGridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
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
    cols: 3,
    gap: "md",
  },
});

export interface BentoGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoGridVariants> {}

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, cols, gap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(bentoGridVariants({ cols, gap }), className)}
        {...props}
      />
    );
  }
);
BentoGrid.displayName = "BentoGrid";

export interface BentoGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3 | 4;
}

const BentoGridItem = React.forwardRef<HTMLDivElement, BentoGridItemProps>(
  ({ className, colSpan = 1, rowSpan = 1, ...props }, ref) => {
    const colSpanClasses: Record<number, string> = {
      1: "col-span-1",
      2: "col-span-1 sm:col-span-2",
      3: "col-span-1 sm:col-span-2 lg:col-span-3",
      4: "col-span-1 sm:col-span-2 lg:col-span-4",
    };

    const rowSpanClasses: Record<number, string> = {
      1: "row-span-1",
      2: "row-span-2",
      3: "row-span-3",
      4: "row-span-4",
    };

    return (
      <div
        ref={ref}
        className={cn(colSpanClasses[colSpan], rowSpanClasses[rowSpan], className)}
        {...props}
      />
    );
  }
);
BentoGridItem.displayName = "BentoGridItem";

export { BentoGrid, BentoGridItem, bentoGridVariants };
