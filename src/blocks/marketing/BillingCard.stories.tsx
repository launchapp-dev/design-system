import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { BillingCard } from "./BillingCard";

const meta: Meta<typeof BillingCard> = {
  title: "Blocks/Marketing/BillingCard",
  component: BillingCard,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `import { BillingCard } from "@launchapp/design-system/blocks";

export default function Page() {
  return (
    <BillingCard
      planName="Pro Plan"
      price="$29"
      billingPeriod="month"
      features={[
        { name: "Unlimited projects", included: true },
        { name: "10 team members", included: true },
        { name: "Priority support", included: true },
        { name: "Custom branding", included: false },
      ]}
      onManage={() => console.log("Manage")}
      onUpgrade={() => console.log("Upgrade")}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultFeatures = [
  { name: "Unlimited projects", included: true },
  { name: "10 team members", included: true },
  { name: "Priority support", included: true },
  { name: "Analytics dashboard", included: true },
  { name: "Custom branding", included: false },
  { name: "Dedicated account manager", included: false },
];

export const Default: Story = {
  args: {
    planName: "Pro Plan",
    planDescription: "Everything you need to scale your business",
    price: "$29",
    billingPeriod: "month",
    status: "active",
    features: defaultFeatures,
    nextBillingDate: "Jan 15, 2027",
    onManage: () => console.log("Manage"),
    onUpgrade: () => console.log("Upgrade"),
  },
};

export const Compact: Story = {
  args: {
    planName: "Pro Plan",
    price: "$29",
    billingPeriod: "month",
    status: "active",
    compact: true,
    onManage: () => console.log("Manage"),
    onUpgrade: () => console.log("Upgrade"),
  },
};

export const CompactWithUsage: Story = {
  args: {
    planName: "Pro Plan",
    price: "$29",
    billingPeriod: "month",
    status: "active",
    compact: true,
    usage: {
      label: "API calls",
      used: 7500,
      total: 10000,
      unit: "calls",
    },
    onManage: () => console.log("Manage"),
    onUpgrade: () => console.log("Upgrade"),
  },
};

export const WithUsage: Story = {
  args: {
    planName: "Pro Plan",
    price: "$29",
    billingPeriod: "month",
    status: "active",
    features: defaultFeatures,
    usage: {
      label: "API calls this month",
      used: 7500,
      total: 10000,
      unit: "calls",
    },
    onManage: () => console.log("Manage"),
    onUpgrade: () => console.log("Upgrade"),
  },
};

export const HighUsage: Story = {
  args: {
    planName: "Pro Plan",
    price: "$29",
    billingPeriod: "month",
    status: "active",
    features: defaultFeatures,
    usage: {
      label: "API calls this month",
      used: 9200,
      total: 10000,
      unit: "calls",
    },
    onManage: () => console.log("Manage"),
    onUpgrade: () => console.log("Upgrade"),
  },
};

export const WithPaymentMethod: Story = {
  args: {
    planName: "Pro Plan",
    price: "$29",
    billingPeriod: "month",
    status: "active",
    features: defaultFeatures,
    paymentMethod: {
      type: "card",
      brand: "Visa",
      last4: "4242",
      expiry: "12/27",
    },
    nextBillingDate: "Jan 15, 2027",
    onManage: () => console.log("Manage"),
    onUpgrade: () => console.log("Upgrade"),
    onUpdatePayment: () => console.log("Update payment"),
  },
};

export const TrialStatus: Story = {
  args: {
    planName: "Pro Plan",
    price: "$0",
    billingPeriod: "month",
    status: "trialing",
    features: defaultFeatures,
    nextBillingDate: "Jan 10, 2027",
    onManage: () => console.log("Manage"),
    onUpgrade: () => console.log("Upgrade"),
  },
};

export const PastDue: Story = {
  args: {
    planName: "Pro Plan",
    price: "$29",
    billingPeriod: "month",
    status: "past_due",
    features: defaultFeatures,
    paymentMethod: {
      type: "card",
      brand: "Visa",
      last4: "4242",
      expiry: "12/25",
    },
    onManage: () => console.log("Manage"),
    onUpgrade: () => console.log("Upgrade"),
    onUpdatePayment: () => console.log("Update payment"),
  },
};

export const Canceled: Story = {
  args: {
    planName: "Pro Plan",
    price: "$29",
    billingPeriod: "month",
    status: "canceled",
    features: defaultFeatures,
    onManage: () => console.log("Manage"),
    onUpgrade: () => console.log("Upgrade"),
  },
};

export const AnnualBilling: Story = {
  args: {
    planName: "Pro Plan",
    planDescription: "Save 20% with annual billing",
    price: "$290",
    billingPeriod: "year",
    status: "active",
    features: defaultFeatures,
    nextBillingDate: "Jan 15, 2028",
    onManage: () => console.log("Manage"),
    onUpgrade: () => console.log("Upgrade"),
  },
};

export const NoFeatures: Story = {
  args: {
    planName: "Basic Plan",
    price: "$9",
    billingPeriod: "month",
    status: "active",
    onManage: () => console.log("Manage"),
    onUpgrade: () => console.log("Upgrade"),
  },
};

export const NoActions: Story = {
  args: {
    planName: "Pro Plan",
    price: "$29",
    billingPeriod: "month",
    status: "active",
    features: defaultFeatures,
  },
};

export const EnterprisePlan: Story = {
  args: {
    planName: "Enterprise",
    planDescription: "For large organizations",
    price: "$99",
    billingPeriod: "month",
    status: "active",
    features: [
      { name: "Unlimited everything", included: true },
      { name: "Unlimited team members", included: true },
      { name: "24/7 phone support", included: true },
      { name: "Custom integrations", included: true },
      { name: "SLA guarantee", included: true },
      { name: "Dedicated infrastructure", included: true },
    ],
    usage: {
      label: "Storage used",
      used: 450,
      total: 1000,
      unit: "GB",
    },
    nextBillingDate: "Jan 15, 2027",
    onManage: () => console.log("Manage"),
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
  args: {
    planName: "Pro Plan",
    planDescription: "Everything you need to scale",
    price: "$29",
    billingPeriod: "month",
    status: "active",
    features: defaultFeatures,
    usage: {
      label: "API calls",
      used: 7500,
      total: 10000,
      unit: "calls",
    },
    onManage: () => console.log("Manage"),
    onUpgrade: () => console.log("Upgrade"),
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    planName: "Pro Plan",
    price: "$29",
    billingPeriod: "month",
    status: "active",
    features: defaultFeatures,
    onManage: () => console.log("Manage"),
    onUpgrade: () => console.log("Upgrade"),
  },
};
