import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { NotificationBell } from "./NotificationBell";

const meta: Meta<typeof NotificationBell> = {
  title: "Blocks/Notifications/NotificationBell",
  component: NotificationBell,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NotificationBell>;

const sampleNotifications = [
  {
    id: "1",
    title: "New customer signed up",
    description: "Acme Corp created an account",
    timestamp: "2 min ago",
    read: false,
    avatarInitials: "AC",
  },
  {
    id: "2",
    title: "Payment received",
    description: "$2,500 from TechStart Inc",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    title: "New feature released",
    description: "Check out the analytics dashboard",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "4",
    title: "Team invitation",
    description: "You were invited to join Design System project",
    timestamp: "5 hours ago",
    read: false,
  },
];

export const Default: Story = {
  args: {
    notifications: sampleNotifications,
  },
};

export const NoUnread: Story = {
  args: {
    notifications: [
      { id: "1", title: "Message read", timestamp: "1 day ago", read: true },
      { id: "2", title: "Old notification", timestamp: "2 days ago", read: true },
    ],
  },
};

export const ManyUnread: Story = {
  args: {
    notifications: Array.from({ length: 15 }, (_, i) => ({
      id: String(i),
      title: `Notification ${i + 1}`,
      description: "This is a notification description",
      timestamp: `${i} hours ago`,
      read: i > 5,
    })),
  },
};

export const Ghost: Story = {
  args: {
    notifications: sampleNotifications,
    variant: "ghost",
  },
};

export const Outline: Story = {
  args: {
    notifications: sampleNotifications,
    variant: "outline",
  },
};

export const DefaultVariant: Story = {
  args: {
    notifications: sampleNotifications,
    variant: "default",
  },
};

export const Small: Story = {
  args: {
    notifications: sampleNotifications,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    notifications: sampleNotifications,
    size: "lg",
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
    notifications: sampleNotifications,
  },
};

export const Interactive: Story = {
  render: () => {
    const [notifications, setNotifications] = React.useState(sampleNotifications);
    return (
      <div className="flex gap-8 items-start">
        <NotificationBell
          notifications={notifications}
          onRead={(id) =>
            setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
          }
          onReadAll={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
        />
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">Click bell to simulate opening dropdown</p>
          <p className="text-xs text-muted-foreground">
            Unread: {notifications.filter((n) => !n.read).length}
          </p>
        </div>
      </div>
    );
  },
};
