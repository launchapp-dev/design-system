import type * as React from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent } from "../../../components/Card";

export interface Feature {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export interface FeatureGridProps extends React.HTMLAttributes<HTMLElement> {
  features: Feature[];
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
}

function FeatureGrid({ className, features, headline, subheadline, ref, ...props }: FeatureGridProps & { ref?: React.Ref<HTMLElement> }) {
  return (
    <section ref={ref} className={cn("w-full px-4 py-16 md:py-24", className)} {...props}>
      {(headline || subheadline) && (
        <div className="mb-12 text-center space-y-3">
          {headline && (
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {headline}
            </h2>
          )}
          {subheadline && (
            <p className="text-lg text-muted-foreground">{subheadline}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              {feature.icon && (
                <div className="mb-4 text-primary">{feature.icon}</div>
              )}
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

FeatureGrid.displayName = "FeatureGrid";

export { FeatureGrid };
