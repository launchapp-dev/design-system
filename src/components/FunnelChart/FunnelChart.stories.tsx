import type { Meta, StoryObj } from "@storybook/react";
import { FunnelChart } from "./FunnelChart";

const meta = {
  title: "Components/Data Visualization/FunnelChart",
  component: FunnelChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "outline", "filled"],
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    showConversionRate: {
      control: "boolean",
    },
    showPercentage: {
      control: "boolean",
    },
    height: {
      control: { type: "range", min: 200, max: 600, step: 50 },
    },
  },
} satisfies Meta<typeof FunnelChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const salesFunnelStages = [
  { label: "Visitors", value: 10000 },
  { label: "Sign Ups", value: 5000 },
  { label: "Activated", value: 2500 },
  { label: "Subscribed", value: 1000 },
  { label: "Retained", value: 750 },
];

const marketingFunnelStages = [
  { label: "Impressions", value: 100000, color: "hsl(var(--la-chart-1))" },
  { label: "Clicks", value: 15000, color: "hsl(var(--la-chart-2))" },
  { label: "Leads", value: 3000, color: "hsl(var(--la-chart-3))" },
  { label: "Opportunities", value: 800, color: "hsl(var(--la-chart-4))" },
  { label: "Closed", value: 200, color: "hsl(var(--la-chart-5))" },
];

export const Default: Story = {
  args: {
    stages: salesFunnelStages,
    height: 400,
    showConversionRate: true,
    showPercentage: true,
    orientation: "vertical",
  },
};

export const Horizontal: Story = {
  args: {
    stages: salesFunnelStages,
    height: 300,
    showConversionRate: true,
    showPercentage: true,
    orientation: "horizontal",
  },
};

export const CustomColors: Story = {
  args: {
    stages: marketingFunnelStages,
    height: 400,
    showConversionRate: true,
    showPercentage: true,
  },
};

export const Small: Story = {
  args: {
    stages: salesFunnelStages,
    size: "sm",
    height: 300,
  },
};

export const Large: Story = {
  args: {
    stages: salesFunnelStages,
    size: "lg",
    height: 500,
  },
};

export const Outline: Story = {
  args: {
    stages: salesFunnelStages,
    variant: "outline",
    height: 400,
  },
};

export const Filled: Story = {
  args: {
    stages: salesFunnelStages,
    variant: "filled",
    height: 400,
  },
};

export const WithoutConversionRate: Story = {
  args: {
    stages: salesFunnelStages,
    showConversionRate: false,
    height: 400,
  },
};

export const WithoutPercentage: Story = {
  args: {
    stages: salesFunnelStages,
    showPercentage: false,
    height: 400,
  },
};
