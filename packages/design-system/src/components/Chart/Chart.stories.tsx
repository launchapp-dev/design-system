import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AreaChart,
  BarChart,
  ChartContainer,
  LineChart,
  PieChart,
  CHART_COLORS,
} from "./index";

const monthlyData = [
  { month: "Jan", revenue: 45200, expenses: 31000 },
  { month: "Feb", revenue: 52400, expenses: 33200 },
  { month: "Mar", revenue: 48800, expenses: 29800 },
  { month: "Apr", revenue: 61200, expenses: 35100 },
  { month: "May", revenue: 58700, expenses: 34600 },
  { month: "Jun", revenue: 67300, expenses: 38900 },
  { month: "Jul", revenue: 72100, expenses: 41200 },
  { month: "Aug", revenue: 68900, expenses: 39700 },
  { month: "Sep", revenue: 74500, expenses: 42300 },
  { month: "Oct", revenue: 81200, expenses: 44800 },
  { month: "Nov", revenue: 79400, expenses: 43100 },
  { month: "Dec", revenue: 89600, expenses: 48200 },
];

const categoryData = [
  { category: "Products", q1: 24000, q2: 31000, q3: 28500, q4: 36200 },
  { category: "Services", q1: 18500, q2: 22400, q3: 25100, q4: 29800 },
  { category: "Subscriptions", q1: 14200, q2: 16800, q3: 19400, q4: 23100 },
  { category: "Consulting", q1: 9800, q2: 12300, q3: 11600, q4: 14900 },
];

const userGrowthData = [
  { month: "Jan", users: 1200, churn: 180 },
  { month: "Feb", users: 1480, churn: 210 },
  { month: "Mar", users: 1720, churn: 190 },
  { month: "Apr", users: 2100, churn: 240 },
  { month: "May", users: 2450, churn: 280 },
  { month: "Jun", users: 2890, churn: 320 },
  { month: "Jul", users: 3200, churn: 350 },
  { month: "Aug", users: 3580, churn: 310 },
  { month: "Sep", users: 3940, churn: 290 },
  { month: "Oct", users: 4320, churn: 380 },
  { month: "Nov", users: 4710, churn: 420 },
  { month: "Dec", users: 5100, churn: 390 },
];

const marketShareData = [
  { name: "LaunchApp", value: 38 },
  { name: "Competitor A", value: 27 },
  { name: "Competitor B", value: 19 },
  { name: "Others", value: 16 },
];

const tooltipStyle = {
  backgroundColor: "hsl(var(--la-card))",
  border: "1px solid hsl(var(--la-border))",
  borderRadius: "var(--la-radius)",
  color: "hsl(var(--la-card-foreground))",
  fontSize: 12,
};

const meta: Meta<typeof ChartContainer> = {
  title: "Components/Chart",
  component: ChartContainer,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ChartContainer>;

export const LineChartStory: Story = {
  name: "LineChart",
  render: () => (
    <ChartContainer
      config={{
        revenue: { label: "Revenue", color: "hsl(var(--la-chart-1))" },
        expenses: { label: "Expenses", color: "hsl(var(--la-chart-2))" },
      }}
      height={300}
      className="max-w-2xl"
    >
      <LineChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--la-border))" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--la-muted-foreground))" tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--la-muted-foreground))" tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="expenses" stroke="var(--color-expenses)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  ),
};

export const BarChartStory: Story = {
  name: "BarChart",
  render: () => (
    <ChartContainer
      config={{
        q1: { label: "Q1", color: "hsl(var(--la-chart-1))" },
        q2: { label: "Q2", color: "hsl(var(--la-chart-2))" },
        q3: { label: "Q3", color: "hsl(var(--la-chart-3))" },
        q4: { label: "Q4", color: "hsl(var(--la-chart-4))" },
      }}
      height={300}
      className="max-w-2xl"
    >
      <BarChart data={categoryData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--la-border))" vertical={false} />
        <XAxis dataKey="category" tick={{ fontSize: 12 }} stroke="hsl(var(--la-muted-foreground))" tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--la-muted-foreground))" tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend />
        <Bar dataKey="q1" fill="var(--color-q1)" radius={[2, 2, 0, 0]} />
        <Bar dataKey="q2" fill="var(--color-q2)" radius={[2, 2, 0, 0]} />
        <Bar dataKey="q3" fill="var(--color-q3)" radius={[2, 2, 0, 0]} />
        <Bar dataKey="q4" fill="var(--color-q4)" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ChartContainer>
  ),
};

export const AreaChartStory: Story = {
  name: "AreaChart",
  render: () => (
    <ChartContainer
      config={{
        users: { label: "New Users", color: "hsl(var(--la-chart-1))" },
        churn: { label: "Churned Users", color: "hsl(var(--la-chart-5))" },
      }}
      height={300}
      className="max-w-2xl"
    >
      <AreaChart data={userGrowthData}>
        <defs>
          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.2} />
            <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-churn)" stopOpacity={0.2} />
            <stop offset="95%" stopColor="var(--color-churn)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--la-border))" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--la-muted-foreground))" tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--la-muted-foreground))" tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend />
        <Area type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} fill="url(#colorUsers)" />
        <Area type="monotone" dataKey="churn" stroke="var(--color-churn)" strokeWidth={2} fill="url(#colorChurn)" />
      </AreaChart>
    </ChartContainer>
  ),
};

export const PieChartStory: Story = {
  name: "PieChart",
  render: () => (
    <ChartContainer height={300} className="max-w-md">
      <PieChart>
        <Pie
          data={marketShareData}
          cx="50%"
          cy="50%"
          outerRadius={110}
          dataKey="value"
          label={({ name, value }: { name: string; value: number }) => `${name}: ${value}%`}
          labelLine={false}
        >
          {marketShareData.map((_, index) => (
            <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}%`]} />
        <Legend />
      </PieChart>
    </ChartContainer>
  ),
};
