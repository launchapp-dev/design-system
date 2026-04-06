import type { Meta, StoryObj } from "@storybook/react";
import { FeatureComparison } from "./FeatureComparison";
import type { PricingTier, Feature } from "./FeatureComparison";

const meta: Meta<typeof FeatureComparison> = {
  title: "Blocks/Marketing/FeatureComparison",
  component: FeatureComparison,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `import { FeatureComparison } from "@launchapp/design-system/blocks";

const tiers = [
  {
    id: "starter",
    name: "Starter",
    price: { monthly: 0, annually: 0 },
    cta: { label: "Get started", variant: "outline" },
  },
  {
    id: "pro",
    name: "Pro",
    popular: true,
    price: { monthly: 29, annually: 290 },
    cta: { label: "Start trial" },
  },
];

const features = [
  {
    id: "projects",
    name: "Projects",
    values: { starter: "3", pro: "Unlimited" },
  },
  {
    id: "storage",
    name: "Storage",
    values: { starter: "1 GB", pro: "100 GB" },
  },
  {
    id: "analytics",
    name: "Analytics",
    values: { starter: false, pro: true },
  },
];

export default function Page() {
  return (
    <FeatureComparison
      tiers={tiers}
      features={features}
      headline="Compare plans"
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For individuals",
    price: { monthly: 0, annually: 0 },
    cta: { label: "Get started", variant: "outline" },
  },
  {
    id: "pro",
    name: "Pro",
    description: "For small teams",
    price: { monthly: 29, annually: 290 },
    popular: true,
    cta: { label: "Start trial" },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large orgs",
    price: { monthly: 99, annually: 990 },
    cta: { label: "Contact sales", variant: "outline" },
  },
];

const FEATURES: Feature[] = [
  {
    id: "projects",
    name: "Projects",
    description: "Number of projects you can create",
    values: { starter: "3", pro: "Unlimited", enterprise: "Unlimited" },
  },
  {
    id: "storage",
    name: "Storage",
    description: "Cloud storage for your files",
    values: { starter: "1 GB", pro: "100 GB", enterprise: "1 TB" },
  },
  {
    id: "team_members",
    name: "Team members",
    values: { starter: "Just you", pro: "10 seats", enterprise: "Unlimited" },
  },
  {
    id: "api_access",
    name: "API access",
    values: { starter: false, pro: true, enterprise: true },
  },
  {
    id: "analytics",
    name: "Analytics",
    values: { starter: "Basic", pro: "Advanced", enterprise: "Custom" },
  },
  {
    id: "support",
    name: "Support",
    values: { starter: "Community", pro: "Email", enterprise: "24/7 Phone" },
  },
  {
    id: "sso",
    name: "SSO",
    description: "Single sign-on with SAML 2.0",
    values: { starter: false, pro: false, enterprise: true },
  },
  {
    id: "audit_logs",
    name: "Audit logs",
    values: { starter: false, pro: "7 days", enterprise: "1 year" },
  },
  {
    id: "custom_domain",
    name: "Custom domain",
    values: { starter: false, pro: true, enterprise: true },
  },
  {
    id: "sla",
    name: "SLA guarantee",
    values: { starter: false, pro: false, enterprise: true },
  },
];

export const Default: Story = {
  args: {
    tiers: TIERS,
    features: FEATURES,
    headline: "Compare plans",
    subheadline: "Choose the perfect plan for your needs",
  },
};

export const TwoTiers: Story = {
  args: {
    tiers: TIERS.slice(0, 2),
    features: FEATURES,
    headline: "Compare plans",
  },
};

export const FourTiers: Story = {
  args: {
    tiers: [
      ...TIERS,
      {
        id: "ultimate",
        name: "Ultimate",
        description: "Everything included",
        price: { monthly: 199, annually: 1990 },
        cta: { label: "Contact us", variant: "outline" },
      },
    ],
    features: FEATURES,
    headline: "Compare all plans",
  },
};

export const NoTooltips: Story = {
  args: {
    tiers: TIERS,
    features: FEATURES,
    headline: "Compare plans",
    showTooltip: false,
  },
};

export const HighlightDifferences: Story = {
  args: {
    tiers: TIERS,
    features: FEATURES,
    headline: "Compare plans",
    highlightDifferences: true,
  },
};

export const DefaultAnnual: Story = {
  args: {
    tiers: TIERS,
    features: FEATURES,
    headline: "Compare plans",
    defaultAnnual: true,
  },
};

export const CustomDiscount: Story = {
  args: {
    tiers: TIERS,
    features: FEATURES,
    headline: "Compare plans",
    annualDiscountLabel: "Save 2 months",
  },
};

export const NoHeadline: Story = {
  args: {
    tiers: TIERS,
    features: FEATURES,
  },
};

export const MinimalFeatures: Story = {
  args: {
    tiers: TIERS,
    features: FEATURES.slice(0, 4),
    headline: "Compare plans",
  },
};

export const BooleanOnly: Story = {
  args: {
    tiers: TIERS,
    features: FEATURES.filter(
      (f) =>
        typeof f.values.starter === "boolean" ||
        typeof f.values.pro === "boolean" ||
        typeof f.values.enterprise === "boolean"
    ).map((f) => ({
      ...f,
      values: {
        starter: typeof f.values.starter === "boolean" ? f.values.starter : true,
        pro: true,
        enterprise: true,
      },
    })),
    headline: "Feature comparison",
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
    tiers: TIERS,
    features: FEATURES,
    headline: "Compare plans",
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    tiers: TIERS.slice(0, 2),
    features: FEATURES.slice(0, 5),
    headline: "Compare plans",
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  args: {
    tiers: TIERS,
    features: FEATURES,
    headline: "Compare plans",
  },
};
