import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DashboardGrid } from "./index";
import type { DashboardWidget } from "./DashboardGrid";
import { Sparkline } from "../Sparkline";
import { Badge } from "../Badge";

const sampleWidgets: DashboardWidget[] = [
  {
    id: "revenue",
    title: "Total Revenue",
    size: "md",
    children: (
      <div>
        <div className="text-2xl font-bold text-card-foreground">$124,500</div>
        <div className="flex items-center gap-1 mt-1">
          <Badge variant="secondary" className="text-xs">
            +12.5%
          </Badge>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
        <div className="mt-2">
          <Sparkline
            data={[30, 45, 35, 50, 55, 60, 52, 70, 65, 80, 75, 90]}
            colorScheme="success"
            size="sm"
            showArea
          />
        </div>
      </div>
    ),
  },
  {
    id: "users",
    title: "Active Users",
    size: "md",
    children: (
      <div>
        <div className="text-2xl font-bold text-card-foreground">8,234</div>
        <div className="flex items-center gap-1 mt-1">
          <Badge variant="secondary" className="text-xs">
            +8.3%
          </Badge>
          <span className="text-xs text-muted-foreground">vs last week</span>
        </div>
        <div className="mt-2">
          <Sparkline
            data={[5000, 5200, 5800, 6200, 6800, 7200, 7500, 7900, 8234]}
            colorScheme="chart1"
            size="sm"
            showArea
          />
        </div>
      </div>
    ),
  },
  {
    id: "conversion",
    title: "Conversion Rate",
    size: "sm",
    children: (
      <div>
        <div className="text-2xl font-bold text-card-foreground">3.24%</div>
        <div className="text-xs text-muted-foreground mt-1">From 15,200 visitors</div>
      </div>
    ),
  },
  {
    id: "orders",
    title: "Orders",
    size: "sm",
    children: (
      <div>
        <div className="text-2xl font-bold text-card-foreground">1,847</div>
        <div className="text-xs text-destructive mt-1">-2.1% vs yesterday</div>
      </div>
    ),
  },
  {
    id: "chart",
    title: "Weekly Performance",
    size: "lg",
    children: (
      <div className="h-full">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
        <div className="flex items-end justify-between h-16 gap-1">
          {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-chart-1/80 rounded-t"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "notifications",
    title: "Recent Activity",
    size: "md",
    children: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-chart-3" />
          <span>New user signed up</span>
          <span className="text-muted-foreground ml-auto">2m ago</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-chart-1" />
          <span>Order #1234 completed</span>
          <span className="text-muted-foreground ml-auto">15m ago</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-chart-4" />
          <span>Payment received</span>
          <span className="text-muted-foreground ml-auto">1h ago</span>
        </div>
      </div>
    ),
  },
];

const meta: Meta<typeof DashboardGrid> = {
  title: "Components/DashboardGrid",
  component: DashboardGrid,
  argTypes: {
    columns: {
      control: "select",
      options: [1, 2, 3, 4],
    },
    editable: { control: "boolean" },
  },
  args: {
    columns: 3,
    editable: false,
    widgets: sampleWidgets,
  },
};

export default meta;
type Story = StoryObj<typeof DashboardGrid>;

export const Default: Story = {
  render: (args) => <DashboardGrid {...args} />,
};

export const Editable: Story = {
  render: (args) => {
    const [widgets, setWidgets] = React.useState(args.widgets);

    return (
      <div>
        <p className="text-sm text-muted-foreground mb-4">Drag widgets to reorder them</p>
        <DashboardGrid {...args} widgets={widgets} editable onReorder={setWidgets} />
      </div>
    );
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
  },
};

export const FourColumns: Story = {
  args: {
    columns: 4,
  },
};

export const SingleColumn: Story = {
  args: {
    columns: 1,
  },
};

export const WithOnReorder: Story = {
  render: (args) => {
    const [widgets, setWidgets] = React.useState(args.widgets);
    const [lastChange, setLastChange] = React.useState<string | null>(null);

    const handleReorder = (newWidgets: DashboardWidget[]) => {
      setWidgets(newWidgets);
      setLastChange(`Reordered: ${newWidgets.map((w) => w.title).join(" → ")}`);
    };

    return (
      <div>
        <DashboardGrid {...args} widgets={widgets} editable onReorder={handleReorder} />
        {lastChange && (
          <div className="mt-4 p-3 bg-muted rounded-[--la-radius] text-sm">{lastChange}</div>
        )}
      </div>
    );
  },
};

export const MinimalWidgets: Story = {
  args: {
    widgets: [
      {
        id: "widget-1",
        title: "Widget 1",
        children: <span>Simple content</span>,
      },
      {
        id: "widget-2",
        title: "Widget 2",
        children: <span>Another widget</span>,
      },
    ],
    columns: 2,
  },
};

export const MixedSizes: Story = {
  args: {
    widgets: [
      {
        id: "sm-1",
        title: "Small Widget 1",
        size: "sm",
        children: <div className="text-lg font-bold">42</div>,
      },
      {
        id: "sm-2",
        title: "Small Widget 2",
        size: "sm",
        children: <div className="text-lg font-bold">87</div>,
      },
      {
        id: "md-1",
        title: "Medium Widget",
        size: "md",
        children: <div>Medium sized content with more details</div>,
      },
      {
        id: "lg-1",
        title: "Large Widget",
        size: "lg",
        children: <div>Large widget spanning two columns with extensive content</div>,
      },
      {
        id: "sm-3",
        title: "Small Widget 3",
        size: "sm",
        children: <div className="text-lg font-bold">156</div>,
      },
    ],
    columns: 3,
  },
};

export const ManyWidgets: Story = {
  args: {
    widgets: Array.from({ length: 12 }, (_, i) => ({
      id: `widget-${i}`,
      title: `Widget ${i + 1}`,
      size: i % 4 === 0 ? "lg" : i % 2 === 0 ? "sm" : "md",
      children: <div>Content for widget {i + 1}</div>,
    })),
    columns: 4,
  },
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div className="p-6 bg-background rounded-lg">
      <DashboardGrid widgets={sampleWidgets} columns={3} />
    </div>
  ),
};

export const DarkModeEditable: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div className="p-6 bg-background rounded-lg">
      <DashboardGrid widgets={sampleWidgets} columns={3} editable />
    </div>
  ),
};
