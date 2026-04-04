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
      gradientFrom = "var(--color-primary)",
      gradientTo = "var(--color-secondary, var(--color-primary))",
      ...props
    },
    ref
  ) => {
    if (variant === "split") {
      return (
        <section
          ref={ref}
          className={cn(heroSectionBlockVariants({ variant }), className)}
          {...props}
        >
          <div className="flex flex-col gap-6">
            {eyebrow && (
              <div>
                {typeof eyebrow === "string" ? (
                  <Badge variant="secondary">{eyebrow}</Badge>
                ) : (
                  eyebrow
                )}
              </div>
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
              <div className="flex flex-wrap gap-3">
                {primaryAction}
                {secondaryAction}
              </div>
            )}
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
            {eyebrow && (
              <div>
                {typeof eyebrow === "string" ? (
                  <Badge variant="secondary">{eyebrow}</Badge>
                ) : (
                  eyebrow
                )}
              </div>
            )}
            <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-6xl xl:text-7xl">
              {headline}
            </h1>
            {subheadline && (
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {subheadline}
              </p>
            )}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {primaryAction}
                {secondaryAction}
              </div>
            )}
            {media && (
              <div className="mt-10 w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl ring-1 ring-border/50">
                {media}
              </div>
            )}
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
        {eyebrow && (
          <div className="mb-6">
            {typeof eyebrow === "string" ? (
              <Badge variant="secondary">{eyebrow}</Badge>
            ) : (
              eyebrow
            )}
          </div>
        )}
        <div className="max-w-4xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-6xl xl:text-7xl">
            {headline}
          </h1>
          {subheadline && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {subheadline}
            </p>
          )}
        </div>
        {(primaryAction || secondaryAction) && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {primaryAction}
            {secondaryAction}
          </div>
        )}
        {media && (
          <div className="mt-16 w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl ring-1 ring-border/50">
            {media}
          </div>
        )}
      </section>
    );
  }
);

HeroSectionBlock.displayName = "HeroSectionBlock";

export { HeroSectionBlock, heroSectionBlockVariants };
