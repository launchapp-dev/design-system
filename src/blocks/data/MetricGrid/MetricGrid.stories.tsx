import type { Meta, StoryObj } from "@storybook/react";
import { MetricGrid } from "./MetricGrid";
import type { Metric } from "./MetricGrid";

const meta: Meta<typeof MetricGrid> = {
  title: "Blocks/Data/MetricGrid",
  component: MetricGrid,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof MetricGrid>;

const sampleMetrics: Metric[] = [
  {
    id: "revenue",
    stats: {
      title: "Total Revenue",
      value: "$45,231.89",
      description: "Monthly revenue",
      trend: {
        direction: "up",
        value: "+20.1%",
        label: "from last month",
      },
    },
  },
  {
    id: "subscriptions",
    stats: {
      title: "Subscriptions",
      value: "+2,350",
      description: "Active subscriptions",
      trend: {
        direction: "up",
        value: "+180.1%",
        label: "from last month",
      },
    },
  },
  {
    id: "sales",
    stats: {
      title: "Sales",
      value: "+12,234",
      description: "Total sales",
      trend: {
        direction: "up",
        value: "+19%",
        label: "from last month",
      },
    },
  },
  {
    id: "active",
    stats: {
      title: "Active Now",
      value: "+573",
      description: "Currently online",
      trend: {
        direction: "up",
        value: "+201",
        label: "since last hour",
      },
    },
  },
];

export const Default: Story = {
  args: {
    metrics: sampleMetrics,
    columns: 4,
  },
};

export const ThreeColumns: Story = {
  args: {
    metrics: sampleMetrics.slice(0, 3),
    columns: 3,
  },
};

export const TwoColumns: Story = {
  args: {
    metrics: sampleMetrics.slice(0, 2),
    columns: 2,
  },
};

export const SixColumns: Story = {
  args: {
    metrics: [
      ...sampleMetrics,
      {
        id: "conversion",
        stats: {
          title: "Conversion",
          value: "3.2%",
          description: "Visit to purchase",
          trend: {
            direction: "up",
            value: "+0.5%",
            label: "from last week",
          },
        },
      },
      {
        id: "bounce",
        stats: {
          title: "Bounce Rate",
          value: "42%",
          description: "Single page visits",
          trend: {
            direction: "down",
            value: "-2%",
            label: "improvement",
          },
        },
      },
    ],
    columns: 6,
  },
};

export const LargeGap: Story = {
  args: {
    metrics: sampleMetrics,
    columns: 4,
    gap: "lg",
  },
};

export const SmallGap: Story = {
  args: {
    metrics: sampleMetrics,
    columns: 4,
    gap: "sm",
  },
};

export const WithIcons: Story = {
  args: {
    metrics: [
      {
        id: "revenue",
        stats: {
          title: "Revenue",
          value: "$45,231",
          trend: { direction: "up", value: "+20%", label: "vs last month" },
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
              <line x1="12" x2="12" y1="2" y2="22" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          ),
        },
      },
      {
        id: "users",
        stats: {
          title: "Users",
          value: "2,345",
          trend: { direction: "up", value: "+180", label: "new this month" },
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          ),
        },
      },
      {
        id: "orders",
        stats: {
          title: "Orders",
          value: "1,234",
          trend: { direction: "up", value: "+12%", label: "vs last week" },
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
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          ),
        },
      },
      {
        id: "growth",
        stats: {
          title: "Growth",
          value: "+28%",
          trend: { direction: "up", value: "+5%", label: "vs target" },
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
              <path d="m23 6-9.5 9.5-5-5L1 18" />
              <path d="M17 6h6v6" />
            </svg>
          ),
        },
      },
    ],
    columns: 4,
  },
};
