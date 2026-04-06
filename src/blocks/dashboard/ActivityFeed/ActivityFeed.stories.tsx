import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ActivityFeed } from "./ActivityFeed";

const meta: Meta<typeof ActivityFeed> = {
  title: "Blocks/Dashboard/ActivityFeed",
  component: ActivityFeed,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ActivityFeed>;

const sampleItems = [
  { id: "1", type: "comment" as const, title: "Alice left a comment", description: "The new design looks great! I have a few suggestions for the button styles.", timestamp: "5 min ago", avatarFallback: "AC", userName: "Alice Chen" },
  { id: "2", type: "create" as const, title: "Project Alpha created", description: "New project with 5 team members", timestamp: "2 hours ago", avatarFallback: "BJ", userName: "Bob Johnson", badge: "New" },
  { id: "3", type: "status" as const, title: "Task moved to In Review", description: "API integration - Backend", timestamp: "3 hours ago", avatarFallback: "CW", userName: "Carol White" },
  { id: "4", type: "mention" as const, title: "You were mentioned", description: "In the thread about Q4 planning", timestamp: "5 hours ago", avatarFallback: "DL", userName: "Dave Lee" },
  { id: "5", type: "update" as const, title: "Document updated", description: "Product roadmap v3.2", timestamp: "1 day ago", avatarSrc: "https://i.pravatar.cc/150?img=12", userName: "Eve Martinez", badge: "v3.2" },
  { id: "6", type: "delete" as const, title: "File removed", description: "Old marketing assets.zip", timestamp: "2 days ago", avatarFallback: "FH", userName: "Frank Harris", badge: "Trash" },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    title: "Recent Activity",
  },
};

export const NoTitle: Story = {
  args: {
    items: sampleItems,
  },
};

export const WithLoadMore: Story = {
  args: {
    items: sampleItems.slice(0, 3),
    title: "Recent Activity",
    showLoadMore: true,
    onLoadMore: () => console.log("Load more clicked"),
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark p-6 rounded-lg bg-[hsl(var(--la-background))]">
        <Story />
      </div>
    ),
  ],
  args: {
    items: sampleItems.slice(0, 3),
    title: "Recent Activity",
  },
};

export const Interactive: Story = {
  render: () => {
    const [clicked, setClicked] = React.useState<string | null>(null);
    return (
      <div className="space-y-4">
        <ActivityFeed
          items={sampleItems}
          title="Recent Activity"
          onItemClick={(item) => setClicked(item.title)}
        />
        {clicked && <p className="text-xs text-muted-foreground">Clicked: {clicked}</p>}
      </div>
    );
  },
};

export const SingleType: Story = {
  args: {
    items: sampleItems.filter((i) => i.type === "comment"),
    title: "Comments",
  },
};

export const EmptyState: Story = {
  args: {
    items: [],
    title: "Recent Activity",
  },
};