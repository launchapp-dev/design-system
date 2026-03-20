import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { BillingPage } from "./BillingPage";

const meta: Meta<typeof BillingPage> = {
  title: "Blocks/Settings/BillingPage",
  component: BillingPage,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { BillingPage } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <BillingPage
      currentPlan="pro"
      onUpgrade={(plan) => console.log("upgrade to", plan)}
      onManagePayment={() => console.log("manage payment")}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 800 }}>
      <BillingPage
        onUpgrade={() => console.log("Upgrade")}
        onUpdatePayment={() => console.log("Update payment")}
        onDownloadInvoice={(id) => console.log("Download", id)}
      />
    </div>
  ),
};

export const PastDue: Story = {
  render: () => (
    <div style={{ maxWidth: 800 }}>
      <BillingPage
        plan={{
          name: "Pro",
          price: "$29",
          billingCycle: "per month",
          status: "past_due",
          features: ["Unlimited projects", "10GB storage", "Priority support"],
        }}
        usage={[
          { label: "Storage", used: 9.8, total: 10, unit: "GB" },
          { label: "API calls", used: 9900, total: 10000, unit: "req/mo" },
        ]}
        invoices={[
          { id: "INV-004", date: "Mar 1, 2026", amount: "$29.00", status: "open" },
          { id: "INV-003", date: "Feb 1, 2026", amount: "$29.00", status: "paid" },
        ]}
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
    <div style={{ maxWidth: 800 }}>
      <BillingPage />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <BillingPage
      onUpgrade={() => console.log("Upgrade")}
      onUpdatePayment={() => console.log("Update payment")}
      onDownloadInvoice={(id) => console.log("Download", id)}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <BillingPage
        onUpgrade={() => console.log("Upgrade")}
        onUpdatePayment={() => console.log("Update payment")}
        onDownloadInvoice={(id) => console.log("Download", id)}
      />
    </div>
  ),
};
