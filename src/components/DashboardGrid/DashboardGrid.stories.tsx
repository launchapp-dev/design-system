import type { Meta, StoryObj } from "@storybook/react";
import { DashboardGrid, DashboardWidget } from "./DashboardGrid";
import { Sparkline } from "@/components/Sparkline";
import { Gauge } from "@/components/Gauge";

const meta = {
  title: "Components/Dashboard/DashboardGrid",
  component: DashboardGrid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    cols: {
      control: "select",
      options: [1, 2, 3, 4],
    },
    draggable: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof DashboardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleWidgets: DashboardWidget[] = [
  {
    id: "widget-1",
    title: "Revenue Trend",
    size: "md",
    content: (
      <div className="space-y-2">
        <div className="text-2xl font-bold">$45,231</div>
        <Sparkline
          data={[10, 15, 13, 17, 22, 24, 28, 30, 35, 40, 42, 45]}
          variant="success"
          showArea
        />
        <div className="text-xs text-muted-foreground">+20.1% from last month</div>
      </div>
    ),
  },
  {
    id: "widget-2",
    title: "Active Users",
    size: "md",
    content: (
      <div className="space-y-2">
        <div className="text-2xl font-bold">2,350</div>
        <Sparkline data={[20, 35, 25, 40, 30, 45, 35, 50, 40, 55, 45, 60]} variant="primary" />
        <div className="text-xs text-muted-foreground">+180 new today</div>
      </div>
    ),
  },
  {
    id: "widget-3",
    title: "Performance Score",
    size: "md",
    content: (
      <div className="flex items-center justify-center">
        <Gauge value={78} label="Score" variant="success" />
      </div>
    ),
  },
  {
    id: "widget-4",
    title: "Conversion Rate",
    size: "md",
    content: (
      <div className="space-y-2">
        <div className="text-2xl font-bold">3.2%</div>
        <Sparkline data={[45, 42, 40, 35, 30, 28, 24, 22, 17, 13, 15, 10]} variant="destructive" />
        <div className="text-xs text-destructive">-5.2% from last week</div>
      </div>
    ),
  },
  {
    id: "widget-5",
    title: "Server Health",
    size: "lg",
    content: (
      <div className="space-y-4">
        <div className="flex justify-around">
          <div className="text-center">
            <Gauge value={95} size="sm" variant="success" />
            <div className="text-xs text-muted-foreground mt-1">CPU</div>
          </div>
          <div className="text-center">
            <Gauge value={72} size="sm" variant="primary" />
            <div className="text-xs text-muted-foreground mt-1">Memory</div>
          </div>
          <div className="text-center">
            <Gauge value={45} size="sm" variant="warning" />
            <div className="text-xs text-muted-foreground mt-1">Disk</div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground text-center">
          All systems operational
        </div>
      </div>
    ),
  },
  {
    id: "widget-6",
    title: "Quick Stats",
    size: "md",
    content: (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-2xl font-bold">1,234</div>
          <div className="text-xs text-muted-foreground">Orders</div>
        </div>
        <div>
          <div className="text-2xl font-bold">$89K</div>
          <div className="text-xs text-muted-foreground">Revenue</div>
        </div>
        <div>
          <div className="text-2xl font-bold">567</div>
          <div className="text-xs text-muted-foreground">Customers</div>
        </div>
        <div>
          <div className="text-2xl font-bold">4.8★</div>
          <div className="text-xs text-muted-foreground">Rating</div>
        </div>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    widgets: sampleWidgets,
    cols: 3,
    draggable: true,
  },
};

export const OneColumn: Story = {
  args: {
    widgets: sampleWidgets.slice(0, 3),
    cols: 1,
    draggable: true,
  },
};

export const TwoColumns: Story = {
  args: {
    widgets: sampleWidgets.slice(0, 4),
    cols: 2,
    draggable: true,
  },
};

export const FourColumns: Story = {
  args: {
    widgets: sampleWidgets,
    cols: 4,
    draggable: true,
  },
};

export const NonDraggable: Story = {
  args: {
    widgets: sampleWidgets.slice(0, 4),
    cols: 2,
    draggable: false,
  },
};

export const WithReorderCallback: Story = {
  args: {
    widgets: sampleWidgets,
    cols: 3,
    draggable: true,
    onReorder: (widgets) => console.log("Reordered widgets:", widgets),
  },
};

export const MixedSizes: Story = {
  args: {
    widgets: [
      { ...sampleWidgets[0], size: "lg" as const },
      { ...sampleWidgets[1], size: "sm" as const },
      { ...sampleWidgets[2], size: "sm" as const },
      { ...sampleWidgets[3], size: "md" as const },
      { ...sampleWidgets[4], size: "lg" as const },
    ],
    cols: 3,
    draggable: true,
  },
};
