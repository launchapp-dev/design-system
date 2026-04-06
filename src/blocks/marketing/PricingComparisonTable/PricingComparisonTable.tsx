import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";
import { TooltipRoot, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/Tooltip";

// ── Icons (inline SVG to avoid lucide-react dep in block layer) ──────────────

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-primary", className)}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-muted-foreground/40", className)}
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-muted-foreground", className)}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type FeatureValue = boolean | string | number | null;

export interface ComparisonFeature {
  /** Feature display name */
  name: string;
  /** Optional tooltip description */
  description?: string;
  /** Category for grouping */
  category?: string;
  /** Value per plan id */
  values: Record<string, FeatureValue>;
}

export interface ComparisonPlan {
  id: string;
  name: string;
  description?: string;
  price: {
    monthly: number | string;
    annually: number | string;
  };
  currency?: string;
  badge?: string;
  popular?: boolean;
  cta: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "secondary" | "outline" | "ghost";
  };
}

export interface PricingComparisonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  plans: ComparisonPlan[];
  features: ComparisonFeature[];
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
  defaultAnnual?: boolean;
  onToggleChange?: (isAnnual: boolean) => void;
  toggleLabels?: { monthly: string; annually: string };
  annualDiscountLabel?: string;
  stickyHeader?: boolean;
  footnote?: React.ReactNode;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderValue(value: FeatureValue) {
  if (value === true) return <CheckIcon />;
  if (value === false || value === null) return <XIcon />;
  return (
    <span className="text-sm font-medium text-foreground">{String(value)}</span>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function PricingComparisonTable({
  plans,
  features,
  headline,
  subheadline,
  defaultAnnual = false,
  onToggleChange,
  toggleLabels = { monthly: "Monthly", annually: "Annually" },
  annualDiscountLabel = "Save 20%",
  stickyHeader = true,
  footnote,
  className,
  ...props
}: PricingComparisonTableProps) {
  const [isAnnual, setIsAnnual] = React.useState(defaultAnnual);

  const handleToggle = () => {
    const next = !isAnnual;
    setIsAnnual(next);
    onToggleChange?.(next);
  };

  // Group features by category
  const categories = React.useMemo(() => {
    const map = new Map<string, ComparisonFeature[]>();
    for (const f of features) {
      const cat = f.category ?? "Features";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)?.push(f);
    }
    return map;
  }, [features]);

  const colCount = plans.length;

  return (
    <TooltipProvider>
      <div className={cn("w-full", className)} {...props}>
        {/* Header */}
        {(headline ?? subheadline) && (
          <div className="mb-10 text-center">
            {headline && (
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {headline}
              </h2>
            )}
            {subheadline && (
              <p className="mt-3 text-lg text-muted-foreground">{subheadline}</p>
            )}
          </div>
        )}

        {/* Billing toggle */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              !isAnnual ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {toggleLabels.monthly}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={isAnnual}
            onClick={handleToggle}
            className={cn(
              "relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isAnnual ? "bg-primary" : "bg-input"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-4 w-4 rounded-full bg-background shadow-lg transition-transform",
                isAnnual ? "translate-x-5" : "translate-x-0.5"
              )}
            />
          </button>
          <span
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors",
              isAnnual ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {toggleLabels.annually}
            <Badge variant="secondary" className="text-xs">
              {annualDiscountLabel}
            </Badge>
          </span>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Plan headers */}
            <thead
              className={cn(
                stickyHeader && "sticky top-0 z-20 bg-background"
              )}
            >
              <tr>
                {/* Empty cell for feature label column */}
                <th
                  scope="col"
                  className="w-1/4 py-4 pr-4 text-left align-bottom"
                  aria-label="Features"
                />
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={cn(
                      "w-full min-w-[160px] px-4 py-4 text-center align-bottom",
                      plan.popular &&
                        "rounded-t-xl bg-primary/5 ring-1 ring-primary/20"
                    )}
                  >
                    {plan.popular && (
                      <div className="mb-2">
                        <Badge variant="default" className="text-xs">
                          {plan.badge ?? "Most Popular"}
                        </Badge>
                      </div>
                    )}
                    <div className="text-base font-semibold text-foreground">
                      {plan.name}
                    </div>
                    {plan.description && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        {plan.description}
                      </div>
                    )}
                    <div className="mt-3 flex items-baseline justify-center gap-1">
                      {typeof (isAnnual ? plan.price.annually : plan.price.monthly) === "number" ? (
                        <>
                          <span className="text-sm text-muted-foreground">
                            {plan.currency ?? "$"}
                          </span>
                          <span className="text-3xl font-bold text-foreground">
                            {isAnnual ? plan.price.annually : plan.price.monthly}
                          </span>
                          <span className="text-sm text-muted-foreground">/mo</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-foreground">
                          {isAnnual ? plan.price.annually : plan.price.monthly}
                        </span>
                      )}
                    </div>
                    <div className="mt-4">
                      <Button
                        variant={plan.popular ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                        onClick={plan.cta.onClick}
                        {...(plan.cta.href ? { asChild: false } : {})}
                      >
                        {plan.cta.href ? (
                          <a href={plan.cta.href}>{plan.cta.label}</a>
                        ) : (
                          plan.cta.label
                        )}
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Feature rows */}
            <tbody>
              {Array.from(categories.entries()).map(([category, categoryFeatures]) => (
                <React.Fragment key={category}>
                  {/* Category heading */}
                  <tr>
                    <td
                      colSpan={colCount + 1}
                      className="pb-2 pt-8 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {category}
                    </td>
                  </tr>

                  {/* Features in category */}
                  {categoryFeatures.map((feature, fi) => (
                    <tr
                      key={feature.name}
                      className={cn(
                        "border-t border-border/50 transition-colors hover:bg-muted/30",
                        fi === categoryFeatures.length - 1 && "border-b border-border/50"
                      )}
                    >
                      {/* Feature label */}
                      <td className="py-3.5 pr-4 text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-foreground">
                            {feature.name}
                          </span>
                          {feature.description && (
                            <TooltipRoot>
                              <TooltipTrigger asChild>
                                <button
                                  type="button"
                                  className="inline-flex cursor-default items-center"
                                  aria-label={`More info: ${feature.name}`}
                                >
                                  <InfoIcon />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="right" className="max-w-[220px] text-xs">
                                {feature.description}
                              </TooltipContent>
                            </TooltipRoot>
                          )}
                        </div>
                      </td>

                      {/* Values per plan */}
                      {plans.map((plan) => (
                        <td
                          key={plan.id}
                          className={cn(
                            "py-3.5 px-4 text-center",
                            plan.popular && "bg-primary/5"
                          )}
                        >
                          <div className="flex items-center justify-center">
                            {renderValue(feature.values[plan.id] ?? false)}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>

            {/* CTA footer row */}
            <tfoot>
              <tr>
                <td className="pt-8" />
                {plans.map((plan) => (
                  <td
                    key={plan.id}
                    className={cn(
                      "pt-8 px-4 text-center",
                      plan.popular && "rounded-b-xl bg-primary/5 ring-1 ring-primary/20"
                    )}
                  >
                    <Button
                      variant={plan.popular ? "default" : "outline"}
                      size="sm"
                      className="w-full"
                      onClick={plan.cta.onClick}
                    >
                      {plan.cta.href ? (
                        <a href={plan.cta.href}>{plan.cta.label}</a>
                      ) : (
                        plan.cta.label
                      )}
                    </Button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footnote */}
        {footnote && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            {footnote}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
