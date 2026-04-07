import type { Meta, StoryObj } from "@storybook/react";
import { MetricsDashboard, type DashboardMetric } from "./MetricsDashboard";

const dollarIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const usersIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const activityIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const chartIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const sampleMetrics: DashboardMetric[] = [
  {
    id: "1",
    label: "Total Revenue",
    value: "$48,294",
    change: "+12.5%",
    changeType: "up",
    changeLabel: "vs last month",
    icon: dollarIcon,
    description: "Monthly recurring revenue",
    progress: 72,
    trend: [{ label: "Jan", value: 30 }, { label: "Feb", value: 45 }],
  },
  {
    id: "2",
    label: "Active Users",
    value: "12,847",
    change: "+8.2%",
    changeType: "up",
    changeLabel: "vs last month",
    icon: usersIcon,
    description: "DAU this week",
    progress: 85,
  },
  {
    id: "3",
    label: "Conversion Rate",
    value: "3.8%",
    change: "+0.4%",
    changeType: "up",
    changeLabel: "vs last month",
    icon: activityIcon,
    description: "Trial to paid",
  },
  {
    id: "4",
    label: "Avg. Resolution",
    value: "2.4h",
    change: "-15%",
    changeType: "down",
    changeLabel: "vs last month",
    icon: chartIcon,
    description: "Support tickets",
  },
];

const meta: Meta<typeof MetricsDashboard> = {
  title: "Blocks/Metrics/MetricsDashboard",
  component: MetricsDashboard,
  tags: ["autodocs"],
  argTypes: {
    columns: { control: "select", options: [1, 2, 3, 4] },
    showChange: { control: "boolean" },
    showProgress: { control: "boolean" },
    compact: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof MetricsDashboard>;

export const Default: Story = {
  args: {
    metrics: sampleMetrics,
    title: "Key Metrics",
    columns: 4,
    showChange: true,
  },
};

export const Compact: Story = {
  args: {
    metrics: sampleMetrics,
    columns: 4,
    compact: true,
  },
};

export const WithProgress: Story = {
  args: {
    metrics: sampleMetrics,
    title: "Performance Dashboard",
    columns: 2,
    showChange: true,
    showProgress: true,
  },
};

export const SingleColumn: Story = {
  args: {
    metrics: sampleMetrics,
    columns: 1,
    showChange: true,
  },
};