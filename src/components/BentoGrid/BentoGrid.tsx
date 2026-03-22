import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const bentoGridVariants = cva("grid w-full", {
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

const bentoCellVariants = cva("min-h-[120px]", {
  variants: {
    colSpan: {
      1: "col-span-1",
      2: "col-span-1 sm:col-span-2",
      3: "col-span-1 sm:col-span-2 lg:col-span-3",
      4: "col-span-1 sm:col-span-2 lg:col-span-4",
    },
    rowSpan: {
      1: "row-span-1",
      2: "row-span-2",
      3: "row-span-3",
      4: "row-span-4",
    },
  },
  defaultVariants: {
    colSpan: 1,
    rowSpan: 1,
  },
});

export interface BentoCellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoCellVariants> {}

const BentoCell = React.forwardRef<HTMLDivElement, BentoCellProps>(
  ({ className, colSpan, rowSpan, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(bentoCellVariants({ colSpan, rowSpan }), className)}
        {...props}
      />
    );
  }
);
BentoCell.displayName = "BentoCell";

export {
  BentoGrid,
  BentoCell,
  bentoGridVariants,
  bentoCellVariants,
};
