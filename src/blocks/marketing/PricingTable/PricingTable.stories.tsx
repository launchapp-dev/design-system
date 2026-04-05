import type { Meta, StoryObj } from "@storybook/react";
import { PricingTable } from "./PricingTable";

const meta = {
  title: "Blocks/Marketing/PricingTable",
  component: PricingTable,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PricingTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTiers = [
  {
    id: "starter",
    name: "Starter",
    description: "For side projects and early experiments.",
    price: {
      monthly: 0,
      annually: 0,
    },
    features: [
      "Up to 3 projects",
      "500 API requests/day",
      "Community support",
      "Basic analytics",
    ],
    cta: {
      label: "Get started",
      href: "/auth/register",
    },
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing products and small teams.",
    price: {
      monthly: 29,
      annually: 23,
    },
    features: [
      "Unlimited projects",
      "50k API requests/day",
      "Priority email support",
      "Advanced analytics",
      "Custom domains",
      "Team members (up to 5)",
    ],
    cta: {
      label: "Start free trial",
      href: "/pricing",
    },
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For larger teams with advanced needs.",
    price: {
      monthly: "Custom",
      annually: "Custom",
    },
    features: [
      "Everything in Pro",
      "Unlimited API requests",
      "Dedicated support",
      "SLA guarantee",
      "SSO / SAML",
      "Custom contracts",
    ],
    cta: {
      label: "Contact us",
      href: "/contact",
    },
  },
];

export const Default: Story = {
  args: {
    headline: "Simple, transparent pricing",
    subheadline: "Start free. Upgrade when you're ready. No hidden fees.",
    tiers: defaultTiers,
    footer: (
      <p className="text-muted-foreground text-sm">
        All plans include a 14-day free trial. No credit card required.
      </p>
    ),
  },
};

export const WithGradientBackground: Story = {
  args: {
    variant: "gradient",
    headline: "Simple, transparent pricing",
    subheadline: "Start free. Upgrade when you're ready. No hidden fees.",
    tiers: defaultTiers,
    annualDiscountLabel: "Save 20%",
  },
};

export const DefaultAnnual: Story = {
  args: {
    headline: "Simple, transparent pricing",
    subheadline: "Start free. Upgrade when you're ready. No hidden fees.",
    tiers: defaultTiers,
    defaultAnnual: true,
  },
};

export const CustomCurrency: Story = {
  args: {
    headline: "Pricing in EUR",
    subheadline: "Simple pricing for European customers.",
    tiers: [
      {
        ...defaultTiers[0],
        currency: "€",
        price: { monthly: 0, annually: 0 },
      },
      {
        ...defaultTiers[1],
        currency: "€",
        price: { monthly: 25, annually: 20 },
      },
      {
        ...defaultTiers[2],
      },
    ],
  },
};

export const TwoTiersOnly: Story = {
  args: {
    headline: "Choose your plan",
    tiers: defaultTiers.slice(0, 2),
  },
};

export const WithCustomLabels: Story = {
  args: {
    headline: "Flexible plans",
    subheadline: "Choose what works best for you.",
    tiers: defaultTiers,
    toggleLabels: {
      monthly: "Pay Monthly",
      annually: "Pay Yearly",
    },
    annualDiscountLabel: "2 months free",
  },
};

export const Minimal: Story = {
  args: {
    tiers: defaultTiers,
  },
};

const faqItems = [
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the difference.",
  },
  {
    question: "What happens when my trial ends?",
    answer:
      "After your 14-day trial, you'll be moved to the free tier. No credit card is required, so you won't be charged unless you choose to upgrade.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund.",
  },
  {
    question: "Is the annual plan billed all at once?",
    answer:
      "Yes, annual plans are billed as a single payment for the full year. You save 20% compared to the monthly rate.",
  },
];

export const WithGradientPopularCard: Story = {
  args: {
    headline: "Simple, transparent pricing",
    subheadline: "Start free. Upgrade when you're ready. No hidden fees.",
    tiers: defaultTiers,
    popularVariant: "gradient",
    footer: (
      <p className="text-muted-foreground text-sm">
        All plans include a 14-day free trial. No credit card required.
      </p>
    ),
  },
};

export const WithFAQ: Story = {
  args: {
    headline: "Simple, transparent pricing",
    subheadline: "Start free. Upgrade when you're ready.",
    tiers: defaultTiers,
    popularVariant: "gradient",
    faqHeader: "Frequently asked questions",
    faqItems,
    footer: (
      <p className="text-muted-foreground text-sm">
        Still have questions?{" "}
        <a href="/contact" className="text-foreground underline hover:no-underline">
          Contact us
        </a>
        .
      </p>
    ),
  },
};

export const DarkMode: Story = {
  decorators: [(Story) => <div className="dark">{Story()}</div>],
  args: {
    headline: "Simple, transparent pricing",
    subheadline: "Start free. Upgrade when you're ready.",
    tiers: defaultTiers,
    popularVariant: "gradient",
    footer: (
      <p className="text-muted-foreground text-sm">
        All plans include a 14-day free trial. No credit card required.
      </p>
    ),
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  args: {
    headline: "Simple pricing",
    subheadline: "Start free.",
    tiers: defaultTiers,
    popularVariant: "gradient",
  },
};
