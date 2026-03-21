import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { NotificationBell, type NotificationItem } from "./index";

const sampleNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "New comment on your post",
    description: "Sarah commented: 'Great article! I especially liked the section about accessibility.'",
    timestamp: "2024-01-15T10:30:00Z",
    read: false,
  },
  {
    id: "2",
    title: "System update available",
    description: "A new version of the application is available. Update now to get the latest features.",
    timestamp: "2024-01-15T09:15:00Z",
    read: false,
  },
  {
    id: "3",
    title: "Meeting reminder",
    description: "Team standup in 15 minutes",
    timestamp: "2024-01-15T08:45:00Z",
    read: true,
  },
  {
    id: "4",
    title: "File uploaded successfully",
    description: "Your document has been processed and is ready for review.",
    timestamp: "2024-01-14T16:20:00Z",
    read: true,
  },
  {
    id: "5",
    title: "New follower",
    description: "John Doe started following you",
    timestamp: "2024-01-14T14:00:00Z",
    read: false,
  },
];

const meta: Meta<typeof NotificationBell> = {
  title: "Components/NotificationBell",
  component: NotificationBell,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "outline", "ghost"],
    },
    title: { control: "text" },
    emptyMessage: { control: "text" },
    maxVisible: { control: "number" },
  },
  args: {
    notifications: sampleNotifications,
    size: "md",
    variant: "ghost",
    title: "Notifications",
    emptyMessage: "No notifications",
    maxVisible: 10,
  },
};

export default meta;
type Story = StoryObj<typeof NotificationBell>;

export const Default: Story = {
  render: (args) => {
    const [notifications, setNotifications] = React.useState(args.notifications);

    const handleRead = (id: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    };

    const handleReadAll = () => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    return (
      <NotificationBell
        {...args}
        notifications={notifications}
        onRead={handleRead}
        onReadAll={handleReadAll}
      />
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [notifications, setNotifications] = React.useState(sampleNotifications);

    const handleRead = (id: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    };

    const handleReadAll = () => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px" }}>{size}</span>
            <NotificationBell
              notifications={notifications}
              onRead={handleRead}
              onReadAll={handleReadAll}
              size={size}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [notifications, setNotifications] = React.useState(sampleNotifications);

    const handleRead = (id: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    };

    const handleReadAll = () => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {(["default", "outline", "ghost"] as const).map((variant) => (
          <div key={variant} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "12px", textTransform: "capitalize" }}>{variant}</span>
            <NotificationBell
              notifications={notifications}
              onRead={handleRead}
              onReadAll={handleReadAll}
              variant={variant}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const Empty: Story = {
  render: (args) => <NotificationBell {...args} notifications={[]} />,
};

export const ManyNotifications: Story = {
  render: () => {
    const manyNotifications: NotificationItem[] = Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 1}`,
      title: `Notification ${i + 1}`,
      description: `This is the description for notification number ${i + 1}. It may be quite long and should be truncated.`,
      timestamp: `2024-01-${String(15 - Math.floor(i / 5)).padStart(2, "0")}T${String(10 - (i % 10)).padStart(2, "0")}:30:00Z`,
      read: i >= 3,
    }));

    const [notifications, setNotifications] = React.useState(manyNotifications);

    const handleRead = (id: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    };

    const handleReadAll = () => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    return (
      <NotificationBell
        notifications={notifications}
        onRead={handleRead}
        onReadAll={handleReadAll}
        maxVisible={8}
      />
    );
  },
};

export const HighCount: Story = {
  render: () => {
    const manyUnread: NotificationItem[] = Array.from({ length: 150 }, (_, i) => ({
      id: `${i + 1}`,
      title: `Notification ${i + 1}`,
      timestamp: `2024-01-15T10:30:00Z`,
      read: false,
    }));

    return (
      <NotificationBell
        notifications={manyUnread}
        maxVisible={5}
      />
    );
  },
};

export const AllRead: Story = {
  render: () => {
    const readNotifications = sampleNotifications.map((n) => ({ ...n, read: true }));

    return <NotificationBell notifications={readNotifications} />;
  },
};

export const ControlledOpen: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [notifications, setNotifications] = React.useState(sampleNotifications);

    const handleRead = (id: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    };

    const handleReadAll = () => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setOpen(true)}
            style={{ padding: "8px 16px", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}
          >
            Open Notifications
          </button>
          <button
            onClick={() => setOpen(false)}
            style={{ padding: "8px 16px", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}
          >
            Close Notifications
          </button>
        </div>
        <NotificationBell
          notifications={notifications}
          onRead={handleRead}
          onReadAll={handleReadAll}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    );
  },
};
