import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { KPICard } from "./index";

const sparklineRevenue = [42000, 46000, 44000, 51000, 55000, 58000, 62000, 68000, 71000, 74000, 79000, 89600];
const sparklineChurn = [320, 290, 350, 310, 380, 420, 350, 280, 310, 270, 260, 240];
const sparklineConversion = [2.8, 3.1, 2.9, 3.4, 3.2, 3.0, 3.3, 3.1, 3.4, 3.2, 3.3, 3.24];

const meta: Meta<typeof KPICard> = {
  title: "Components/KPICard",
  component: KPICard,
  argTypes: {
    trend: {
      control: "select",
      options: ["up", "down", "neutral", undefined],
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof KPICard>;

export const Default: Story = {
  render: (args) => <KPICard {...args} className="w-64" />,
  args: {
    label: "Total Revenue",
    value: "$89,600",
    trend: "up",
    trendLabel: "+12.3% vs last month",
  },
};

export const WithSparkline: Story = {
  render: (args) => <KPICard {...args} className="w-72" />,
  args: {
    label: "Monthly Revenue",
    value: "$89,600",
    trend: "up",
    trendLabel: "+12.3% vs last month",
    sparklineData: sparklineRevenue,
    sparklineColor: "hsl(var(--ag-chart-1))",
  },
};

export const TrendDown: Story = {
  render: (args) => <KPICard {...args} className="w-72" />,
  args: {
    label: "User Churn",
    value: "240",
    trend: "down",
    trendLabel: "-9.1% vs last month",
    sparklineData: sparklineChurn,
    sparklineColor: "hsl(var(--ag-destructive))",
  },
};

export const TrendNeutral: Story = {
  render: (args) => <KPICard {...args} className="w-72" />,
  args: {
    label: "Conversion Rate",
    value: "3.24%",
    trend: "neutral",
    trendLabel: "+0.1% vs last month",
    sparklineData: sparklineConversion,
    sparklineColor: "hsl(var(--ag-chart-3))",
  },
};

export const NoTrend: Story = {
  render: (args) => <KPICard {...args} className="w-64" />,
  args: {
    label: "Total Users",
    value: "5,100",
  },
};
