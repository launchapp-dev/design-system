import type { Meta, StoryObj } from "@storybook/react";
import { InvoiceTable } from "./InvoiceTable";

const meta: Meta<typeof InvoiceTable> = {
  title: "Blocks/Billing/InvoiceTable",
  component: InvoiceTable,
  parameters: {
    layout: "padded",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const defaultInvoices = [
  {
    id: "1",
    number: "INV-2026-001",
    date: "2026-03-01",
    amount: "$29.00",
    status: "paid" as const,
    description: "Pro plan — March 2026",
    downloadUrl: "#",
  },
  {
    id: "2",
    number: "INV-2026-002",
    date: "2026-04-01",
    amount: "$29.00",
    status: "paid" as const,
    description: "Pro plan — April 2026",
    downloadUrl: "#",
  },
  {
    id: "3",
    number: "INV-2026-003",
    date: "2026-05-01",
    amount: "$29.00",
    status: "pending" as const,
    description: "Pro plan — May 2026",
  },
  {
    id: "4",
    number: "INV-2026-004",
    date: "2026-02-01",
    amount: "$29.00",
    status: "failed" as const,
    description: "Pro plan — February 2026",
  },
  {
    id: "5",
    number: "INV-2026-005",
    date: "2026-01-01",
    amount: "$29.00",
    status: "refunded" as const,
    description: "Pro plan — January 2026",
  },
];

export const Default: Story = {
  render: () => (
    <InvoiceTable
      invoices={defaultInvoices}
      showDescription
      caption="Your recent invoices"
      onDownload={(inv) => console.log("Download", inv.number)}
      onView={(inv) => console.log("View", inv.number)}
    />
  ),
};

export const PaidOnly: Story = {
  render: () => (
    <InvoiceTable
      invoices={defaultInvoices.filter((i) => i.status === "paid")}
      showDescription
      onDownload={(inv) => console.log("Download", inv.number)}
    />
  ),
};

export const Pending: Story = {
  render: () => (
    <InvoiceTable
      invoices={defaultInvoices.filter((i) => i.status === "pending")}
      onDownload={(inv) => console.log("Download", inv.number)}
    />
  ),
};

export const Empty: Story = {
  render: () => <InvoiceTable invoices={[]} caption="No invoices yet" />,
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <InvoiceTable
      invoices={defaultInvoices.slice(0, 2)}
      showDescription
      onDownload={(inv) => console.log("Download", inv.number)}
    />
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <InvoiceTable
      invoices={defaultInvoices.slice(0, 3)}
      onDownload={(inv) => console.log("Download", inv.number)}
    />
  ),
};
