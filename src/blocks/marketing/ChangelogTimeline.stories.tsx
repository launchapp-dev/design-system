import type { Meta, StoryObj } from "@storybook/react";
import { ChangelogTimeline } from "./ChangelogTimeline";
import type { ChangelogEntry } from "./ChangelogTimeline";

const meta: Meta<typeof ChangelogTimeline> = {
  title: "Blocks/Marketing/ChangelogTimeline",
  component: ChangelogTimeline,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { ChangelogTimeline } from "@launchapp/design-system/blocks";

export default function Page() {
  return (
    <ChangelogTimeline
      entries={entries}
      onSubscribe={() => console.log("Subscribe")}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ENTRIES: ChangelogEntry[] = [
  {
    id: "1",
    version: "v2.5.0",
    date: "2026-03-21",
    title: "Granular cookie consent & new status components",
    description: "Major update introducing four new components for product and compliance needs.",
    tags: ["feature", "improvement"],
    content: `
      <ul>
        <li>Full cookie consent management with granular category controls</li>
        <li>New StatusPage component for service status visualization</li>
        <li>LiveIndicator component with smooth pulsing animation</li>
        <li>Improved accessibility across all form components</li>
      </ul>
    `,
  },
  {
    id: "2",
    version: "v2.4.2",
    date: "2026-03-14",
    title: "Accessibility and performance fixes",
    description: "Focus improvements and animation performance enhancements.",
    tags: ["fix", "improvement"],
  },
  {
    id: "3",
    version: "v2.4.0",
    date: "2026-02-28",
    title: "Dark mode improvements and DataTable sorting",
    tags: ["improvement", "feature", "breaking"],
    content: `
      <p>We've completely overhauled the dark mode color tokens for better contrast ratios.</p>
      <p><strong>Breaking change:</strong> The <code>TableLegacy</code> component has been deprecated. Please migrate to the new <code>DataTable</code> component.</p>
    `,
  },
  {
    id: "4",
    version: "v2.3.1",
    date: "2026-02-14",
    title: "Security patch for dependency vulnerability",
    tags: ["security"],
  },
  {
    id: "5",
    version: "v2.3.0",
    date: "2026-01-30",
    title: "New dashboard components and performance wins",
    description: "Introducing several new components for building rich dashboards.",
    tags: ["feature", "performance"],
    content: `
      <ul>
        <li>KPICard component for key metric display</li>
        <li>Chart component with multiple visualization types</li>
        <li>30% faster initial load time</li>
      </ul>
    `,
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <ChangelogTimeline
        entries={ENTRIES}
        onSubscribe={() => console.log("Subscribe")}
        onViewAll={() => console.log("View all")}
      />
    </div>
  ),
};

export const NoContent: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <ChangelogTimeline
        entries={ENTRIES.map(({ content, ...entry }) => entry)}
        onSubscribe={() => console.log("Subscribe")}
      />
    </div>
  ),
};

export const LimitedEntries: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <ChangelogTimeline
        entries={ENTRIES}
        maxEntries={3}
        onViewAll={() => console.log("View all")}
      />
    </div>
  ),
};

export const NoSubscribeButton: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <ChangelogTimeline
        entries={ENTRIES.slice(0, 2)}
        showSubscribe={false}
      />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <ChangelogTimeline entries={[]} />
    </div>
  ),
};

export const CustomTitle: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <ChangelogTimeline
        entries={ENTRIES.slice(0, 2)}
        title="What's New"
        description="Latest updates to our platform."
      />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <ChangelogTimeline
        entries={ENTRIES.slice(0, 3)}
        onSubscribe={() => console.log("Subscribe")}
      />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <ChangelogTimeline
      entries={ENTRIES.slice(0, 2)}
      onSubscribe={() => console.log("Subscribe")}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <ChangelogTimeline
        entries={ENTRIES.slice(0, 2)}
        onSubscribe={() => console.log("Subscribe")}
      />
    </div>
  ),
};
