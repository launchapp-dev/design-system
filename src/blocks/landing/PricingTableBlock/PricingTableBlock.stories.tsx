import type { Meta, StoryObj } from "@storybook/react";
import { PricingTableBlock } from "./index";
import type { PricingTableFeature } from "./index";

const meta: Meta<typeof PricingTableBlock> = {
  title: "Blocks/Landing/PricingTableBlock",
  component: PricingTableBlock,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `import { PricingTableBlock } from "@launchapp/design-system/blocks";

export default function Page() {
  return (
    <PricingTableBlock
      headline="Simple, transparent pricing"
      subheadline="Choose the plan that works best for you. Upgrade or downgrade at any time."
      showToggle={true}
      onPlanSelect={(plan) => console.log(plan)}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PricingTableBlock>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <PricingTableBlock
        headline="Simple, transparent pricing"
        subheadline="Choose the plan that works best for you. Upgrade or downgrade at any time."
      />
    </div>
  ),
};

export const WithoutToggle: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <PricingTableBlock headline="Choose your plan" showToggle={false} />
    </div>
  ),
};

export const DefaultAnnual: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <PricingTableBlock
        headline="Annual pricing"
        subheadline="Save 20% when you pay annually."
        defaultAnnual={true}
      />
    </div>
  ),
};

export const WithFeatureComparison: Story = {
  render: () => {
    const features: PricingTableFeature[] = [
      {
        label: "Projects",
        free: "3",
        pro: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        label: "Storage",
        free: "1 GB",
        pro: "100 GB",
        enterprise: "1 TB",
      },
      {
        label: "Analytics",
        free: "Basic",
        pro: "Advanced",
        enterprise: "Custom",
      },
      {
        label: "Support",
        free: "Community",
        pro: "Priority",
        enterprise: "Dedicated",
      },
      {
        label: "Custom domains",
        free: "—",
        pro: "✓",
        enterprise: "✓",
      },
      {
        label: "Team collaboration",
        free: "—",
        pro: "✓",
        enterprise: "✓",
      },
      {
        label: "SSO & SAML",
        free: "—",
        pro: "—",
        enterprise: "✓",
      },
      {
        label: "SLA guarantee",
        free: "—",
        pro: "—",
        enterprise: "✓",
      },
    ];
    return (
      <div className="min-h-screen bg-background">
        <PricingTableBlock
          headline="Compare plans"
          subheadline="Everything you need to build and scale your product."
          features={features}
        />
      </div>
    );
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
  render: () => (
    <div className="min-h-screen bg-background">
      <PricingTableBlock
        headline="Simple, transparent pricing"
        subheadline="No hidden fees. Cancel anytime."
      />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <div className="min-h-screen bg-background">
      <PricingTableBlock
        headline="Simple, transparent pricing"
        subheadline="Choose the plan that works best for you."
      />
    </div>
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <div className="min-h-screen bg-background">
      <PricingTableBlock
        headline="Simple, transparent pricing"
        subheadline="Choose the plan that works best for you."
      />
    </div>
  ),
};
