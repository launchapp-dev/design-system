import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const heroSectionVariants = cva("w-full", {
  variants: {
    variant: {
      centered: "flex flex-col items-center text-center px-4 py-16 md:py-24 lg:py-32",
      split: "grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-16 md:py-24 items-center",
      minimal: "flex flex-col px-4 py-16 md:py-24 lg:py-32",
      imageBackground: "relative flex flex-col items-center text-center px-4 py-24 md:py-32 lg:py-48 overflow-hidden",
    },
  },
  defaultVariants: {
    variant: "centered",
  },
});

export interface HeroSectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof heroSectionVariants> {
  badge?: React.ReactNode;
  headline: React.ReactNode;
  subheadline?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  media?: React.ReactNode;
  backgroundImageSrc?: string;
}

function HeroSection({
      className,
      variant,
      badge,
      headline,
      subheadline,
      primaryAction,
      secondaryAction,
      media,
      backgroundImageSrc, ref,
      ...props
    }: HeroSectionProps & { ref?: React.Ref<HTMLElement> }) {
    if (variant === "imageBackground") {
      return (
        <section
          ref={ref}
          className={cn(heroSectionVariants({ variant }), className)}
          {...props}
        >
          {backgroundImageSrc && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImageSrc})` }}
              aria-hidden="true"
            />
          )}
          <div className="absolute inset-0 bg-background/70" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl space-y-6">
            {badge}
            <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
              {headline}
            </h1>
            {subheadline && (
              <p className="text-lg text-muted-foreground">{subheadline}</p>
            )}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-wrap justify-center gap-3">
                {primaryAction}
                {secondaryAction}
              </div>
            )}
          </div>
        </section>
      );
    }

    if (variant === "split") {
      return (
        <section
          ref={ref}
          className={cn(heroSectionVariants({ variant }), className)}
          {...props}
        >
          <div className="flex flex-col gap-6">
            {badge}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                {headline}
              </h1>
              {subheadline && (
                <p className="text-lg text-muted-foreground">{subheadline}</p>
              )}
            </div>
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-wrap gap-3">
                {primaryAction}
                {secondaryAction}
              </div>
            )}
          </div>
          {media && (
            <div className="flex items-center justify-center">{media}</div>
          )}
        </section>
      );
    }

    if (variant === "minimal") {
      return (
        <section
          ref={ref}
          className={cn(heroSectionVariants({ variant }), className)}
          {...props}
        >
          <div className="max-w-3xl space-y-8">
            <h1 className="text-6xl font-bold tracking-tight text-foreground lg:text-7xl">
              {headline}
            </h1>
            {subheadline && (
              <p className="text-xl text-muted-foreground">{subheadline}</p>
            )}
            {primaryAction}
          </div>
        </section>
      );
    }

    return (
      <section
        ref={ref}
        className={cn(heroSectionVariants({ variant }), className)}
        {...props}
      >
        {badge}
        <div className="mt-4 max-w-2xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
            {headline}
          </h1>
          {subheadline && (
            <p className="text-lg text-muted-foreground">{subheadline}</p>
          )}
        </div>
        {(primaryAction || secondaryAction) && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </section>
    );
  }

HeroSection.displayName = "HeroSection";

export { HeroSection, heroSectionVariants };
