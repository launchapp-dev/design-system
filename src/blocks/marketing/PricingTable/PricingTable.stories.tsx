import type { Meta, StoryObj } from "@storybook/react";
import type { PricingTier } from "./index";
import { PricingTable } from "./index";

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$9",
    description: "Perfect for individuals and small projects.",
    features: [
      "Up to 5 projects",
      "10 GB storage",
      "Basic analytics",
      "Email support",
    ],
    ctaLabel: "Get started",
  },
  {
    name: "Pro",
    price: "$29",
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
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
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
];

const meta: Meta<typeof PricingTable> = {
  title: "Blocks/Marketing/PricingTable",
  component: PricingTable,
  parameters: {
    docs: {
      source: {
        code: `import { PricingTable } from "@launchapp/design-system/blocks";

const plans = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    description: "Perfect for individuals and small projects.",
    features: ["5 projects", "10 GB storage", "Email support"],
    ctaLabel: "Get started",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Best for growing teams and businesses.",
    features: ["Unlimited projects", "100 GB storage", "Priority support", "Analytics"],
    ctaLabel: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with advanced needs.",
    features: ["Unlimited everything", "Dedicated support", "Custom integrations", "SLA"],
    ctaLabel: "Contact sales",
  },
];

export default function Page() {
  return <PricingTable plans={plans} onSelect={(plan) => console.log(plan)} />;
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PricingTable>;

export const Default: Story = {
  render: () => (
    <PricingTable
      headline="Simple, transparent pricing"
      subheadline="Choose the plan that works best for you. Upgrade or downgrade at any time."
      tiers={tiers}
    />
  ),
};

export const WithoutHeader: Story = {
  render: () => <PricingTable tiers={tiers} />,
};

export const TwoTiers: Story = {
  render: () => (
    <PricingTable headline="Choose your plan" tiers={tiers.slice(0, 2)} />
  ),
};

export const CustomBadge: Story = {
  render: () => (
    <PricingTable
      headline="Pricing"
      tiers={tiers.map((t) =>
        t.popular ? { ...t, badge: "⭐ Best Value" } : t,
      )}
    />
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <PricingTable
      headline="Simple, transparent pricing"
      subheadline="No hidden fees. Cancel anytime."
      tiers={tiers}
    />
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <PricingTable
      headline="Simple, transparent pricing"
      subheadline="Choose the plan that works best for you."
      tiers={tiers}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <PricingTable
      headline="Simple, transparent pricing"
      subheadline="Choose the plan that works best for you."
      tiers={tiers}
    />
  ),
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  render: () => (
    <PricingTable
      headline="Simple, transparent pricing"
      subheadline="Choose the plan that works best for you."
      tiers={tiers}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "PricingTable is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Badge,
  Button,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Separator,
} from "@launchapp/design-system";

// PricingTable renders a responsive grid of pricing tier cards.
// Each tier card is composed from:
// – Card with a ring highlight for the popular tier
// – Badge (e.g. "Most popular") positioned in CardHeader
// – Price display with period (monthly/annual)
// – Feature list with checkmark icons
// – Separator between features and CTA
// – Button (default or outline) as the call-to-action
export function PricingTable({ headline, subheadline, tiers = [] }) {
  return (
    <section className="py-16 px-4 space-y-10">
      {(headline || subheadline) && (
        <div className="text-center space-y-2">
          {headline && <h2 className="text-3xl font-bold">{headline}</h2>}
          {subheadline && <p className="text-muted-foreground">{subheadline}</p>}
        </div>
      )}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card key={tier.id} className={tier.popular ? "ring-2 ring-primary" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{tier.name}</CardTitle>
                {tier.badge && <Badge>{tier.badge}</Badge>}
              </div>
              <div>
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.period && <span className="text-muted-foreground">/{tier.period}</span>}
              </div>
              {tier.description && <CardDescription>{tier.description}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-2">
              <Separator />
              <ul className="space-y-2">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-primary">✓</span> {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={tier.popular ? "default" : "outline"} onClick={tier.onCtaClick}>
                {tier.ctaLabel ?? "Get started"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}`,
      },
    },
  },
};
