import type { Meta, StoryObj } from "@storybook/react";
import { InvoiceTable, type Invoice } from "./InvoiceTable";

const sampleInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-2024-001",
    client: "Acme Corporation",
    clientEmail: "billing@acme.com",
    clientInitials: "AC",
    amount: 4500,
    currency: "USD",
    status: "paid",
    dueDate: "2024-02-15",
    issuedDate: "2024-01-15",
    description: "Website redesign project",
  },
  {
    id: "2",
    number: "INV-2024-002",
    client: "TechStart Inc",
    clientEmail: "finance@techstart.io",
    clientInitials: "TS",
    amount: 2800,
    currency: "USD",
    status: "pending",
    dueDate: "2024-03-01",
    issuedDate: "2024-02-01",
    description: "API integration services",
  },
  {
    id: "3",
    number: "INV-2024-003",
    client: "Global Media Ltd",
    clientEmail: "accounts@globalmedia.co.uk",
    clientInitials: "GM",
    amount: 12500,
    currency: "USD",
    status: "overdue",
    dueDate: "2024-01-30",
    issuedDate: "2023-12-30",
    description: "Q4 marketing campaign",
  },
  {
    id: "4",
    number: "INV-2024-004",
    client: "Bright Ideas Studio",
    clientInitials: "BI",
    amount: 950,
    currency: "USD",
    status: "draft",
    dueDate: "2024-03-20",
    issuedDate: "2024-03-01",
  },
  {
    id: "5",
    number: "INV-2024-005",
    client: "Vertex Solutions",
    clientEmail: "ap@vertexsol.com",
    clientInitials: "VS",
    amount: 3200,
    currency: "USD",
    status: "paid",
    dueDate: "2024-02-28",
    issuedDate: "2024-01-28",
    description: "Monthly retainer — February",
  },
  {
    id: "6",
    number: "INV-2024-006",
    client: "Nexus Digital",
    clientInitials: "ND",
    amount: 6700,
    currency: "USD",
    status: "pending",
    dueDate: "2024-03-15",
    issuedDate: "2024-02-15",
    description: "E-commerce platform development",
  },
  {
    id: "7",
    number: "INV-2024-007",
    client: "Harbor View Group",
    clientEmail: "billing@harborview.com",
    clientInitials: "HV",
    amount: 1890,
    currency: "USD",
    status: "paid",
    dueDate: "2024-01-20",
    issuedDate: "2023-12-20",
    description: "Consulting services",
  },
  {
    id: "8",
    number: "INV-2024-008",
    client: "Pinnacle Systems",
    clientInitials: "PS",
    amount: 5400,
    currency: "USD",
    status: "overdue",
    dueDate: "2024-02-10",
    issuedDate: "2024-01-10",
    description: "Infrastructure audit",
  },
];

const meta: Meta<typeof InvoiceTable> = {
  title: "Blocks/Data/InvoiceTable",
  component: InvoiceTable,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { InvoiceTable } from "@launchapp/design-system/blocks";`,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof InvoiceTable>;

export const Default: Story = {
  args: {
    invoices: sampleInvoices,
  },
};

export const AllPaid: Story = {
  args: {
    invoices: sampleInvoices
      .filter((i) => i.status === "paid")
      .map((i) => ({ ...i, status: "paid" as const })),
  },
};

export const AllPending: Story = {
  args: {
    invoices: sampleInvoices
      .filter((i) => i.status === "pending")
      .map((i) => ({ ...i, status: "pending" as const })),
  },
};

export const WithOverdue: Story = {
  args: {
    invoices: sampleInvoices.filter((i) => i.status === "overdue"),
  },
};

export const WithHandlers: Story = {
  args: {
    invoices: sampleInvoices,
    onViewInvoice: (inv) => console.log("View invoice:", inv.number),
    onDownloadInvoice: (inv) => console.log("Download invoice:", inv.number),
    onMarkPaid: (inv) => console.log("Mark paid:", inv.number),
    onSendReminder: (inv) => console.log("Send reminder:", inv.number),
    onDeleteInvoice: (inv) => console.log("Delete invoice:", inv.number),
  },
};

export const Empty: Story = {
  args: {
    invoices: [],
    emptyMessage: "No invoices yet. Create your first invoice to get started.",
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  args: {
    invoices: sampleInvoices,
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  args: {
    invoices: sampleInvoices,
  },
};

export const Tablet: Story = {
  parameters: { viewport: { defaultViewport: "tablet" } },
  args: {
    invoices: sampleInvoices,
  },
};
