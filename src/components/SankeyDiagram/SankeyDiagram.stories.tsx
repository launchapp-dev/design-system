import type { Meta, StoryObj } from "@storybook/react";
import { SankeyDiagram } from "./SankeyDiagram";

const meta = {
  title: "Components/Data Visualization/SankeyDiagram",
  component: SankeyDiagram,
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
    showValues: {
      control: "boolean",
    },
    animated: {
      control: "boolean",
    },
    height: {
      control: { type: "range", min: 200, max: 800, step: 50 },
    },
    nodeWidth: {
      control: { type: "range", min: 10, max: 40, step: 5 },
    },
    nodePadding: {
      control: { type: "range", min: 10, max: 50, step: 5 },
    },
  },
} satisfies Meta<typeof SankeyDiagram>;

export default meta;
type Story = StoryObj<typeof meta>;

const energyFlowData = {
  nodes: [
    { name: "Coal" },
    { name: "Oil" },
    { name: "Natural Gas" },
    { name: "Nuclear" },
    { name: "Renewables" },
    { name: "Electricity" },
    { name: "Heat" },
    { name: "Transport" },
  ],
  links: [
    { source: 0, target: 5, value: 50 },
    { source: 1, target: 7, value: 70 },
    { source: 2, target: 5, value: 40 },
    { source: 2, target: 6, value: 30 },
    { source: 3, target: 5, value: 60 },
    { source: 4, target: 5, value: 45 },
    { source: 4, target: 6, value: 20 },
    { source: 5, target: 7, value: 55 },
    { source: 5, target: 6, value: 65 },
  ],
};

const userFlowData = {
  nodes: [
    { name: "Landing Page" },
    { name: "Sign Up" },
    { name: "Browse Products" },
    { name: "Add to Cart" },
    { name: "Checkout" },
    { name: "Purchase Complete" },
    { name: "Exit" },
  ],
  links: [
    { source: 0, target: 1, value: 100 },
    { source: 0, target: 2, value: 200 },
    { source: 0, target: 6, value: 150 },
    { source: 1, target: 2, value: 80 },
    { source: 2, target: 3, value: 150 },
    { source: 2, target: 6, value: 130 },
    { source: 3, target: 4, value: 120 },
    { source: 3, target: 6, value: 30 },
    { source: 4, target: 5, value: 100 },
    { source: 4, target: 6, value: 20 },
  ],
};

const budgetAllocationData = {
  nodes: [
    { name: "Revenue", color: "hsl(var(--la-chart-1))" },
    { name: "Operations", color: "hsl(var(--la-chart-2))" },
    { name: "Marketing", color: "hsl(var(--la-chart-3))" },
    { name: "R&D", color: "hsl(var(--la-chart-4))" },
    { name: "Salaries", color: "hsl(var(--la-chart-5))" },
    { name: "Infrastructure", color: "hsl(var(--la-chart-1))" },
    { name: "Ads", color: "hsl(var(--la-chart-2))" },
    { name: "Product", color: "hsl(var(--la-chart-3))" },
  ],
  links: [
    { source: 0, target: 1, value: 400 },
    { source: 0, target: 2, value: 200 },
    { source: 0, target: 3, value: 300 },
    { source: 1, target: 4, value: 250 },
    { source: 1, target: 5, value: 150 },
    { source: 2, target: 6, value: 180 },
    { source: 3, target: 7, value: 280 },
  ],
};

export const Default: Story = {
  args: {
    data: energyFlowData,
    height: 500,
    showLabels: true,
    showValues: true,
  },
};

export const UserFlow: Story = {
  args: {
    data: userFlowData,
    height: 600,
    showLabels: true,
    showValues: true,
  },
};

export const BudgetAllocation: Story = {
  args: {
    data: budgetAllocationData,
    height: 500,
    showLabels: true,
    showValues: true,
  },
};

export const Small: Story = {
  args: {
    data: energyFlowData,
    size: "sm",
    height: 400,
  },
};

export const Large: Story = {
  args: {
    data: energyFlowData,
    size: "lg",
    height: 600,
  },
};

export const WithoutLabels: Story = {
  args: {
    data: energyFlowData,
    showLabels: false,
    height: 500,
  },
};

export const WithoutAnimation: Story = {
  args: {
    data: energyFlowData,
    animated: false,
    height: 500,
  },
};

export const CustomNodeWidth: Story = {
  args: {
    data: energyFlowData,
    nodeWidth: 30,
    height: 500,
  },
};

export const TightPadding: Story = {
  args: {
    data: energyFlowData,
    nodePadding: 10,
    height: 500,
  },
};

export const WidePadding: Story = {
  args: {
    data: energyFlowData,
    nodePadding: 40,
    height: 600,
  },
};
