import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { PricingTable } from "./index";
import type { PricingTier } from "./index";

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
        code: `import { PricingTable } from "@launchapp/design-system/blocks/marketing";

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
    <PricingTable
      headline="Choose your plan"
      tiers={tiers.slice(0, 2)}
    />
  ),
};

export const CustomBadge: Story = {
  render: () => (
    <PricingTable
      headline="Pricing"
      tiers={tiers.map((t) =>
        t.popular ? { ...t, badge: "⭐ Best Value" } : t
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
