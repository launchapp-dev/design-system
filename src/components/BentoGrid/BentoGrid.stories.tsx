import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  BentoGrid,
  BentoCard,
  BentoCardHeader,
  BentoCardFooter,
} from "./index";

const meta: Meta<typeof BentoGrid> = {
  title: "Components/BentoGrid",
  component: BentoGrid,
  tags: ["autodocs"],
  argTypes: {
    cols: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6],
      description: "Number of columns in the grid",
    },
    gap: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Gap between grid items",
    },
  },
};

export default meta;

type Story = StoryObj<typeof BentoGrid>;

const SampleIcon = () => (
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
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <BentoGrid cols={3} gap="md">
      {Array.from({ length: 6 }).map((_, i) => (
        <BentoCard key={i}>
          <BentoCardHeader
            title={`Card ${i + 1}`}
            description="This is a sample bento card"
          />
          <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
            Content goes here
          </p>
        </BentoCard>
      ))}
    </BentoGrid>
  ),
};

export const SpanVariants: Story = {
  render: () => (
    <BentoGrid cols={4} gap="md">
      <BentoCard colSpan={2} rowSpan={2} gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
        <BentoCardHeader
          title="Featured"
          description="Large featured card spanning 2 columns and 2 rows"
        />
        <p className="text-white/80">
          This card takes up more space to highlight important content.
        </p>
      </BentoCard>
      <BentoCard>
        <BentoCardHeader title="Small Card" />
        <p className="text-sm text-[hsl(var(--la-muted-foreground))]">1x1</p>
      </BentoCard>
      <BentoCard>
        <BentoCardHeader title="Small Card" />
        <p className="text-sm text-[hsl(var(--la-muted-foreground))]">1x1</p>
      </BentoCard>
      <BentoCard colSpan={2}>
        <BentoCardHeader
          title="Wide Card"
          description="Spans 2 columns"
        />
      </BentoCard>
      <BentoCard>
        <BentoCardHeader title="Normal" />
      </BentoCard>
      <BentoCard>
        <BentoCardHeader title="Normal" />
      </BentoCard>
    </BentoGrid>
  ),
};

export const CardVariants: Story = {
  render: () => (
    <BentoGrid cols={2} gap="md">
      <BentoCard variant="default">
        <BentoCardHeader title="Default" description="Standard card style" />
      </BentoCard>
      <BentoCard variant="gradient" gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
        <BentoCardHeader title="Gradient" description="Custom gradient background" />
      </BentoCard>
      <BentoCard variant="glass">
        <BentoCardHeader title="Glass" description="Glassmorphism effect" />
      </BentoCard>
      <BentoCard variant="outline">
        <BentoCardHeader title="Outline" description="Minimal border style" />
      </BentoCard>
    </BentoGrid>
  ),
};

export const HoverEffects: Story = {
  render: () => (
    <BentoGrid cols={2} gap="md">
      <BentoCard hover="none">
        <BentoCardHeader title="No Hover" description="Static card" />
      </BentoCard>
      <BentoCard hover="lift">
        <BentoCardHeader title="Lift" description="Lifts up on hover" />
      </BentoCard>
      <BentoCard hover="glow">
        <BentoCardHeader title="Glow" description="Glowing shadow on hover" />
      </BentoCard>
      <BentoCard hover="scale">
        <BentoCardHeader title="Scale" description="Slightly scales up" />
      </BentoCard>
    </BentoGrid>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <BentoGrid cols={3} gap="md">
      <BentoCard icon={<SampleIcon />} colSpan={2}>
        <BentoCardHeader title="With Icon" description="Card featuring an icon" />
      </BentoCard>
      <BentoCard icon={<SampleIcon />}>
        <BentoCardHeader title="Icon Card" />
      </BentoCard>
      <BentoCard icon={<SampleIcon />}>
        <BentoCardHeader title="Another Icon" />
      </BentoCard>
      <BentoCard icon={<SampleIcon />} colSpan={2}>
        <BentoCardHeader title="Wide Icon Card" />
      </BentoCard>
    </BentoGrid>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <BentoGrid cols={2} gap="md">
      <BentoCard
        header={<BentoCardHeader title="Stats" description="View details" />}
        footer={
          <BentoCardFooter>
            <span className="text-[hsl(var(--la-primary))]">View more →</span>
          </BentoCardFooter>
        }
      >
        <div className="text-3xl font-bold">1,234</div>
      </BentoCard>
      <BentoCard
        footer={
          <BentoCardFooter>
            <span>Last updated: 2 hours ago</span>
          </BentoCardFooter>
        }
      >
        <BentoCardHeader title="Activity" />
        <p className="text-sm">Recent activity will appear here</p>
      </BentoCard>
    </BentoGrid>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["none", "sm", "md", "lg", "xl"] as const).map((gap) => (
        <div key={gap}>
          <p className="mb-2 text-sm font-medium text-[hsl(var(--la-muted-foreground))]">
            Gap: {gap}
          </p>
          <BentoGrid cols={3} gap={gap}>
            {Array.from({ length: 3 }).map((_, i) => (
              <BentoCard key={i}>
                <p className="p-2 text-center">Card {i + 1}</p>
              </BentoCard>
            ))}
          </BentoGrid>
        </div>
      ))}
    </div>
  ),
};

export const ResponsiveLayout: Story = {
  render: () => (
    <BentoGrid cols={4} gap="lg">
      <BentoCard colSpan={2} rowSpan={2} variant="gradient" gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
        <BentoCardHeader title="Hero" description="Main feature" />
        <p className="text-white/80">
          This is the main hero card that takes up significant space.
        </p>
      </BentoCard>
      <BentoCard>
        <BentoCardHeader title="Quick Stats" />
        <p className="text-2xl font-bold">42%</p>
      </BentoCard>
      <BentoCard>
        <BentoCardHeader title="Users" />
        <p className="text-2xl font-bold">1.2k</p>
      </BentoCard>
      <BentoCard colSpan={2}>
        <BentoCardHeader title="Recent Activity" />
        <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
          View all recent changes and updates
        </p>
      </BentoCard>
      <BentoCard>
        <BentoCardHeader title="Tasks" />
        <p className="text-2xl font-bold">7</p>
      </BentoCard>
      <BentoCard>
        <BentoCardHeader title="Messages" />
        <p className="text-2xl font-bold">3</p>
      </BentoCard>
    </BentoGrid>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark">
      <div className="bg-[hsl(var(--la-background))] p-4">
        <BentoGrid cols={2} gap="md">
          <BentoCard>
            <BentoCardHeader title="Dark Mode" description="Card in dark theme" />
          </BentoCard>
          <BentoCard variant="glass">
            <BentoCardHeader title="Glass Dark" description="Glassmorphism in dark" />
          </BentoCard>
        </BentoGrid>
      </div>
    </div>
  ),
};
