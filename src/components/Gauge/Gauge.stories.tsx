import type { Meta, StoryObj } from "@storybook/react";
import { Gauge } from "./Gauge";

const meta = {
  title: "Components/Data Visualization/Gauge",
  component: Gauge,
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
      options: ["default", "success", "warning", "destructive"],
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    min: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    max: {
      control: { type: "range", min: 0, max: 200, step: 1 },
    },
    thickness: {
      control: { type: "range", min: 4, max: 20, step: 2 },
    },
    animated: {
      control: "boolean",
    },
    duration: {
      control: { type: "range", min: 200, max: 3000, step: 100 },
    },
  },
} satisfies Meta<typeof Gauge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 65,
    label: "Performance",
    showValue: true,
    unit: "%",
    animated: true,
    duration: 1000,
  },
};

export const LowValue: Story = {
  args: {
    value: 25,
    label: "Low",
    variant: "warning",
  },
};

export const HighValue: Story = {
  args: {
    value: 85,
    label: "High",
    variant: "success",
  },
};

export const CriticalValue: Story = {
  args: {
    value: 95,
    label: "Critical",
    variant: "destructive",
  },
};

export const Small: Story = {
  args: {
    value: 50,
    size: "sm",
    label: "Small",
  },
};

export const Large: Story = {
  args: {
    value: 75,
    size: "lg",
    label: "Large",
  },
};

export const CustomRange: Story = {
  args: {
    value: 150,
    min: 0,
    max: 200,
    label: "Speed",
    unit: " km/h",
  },
};

export const WithoutAnimation: Story = {
  args: {
    value: 60,
    label: "No Animation",
    animated: false,
  },
};

export const FastAnimation: Story = {
  args: {
    value: 70,
    label: "Fast",
    duration: 300,
  },
};

export const SlowAnimation: Story = {
  args: {
    value: 70,
    label: "Slow",
    duration: 2000,
  },
};

export const ThinGauge: Story = {
  args: {
    value: 55,
    label: "Thin",
    thickness: 6,
  },
};

export const ThickGauge: Story = {
  args: {
    value: 55,
    label: "Thick",
    thickness: 18,
  },
};

export const WithoutValue: Story = {
  args: {
    value: 45,
    showValue: false,
  },
};
