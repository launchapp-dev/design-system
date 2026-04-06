import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

type Payment = {
  id: string;
  status: "pending" | "processing" | "success" | "failed";
  amount: number;
  method: string;
  email: string;
  date: string;
};

const statusColors: Record<Payment["status"], string> = {
  success: "text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs font-medium",
  pending: "text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full text-xs font-medium",
  processing: "text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-xs font-medium",
  failed: "text-red-600 bg-red-50 px-2 py-0.5 rounded-full text-xs font-medium",
};

const payments: Payment[] = [
  { id: "PAY-001", status: "success", amount: 316.00, method: "Credit Card", email: "alice@example.com", date: "2024-01-15" },
  { id: "PAY-002", status: "pending", amount: 242.00, method: "PayPal", email: "bob@example.com", date: "2024-01-16" },
  { id: "PAY-003", status: "processing", amount: 837.00, method: "Bank Transfer", email: "carol@example.com", date: "2024-01-17" },
  { id: "PAY-004", status: "failed", amount: 874.00, method: "Credit Card", email: "dave@example.com", date: "2024-01-18" },
  { id: "PAY-005", status: "success", amount: 721.00, method: "PayPal", email: "eve@example.com", date: "2024-01-19" },
  { id: "PAY-006", status: "success", amount: 492.00, method: "Credit Card", email: "frank@example.com", date: "2024-01-20" },
  { id: "PAY-007", status: "pending", amount: 133.00, method: "Bank Transfer", email: "grace@example.com", date: "2024-01-21" },
  { id: "PAY-008", status: "processing", amount: 918.00, method: "PayPal", email: "henry@example.com", date: "2024-01-22" },
  { id: "PAY-009", status: "success", amount: 655.00, method: "Credit Card", email: "ivy@example.com", date: "2024-01-23" },
  { id: "PAY-010", status: "failed", amount: 390.00, method: "Bank Transfer", email: "jack@example.com", date: "2024-01-24" },
  { id: "PAY-011", status: "success", amount: 204.00, method: "PayPal", email: "kate@example.com", date: "2024-01-25" },
  { id: "PAY-012", status: "pending", amount: 567.00, method: "Credit Card", email: "liam@example.com", date: "2024-01-26" },
  { id: "PAY-013", status: "processing", amount: 789.00, method: "Bank Transfer", email: "mia@example.com", date: "2024-01-27" },
  { id: "PAY-014", status: "success", amount: 345.00, method: "PayPal", email: "noah@example.com", date: "2024-01-28" },
  { id: "PAY-015", status: "failed", amount: 623.00, method: "Credit Card", email: "olivia@example.com", date: "2024-01-29" },
  { id: "PAY-016", status: "success", amount: 411.00, method: "Bank Transfer", email: "paul@example.com", date: "2024-01-30" },
  { id: "PAY-017", status: "pending", amount: 952.00, method: "PayPal", email: "quinn@example.com", date: "2024-02-01" },
  { id: "PAY-018", status: "processing", amount: 178.00, method: "Credit Card", email: "rachel@example.com", date: "2024-02-02" },
  { id: "PAY-019", status: "success", amount: 841.00, method: "Bank Transfer", email: "sam@example.com", date: "2024-02-03" },
  { id: "PAY-020", status: "failed", amount: 274.00, method: "PayPal", email: "tina@example.com", date: "2024-02-04" },
];

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className={statusColors[row.getValue("status") as Payment["status"]]}>
        {row.getValue("status")}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
    },
  },
  {
    accessorKey: "method",
    header: "Method",
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: false,
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    filterPlaceholder: {
      control: "text",
      description: "Placeholder text for the filter input",
    },
    pageSize: {
      control: { type: "select" },
      options: [5, 10, 20, 30, 50],
      description: "Initial number of rows per page",
    },
    filterColumn: {
      control: "text",
      description: "Column accessorKey to filter on",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={payments}
      filterColumn="email"
      filterPlaceholder="Filter by email..."
      pageSize={10}
      aria-label="Payments"
    />
  ),
};

export const WithAriaLabel: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={payments}
      filterColumn="email"
      filterPlaceholder="Filter by email..."
      pageSize={5}
      aria-label="Payments"
    />
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-10">
      <div>
        <p className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">With Email Filter + Sorting</p>
        <DataTable
          columns={columns}
          data={payments}
          filterColumn="email"
          filterPlaceholder="Filter by email..."
          pageSize={5}
          aria-label="Payments with filter and sorting"
        />
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">No Filter Input</p>
        <DataTable
          columns={columns}
          data={payments.slice(0, 8)}
          pageSize={5}
          aria-label="Recent payments"
        />
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Empty State</p>
        <DataTable
          columns={columns}
          data={[]}
          filterColumn="email"
          filterPlaceholder="Filter by email..."
          aria-label="Payments (empty)"
        />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-10">
      <div>
        <p className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">5 Rows per Page</p>
        <DataTable
          columns={columns}
          data={payments}
          filterColumn="email"
          filterPlaceholder="Filter by email..."
          pageSize={5}
          aria-label="Payments (5 per page)"
        />
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">10 Rows per Page</p>
        <DataTable
          columns={columns}
          data={payments}
          filterColumn="email"
          filterPlaceholder="Filter by email..."
          pageSize={10}
          aria-label="Payments (10 per page)"
        />
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">20 Rows per Page (all visible on one page)</p>
        <DataTable
          columns={columns}
          data={payments}
          filterColumn="email"
          filterPlaceholder="Filter by email..."
          pageSize={20}
          aria-label="Payments (20 per page)"
        />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    filterColumn: "email",
    filterPlaceholder: "Filter by email...",
    pageSize: 10,
    "aria-label": "Payments",
  },
  render: (args) => (
    <DataTable
      columns={columns}
      data={payments}
      filterColumn={args.filterColumn}
      filterPlaceholder={args.filterPlaceholder}
      pageSize={args.pageSize}
      aria-label={args["aria-label"]}
    />
  ),
};

export const SmallDataset: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={payments.slice(0, 5)}
      filterColumn="email"
      filterPlaceholder="Filter by email..."
      pageSize={10}
      aria-label="Recent payments"
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      filterColumn="email"
      filterPlaceholder="Filter by email..."
      aria-label="Payments (empty)"
    />
  ),
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
    <DataTable
      columns={columns}
      data={payments}
      filterColumn="email"
      filterPlaceholder="Filter by email..."
      pageSize={10}
      aria-label="Payments"
    />
  ),
};
