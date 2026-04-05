import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const ctaSectionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "px-4 py-16 md:py-24",
      minimal: "px-4 py-12 md:py-16",
      hero: "px-4 py-20 md:py-32",
    },
    background: {
      default: "bg-background",
      muted: "bg-muted/30",
      primary: "bg-primary text-primary-foreground",
      gradient: "bg-gradient-to-br from-primary/10 via-background to-primary/5",
    },
  },
  defaultVariants: {
    variant: "default",
    background: "default",
  },
});

export interface CTASectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof ctaSectionVariants> {
  headline: React.ReactNode;
  subtext?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  align?: "left" | "center";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const CTASection = React.forwardRef<HTMLElement, CTASectionProps>(
  (
    {
      className,
      variant = "default",
      background = "default",
      headline,
      subtext,
      primaryAction,
      secondaryAction,
      align = "center",
      maxWidth = "lg",
      ...props
    },
    ref
  ) => {
    const isCenter = align === "center";

    const containerClass = (() => {
      switch (maxWidth) {
        case "sm": return "max-w-2xl";
        case "md": return "max-w-4xl";
        case "lg": return "max-w-5xl";
        case "xl": return "max-w-6xl";
        case "2xl": return "max-w-7xl";
        default: return "max-w-5xl";
      }
    })();

    return (
      <section
        ref={ref}
        className={cn(ctaSectionVariants({ variant, background }), className)}
        {...props}
      >
        <div
          className={cn(
            containerClass,
            "mx-auto",
            isCenter ? "text-center" : "text-left",
            isCenter && "flex flex-col items-center"
          )}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-5xl">
            {headline}
          </h2>
          {subtext && (
            <p
              className={cn(
                "mt-4 text-lg text-muted-foreground",
                isCenter && "max-w-xl"
              )}
            >
              {subtext}
            </p>
          )}
          {(primaryAction || secondaryAction) && (
            <div
              className={cn(
                "mt-8 flex flex-wrap gap-4",
                isCenter && "justify-center"
              )}
            >
              {primaryAction}
              {secondaryAction}
            </div>
          )}
        </div>
      </section>
    );
  }
);

CTASection.displayName = "CTASection";

export { CTASection, ctaSectionVariants };
