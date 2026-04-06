import type { Meta, StoryObj } from "@storybook/react";
import { SubscriptionManager } from "./SubscriptionManager";

const meta: Meta<typeof SubscriptionManager> = {
  title: "Blocks/Billing/SubscriptionManager",
  component: SubscriptionManager,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    billingCycle: "forever",
    features: ["Up to 3 projects", "1GB storage", "Community support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    billingCycle: "per month",
    features: ["Unlimited projects", "10GB storage", "Priority support", "API access", "Custom domains"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$99",
    billingCycle: "per month",
    features: ["Everything in Pro", "Unlimited storage", "Dedicated support", "SSO/SAML", "Audit logs"],
  },
];

export const Default: Story = {
  render: () => (
    <SubscriptionManager
      plans={plans}
      currentPlanId="free"
      onSubscribe={(id) => console.log("Subscribe", id)}
    />
  ),
};

export const ProSelected: Story = {
  render: () => (
    <SubscriptionManager
      plans={plans}
      currentPlanId="pro"
      onSubscribe={(id) => console.log("Subscribe", id)}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <SubscriptionManager
      plans={plans}
      currentPlanId="free"
      onSubscribe={(id) => console.log("Subscribe", id)}
      isLoading
    />
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <SubscriptionManager
      plans={plans}
      currentPlanId="free"
      onSubscribe={(id) => console.log("Subscribe", id)}
    />
  ),
};
