import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const bentoGridVariants = cva("grid", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      auto: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
    },
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
  },
  defaultVariants: {
    columns: 3,
    gap: "md",
  },
});

export interface BentoGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoGridVariants> {
  children: React.ReactNode;
}

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, columns, gap, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(bentoGridVariants({ columns, gap }), className)}
        role="grid"
        aria-label="Bento grid layout"
        {...props}
      >
        {children}
      </div>
    );
  },
);
BentoGrid.displayName = "BentoGrid";

const bentoCardVariants = cva(
  "group relative rounded-[--la-radius] border border-border bg-card text-card-foreground overflow-hidden transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-card",
        gradient: "bg-gradient-to-br from-primary/10 via-card to-secondary/10",
        accent: "bg-accent/50",
        outlined: "bg-transparent border-2",
      },
      hover: {
        none: "",
        lift: "hover:shadow-lg hover:-translate-y-1",
        glow: "hover:shadow-[0_0_20px_rgba(var(--la-primary-rgb),0.3)]",
        scale: "hover:scale-[1.02]",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "lift",
    },
  },
);

export interface BentoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoCardVariants> {
  colSpan?: 1 | 2 | 3 | 4 | "full";
  rowSpan?: 1 | 2 | 3;
  icon?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const colSpanClasses: Record<1 | 2 | 3 | 4 | "full", string> = {
  1: "",
  2: "col-span-1 sm:col-span-2",
  3: "col-span-1 lg:col-span-3",
  4: "col-span-1 lg:col-span-4",
  full: "col-span-full",
};

const rowSpanClasses: Record<1 | 2 | 3, string> = {
  1: "",
  2: "row-span-2",
  3: "row-span-3",
};

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  (
    {
      className,
      variant,
      hover,
      colSpan = 1,
      rowSpan = 1,
      icon,
      header,
      footer,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          bentoCardVariants({ variant, hover }),
          colSpanClasses[colSpan],
          rowSpanClasses[rowSpan],
          "flex flex-col",
          className,
        )}
        role="gridcell"
        {...props}
      >
        {icon && (
          <div className="mb-3 flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        {header && <div className="bento-card-header mb-2">{header}</div>}
        <div className="bento-card-body flex-1">{children}</div>
        {footer && (
          <div className="bento-card-footer mt-auto pt-4 border-t border-border/50">
            {footer}
          </div>
        )}
      </div>
    );
  },
);
BentoCard.displayName = "BentoCard";

const BentoCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("bento-card-header mb-2", className)}
    {...props}
  />
));
BentoCardHeader.displayName = "BentoCardHeader";

const BentoCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-tight tracking-tight",
      className,
    )}
    {...props}
  />
));
BentoCardTitle.displayName = "BentoCardTitle";

const BentoCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground mt-1", className)}
    {...props}
  />
));
BentoCardDescription.displayName = "BentoCardDescription";

const BentoCardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("bento-card-body flex-1 p-4", className)}
    {...props}
  />
));
BentoCardBody.displayName = "BentoCardBody";

const BentoCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bento-card-footer mt-auto pt-3 px-4 pb-4 border-t border-border/50",
      className,
    )}
    {...props}
  />
));
BentoCardFooter.displayName = "BentoCardFooter";

export type BentoGridVariantsProps = VariantProps<typeof bentoGridVariants>;
export type BentoCardVariantsProps = VariantProps<typeof bentoCardVariants>;

export type BentoGridVariants = VariantProps<typeof bentoGridVariants>;
export type BentoCardVariants = VariantProps<typeof bentoCardVariants>;

export {
  BentoCard,
  BentoCardBody,
  BentoCardDescription,
  BentoCardFooter,
  BentoCardHeader,
  BentoCardTitle,
  BentoGrid,
  bentoCardVariants,
  bentoGridVariants,
};
