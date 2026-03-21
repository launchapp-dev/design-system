import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Heatmap, defaultColorScales } from "./index";

const generateHeatmapData = (
  rows: number,
  cols: number,
  min: number = 0,
  max: number = 100
): { value: number; label?: string }[][] => {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => ({
      value: Math.floor(Math.random() * (max - min + 1)) + min,
      label: `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`,
    }))
  );
};

const weeklyActivityData = [
  [{ value: 12, label: "Mon" }, { value: 19, label: "Mon" }, { value: 8, label: "Mon" }, { value: 24, label: "Mon" }, { value: 31, label: "Mon" }, { value: 15, label: "Mon" }, { value: 5, label: "Mon" }],
  [{ value: 18, label: "Tue" }, { value: 25, label: "Tue" }, { value: 15, label: "Tue" }, { value: 32, label: "Tue" }, { value: 28, label: "Tue" }, { value: 22, label: "Tue" }, { value: 12, label: "Tue" }],
  [{ value: 8, label: "Wed" }, { value: 14, label: "Wed" }, { value: 22, label: "Wed" }, { value: 18, label: "Wed" }, { value: 35, label: "Wed" }, { value: 19, label: "Wed" }, { value: 9, label: "Wed" }],
  [{ value: 25, label: "Thu" }, { value: 31, label: "Thu" }, { value: 28, label: "Thu" }, { value: 42, label: "Thu" }, { value: 38, label: "Thu" }, { value: 29, label: "Thu" }, { value: 15, label: "Thu" }],
  [{ value: 5, label: "Fri" }, { value: 11, label: "Fri" }, { value: 18, label: "Fri" }, { value: 24, label: "Fri" }, { value: 32, label: "Fri" }, { value: 21, label: "Fri" }, { value: 8, label: "Fri" }],
];

const yearlyData = generateHeatmapData(52, 7, 0, 50);
const xLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const yLabels = Array.from({ length: 52 }, (_, i) => `W${i + 1}`);

const meta: Meta<typeof Heatmap> = {
  title: "Components/Heatmap",
  component: Heatmap,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    cellSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    colorScale: {
      control: "select",
      options: [
        "sequential",
        "diverging",
        "greens",
        "blues",
        "reds",
        "purples",
        "oranges",
        "heat",
        "cool",
      ],
    },
    showValues: { control: "boolean" },
    showAxisLabels: { control: "boolean" },
  },
  args: {
    size: "md",
    cellSize: "md",
    showValues: false,
    showAxisLabels: false,
    data: weeklyActivityData,
  },
};

export default meta;
type Story = StoryObj<typeof Heatmap>;

export const Default: Story = {
  render: (args) => <Heatmap {...args} />,
};

export const GitHubStyle: Story = {
  name: "GitHub Contribution Style",
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Contribution Heatmap</h3>
      <Heatmap
        data={yearlyData}
        xLabels={xLabels}
        yLabels={yLabels}
        colorScale="greens"
        showAxisLabels={true}
        cellRounded="none"
        cellSize="sm"
        size="sm"
      />
    </div>
  ),
};

export const WeeklyActivity: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Weekly Activity by Hour</h3>
      <Heatmap
        data={weeklyActivityData}
        xLabels={["12am", "6am", "12pm", "6pm", "9pm", "11pm", "2am"]}
        yLabels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
        showAxisLabels={true}
        colorScale="blues"
        showValues={true}
        formatValue={(v) => v.toString()}
        cellRounded="md"
      />
    </div>
  ),
};

export const HeatColorScale: Story = {
  name: "Heat (Hot to Cold)",
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Temperature Distribution</h3>
      <Heatmap
        data={generateHeatmapData(6, 8, 20, 100)}
        colorScale="heat"
        showValues={true}
        formatValue={(v) => `${v}°`}
        cellRounded="sm"
      />
    </div>
  ),
};

export const CoolScale: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Cool Temperature Scale</h3>
      <Heatmap
        data={generateHeatmapData(5, 7, 10, 80)}
        colorScale="cool"
        showValues={true}
        formatValue={(v) => `${v}°`}
        cellRounded="md"
      />
    </div>
  ),
};

export const GreenScale: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Green Growth Scale</h3>
      <Heatmap
        data={generateHeatmapData(4, 6, 0, 100)}
        colorScale="greens"
        showValues={true}
        cellRounded="lg"
      />
    </div>
  ),
};

export const Sequential: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sequential Color Scale</h3>
      <Heatmap
        data={generateHeatmapData(5, 8, 0, 100)}
        colorScale="sequential"
        showValues={true}
        cellRounded="md"
      />
    </div>
  ),
};

export const Diverging: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Diverging Scale (Positive/Negative)</h3>
      <Heatmap
        data={generateHeatmapData(5, 8, -50, 50)}
        colorScale="diverging"
        showValues={true}
        formatValue={(v) => (v >= 0 ? `+${v}` : `${v}`)}
        cellRounded="md"
      />
    </div>
  ),
};

export const WithValues: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Show Cell Values</h3>
      <Heatmap
        data={generateHeatmapData(4, 5, 0, 100)}
        colorScale="purples"
        showValues={true}
        showAxisLabels={true}
        xLabels={["A", "B", "C", "D", "E"]}
        yLabels={["Row 1", "Row 2", "Row 3", "Row 4"]}
        cellRounded="md"
      />
    </div>
  ),
};

export const ClickableCells: Story = {
  name: "With Click Handler",
  render: () => {
    const [selectedCell, setSelectedCell] = React.useState<{
      row: number;
      col: number;
      value: number;
    } | null>(null);

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Heatmap</h3>
        {selectedCell && (
          <p className="text-sm text-muted-foreground">
            Selected: Row {selectedCell.row + 1}, Col {selectedCell.col + 1} with value {selectedCell.value}
          </p>
        )}
        <Heatmap
          data={generateHeatmapData(4, 5, 0, 100)}
          colorScale="oranges"
          showValues={true}
          onCellClick={(cell, row, col) => {
            setSelectedCell({ row, col, value: cell.value });
          }}
          cellRounded="md"
        />
      </div>
    );
  },
};

export const SmallSize: Story = {
  args: {
    size: "sm",
    cellSize: "sm",
    data: generateHeatmapData(3, 4, 0, 100),
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
    cellSize: "lg",
    data: generateHeatmapData(4, 6, 0, 100),
    colorScale: "blues",
    showValues: true,
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div
      style={{ padding: "24px", background: "hsl(var(--background))", borderRadius: "8px" }}
      className="space-y-4"
    >
      <h3 className="text-lg font-semibold text-foreground">Dark Mode Heatmap</h3>
      <Heatmap
        data={generateHeatmapData(4, 6, 0, 100)}
        colorScale="greens"
        showValues={true}
        cellRounded="md"
      />
    </div>
  ),
};

export const EmptyData: Story = {
  args: {
    data: [],
  },
};
