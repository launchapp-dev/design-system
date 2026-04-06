import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";
import { SearchableDataTable, type SearchableDataTableFilterOption } from "./SearchableDataTable";
import { Badge } from "@/components/Badge";

type Employee = {
  id: string;
  name: string;
  department: "engineering" | "design" | "marketing" | "sales" | "hr";
  role: string;
  location: string;
  status: "active" | "on-leave" | "remote";
  joinDate: string;
};

const departmentVariant: Record<
  Employee["department"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  engineering: "default",
  design: "secondary",
  marketing: "outline",
  sales: "destructive",
  hr: "secondary",
};

const statusVariant: Record<
  Employee["status"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  active: "default",
  "on-leave": "outline",
  remote: "secondary",
};

const employees: Employee[] = [
  {
    id: "EMP-001",
    name: "Alice Chen",
    department: "engineering",
    role: "Senior Engineer",
    location: "San Francisco",
    status: "active",
    joinDate: "2021-03-15",
  },
  {
    id: "EMP-002",
    name: "Bob Smith",
    department: "design",
    role: "Product Designer",
    location: "New York",
    status: "remote",
    joinDate: "2020-07-01",
  },
  {
    id: "EMP-003",
    name: "Carol Davis",
    department: "marketing",
    role: "Marketing Manager",
    location: "Chicago",
    status: "active",
    joinDate: "2019-11-20",
  },
  {
    id: "EMP-004",
    name: "Dave Wilson",
    department: "engineering",
    role: "Staff Engineer",
    location: "Austin",
    status: "active",
    joinDate: "2018-05-10",
  },
  {
    id: "EMP-005",
    name: "Eve Martinez",
    department: "sales",
    role: "Account Executive",
    location: "Miami",
    status: "on-leave",
    joinDate: "2022-01-05",
  },
  {
    id: "EMP-006",
    name: "Frank Lee",
    department: "hr",
    role: "HR Business Partner",
    location: "Seattle",
    status: "active",
    joinDate: "2020-09-14",
  },
  {
    id: "EMP-007",
    name: "Grace Kim",
    department: "engineering",
    role: "Frontend Engineer",
    location: "Boston",
    status: "remote",
    joinDate: "2023-02-27",
  },
  {
    id: "EMP-008",
    name: "Henry Brown",
    department: "design",
    role: "UX Researcher",
    location: "Portland",
    status: "active",
    joinDate: "2021-08-03",
  },
  {
    id: "EMP-009",
    name: "Ivy Johnson",
    department: "marketing",
    role: "Content Strategist",
    location: "Denver",
    status: "remote",
    joinDate: "2022-06-15",
  },
  {
    id: "EMP-010",
    name: "Jack Taylor",
    department: "engineering",
    role: "Backend Engineer",
    location: "San Francisco",
    status: "active",
    joinDate: "2020-04-22",
  },
  {
    id: "EMP-011",
    name: "Kate Anderson",
    department: "sales",
    role: "Sales Director",
    location: "New York",
    status: "active",
    joinDate: "2017-12-01",
  },
  {
    id: "EMP-012",
    name: "Liam Thomas",
    department: "hr",
    role: "Recruiter",
    location: "Chicago",
    status: "on-leave",
    joinDate: "2023-05-08",
  },
  {
    id: "EMP-013",
    name: "Mia Jackson",
    department: "engineering",
    role: "DevOps Engineer",
    location: "Austin",
    status: "active",
    joinDate: "2021-10-19",
  },
  {
    id: "EMP-014",
    name: "Noah White",
    department: "design",
    role: "Brand Designer",
    location: "Los Angeles",
    status: "active",
    joinDate: "2022-03-30",
  },
  {
    id: "EMP-015",
    name: "Olivia Harris",
    department: "marketing",
    role: "Growth Lead",
    location: "Seattle",
    status: "remote",
    joinDate: "2020-02-11",
  },
];

const departmentOptions: SearchableDataTableFilterOption[] = [
  { label: "Engineering", value: "engineering" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "HR", value: "hr" },
];

const defaultColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <Badge variant={departmentVariant[row.getValue("department") as Employee["department"]]}>
        {String(row.getValue("department"))}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.getValue("status") as Employee["status"]]}>
        {String(row.getValue("status")).replace("-", " ")}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
  },
];

const meta: Meta<typeof SearchableDataTable> = {
  title: "Blocks/Data/SearchableDataTable",
  component: SearchableDataTable,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { SearchableDataTable } from "@launchapp/design-system/blocks";
import type { ColumnDef } from "@tanstack/react-table";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

const columns: ColumnDef<Product>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "price", header: "Price" },
];

const data: Product[] = [
  { id: "1", name: "Wireless Headphones", category: "Electronics", price: 99 },
  { id: "2", name: "Running Shoes", category: "Sports", price: 75 },
  { id: "3", name: "Coffee Maker", category: "Appliances", price: 49 },
];

export default function Page() {
  return (
    <SearchableDataTable
      columns={columns}
      data={data}
      searchColumn="name"
      searchPlaceholder="Search products..."
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
    <SearchableDataTable
      columns={defaultColumns}
      data={employees}
      searchColumn="name"
      searchPlaceholder="Search employees..."
      filterColumn="department"
      filterLabel="Department"
      filterOptions={departmentOptions}
      pageSize={10}
    />
  ),
};

export const WithSearchFilter: Story = {
  render: () => (
    <SearchableDataTable
      columns={defaultColumns}
      data={employees}
      searchColumn="name"
      searchPlaceholder="Search by name..."
      filterColumn="department"
      filterLabel="Filter by department"
      filterOptions={departmentOptions}
      pageSize={5}
    />
  ),
};

export const CustomColumns: Story = {
  render: () => {
    const minimalColumns: ColumnDef<Employee>[] = [
      {
        accessorKey: "name",
        header: "Full Name",
      },
      {
        accessorKey: "role",
        header: "Job Title",
      },
      {
        accessorKey: "location",
        header: "Office Location",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={statusVariant[row.getValue("status") as Employee["status"]]}>
            {String(row.getValue("status")).replace("-", " ")}
          </Badge>
        ),
        enableSorting: false,
      },
    ];

    return (
      <SearchableDataTable
        columns={minimalColumns}
        data={employees}
        searchColumn="name"
        searchPlaceholder="Search employees..."
        pageSize={10}
      />
    );
  },
};

export const SearchOnly: Story = {
  render: () => (
    <SearchableDataTable
      columns={defaultColumns}
      data={employees}
      searchColumn="name"
      searchPlaceholder="Search by name..."
      pageSize={10}
    />
  ),
};

export const EmptyState: Story = {
  render: () => (
    <SearchableDataTable
      columns={defaultColumns}
      data={[]}
      searchColumn="name"
      searchPlaceholder="Search employees..."
      filterColumn="department"
      filterLabel="Department"
      filterOptions={departmentOptions}
    />
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <SearchableDataTable
      columns={defaultColumns}
      data={employees}
      searchColumn="name"
      searchPlaceholder="Search employees..."
      filterColumn="department"
      filterLabel="Department"
      filterOptions={departmentOptions}
      pageSize={5}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <SearchableDataTable
      columns={defaultColumns}
      data={employees}
      searchColumn="name"
      searchPlaceholder="Search employees..."
      filterColumn="department"
      filterLabel="Department"
      filterOptions={departmentOptions}
      pageSize={10}
    />
  ),
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  render: () => (
    <SearchableDataTable
      columns={defaultColumns}
      data={employees}
      searchColumn="name"
      searchPlaceholder="Search employees..."
      filterColumn="department"
      filterLabel="Department"
      filterOptions={departmentOptions}
      pageSize={10}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "SearchableDataTable is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Badge,
  Button,
  Input,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from "@launchapp/design-system";
import {
  useReactTable, getCoreRowModel, getSortedRowModel,
  getFilteredRowModel, getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

// SearchableDataTable is a lighter variant of FullDataTable without row selection or bulk actions.
// It composes:
// – Input for live text search on a designated column
// – Select for single-value column filtering (e.g. department)
// – Table primitives for grid rendering via TanStack Table's flexRender
// – Button pair for Previous / Next pagination
// – Badge for status/label cells defined in column defs
export function SearchableDataTable({ columns, data, searchColumn, searchPlaceholder, filterColumn, filterLabel, filterOptions, pageSize = 10 }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder={searchPlaceholder}
          value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn(searchColumn)?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        {filterColumn && (
          <Select onValueChange={(v) => table.getColumn(filterColumn)?.setFilterValue(v === "all" ? "" : v)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={filterLabel ?? "Filter"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {filterOptions?.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
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
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
      </div>
    </div>
  );
}`,
      },
    },
  },
};
