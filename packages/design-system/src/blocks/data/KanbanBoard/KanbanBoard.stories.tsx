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
    docs: {
      source: {
        code: `import { KanbanBoard } from "@launchapp/design-system/blocks";

const initialColumns = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      { id: "1", title: "Research competitors", badge: "Research" },
      { id: "2", title: "Design wireframes", badge: "Design" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      { id: "3", title: "Build API endpoints", badge: "Engineering" },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "4", title: "Project kickoff", badge: "Planning" },
    ],
  },
];

export default function Page() {
  return <KanbanBoard initialColumns={initialColumns} />;
}`,
      },
    },
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

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <div className="h-[600px]">
      <KanbanBoard initialColumns={initialColumns} />
    </div>
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <div className="h-[600px]">
      <KanbanBoard initialColumns={initialColumns} />
    </div>
  ),
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  render: () => (
    <div className="h-[600px]">
      <KanbanBoard initialColumns={initialColumns} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "KanbanBoard is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Avatar, AvatarFallback,
  Badge,
  Button,
  Card, CardContent,
  Input,
  ScrollArea,
} from "@launchapp/design-system";
import {
  DndContext, DragEndEvent, DragOverlay,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext, verticalListSortingStrategy, useSortable,
} from "@dnd-kit/sortable";

// KanbanBoard uses @dnd-kit for drag-and-drop across columns.
// Each column is a vertical lane composed from:
// – ScrollArea to allow card lists to scroll independently
// – Card + CardContent for each task card
// – Badge for priority/label, Avatar for assignee
// – Input for inline card creation within a column
// – Button for add-card trigger and column actions
// Drag-and-drop: DndContext wraps all columns; SortableContext per column.
export function KanbanBoard({ initialColumns, onCardMove }) {
  const [columns, setColumns] = React.useState(initialColumns);

  function handleDragEnd(event: DragEndEvent) {
    // Move card between columns or reorder within same column
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex h-full gap-4 overflow-x-auto p-4">
        {columns.map((col) => (
          <div key={col.id} className="flex w-72 shrink-0 flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <Badge variant="secondary">{col.cards.length}</Badge>
            </div>
            <ScrollArea className="flex-1">
              <SortableContext items={col.cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {col.cards.map((card) => (
                    <Card key={card.id} className="cursor-grab active:cursor-grabbing">
                      <CardContent className="p-3 space-y-2">
                        <p className="text-sm font-medium">{card.title}</p>
                        {card.description && <p className="text-xs text-muted-foreground">{card.description}</p>}
                        <div className="flex items-center justify-between">
                          {card.priority && <Badge variant="outline" className="text-xs">{card.priority}</Badge>}
                          {card.assignee && (
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-[10px]">{card.assignee.initials}</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </SortableContext>
            </ScrollArea>
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
              + Add card
            </Button>
          </div>
        ))}
      </div>
    </DndContext>
  );
}`,
      },
    },
  },
};
