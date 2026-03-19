import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MetricCards } from "./MetricCards";
import type { MetricCardItem } from "./MetricCards";

const mockItems: MetricCardItem[] = [
  {
    id: "dau",
    label: "Daily Active Users",
    value: "12,480",
    trend: "up",
    trendValue: "+8.2%",
    sparklineData: [9200, 9800, 10100, 10400, 10900, 11200, 11600, 11900, 12100, 12200, 12350, 12480],
    sparklineColor: "hsl(var(--ag-chart-1))",
  },
  {
    id: "mrr",
    label: "Monthly Recurring Revenue",
    value: "$148,200",
    trend: "up",
    trendValue: "+5.4%",
    sparklineData: [128000, 130000, 132000, 134000, 136000, 138000, 140000, 142000, 143500, 145000, 146800, 148200],
    sparklineColor: "hsl(var(--ag-chart-2))",
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: "1.8%",
    trend: "down",
    trendValue: "-0.3%",
    sparklineData: [2.4, 2.5, 2.3, 2.6, 2.4, 2.2, 2.1, 2.0, 2.1, 1.9, 1.85, 1.8],
    sparklineColor: "hsl(var(--ag-destructive))",
  },
  {
    id: "nps",
    label: "Net Promoter Score",
    value: "72",
    trend: "neutral",
    trendValue: "±0",
    sparklineData: [68, 70, 71, 69, 70, 72, 73, 71, 72, 71, 72, 72],
    sparklineColor: "hsl(var(--ag-chart-3))",
  },
];

const meta: Meta<typeof MetricCards> = {
  title: "Blocks/Dashboard/MetricCards",
  component: MetricCards,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof MetricCards>;

export const Default: Story = {
  args: {
    items: mockItems,
  },
};

export const TwoItems: Story = {
  args: {
    items: mockItems.slice(0, 2),
  },
};

export const NoSparklines: Story = {
  args: {
    items: mockItems.map(({ sparklineData: _, sparklineColor: __, ...rest }) => rest),
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "24px" }}>
      <MetricCards {...args} />
    </div>
  ),
  args: {
    items: mockItems,
  },
};
