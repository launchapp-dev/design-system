import type { Meta, StoryObj } from "@storybook/react";
import { StatDisplay } from "./index";

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
    trendLabel: "+8.3% vs last month",
    sparklineData: [1200, 1480, 1720, 2100, 2450, 2890, 3200, 3580, 3940, 4320, 4710, 5100],
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
    label: "Avg. Order Value",
    value: "$148",
    trend: "down" as const,
    trendLabel: "-2.1% vs last month",
    sparklineData: [162, 158, 155, 161, 154, 150, 153, 148, 151, 146, 149, 148],
    sparklineColor: "hsl(var(--la-chart-4))",
  },
];

const meta: Meta<typeof StatDisplay> = {
  title: "Components/StatDisplay",
  component: StatDisplay,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof StatDisplay>;

export const Default: Story = {
  render: (args) => <StatDisplay {...args} />,
  args: {
    items: kpiItems,
    cols: 4,
  },
};

export const ThreeColumns: Story = {
  render: (args) => <StatDisplay {...args} />,
  args: {
    items: kpiItems.slice(0, 3),
    cols: 3,
  },
};

export const TwoColumns: Story = {
  render: (args) => <StatDisplay {...args} />,
  args: {
    items: kpiItems.slice(0, 2),
    cols: 2,
  },
};
