import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { KanbanBoard, KanbanColumn } from "./KanbanBoard";

const initialColumns: KanbanColumn[] = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      {
        id: "card-1",
        title: "Implement authentication",
        description: "Add OAuth2 and email/password login",
        badge: "High",
        badgeVariant: "destructive",
        avatarFallback: "AC",
      },
      {
        id: "card-2",
        title: "Design system audit",
        description: "Review all components for consistency",
        badge: "Medium",
        badgeVariant: "default",
        avatarFallback: "BS",
      },
      {
        id: "card-3",
        title: "Write unit tests for API layer",
        badge: "Low",
        badgeVariant: "secondary",
        avatarFallback: "CD",
      },
      {
        id: "card-4",
        title: "Set up monitoring and alerts",
        description: "Grafana + PagerDuty integration",
        badge: "Medium",
        badgeVariant: "default",
        avatarFallback: "DW",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      {
        id: "card-5",
        title: "Build kanban board component",
        description: "Using @dnd-kit for drag-and-drop",
        badge: "High",
        badgeVariant: "destructive",
        avatarFallback: "EM",
      },
      {
        id: "card-6",
        title: "Implement data table block",
        description: "Search, filter, sort, row selection",
        badge: "High",
        badgeVariant: "destructive",
        avatarFallback: "FL",
      },
      {
        id: "card-7",
        title: "Accessibility review",
        description: "WCAG 2.1 AA compliance pass",
        badge: "Medium",
        badgeVariant: "default",
        avatarFallback: "GK",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      {
        id: "card-8",
        title: "Project scaffolding",
        description: "tsup, Tailwind, Storybook setup",
        badge: "Done",
        badgeVariant: "outline",
        avatarFallback: "HB",
      },
      {
        id: "card-9",
        title: "Component library setup",
        description: "Radix UI primitives integrated",
        badge: "Done",
        badgeVariant: "outline",
        avatarFallback: "IJ",
      },
      {
        id: "card-10",
        title: "CI/CD pipeline",
        description: "GitHub Actions with type check and lint",
        badge: "Done",
        badgeVariant: "outline",
        avatarFallback: "JT",
      },
    ],
  },
];

const emptyColumns: KanbanColumn[] = [
  { id: "todo", title: "To Do", cards: [] },
  { id: "in-progress", title: "In Progress", cards: [] },
  { id: "done", title: "Done", cards: [] },
];

const meta: Meta<typeof KanbanBoard> = {
  title: "Blocks/Data/KanbanBoard",
  component: KanbanBoard,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-[600px]">
      <KanbanBoard initialColumns={initialColumns} />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="h-[400px]">
      <KanbanBoard initialColumns={emptyColumns} />
    </div>
  ),
};

export const SingleColumn: Story = {
  render: () => (
    <div className="h-[500px]">
      <KanbanBoard
        initialColumns={[
          {
            id: "backlog",
            title: "Backlog",
            cards: initialColumns[0].cards,
          },
        ]}
      />
    </div>
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
    <div className="h-[600px]">
      <KanbanBoard initialColumns={initialColumns} />
    </div>
  ),
};
