import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ColumnFilters } from "./ColumnFilters";
import type { ColumnFilterConfig, ColumnFilter } from "./ColumnFilters";

const columns: ColumnFilterConfig[] = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Filter by name…",
  },
  {
    id: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "active", label: "Active", count: 45 },
      { value: "inactive", label: "Inactive", count: 12 },
      { value: "pending", label: "Pending", count: 8 },
    ],
  },
  {
    id: "role",
    label: "Role",
    type: "multiselect",
    options: [
      { value: "admin", label: "Admin", count: 5 },
      { value: "editor", label: "Editor", count: 18 },
      { value: "viewer", label: "Viewer", count: 42 },
    ],
  },
  {
    id: "revenue",
    label: "Revenue",
    type: "number",
    operators: [
      { value: "gt", label: "greater than" },
      { value: "lt", label: "less than" },
      { value: "between", label: "between" },
    ],
  },
];

const defaultFilters: ColumnFilter[] = columns.map((c) => ({
  columnId: c.id,
  operator: "contains",
  value: "",
}));

const meta: Meta<typeof ColumnFilters> = {
  title: "Blocks/Data/ColumnFilters",
  component: ColumnFilters,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ColumnFilters>;

export const Default: Story = {
  render: () => {
    const [filters, setFilters] = React.useState<ColumnFilter[]>(defaultFilters);
    return <ColumnFilters columns={columns} filters={filters} onFiltersChange={setFilters} />;
  },
  name: "Default",
};

export const WithActiveFilters: Story = {
  name: "With Active Filters",
  render: () => {
    const [filters, setFilters] = React.useState<ColumnFilter[]>([
      { columnId: "name", operator: "contains", value: "Alice" },
      { columnId: "status", operator: "equals", value: "active" },
      { columnId: "role", operator: "equals", value: "admin,editor" },
      { columnId: "revenue", operator: "gt", value: "1000" },
    ]);
    return <ColumnFilters columns={columns} filters={filters} onFiltersChange={setFilters} />;
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
  render: () => {
    const [filters, setFilters] = React.useState<ColumnFilter[]>(defaultFilters);
    return <ColumnFilters columns={columns} filters={filters} onFiltersChange={setFilters} />;
  },
};

