import type { Meta, StoryObj } from "@storybook/react";
import { Changelog } from "./index";
import type { ChangelogEntry } from "./index";

const meta: Meta<typeof Changelog> = {
  title: "Components/Changelog",
  component: Changelog,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Changelog>;

const mockChangelog: ChangelogEntry[] = [
  {
    id: "1",
    version: "2.1.0",
    date: "2024-01-15",
    title: "New Dashboard Features",
    description: "Added customizable widgets and improved performance for large datasets.",
    type: "minor",
    items: [
      "Added drag-and-drop widget customization",
      "New chart types: candlestick and radar charts",
      "Improved dashboard loading time by 40%",
      "Fixed issue with widget positions not saving",
    ],
  },
  {
    id: "2",
    version: "2.0.0",
    date: "2024-01-01",
    title: "Major Release: Design System v2",
    description: "Complete redesign with new components and improved accessibility.",
    type: "major",
    items: [
      "Rebuilt component library from scratch",
      "Added 20+ new components",
      "Full dark mode support",
      "Accessibility improvements throughout",
    ],
  },
  {
    id: "3",
    version: "1.9.5",
    date: "2023-12-20",
    title: "Security Patch",
    description: "Updated authentication library to fix vulnerability.",
    type: "security",
    items: [
      "Updated JWT library to version 9.x",
      "Added rate limiting to API endpoints",
    ],
  },
  {
    id: "4",
    version: "1.9.4",
    date: "2023-12-15",
    title: "Bug Fixes",
    type: "patch",
    items: [
      "Fixed modal z-index issue",
      "Corrected button hover states",
      "Resolved date picker timezone bug",
    ],
  },
  {
    id: "5",
    version: "1.9.3",
    date: "2023-12-10",
    title: "Performance Improvements",
    description: "Optimized bundle size and improved rendering performance.",
    type: "patch",
    items: [
      "Reduced bundle size by 15%",
      "Added lazy loading for images",
      "Optimized re-renders in data tables",
    ],
  },
  {
    id: "6",
    version: "2.0.0-beta",
    date: "2023-11-15",
    title: "Breaking Changes in v2 Beta",
    description: "Preview of upcoming breaking changes.",
    type: "breaking",
    items: [
      "Component API changes",
      "New theming system",
      "Removed deprecated props",
    ],
  },
];

export const Default: Story = {
  render: () => (
    <Changelog
      entries={mockChangelog}
      title="Changelog"
      description="Stay up to date with our latest features and improvements"
    />
  ),
};

export const WithoutDescriptions: Story = {
  render: () => (
    <Changelog
      entries={mockChangelog}
      title="Changelog"
      showDescriptions={false}
    />
  ),
};

export const EmptyState: Story = {
  render: () => (
    <Changelog
      entries={[]}
      title="Changelog"
      description="No updates yet"
    />
  ),
};

export const SingleEntry: Story = {
  render: () => (
    <Changelog
      entries={[mockChangelog[0]]}
      title="Latest Update"
    />
  ),
};

export const MajorRelease: Story = {
  render: () => (
    <Changelog
      entries={[mockChangelog[1]]}
      title="New Major Version"
    />
  ),
};

export const SecurityPatch: Story = {
  render: () => (
    <Changelog
      entries={[mockChangelog[2]]}
      title="Security Update"
    />
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Changelog
      entries={mockChangelog}
      title="Changelog"
      description="Stay up to date with our latest features"
    />
  ),
};
