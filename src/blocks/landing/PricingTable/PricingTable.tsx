import * as React from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../../components/Card";
import { Button } from "../../../components/Button";
import { Switch } from "../../../components/Switch";
import { Badge } from "../../../components/Badge";
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "../../../components/Tooltip";

export interface PricingFeature {
  name: string;
  tooltip?: string;
  included: boolean | string;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  priceLabel?: string;
  periodLabel?: string;
  badge?: string;
  features: PricingFeature[];
  ctaLabel: string;
  ctaAction?: () => void;
  highlighted?: boolean;
  disabled?: boolean;
}

export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  tiers: PricingTier[];
  defaultAnnual?: boolean;
  onToggleChange?: (isAnnual: boolean) => void;
  featureComparisonTitle?: string;
  monthlyLabel?: string;
  annualLabel?: string;
  annualDiscountLabel?: string;
  contactSalesLabel?: string;
  currencySymbol?: string;
}

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-5 w-5 shrink-0", className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-5 w-5 shrink-0", className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const HelpIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-4 w-4 shrink-0 opacity-60", className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const PricingTable = React.forwardRef<HTMLDivElement, PricingTableProps>(
  (
    {
      className,
      title = "Simple, transparent pricing",
      subtitle,
      tiers,
      defaultAnnual = false,
      onToggleChange,
      featureComparisonTitle = "Compare all features",
      monthlyLabel = "Monthly",
      annualLabel = "Annual",
      annualDiscountLabel = "Save up to 20%",
      contactSalesLabel = "Contact sales",
      currencySymbol = "$",
      ...props
    },
    ref
  ) => {
    const [isAnnual, setIsAnnual] = React.useState(defaultAnnual);
    const validTiers = tiers.slice(0, 4);
    const hasMultipleTiers = validTiers.length > 1;

    const handleToggle = (checked: boolean) => {
      setIsAnnual(checked);
      onToggleChange?.(checked);
    };

    const getPriceDisplay = (tier: PricingTier) => {
      if (tier.priceLabel) {
        return tier.priceLabel;
      }
      const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
      if (price === null) {
        return contactSalesLabel;
      }
      return `${currencySymbol}${price}`;
    };

    const getPeriodDisplay = (tier: PricingTier) => {
      if (tier.periodLabel) {
        return tier.periodLabel;
      }
      const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
      if (price === null || tier.priceLabel) {
        return "";
      }
      return isAnnual ? "/year" : "/month";
    };

    const gridCols = {
      1: "grid-cols-1 max-w-md",
      2: "grid-cols-1 md:grid-cols-2 max-w-4xl",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl",
    };

    const allFeatures = React.useMemo(() => {
      const featureMap = new Map<string, { name: string; tooltip?: string }>();
      validTiers.forEach((tier) => {
        tier.features.forEach((feature) => {
          if (!featureMap.has(feature.name)) {
            featureMap.set(feature.name, { name: feature.name, tooltip: feature.tooltip });
          }
        });
      });
      return Array.from(featureMap.values());
    }, [validTiers]);

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <section className="px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{title}</h2>
              {subtitle && <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}

              {hasMultipleTiers && (
                <div className="mt-8 flex items-center justify-center gap-3">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      !isAnnual ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {monthlyLabel}
                  </span>
                  <Switch checked={isAnnual} onCheckedChange={handleToggle} aria-label="Toggle annual billing" />
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isAnnual ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {annualLabel}
                  </span>
                  {annualDiscountLabel && (
                    <Badge variant="secondary" className="ml-2">
                      {annualDiscountLabel}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            <div className={cn("grid gap-6 mx-auto", gridCols[validTiers.length as keyof typeof gridCols])}>
              {validTiers.map((tier) => (
                <Card
                  key={tier.id}
                  className={cn(
                    "flex flex-col relative",
                    tier.highlighted && "border-primary shadow-lg ring-1 ring-primary scale-[1.02]"
                  )}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant={tier.highlighted ? "default" : "secondary"}>{tier.badge}</Badge>
                    </div>
                  )}
                  <CardHeader className="flex-1">
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-foreground">{getPriceDisplay(tier)}</span>
                      {getPeriodDisplay(tier) && (
                        <span className="text-muted-foreground ml-1">{getPeriodDisplay(tier)}</span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          {typeof feature.included === "boolean" ? (
                            feature.included ? (
                              <CheckIcon className="text-primary mt-0.5" />
                            ) : (
                              <XIcon className="text-muted-foreground/40 mt-0.5" />
                            )
                          ) : (
                            <>
                              <CheckIcon className="text-primary mt-0.5" />
                              <span className="sr-only">{feature.included}</span>
                            </>
                          )}
                          <div className="flex items-center gap-1.5 flex-1">
                            <span
                              className={cn(
                                "text-sm",
                                typeof feature.included === "boolean" && !feature.included
                                  ? "text-muted-foreground/60"
                                  : "text-muted-foreground"
                              )}
                            >
                              {typeof feature.included === "string" ? feature.included : feature.name}
                            </span>
                            {feature.tooltip && (
                              <TooltipProvider>
                                <TooltipRoot>
                                  <TooltipTrigger asChild>
                                    <button
                                      type="button"
                                      className="inline-flex items-center justify-center rounded-full hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                      aria-label={`More info about ${feature.name}`}
                                    >
                                      <HelpIcon />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="max-w-xs">
                                    <p>{feature.tooltip}</p>
                                  </TooltipContent>
                                </TooltipRoot>
                              </TooltipProvider>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={tier.highlighted ? "default" : "outline"}
                      onClick={tier.ctaAction}
                      disabled={tier.disabled}
                    >
                      {tier.ctaLabel}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {allFeatures.length > 0 && hasMultipleTiers && (
              <div className="mt-16">
                <h3 className="text-xl font-semibold text-center mb-8">{featureComparisonTitle}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-4 px-4 font-medium text-muted-foreground">Feature</th>
                        {validTiers.map((tier) => (
                          <th
                            key={tier.id}
                            className={cn(
                              "text-center py-4 px-4 font-semibold",
                              tier.highlighted && "text-primary"
                            )}
                          >
                            {tier.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {allFeatures.map((feature, featureIndex) => (
                        <tr key={featureIndex} className="border-b border-border/50">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium">{feature.name}</span>
                              {feature.tooltip && (
                                <TooltipProvider>
                                  <TooltipRoot>
                                    <TooltipTrigger asChild>
                                      <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-full hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        aria-label={`More info about ${feature.name}`}
                                      >
                                        <HelpIcon />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="max-w-xs">
                                      <p>{feature.tooltip}</p>
                                    </TooltipContent>
                                  </TooltipRoot>
                                </TooltipProvider>
                              )}
                            </div>
                          </td>
                          {validTiers.map((tier) => {
                            const tierFeature = tier.features.find((f) => f.name === feature.name);
                            return (
                              <td key={tier.id} className="text-center py-4 px-4">
                                {tierFeature ? (
                                  typeof tierFeature.included === "boolean" ? (
                                    tierFeature.included ? (
                                      <CheckIcon className="mx-auto text-primary" />
                                    ) : (
                                      <XIcon className="mx-auto text-muted-foreground/40" />
                                    )
                                  ) : (
                                    <span className="text-sm font-medium text-foreground">
                                      {tierFeature.included}
                                    </span>
                                  )
                                ) : (
                                  <XIcon className="mx-auto text-muted-foreground/40" />
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
);

PricingTable.displayName = "PricingTable";

export { PricingTable };
export type { PricingTableProps, PricingTier, PricingFeature };
