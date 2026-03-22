import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Heatmap } from "./index";
import type { HeatmapCell } from "./Heatmap";

const generateMatrixData = (
  rows: number,
  cols: number,
  min: number,
  max: number
): HeatmapCell[][] => {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => ({
      value: Math.floor(Math.random() * (max - min + 1)) + min,
      label: `R${rowIndex + 1}C${colIndex + 1}`,
      rowLabel: `Row ${rowIndex + 1}`,
      colLabel: `Col ${colIndex + 1}`,
    }))
  );
};

const weeklyActivityData: HeatmapCell[][] = [
  [
    { value: 2, label: "Mon 8AM", rowLabel: "Monday", colLabel: "8AM" },
    { value: 5, label: "Mon 12PM", rowLabel: "Monday", colLabel: "12PM" },
    { value: 8, label: "Mon 4PM", rowLabel: "Monday", colLabel: "4PM" },
    { value: 3, label: "Mon 8PM", rowLabel: "Monday", colLabel: "8PM" },
  ],
  [
    { value: 4, label: "Tue 8AM", rowLabel: "Tuesday", colLabel: "8AM" },
    { value: 7, label: "Tue 12PM", rowLabel: "Tuesday", colLabel: "12PM" },
    { value: 9, label: "Tue 4PM", rowLabel: "Tuesday", colLabel: "4PM" },
    { value: 5, label: "Tue 8PM", rowLabel: "Tuesday", colLabel: "8PM" },
  ],
  [
    { value: 3, label: "Wed 8AM", rowLabel: "Wednesday", colLabel: "8AM" },
    { value: 6, label: "Wed 12PM", rowLabel: "Wednesday", colLabel: "12PM" },
    { value: 8, label: "Wed 4PM", rowLabel: "Wednesday", colLabel: "4PM" },
    { value: 4, label: "Wed 8PM", rowLabel: "Wednesday", colLabel: "8PM" },
  ],
  [
    { value: 5, label: "Thu 8AM", rowLabel: "Thursday", colLabel: "8AM" },
    { value: 8, label: "Thu 12PM", rowLabel: "Thursday", colLabel: "12PM" },
    { value: 10, label: "Thu 4PM", rowLabel: "Thursday", colLabel: "4PM" },
    { value: 6, label: "Thu 8PM", rowLabel: "Thursday", colLabel: "8PM" },
  ],
  [
    { value: 6, label: "Fri 8AM", rowLabel: "Friday", colLabel: "8AM" },
    { value: 9, label: "Fri 12PM", rowLabel: "Friday", colLabel: "12PM" },
    { value: 10, label: "Fri 4PM", rowLabel: "Friday", colLabel: "4PM" },
    { value: 7, label: "Fri 8PM", rowLabel: "Friday", colLabel: "8PM" },
  ],
];

const monthlyData: HeatmapCell[][] = [
  [
    { value: 120, label: "Week 1, Sun" },
    { value: 85, label: "Week 1, Mon" },
    { value: 92, label: "Week 1, Tue" },
    { value: 78, label: "Week 1, Wed" },
    { value: 110, label: "Week 1, Thu" },
    { value: 95, label: "Week 1, Fri" },
    { value: 45, label: "Week 1, Sat" },
  ],
  [
    { value: 135, label: "Week 2, Sun" },
    { value: 88, label: "Week 2, Mon" },
    { value: 102, label: "Week 2, Tue" },
    { value: 91, label: "Week 2, Wed" },
    { value: 125, label: "Week 2, Thu" },
    { value: 98, label: "Week 2, Fri" },
    { value: 52, label: "Week 2, Sat" },
  ],
  [
    { value: 108, label: "Week 3, Sun" },
    { value: 95, label: "Week 3, Mon" },
    { value: 88, label: "Week 3, Tue" },
    { value: 105, label: "Week 3, Wed" },
    { value: 118, label: "Week 3, Thu" },
    { value: 102, label: "Week 3, Fri" },
    { value: 48, label: "Week 3, Sat" },
  ],
  [
    { value: 142, label: "Week 4, Sun" },
    { value: 112, label: "Week 4, Mon" },
    { value: 98, label: "Week 4, Tue" },
    { value: 120, label: "Week 4, Wed" },
    { value: 132, label: "Week 4, Thu" },
    { value: 115, label: "Week 4, Fri" },
    { value: 62, label: "Week 4, Sat" },
  ],
];

const stockData: HeatmapCell[][] = [
  [
    { value: -2.5, label: "Stock A, Mon", rowLabel: "Stock A", colLabel: "Monday" },
    { value: 1.8, label: "Stock A, Tue", rowLabel: "Stock A", colLabel: "Tuesday" },
    { value: 3.2, label: "Stock A, Wed", rowLabel: "Stock A", colLabel: "Wednesday" },
    { value: -0.5, label: "Stock A, Thu", rowLabel: "Stock A", colLabel: "Thursday" },
    { value: 2.1, label: "Stock A, Fri", rowLabel: "Stock A", colLabel: "Friday" },
  ],
  [
    { value: 1.2, label: "Stock B, Mon", rowLabel: "Stock B", colLabel: "Monday" },
    { value: -1.5, label: "Stock B, Tue", rowLabel: "Stock B", colLabel: "Tuesday" },
    { value: 0.8, label: "Stock B, Wed", rowLabel: "Stock B", colLabel: "Wednesday" },
    { value: 2.5, label: "Stock B, Thu", rowLabel: "Stock B", colLabel: "Thursday" },
    { value: -0.3, label: "Stock B, Fri", rowLabel: "Stock B", colLabel: "Friday" },
  ],
  [
    { value: -3.1, label: "Stock C, Mon", rowLabel: "Stock C", colLabel: "Monday" },
    { value: -2.2, label: "Stock C, Tue", rowLabel: "Stock C", colLabel: "Tuesday" },
    { value: 1.5, label: "Stock C, Wed", rowLabel: "Stock C", colLabel: "Wednesday" },
    { value: 0.2, label: "Stock C, Thu", rowLabel: "Stock C", colLabel: "Thursday" },
    { value: -1.8, label: "Stock C, Fri", rowLabel: "Stock C", colLabel: "Friday" },
  ],
];

const salesData: HeatmapCell[][] = [
  [
    { value: 15000, label: "Product A, North", rowLabel: "Product A", colLabel: "North" },
    { value: 22000, label: "Product A, South", rowLabel: "Product A", colLabel: "South" },
    { value: 18000, label: "Product A, East", rowLabel: "Product A", colLabel: "East" },
    { value: 25000, label: "Product A, West", rowLabel: "Product A", colLabel: "West" },
  ],
  [
    { value: 32000, label: "Product B, North", rowLabel: "Product B", colLabel: "North" },
    { value: 28000, label: "Product B, South", rowLabel: "Product B", colLabel: "South" },
    { value: 35000, label: "Product B, East", rowLabel: "Product B", colLabel: "East" },
    { value: 30000, label: "Product B, West", rowLabel: "Product B", colLabel: "West" },
  ],
  [
    { value: 12000, label: "Product C, North", rowLabel: "Product C", colLabel: "North" },
    { value: 15000, label: "Product C, South", rowLabel: "Product C", colLabel: "South" },
    { value: 18000, label: "Product C, East", rowLabel: "Product C", colLabel: "East" },
    { value: 22000, label: "Product C, West", rowLabel: "Product C", colLabel: "West" },
  ],
];

const meta: Meta<typeof Heatmap> = {
  title: "Components/Heatmap",
  component: Heatmap,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    colorScale: {
      control: "select",
      options: ["sequential", "diverging", "spectral", "viridis", "custom"],
    },
    cellSize: {
      control: { type: "range", min: 16, max: 64, step: 4 },
    },
    cellGap: {
      control: { type: "range", min: 0, max: 12, step: 1 },
    },
    showValues: { control: "boolean" },
    showLabels: { control: "boolean" },
    showTooltip: { control: "boolean" },
    borderRadius: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
  },
  args: {
    size: "md",
    colorScale: "sequential",
    cellSize: 40,
    cellGap: 2,
    showValues: false,
    showLabels: true,
    showTooltip: true,
    borderRadius: "sm",
    data: weeklyActivityData,
    rowLabels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    colLabels: ["8AM", "12PM", "4PM", "8PM"],
  },
};

export default meta;
type Story = StoryObj<typeof Heatmap>;

export const Default: Story = {
  render: (args) => <Heatmap {...args} />,
};

export const WeeklyActivity: Story = {
  name: "Weekly Activity",
  args: {
    data: weeklyActivityData,
    rowLabels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    colLabels: ["8AM", "12PM", "4PM", "8PM"],
  },
};

export const MonthlyData: Story = {
  name: "Monthly Data",
  args: {
    data: monthlyData,
    rowLabels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    colLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    colorScale: "sequential",
  },
};

export const SalesByRegion: Story = {
  name: "Sales by Region",
  args: {
    data: salesData,
    rowLabels: ["Product A", "Product B", "Product C"],
    colLabels: ["North", "South", "East", "West"],
    colorScale: "viridis",
    formatValue: (v) => `$${(v / 1000).toFixed(0)}K`,
  },
};

export const DivergingScale: Story = {
  name: "Diverging Scale (Stock Performance)",
  args: {
    data: stockData,
    rowLabels: ["Stock A", "Stock B", "Stock C"],
    colLabels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    colorScale: "diverging",
    minValue: -5,
    maxValue: 5,
    formatValue: (v) => `${v > 0 ? "+" : ""}${v.toFixed(1)}%`,
    showTooltip: true,
  },
};

export const SpectralScale: Story = {
  args: {
    data: monthlyData,
    colorScale: "spectral",
    rowLabels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    colLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
};

export const ViridisScale: Story = {
  args: {
    data: salesData,
    colorScale: "viridis",
    rowLabels: ["Product A", "Product B", "Product C"],
    colLabels: ["North", "South", "East", "West"],
  },
};

export const CustomColorScale: Story = {
  name: "Custom Color Scale",
  args: {
    data: monthlyData,
    colorScale: "custom",
    customColorScale: {
      min: "#f0f9ff",
      mid: "#3b82f6",
      max: "#1e3a8a",
    },
    rowLabels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    colLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
};

export const WithValues: Story = {
  name: "With Values Displayed",
  args: {
    data: weeklyActivityData,
    rowLabels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    colLabels: ["8AM", "12PM", "4PM", "8PM"],
    showValues: true,
    cellSize: 48,
    colorScale: "sequential",
  },
};

export const WithoutLabels: Story = {
  name: "Without Labels",
  args: {
    data: weeklyActivityData,
    showLabels: false,
    cellSize: 32,
  },
};

export const WithoutTooltip: Story = {
  name: "Without Tooltip",
  args: {
    data: weeklyActivityData,
    rowLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    colLabels: ["8AM", "12PM", "4PM", "8PM"],
    showTooltip: false,
  },
};

export const SmallSize: Story = {
  name: "Small Size",
  args: {
    size: "sm",
    data: weeklyActivityData,
    rowLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    colLabels: ["8AM", "12PM", "4PM", "8PM"],
    cellSize: 24,
  },
};

export const LargeSize: Story = {
  name: "Large Size",
  args: {
    size: "lg",
    data: weeklyActivityData,
    rowLabels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    colLabels: ["8AM", "12PM", "4PM", "8PM"],
    cellSize: 56,
    cellGap: 4,
  },
};

export const SmallCells: Story = {
  name: "Small Cells (Dense Data)",
  args: {
    data: generateMatrixData(7, 12, 0, 100),
    rowLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    colLabels: Array.from({ length: 12 }, (_, i) => `${i}:00`),
    cellSize: 20,
    cellGap: 1,
    showLabels: true,
  },
};

export const LargeCells: Story = {
  name: "Large Cells",
  args: {
    data: weeklyActivityData,
    rowLabels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    colLabels: ["8AM", "12PM", "4PM", "8PM"],
    cellSize: 64,
    cellGap: 4,
    showValues: true,
  },
};

export const NoGap: Story = {
  name: "No Gap Between Cells",
  args: {
    data: weeklyActivityData,
    rowLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    colLabels: ["8AM", "12PM", "4PM", "8PM"],
    cellGap: 0,
    borderRadius: "none",
    showValues: true,
    cellSize: 48,
  },
};

export const Interactive: Story = {
  name: "Interactive (Click Handler)",
  render: (args) => {
    const [selected, setSelected] = React.useState<string | null>(null);

    return (
      <div>
        <Heatmap
          {...args}
          onCellClick={(cell) => setSelected(cell.label || `${cell.value}`)}
        />
        {selected && (
          <div className="mt-4 p-3 bg-muted rounded-[--la-radius] text-sm">
            Selected: <strong>{selected}</strong>
          </div>
        )}
      </div>
    );
  },
  args: {
    data: salesData,
    rowLabels: ["Product A", "Product B", "Product C"],
    colLabels: ["North", "South", "East", "West"],
    colorScale: "viridis",
  },
};

export const HoverCallback: Story = {
  name: "Hover Callback",
  render: (args) => {
    const [hovered, setHovered] = React.useState<string | null>(null);

    return (
      <div>
        <Heatmap
          {...args}
          onCellHover={(cell) =>
            setHovered(cell ? `${cell.label}: ${cell.value}` : null)
          }
        />
        <div className="mt-4 p-3 bg-muted rounded-[--la-radius] text-sm min-h-[2.5rem]">
          {hovered ? (
            <>Hovering: <strong>{hovered}</strong></>
          ) : (
            <span className="text-muted-foreground">Hover over a cell</span>
          )}
        </div>
      </div>
    );
  },
  args: {
    data: weeklyActivityData,
    rowLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    colLabels: ["8AM", "12PM", "4PM", "8PM"],
  },
};

export const CustomTooltip: Story = {
  name: "Custom Tooltip Content",
  render: (args) => {
    const customTooltip = (cell: typeof args.data[0][0]) => (
      <div className="text-xs p-1">
        <div className="font-bold text-primary mb-1">{cell.label}</div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Value:</span>
          <span className="font-semibold">{cell.value}</span>
        </div>
        {cell.rowLabel && cell.colLabel && (
          <div className="text-muted-foreground mt-1">
            {cell.rowLabel} × {cell.colLabel}
          </div>
        )}
      </div>
    );

    return (
      <Heatmap
        {...args}
        tooltipContent={customTooltip}
      />
    );
  },
  args: {
    data: salesData,
    rowLabels: ["Product A", "Product B", "Product C"],
    colLabels: ["North", "South", "East", "West"],
    colorScale: "sequential",
  },
};

export const DifferentBorderRadius: Story = {
  name: "Different Border Radius",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-sm font-medium mb-2">None</h4>
        <Heatmap
          data={weeklyActivityData}
          borderRadius="none"
          cellGap={2}
          aria-label="Heatmap with no border radius"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Small</h4>
        <Heatmap
          data={weeklyActivityData}
          borderRadius="sm"
          cellGap={2}
          aria-label="Heatmap with small border radius"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Medium</h4>
        <Heatmap
          data={weeklyActivityData}
          borderRadius="md"
          cellGap={2}
          aria-label="Heatmap with medium border radius"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large</h4>
        <Heatmap
          data={weeklyActivityData}
          borderRadius="lg"
          cellGap={2}
          aria-label="Heatmap with large border radius"
        />
      </div>
    </div>
  ),
};

export const ColorScaleComparison: Story = {
  name: "Color Scale Comparison",
  render: () => (
    <div className="flex flex-col gap-6">
      {(["sequential", "diverging", "spectral", "viridis"] as const).map(
        (scale) => (
          <div key={scale}>
            <h4 className="text-sm font-medium mb-2 capitalize">{scale}</h4>
            <Heatmap
              data={generateMatrixData(4, 6, 0, 100)}
              colorScale={scale}
              cellSize={32}
              cellGap={2}
              aria-label={`Heatmap with ${scale} color scale`}
            />
          </div>
        )
      )}
    </div>
  ),
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
      <Heatmap
        data={salesData}
        rowLabels={["Product A", "Product B", "Product C"]}
        colLabels={["North", "South", "East", "West"]}
        colorScale="viridis"
        showValues
        cellSize={48}
        cellGap={2}
        aria-label="Sales data heatmap"
      />
    </div>
  ),
};
