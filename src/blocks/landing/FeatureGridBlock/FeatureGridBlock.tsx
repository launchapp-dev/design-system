import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/Card";
import { Badge } from "../../../components/Badge";

const featureGridBlockVariants = cva("w-full", {
  variants: {
    variant: {
      default: "px-4 py-16 md:py-24",
      minimal: "px-4 py-12 md:py-16",
      rich: "px-4 py-16 md:py-24",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const gridCols = cva("grid gap-6", {
  variants: {
    cols: {
      "2": "grid-cols-1 sm:grid-cols-2",
      "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      "auto": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    },
  },
  defaultVariants: {
    cols: "3",
  },
});

export interface FeatureItem {
  icon?: React.ReactNode;
  badge?: string;
  title: string;
  description: React.ReactNode;
  action?: React.ReactNode;
}

export interface FeatureGridBlockProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof featureGridBlockVariants>,
    VariantProps<typeof gridCols> {
  eyebrow?: React.ReactNode;
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
  features: FeatureItem[];
  featuredIndex?: number;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  align?: "left" | "center";
}

const maxWidthMap = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  full: "max-w-full",
};

const FeatureGridBlock = React.forwardRef<HTMLElement, FeatureGridBlockProps>(
  (
    {
      className,
      variant = "default",
      cols = "3",
      eyebrow,
      headline,
      subheadline,
      features = [],
      featuredIndex,
      maxWidth = "lg",
      align = "center",
      ...props
    },
    ref
  ) => {
    const containerClass = maxWidthMap[maxWidth];
    const isCenter = align === "center";

    const renderHeader = () => {
      if (!eyebrow && !headline && !subheadline) return null;
      return (
        <div className={cn("mb-12", isCenter ? "text-center" : "text-left", "space-y-3")}>
          {eyebrow && (
            <div className={cn(!isCenter && "-ml-1")}>
              {typeof eyebrow === "string" ? (
                <Badge variant="secondary">{eyebrow}</Badge>
              ) : (
                eyebrow
              )}
            </div>
          )}
          {headline && (
            <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              {headline}
            </h2>
          )}
          {subheadline && (
            <p
              className={cn(
                "text-lg text-muted-foreground",
                isCenter && "max-w-2xl mx-auto"
              )}
            >
              {subheadline}
            </p>
          )}
        </div>
      );
    };

    const renderFeatureCard = (feature: FeatureItem, index: number) => {
      const isFeatured = featuredIndex === index;
      const isRich = variant === "rich";

      return (
        <Card
          key={index}
          className={cn(
            "group relative transition-all duration-200",
            isFeatured && "ring-2 ring-primary/20 shadow-md",
            isRich && "hover:shadow-md"
          )}
        >
          <CardHeader className={cn("pb-2", isCenter && "text-center")}>
            {feature.badge && (
              <div className={cn("mb-3", !isCenter && "-ml-1")}>
                <Badge variant="outline" className="text-xs font-medium">
                  {feature.badge}
                </Badge>
              </div>
            )}
            {feature.icon && (
              <div
                className={cn(
                  "mb-4 text-primary",
                  isCenter && "mx-auto",
                  isRich && "w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"
                )}
              >
                {isRich ? (
                  <div className="text-primary">{feature.icon}</div>
                ) : (
                  <div className="w-10 h-10">{feature.icon}</div>
                )}
              </div>
            )}
            <CardTitle
              className={cn(
                "text-base font-semibold leading-snug",
                isRich && "text-lg"
              )}
            >
              {feature.title}
            </CardTitle>
          </CardHeader>
          <CardContent
            className={cn(
              "pt-0",
              isCenter && "text-center",
              !isCenter && feature.action && "flex flex-col gap-4"
            )}
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
            {feature.action && (
              <div className={cn(!isCenter && "mt-auto")}>
                {feature.action}
              </div>
            )}
          </CardContent>
        </Card>
      );
    };

    return (
      <section
        ref={ref}
        className={cn(featureGridBlockVariants({ variant }), className)}
        {...props}
      >
        <div className={cn(containerClass, "mx-auto", isCenter ? "text-center" : "text-left")}>
          {renderHeader()}
          <div className={gridCols({ cols })}>
            {features.map((feature, i) => renderFeatureCard(feature, i))}
          </div>
        </div>
      </section>
    );
  }
);

FeatureGridBlock.displayName = "FeatureGridBlock";

export { FeatureGridBlock, featureGridBlockVariants, gridCols };
