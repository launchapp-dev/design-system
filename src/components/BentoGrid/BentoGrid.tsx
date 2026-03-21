import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const bentoGridVariants = cva(
  "grid gap-4",
  {
    variants: {
      cols: {
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
      },
    },
    defaultVariants: {
      cols: 3,
    },
  }
);

export interface BentoGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoGridVariants> {}

function BentoGrid({ className, cols, ref, ...props }: BentoGridProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(bentoGridVariants({ cols }), className)}
      {...props}
    />
  );
}
BentoGrid.displayName = "BentoGrid";

const bentoCardVariants = cva(
  "rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-200 overflow-hidden",
  {
    variants: {
      span: {
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3",
      },
      rowSpan: {
        1: "row-span-1",
        2: "row-span-2",
      },
      hover: {
        default: "hover:shadow-md hover:-translate-y-0.5",
        glow: "hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5",
        scale: "hover:scale-[1.02]",
        none: "",
      },
    },
    defaultVariants: {
      span: 1,
      rowSpan: 1,
      hover: "default",
    },
  }
);

export interface BentoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoCardVariants> {}

function BentoCard({ className, span, rowSpan, hover, ref, ...props }: BentoCardProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(bentoCardVariants({ span, rowSpan, hover }), className)}
      {...props}
    />
  );
}
BentoCard.displayName = "BentoCard";

export { BentoGrid, bentoGridVariants, BentoCard, bentoCardVariants };
