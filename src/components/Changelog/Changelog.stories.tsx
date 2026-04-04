import type { Meta, StoryObj } from "@storybook/react";
import type { ChangelogEntry } from "./index";
import { Changelog } from "./index";

const meta: Meta<typeof Changelog> = {
  title: "Components/Changelog",
  component: Changelog,
};

export default meta;
type Story = StoryObj<typeof Changelog>;

const ENTRIES: ChangelogEntry[] = [
  {
    version: "v2.5.0",
    date: "March 21, 2026",
    title: "Granular cookie consent & new status components",
    description:
      "Major update introducing four new components for product and compliance needs.",
    changes: [
      {
        text: "Add CookieConsent component with granular category controls",
        tag: "feature",
      },
      {
        text: "Add StatusPage component with uptime history visualisation",
        tag: "feature",
      },
      {
        text: "Add LiveIndicator component with pulsing animation",
        tag: "feature",
      },
      {
        text: "Add Changelog component with date grouping and version tags",
        tag: "feature",
      },
    ],
  },
  {
    version: "v2.4.2",
    date: "March 14, 2026",
    title: "Accessibility and performance fixes",
    changes: [
      {
        text: "Fix focus ring not visible in high-contrast mode on Button",
        tag: "fix",
      },
      {
        text: "Improve Dialog animation performance on low-end devices",
        tag: "improvement",
      },
      { text: "Remove unused peer dependency on react-is", tag: "improvement" },
    ],
  },
  {
    version: "v2.4.0",
    date: "February 28, 2026",
    title: "Dark mode improvements and DataTable sorting",
    changes: [
      {
        text: "Overhaul dark mode colour tokens for better contrast ratios",
        tag: "improvement",
      },
      { text: "Add column sorting to DataTable", tag: "feature" },
      {
        text: "Deprecate TableLegacy — use DataTable instead",
        tag: "deprecation",
      },
      {
        text: "Remove implicit window dependency in useReducedMotion",
        tag: "breaking",
      },
    ],
  },
  {
    version: "v2.3.1",
    date: "February 14, 2026",
    title: "Security patch for dependency vulnerability",
    changes: [
      { text: "Upgrade date-fns to address CVE-2025-XXXXX", tag: "security" },
    ],
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: "680px", padding: "24px" }}>
      <Changelog entries={ENTRIES} />
    </div>
  ),
};

export const SingleEntry: Story = {
  render: () => (
    <div style={{ maxWidth: "680px", padding: "24px" }}>
      <Changelog entries={[ENTRIES[0]]} title="Latest Release" />
    </div>
  ),
};

export const NoTitle: Story = {
  render: () => (
    <div style={{ maxWidth: "680px", padding: "24px" }}>
      <Changelog entries={ENTRIES} title="" />
    </div>
  ),
};
