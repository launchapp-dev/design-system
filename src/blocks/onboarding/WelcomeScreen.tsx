import * as React from "react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export interface WelcomeFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface WelcomeScreenProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  features?: WelcomeFeature[];
  ctaLabel?: string;
  onCta?: () => void;
  secondaryCtaLabel?: string;
  onSecondaryCta?: () => void;
  logoSrc?: string;
  logoAlt?: string;
}

const WelcomeScreen = React.forwardRef<HTMLDivElement, WelcomeScreenProps>(
  (
    {
      title = "Welcome aboard!",
      description = "Get started in minutes. We'll walk you through everything you need to know.",
      features = [],
      ctaLabel = "Get started",
      onCta,
      secondaryCtaLabel,
      onSecondaryCta,
      logoSrc,
      logoAlt = "Logo",
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center gap-10 px-4 py-12 text-center sm:px-8",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-4">
        {logoSrc && <img src={logoSrc} alt={logoAlt} className="h-14 w-auto" />}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mx-auto max-w-md text-base text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={onCta}>
            {ctaLabel}
          </Button>
          {secondaryCtaLabel && (
            <Button size="lg" variant="outline" onClick={onSecondaryCta}>
              {secondaryCtaLabel}
            </Button>
          )}
        </div>
      </div>

      {features.length > 0 && (
        <div className="w-full max-w-3xl">
          <ul
            className={cn(
              "grid gap-6",
              features.length === 2 && "sm:grid-cols-2",
              features.length >= 3 && "sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ),
);
WelcomeScreen.displayName = "WelcomeScreen";

export { WelcomeScreen };
