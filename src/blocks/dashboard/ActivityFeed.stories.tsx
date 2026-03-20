import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ActivityFeed } from "./ActivityFeed";
import type { ActivityItem } from "./ActivityFeed";

const mockItems: ActivityItem[] = [
  {
    id: "1",
    user: { name: "Alice Chen", initials: "AC" },
    description: "Deployed v2.4.1 to production successfully.",
    timestamp: "2 minutes ago",
    actionType: "deploy",
    actionVariant: "default",
  },
  {
    id: "2",
    user: { name: "Bob Martinez", initials: "BM" },
    description: "Opened pull request #142: Add dark mode support to dashboard.",
    timestamp: "18 minutes ago",
    actionType: "PR opened",
    actionVariant: "secondary",
  },
  {
    id: "3",
    user: { name: "Carol White", initials: "CW" },
    description: "Resolved critical bug in authentication middleware.",
    timestamp: "1 hour ago",
    actionType: "bug fix",
    actionVariant: "destructive",
  },
  {
    id: "4",
    user: { name: "David Kim", initials: "DK" },
    description: "Updated API rate limits for enterprise tier.",
    timestamp: "3 hours ago",
    actionType: "config",
    actionVariant: "secondary",
  },
  {
    id: "5",
    user: { name: "Eva Rossi", initials: "ER" },
    description: "Merged feature branch: metric-cards-redesign into main.",
    timestamp: "5 hours ago",
    actionType: "merge",
    actionVariant: "outline",
  },
  {
    id: "6",
    user: { name: "Frank Lee", initials: "FL" },
    description: "Created new workspace for Q2 analytics sprint.",
    timestamp: "Yesterday at 4:30 PM",
    actionType: "create",
    actionVariant: "secondary",
  },
  {
    id: "7",
    user: { name: "Grace Park", initials: "GP" },
    description: "Archived stale feature flags from the feature management panel.",
    timestamp: "Yesterday at 11:00 AM",
    actionType: "archive",
    actionVariant: "outline",
  },
];

const meta: Meta<typeof ActivityFeed> = {
  title: "Blocks/Dashboard/ActivityFeed",
  component: ActivityFeed,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { ActivityFeed } from "@launchapp/design-system/blocks/dashboard";

const items = [
  {
    id: "1",
    user: { name: "Alice Johnson", initials: "AJ" },
    description: "created a new project",
    timestamp: "2 minutes ago",
    actionType: "Created",
    actionVariant: "default",
  },
  {
    id: "2",
    user: { name: "Bob Smith", initials: "BS" },
    description: "merged pull request #42",
    timestamp: "1 hour ago",
    actionType: "Merged",
    actionVariant: "secondary",
  },
];

export default function Page() {
  return <ActivityFeed items={items} title="Recent Activity" />;
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActivityFeed>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 560 }}>
      <ActivityFeed {...args} />
    </div>
  ),
  args: {
    title: "Recent Activity",
    description: "Latest actions from your team",
    items: mockItems,
    maxHeight: 400,
  },
};

export const ShortList: Story = {
  render: (args) => (
    <div style={{ maxWidth: 560 }}>
      <ActivityFeed {...args} />
    </div>
  ),
  args: {
    title: "Activity Feed",
    items: mockItems.slice(0, 3),
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "24px", maxWidth: 560 }}>
      <ActivityFeed {...args} />
    </div>
  ),
  args: {
    title: "Recent Activity",
    description: "Latest actions from your team",
    items: mockItems,
    maxHeight: 400,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: (args) => (
    <div style={{ padding: "16px" }}>
      <ActivityFeed {...args} />
    </div>
  ),
  args: {
    title: "Recent Activity",
    items: mockItems,
    maxHeight: 500,
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: (args) => (
    <div style={{ padding: "24px" }}>
      <ActivityFeed {...args} />
    </div>
  ),
  args: {
    title: "Recent Activity",
    description: "Latest actions from your team",
    items: mockItems,
    maxHeight: 400,
  },
};
