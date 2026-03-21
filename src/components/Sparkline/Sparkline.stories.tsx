import type { Meta, StoryObj } from "@storybook/react";
import { Sparkline } from "./Sparkline";

const meta = {
  title: "Components/Data Visualization/Sparkline",
  component: Sparkline,
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
      options: ["default", "primary", "success", "warning", "destructive"],
    },
    showArea: {
      control: "boolean",
    },
    animated: {
      control: "boolean",
    },
    strokeWidth: {
      control: { type: "range", min: 1, max: 4, step: 0.5 },
    },
    areaOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
    },
  },
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

const trendUp = [10, 15, 13, 17, 22, 24, 28, 30, 35, 40, 42, 45];
const trendDown = [45, 42, 40, 35, 30, 28, 24, 22, 17, 13, 15, 10];
const volatile = [20, 35, 25, 40, 30, 45, 35, 50, 40, 55, 45, 60];
const flat = [25, 26, 24, 25, 27, 26, 25, 24, 26, 25, 27, 26];

export const Default: Story = {
  args: {
    data: trendUp,
  },
};

export const TrendUp: Story = {
  args: {
    data: trendUp,
    variant: "success",
  },
};

export const TrendDown: Story = {
  args: {
    data: trendDown,
    variant: "destructive",
  },
};

export const Volatile: Story = {
  args: {
    data: volatile,
    variant: "warning",
  },
};

export const Flat: Story = {
  args: {
    data: flat,
    variant: "primary",
  },
};

export const Small: Story = {
  args: {
    data: trendUp,
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    data: trendUp,
    size: "md",
  },
};

export const Large: Story = {
  args: {
    data: trendUp,
    size: "lg",
  },
};

export const WithArea: Story = {
  args: {
    data: trendUp,
    showArea: true,
  },
};

export const AreaWithOpacity: Story = {
  args: {
    data: trendUp,
    showArea: true,
    areaOpacity: 0.3,
  },
};

export const CustomColor: Story = {
  args: {
    data: volatile,
    color: "hsl(280, 70%, 50%)",
  },
};

export const ThinStroke: Story = {
  args: {
    data: trendUp,
    strokeWidth: 1,
  },
};

export const ThickStroke: Story = {
  args: {
    data: trendUp,
    strokeWidth: 3,
  },
};

export const WithoutAnimation: Story = {
  args: {
    data: trendUp,
    animated: false,
  },
};

export const InlineUsage: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Revenue</span>
        <Sparkline data={trendUp} variant="success" size="sm" />
        <span className="text-xs text-success">+45%</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Users</span>
        <Sparkline data={volatile} variant="primary" size="sm" />
        <span className="text-xs text-muted-foreground">±5%</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Churn</span>
        <Sparkline data={trendDown} variant="destructive" size="sm" />
        <span className="text-xs text-destructive">-12%</span>
      </div>
    </div>
  ),
};

export const WithLabels: Story = {
  args: {
    data: [
      { value: 10, label: "Jan" },
      { value: 15, label: "Feb" },
      { value: 13, label: "Mar" },
      { value: 17, label: "Apr" },
      { value: 22, label: "May" },
    ],
  },
};
