import type { Meta, StoryObj } from "@storybook/react";
import type { TimelineEntry } from "./ActivityTimeline";
import { ActivityTimeline } from "./ActivityTimeline";

const CommitIcon = () => (
  <svg
    className="h-3 w-3"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m0-8h8M4 12h8"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="h-3 w-3"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const BellIcon = () => (
  <svg
    className="h-3 w-3"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
    />
  </svg>
);

const mockItems: TimelineEntry[] = [
  {
    id: "1",
    title: "Deployed v2.5.0 to production",
    description: "All health checks passing. Rollback window is 24 hours.",
    timestamp: "Just now",
    icon: <CheckIcon />,
    iconClassName: "border-green-500 text-green-500",
  },
  {
    id: "2",
    title: "Merged PR #148: Add notification blocks",
    description: "14 files changed, 1,234 additions.",
    timestamp: "32 minutes ago",
    icon: <CommitIcon />,
  },
  {
    id: "3",
    title: "CI build passed",
    description: "All 284 tests passed in 4m 12s.",
    timestamp: "1 hour ago",
    icon: <CheckIcon />,
    iconClassName: "border-green-500 text-green-500",
  },
  {
    id: "4",
    title: "New alert: memory usage above 80%",
    description: "Server us-east-1a is at 83% memory usage. Auto-scaled.",
    timestamp: "3 hours ago",
    icon: <BellIcon />,
    iconClassName: "border-amber-500 text-amber-500",
  },
  {
    id: "5",
    title: "Weekly backup completed",
    description: "Backup size: 4.2 GB. Stored in S3.",
    timestamp: "Yesterday at 2:00 AM",
  },
];

const meta: Meta<typeof ActivityTimeline> = {
  title: "Blocks/Notifications/ActivityTimeline",
  component: ActivityTimeline,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { ActivityTimeline } from "@launchapp/design-system/blocks/notifications";

export default function Page() {
  return (
    <ActivityTimeline
      title="Recent activity"
      items={items}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActivityTimeline>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 540 }}>
      <ActivityTimeline {...args} />
    </div>
  ),
  args: {
    title: "Activity",
    description: "Recent system events",
    items: mockItems,
  },
};

export const NoTitle: Story = {
  render: (args) => (
    <div style={{ maxWidth: 540 }}>
      <ActivityTimeline {...args} />
    </div>
  ),
  args: {
    items: mockItems,
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div
      className="dark"
      style={{
        background: "hsl(240 10% 3.9%)",
        padding: "24px",
        maxWidth: 540,
      }}
    >
      <ActivityTimeline {...args} />
    </div>
  ),
  args: {
    title: "Activity",
    items: mockItems,
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => (
    <div style={{ padding: "16px" }}>
      <ActivityTimeline {...args} />
    </div>
  ),
  args: {
    title: "Activity",
    items: mockItems,
  },
};
