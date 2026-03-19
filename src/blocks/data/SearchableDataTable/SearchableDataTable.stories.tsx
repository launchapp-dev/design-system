import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { SearchableDataTable, SearchableDataTableFilterOption } from "./SearchableDataTable";
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

const departmentVariant: Record<Employee["department"], "default" | "secondary" | "destructive" | "outline"> = {
  engineering: "default",
  design: "secondary",
  marketing: "outline",
  sales: "destructive",
  hr: "secondary",
};

const statusVariant: Record<Employee["status"], "default" | "secondary" | "destructive" | "outline"> = {
  active: "default",
  "on-leave": "outline",
  remote: "secondary",
};

const employees: Employee[] = [
  { id: "EMP-001", name: "Alice Chen", department: "engineering", role: "Senior Engineer", location: "San Francisco", status: "active", joinDate: "2021-03-15" },
  { id: "EMP-002", name: "Bob Smith", department: "design", role: "Product Designer", location: "New York", status: "remote", joinDate: "2020-07-01" },
  { id: "EMP-003", name: "Carol Davis", department: "marketing", role: "Marketing Manager", location: "Chicago", status: "active", joinDate: "2019-11-20" },
  { id: "EMP-004", name: "Dave Wilson", department: "engineering", role: "Staff Engineer", location: "Austin", status: "active", joinDate: "2018-05-10" },
  { id: "EMP-005", name: "Eve Martinez", department: "sales", role: "Account Executive", location: "Miami", status: "on-leave", joinDate: "2022-01-05" },
  { id: "EMP-006", name: "Frank Lee", department: "hr", role: "HR Business Partner", location: "Seattle", status: "active", joinDate: "2020-09-14" },
  { id: "EMP-007", name: "Grace Kim", department: "engineering", role: "Frontend Engineer", location: "Boston", status: "remote", joinDate: "2023-02-27" },
  { id: "EMP-008", name: "Henry Brown", department: "design", role: "UX Researcher", location: "Portland", status: "active", joinDate: "2021-08-03" },
  { id: "EMP-009", name: "Ivy Johnson", department: "marketing", role: "Content Strategist", location: "Denver", status: "remote", joinDate: "2022-06-15" },
  { id: "EMP-010", name: "Jack Taylor", department: "engineering", role: "Backend Engineer", location: "San Francisco", status: "active", joinDate: "2020-04-22" },
  { id: "EMP-011", name: "Kate Anderson", department: "sales", role: "Sales Director", location: "New York", status: "active", joinDate: "2017-12-01" },
  { id: "EMP-012", name: "Liam Thomas", department: "hr", role: "Recruiter", location: "Chicago", status: "on-leave", joinDate: "2023-05-08" },
  { id: "EMP-013", name: "Mia Jackson", department: "engineering", role: "DevOps Engineer", location: "Austin", status: "active", joinDate: "2021-10-19" },
  { id: "EMP-014", name: "Noah White", department: "design", role: "Brand Designer", location: "Los Angeles", status: "active", joinDate: "2022-03-30" },
  { id: "EMP-015", name: "Olivia Harris", department: "marketing", role: "Growth Lead", location: "Seattle", status: "remote", joinDate: "2020-02-11" },
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
