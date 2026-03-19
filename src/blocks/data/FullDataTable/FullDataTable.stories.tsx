import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FullDataTable, FilterOption } from "./FullDataTable";
import { Badge } from "@/components/Badge";

type Task = {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done" | "cancelled";
  priority: "low" | "medium" | "high";
  assignee: string;
  dueDate: string;
  estimate: number;
};

const statusVariant: Record<Task["status"], "default" | "secondary" | "destructive" | "outline"> = {
  done: "default",
  "in-progress": "secondary",
  todo: "outline",
  cancelled: "destructive",
};

const priorityVariant: Record<Task["priority"], "default" | "secondary" | "destructive" | "outline"> = {
  high: "destructive",
  medium: "default",
  low: "secondary",
};

const tasks: Task[] = [
  { id: "TASK-001", title: "Design system audit", status: "done", priority: "high", assignee: "Alice Chen", dueDate: "2024-02-01", estimate: 8 },
  { id: "TASK-002", title: "Implement auth flow", status: "in-progress", priority: "high", assignee: "Bob Smith", dueDate: "2024-02-05", estimate: 16 },
  { id: "TASK-003", title: "Write API docs", status: "todo", priority: "medium", assignee: "Carol Davis", dueDate: "2024-02-10", estimate: 6 },
  { id: "TASK-004", title: "Fix mobile nav bug", status: "in-progress", priority: "high", assignee: "Dave Wilson", dueDate: "2024-02-03", estimate: 4 },
  { id: "TASK-005", title: "Add dark mode support", status: "todo", priority: "medium", assignee: "Eve Martinez", dueDate: "2024-02-15", estimate: 12 },
  { id: "TASK-006", title: "Performance profiling", status: "done", priority: "low", assignee: "Frank Lee", dueDate: "2024-01-28", estimate: 10 },
  { id: "TASK-007", title: "Migrate to Postgres", status: "cancelled", priority: "high", assignee: "Grace Kim", dueDate: "2024-02-20", estimate: 24 },
  { id: "TASK-008", title: "Set up CI pipeline", status: "done", priority: "medium", assignee: "Henry Brown", dueDate: "2024-01-30", estimate: 8 },
  { id: "TASK-009", title: "Add Cypress tests", status: "todo", priority: "medium", assignee: "Ivy Johnson", dueDate: "2024-02-12", estimate: 20 },
  { id: "TASK-010", title: "Refactor data layer", status: "in-progress", priority: "high", assignee: "Jack Taylor", dueDate: "2024-02-08", estimate: 16 },
  { id: "TASK-011", title: "Update dependency list", status: "todo", priority: "low", assignee: "Kate Anderson", dueDate: "2024-02-22", estimate: 3 },
  { id: "TASK-012", title: "Customer onboarding flow", status: "in-progress", priority: "high", assignee: "Liam Thomas", dueDate: "2024-02-06", estimate: 32 },
  { id: "TASK-013", title: "Email notification templates", status: "todo", priority: "medium", assignee: "Mia Jackson", dueDate: "2024-02-18", estimate: 6 },
  { id: "TASK-014", title: "Rate limiting middleware", status: "done", priority: "high", assignee: "Noah White", dueDate: "2024-01-25", estimate: 8 },
  { id: "TASK-015", title: "Analytics dashboard", status: "cancelled", priority: "low", assignee: "Olivia Harris", dueDate: "2024-03-01", estimate: 40 },
  { id: "TASK-016", title: "SSO integration", status: "todo", priority: "high", assignee: "Paul Clark", dueDate: "2024-02-25", estimate: 20 },
  { id: "TASK-017", title: "Search indexing", status: "in-progress", priority: "medium", assignee: "Quinn Lewis", dueDate: "2024-02-14", estimate: 14 },
  { id: "TASK-018", title: "Billing module", status: "todo", priority: "high", assignee: "Rachel Walker", dueDate: "2024-03-05", estimate: 30 },
  { id: "TASK-019", title: "Accessibility audit", status: "done", priority: "medium", assignee: "Sam Hall", dueDate: "2024-01-20", estimate: 12 },
  { id: "TASK-020", title: "Webhook system", status: "todo", priority: "medium", assignee: "Tina Young", dueDate: "2024-02-28", estimate: 18 },
];

const statusOptions: FilterOption[] = [
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
  { label: "Cancelled", value: "cancelled" },
];

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.getValue("status") as Task["status"]]}>
        {String(row.getValue("status")).replace("-", " ")}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <Badge variant={priorityVariant[row.getValue("priority") as Task["priority"]]}>
        {String(row.getValue("priority"))}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    accessorKey: "estimate",
    header: "Est. (h)",
  },
];

const meta: Meta<typeof FullDataTable> = {
  title: "Blocks/Data/FullDataTable",
  component: FullDataTable,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FullDataTable
      columns={columns}
      data={tasks}
      searchColumn="title"
      searchPlaceholder="Search tasks..."
      filterColumn="status"
      filterOptions={statusOptions}
      pageSize={10}
      onBulkDelete={(rows) => console.log("Delete", rows)}
    />
  ),
};

export const WithBulkActions: Story = {
  render: () => (
    <FullDataTable
      columns={columns}
      data={tasks}
      searchColumn="title"
      searchPlaceholder="Search tasks..."
      filterColumn="status"
      filterOptions={statusOptions}
      pageSize={10}
      onBulkDelete={(rows) => alert(`Would delete ${rows.length} rows`)}
    />
  ),
};

export const NoFilter: Story = {
  render: () => (
    <FullDataTable
      columns={columns}
      data={tasks}
      searchColumn="title"
      searchPlaceholder="Search tasks..."
      pageSize={10}
    />
  ),
};

export const EmptyState: Story = {
  render: () => (
    <FullDataTable
      columns={columns}
      data={[]}
      searchColumn="title"
      searchPlaceholder="Search tasks..."
      filterColumn="status"
      filterOptions={statusOptions}
    />
  ),
};

export const SmallDataset: Story = {
  render: () => (
    <FullDataTable
      columns={columns}
      data={tasks.slice(0, 5)}
      searchColumn="title"
      searchPlaceholder="Search tasks..."
      filterColumn="status"
      filterOptions={statusOptions}
      pageSize={10}
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
    <FullDataTable
      columns={columns}
      data={tasks}
      searchColumn="title"
      searchPlaceholder="Search tasks..."
      filterColumn="status"
      filterOptions={statusOptions}
      pageSize={10}
      onBulkDelete={(rows) => console.log("Delete", rows)}
    />
  ),
};
