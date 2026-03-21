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
      5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
      6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
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

const bentoCardVariants = cva(
  "group relative overflow-hidden rounded-lg border border-[hsl(var(--la-border))] bg-[hsl(var(--la-card))] p-4 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "hover:border-[hsl(var(--la-primary)/0.5)] hover:shadow-lg",
        gradient: "border-0 hover:shadow-xl",
        glass:
          "border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 dark:border-white/10 dark:bg-white/5",
        outline:
          "bg-transparent hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1 hover:shadow-xl",
        glow: "hover:shadow-[0_0_20px_hsl(var(--la-primary)/0.3)]",
        scale: "hover:scale-[1.02]",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "lift",
    },
  }
);

const spanColMap = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  full: "col-span-full",
} as const;

const spanRowMap = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  full: "row-span-full",
} as const;

type SpanValue = 1 | 2 | 3 | 4 | 5 | 6 | "full";
type RowSpanValue = 1 | 2 | 3 | 4 | "full";

export interface BentoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoCardVariants> {
  colSpan?: SpanValue;
  rowSpan?: RowSpanValue;
  gradient?: string;
  icon?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  (
    {
      className,
      variant,
      hover,
      colSpan,
      rowSpan,
      gradient,
      icon,
      header,
      footer,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const colSpanClass = colSpan ? spanColMap[colSpan] : "";
    const rowSpanClass = rowSpan ? spanRowMap[rowSpan] : "";

    return (
      <div
        ref={ref}
        className={cn(
          bentoCardVariants({ variant, hover }),
          colSpanClass,
          rowSpanClass,
          className
        )}
        style={{
          ...style,
          ...(gradient && variant === "gradient"
            ? { background: gradient }
            : {}),
        }}
        {...props}
      >
        {gradient && variant === "gradient" && (
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, transparent 0%, ${gradient}80 100%)`,
            }}
            aria-hidden="true"
          />
        )}
        {icon && (
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--la-primary)/0.1)] text-[hsl(var(--la-primary))]">
            {icon}
          </div>
        )}
        {header && <div className="mb-2">{header}</div>}
        <div className="relative z-10">{children}</div>
        {footer && <div className="mt-3">{footer}</div>}
      </div>
    );
  }
);
BentoCard.displayName = "BentoCard";

export interface BentoCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

const BentoCardHeader = React.forwardRef<HTMLDivElement, BentoCardHeaderProps>(
  ({ className, title, description, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mb-2", className)} {...props}>
        <h3 className="text-lg font-semibold text-[hsl(var(--la-card-foreground))]">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-[hsl(var(--la-muted-foreground))]">
            {description}
          </p>
        )}
      </div>
    );
  }
);
BentoCardHeader.displayName = "BentoCardHeader";

const BentoCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mt-auto flex items-center gap-2 pt-3 text-sm text-[hsl(var(--la-muted-foreground))]",
        className
      )}
      {...props}
    />
  );
});
BentoCardFooter.displayName = "BentoCardFooter";

export type BentoCardFooterProps = React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> };

export {
  BentoGrid,
  BentoCard,
  BentoCardHeader,
  BentoCardFooter,
  bentoGridVariants,
  bentoCardVariants,
};
