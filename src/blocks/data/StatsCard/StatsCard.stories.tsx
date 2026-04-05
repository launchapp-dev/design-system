import type { Meta, StoryObj } from "@storybook/react";
import { StatsCard } from "./StatsCard";

const meta: Meta<typeof StatsCard> = {
  title: "Blocks/Data/StatsCard",
  component: StatsCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof StatsCard>;

export const Default: Story = {
  args: {
    title: "Total Revenue",
    value: "$45,231.89",
    description: "Your total revenue this month",
  },
};

export const WithTrendUp: Story = {
  args: {
    title: "Active Users",
    value: "2,345",
    description: "Currently active on your platform",
    trend: {
      direction: "up",
      value: "+12.5%",
      label: "from last month",
    },
  },
};

export const WithTrendDown: Story = {
  args: {
    title: "Churn Rate",
    value: "2.4%",
    description: "Monthly customer churn rate",
    trend: {
      direction: "down",
      value: "+0.3%",
      label: "from last month",
    },
  },
};

export const WithTrendNeutral: Story = {
  args: {
    title: "Page Views",
    value: "12,234",
    description: "Total page views this week",
    trend: {
      direction: "neutral",
      value: "0%",
      label: "no change",
    },
  },
};

export const WithIcon: Story = {
  args: {
    title: "Sales",
    value: "+573",
    description: "Total sales this week",
    trend: {
      direction: "up",
      value: "+201",
      label: "from last week",
    },
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    ),
  },
};

export const HighlightVariant: Story = {
  args: {
    title: "MRR",
    value: "$24,500",
    description: "Monthly recurring revenue",
    trend: {
      direction: "up",
      value: "+8.2%",
      label: "from last month",
    },
    variant: "highlight",
  },
};

export const SubtleVariant: Story = {
  args: {
    title: "API Calls",
    value: "1.2M",
    description: "Total API calls today",
    trend: {
      direction: "up",
      value: "+5%",
      label: "from yesterday",
    },
    variant: "subtle",
  },
};

export const WithFooter: Story = {
  args: {
    title: "Storage Used",
    value: "78%",
    description: "750GB of 1TB used",
    trend: {
      direction: "up",
      value: "+12%",
      label: "from last week",
    },
    footer: (
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Upgrade available</span>
        <button className="font-medium text-primary hover:underline">
          View plans
        </button>
      </div>
    ),
  },
};
