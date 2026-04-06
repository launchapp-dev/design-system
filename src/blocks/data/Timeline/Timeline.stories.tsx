import type { Meta, StoryObj } from "@storybook/react";
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
    docs: {
      source: {
        code: `import { Timeline } from "@launchapp/design-system/blocks";

const items = [
  {
    id: "1",
    title: "Project kickoff",
    description: "Initial planning meeting with all stakeholders.",
    date: "Jan 15, 2025",
    status: "completed",
  },
  {
    id: "2",
    title: "Design phase",
    description: "Created wireframes and design system.",
    date: "Feb 1, 2025",
    status: "completed",
  },
  {
    id: "3",
    title: "Development sprint",
    description: "Building core features and API integration.",
    date: "Mar 10, 2025",
    status: "current",
  },
  {
    id: "4",
    title: "Launch",
    description: "Public release and marketing campaign.",
    date: "Apr 1, 2025",
    status: "upcoming",
  },
];

export default function Page() {
  return <Timeline items={items} />;
}`,
      },
    },
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

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  render: () => (
    <div className="max-w-lg">
      <Timeline items={avatarItems} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Timeline is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Avatar, AvatarFallback, AvatarImage,
  Badge,
} from "@launchapp/design-system";
import { cva } from "class-variance-authority";
import { cn } from "@launchapp/design-system/utils";

// Timeline is a pure layout component styled with CVA variants.
// Each item is a flex row containing:
// – A connector column: vertical line + dot (or icon/Avatar as the node)
// – Content column: title, description, timestamp, optional Badge
// CVA variants control dot/line sizing (sm/md/lg) and color scheme
const timelineVariants = cva("relative flex gap-4", {
  variants: {
    size: { sm: "text-sm", md: "text-base", lg: "text-lg" },
  },
  defaultVariants: { size: "md" },
});

export function Timeline({ items = [], size, className }) {
  return (
    <ol className={cn("space-y-4", className)}>
      {items.map((item, i) => (
        <li key={item.id ?? i} className={timelineVariants({ size })}>
          <div className="flex flex-col items-center">
            {item.avatar ? (
              <Avatar className="h-8 w-8">
                {item.avatar.src && <AvatarImage src={item.avatar.src} />}
                <AvatarFallback>{item.avatar.fallback}</AvatarFallback>
              </Avatar>
            ) : item.icon ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">{item.icon}</div>
            ) : (
              <div className="mt-1 h-3 w-3 rounded-full border-2 border-primary bg-background" />
            )}
            {i < items.length - 1 && <div className="mt-1 w-px flex-1 bg-border" />}
          </div>
          <div className="pb-4 min-w-0">
            {item.title && <p className="font-medium leading-none">{item.title}</p>}
            {item.description && <p className="mt-1 text-muted-foreground">{item.description}</p>}
            <div className="mt-1 flex items-center gap-2">
              {item.timestamp && <span className="text-xs text-muted-foreground">{item.timestamp}</span>}
              {item.badge && <Badge variant="secondary" className="text-xs">{item.badge}</Badge>}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}`,
      },
    },
  },
};
