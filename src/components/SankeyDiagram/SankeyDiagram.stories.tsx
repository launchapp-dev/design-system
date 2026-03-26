import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SankeyDiagram } from "./index";
import type { SankeyNode, SankeyLink } from "./SankeyDiagram";

const simpleNodes: SankeyNode[] = [
  { id: "a", name: "Source A" },
  { id: "b", name: "Source B" },
  { id: "c", name: "Target C" },
  { id: "d", name: "Target D" },
];

const simpleLinks: SankeyLink[] = [
  { source: "a", target: "c", value: 10 },
  { source: "a", target: "d", value: 5 },
  { source: "b", target: "c", value: 8 },
  { source: "b", target: "d", value: 12 },
];

const revenueNodes: SankeyNode[] = [
  { id: "products", name: "Products", color: "hsl(var(--la-chart-1))" },
  { id: "services", name: "Services", color: "hsl(var(--la-chart-2))" },
  { id: "subscriptions", name: "Subscriptions", color: "hsl(var(--la-chart-3))" },
  { id: "marketing", name: "Marketing", color: "hsl(var(--la-chart-4))" },
  { id: "sales", name: "Sales", color: "hsl(var(--la-chart-5))" },
  { id: "revenue", name: "Revenue", color: "hsl(var(--la-primary))" },
  { id: "costs", name: "Costs", color: "hsl(var(--la-destructive))" },
];

const revenueLinks: SankeyLink[] = [
  { source: "products", target: "revenue", value: 45000 },
  { source: "services", target: "revenue", value: 32000 },
  { source: "subscriptions", target: "revenue", value: 28000 },
  { source: "marketing", target: "costs", value: 18000 },
  { source: "sales", target: "costs", value: 22000 },
];

const energyNodes: SankeyNode[] = [
  { id: "coal", name: "Coal" },
  { id: "gas", name: "Natural Gas" },
  { id: "oil", name: "Oil" },
  { id: "nuclear", name: "Nuclear" },
  { id: "hydro", name: "Hydro" },
  { id: "solar", name: "Solar" },
  { id: "wind", name: "Wind" },
  { id: "residential", name: "Residential" },
  { id: "commercial", name: "Commercial" },
  { id: "industrial", name: "Industrial" },
  { id: "transport", name: "Transport" },
];

const energyLinks: SankeyLink[] = [
  { source: "coal", target: "residential", value: 15 },
  { source: "coal", target: "commercial", value: 20 },
  { source: "coal", target: "industrial", value: 35 },
  { source: "gas", target: "residential", value: 25 },
  { source: "gas", target: "commercial", value: 30 },
  { source: "gas", target: "industrial", value: 20 },
  { source: "oil", target: "transport", value: 60 },
  { source: "oil", target: "industrial", value: 15 },
  { source: "nuclear", target: "commercial", value: 18 },
  { source: "nuclear", target: "industrial", value: 22 },
  { source: "hydro", target: "residential", value: 12 },
  { source: "hydro", target: "commercial", value: 15 },
  { source: "solar", target: "residential", value: 8 },
  { source: "solar", target: "commercial", value: 5 },
  { source: "wind", target: "commercial", value: 10 },
  { source: "wind", target: "industrial", value: 8 },
];

const userFlowNodes: SankeyNode[] = [
  { id: "visitors", name: "Visitors" },
  { id: "signups", name: "Sign Ups" },
  { id: "activated", name: "Activated" },
  { id: "retained", name: "Retained" },
  { id: "churned", name: "Churned" },
  { id: "bounced", name: "Bounced" },
];

const userFlowLinks: SankeyLink[] = [
  { source: "visitors", target: "signups", value: 1000 },
  { source: "visitors", target: "bounced", value: 4000 },
  { source: "signups", target: "activated", value: 700 },
  { source: "signups", target: "churned", value: 300 },
  { source: "activated", target: "retained", value: 500 },
  { source: "activated", target: "churned", value: 200 },
];

const meta: Meta<typeof SankeyDiagram> = {
  title: "Components/SankeyDiagram",
  component: SankeyDiagram,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showLabels: { control: "boolean" },
    showValues: { control: "boolean" },
    nodeWidth: { control: { type: "range", min: 8, max: 32, step: 2 } },
    nodePadding: { control: { type: "range", min: 4, max: 24, step: 2 } },
  },
  args: {
    size: "md",
    showLabels: true,
    showValues: true,
    nodeWidth: 16,
    nodePadding: 12,
    nodes: simpleNodes,
    links: simpleLinks,
  },
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### Data Accessibility
- Diagram should include \`aria-label\` describing data flow
- Node labels announced by screen readers
- Flow values announced for links
- Provide data table alternative

### Keyboard Navigation
- Nodes and links focusable via Tab
- Tooltips accessible on focus
- No special key handling required

### Screen Reader Behavior
- Sankey announced as diagram or chart
- Source and target nodes announced
- Flow values announced for each link
- Labels announced when available

### Visual Indicators
- Labels shown on nodes if \`showLabels=true\`
- Values shown on links if \`showValues=true\`
- Color coding indicates different data categories
- Width proportional to flow magnitude

### Data Table Alternative
- Provide table showing all nodes and links
- Table includes source, target, and value
- Useful for screen reader users to understand full dataset
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SankeyDiagram>;

export const Default: Story = {
  render: (args) => <SankeyDiagram {...args} />,
};

export const RevenueFlow: Story = {
  args: {
    nodes: revenueNodes,
    links: revenueLinks,
    size: "lg",
  },
};

export const EnergyFlow: Story = {
  args: {
    nodes: energyNodes,
    links: energyLinks,
    size: "lg",
  },
};

export const UserFlow: Story = {
  args: {
    nodes: userFlowNodes,
    links: userFlowLinks,
    size: "lg",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    nodes: simpleNodes,
    links: simpleLinks,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    nodes: energyNodes,
    links: energyLinks,
  },
};

export const WithoutLabels: Story = {
  args: {
    showLabels: false,
    nodes: simpleNodes,
    links: simpleLinks,
  },
};

export const WithoutValues: Story = {
  args: {
    showValues: false,
    nodes: simpleNodes,
    links: simpleLinks,
  },
};

export const InteractiveNodes: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<SankeyNode | null>(null);
    
    return (
      <div>
        <SankeyDiagram
          {...args}
          onNodeClick={(node) => setSelected(node)}
        />
        {selected && (
          <div className="mt-4 p-3 bg-muted rounded-[--la-radius] text-sm">
            Selected node: <strong>{selected.name}</strong>
          </div>
        )}
      </div>
    );
  },
  args: {
    nodes: revenueNodes,
    links: revenueLinks,
  },
};

export const InteractiveLinks: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<SankeyLink | null>(null);
    
    return (
      <div>
        <SankeyDiagram
          {...args}
          onLinkClick={(link) => setSelected(link)}
        />
        {selected && (
          <div className="mt-4 p-3 bg-muted rounded-[--la-radius] text-sm">
            Selected link: <strong>{selected.source}</strong> to <strong>{selected.target}</strong> - Value: {selected.value.toLocaleString()}
          </div>
        )}
      </div>
    );
  },
  args: {
    nodes: revenueNodes,
    links: revenueLinks,
  },
};

export const CustomNodeWidth: Story = {
  args: {
    nodeWidth: 24,
    nodes: simpleNodes,
    links: simpleLinks,
  },
};

export const CompactPadding: Story = {
  args: {
    nodePadding: 6,
    nodes: energyNodes,
    links: energyLinks,
    size: "lg",
  },
};

export const Empty: Story = {
  args: {
    nodes: [],
    links: [],
  },
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div className="p-6 bg-background rounded-lg">
      <SankeyDiagram nodes={revenueNodes} links={revenueLinks} />
    </div>
  ),
};
