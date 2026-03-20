import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CheckCircle, Circle, Clock, Star, Zap } from "lucide-react";
import { Timeline, type TimelineItem } from "./Timeline";

const defaultItems: TimelineItem[] = [
  {
    id: "1",
    date: "Jan 15, 2024",
    title: "Project kickoff",
    description: "Initial planning meeting with all stakeholders to align on goals and timeline.",
    badge: "Milestone",
    badgeVariant: "default",
  },
  {
    id: "2",
    date: "Feb 3, 2024",
    title: "Design phase complete",
    description: "All wireframes and high-fidelity mockups approved by the product team.",
    badge: "Done",
    badgeVariant: "secondary",
  },
  {
    id: "3",
    date: "Mar 12, 2024",
    title: "Beta launch",
    description: "Released to a limited group of early adopters for feedback.",
    badge: "In Progress",
    badgeVariant: "outline",
  },
  {
    id: "4",
    date: "Apr 1, 2024",
    title: "Critical bug found in auth flow",
    description: "Authentication bypass vulnerability discovered and patched within 24 hours.",
    badge: "Urgent",
    badgeVariant: "destructive",
  },
  {
    id: "5",
    date: "May 20, 2024",
    title: "Public launch",
    description: "Full public release with marketing campaign. 10,000 sign-ups in the first week.",
  },
];

const iconItems: TimelineItem[] = [
  {
    id: "1",
    date: "Jan 15, 2024",
    title: "Project created",
    description: "Repository initialized and CI/CD pipeline configured.",
    icon: <Circle className="h-4 w-4" />,
  },
  {
    id: "2",
    date: "Feb 20, 2024",
    title: "First milestone reached",
    description: "Core feature set delivered ahead of schedule.",
    icon: <Star className="h-4 w-4" />,
    badge: "Milestone",
    badgeVariant: "default",
  },
  {
    id: "3",
    date: "Mar 5, 2024",
    title: "Performance optimization",
    description: "Page load times reduced by 60% after profiling and caching improvements.",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    id: "4",
    date: "Apr 10, 2024",
    title: "Deployment scheduled",
    description: "Staging verified. Production deployment window confirmed.",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: "5",
    date: "May 1, 2024",
    title: "Shipped to production",
    description: "Zero-downtime deployment completed successfully.",
    icon: <CheckCircle className="h-4 w-4" />,
    badge: "Done",
    badgeVariant: "secondary",
  },
];

const avatarItems: TimelineItem[] = [
  {
    id: "1",
    date: "Jan 10, 2024",
    title: "Alex Chen opened pull request #42",
    description: "Refactor authentication middleware to support OAuth2 providers.",
    avatarFallback: "AC",
    badge: "PR",
    badgeVariant: "outline",
  },
  {
    id: "2",
    date: "Jan 11, 2024",
    title: "Brianna Scott left a review",
    description: "Looks good overall. Left a few inline suggestions on error handling.",
    avatarFallback: "BS",
  },
  {
    id: "3",
    date: "Jan 11, 2024",
    title: "Carlos Diaz approved",
    description: "LGTM. Approved for merge after suggestions are addressed.",
    avatarFallback: "CD",
    badge: "Approved",
    badgeVariant: "secondary",
  },
  {
    id: "4",
    date: "Jan 12, 2024",
    title: "Alex Chen merged",
    description: "Pull request #42 merged into main.",
    avatarFallback: "AC",
    badge: "Merged",
    badgeVariant: "default",
  },
  {
    id: "5",
    date: "Jan 12, 2024",
    title: "Diana Wu deployed to staging",
    description: "Automated deployment triggered after merge. All checks passed.",
    avatarFallback: "DW",
  },
];

const compactItems: TimelineItem[] = [
  { id: "1", date: "09:00 AM", title: "Sprint planning" },
  { id: "2", date: "10:30 AM", title: "Design review", badge: "Done", badgeVariant: "secondary" },
  { id: "3", date: "12:00 PM", title: "Lunch break" },
  { id: "4", date: "01:00 PM", title: "Engineering sync", badge: "In Progress", badgeVariant: "outline" },
  { id: "5", date: "03:00 PM", title: "Client demo", badge: "Upcoming", badgeVariant: "default" },
  { id: "6", date: "04:30 PM", title: "Retrospective" },
];

const meta: Meta<typeof Timeline> = {
  title: "Blocks/Data/Timeline",
  component: Timeline,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="max-w-lg">
      <Timeline items={defaultItems} />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="max-w-lg">
      <Timeline items={iconItems} />
    </div>
  ),
};

export const WithAvatars: Story = {
  render: () => (
    <div className="max-w-lg">
      <Timeline items={avatarItems} />
    </div>
  ),
};

export const Compact: Story = {
  render: () => (
    <div className="max-w-sm">
      <Timeline items={compactItems} compact />
    </div>
  ),
};

export const ReverseChronological: Story = {
  render: () => (
    <div className="max-w-lg">
      <Timeline items={defaultItems} order="reverse" />
    </div>
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
    <div className="max-w-lg">
      <Timeline items={defaultItems} />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <div className="max-w-full px-2">
      <Timeline items={defaultItems} />
    </div>
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <div className="max-w-lg">
      <Timeline items={avatarItems} />
    </div>
  ),
};
