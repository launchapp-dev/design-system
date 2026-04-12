import type { Meta, StoryObj } from "@storybook/react";
import { ChangelogFeed } from "./ChangelogFeed";

const meta: Meta<typeof ChangelogFeed> = {
  title: "Blocks/Marketing/ChangelogFeed",
  component: ChangelogFeed,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const defaultEntries = [
  {
    id: "1",
    version: "2.5.0",
    title: "New Dashboard Analytics",
    description: "We've completely redesigned the analytics dashboard with real-time metrics, custom date ranges, and export capabilities.\n\n• Real-time data updates\n• Custom date range picker\n• CSV/PDF export\n• New visualizations",
    date: "2024-03-15",
    type: "feature" as const,
  },
  {
    id: "2",
    version: "2.5.0",
    title: "Improved API Performance",
    description: "API response times have been reduced by 40% through optimized database queries and caching improvements.",
    date: "2024-03-15",
    type: "improvement" as const,
  },
  {
    id: "3",
    version: "2.4.2",
    title: "Fixed Login Issue",
    description: "Resolved an issue where some users were unable to log in with SSO providers.",
    date: "2024-03-10",
    type: "fix" as const,
  },
  {
    id: "4",
    version: "2.4.1",
    title: "Security Patch",
    description: "Addressed CVE-2024-1234. All users are recommended to update immediately.",
    date: "2024-03-05",
    type: "security" as const,
  },
  {
    id: "5",
    version: "2.4.0",
    title: "Removed Legacy API v1",
    description: "The legacy API v1 has been deprecated. Please migrate to API v2 before June 2024.",
    date: "2024-03-01",
    type: "breaking" as const,
  },
  {
    id: "6",
    version: "2.3.0",
    title: "Dark Mode Support",
    description: "Full dark mode support across all pages and components.",
    date: "2024-02-20",
    type: "feature" as const,
  },
  {
    id: "7",
    version: "2.3.0",
    title: "UI Polish",
    description: "Various UI improvements and consistency fixes throughout the app.",
    date: "2024-02-20",
    type: "improvement" as const,
  },
  {
    id: "8",
    version: "2.2.5",
    title: "Bug Fixes",
    description: "Fixed several minor bugs reported by users.",
    date: "2024-02-15",
    type: "fix" as const,
  },
];

export const Default: Story = {
  render: () => (
    <ChangelogFeed
      entries={defaultEntries}
      entriesPerPage={5}
    />
  ),
};

export const NoFilters: Story = {
  render: () => (
    <ChangelogFeed
      entries={defaultEntries}
      showFilters={false}
      showSearch={false}
    />
  ),
};

export const NoSearch: Story = {
  render: () => (
    <ChangelogFeed
      entries={defaultEntries}
      showSearch={false}
    />
  ),
};

export const CustomTitle: Story = {
  render: () => (
    <ChangelogFeed
      entries={defaultEntries}
      title="What's New"
      description="Latest updates and improvements to our platform"
    />
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <ChangelogFeed
      entries={defaultEntries.slice(0, 4)}
    />
  ),
};
