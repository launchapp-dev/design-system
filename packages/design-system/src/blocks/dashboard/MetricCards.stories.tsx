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
    sparklineColor: "hsl(var(--la-chart-1))",
  },
  {
    id: "mrr",
    label: "Monthly Recurring Revenue",
    value: "$148,200",
    trend: "up",
    trendValue: "+5.4%",
    sparklineData: [128000, 130000, 132000, 134000, 136000, 138000, 140000, 142000, 143500, 145000, 146800, 148200],
    sparklineColor: "hsl(var(--la-chart-2))",
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: "1.8%",
    trend: "down",
    trendValue: "-0.3%",
    sparklineData: [2.4, 2.5, 2.3, 2.6, 2.4, 2.2, 2.1, 2.0, 2.1, 1.9, 1.85, 1.8],
    sparklineColor: "hsl(var(--la-destructive))",
  },
  {
    id: "nps",
    label: "Net Promoter Score",
    value: "72",
    trend: "neutral",
    trendValue: "±0",
    sparklineData: [68, 70, 71, 69, 70, 72, 73, 71, 72, 71, 72, 72],
    sparklineColor: "hsl(var(--la-chart-3))",
  },
];

const meta: Meta<typeof MetricCards> = {
  title: "Blocks/Dashboard/MetricCards",
  component: MetricCards,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { MetricCards } from "@launchapp/design-system/blocks";

const items = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$45,231",
    trend: "up",
    trendValue: "+20.1%",
    sparklineData: [30, 40, 35, 50, 49, 60, 70],
  },
  {
    id: "users",
    label: "Active Users",
    value: "2,350",
    trend: "up",
    trendValue: "+15.3%",
    sparklineData: [20, 30, 25, 40, 35, 45, 50],
  },
];

export default function Page() {
  return <MetricCards items={items} />;
}`,
      },
    },
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

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    items: mockItems,
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  args: {
    items: mockItems,
  },
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  args: { items: mockItems },
  parameters: {
    docs: {
      description: {
        story:
          "MetricCards is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Card, CardContent,
  ChartContainer,
} from "@launchapp/design-system";

// MetricCards renders a responsive grid of KPI cards.
// Each card uses:
// – Card + CardContent for the container
// – ChartContainer + LineChart (recharts) for the sparkline
// – Trend icon (TrendingUp/TrendingDown/Minus) coloured by trend direction
export function MetricCards({ items = [], cols = 4 }) {
  return (
    <div className={\`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-\${cols}\`}>
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
                {item.trendValue && (
                  <p className={item.trend === "up" ? "text-xs text-emerald-600" : item.trend === "down" ? "text-xs text-destructive" : "text-xs text-muted-foreground"}>
                    {item.trendValue}
                  </p>
                )}
              </div>
            </div>
            {item.sparklineData && (
              <ChartContainer config={{}}>
                {/* LineChart with sparklineData and sparklineColor */}
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}`,
      },
    },
  },
};
