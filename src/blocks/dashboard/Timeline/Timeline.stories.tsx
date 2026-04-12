import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Timeline } from "./Timeline";

const meta: Meta<typeof Timeline> = {
  title: "Blocks/Dashboard/Timeline",
  component: Timeline,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

const sampleEntries = [
  {
    id: "1",
    title: "Jane Smith created a new project",
    description: "Project Alpha is now live",
    timestamp: "2 min ago",
    avatarFallback: "JS",
  },
  {
    id: "2",
    title: "Payment received",
    description: "$5,000 from Acme Corp",
    timestamp: "1 hour ago",
    badge: "Revenue",
    badgeVariant: "default" as const,
  },
  { id: "3", title: "Bob Johnson joined the team", timestamp: "3 hours ago", avatarFallback: "BJ" },
  {
    id: "4",
    title: "Feature deployed to production",
    description: "New analytics dashboard is now available",
    timestamp: "5 hours ago",
    badge: "v2.4",
    badgeVariant: "secondary" as const,
  },
  {
    id: "5",
    title: "Server upgrade completed",
    timestamp: "1 day ago",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    ),
  },
  {
    id: "6",
    title: "Monthly report generated",
    description: "Available in the reports section",
    timestamp: "2 days ago",
    avatarSrc: "https://i.pravatar.cc/150?img=12",
  },
];

export const Default: Story = {
  args: {
    entries: sampleEntries,
  },
};

export const Compact: Story = {
  args: {
    entries: sampleEntries,
    compact: true,
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
    entries: sampleEntries.slice(0, 3),
  },
};

export const Interactive: Story = {
  render: () => {
    const [clicked, setClicked] = React.useState<string | null>(null);
    return (
      <div className="space-y-4">
        <Timeline entries={sampleEntries.map((e) => ({ ...e, onClick: () => setClicked(e.id) }))} />
        {clicked && <p className="text-xs text-muted-foreground">Clicked: entry {clicked}</p>}
      </div>
    );
  },
};

export const EmptyState: Story = {
  args: {
    entries: [],
  },
};

export const SingleEntry: Story = {
  args: {
    entries: [sampleEntries[0]],
  },
};
