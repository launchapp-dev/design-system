import type { Meta, StoryObj } from "@storybook/react";
import { Heatmap } from "./Heatmap";

const meta = {
  title: "Components/Data Visualization/Heatmap",
  component: Heatmap,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showValues: {
      control: "boolean",
    },
    cellWidth: {
      control: { type: "range", min: 20, max: 80, step: 5 },
    },
    cellHeight: {
      control: { type: "range", min: 20, max: 80, step: 5 },
    },
    height: {
      control: { type: "range", min: 200, max: 600, step: 50 },
    },
  },
} satisfies Meta<typeof Heatmap>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateHeatmapData = (xLabels: string[], yLabels: string[]) => {
  return xLabels.flatMap((x) =>
    yLabels.map((y) => ({
      x,
      y,
      value: Math.floor(Math.random() * 100),
    }))
  );
};

const xLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const yLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];

export const Default: Story = {
  args: {
    data: generateHeatmapData(xLabels, yLabels),
    xLabels,
    yLabels,
    showValues: true,
    cellWidth: 60,
    cellHeight: 40,
    height: 250,
  },
};

export const CustomColorScale: Story = {
  args: {
    data: generateHeatmapData(xLabels, yLabels),
    xLabels,
    yLabels,
    colorScale: (value) => {
      if (value < 30) return "hsl(var(--la-destructive))";
      if (value < 70) return "hsl(var(--la-primary))";
      return "hsl(var(--la-chart-2))";
    },
    showValues: true,
    cellWidth: 60,
    cellHeight: 40,
    height: 250,
  },
};

export const Small: Story = {
  args: {
    data: generateHeatmapData(xLabels, yLabels),
    xLabels,
    yLabels,
    size: "sm",
    cellWidth: 40,
    cellHeight: 30,
    height: 200,
  },
};

export const Large: Story = {
  args: {
    data: generateHeatmapData(xLabels, yLabels),
    xLabels,
    yLabels,
    size: "lg",
    cellWidth: 80,
    cellHeight: 50,
    height: 300,
  },
};

export const WithoutValues: Story = {
  args: {
    data: generateHeatmapData(xLabels, yLabels),
    xLabels,
    yLabels,
    showValues: false,
    cellWidth: 50,
    cellHeight: 50,
    height: 280,
  },
};

export const CustomFormat: Story = {
  args: {
    data: generateHeatmapData(xLabels, yLabels),
    xLabels,
    yLabels,
    formatValue: (v) => `${v}%`,
    showValues: true,
    cellWidth: 60,
    cellHeight: 40,
    height: 250,
  },
};

export const GradientScale: Story = {
  args: {
    data: generateHeatmapData(xLabels, yLabels),
    xLabels,
    yLabels,
    colorScale: (value) => {
      const hue = (value / 100) * 120;
      return `hsl(${hue}, 70%, 45%)`;
    },
    showValues: true,
    cellWidth: 60,
    cellHeight: 40,
    height: 250,
  },
};
