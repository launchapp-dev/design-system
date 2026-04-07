import type { Meta, StoryObj } from "@storybook/react";
import { TimelineView, type TimelineEvent } from "./TimelineView";

const checkIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const starIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const events: TimelineEvent[] = [
  {
    id: "1",
    date: "Apr 7, 2026",
    title: "Project launched",
    description: "Design System v0.2.1-alpha.0 deployed to production via Vercel.",
    badge: "Release",
    badgeVariant: "default",
    color: "#3b82f6",
    icon: starIcon,
  },
  {
    id: "2",
    date: "Apr 6, 2026",
    title: "PR #367 merged — InvoiceTable, FileManager, CalendarWidget",
    description: "3 new blocks added to the billing and data categories.",
    badge: "Merged",
    badgeVariant: "secondary",
    color: "#22c55e",
    icon: checkIcon,
  },
  {
    id: "3",
    date: "Apr 5, 2026",
    title: "e2e testing passed — 12/12 pages",
    description: "All templates passing HTTP smoke tests. Auth guards, dark mode, i18n verified.",
    badge: "QA Pass",
    badgeVariant: "outline",
    color: "#a855f7",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    id: "4",
    date: "Apr 4, 2026",
    title: "Dependency updates applied",
    description: "Vite GHSA-4w7w-66w2-5vf9 patched across all templates.",
    badge: "Security",
    badgeVariant: "destructive",
    color: "#ef4444",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const meta: Meta<typeof TimelineView> = {
  title: "Blocks/Timeline/TimelineView",
  component: TimelineView,
  tags: ["autodocs"],
  argTypes: { compact: { control: "boolean" } },
};

export default meta;
type Story = StoryObj<typeof TimelineView>;

export const Default: Story = {
  args: {
    events,
    title: "Project Timeline",
  },
};

export const Compact: Story = {
  args: {
    events,
    compact: true,
  },
};