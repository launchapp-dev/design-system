import type { Meta, StoryObj } from "@storybook/react";
import { TreeMap } from "./TreeMap";

const meta = {
  title: "Components/Data Visualization/TreeMap",
  component: TreeMap,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showLabels: {
      control: "boolean",
    },
    animated: {
      control: "boolean",
    },
    height: {
      control: { type: "range", min: 200, max: 600, step: 50 },
    },
  },
} satisfies Meta<typeof TreeMap>;

export default meta;
type Story = StoryObj<typeof meta>;

const marketShareData = [
  { name: "Technology", value: 4000 },
  { name: "Healthcare", value: 3000 },
  { name: "Finance", value: 2000 },
  { name: "Retail", value: 1500 },
  { name: "Energy", value: 1200 },
  { name: "Manufacturing", value: 1000 },
];

const hierarchicalData = [
  {
    name: "North America",
    value: 5000,
    children: [
      { name: "USA", value: 3500 },
      { name: "Canada", value: 1000 },
      { name: "Mexico", value: 500 },
    ],
  },
  {
    name: "Europe",
    value: 4000,
    children: [
      { name: "Germany", value: 1500 },
      { name: "UK", value: 1200 },
      { name: "France", value: 800 },
      { name: "Others", value: 500 },
    ],
  },
  {
    name: "Asia",
    value: 6000,
    children: [
      { name: "China", value: 2500 },
      { name: "Japan", value: 1800 },
      { name: "India", value: 1200 },
      { name: "Others", value: 500 },
    ],
  },
];

const customColorData = [
  { name: "Product A", value: 5000, color: "hsl(var(--la-chart-1))" },
  { name: "Product B", value: 3500, color: "hsl(var(--la-chart-2))" },
  { name: "Product C", value: 2500, color: "hsl(var(--la-chart-3))" },
  { name: "Product D", value: 1800, color: "hsl(var(--la-chart-4))" },
  { name: "Product E", value: 1200, color: "hsl(var(--la-chart-5))" },
];

export const Default: Story = {
  args: {
    data: marketShareData,
    height: 400,
    showLabels: true,
  },
};

export const Hierarchical: Story = {
  args: {
    data: hierarchicalData,
    height: 400,
    showLabels: true,
  },
};

export const CustomColors: Story = {
  args: {
    data: customColorData,
    height: 400,
    colorScale: (value) => {
      if (value > 4000) return "hsl(var(--la-chart-1))";
      if (value > 2000) return "hsl(var(--la-chart-2))";
      return "hsl(var(--la-chart-3))";
    },
  },
};

export const Small: Story = {
  args: {
    data: marketShareData,
    size: "sm",
    height: 300,
  },
};

export const Large: Story = {
  args: {
    data: marketShareData,
    size: "lg",
    height: 500,
  },
};

export const WithoutLabels: Story = {
  args: {
    data: marketShareData,
    showLabels: false,
    height: 400,
  },
};

export const WithoutAnimation: Story = {
  args: {
    data: marketShareData,
    animated: false,
    height: 400,
  },
};

export const GradientColorScale: Story = {
  args: {
    data: marketShareData,
    height: 400,
    colorScale: (value) => {
      const maxValue = 4000;
      const normalized = value / maxValue;
      const hue = normalized * 120;
      return `hsl(${hue}, 70%, 50%)`;
    },
  },
};

export const WithAspectRatio: Story = {
  args: {
    data: marketShareData,
    height: 400,
    aspectRatio: 16 / 9,
  },
};
