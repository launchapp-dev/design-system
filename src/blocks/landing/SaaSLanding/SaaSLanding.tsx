import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/Card";
import { cn } from "../../../lib/utils";

export interface SaaSFeature {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export interface SaaSPricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  action: React.ReactNode;
  highlighted?: boolean;
}

export interface SaaSLandingProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: React.ReactNode;
  headline: React.ReactNode;
  subheadline?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  heroMedia?: React.ReactNode;
  featuresTitle?: string;
  featuresSubtitle?: string;
  features?: SaaSFeature[];
  pricingTitle?: string;
  pricingSubtitle?: string;
  pricingTiers?: SaaSPricingTier[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaAction?: React.ReactNode;
}

const SaaSLanding = React.forwardRef<HTMLDivElement, SaaSLandingProps>(
  (
    {
      className,
      badge,
      headline,
      subheadline,
      primaryAction,
      secondaryAction,
      heroMedia,
      featuresTitle = "Everything you need",
      featuresSubtitle,
      features = [],
      pricingTitle = "Simple, transparent pricing",
      pricingSubtitle,
      pricingTiers = [],
      ctaTitle,
      ctaSubtitle,
      ctaAction,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <section className="flex flex-col items-center text-center px-4 py-16 md:py-24 lg:py-32">
          {badge && <div className="mb-6">{badge}</div>}
          <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-6xl max-w-4xl">
            {headline}
          </h1>
          {subheadline && (
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              {subheadline}
            </p>
          )}
          {(primaryAction || secondaryAction) && (
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {primaryAction}
              {secondaryAction}
            </div>
          )}
          {heroMedia && (
            <div className="mt-16 w-full max-w-5xl">{heroMedia}</div>
          )}
        </section>

        {features.length > 0 && (
          <section className="px-4 py-16 md:py-24 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  {featuresTitle}
                </h2>
                {featuresSubtitle && (
                  <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    {featuresSubtitle}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    {feature.icon && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {feature.icon}
                      </div>
                    )}
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {pricingTiers.length > 0 && (
          <section className="px-4 py-16 md:py-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  {pricingTitle}
                </h2>
                {pricingSubtitle && (
                  <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    {pricingSubtitle}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {pricingTiers.map((tier, i) => (
                  <Card
                    key={i}
                    className={cn(
                      tier.highlighted &&
                        "border-primary shadow-lg ring-1 ring-primary",
                    )}
                  >
                    <CardHeader>
                      <CardTitle>{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                      <div className="mt-2">
                        <span className="text-4xl font-bold text-foreground">
                          {tier.price}
                        </span>
                        {tier.period && (
                          <span className="text-muted-foreground ml-1">
                            {tier.period}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {tier.features.map((f, j) => (
                          <li
                            key={j}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <svg
                              className="h-4 w-4 text-primary shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>{tier.action}</CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {(ctaTitle || ctaAction) && (
          <section className="px-4 py-16 md:py-24 bg-primary text-primary-foreground">
            <div className="max-w-3xl mx-auto text-center">
              {ctaTitle && (
                <h2 className="text-3xl font-bold tracking-tight">
                  {ctaTitle}
                </h2>
              )}
              {ctaSubtitle && (
                <p className="mt-4 text-primary-foreground/80">{ctaSubtitle}</p>
              )}
              {ctaAction && <div className="mt-8">{ctaAction}</div>}
            </div>
          </section>
        )}
      </div>
    );
  },
);

SaaSLanding.displayName = "SaaSLanding";

export { SaaSLanding };
