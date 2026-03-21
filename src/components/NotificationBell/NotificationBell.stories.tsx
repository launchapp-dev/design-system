import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { NotificationBell, NotificationBellContent, NotificationBellItem } from "./index";
import { Avatar, AvatarFallback } from "../Avatar";

const meta: Meta<typeof NotificationBell> = {
  title: "Components/NotificationBell",
  component: NotificationBell,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NotificationBell>;

interface Notification {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  read: boolean;
  avatarInitials?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New comment on your post",
    description: "Alice commented: \"Great work on the new design system!\"",
    timestamp: "2 minutes ago",
    read: false,
    avatarInitials: "AL",
  },
  {
    id: "2",
    title: "Pull request approved",
    description: "Bob approved your PR #142: Add dark mode support.",
    timestamp: "1 hour ago",
    read: false,
    avatarInitials: "BM",
  },
  {
    id: "3",
    title: "Build succeeded",
    description: "Your deployment to production completed successfully.",
    timestamp: "3 hours ago",
    read: true,
    avatarInitials: "CI",
  },
  {
    id: "4",
    title: "New team member",
    description: "Carol White joined your workspace.",
    timestamp: "Yesterday",
    read: true,
    avatarInitials: "CW",
  },
];

export const Default: Story = {
  render: () => {
    const [notifications, setNotifications] = React.useState(mockNotifications);
    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
      <NotificationBell
        count={unreadCount}
        aria-label={`Notifications, ${unreadCount} unread`}
      >
        <NotificationBellContent
          title="Notifications"
          count={unreadCount}
          onMarkAllRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
        >
          {notifications.map((notification) => (
            <NotificationBellItem
              key={notification.id}
              unread={!notification.read}
              title={notification.title}
              description={notification.description}
              timestamp={notification.timestamp}
              onMarkRead={() => notification.read ? undefined : setNotifications((prev) => prev.map((n) => n.id === notification.id ? { ...n, read: true } : n))}
              avatar={
                <Avatar size="sm">
                  <AvatarFallback>{notification.avatarInitials}</AvatarFallback>
                </Avatar>
              }
            />
          ))}
        </NotificationBellContent>
      </NotificationBell>
    );
  },
};

export const WithZeroNotifications: Story = {
  render: () => {
    const readNotifications = mockNotifications.map((n) => ({ ...n, read: true }));
    return (
      <NotificationBell count={0}>
        <NotificationBellContent title="Notifications" count={0}>
          {readNotifications.map((notification) => (
            <NotificationBellItem
              key={notification.id}
              unread={!notification.read}
              title={notification.title}
              description={notification.description}
              timestamp={notification.timestamp}
              avatar={
                <Avatar size="sm">
                  <AvatarFallback>{notification.avatarInitials}</AvatarFallback>
                </Avatar>
              }
            />
          ))}
        </NotificationBellContent>
      </NotificationBell>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [notifications] = React.useState(mockNotifications);
    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
      <div className="flex items-center gap-4">
        <NotificationBell count={unreadCount} size="sm" aria-label={`Notifications, ${unreadCount} unread, small`} />
        <NotificationBell count={unreadCount} size="md" aria-label={`Notifications, ${unreadCount} unread, medium`} />
        <NotificationBell count={unreadCount} size="lg" aria-label={`Notifications, ${unreadCount} unread, large`} />
      </div>
    );
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "48px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [notifications, setNotifications] = React.useState(mockNotifications);
    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
      <NotificationBell
        count={unreadCount}
        aria-label={`Notifications, ${unreadCount} unread`}
      >
        <NotificationBellContent
          title="Notifications"
          count={unreadCount}
          onMarkAllRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
        >
          {notifications.map((notification) => (
            <NotificationBellItem
              key={notification.id}
              unread={!notification.read}
              title={notification.title}
              description={notification.description}
              timestamp={notification.timestamp}
              onMarkRead={() => notification.read ? undefined : setNotifications((prev) => prev.map((n) => n.id === notification.id ? { ...n, read: true } : n))}
              avatar={
                <Avatar size="sm">
                  <AvatarFallback>{notification.avatarInitials}</AvatarFallback>
                </Avatar>
              }
            />
          ))}
        </NotificationBellContent>
      </NotificationBell>
    );
  },
};
