import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { BillingOverview } from "./BillingOverview";

const meta: Meta<typeof BillingOverview> = {
  title: "Blocks/Settings/BillingOverview",
  component: BillingOverview,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { BillingOverview } from "@launchapp/design-system/blocks";

export default function Page() {
  return (
    <BillingOverview
      plan={{
        id: "pro",
        name: "Pro",
        price: "$29",
        billingCycle: "per month",
        features: ["Unlimited projects", "10GB storage"],
      }}
      status="active"
      usage={[
        { id: "storage", label: "Storage", used: 4.2, total: 10, unit: "GB" },
      ]}
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

const defaultPlan = {
  id: "pro",
  name: "Pro",
  description: "Everything you need to scale your business.",
  price: "$29",
  billingCycle: "per month",
  features: [
    "Unlimited projects",
    "10GB storage",
    "Priority support",
    "API access",
    "Custom domains",
    "Analytics dashboard",
  ],
};

const defaultUsage = [
  { id: "1", label: "Storage", used: 4.2, total: 10, unit: "GB", warningThreshold: 80 },
  { id: "2", label: "API calls", used: 8400, total: 10000, unit: "req/mo", warningThreshold: 90 },
  { id: "3", label: "Team members", used: 3, total: 10, unit: "seats" },
];

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <BillingOverview
        plan={defaultPlan}
        status="active"
        currentPeriodStart="2026-03-01"
        currentPeriodEnd="2026-04-01"
        usage={defaultUsage}
        onUpgrade={() => console.log("Upgrade")}
        onManage={() => console.log("Manage")}
        onCancel={() => console.log("Cancel")}
      />
    </div>
  ),
};

export const Trial: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <BillingOverview
        plan={{
          id: "pro",
          name: "Pro (Trial)",
          description: "Try all Pro features for 14 days.",
          price: "$0",
          billingCycle: "for 14 days",
          features: defaultPlan.features,
        }}
        status="trialing"
        currentPeriodStart="2026-03-21"
        currentPeriodEnd="2026-04-04"
        usage={[
          { id: "1", label: "Storage", used: 1.2, total: 10, unit: "GB" },
        ]}
        onUpgrade={() => console.log("Upgrade")}
        onManage={() => console.log("Manage")}
      />
    </div>
  ),
};

export const PastDue: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <BillingOverview
        plan={defaultPlan}
        status="past_due"
        currentPeriodStart="2026-03-01"
        currentPeriodEnd="2026-04-01"
        usage={[
          { id: "1", label: "Storage", used: 8.5, total: 10, unit: "GB", warningThreshold: 80 },
        ]}
        onManage={() => console.log("Update payment")}
      />
    </div>
  ),
};

export const Canceled: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <BillingOverview
        plan={defaultPlan}
        status="canceled"
        currentPeriodEnd="2026-04-01"
        usage={[]}
        onReactivate={() => console.log("Reactivate")}
      />
    </div>
  ),
};

export const CancelAtPeriodEnd: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <BillingOverview
        plan={defaultPlan}
        status="active"
        cancelAtPeriodEnd={true}
        currentPeriodStart="2026-03-01"
        currentPeriodEnd="2026-04-01"
        usage={defaultUsage}
        onReactivate={() => console.log("Reactivate")}
      />
    </div>
  ),
};

export const Paused: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <BillingOverview
        plan={defaultPlan}
        status="paused"
        usage={[]}
        onReactivate={() => console.log("Reactivate")}
      />
    </div>
  ),
};

export const NoUsage: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <BillingOverview
        plan={defaultPlan}
        status="active"
        showUsage={false}
        currentPeriodEnd="2026-04-01"
        onUpgrade={() => console.log("Upgrade")}
        onManage={() => console.log("Manage")}
      />
    </div>
  ),
};

export const HighUsage: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <BillingOverview
        plan={defaultPlan}
        status="active"
        currentPeriodEnd="2026-04-01"
        usage={[
          { id: "1", label: "Storage", used: 9.5, total: 10, unit: "GB", warningThreshold: 80 },
          { id: "2", label: "API calls", used: 9500, total: 10000, unit: "req/mo", warningThreshold: 90 },
        ]}
        onUpgrade={() => console.log("Upgrade")}
      />
    </div>
  ),
};

export const FreePlan: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <BillingOverview
        plan={{
          id: "free",
          name: "Free",
          description: "Get started with the basics.",
          price: "$0",
          billingCycle: "forever",
          features: [
            "Up to 3 projects",
            "1GB storage",
            "Community support",
          ],
        }}
        status="active"
        usage={[
          { id: "1", label: "Projects", used: 2, total: 3, unit: "" },
          { id: "2", label: "Storage", used: 0.8, total: 1, unit: "GB", warningThreshold: 80 },
        ]}
        onUpgrade={() => console.log("Upgrade")}
        onManage={() => console.log("Manage")}
      />
    </div>
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
    <div style={{ maxWidth: 600 }}>
      <BillingOverview
        plan={defaultPlan}
        status="active"
        currentPeriodEnd="2026-04-01"
        usage={defaultUsage}
        onUpgrade={() => console.log("Upgrade")}
        onManage={() => console.log("Manage")}
      />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <BillingOverview
      plan={defaultPlan}
      status="active"
      currentPeriodEnd="2026-04-01"
      usage={defaultUsage}
      onUpgrade={() => console.log("Upgrade")}
      onManage={() => console.log("Manage")}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <BillingOverview
        plan={defaultPlan}
        status="active"
        currentPeriodEnd="2026-04-01"
        usage={defaultUsage}
        onUpgrade={() => console.log("Upgrade")}
        onManage={() => console.log("Manage")}
      />
    </div>
  ),
};
