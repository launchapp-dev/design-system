import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../../components/Card";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";
import { Switch } from "../../../components/Switch";

const pricingTableVariants = cva("w-full", {
  variants: {
    variant: {
      default: "",
      gradient: "bg-gradient-to-b from-background to-muted/30 py-16 md:py-24",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number | string;
    annually: number | string;
  };
  currency?: string;
  features: string[];
  cta: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive";
  };
  popular?: boolean;
  disabled?: boolean;
}

export interface PricingTableProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof pricingTableVariants> {
  tiers: PricingTier[];
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
  annualDiscountLabel?: string;
  toggleLabels?: {
    monthly: string;
    annually: string;
  };
  defaultAnnual?: boolean;
  onToggleChange?: (isAnnual: boolean) => void;
  footer?: React.ReactNode;
}

function PricingTable({
  className,
  variant,
  tiers,
  headline,
  subheadline,
  annualDiscountLabel = "Save 20%",
  toggleLabels = { monthly: "Monthly", annually: "Annual" },
  defaultAnnual = false,
  onToggleChange,
  footer,
  ref,
  ...props
}: PricingTableProps & { ref?: React.Ref<HTMLElement> }) {
  const [isAnnual, setIsAnnual] = React.useState(defaultAnnual);

  const handleToggle = () => {
    const newValue = !isAnnual;
    setIsAnnual(newValue);
    onToggleChange?.(newValue);
  };

  return (
    <section
      ref={ref}
      className={cn(pricingTableVariants({ variant }), className)}
      {...props}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        {(headline || subheadline) && (
          <div className="text-center mb-10">
            {headline && (
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                {headline}
              </h2>
            )}
            {subheadline && (
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                {subheadline}
              </p>
            )}
          </div>
        )}

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              !isAnnual ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {toggleLabels.monthly}
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={handleToggle}
            aria-label={`Switch to ${isAnnual ? toggleLabels.monthly : toggleLabels.annually} billing`}
          />
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              isAnnual ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {toggleLabels.annually}
          </span>
          {isAnnual && (
            <Badge variant="secondary" className="ml-1">
              {annualDiscountLabel}
            </Badge>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => {
            const price = isAnnual ? tier.price.annually : tier.price.monthly;
            const isNumericPrice = typeof price === "number";

            return (
              <Card
                key={tier.id}
                className={cn(
                  "flex flex-col relative",
                  tier.popular &&
                    "border-primary shadow-lg shadow-primary/10 md:-mt-4 md:mb-4"
                )}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold">
                      Most popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-semibold mb-1">
                    {tier.name}
                  </CardTitle>
                  <div className="flex items-baseline gap-1 mb-2">
                    {isNumericPrice && (
                      <span className="text-4xl font-bold text-foreground">
                        {tier.currency || "\$"}
                        {price}
                      </span>
                    )}
                    {!isNumericPrice && (
                      <span className="text-4xl font-bold text-foreground">
                        {price}
                      </span>
                    )}
                    {isNumericPrice && (
                      <span className="text-sm text-muted-foreground">
                        /mo{isAnnual ? " · billed annually" : ""}
                      </span>
                    )}
                  </div>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm">
                        <svg
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            tier.popular ? "text-primary" : "text-muted-foreground"
                          )}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    variant={tier.cta.variant || (tier.popular ? "default" : "outline")}
                    className="w-full"
                    onClick={tier.cta.onClick}
                    disabled={tier.disabled}
                    asChild={!!tier.cta.href}
                  >
                    {tier.cta.href ? (
                      <a href={tier.cta.href}>{tier.cta.label}</a>
                    ) : (
                      tier.cta.label
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        {footer && (
          <div className="mt-10 text-center">
            {footer}
          </div>
        )}
      </div>
    </section>
  );
}

PricingTable.displayName = "PricingTable";

export { PricingTable, pricingTableVariants };
