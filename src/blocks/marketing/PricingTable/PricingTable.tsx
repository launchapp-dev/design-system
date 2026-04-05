import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";
import { Switch } from "../../../components/Switch";
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../components/Accordion";

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

const popularTierVariants = cva("", {
  variants: {
    popularVariant: {
      default: "border-primary shadow-lg shadow-primary/10 md:-mt-4 md:mb-4",
      gradient: "border-0 bg-gradient-to-br from-gray-900 to-indigo-950 shadow-xl",
    },
  },
  defaultVariants: {
    popularVariant: "default",
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

export interface PricingTableFAQItem {
  question: string;
  answer: string;
}

export interface PricingTableProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof pricingTableVariants>,
    Pick<VariantProps<typeof popularTierVariants>, "popularVariant"> {
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
  faqHeader?: string;
  faqItems?: PricingTableFAQItem[];
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
  popularVariant = "default",
  faqHeader,
  faqItems,
  ref,
  ...props
}: PricingTableProps & { ref?: React.Ref<HTMLElement> }) {
  const [isAnnual, setIsAnnual] = React.useState(defaultAnnual);

  const handleToggle = () => {
    const newValue = !isAnnual;
    setIsAnnual(newValue);
    onToggleChange?.(newValue);
  };

  const isGradient = popularVariant === "gradient";

  return (
    <section ref={ref} className={cn(pricingTableVariants({ variant }), className)} {...props}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {(headline || subheadline) && (
          <div className="text-center mb-10">
            {headline && (
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                {headline}
              </h2>
            )}
            {subheadline && (
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">{subheadline}</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-center gap-3 mb-12">
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              !isAnnual ? "text-foreground" : "text-muted-foreground",
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
              isAnnual ? "text-foreground" : "text-muted-foreground",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => {
            const price = isAnnual ? tier.price.annually : tier.price.monthly;
            const isNumericPrice = typeof price === "number";

            return (
              <div
                key={tier.id}
                className={cn(
                  "flex flex-col relative rounded-xl p-8",
                  tier.popular && popularTierVariants({ popularVariant }),
                  !tier.popular && "border border-border bg-card text-card-foreground",
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge
                      className={cn(
                        "px-3 py-1 text-xs font-semibold",
                        isGradient
                          ? "bg-indigo-500 text-white"
                          : "bg-primary text-primary-foreground",
                      )}
                    >
                      Most popular
                    </Badge>
                  </div>
                )}

                <div className={cn("mb-6", tier.popular && isGradient && "pt-2")}>
                  <h3
                    className={cn(
                      "text-base font-semibold mb-1",
                      tier.popular && isGradient ? "text-white" : "text-foreground",
                    )}
                  >
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    {isNumericPrice && (
                      <span
                        className={cn(
                          "text-4xl font-bold",
                          tier.popular && isGradient ? "text-white" : "text-foreground",
                        )}
                      >
                        {tier.currency || "$"}
                        {price}
                      </span>
                    )}
                    {!isNumericPrice && (
                      <span
                        className={cn(
                          "text-4xl font-bold",
                          tier.popular && isGradient ? "text-white" : "text-foreground",
                        )}
                      >
                        {price}
                      </span>
                    )}
                    {isNumericPrice && (
                      <span
                        className={cn(
                          "text-sm",
                          tier.popular && isGradient ? "text-indigo-300" : "text-muted-foreground",
                        )}
                      >
                        /mo{isAnnual ? " · billed annually" : ""}
                      </span>
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-sm",
                      tier.popular && isGradient ? "text-indigo-200" : "text-muted-foreground",
                    )}
                  >
                    {tier.description}
                  </p>
                </div>

                <div className="flex-1">
                  <div
                    className={cn(
                      "h-px mb-4",
                      tier.popular && isGradient ? "bg-indigo-700" : "bg-border",
                    )}
                  />
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm">
                        <svg
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            tier.popular && isGradient
                              ? "text-indigo-300"
                              : "text-muted-foreground",
                          )}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span
                          className={cn(
                            tier.popular && isGradient ? "text-indigo-100" : "text-foreground/80",
                          )}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-0 mt-6">
                  {tier.popular && isGradient ? (
                    <Button
                      className={cn(
                        "w-full bg-white text-gray-900 hover:bg-indigo-50",
                        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/50",
                      )}
                      disabled={tier.disabled}
                      onClick={tier.cta.onClick}
                      asChild={!!tier.cta.href}
                    >
                      {tier.cta.href ? (
                        <a href={tier.cta.href}>{tier.cta.label}</a>
                      ) : (
                        tier.cta.label
                      )}
                    </Button>
                  ) : (
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
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {footer && <div className="mt-10 text-center">{footer}</div>}

        {faqItems && faqItems.length > 0 && (
          <div className="mt-20 max-w-2xl mx-auto">
            {faqHeader && (
              <h3 className="text-2xl font-bold text-center mb-8 text-foreground">{faqHeader}</h3>
            )}
            <AccordionRoot
              type="single"
              collapsible
              className="w-full"
              aria-label={faqHeader ?? "Frequently asked questions"}
            >
              {faqItems.map((item) => (
                <AccordionItem key={item.question} value={item.question}>
                  <AccordionTrigger className="text-left font-medium text-foreground">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </AccordionRoot>
          </div>
        )}
      </div>
    </section>
  );
}

PricingTable.displayName = "PricingTable";

export { PricingTable, pricingTableVariants, popularTierVariants };
