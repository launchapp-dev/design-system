import type { Meta, StoryObj } from "@storybook/react";
import { ActivityFeed } from "./ActivityFeed";

const meta: Meta<typeof ActivityFeed> = {
  title: "Blocks/Data/ActivityFeed",
  component: ActivityFeed,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ActivityFeed>;

const sampleActivities = [
  {
    id: "1",
    type: "create" as const,
    title: "New project created",
    description: "Started a new SaaS project",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    user: {
      name: "Alex Chen",
      avatar: "",
      email: "alex@example.com",
    },
  },
  {
    id: "2",
    type: "share" as const,
    title: "Shared a file",
    description: "shared the Q4 roadmap with the team",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    user: {
      name: "Sarah Miller",
      email: "sarah@example.com",
    },
  },
  {
    id: "3",
    type: "comment" as const,
    title: "Left a comment",
    description: "commented on Design System v2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    link: {
      label: "View comment",
      href: "#",
    },
    user: {
      name: "Mike Johnson",
      email: "mike@example.com",
    },
  },
  {
    id: "4",
    type: "update" as const,
    title: "Task completed",
    description: "marked 'Setup CI/CD' as done",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    user: {
      name: "Emma Wilson",
      email: "emma@example.com",
    },
  },
  {
    id: "5",
    type: "like" as const,
    title: "Liked a post",
    description: "liked the announcement post",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    user: {
      name: "David Lee",
      email: "david@example.com",
    },
  },
];

export const Default: Story = {
  args: {
    title: "Recent Activity",
    description: "Latest actions from your team",
    activities: sampleActivities,
  },
};

export const WithViewAll: Story = {
  args: {
    title: "Activity Feed",
    description: "See what's happening",
    activities: sampleActivities,
    showViewAll: true,
    viewAllLabel: "View all activity",
  },
};

export const LimitedItems: Story = {
  args: {
    title: "Recent Activity",
    activities: sampleActivities,
    maxItems: 3,
    showViewAll: true,
    viewAllLabel: `View all ${sampleActivities.length} activities`,
  },
};

export const Empty: Story = {
  args: {
    title: "Activity Feed",
    description: "No recent activity to display",
    activities: [],
    emptyMessage: "No activity yet. Check back later!",
  },
};

export const Loading: Story = {
  args: {
    title: "Recent Activity",
    activities: [],
    loading: true,
  },
};

export const SystemEvents: Story = {
  args: {
    title: "System Events",
    activities: [
      {
        id: "1",
        type: "create",
        title: "Backup completed successfully",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
      },
      {
        id: "2",
        type: "update",
        title: "API rate limits increased",
        description: "New limits: 10,000 requests/hour",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
      },
      {
        id: "3",
        type: "delete",
        title: "Old logs purged",
        description: "Deleted logs older than 90 days",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
    ],
  },
};

export const MixedUsersAndSystem: Story = {
  args: {
    title: "All Activity",
    activities: [
      {
        id: "1",
        type: "comment",
        title: "Great work on the new feature!",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        user: {
          name: "Alex Chen",
          email: "alex@example.com",
        },
      },
      {
        id: "2",
        type: "share",
        title: "Deploy completed",
        description: "Production deployment v2.4.0 successful",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
      },
      {
        id: "3",
        type: "like",
        title: "Liked your post",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        user: {
          name: "Sarah Miller",
          email: "sarah@example.com",
        },
      },
    ],
  },
};
