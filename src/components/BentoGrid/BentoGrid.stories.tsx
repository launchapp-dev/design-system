import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  BentoGrid,
  BentoCell,
  BentoCard,
  BentoCardHeader,
  BentoCardTitle,
  BentoCardDescription,
  BentoCardIcon,
  BentoCardContent,
  BentoCardFooter,
  BentoCardBackground,
  Masonry,
  MasonryItem,
} from "./index";

const meta: Meta<typeof BentoGrid> = {
  title: "Components/BentoGrid",
  component: BentoGrid,
  argTypes: {
    cols: {
      control: "select",
      options: [1, 2, 3, 4],
    },
    gap: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
    },
  },
  args: {
    cols: 3,
    gap: "md",
  },
};

export default meta;
type Story = StoryObj<typeof BentoGrid>;

const SampleCard = ({
  title,
  description,
  variant = "default",
  colSpan,
  rowSpan,
}: {
  title: string;
  description: string;
  variant?: "default" | "gradient" | "outline" | "elevated" | "ghost";
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3 | 4;
}) => (
  <BentoCell colSpan={colSpan} rowSpan={rowSpan}>
    <BentoCard variant={variant} hover="lift" className="h-full">
      <BentoCardHeader>
        <BentoCardTitle>{title}</BentoCardTitle>
        <BentoCardDescription>{description}</BentoCardDescription>
      </BentoCardHeader>
    </BentoCard>
  </BentoCell>
);

export const Default: Story = {
  render: (args) => (
    <BentoGrid {...args}>
      <SampleCard title="Analytics" description="View your dashboard metrics" />
      <SampleCard title="Reports" description="Generate custom reports" />
      <SampleCard title="Settings" description="Configure your preferences" />
      <SampleCard title="Users" description="Manage team members" />
      <SampleCard title="Billing" description="View invoices and plans" />
      <SampleCard title="Support" description="Get help from our team" />
    </BentoGrid>
  ),
};

export const WithSpans: Story = {
  render: () => (
    <BentoGrid cols={4} gap="md">
      <SampleCard
        title="Welcome"
        description="This card spans 2 columns"
        colSpan={2}
        variant="gradient"
      />
      <SampleCard title="Stats" description="Quick overview" />
      <SampleCard title="Alerts" description="3 new alerts" variant="elevated" />
      <SampleCard
        title="Featured Content"
        description="This card spans 2 columns and 2 rows for a larger feature area"
        colSpan={2}
        rowSpan={2}
        variant="gradient"
      />
      <SampleCard title="Recent Activity" description="Latest updates" />
      <SampleCard title="Quick Actions" description="Common tasks" />
    </BentoGrid>
  ),
};

export const CardVariants: Story = {
  render: () => (
    <BentoGrid cols={3} gap="md">
      <SampleCard title="Default" description="Standard card style" variant="default" />
      <SampleCard title="Gradient" description="Gradient background" variant="gradient" />
      <SampleCard title="Outline" description="Bordered card" variant="outline" />
      <SampleCard title="Elevated" description="With shadow" variant="elevated" />
      <SampleCard title="Ghost" description="Transparent background" variant="ghost" />
    </BentoGrid>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <BentoGrid cols={3} gap="md">
      <BentoCell>
        <BentoCard hover="lift" className="h-full">
          <BentoCardContent className="flex flex-col gap-4">
            <BentoCardIcon>
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
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </BentoCardIcon>
            <BentoCardHeader>
              <BentoCardTitle>Analytics</BentoCardTitle>
              <BentoCardDescription>Track your performance metrics</BentoCardDescription>
            </BentoCardHeader>
          </BentoCardContent>
        </BentoCard>
      </BentoCell>
      <BentoCell>
        <BentoCard hover="glow" variant="gradient" className="h-full">
          <BentoCardContent className="flex flex-col gap-4">
            <BentoCardIcon className="bg-primary/20 text-primary">
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
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </BentoCardIcon>
            <BentoCardHeader>
              <BentoCardTitle>Revenue</BentoCardTitle>
              <BentoCardDescription>Financial overview and trends</BentoCardDescription>
            </BentoCardHeader>
          </BentoCardContent>
        </BentoCard>
      </BentoCell>
      <BentoCell>
        <BentoCard hover="scale" className="h-full">
          <BentoCardContent className="flex flex-col gap-4">
            <BentoCardIcon>
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
            </BentoCardIcon>
            <BentoCardHeader>
              <BentoCardTitle>Team</BentoCardTitle>
              <BentoCardDescription>Manage team members</BentoCardDescription>
            </BentoCardHeader>
          </BentoCardContent>
        </BentoCard>
      </BentoCell>
    </BentoGrid>
  ),
};

export const WithBackgrounds: Story = {
  render: () => (
    <BentoGrid cols={3} gap="md">
      <BentoCell colSpan={2}>
        <BentoCard hover="lift" className="h-full min-h-[200px]">
          <BentoCardBackground pattern="dots" />
          <BentoCardContent className="relative z-10">
            <BentoCardHeader>
              <BentoCardTitle>Dot Pattern Background</BentoCardTitle>
              <BentoCardDescription>Subtle pattern overlay</BentoCardDescription>
            </BentoCardHeader>
          </BentoCardContent>
        </BentoCard>
      </BentoCell>
      <BentoCell>
        <BentoCard hover="lift" className="h-full min-h-[200px]">
          <BentoCardBackground pattern="grid" />
          <BentoCardContent className="relative z-10">
            <BentoCardHeader>
              <BentoCardTitle>Grid Pattern</BentoCardTitle>
              <BentoCardDescription>Technical aesthetic</BentoCardDescription>
            </BentoCardHeader>
          </BentoCardContent>
        </BentoCard>
      </BentoCell>
      <BentoCell>
        <BentoCard hover="lift" className="h-full min-h-[200px]">
          <BentoCardBackground pattern="lines" />
          <BentoCardContent className="relative z-10">
            <BentoCardHeader>
              <BentoCardTitle>Lines Pattern</BentoCardTitle>
              <BentoCardDescription>Diagonal stripes</BentoCardDescription>
            </BentoCardHeader>
          </BentoCardContent>
        </BentoCard>
      </BentoCell>
      <BentoCell colSpan={2}>
        <BentoCard hover="glow" variant="gradient" className="h-full min-h-[200px]">
          <BentoCardBackground gradient="linear-gradient(135deg, hsl(var(--la-primary)/0.1) 0%, hsl(var(--la-accent)/0.2) 100%)" />
          <BentoCardContent className="relative z-10">
            <BentoCardHeader>
              <BentoCardTitle>Custom Gradient</BentoCardTitle>
              <BentoCardDescription>Use any CSS gradient</BentoCardDescription>
            </BentoCardHeader>
          </BentoCardContent>
        </BentoCard>
      </BentoCell>
    </BentoGrid>
  ),
};

export const HoverEffects: Story = {
  render: () => (
    <BentoGrid cols={4} gap="md">
      <BentoCell>
        <BentoCard hover="none" className="h-full min-h-[150px]">
          <BentoCardContent className="flex items-center justify-center h-full">
            <span className="text-muted-foreground">No hover</span>
          </BentoCardContent>
        </BentoCard>
      </BentoCell>
      <BentoCell>
        <BentoCard hover="lift" className="h-full min-h-[150px]">
          <BentoCardContent className="flex items-center justify-center h-full">
            <span>Lift effect</span>
          </BentoCardContent>
        </BentoCard>
      </BentoCell>
      <BentoCell>
        <BentoCard hover="glow" className="h-full min-h-[150px]">
          <BentoCardContent className="flex items-center justify-center h-full">
            <span>Glow effect</span>
          </BentoCardContent>
        </BentoCard>
      </BentoCell>
      <BentoCell>
        <BentoCard hover="scale" className="h-full min-h-[150px]">
          <BentoCardContent className="flex items-center justify-center h-full">
            <span>Scale effect</span>
          </BentoCardContent>
        </BentoCard>
      </BentoCell>
    </BentoGrid>
  ),
};

export const MasonryLayout: Story = {
  render: () => (
    <Masonry columns={3} gap="md">
      {[
        { height: 120, title: "Short Item", color: "bg-muted" },
        { height: 200, title: "Tall Item", color: "bg-primary/10" },
        { height: 160, title: "Medium Item", color: "bg-accent" },
        { height: 280, title: "Extra Tall", color: "bg-secondary" },
        { height: 140, title: "Another Short", color: "bg-muted" },
        { height: 220, title: "Quite Tall", color: "bg-primary/10" },
        { height: 180, title: "Medium Tall", color: "bg-accent" },
        { height: 100, title: "Tiny", color: "bg-secondary" },
        { height: 240, title: "Very Tall", color: "bg-muted" },
      ].map((item, index) => (
        <MasonryItem key={index} gap="md">
          <div
            className={`rounded-lg border border-border p-4 ${item.color}`}
            style={{ minHeight: item.height }}
          >
            <h4 className="font-medium">{item.title}</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Masonry item #{index + 1}
            </p>
          </div>
        </MasonryItem>
      ))}
    </Masonry>
  ),
};

export const MasonryWithCards: Story = {
  render: () => (
    <Masonry columns={4} gap="md">
      <MasonryItem gap="md">
        <BentoCard hover="lift" padding="lg">
          <BentoCardHeader>
            <BentoCardTitle>Project Alpha</BentoCardTitle>
            <BentoCardDescription>
              A comprehensive redesign of the user interface with modern aesthetics
              and improved accessibility.
            </BentoCardDescription>
          </BentoCardHeader>
          <BentoCardFooter>
            <span className="text-xs text-muted-foreground">Updated 2h ago</span>
          </BentoCardFooter>
        </BentoCard>
      </MasonryItem>
      <MasonryItem gap="md">
        <BentoCard hover="lift" variant="gradient">
          <BentoCardHeader>
            <BentoCardTitle>Quick Note</BentoCardTitle>
          </BentoCardHeader>
          <BentoCardContent>
            <p className="text-sm">Remember to review the analytics report.</p>
          </BentoCardContent>
        </BentoCard>
      </MasonryItem>
      <MasonryItem gap="md">
        <BentoCard hover="glow" variant="elevated">
          <BentoCardHeader>
            <BentoCardTitle>Team Update</BentoCardTitle>
            <BentoCardDescription>
              Three new members joined the engineering team this week. Welcome aboard!
            </BentoCardDescription>
          </BentoCardHeader>
        </BentoCard>
      </MasonryItem>
      <MasonryItem gap="md">
        <BentoCard hover="lift">
          <BentoCardContent className="flex items-center gap-3">
            <BentoCardIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </BentoCardIcon>
            <div>
              <p className="font-medium">Growth</p>
              <p className="text-sm text-muted-foreground">+24% this month</p>
            </div>
          </BentoCardContent>
        </BentoCard>
      </MasonryItem>
      <MasonryItem gap="md">
        <BentoCard hover="scale" variant="outline">
          <BentoCardHeader>
            <BentoCardTitle>Documentation</BentoCardTitle>
            <BentoCardDescription>
              Comprehensive guides and API references for developers. Includes code examples
              and best practices for integration.
            </BentoCardDescription>
          </BentoCardHeader>
          <BentoCardFooter>
            <span className="text-xs text-primary">Read more →</span>
          </BentoCardFooter>
        </BentoCard>
      </MasonryItem>
      <MasonryItem gap="md">
        <BentoCard hover="lift" variant="ghost">
          <BentoCardContent>
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-sm text-muted-foreground">Active users</p>
          </BentoCardContent>
        </BentoCard>
      </MasonryItem>
    </Masonry>
  ),
};

export const ResponsiveGrid: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4 text-muted-foreground">1 Column (Mobile)</h3>
        <BentoGrid cols={1} gap="sm">
          <SampleCard title="Card 1" description="First card" />
          <SampleCard title="Card 2" description="Second card" />
        </BentoGrid>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4 text-muted-foreground">2 Columns (Tablet)</h3>
        <BentoGrid cols={2} gap="md">
          <SampleCard title="Card 1" description="First card" />
          <SampleCard title="Card 2" description="Second card" />
          <SampleCard title="Card 3" description="Third card" />
          <SampleCard title="Card 4" description="Fourth card" />
        </BentoGrid>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4 text-muted-foreground">4 Columns (Desktop)</h3>
        <BentoGrid cols={4} gap="lg">
          <SampleCard title="Card 1" description="First card" />
          <SampleCard title="Card 2" description="Second card" />
          <SampleCard title="Card 3" description="Third card" />
          <SampleCard title="Card 4" description="Fourth card" />
          <SampleCard title="Card 5" description="Fifth card" />
          <SampleCard title="Card 6" description="Sixth card" />
          <SampleCard title="Card 7" description="Seventh card" />
          <SampleCard title="Card 8" description="Eighth card" />
        </BentoGrid>
      </div>
    </div>
  ),
};
