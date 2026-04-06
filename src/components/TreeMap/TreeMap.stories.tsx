import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TreeMap } from "./index";
import type { TreeMapNode } from "./TreeMap";

const simpleData: TreeMapNode[] = [
  { id: "1", name: "Products", value: 45000 },
  { id: "2", name: "Services", value: 32000 },
  { id: "3", name: "Subscriptions", value: 28000 },
  { id: "4", name: "Consulting", value: 18000 },
  { id: "5", name: "Training", value: 12000 },
];

const hierarchicalData: TreeMapNode[] = [
  {
    id: "1",
    name: "North America",
    value: 120000,
    children: [
      { id: "1-1", name: "USA", value: 85000 },
      { id: "1-2", name: "Canada", value: 25000 },
      { id: "1-3", name: "Mexico", value: 10000 },
    ],
  },
  {
    id: "2",
    name: "Europe",
    value: 95000,
    children: [
      { id: "2-1", name: "Germany", value: 35000 },
      { id: "2-2", name: "UK", value: 30000 },
      { id: "2-3", name: "France", value: 20000 },
      { id: "2-4", name: "Other", value: 10000 },
    ],
  },
  {
    id: "3",
    name: "Asia Pacific",
    value: 75000,
    children: [
      { id: "3-1", name: "Japan", value: 30000 },
      { id: "3-2", name: "China", value: 25000 },
      { id: "3-3", name: "Australia", value: 20000 },
    ],
  },
  {
    id: "4",
    name: "Other",
    value: 15000,
  },
];

const budgetData: TreeMapNode[] = [
  { id: "1", name: "Engineering", value: 350000 },
  { id: "2", name: "Marketing", value: 180000 },
  { id: "3", name: "Sales", value: 220000 },
  { id: "4", name: "Operations", value: 150000 },
  { id: "5", name: "HR", value: 80000 },
  { id: "6", name: "Finance", value: 65000 },
  { id: "7", name: "Legal", value: 45000 },
  { id: "8", name: "IT", value: 95000 },
];

const marketShareData: TreeMapNode[] = [
  { id: "1", name: "LaunchApp", value: 38, color: "hsl(var(--la-primary))" },
  { id: "2", name: "Competitor A", value: 27 },
  { id: "3", name: "Competitor B", value: 19 },
  { id: "4", name: "Competitor C", value: 11 },
  { id: "5", name: "Others", value: 5 },
];

const meta: Meta<typeof TreeMap> = {
  title: "Components/TreeMap",
  component: TreeMap,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    colorScheme: {
      control: "select",
      options: ["primary", "secondary", "chart", "diverging"],
    },
    showLabels: { control: "boolean" },
    showValues: { control: "boolean" },
  },
  args: {
    size: "md",
    colorScheme: "chart",
    showLabels: true,
    showValues: true,
    data: simpleData,
  },
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### Data Accessibility
- TreeMap has \`aria-label\` describing visualization
- Each rectangle has \`aria-label\` with name and value
- Hierarchical structure conveyed via aria-posinset/aria-setsize
- Provide data table alternative

### Keyboard Navigation
- Rectangles focusable via Tab
- Tooltips accessible on focus
- Drill-down navigation via keyboard if implemented

### Screen Reader Behavior
- TreeMap announced as hierarchical chart
- Category names and values announced
- Size relationships described in labels
- Parent-child relationships announced

### Visual Indicators
- Labels shown on rectangles if \`showLabels=true\`
- Values displayed if \`showValues=true\`
- Color coding indicates different categories or ranges
- Rectangle size proportional to data value

### Data Table Alternative
- Provide hierarchical data table
- Table shows name, parent, and value for each node
- Useful for understanding full data structure
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeMap>;

export const Default: Story = {
  render: (args) => <TreeMap {...args} />,
};

export const Hierarchical: Story = {
  args: {
    data: hierarchicalData,
    size: "lg",
  },
};

export const BudgetAllocation: Story = {
  args: {
    data: budgetData,
    colorScheme: "primary",
    size: "lg",
  },
};

export const MarketShare: Story = {
  args: {
    data: marketShareData,
    colorScheme: "chart",
  },
};

export const PrimaryColors: Story = {
  args: {
    data: simpleData,
    colorScheme: "primary",
  },
};

export const SecondaryColors: Story = {
  args: {
    data: simpleData,
    colorScheme: "secondary",
  },
};

export const DivergingColors: Story = {
  args: {
    data: budgetData,
    colorScheme: "diverging",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    data: simpleData,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    data: hierarchicalData,
  },
};

export const WithoutLabels: Story = {
  args: {
    showLabels: false,
    data: simpleData,
  },
};

export const WithoutValues: Story = {
  args: {
    showValues: false,
    data: simpleData,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<TreeMapNode | null>(null);

    return (
      <div>
        <TreeMap {...args} onNodeClick={(node) => setSelected(node)} />
        {selected && (
          <div className="mt-4 p-3 bg-muted rounded-[--la-radius] text-sm">
            Selected: <strong>{selected.name}</strong> - Value: {selected.value.toLocaleString()}
          </div>
        )}
      </div>
    );
  },
  args: {
    data: budgetData,
  },
};

export const CustomColors: Story = {
  args: {
    data: [
      { id: "1", name: "Revenue", value: 500, color: "hsl(150, 60%, 45%)" },
      { id: "2", name: "Expenses", value: 350, color: "hsl(0, 84%, 60%)" },
      { id: "3", name: "Profit", value: 150, color: "hsl(200, 80%, 50%)" },
    ],
  },
};

export const ManyNodes: Story = {
  args: {
    data: Array.from({ length: 20 }, (_, i) => ({
      id: `node-${i}`,
      name: `Category ${i + 1}`,
      value: Math.floor(Math.random() * 50000) + 5000,
    })),
    size: "lg",
    showLabels: false,
    showValues: false,
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div className="p-6 bg-background rounded-lg">
      <TreeMap data={budgetData} colorScheme="chart" />
    </div>
  ),
};
