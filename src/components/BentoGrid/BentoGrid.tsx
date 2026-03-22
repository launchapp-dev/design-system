import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const bentoGridVariants = cva("grid", {
  variants: {
    columns: {
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
    columns: 3,
    gap: "md",
  },
});

export interface BentoGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoGridVariants> {}

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, columns, gap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(bentoGridVariants({ columns, gap }), className)}
        role="grid"
        aria-label="Bento grid layout"
        {...props}
      />
    );
  }
);

BentoGrid.displayName = "BentoGrid";

const bentoCardVariants = cva(
  "rounded-lg border border-border bg-card text-card-foreground shadow-sm overflow-hidden",
  {
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
      },
    },
    defaultVariants: {
      colSpan: 1,
      rowSpan: 1,
    },
  }
);

export interface BentoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoCardVariants> {}

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ className, colSpan, rowSpan, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(bentoCardVariants({ colSpan, rowSpan }), className)}
        role="gridcell"
        {...props}
      />
    );
  }
);

BentoCard.displayName = "BentoCard";

export {
  BentoGrid,
  BentoCard,
  bentoGridVariants,
  bentoCardVariants,
};
