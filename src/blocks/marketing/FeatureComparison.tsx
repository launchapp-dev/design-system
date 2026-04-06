import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import {
  TooltipRoot,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/Tooltip";

// Inline SVG icons (avoiding lucide-react dependency)
function _CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function HelpCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export type ComparisonFeatureValue = boolean | string | React.ReactNode;

export interface ComparisonFeature {
  id: string;
  name: string;
  description?: string;
  values: Record<string, ComparisonFeatureValue>;
}

export interface ComparisonPricingTier {
  id: string;
  name: string;
  description?: string;
  price: {
    monthly: number | string;
    annually: number | string;
  };
  currency?: string;
  popular?: boolean;
  cta: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "secondary" | "outline" | "ghost";
  };
}

export interface FeatureComparisonProps extends React.HTMLAttributes<HTMLElement> {
  tiers: ComparisonPricingTier[];
  features: ComparisonFeature[];
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
  defaultAnnual?: boolean;
  annualDiscountLabel?: string;
  onToggleChange?: (isAnnual: boolean) => void;
  showTooltip?: boolean;
  highlightDifferences?: boolean;
}

function formatPrice(price: number | string, currency: string): string {
  if (typeof price === "string") return price;
  return `${currency}${price}`;
}

function FeatureValueCell({
  value,
  tier,
}: {
  value: ComparisonFeatureValue;
  tier: ComparisonPricingTier;
}) {
  if (typeof value === "boolean") {
    if (value) {
      return (
        <div className="flex items-center justify-center">
          <CheckCircleIcon className="h-5 w-5 text-primary" aria-label="Included" />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center">
        <MinusIcon className="h-5 w-5 text-muted-foreground/40" aria-label="Not included" />
      </div>
    );
  }

  if (typeof value === "string") {
    return (
      <span className={cn("text-sm", tier.popular ? "text-foreground" : "text-muted-foreground")}>
        {value}
      </span>
    );
  }

  return <>{value}</>;
}

function FeatureComparison({
  tiers,
  features,
  headline,
  subheadline,
  defaultAnnual = false,
  annualDiscountLabel = "Save 20%",
  onToggleChange,
  showTooltip = true,
  highlightDifferences = false,
  className,
  ref,
  ...props
}: FeatureComparisonProps & { ref?: React.Ref<HTMLElement> }) {
  const [isAnnual, setIsAnnual] = React.useState(defaultAnnual);

  const handleToggle = () => {
    const newValue = !isAnnual;
    setIsAnnual(newValue);
    onToggleChange?.(newValue);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <section ref={ref} className={cn("w-full py-16 md:py-24", className)} {...props}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          {(headline || subheadline) && (
            <div className="mb-12 text-center">
              {headline && (
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {headline}
                </h2>
              )}
              {subheadline && (
                <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                  {subheadline}
                </p>
              )}
            </div>
          )}

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 min-w-[200px] bg-background p-4 text-left align-bottom">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Compare plans</p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleToggle}
                          className={cn(
                            "text-xs font-medium transition-colors",
                            !isAnnual ? "text-foreground" : "text-muted-foreground"
                          )}
                        >
                          Monthly
                        </button>
                        <button
                          type="button"
                          onClick={handleToggle}
                          className={cn(
                            "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
                            isAnnual ? "bg-primary" : "bg-muted"
                          )}
                          aria-label="Toggle annual billing"
                        >
                          <span
                            className={cn(
                              "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform",
                              isAnnual ? "translate-x-5" : "translate-x-1"
                            )}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={handleToggle}
                          className={cn(
                            "text-xs font-medium transition-colors",
                            isAnnual ? "text-foreground" : "text-muted-foreground"
                          )}
                        >
                          Annual
                        </button>
                        {isAnnual && (
                          <Badge variant="secondary" className="text-xs">
                            {annualDiscountLabel}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </th>
                  {tiers.map((tier) => (
                    <th
                      key={tier.id}
                      className={cn(
                        "min-w-[180px] p-4 text-center align-bottom",
                        tier.popular && "relative bg-primary/5 dark:bg-primary/10"
                      )}
                    >
                      {tier.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge className="bg-primary text-primary-foreground">Most popular</Badge>
                        </div>
                      )}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground">{tier.name}</h3>
                        {tier.description && (
                          <p className="text-xs text-muted-foreground">{tier.description}</p>
                        )}
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-2xl font-bold text-foreground">
                            {formatPrice(
                              isAnnual ? tier.price.annually : tier.price.monthly,
                              tier.currency || "$"
                            )}
                          </span>
                          {typeof (isAnnual ? tier.price.annually : tier.price.monthly) ===
                            "number" && (
                            <span className="text-sm text-muted-foreground">/mo</span>
                          )}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
                {/* CTA Row */}
                <tr>
                  <td className="sticky left-0 z-10 border-t border-border bg-background p-4"></td>
                  {tiers.map((tier) => (
                    <td
                      key={tier.id}
                      className={cn(
                        "border-t border-border p-4",
                        tier.popular && "bg-primary/5 dark:bg-primary/10"
                      )}
                    >
                      <Button
                        variant={tier.cta.variant || (tier.popular ? "default" : "outline")}
                        className="w-full"
                        onClick={tier.cta.onClick}
                        asChild={!!tier.cta.href}
                      >
                        {tier.cta.href ? (
                          <a href={tier.cta.href}>{tier.cta.label}</a>
                        ) : (
                          tier.cta.label
                        )}
                      </Button>
                    </td>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {features.map((feature, index) => {
                  const hasDescription = showTooltip && feature.description;

                  return (
                    <tr
                      key={feature.id}
                      className={cn(
                        index % 2 === 0 && "bg-muted/30",
                        highlightDifferences &&
                          new Set(Object.values(feature.values)).size > 1 &&
                          "bg-amber-50/30 dark:bg-amber-950/10"
                      )}
                    >
                      <td className="sticky left-0 z-10 border-t border-border p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{feature.name}</span>
                          {hasDescription && (
                            <TooltipRoot>
                              <TooltipTrigger asChild>
                                <button type="button" className="text-muted-foreground hover:text-foreground">
                                  <HelpCircleIcon className="h-4 w-4" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="right" className="max-w-xs">
                                <p>{feature.description}</p>
                              </TooltipContent>
                            </TooltipRoot>
                          )}
                        </div>
                      </td>
                      {tiers.map((tier) => (
                        <td
                          key={tier.id}
                          className={cn(
                            "border-t border-border p-4 text-center",
                            tier.popular && "bg-primary/5 dark:bg-primary/10"
                          )}
                        >
                          <FeatureValueCell
                            value={feature.values[tier.id]}
                            tier={tier}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>

              {/* Footer CTA Row */}
              <tfoot>
                <tr>
                  <td className="sticky left-0 z-10 border-t border-border bg-background p-4"></td>
                  {tiers.map((tier) => (
                    <td
                      key={tier.id}
                      className={cn(
                        "border-t border-border p-4",
                        tier.popular && "bg-primary/5 dark:bg-primary/10"
                      )}
                    >
                      <Button
                        variant={tier.cta.variant || (tier.popular ? "default" : "outline")}
                        className="w-full"
                        onClick={tier.cta.onClick}
                        asChild={!!tier.cta.href}
                      >
                        {tier.cta.href ? (
                          <a href={tier.cta.href}>{tier.cta.label}</a>
                        ) : (
                          tier.cta.label
                        )}
                      </Button>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}

FeatureComparison.displayName = "FeatureComparison";

export { FeatureComparison };
