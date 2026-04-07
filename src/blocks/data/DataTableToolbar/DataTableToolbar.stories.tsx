import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTableToolbar } from "./DataTableToolbar";

const columns = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "role", label: "Role" },
  { id: "status", label: "Status" },
  { id: "joined", label: "Joined" },
];

const meta: Meta<typeof DataTableToolbar> = {
  title: "Blocks/Data/DataTableToolbar",
  component: DataTableToolbar,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof DataTableToolbar>;

export const Default: Story = {
  args: {
    showSearch: true,
    allColumns: columns,
    columnVisibility: columns.map((c) => ({ id: c.id, label: c.label, visible: true })),
    actions: [
      {
        id: "add",
        label: "Add",
        onClick: () => console.log("Add"),
      },
    ],
  },
};

export const WithFilters: Story = {
  name: "With Filters",
  args: {
    showSearch: true,
    allColumns: columns,
    showFilters: true,
    filterCount: 2,
    filters: React.createElement(
      "div",
      { className: "flex gap-2 flex-wrap p-3 border-t" },
      React.createElement(
        "span",
        { className: "text-sm text-muted-foreground" },
        "Role: Admin, Status: Active",
      ),
    ),
    actions: [
      { id: "add", label: "Add", onClick: () => console.log("Add") },
      { id: "export", label: "Export", variant: "outline", onClick: () => console.log("Export") },
    ],
  },
};

export const BulkSelection: Story = {
  name: "Bulk Selection",
  args: {
    showSearch: false,
    selectedCount: 12,
    bulkActions: [
      {
        id: "delete",
        label: "Delete",
        variant: "destructive",
        onClick: () => console.log("Delete"),
      },
      { id: "archive", label: "Archive", onClick: () => console.log("Archive") },
    ],
  },
};

export const Loading: Story = {
  args: {
    showSearch: true,
    allColumns: columns,
    loading: true,
    actions: [{ id: "add", label: "Add", onClick: () => console.log("Add") }],
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
    showSearch: true,
    allColumns: columns,
    showFilters: true,
    filterCount: 1,
    actions: [{ id: "add", label: "Add", onClick: () => console.log("Add") }],
  },
};
