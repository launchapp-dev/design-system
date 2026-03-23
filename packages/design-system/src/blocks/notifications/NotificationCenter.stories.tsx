import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { NotificationCenter } from "./NotificationCenter";
import type { AppNotification } from "./NotificationCenter";

const mockNotifications: AppNotification[] = [
  {
    id: "1",
    title: "New comment on your post",
    description: "Alice commented: \"Great work on the new design system!\"",
    timestamp: "2 minutes ago",
    read: false,
    avatarInitials: "AL",
    type: "comment",
  },
  {
    id: "2",
    title: "Pull request approved",
    description: "Bob approved your PR #142: Add dark mode support.",
    timestamp: "1 hour ago",
    read: false,
    avatarInitials: "BM",
    type: "pr",
  },
  {
    id: "3",
    title: "Build succeeded",
    description: "Your deployment to production completed successfully.",
    timestamp: "3 hours ago",
    read: true,
    avatarInitials: "CI",
    type: "build",
  },
  {
    id: "4",
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

export default function AppHeader() {
  const [notifications, setNotifications] = useState(initialNotifications);

  return (
    <NotificationCenter
      notifications={notifications}
      onRead={(id) => setNotifications((prev) =>
        prev.map((n) => n.id === id ? { ...n, read: true } : n)
      )}
      onReadAll={() => setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      )}
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
    notifications: mockNotifications,
  },
};

export const AllRead: Story = {
  render: (args) => <NotificationCenter {...args} />,
  args: {
    notifications: mockNotifications.map((n) => ({ ...n, read: true })),
  },
};

export const Empty: Story = {
  render: (args) => <NotificationCenter {...args} />,
  args: {
    notifications: [],
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "24px" }}>
      <InteractiveTemplate {...args} />
    </div>
  ),
  args: {
    notifications: mockNotifications,
  },
};
