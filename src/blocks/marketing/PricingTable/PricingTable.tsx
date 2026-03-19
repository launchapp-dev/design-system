import * as React from "react";
import { cn } from "../../../lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../components/Card";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";
import { Separator } from "../../../components/Separator";

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaLabel: string;
  onCtaClick?: () => void;
  popular?: boolean;
  badge?: string;
}

export interface PricingTableProps extends React.HTMLAttributes<HTMLElement> {
  tiers: PricingTier[];
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
}

const PricingTable = React.forwardRef<HTMLElement, PricingTableProps>(
  ({ className, tiers, headline, subheadline, ...props }, ref) => (
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {tiers.map((tier, i) => (
          <Card
            key={i}
            className={cn(
              "relative flex flex-col",
              tier.popular && "border-primary shadow-lg ring-2 ring-primary"
            )}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge>{tier.badge ?? "Most Popular"}</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{tier.name}</CardTitle>
              <div className="mt-2">
                <span className="text-4xl font-bold text-foreground">{tier.price}</span>
              </div>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <Separator className="mb-4" />
              <ul className="space-y-2">
                {tier.features.map((feature, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="text-primary" aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={tier.popular ? "default" : "outline"}
                onClick={tier.onCtaClick}
              >
                {tier.ctaLabel}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
);

PricingTable.displayName = "PricingTable";

export { PricingTable };
