import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { StatsOverview } from "./StatsOverview";

const kpiItems = [
  {
    label: "Total Revenue",
    value: "$89,600",
    trend: "up" as const,
    trendLabel: "+12.3% vs last month",
    sparklineData: [42000, 46000, 44000, 51000, 55000, 58000, 62000, 68000, 71000, 74000, 79000, 89600],
    sparklineColor: "hsl(var(--la-chart-1))",
  },
  {
    label: "Active Users",
    value: "5,100",
    trend: "up" as const,
    trendLabel: "+4.7% vs last month",
    sparklineData: [3800, 3900, 4100, 4000, 4300, 4500, 4600, 4800, 4900, 5000, 5050, 5100],
    sparklineColor: "hsl(var(--la-chart-2))",
  },
  {
    label: "Conversion Rate",
    value: "3.24%",
    trend: "neutral" as const,
    trendLabel: "+0.1% vs last month",
    sparklineData: [2.8, 3.1, 2.9, 3.4, 3.2, 3.0, 3.3, 3.1, 3.4, 3.2, 3.3, 3.24],
    sparklineColor: "hsl(var(--la-chart-3))",
  },
  {
    label: "User Churn",
    value: "240",
    trend: "down" as const,
    trendLabel: "-9.1% vs last month",
    sparklineData: [320, 290, 350, 310, 380, 420, 350, 280, 310, 270, 260, 240],
    sparklineColor: "hsl(var(--la-destructive))",
  },
];

const trendChartData = [
  { label: "Jan", revenue: 42000, users: 3800 },
  { label: "Feb", revenue: 46000, users: 3900 },
  { label: "Mar", revenue: 44000, users: 4100 },
  { label: "Apr", revenue: 51000, users: 4000 },
  { label: "May", revenue: 55000, users: 4300 },
  { label: "Jun", revenue: 58000, users: 4500 },
  { label: "Jul", revenue: 62000, users: 4600 },
  { label: "Aug", revenue: 68000, users: 4800 },
  { label: "Sep", revenue: 71000, users: 4900 },
  { label: "Oct", revenue: 74000, users: 5000 },
  { label: "Nov", revenue: 79000, users: 5050 },
  { label: "Dec", revenue: 89600, users: 5100 },
];

const meta: Meta<typeof StatsOverview> = {
  title: "Blocks/Dashboard/StatsOverview",
  component: StatsOverview,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { StatsOverview } from "@launchapp/design-system/blocks/dashboard";

const items = [
  { title: "Total Revenue", value: "$45,231", trend: "up", trendValue: "+20.1%" },
  { title: "Subscriptions", value: "+2350", trend: "up", trendValue: "+180.1%" },
  { title: "Sales", value: "+12,234", trend: "up", trendValue: "+19%" },
  { title: "Active Now", value: "+573", trend: "up", trendValue: "+201" },
];

export default function Page() {
  return (
    <StatsOverview
      title="Overview"
      description="Your business performance at a glance."
      items={items}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatsOverview>;

export const Default: Story = {
  args: {
    items: kpiItems,
    cols: 4,
  },
};

export const WithTitleAndChart: Story = {
  args: {
    title: "Performance Overview",
    description: "Key metrics for the current period",
    items: kpiItems,
    cols: 4,
    chartData: trendChartData,
    chartKeys: [
      { key: "revenue", color: "hsl(var(--la-chart-1))" },
      { key: "users", color: "hsl(var(--la-chart-2))" },
    ],
  },
};

export const TwoColumns: Story = {
  args: {
    title: "Summary",
    items: kpiItems.slice(0, 2),
    cols: 2,
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "24px" }}>
      <StatsOverview {...args} />
    </div>
  ),
  args: {
    title: "Performance Overview",
    description: "Key metrics for the current period",
    items: kpiItems,
    cols: 4,
    chartData: trendChartData,
    chartKeys: [
      { key: "revenue", color: "hsl(var(--la-chart-1))" },
      { key: "users", color: "hsl(var(--la-chart-2))" },
    ],
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    title: "Performance Overview",
    description: "Key metrics for the current period",
    items: kpiItems,
    cols: 4,
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  args: {
    title: "Performance Overview",
    description: "Key metrics for the current period",
    items: kpiItems,
    cols: 4,
    chartData: trendChartData,
    chartKeys: [
      { key: "revenue", color: "hsl(var(--la-chart-1))" },
      { key: "users", color: "hsl(var(--la-chart-2))" },
    ],
  },
};
