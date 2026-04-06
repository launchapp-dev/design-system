import type { Meta, StoryObj } from "@storybook/react";
import { PricingSectionBlock } from "./index";

const CheckIcon = () => (
  <span
    className="inline-flex items-center justify-center text-primary font-bold"
    aria-label="Included"
  >
    ✓
  </span>
);

const CrossIcon = () => (
  <span
    className="inline-flex items-center justify-center text-muted-foreground/40"
    aria-label="Not included"
  >
    ✕
  </span>
);

const ShieldIcon = () => (
  <span className="text-sm text-muted-foreground flex items-center gap-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
    Secure checkout
  </span>
);

const sampleTiers = [
  {
    name: "Starter",
    monthlyPrice: "$29",
    annualPrice: "$23",
    description: "Perfect for indie hackers and small projects.",
    features: [
      "Up to 3 projects",
      "5 GB storage",
      "Basic analytics",
      "Email support",
      "API access",
    ],
    ctaLabel: "Get started",
    popular: false,
  },
  {
    name: "Pro",
    monthlyPrice: "$79",
    annualPrice: "$63",
    description: "For growing startups and teams.",
    features: [
      "Unlimited projects",
      "50 GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom domains",
      "Team collaboration",
    ],
    ctaLabel: "Start free trial",
    popular: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    monthlyPrice: "$199",
    annualPrice: "$159",
    description: "For scaling companies with custom needs.",
    features: [
      "Unlimited everything",
      "1 TB storage",
      "Custom analytics",
      "Dedicated support",
      "Full API access",
      "Custom domains",
      "SSO & SAML",
      "SLA guarantee",
    ],
    ctaLabel: "Contact sales",
    popular: false,
  },
];

const sampleFeatureRows = [
  {
    feature: "Projects",
    values: { Starter: "3", Pro: "Unlimited", Enterprise: "Unlimited" },
  },
  {
    feature: "Storage",
    values: { Starter: "5 GB", Pro: "50 GB", Enterprise: "1 TB" },
  },
  {
    feature: "Team members",
    values: { Starter: "1", Pro: "5", Enterprise: "Unlimited" },
  },
  {
    feature: "API access",
    values: {
      Starter: <CheckIcon key="s" />,
      Pro: <CheckIcon key="p" />,
      Enterprise: <CheckIcon key="e" />,
    },
  },
  {
    feature: "Custom domain",
    values: {
      Starter: <CrossIcon key="s" />,
      Pro: <CheckIcon key="p" />,
      Enterprise: <CheckIcon key="e" />,
    },
  },
  {
    feature: "SSO / SAML",
    values: {
      Starter: <CrossIcon key="s" />,
      Pro: <CrossIcon key="p" />,
      Enterprise: <CheckIcon key="e" />,
    },
  },
  {
    feature: "SLA guarantee",
    values: {
      Starter: <CrossIcon key="s" />,
      Pro: <CrossIcon key="p" />,
      Enterprise: <CheckIcon key="e" />,
    },
  },
];

const sampleFAQItems = [
  {
    question: "Can I switch plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express) as well as PayPal. Enterprise customers can pay via invoice.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! All paid plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "You can export all your data at any time before canceling. After cancellation, your data is retained for 30 days before permanent deletion.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee on all plans. No questions asked.",
  },
];

const meta: Meta<typeof PricingSectionBlock> = {
  title: "blocks/landing/PricingSection",
  component: PricingSectionBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof PricingSectionBlock>;

export const Default: Story = {
  args: {
    headline: "Simple, transparent pricing",
    subheadline: "Choose the plan that fits your needs. All plans include a 14-day free trial.",
    tiers: sampleTiers,
    featureComparisonHeader: "Compare plans",
    featureRows: sampleFeatureRows,
    faqHeader: "Frequently asked questions",
    faqItems: sampleFAQItems,
    trustBadges: [
      <ShieldIcon key="shield" />,
      <span key="cards" className="text-sm text-muted-foreground flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
        Visa, Mastercard, Amex
      </span>,
    ],
  },
};

export const TiersOnly: Story = {
  args: {
    headline: "Pricing",
    subheadline: "Start free, scale as you grow.",
    tiers: sampleTiers,
  },
};

export const WithFAQ: Story = {
  args: {
    headline: "Simple pricing",
    subheadline: "No surprises. Cancel anytime.",
    tiers: sampleTiers,
    faqHeader: "FAQ",
    faqItems: sampleFAQItems,
  },
};

export const WithFeatureComparison: Story = {
  args: {
    headline: "Choose your plan",
    subheadline: "All features you need to ship fast.",
    tiers: sampleTiers,
    featureComparisonHeader: "What's included",
    featureRows: sampleFeatureRows,
  },
};

export const NoDiscountBadge: Story = {
  args: {
    headline: "Simple pricing",
    subheadline: "Pick the best plan for you.",
    tiers: sampleTiers,
    showAnnualDiscount: false,
    faqHeader: "Questions?",
    faqItems: sampleFAQItems.slice(0, 3),
  },
};
