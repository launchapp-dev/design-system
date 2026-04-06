import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
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
import { Switch } from "../../../components/Switch";

const pricingTableBlockVariants = cva("w-full px-4 py-16 md:py-24", {
  variants: {
    variant: {
      default: "",
      bordered: "max-w-6xl mx-auto",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface PricingTableFeature {
  label: string;
  free?: React.ReactNode;
  pro?: React.ReactNode;
  enterprise?: React.ReactNode;
}

export interface PricingTableBlockProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof pricingTableBlockVariants> {
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
  description?: React.ReactNode;
  tiers?: {
    free: {
      price: string;
      annualPrice?: string;
      description: string;
      features: string[];
      ctaLabel: string;
      onCtaClick?: () => void;
    };
    pro: {
      price: string;
      annualPrice?: string;
      description: string;
      features: string[];
      ctaLabel: string;
      onCtaClick?: () => void;
    };
    enterprise: {
      price: string;
      annualPrice?: string;
      description: string;
      features: string[];
      ctaLabel: string;
      onCtaClick?: () => void;
    };
  };
  showToggle?: boolean;
  defaultAnnual?: boolean;
  features?: PricingTableFeature[];
  onPlanSelect?: (plan: "free" | "pro" | "enterprise") => void;
}

const defaultTiers = {
  free: {
    price: "$0",
    annualPrice: "$0",
    description: "For individuals just getting started.",
    features: ["3 projects", "1 GB storage", "Basic analytics", "Community support"],
    ctaLabel: "Get started free",
  },
  pro: {
    price: "$29",
    annualPrice: "$24",
    description: "For growing teams that need more power.",
    features: [
      "Unlimited projects",
      "100 GB storage",
      "Advanced analytics",
      "Priority support",
      "Custom domains",
      "Team collaboration",
    ],
    ctaLabel: "Start free trial",
  },
  enterprise: {
    price: "Custom",
    annualPrice: undefined,
    description: "For large organizations with advanced needs.",
    features: [
      "Everything in Pro",
      "1 TB storage",
      "Custom analytics",
      "Dedicated support",
      "SSO & SAML",
      "SLA guarantee",
      "Custom contracts",
    ],
    ctaLabel: "Contact sales",
  },
};

const PricingTableBlock = React.forwardRef<HTMLElement, PricingTableBlockProps>(
  (
    {
      className,
      variant = "default",
      headline,
      subheadline,
      description,
      tiers = defaultTiers,
      showToggle = true,
      defaultAnnual = false,
      features,
      onPlanSelect,
      ...props
    },
    ref,
  ) => {
    const [isAnnual, setIsAnnual] = React.useState(defaultAnnual);

    const renderToggle = () => {
      if (!showToggle) return null;
      return (
        <div className="flex items-center justify-center gap-3 mb-12">
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              !isAnnual ? "text-foreground" : "text-muted-foreground",
            )}
          >
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            aria-label="Toggle annual billing"
          />
          <span className="flex items-center gap-2">
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                isAnnual ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Annual
            </span>
            <Badge variant="secondary" className="text-xs">
              Save 20%
            </Badge>
          </span>
        </div>
      );
    };

    const renderTierCard = (
      tierKey: "free" | "pro" | "enterprise",
      tier: NonNullable<PricingTableBlockProps["tiers"]>[typeof tierKey],
    ) => {
      const isPopular = tierKey === "pro";
      const displayPrice = isAnnual && tier.annualPrice ? tier.annualPrice : tier.price;
      const priceLabel = isAnnual && tier.annualPrice ? "/mo, billed annually" : "/month";

      return (
        <Card
          key={tierKey}
          className={cn(
            "relative flex flex-col transition-shadow hover:shadow-md",
            isPopular && "border-primary shadow-lg ring-2 ring-primary/20",
          )}
        >
          {isPopular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <Badge>{tierKey === "pro" ? "Recommended" : tierKey}</Badge>
            </div>
          )}
          <CardHeader className={cn("pb-6", isPopular && "pt-8")}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg capitalize">{tierKey}</CardTitle>
              {!isPopular && (
                <Badge variant="outline" className="capitalize">
                  {tierKey}
                </Badge>
              )}
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground tracking-tight">
                {displayPrice}
              </span>
              {tier.annualPrice && (
                <span className="text-sm text-muted-foreground">{priceLabel}</span>
              )}
            </div>
            <CardDescription className="mt-2">{tier.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-6">
            <Separator className="mb-4" />
            <ul className="space-y-2.5" role="list">
              {tier.features.map((feature, fi) => (
                <li key={fi} className="flex items-start gap-2.5 text-sm text-foreground">
                  <span className="mt-0.5 text-primary shrink-0" aria-hidden="true">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 7L5.5 10L11.5 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              className="w-full"
              variant={isPopular ? "default" : "outline"}
              size="lg"
              onClick={() => {
                tier.onCtaClick?.();
                onPlanSelect?.(tierKey);
              }}
            >
              {tier.ctaLabel}
            </Button>
          </CardFooter>
        </Card>
      );
    };

    const renderFeatureComparison = () => {
      if (!features || features.length === 0) return null;
      return (
        <div className="mt-16 w-full overflow-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div />
              <div className="text-center font-semibold text-sm">Free</div>
              <div className="text-center font-semibold text-sm text-primary">Pro</div>
              <div className="text-center font-semibold text-sm">Enterprise</div>
            </div>
            {features.map((feature, fi) => (
              <div key={fi} className="grid grid-cols-4 gap-4 py-3 border-t border-border/50">
                <div className="text-sm text-muted-foreground">{feature.label}</div>
                <div className="text-center text-sm">{feature.free}</div>
                <div className="text-center text-sm">{feature.pro}</div>
                <div className="text-center text-sm">{feature.enterprise}</div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <section
        ref={ref}
        className={cn(pricingTableBlockVariants({ variant }), className)}
        {...props}
      >
        {(headline || subheadline) && (
          <div className="mb-8 text-center space-y-3">
            {headline && (
              <h2 className="text-3xl font-bold tracking-tight text-foreground">{headline}</h2>
            )}
            {subheadline && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subheadline}</p>
            )}
            {description && (
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">{description}</p>
            )}
          </div>
        )}

        {renderToggle()}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {renderTierCard("free", tiers.free)}
          {renderTierCard("pro", tiers.pro)}
          {renderTierCard("enterprise", tiers.enterprise)}
        </div>

        {renderFeatureComparison()}
      </section>
    );
  },
);

PricingTableBlock.displayName = "PricingTableBlock";

export { PricingTableBlock, pricingTableBlockVariants };
