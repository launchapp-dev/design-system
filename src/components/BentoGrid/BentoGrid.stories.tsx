import type { Meta, StoryObj } from "@storybook/react";
import {
  BentoGrid,
  BentoGridItem,
  BentoCard,
  BentoCardTitle,
  BentoCardDescription,
  BentoCardContent,
  BentoCardFooter,
  BentoCardIcon,
  Masonry,
  MasonryItem,
} from "./index";

const meta = {
  title: "Components/BentoGrid",
  component: BentoGrid,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    cols: {
      control: "select",
      options: [1, 2, 3, 4],
      description: "Number of columns",
    },
    gap: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Gap between items",
    },
  },
} satisfies Meta<typeof BentoGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const FeatureIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const Default: Story = {
  render: (args) => (
    <BentoGrid {...args}>
      <BentoGridItem>
        <BentoCard icon={<FeatureIcon />} header="Feature One">
          A compelling feature that showcases your product capabilities.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem>
        <BentoCard icon={<AnalyticsIcon />} header="Analytics">
          Real-time insights and metrics to track performance.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem>
        <BentoCard icon={<UsersIcon />} header="Team Collaboration">
          Work together seamlessly with your team members.
        </BentoCard>
      </BentoGridItem>
    </BentoGrid>
  ),
};

export const WithColSpan: Story = {
  render: () => (
    <BentoGrid cols={4} gap="md">
      <BentoGridItem colSpan={4}>
        <BentoCard variant="gradient" size="lg" header="Featured Section">
          This card spans the full width of the grid.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem colSpan={2}>
        <BentoCard icon={<AnalyticsIcon />} header="Half Width Card">
          This card spans half the grid width on large screens.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem colSpan={2}>
        <BentoCard icon={<UsersIcon />} header="Another Half">
          Matching half-width card for comparison.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem colSpan={1}>
        <BentoCard size="sm" header="Quarter">
          Small quarter-width card.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem colSpan={1}>
        <BentoCard size="sm" header="Quarter">
          Small quarter-width card.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem colSpan={1}>
        <BentoCard size="sm" header="Quarter">
          Small quarter-width card.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem colSpan={1}>
        <BentoCard size="sm" header="Quarter">
          Small quarter-width card.
        </BentoCard>
      </BentoGridItem>
    </BentoGrid>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <BentoGrid cols={2} gap="md">
      <BentoGridItem>
        <BentoCard variant="default" header="Default Variant">
          Standard card with subtle shadow.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem>
        <BentoCard variant="gradient" header="Gradient Variant">
          Cards with gradient backgrounds.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem>
        <BentoCard variant="outline" header="Outline Variant">
          Bordered cards with hover effect.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem>
        <BentoCard variant="ghost" header="Ghost Variant">
          Transparent cards that appear on hover.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem>
        <BentoCard variant="elevated" header="Elevated Variant">
          Cards that lift on hover with shadow.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem>
        <BentoCard variant="default" header="With Footer" footer="Last updated: Today">
          Cards can include footer sections.
        </BentoCard>
      </BentoGridItem>
    </BentoGrid>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <BentoGrid cols={3} gap="md">
      <BentoGridItem>
        <BentoCard size="sm" header="Small Card">
          Compact padding for dense layouts.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem>
        <BentoCard size="md" header="Medium Card">
          Default size for most use cases.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem>
        <BentoCard size="lg" header="Large Card">
          Extra padding for featured content.
        </BentoCard>
      </BentoGridItem>
    </BentoGrid>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <BentoGrid cols={2} gap="md">
      <BentoGridItem>
        <BentoCard
          icon={<SettingsIcon />}
          header="Settings"
          footer="12 settings"
        >
          <BentoCardContent>
            <BentoCardDescription>
              Manage your application settings and preferences from one central location.
            </BentoCardDescription>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                Profile
              </span>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                Security
              </span>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                Notifications
              </span>
            </div>
          </BentoCardContent>
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem>
        <BentoCard
          icon={<UsersIcon />}
          header="Team Members"
          footer="5 active users"
        >
          <BentoCardContent>
            <BentoCardDescription>
              Collaborate with your team in real-time.
            </BentoCardDescription>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted" />
                <span className="text-sm">Alice Chen</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted" />
                <span className="text-sm">Bob Smith</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted" />
                <span className="text-sm">Carol Davis</span>
              </div>
            </div>
          </BentoCardContent>
        </BentoCard>
      </BentoGridItem>
    </BentoGrid>
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
    <BentoGrid cols={2} gap="md">
      <BentoGridItem>
        <BentoCard variant="gradient" header="Dark Mode Card">
          Content adapts to dark backgrounds.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem>
        <BentoCard variant="elevated" header="Elevated Dark">
          Elevated cards look great in dark mode.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem>
        <BentoCard icon={<FeatureIcon />} header="Icon Card">
          Icons render correctly in both themes.
        </BentoCard>
      </BentoGridItem>
      <BentoGridItem>
        <BentoCard variant="outline" header="Outline Dark">
          Border colors adapt to dark backgrounds.
        </BentoCard>
      </BentoGridItem>
    </BentoGrid>
  ),
};

const masonryMeta = {
  title: "Components/Masonry",
  component: Masonry,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    cols: {
      control: "select",
      options: [1, 2, 3, 4, 5],
      description: "Number of columns",
    },
    gap: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Gap between items",
    },
  },
} satisfies Meta<typeof Masonry>;

export default meta;
type MasonryStory = StoryObj<typeof masonryMeta>;

const MasonryCard = ({ height, title, color }: { height: string; title: string; color: string }) => (
  <div
    className="rounded-lg bg-card border border-border p-4 mb-4"
    style={{ height, background: color }}
  >
    <h4 className="font-medium text-sm">{title}</h4>
  </div>
);

export const MasonryDefault: MasonryStory = {
  render: (args) => (
    <Masonry {...args}>
      <MasonryItem>
        <MasonryCard height="180px" title="Short Card" color="hsl(var(--primary)/0.1)" />
      </MasonryItem>
      <MasonryItem>
        <MasonryCard height="240px" title="Medium Card" color="hsl(var(--secondary)/0.1)" />
      </MasonryItem>
      <MasonryItem>
        <MasonryCard height="160px" title="Another Short" color="hsl(var(--accent)/0.1)" />
      </MasonryItem>
      <MasonryItem>
        <MasonryCard height="320px" title="Tall Card" color="hsl(var(--muted)/0.1)" />
      </MasonryItem>
      <MasonryItem>
        <MasonryCard height="200px" title="Medium Short" color="hsl(var(--primary)/0.15)" />
      </MasonryItem>
      <MasonryItem>
        <MasonryCard height="280px" title="Tall Short" color="hsl(var(--secondary)/0.15)" />
      </MasonryItem>
      <MasonryItem>
        <MasonryCard height="140px" title="Tiny Card" color="hsl(var(--accent)/0.15)" />
      </MasonryItem>
    </Masonry>
  ),
};

export const MasonryWithContent: MasonryStory = {
  render: (args) => (
    <Masonry {...args} cols={3}>
      <MasonryItem>
        <BentoCard variant="default" header="Blog Post 1">
          <p className="text-sm text-muted-foreground">
            An introduction to modern web development practices and techniques.
          </p>
        </BentoCard>
      </MasonryItem>
      <MasonryItem>
        <BentoCard variant="gradient" header="Featured Article">
          <p className="text-sm text-muted-foreground">
            Deep dive into React Server Components and their benefits.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            This article covers advanced patterns for building scalable applications.
          </p>
        </BentoCard>
      </MasonryItem>
      <MasonryItem>
        <BentoCard header="Quick Tip">
          <p className="text-sm text-muted-foreground">
            Use CSS Grid for two-dimensional layouts.
          </p>
        </BentoCard>
      </MasonryItem>
      <MasonryItem>
        <BentoCard variant="outline" header="Tutorial">
          <p className="text-sm text-muted-foreground">
            Learn how to build accessible components from scratch.
          </p>
        </BentoCard>
      </MasonryItem>
      <MasonryItem>
        <BentoCard variant="elevated" header="Case Study">
          <p className="text-sm text-muted-foreground">
            How we improved performance by 50% using modern tooling.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Key learnings from our optimization journey.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Detailed breakdown of each improvement made.
          </p>
        </BentoCard>
      </MasonryItem>
      <MasonryItem>
        <BentoCard header="Update">
          <p className="text-sm text-muted-foreground">
            Version 2.0 is now available!
          </p>
        </BentoCard>
      </MasonryItem>
    </Masonry>
  ),
};

export const MasonryDarkMode: MasonryStory = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Masonry {...args} cols={2}>
      <MasonryItem>
        <BentoCard variant="gradient" header="Dark Masonry">
          Content adapts to dark backgrounds.
        </BentoCard>
      </MasonryItem>
      <MasonryItem>
        <BentoCard variant="elevated" header="Elevated Dark">
          Elevated cards look great in dark mode.
        </BentoCard>
      </MasonryItem>
      <MasonryItem>
        <BentoCard header="Regular Card">
          Cards in masonry layout.
        </BentoCard>
      </MasonryItem>
      <MasonryItem>
        <BentoCard variant="outline" header="Outline Dark">
          Border colors adapt to dark backgrounds.
        </BentoCard>
      </MasonryItem>
    </Masonry>
  ),
};

export { meta as bentoGridMeta };
