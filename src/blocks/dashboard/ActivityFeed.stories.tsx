import type { Meta, StoryObj } from "@storybook/react";
import type { ActivityItem } from "./ActivityFeed";
import { ActivityFeed } from "./ActivityFeed";

const mockItems: ActivityItem[] = [
  {
    id: "1",
    user: { name: "Alice Chen", initials: "AC" },
    description: "Deployed v2.4.1 to production successfully.",
    timestamp: "2 minutes ago",
    actionType: "deploy",
    actionVariant: "default",
  },
  {
    id: "2",
    user: { name: "Bob Martinez", initials: "BM" },
    description:
      "Opened pull request #142: Add dark mode support to dashboard.",
    timestamp: "18 minutes ago",
    actionType: "PR opened",
    actionVariant: "secondary",
  },
  {
    id: "3",
    user: { name: "Carol White", initials: "CW" },
    description: "Resolved critical bug in authentication middleware.",
    timestamp: "1 hour ago",
    actionType: "bug fix",
    actionVariant: "destructive",
  },
  {
    id: "4",
    user: { name: "David Kim", initials: "DK" },
    description: "Updated API rate limits for enterprise tier.",
    timestamp: "3 hours ago",
    actionType: "config",
    actionVariant: "secondary",
  },
  {
    id: "5",
    user: { name: "Eva Rossi", initials: "ER" },
    description: "Merged feature branch: metric-cards-redesign into main.",
    timestamp: "5 hours ago",
    actionType: "merge",
    actionVariant: "outline",
  },
  {
    id: "6",
    user: { name: "Frank Lee", initials: "FL" },
    description: "Created new workspace for Q2 analytics sprint.",
    timestamp: "Yesterday at 4:30 PM",
    actionType: "create",
    actionVariant: "secondary",
  },
  {
    id: "7",
    user: { name: "Grace Park", initials: "GP" },
    description:
      "Archived stale feature flags from the feature management panel.",
    timestamp: "Yesterday at 11:00 AM",
    actionType: "archive",
    actionVariant: "outline",
  },
];

const meta: Meta<typeof ActivityFeed> = {
  title: "Blocks/Dashboard/ActivityFeed",
  component: ActivityFeed,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { ActivityFeed } from "@launchapp/design-system/blocks";

const items = [
  {
    id: "1",
    user: { name: "Alice Johnson", initials: "AJ" },
    description: "created a new project",
    timestamp: "2 minutes ago",
    actionType: "Created",
    actionVariant: "default",
  },
  {
    id: "2",
    user: { name: "Bob Smith", initials: "BS" },
    description: "merged pull request #42",
    timestamp: "1 hour ago",
    actionType: "Merged",
    actionVariant: "secondary",
  },
];

export default function Page() {
  return <ActivityFeed items={items} title="Recent Activity" />;
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActivityFeed>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 560 }}>
      <ActivityFeed {...args} />
    </div>
  ),
  args: {
    title: "Recent Activity",
    description: "Latest actions from your team",
    items: mockItems,
    maxHeight: 400,
  },
};

export const ShortList: Story = {
  render: (args) => (
    <div style={{ maxWidth: 560 }}>
      <ActivityFeed {...args} />
    </div>
  ),
  args: {
    title: "Activity Feed",
    items: mockItems.slice(0, 3),
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div
      className="dark"
      style={{
        background: "hsl(240 10% 3.9%)",
        padding: "24px",
        maxWidth: 560,
      }}
    >
      <ActivityFeed {...args} />
    </div>
  ),
  args: {
    title: "Recent Activity",
    description: "Latest actions from your team",
    items: mockItems,
    maxHeight: 400,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: (args) => (
    <div style={{ padding: "16px" }}>
      <ActivityFeed {...args} />
    </div>
  ),
  args: {
    title: "Recent Activity",
    items: mockItems,
    maxHeight: 500,
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: (args) => (
    <div style={{ padding: "24px" }}>
      <ActivityFeed {...args} />
    </div>
  ),
  args: {
    title: "Recent Activity",
    description: "Latest actions from your team",
    items: mockItems,
    maxHeight: 400,
  },
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  args: {
    title: "Recent Activity",
    items: mockItems,
  },
  parameters: {
    docs: {
      description: {
        story:
          "ActivityFeed is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Avatar, AvatarFallback, AvatarImage,
  Badge,
  Card, CardHeader, CardTitle, CardDescription, CardContent,
  ScrollArea,
  Separator,
} from "@launchapp/design-system";

// ActivityFeed renders a scrollable timeline of user actions.
// Each row is: Avatar (user initials/image) + description text + timestamp + Badge for action type.
// ScrollArea constrains height with internal scroll, keeping the card fixed size.
export function ActivityFeed({ title, description, items = [], maxHeight = 400 }) {
  return (
    <Card>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="p-0">
        <ScrollArea style={{ maxHeight }}>
          <ul className="divide-y">
            {items.map((item, i) => (
              <li key={item.id} className="flex items-start gap-3 px-6 py-4">
                <Avatar className="h-8 w-8 shrink-0">
                  {item.user.avatarSrc && <AvatarImage src={item.user.avatarSrc} />}
                  <AvatarFallback>{item.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{item.description}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.timestamp}</p>
                </div>
                {item.actionType && (
                  <Badge variant={item.actionVariant ?? "secondary"} className="shrink-0 text-xs">
                    {item.actionType}
                  </Badge>
                )}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}`,
      },
    },
  },
};
