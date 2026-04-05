import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { Badge } from "../../../components/Badge";

const heroSectionBlockVariants = cva("w-full", {
  variants: {
    variant: {
      centered:
        "flex flex-col items-center text-center px-4 py-20 md:py-28 lg:py-36",
      split:
        "grid grid-cols-1 md:grid-cols-2 gap-12 px-4 py-16 md:py-24 lg:py-32 items-center max-w-7xl mx-auto",
      gradient:
        "relative flex flex-col items-center text-center px-4 py-20 md:py-28 lg:py-36 overflow-hidden",
    },
  },
  defaultVariants: {
    variant: "centered",
  },
});

export interface HeroSectionSocialProofMetric {
  value: string;
  label: string;
}

export interface HeroSectionBlockProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof heroSectionBlockVariants> {
  eyebrow?: React.ReactNode;
  headline: React.ReactNode;
  subheadline?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  media?: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
  socialProofMetrics?: HeroSectionSocialProofMetric[];
  logoBar?: React.ReactNode[];
  logoBarLabel?: string;
}

const HeroSectionBlock = React.forwardRef<HTMLElement, HeroSectionBlockProps>(
  (
    {
      className,
      variant = "centered",
      eyebrow,
      headline,
      subheadline,
      primaryAction,
      secondaryAction,
      media,
      gradientFrom = "var(--la-primary)",
      gradientTo = "var(--la-primary, var(--la-primary))",
      socialProofMetrics = [],
      logoBar = [],
      logoBarLabel,
      ...props
    },
    ref
  ) => {
    const renderEyebrow = () => {
      if (!eyebrow) return null;
      return typeof eyebrow === "string" ? (
        <Badge variant="secondary">{eyebrow}</Badge>
      ) : (
        eyebrow
      );
    };

    const renderContent = () => (
      <>
        {eyebrow && <div className="mb-6">{renderEyebrow()}</div>}
        <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-6xl xl:text-7xl">
          {headline}
        </h1>
        {subheadline && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-4">
            {subheadline}
          </p>
        )}
        {(primaryAction || secondaryAction) && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </>
    );

    const renderMedia = () => {
      if (!media) return null;
      return (
        <div className="mt-16 w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl ring-1 ring-border/50">
          {media}
        </div>
      );
    };

    const renderSocialProof = () => {
      if (socialProofMetrics.length === 0 && logoBar.length === 0) return null;
      return (
        <div className="w-full mt-16 pt-12 border-t border-border/50">
          {socialProofMetrics.length > 0 && (
            <div
              className="grid grid-cols-2 gap-8 mb-10 sm:grid-cols-4"
              style={{
                gridTemplateColumns: `repeat(${Math.min(socialProofMetrics.length, 4)}, 1fr)`,
              }}
            >
              {socialProofMetrics.map((metric, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <span className="text-3xl font-bold tracking-tight text-foreground">
                    {metric.value}
                  </span>
                  <span className="text-sm text-muted-foreground mt-1">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}
          {logoBar.length > 0 && (
            <div className="max-w-5xl mx-auto">
              {logoBarLabel && (
                <p className="text-center text-sm text-muted-foreground mb-6">
                  {logoBarLabel}
                </p>
              )}
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {logoBar.map((logo, i) => (
                  <div
                    key={i}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    };

    if (variant === "split") {
      return (
        <section
          ref={ref}
          className={cn(heroSectionBlockVariants({ variant }), className)}
          {...props}
        >
          <div className="flex flex-col gap-6">
            {eyebrow && (
              <div>{renderEyebrow()}</div>
            )}
            <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl xl:text-6xl">
              {headline}
            </h1>
            {subheadline && (
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                {subheadline}
              </p>
            )}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-wrap gap-3 mt-2">
                {primaryAction}
                {secondaryAction}
              </div>
            )}
            {renderSocialProof()}
          </div>
          {media && (
            <div className="flex items-center justify-center rounded-xl overflow-hidden">
              {media}
            </div>
          )}
        </section>
      );
    }

    if (variant === "gradient") {
      return (
        <section
          ref={ref}
          className={cn(heroSectionBlockVariants({ variant }), className)}
          {...props}
        >
          <div
            className="absolute inset-0 opacity-15 dark:opacity-20"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${gradientFrom}, transparent), radial-gradient(ellipse 60% 50% at 80% 100%, ${gradientTo}, transparent)`,
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(var(--la-primary-rgb,99,102,241),0.08),transparent_60%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto gap-6">
            {renderContent()}
            {media && (
              <div className="mt-10 w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl ring-1 ring-border/50">
                {media}
              </div>
            )}
            {renderSocialProof()}
          </div>
        </section>
      );
    }

    return (
      <section
        ref={ref}
        className={cn(heroSectionBlockVariants({ variant }), className)}
        {...props}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {renderContent()}
          {renderMedia()}
          {renderSocialProof()}
        </div>
      </section>
    );
  }
);

HeroSectionBlock.displayName = "HeroSectionBlock";

export { HeroSectionBlock, heroSectionBlockVariants };
