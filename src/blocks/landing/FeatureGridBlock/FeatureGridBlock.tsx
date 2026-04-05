import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const featureGridBlockVariants = cva("w-full px-4 py-16 md:py-24", {
  variants: {
    variant: {
      default: "",
      bordered: "border-y border-border",
      muted: "bg-muted/50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const featureGridColumnsVariants = cva("grid gap-6", {
  variants: {
    columns: {
      "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      "6": "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
    },
  },
  defaultVariants: {
    columns: "3",
  },
});

const featureCardVariants = cva(
  "group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors",
  {
    variants: {
      interactive: {
        true: "hover:border-primary/50 hover:shadow-sm cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      interactive: false,
    },
  }
);

export interface Feature {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}

export interface FeatureGridBlockProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof featureGridBlockVariants>,
    VariantProps<typeof featureGridColumnsVariants> {
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
  features?: Feature[];
  iconContainerClassName?: string;
  interactive?: boolean;
  centered?: boolean;
}

const FeatureGridBlock = React.forwardRef<HTMLElement, FeatureGridBlockProps>(
  (
    {
      className,
      variant = "default",
      columns = "3",
      headline,
      subheadline,
      features = [],
      iconContainerClassName,
      interactive = false,
      centered = true,
      ...props
    },
    ref
  ) => {
    const renderIcon = (icon?: React.ReactNode) => {
      if (!icon) return null;
      return (
        <div
          className={cn(
            "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary",
            iconContainerClassName
          )}
        >
          {icon}
        </div>
      );
    };

    const renderFeatureCard = (feature: Feature, index: number) => (
      <div
        key={index}
        className={cn(
          featureCardVariants({ interactive }),
          centered && "text-center items-center"
        )}
      >
        {renderIcon(feature.icon)}
        <h3 className="text-lg font-semibold text-foreground">
          {feature.title}
        </h3>
        <p
          className={cn(
            "mt-2 text-sm text-muted-foreground leading-relaxed",
            centered && "max-w-sm"
          )}
        >
          {feature.description}
        </p>
      </div>
    );

    return (
      <section
        ref={ref}
        className={cn(featureGridBlockVariants({ variant }), className)}
        {...props}
      >
        <div className="max-w-6xl mx-auto">
          {(headline || subheadline) && (
            <div
              className={cn(
                "mb-12",
                centered && "text-center"
              )}
            >
              {headline && (
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  {headline}
                </h2>
              )}
              {subheadline && (
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  {subheadline}
                </p>
              )}
            </div>
          )}

          {features.length > 0 && (
            <div className={cn(featureGridColumnsVariants({ columns }))}>
              {features.map((feature, index) => renderFeatureCard(feature, index))}
            </div>
          )}
        </div>
      </section>
    );
  }
);

FeatureGridBlock.displayName = "FeatureGridBlock";

export {
  FeatureGridBlock,
  featureGridBlockVariants,
  featureGridColumnsVariants,
  featureCardVariants,
};
