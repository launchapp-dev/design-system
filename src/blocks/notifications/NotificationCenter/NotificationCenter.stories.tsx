import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  NotificationCenter,
  NotificationList,
  NotificationItem,
  NotificationGroup,
  EmptyNotifications,
} from "./NotificationCenter";
import type { AppNotification } from "./NotificationCenter";

const todayNotifications: AppNotification[] = [
  {
    id: "1",
    title: "Sarah mentioned you in a comment",
    description: '"@you can you review this PR when you get a chance?"',
    timestamp: "2 min ago",
    read: false,
    avatarInitials: "SR",
    type: "mention",
    group: "today",
  },
  {
    id: "2",
    title: "Pull request approved",
    description: "Alex approved your PR #142: Add dark mode support.",
    timestamp: "1 hr ago",
    read: false,
    avatarInitials: "AJ",
    type: "pr",
    group: "today",
  },
  {
    id: "3",
    title: "Build succeeded",
    description: "Deployment to production completed successfully.",
    timestamp: "3 hr ago",
    read: true,
    avatarInitials: "CI",
    type: "build",
    group: "today",
  },
];

const thisWeekNotifications: AppNotification[] = [
  {
    id: "4",
    title: "New team member joined",
    description: "Carol White joined your workspace.",
    timestamp: "2 days ago",
    read: true,
    avatarInitials: "CW",
    type: "team",
    group: "this-week",
  },
  {
    id: "5",
    title: "Invoice paid",
    description: "Your $149 invoice for March was paid successfully.",
    timestamp: "3 days ago",
    read: true,
    avatarInitials: "BI",
    type: "billing",
    group: "this-week",
  },
];

const earlierNotifications: AppNotification[] = [
  {
    id: "6",
    title: "Password changed",
    description: "Your account password was updated successfully.",
    timestamp: "2 weeks ago",
    read: true,
    avatarInitials: "SE",
    type: "security",
    group: "earlier",
  },
];

const allNotifications: AppNotification[] = [
  ...todayNotifications,
  ...thisWeekNotifications,
  ...earlierNotifications,
];

const ungroupedNotifications: AppNotification[] = [
  {
    id: "u1",
    title: "New comment on your post",
    description: 'Alice commented: "Great work on the new design!"',
    timestamp: "2 min ago",
    read: false,
    avatarInitials: "AL",
    type: "comment",
  },
  {
    id: "u2",
    title: "Pull request approved",
    description: "Bob approved your PR #142.",
    timestamp: "1 hr ago",
    read: false,
    avatarInitials: "BM",
    type: "pr",
  },
  {
    id: "u3",
    title: "Build succeeded",
    description: "Your deployment to production completed successfully.",
    timestamp: "3 hr ago",
    read: true,
    avatarInitials: "CI",
    type: "build",
  },
  {
    id: "u4",
    title: "New team member",
    description: "Carol White joined your workspace.",
    timestamp: "Yesterday",
    read: true,
    avatarInitials: "CW",
    type: "team",
  },
];

const meta: Meta<typeof NotificationCenter> = {
  title: "Blocks/Notifications/NotificationCenter",
  component: NotificationCenter,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `import { NotificationCenter } from "@launchapp/design-system/blocks/notifications";
import { useState } from "react";

export default function AppHeader() {
  const [notifications, setNotifications] = useState(initialNotifications);

  return (
    <NotificationCenter
      notifications={notifications}
      onRead={(id) =>
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        )
      }
      onReadAll={() =>
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      }
      preferencesHref="/settings/notifications"
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationCenter>;

const InteractiveTemplate = (args: React.ComponentProps<typeof NotificationCenter>) => {
  const [notifications, setNotifications] = React.useState(args.notifications);
  return (
    <NotificationCenter
      {...args}
      notifications={notifications}
      onRead={(id) =>
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
      }
      onReadAll={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
    />
  );
};

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    notifications: ungroupedNotifications,
    preferencesHref: "/settings/notifications",
  },
};

export const Grouped: Story = {
  render: InteractiveTemplate,
  args: {
    notifications: allNotifications,
    preferencesHref: "/settings/notifications",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Notifications grouped into Today, This Week, and Earlier. Set the `group` field on each notification.",
      },
    },
  },
};

export const AllRead: Story = {
  render: (args) => <NotificationCenter {...args} />,
  args: {
    notifications: ungroupedNotifications.map((n) => ({ ...n, read: true })),
    preferencesHref: "/settings/notifications",
  },
};

export const Empty: Story = {
  render: (args) => <NotificationCenter {...args} />,
  args: {
    notifications: [],
    preferencesHref: "/settings/notifications",
  },
};

export const NoPreferencesLink: Story = {
  render: InteractiveTemplate,
  args: {
    notifications: ungroupedNotifications,
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "24px" }}>
      <InteractiveTemplate {...args} />
    </div>
  ),
  args: {
    notifications: allNotifications,
    preferencesHref: "/settings/notifications",
  },
};

export const ComposedList: Story = {
  name: "Composed: NotificationList",
  render: () => {
    const [notifications, setNotifications] = React.useState(ungroupedNotifications);
    return (
      <div className="w-80 rounded-lg border border-border bg-popover shadow-lg">
        <div className="px-4 py-3">
          <h2 className="text-sm font-semibold">Notifications</h2>
        </div>
        <div className="border-t border-border" />
        <NotificationList
          notifications={notifications}
          onRead={(id) =>
            setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
          }
        />
      </div>
    );
  },
};

export const SingleItem: Story = {
  name: "Composed: NotificationItem",
  render: () => (
    <div className="w-80 rounded-lg border border-border bg-popover shadow-lg">
      <NotificationItem
        notification={{
          id: "1",
          title: "Sarah mentioned you in a comment",
          description: '"@you can you review this PR?"',
          timestamp: "2 min ago",
          read: false,
          avatarInitials: "SR",
          type: "mention",
        }}
        onRead={(id) => console.log("mark read", id)}
      />
    </div>
  ),
};

export const GroupComponent: Story = {
  name: "Composed: NotificationGroup",
  render: () => (
    <div className="w-80 rounded-lg border border-border bg-popover shadow-lg">
      <NotificationGroup
        label="Today"
        notifications={todayNotifications}
        onRead={(id) => console.log("mark read", id)}
      />
    </div>
  ),
};

export const EmptyState: Story = {
  name: "Composed: EmptyNotifications",
  render: () => (
    <div className="w-80 rounded-lg border border-border bg-popover shadow-lg">
      <EmptyNotifications message="No new notifications" />
    </div>
  ),
};
