import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";
import { FullDataTable, type FilterOption } from "./FullDataTable";
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

const priorityVariant: Record<
  Task["priority"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  high: "destructive",
  medium: "default",
  low: "secondary",
};

const tasks: Task[] = [
  {
    id: "TASK-001",
    title: "Design system audit",
    status: "done",
    priority: "high",
    assignee: "Alice Chen",
    dueDate: "2024-02-01",
    estimate: 8,
  },
  {
    id: "TASK-002",
    title: "Implement auth flow",
    status: "in-progress",
    priority: "high",
    assignee: "Bob Smith",
    dueDate: "2024-02-05",
    estimate: 16,
  },
  {
    id: "TASK-003",
    title: "Write API docs",
    status: "todo",
    priority: "medium",
    assignee: "Carol Davis",
    dueDate: "2024-02-10",
    estimate: 6,
  },
  {
    id: "TASK-004",
    title: "Fix mobile nav bug",
    status: "in-progress",
    priority: "high",
    assignee: "Dave Wilson",
    dueDate: "2024-02-03",
    estimate: 4,
  },
  {
    id: "TASK-005",
    title: "Add dark mode support",
    status: "todo",
    priority: "medium",
    assignee: "Eve Martinez",
    dueDate: "2024-02-15",
    estimate: 12,
  },
  {
    id: "TASK-006",
    title: "Performance profiling",
    status: "done",
    priority: "low",
    assignee: "Frank Lee",
    dueDate: "2024-01-28",
    estimate: 10,
  },
  {
    id: "TASK-007",
    title: "Migrate to Postgres",
    status: "cancelled",
    priority: "high",
    assignee: "Grace Kim",
    dueDate: "2024-02-20",
    estimate: 24,
  },
  {
    id: "TASK-008",
    title: "Set up CI pipeline",
    status: "done",
    priority: "medium",
    assignee: "Henry Brown",
    dueDate: "2024-01-30",
    estimate: 8,
  },
  {
    id: "TASK-009",
    title: "Add Cypress tests",
    status: "todo",
    priority: "medium",
    assignee: "Ivy Johnson",
    dueDate: "2024-02-12",
    estimate: 20,
  },
  {
    id: "TASK-010",
    title: "Refactor data layer",
    status: "in-progress",
    priority: "high",
    assignee: "Jack Taylor",
    dueDate: "2024-02-08",
    estimate: 16,
  },
  {
    id: "TASK-011",
    title: "Update dependency list",
    status: "todo",
    priority: "low",
    assignee: "Kate Anderson",
    dueDate: "2024-02-22",
    estimate: 3,
  },
  {
    id: "TASK-012",
    title: "Customer onboarding flow",
    status: "in-progress",
    priority: "high",
    assignee: "Liam Thomas",
    dueDate: "2024-02-06",
    estimate: 32,
  },
  {
    id: "TASK-013",
    title: "Email notification templates",
    status: "todo",
    priority: "medium",
    assignee: "Mia Jackson",
    dueDate: "2024-02-18",
    estimate: 6,
  },
  {
    id: "TASK-014",
    title: "Rate limiting middleware",
    status: "done",
    priority: "high",
    assignee: "Noah White",
    dueDate: "2024-01-25",
    estimate: 8,
  },
  {
    id: "TASK-015",
    title: "Analytics dashboard",
    status: "cancelled",
    priority: "low",
    assignee: "Olivia Harris",
    dueDate: "2024-03-01",
    estimate: 40,
  },
  {
    id: "TASK-016",
    title: "SSO integration",
    status: "todo",
    priority: "high",
    assignee: "Paul Clark",
    dueDate: "2024-02-25",
    estimate: 20,
  },
  {
    id: "TASK-017",
    title: "Search indexing",
    status: "in-progress",
    priority: "medium",
    assignee: "Quinn Lewis",
    dueDate: "2024-02-14",
    estimate: 14,
  },
  {
    id: "TASK-018",
    title: "Billing module",
    status: "todo",
    priority: "high",
    assignee: "Rachel Walker",
    dueDate: "2024-03-05",
    estimate: 30,
  },
  {
    id: "TASK-019",
    title: "Accessibility audit",
    status: "done",
    priority: "medium",
    assignee: "Sam Hall",
    dueDate: "2024-01-20",
    estimate: 12,
  },
  {
    id: "TASK-020",
    title: "Webhook system",
    status: "todo",
    priority: "medium",
    assignee: "Tina Young",
    dueDate: "2024-02-28",
    estimate: 18,
  },
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
    docs: {
      source: {
        code: `import { FullDataTable } from "@launchapp/design-system/blocks";
import type { ColumnDef } from "@tanstack/react-table";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", header: "Status" },
];

const data: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "active" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Member", status: "active" },
  { id: "3", name: "Carol White", email: "carol@example.com", role: "Member", status: "inactive" },
];

export default function Page() {
  return <FullDataTable columns={columns} data={data} searchColumn="name" />;
}`,
      },
    },
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

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <FullDataTable
      columns={columns}
      data={tasks}
      searchColumn="title"
      searchPlaceholder="Search tasks..."
      filterColumn="status"
      filterOptions={statusOptions}
      pageSize={5}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
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

export const CompositionExample: Story = {
  name: "Composition (Built From)",
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
  parameters: {
    docs: {
      description: {
        story:
          "FullDataTable is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Button,
  Checkbox,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem,
  Input,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from "@launchapp/design-system";
import {
  useReactTable, getCoreRowModel, getSortedRowModel,
  getFilteredRowModel, getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

// FullDataTable composes TanStack React Table with design system UI components:
// – Input for text search, Select for column filtering
// – Checkbox in header and rows for multi-select
// – DropdownMenu for column visibility toggle
// – Table primitives for the grid (TableHeader, TableBody, TableRow, TableHead, TableCell)
// – Button pair for pagination (Previous / Next)
// – Bulk action Button that appears when rows are selected
export function FullDataTable({ columns, data, searchColumn, filterColumn, filterOptions, pageSize = 10, onBulkDelete }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });
  const selectedRows = table.getSelectedRowModel().rows;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder={searchColumn ? \`Search \${searchColumn}...\` : "Search..."}
          value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn(searchColumn)?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        {filterColumn && (
          <Select onValueChange={(v) => table.getColumn(filterColumn)?.setFilterValue(v === "all" ? "" : v)}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Filter" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {filterOptions?.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        )}
        {selectedRows.length > 0 && (
          <Button variant="destructive" size="sm" onClick={() => onBulkDelete?.(selectedRows)}>
            Delete ({selectedRows.length})
          </Button>
        )}
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h) => (
                <TableHead key={h.id}>{flexRender(h.column.columnDef.header, h.getContext())}</TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{selectedRows.length} of {data.length} selected</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
        </div>
      </div>
    </div>
  );
}`,
      },
    },
  },
};
