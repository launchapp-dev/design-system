import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const bentoGridVariants = cva("grid", {
  variants: {
    cols: {
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
      6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    auto: {
      true: "auto-rows-fr",
      false: "",
    },
    dense: {
      true: "grid-flow-dense",
      false: "",
    },
  },
  defaultVariants: {
    cols: 3,
    gap: "md",
    auto: false,
    dense: false,
  },
});

export interface BentoGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoGridVariants> {}

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, cols, gap, auto, dense, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(bentoGridVariants({ cols, gap, auto, dense }), className)}
        {...props}
      />
    );
  }
);
BentoGrid.displayName = "BentoGrid";

const bentoCardVariants = cva(
  "rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-200 overflow-hidden relative",
  {
    variants: {
      span: {
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3",
        4: "col-span-4",
        5: "col-span-5",
        6: "col-span-6",
        full: "col-span-full",
      },
      rowSpan: {
        1: "row-span-1",
        2: "row-span-2",
        3: "row-span-3",
        full: "row-span-full",
      },
      hover: {
        default: "hover:shadow-md hover:-translate-y-0.5",
        glow: "hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5",
        scale: "hover:scale-[1.02]",
        lift: "hover:-translate-y-2 hover:shadow-xl",
        none: "",
      },
      gradient: {
        none: "",
        primary: "bg-gradient-to-br from-primary/20 via-primary/10 to-transparent",
        secondary: "bg-gradient-to-br from-secondary/20 via-secondary/10 to-transparent",
        accent: "bg-gradient-to-br from-accent/20 via-accent/10 to-transparent",
        destructive: "bg-gradient-to-br from-destructive/20 via-destructive/10 to-transparent",
        blue: "bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent",
        purple: "bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent",
        pink: "bg-gradient-to-br from-pink-500/20 via-pink-500/10 to-transparent",
        green: "bg-gradient-to-br from-green-500/20 via-green-500/10 to-transparent",
        orange: "bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent",
        cyan: "bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-transparent",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      span: 1,
      rowSpan: 1,
      hover: "default",
      gradient: "none",
      padding: "md",
    },
  }
);

export interface BentoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoCardVariants> {
  icon?: React.ReactNode;
  name?: string;
  description?: React.ReactNode;
  cta?: React.ReactNode;
  background?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  (
    {
      className,
      span,
      rowSpan,
      hover,
      gradient,
      padding,
      icon,
      name,
      description,
      cta,
      background,
      header,
      footer,
      children,
      ...props
    },
    ref
  ) => {
    const hasStructuredContent = icon || name || description || cta || header || footer;

    return (
      <div
        ref={ref}
        className={cn(bentoCardVariants({ span, rowSpan, hover, gradient, padding }), className)}
        {...props}
      >
        {background && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {background}
          </div>
        )}
        {hasStructuredContent ? (
          <div className="relative z-10 flex h-full flex-col">
            {header && <div className="mb-4">{header}</div>}
            {icon && (
              <div className="mb-4 w-fit rounded-lg bg-background/80 p-2.5 text-foreground backdrop-blur-sm">
                {icon}
              </div>
            )}
            <div className="flex-1">
              {name && (
                <h3 className="mb-1.5 text-lg font-semibold leading-tight">{name}</h3>
              )}
              {description && (
                <div className="text-sm text-muted-foreground">{description}</div>
              )}
            </div>
            {cta && <div className="mt-4">{cta}</div>}
            {footer && <div className="mt-4">{footer}</div>}
          </div>
        ) : (
          children
        )}
      </div>
    );
  }
);
BentoCard.displayName = "BentoCard";

export { BentoGrid, bentoGridVariants, BentoCard, bentoCardVariants };
