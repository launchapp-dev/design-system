import type { Meta, StoryObj } from "@storybook/react";
import { PricingComparisonTable } from "./PricingComparisonTable";

const meta = {
  title: "Blocks/Marketing/PricingComparisonTable",
  component: PricingComparisonTable,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof PricingComparisonTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "For individuals & experiments",
    price: { monthly: 0, annually: 0 },
    cta: { label: "Get started free", href: "/auth/register" },
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing teams",
    price: { monthly: 29, annually: 23 },
    popular: true,
    badge: "Most Popular",
    cta: { label: "Start free trial", href: "/pricing" },
  },
  {
    id: "business",
    name: "Business",
    description: "For scaling organisations",
    price: { monthly: 79, annually: 63 },
    cta: { label: "Start free trial", href: "/pricing" },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom contracts & SLAs",
    price: { monthly: "Custom", annually: "Custom" },
    cta: { label: "Contact sales", href: "/contact" },
  },
];

const features = [
  // Core
  {
    name: "Projects",
    category: "Core",
    description: "Number of projects you can create.",
    values: { starter: "3", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
  },
  {
    name: "Team members",
    category: "Core",
    description: "Number of seats included in the plan.",
    values: { starter: "1", pro: "5", business: "25", enterprise: "Unlimited" },
  },
  {
    name: "API requests / day",
    category: "Core",
    values: { starter: "500", pro: "50,000", business: "500,000", enterprise: "Unlimited" },
  },
  {
    name: "Storage",
    category: "Core",
    values: { starter: "1 GB", pro: "50 GB", business: "500 GB", enterprise: "Custom" },
  },
  // Security
  {
    name: "SSO / SAML",
    category: "Security & Compliance",
    description: "Single sign-on via SAML 2.0.",
    values: { starter: false, pro: false, business: true, enterprise: true },
  },
  {
    name: "Audit logs",
    category: "Security & Compliance",
    values: { starter: false, pro: "30 days", business: "1 year", enterprise: "Custom" },
  },
  {
    name: "Role-based access control",
    category: "Security & Compliance",
    values: { starter: false, pro: true, business: true, enterprise: true },
  },
  {
    name: "99.99% SLA",
    category: "Security & Compliance",
    values: { starter: false, pro: false, business: false, enterprise: true },
  },
  // Support
  {
    name: "Community support",
    category: "Support",
    values: { starter: true, pro: true, business: true, enterprise: true },
  },
  {
    name: "Priority email support",
    category: "Support",
    values: { starter: false, pro: true, business: true, enterprise: true },
  },
  {
    name: "Dedicated CSM",
    category: "Support",
    values: { starter: false, pro: false, business: false, enterprise: true },
  },
];

export const Default: Story = {
  args: {
    plans,
    features,
    headline: "Compare plans",
    subheadline: "Everything you need to ship faster. No hidden fees.",
    defaultAnnual: false,
    stickyHeader: false,
    footnote: "All plans include a 14-day free trial. No credit card required.",
  },
};

export const AnnualDefault: Story = {
  args: {
    ...Default.args,
    defaultAnnual: true,
  },
};

export const ThreePlans: Story = {
  args: {
    plans: plans.slice(0, 3),
    features,
    headline: "Simple, transparent pricing",
    subheadline: "No contracts. Cancel anytime.",
    stickyHeader: false,
  },
};
