import type * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BillingHistory } from "./BillingHistory";
import type { BillingInvoice } from "./BillingHistory";

const generateInvoice = (overrides: Partial<BillingInvoice> = {}): BillingInvoice => ({
  id: `inv-${Math.random().toString(36).slice(2)}`,
  number: `INV-2024-${String(Math.floor(Math.random() * 900) + 100)}`,
  date: new Date(Date.now() - Math.random() * 86400000 * 90).toISOString(),
  amount: `$${(Math.random() * 500 + 10).toFixed(2)}`,
  status: "paid",
  ...overrides,
});

const statuses = ["paid", "paid", "paid", "pending", "failed", "refunded"] as const;

const sampleInvoices: BillingInvoice[] = Array.from({ length: 12 }, (_, i) =>
  generateInvoice({ status: statuses[i % statuses.length] })
);

const meta: Meta<typeof BillingHistory> = {
  title: "Blocks/Billing/BillingHistory",
  component: BillingHistory,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { BillingHistory } from "@launchapp/design-system/blocks/billing";

export default function Page() {
  return (
    <BillingHistory
      invoices={invoices}
      onDownload={(inv) => window.open(inv.downloadUrl)}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BillingHistory>;

export const Default: Story = {
  args: {
    invoices: sampleInvoices,
    title: "Billing History",
    pageSize: 5,
  },
};

export const WithTax: Story = {
  args: {
    invoices: sampleInvoices.map((inv) => ({ ...inv, tax: "$9.50" })),
    showTax: true,
    title: "Billing History",
  },
};

export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: (args) => (
    <div className="dark bg-background p-6 space-y-4">
      <BillingHistory {...args} />
    </div>
  ),
  args: {
    invoices: sampleInvoices,
    title: "Billing History",
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => <BillingHistory {...args} />,
  args: {
    invoices: sampleInvoices,
    title: "Billing History",
    pageSize: 5,
  },
};
