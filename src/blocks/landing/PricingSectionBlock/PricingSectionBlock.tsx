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
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../components/Accordion";
import { Toggle } from "../../../components/Toggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/Table";

export interface PricingSectionTier {
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  description: string;
  features: string[];
  ctaLabel: string;
  onCtaClick?: () => void;
  popular?: boolean;
  badge?: string;
}

export interface PricingSectionFeatureRow {
  feature: string;
  values: Record<string, React.ReactNode>;
}

export interface PricingSectionFAQItem {
  question: string;
  answer: string;
}

export interface PricingSectionBlockProps
  extends React.HTMLAttributes<HTMLElement> {
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
  tiers: PricingSectionTier[];
  billingToggleLabel?: string;
  monthlyLabel?: string;
  annualLabel?: string;
  showAnnualDiscount?: boolean;
  annualDiscountPercent?: number;
  featureComparisonHeader?: string;
  featureRows?: PricingSectionFeatureRow[];
  faqHeader?: string;
  faqItems?: PricingSectionFAQItem[];
  trustBadges?: React.ReactNode[];
}

const PricingSectionBlock = React.forwardRef<
  HTMLElement,
  PricingSectionBlockProps
>(
  (
    {
      className,
      headline,
      subheadline,
      tiers,
      billingToggleLabel = " billed annually",
      monthlyLabel = "Monthly",
      annualLabel = "Annual",
      showAnnualDiscount = true,
      annualDiscountPercent = 20,
      featureComparisonHeader,
      featureRows = [],
      faqHeader,
      faqItems = [],
      trustBadges,
      ...props
    },
    ref
  ) => {
    const [isAnnual, setIsAnnual] = React.useState(false);

    const renderToggle = () => (
      <div className="flex items-center justify-center gap-3 mb-12">
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            !isAnnual
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {monthlyLabel}
        </span>
        <Toggle
          pressed={isAnnual}
          onPressedChange={setIsAnnual}
          aria-label="Toggle annual billing"
          className="relative"
        >
          <span
            className={cn(
              "flex h-5 w-9 items-center rounded-full bg-muted p-0.5 transition-colors",
              isAnnual && "bg-primary"
            )}
          >
            <span
              className={cn(
                "h-4 w-4 rounded-full bg-background shadow-sm transition-transform",
                isAnnual && "translate-x-4"
              )}
            />
          </span>
        </Toggle>
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            isAnnual ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {annualLabel}
        </span>
        {showAnnualDiscount && (
          <Badge variant="secondary" className="ml-1">
            Save {annualDiscountPercent}%
          </Badge>
        )}
      </div>
    );

    const renderTiers = () => (
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
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">
                  {isAnnual ? tier.annualPrice : tier.monthlyPrice}
                </span>
                <span className="text-sm text-muted-foreground">
                  /{isAnnual ? "year" : "month"}
                </span>
              </div>
              {isAnnual && (
                <p className="text-xs text-muted-foreground">
                  {billingToggleLabel}
                </p>
              )}
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <Separator className="mb-4" />
              <ul className="space-y-2">
                {tier.features.map((feature, fi) => (
                  <li
                    key={fi}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <span className="text-primary shrink-0" aria-hidden="true">
                      ✓
                    </span>
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
    );

    const renderFeatureComparison = () => {
      if (featureRows.length === 0) return null;
      return (
        <div className="mt-16">
          {featureComparisonHeader && (
            <h3 className="text-2xl font-bold text-center mb-8">
              {featureComparisonHeader}
            </h3>
          )}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Feature</TableHead>
                  {tiers.map((tier, i) => (
                    <TableHead
                      key={i}
                      className={cn(
                        "text-center",
                        tier.popular && "text-primary font-semibold"
                      )}
                    >
                      {tier.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {featureRows.map((row, ri) => (
                  <TableRow key={ri}>
                    <TableCell className="font-medium">{row.feature}</TableCell>
                    {tiers.map((tier, ti) => (
                      <TableCell key={ti} className="text-center">
                        {row.values[tier.name]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      );
    };

    const renderFAQ = () => {
      if (faqItems.length === 0) return null;
      return (
        <div className="mt-16 max-w-3xl mx-auto">
          {faqHeader && (
            <h3 className="text-2xl font-bold text-center mb-8">
              {faqHeader}
            </h3>
          )}
          <AccordionRoot type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </AccordionRoot>
        </div>
      );
    };

    const renderTrustBadges = () => {
      if (!trustBadges || trustBadges.length === 0) return null;
      return (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {trustBadges}
        </div>
      );
    };

    return (
      <section ref={ref} className={cn("w-full px-4 py-16 md:py-24", className)} {...props}>
        {(headline || subheadline) && (
          <div className="mb-8 text-center space-y-3 max-w-3xl mx-auto">
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
        {renderToggle()}
        {renderTiers()}
        {renderFeatureComparison()}
        {renderFAQ()}
        {renderTrustBadges()}
      </section>
    );
  }
);

PricingSectionBlock.displayName = "PricingSectionBlock";

export {
  PricingSectionBlock,
};
