import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { PricingTable } from "./index";

const meta: Meta<typeof PricingTable> = {
  title: "Blocks/Landing/PricingTable",
  component: PricingTable,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `import { PricingTable } from "@launchapp/design-system";

export default function PricingPage() {
  return (
    <PricingTable
      title="Simple, transparent pricing"
      subtitle="Choose the plan that works best for your team"
      tiers={[
        {
          id: "starter",
          name: "Starter",
          description: "Perfect for individuals and small projects",
          monthlyPrice: 0,
          annualPrice: 0,
          features: [
            { name: "Projects", included: "5 projects", tooltip: "Number of active projects you can have" },
            { name: "Team members", included: "1 member" },
            { name: "Storage", included: "5 GB" },
            { name: "API access", included: true },
            { name: "Priority support", included: false },
          ],
          ctaLabel: "Get started free",
        },
        {
          id: "pro",
          name: "Pro",
          description: "For growing teams with advanced needs",
          monthlyPrice: 29,
          annualPrice: 290,
          badge: "Most popular",
          features: [
            { name: "Projects", included: "Unlimited" },
            { name: "Team members", included: "10 members" },
            { name: "Storage", included: "100 GB" },
            { name: "API access", included: true },
            { name: "Priority support", included: true },
          ],
          ctaLabel: "Start free trial",
          highlighted: true,
        },
      ]}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PricingTable>;

const threeTierTiers = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for side projects and early-stage startups.",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      { name: "Projects", included: "5 projects" },
      { name: "Team members", included: "1 member", tooltip: "Number of seats included in the plan" },
      { name: "Storage", included: "1 GB" },
      { name: "API access", included: false },
      { name: "Analytics", included: false },
      { name: "Priority support", included: false },
      { name: "Custom domain", included: false },
    ],
    ctaLabel: "Get started free",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing teams shipping production apps.",
    monthlyPrice: 49,
    annualPrice: 490,
    badge: "Most popular",
    features: [
      { name: "Projects", included: "Unlimited" },
      { name: "Team members", included: "10 members" },
      { name: "Storage", included: "50 GB" },
      { name: "API access", included: true },
      { name: "Analytics", included: true },
      { name: "Priority support", included: false },
      { name: "Custom domain", included: true },
    ],
    ctaLabel: "Start free trial",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with custom requirements.",
    monthlyPrice: null,
    annualPrice: null,
    priceLabel: "Custom",
    features: [
      { name: "Projects", included: "Unlimited" },
      { name: "Team members", included: "Unlimited" },
      { name: "Storage", included: "Unlimited" },
      { name: "API access", included: true },
      { name: "Analytics", included: true },
      { name: "Priority support", included: true, tooltip: "24/7 dedicated support with SLA" },
      { name: "Custom domain", included: true },
    ],
    ctaLabel: "Contact sales",
  },
];

const twoTierTiers = [
  {
    id: "free",
    name: "Free",
    description: "Everything you need to get started.",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      { name: "Core features", included: true },
      { name: "Community support", included: true },
      { name: "Basic analytics", included: true },
      { name: "Advanced features", included: false },
      { name: "Priority support", included: false },
    ],
    ctaLabel: "Get started",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Unlock the full potential.",
    monthlyPrice: 19,
    annualPrice: 190,
    badge: "Best value",
    features: [
      { name: "Core features", included: true },
      { name: "Community support", included: true },
      { name: "Basic analytics", included: true },
      { name: "Advanced features", included: true },
      { name: "Priority support", included: true },
    ],
    ctaLabel: "Upgrade now",
    highlighted: true,
  },
];

const fourTierTiers = [
  {
    id: "hobby",
    name: "Hobby",
    description: "For personal projects.",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      { name: "Projects", included: "3" },
      { name: "Storage", included: "1 GB" },
      { name: "Bandwidth", included: "10 GB/mo" },
      { name: "Analytics", included: false },
    ],
    ctaLabel: "Get started",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For freelancers.",
    monthlyPrice: 19,
    annualPrice: 190,
    features: [
      { name: "Projects", included: "10" },
      { name: "Storage", included: "10 GB" },
      { name: "Bandwidth", included: "100 GB/mo" },
      { name: "Analytics", included: true },
    ],
    ctaLabel: "Start trial",
  },
  {
    id: "team",
    name: "Team",
    description: "For small teams.",
    monthlyPrice: 49,
    annualPrice: 490,
    badge: "Popular",
    features: [
      { name: "Projects", included: "Unlimited" },
      { name: "Storage", included: "100 GB" },
      { name: "Bandwidth", included: "1 TB/mo" },
      { name: "Analytics", included: true },
    ],
    ctaLabel: "Start trial",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For organizations.",
    monthlyPrice: null,
    annualPrice: null,
    priceLabel: "Custom",
    features: [
      { name: "Projects", included: "Unlimited" },
      { name: "Storage", included: "Unlimited" },
      { name: "Bandwidth", included: "Unlimited" },
      { name: "Analytics", included: true },
    ],
    ctaLabel: "Contact us",
  },
];

export const ThreeTiers: Story = {
  args: {
    title: "Simple, transparent pricing",
    subtitle: "Start free. No credit card required. Upgrade anytime.",
    tiers: threeTierTiers,
  },
};

export const TwoTiers: Story = {
  args: {
    title: "Choose your plan",
    subtitle: "Simple pricing that scales with your needs.",
    tiers: twoTierTiers,
  },
};

export const FourTiers: Story = {
  args: {
    title: "Pricing for every stage",
    subtitle: "From hobby projects to enterprise scale.",
    tiers: fourTierTiers,
  },
};

export const DefaultAnnual: Story = {
  args: {
    title: "Save with annual billing",
    subtitle: "Switch to annual and save up to 20% on your subscription.",
    tiers: threeTierTiers,
    defaultAnnual: true,
  },
};

export const SingleTier: Story = {
  args: {
    title: "Simple pricing",
    subtitle: "One plan, everything included.",
    tiers: [
      {
        id: "all-included",
        name: "All-Inclusive",
        description: "Everything you need to build and scale.",
        monthlyPrice: 29,
        annualPrice: 290,
        features: [
          { name: "Unlimited projects", included: true },
          { name: "Unlimited team members", included: true },
          { name: "100 GB storage", included: true },
          { name: "Priority support", included: true },
          { name: "Custom domains", included: true },
        ],
        ctaLabel: "Get started",
        highlighted: true,
      },
    ],
  },
};

export const WithCustomCurrency: Story = {
  args: {
    title: "Pricing in EUR",
    subtitle: "Prices shown in Euros.",
    tiers: [
      {
        id: "starter",
        name: "Starter",
        description: "Perfect for getting started.",
        monthlyPrice: 19,
        annualPrice: 190,
        features: [
          { name: "5 projects", included: true },
          { name: "1 GB storage", included: true },
        ],
        ctaLabel: "Get started",
      },
      {
        id: "pro",
        name: "Pro",
        description: "For growing teams.",
        monthlyPrice: 49,
        annualPrice: 490,
        features: [
          { name: "Unlimited projects", included: true },
          { name: "50 GB storage", included: true },
        ],
        ctaLabel: "Start trial",
        highlighted: true,
      },
    ],
    currencySymbol: "€",
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background">
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Dark mode ready",
    subtitle: "Looks great in both light and dark themes.",
    tiers: threeTierTiers,
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  args: {
    title: "Mobile-friendly pricing",
    subtitle: "Optimized for all screen sizes.",
    tiers: threeTierTiers,
  },
};

export const Tablet: Story = {
  parameters: { viewport: { defaultViewport: "tablet" } },
  args: {
    title: "Tablet-optimized",
    subtitle: "Responsive design for every device.",
    tiers: threeTierTiers,
  },
};
