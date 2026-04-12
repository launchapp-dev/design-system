import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FilterBar } from "./FilterBar";

const meta: Meta<typeof FilterBar> = {
  title: "Blocks/Data/FilterBar",
  component: FilterBar,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

const statusFilter = {
  column: "status",
  label: "Status",
  options: [
    { label: "To Do", value: "todo" },
    { label: "In Progress", value: "in-progress" },
    { label: "Done", value: "done" },
    { label: "Cancelled", value: "cancelled" },
  ],
};

const priorityFilter = {
  column: "priority",
  label: "Priority",
  options: [
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ],
};

export const Default: Story = {
  args: {
    filters: [statusFilter, priorityFilter],
  },
};

export const WithSearch: Story = {
  args: {
    searchPlaceholder: "Search tasks…",
    filters: [statusFilter, priorityFilter],
  },
};

export const WithActiveFilters: Story = {
  args: {
    searchPlaceholder: "Search tasks…",
    filters: [statusFilter, priorityFilter],
    activeFilters: { status: ["todo", "in-progress"], priority: ["high"] },
  },
};

export const WithColumnToggle: Story = {
  args: {
    searchPlaceholder: "Search…",
    filters: [statusFilter],
    showColumnToggle: true,
    availableColumns: ["name", "email", "role", "status", "created", "updated"],
    activeColumns: ["name", "email", "status"],
  },
};

export const SearchOnly: Story = {
  args: {
    showSearch: true,
    searchPlaceholder: "Quick search…",
  },
};

export const ManyFilters: Story = {
  args: {
    searchPlaceholder: "Search…",
    filters: [
      statusFilter,
      priorityFilter,
      {
        column: "assignee",
        label: "Assignee",
        options: [
          { label: "Alice", value: "alice" },
          { label: "Bob", value: "bob" },
          { label: "Carol", value: "carol" },
        ],
      },
    ],
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark p-6 rounded-lg bg-background">
        <Story />
      </div>
    ),
  ],
  args: {
    searchPlaceholder: "Search…",
    filters: [statusFilter, priorityFilter],
    activeFilters: { status: ["todo"] },
  },
};

export const Interactive: Story = {
  render: () => {
    const [search, setSearch] = React.useState("");
    const [filters, setFilters] = React.useState<Record<string, string[]>>({});
    return (
      <div className="space-y-4">
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          filters={[statusFilter, priorityFilter]}
          activeFilters={filters}
          onFiltersChange={setFilters}
        />
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            Search: <strong>{search || "(empty)"}</strong>
          </p>
          <p>Active filters: {Object.keys(filters).length ? JSON.stringify(filters) : "(none)"}</p>
        </div>
      </div>
    );
  },
};
