import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const bentoGridVariants = cva("grid", {
  variants: {
    cols: {
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    },
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
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

function BentoGrid({
  className,
  cols,
  gap,
  ref,
  ...props
}: BentoGridProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(bentoGridVariants({ cols, gap }), className)}
      {...props}
    />
  );
}
BentoGrid.displayName = "BentoGrid";

const bentoCardVariants = cva(
  "rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-200 overflow-hidden relative",
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
    VariantProps<typeof bentoCardVariants> {
  icon?: React.ReactNode;
  name?: string;
  description?: string;
  cta?: React.ReactNode;
  background?: React.ReactNode;
}

function BentoCard({
  className,
  span,
  rowSpan,
  hover,
  icon,
  name,
  description,
  cta,
  background,
  children,
  ref,
  ...props
}: BentoCardProps & { ref?: React.Ref<HTMLDivElement> }) {
  const hasStructuredContent = icon || name || description || cta;

  return (
    <div
      ref={ref}
      className={cn(bentoCardVariants({ span, rowSpan, hover }), className)}
      {...props}
    >
      {background && (
        <div className="pointer-events-none absolute inset-0">{background}</div>
      )}
      {hasStructuredContent ? (
        <div className="relative z-10 flex h-full flex-col p-6">
          {icon && (
            <div className="mb-4 w-fit rounded-lg bg-background/80 p-2 text-foreground backdrop-blur-sm">
              {icon}
            </div>
          )}
          <div className="flex-1">
            {name && (
              <h3 className="mb-1 text-lg font-semibold leading-tight">{name}</h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {cta && <div className="mt-4">{cta}</div>}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
BentoCard.displayName = "BentoCard";

export { BentoGrid, bentoGridVariants, BentoCard, bentoCardVariants };
