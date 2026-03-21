import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Gauge } from "./index";

const meta: Meta<typeof Gauge> = {
  title: "Components/Gauge",
  component: Gauge,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    colorScheme: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "warning",
        "destructive",
        "chart1",
        "chart2",
        "chart3",
        "chart4",
        "chart5",
      ],
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    min: { control: "number" },
    max: { control: "number" },
    showValue: { control: "boolean" },
    showMinMax: { control: "boolean" },
    showLabel: { control: "boolean" },
    animated: { control: "boolean" },
    segments: {
      control: { type: "range", min: 2, max: 20, step: 1 },
    },
  },
  args: {
    size: "md",
    value: 75,
    min: 0,
    max: 100,
    showValue: true,
    showMinMax: true,
    showLabel: false,
    animated: true,
    segments: 5,
  },
};

export default meta;
type Story = StoryObj<typeof Gauge>;

export const Default: Story = {
  render: (args) => <Gauge {...args} />,
};

export const SpeedGauge: Story = {
  name: "Speed Gauge (km/h)",
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Speed</h3>
      <Gauge
        value={120}
        min={0}
        max={200}
        label="km/h"
        colorScheme="primary"
        showValue={true}
        showMinMax={true}
        showLabel={true}
        segments={10}
      />
    </div>
  ),
};

export const FuelGauge: Story = {
  name: "Fuel Gauge",
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Fuel Level</h3>
      <Gauge
        value={45}
        min={0}
        max={100}
        label="%"
        colorScheme="success"
        showValue={true}
        showMinMax={true}
        showLabel={true}
        segments={5}
      />
    </div>
  ),
};

export const TemperatureGauge: Story = {
  name: "Temperature Gauge",
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">CPU Temperature</h3>
      <Gauge
        value={72}
        min={0}
        max={100}
        label="°C"
        colorScheme="warning"
        showValue={true}
        showMinMax={true}
        showLabel={true}
        thresholds={[
          { value: 30, color: "chart3" },
          { value: 50, color: "chart2" },
          { value: 70, color: "warning" },
          { value: 85, color: "destructive" },
        ]}
      />
    </div>
  ),
};

export const ScoreGauge: Story = {
  name: "Score Gauge (NPS)",
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">NPS Score</h3>
      <Gauge
        value={42}
        min={-100}
        max={100}
        label="NPS"
        colorScheme="chart1"
        showValue={true}
        showMinMax={true}
        showLabel={true}
        segments={10}
      />
    </div>
  ),
};

export const PercentageGauge: Story = {
  name: "Percentage Gauge",
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Completion</h3>
      <Gauge
        value={68}
        min={0}
        max={100}
        formatValue={(v) => `${v}%`}
        colorScheme="chart2"
        showValue={true}
        showMinMax={true}
        showLabel={true}
        label="Complete"
      />
    </div>
  ),
};

export const SmallSize: Story = {
  args: {
    size: "sm",
    value: 60,
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
    value: 85,
    colorScheme: "success",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Performance",
    showLabel: true,
  },
};

export const WithoutMinMax: Story = {
  name: "Without Min/Max Labels",
  args: {
    showMinMax: false,
    value: 50,
  },
};

export const WithoutValue: Story = {
  name: "Without Value Display",
  args: {
    showValue: false,
    value: 75,
  },
};

export const Static: Story = {
  name: "No Animation",
  args: {
    animated: false,
    value: 80,
  },
};

export const PrimaryColor: Story = {
  args: {
    colorScheme: "primary",
    value: 72,
  },
};

export const SuccessColor: Story = {
  args: {
    colorScheme: "success",
    value: 88,
  },
};

export const WarningColor: Story = {
  args: {
    colorScheme: "warning",
    value: 65,
  },
};

export const DestructiveColor: Story = {
  args: {
    colorScheme: "destructive",
    value: 92,
  },
};

export const Chart1Color: Story = {
  args: {
    colorScheme: "chart1",
    value: 55,
  },
};

export const Chart2Color: Story = {
  args: {
    colorScheme: "chart2",
    value: 40,
  },
};

export const Chart3Color: Story = {
  args: {
    colorScheme: "chart3",
    value: 78,
  },
};

export const Chart4Color: Story = {
  args: {
    colorScheme: "chart4",
    value: 60,
  },
};

export const Chart5Color: Story = {
  args: {
    colorScheme: "chart5",
    value: 85,
  },
};

export const InteractiveGauge: Story = {
  name: "Interactive Gauge",
  render: () => {
    const [value, setValue] = React.useState(50);

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Adjust Value</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setValue((v) => Math.max(0, v - 10))}
            className="px-3 py-1 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80"
          >
            -10
          </button>
          <Gauge
            value={value}
            min={0}
            max={100}
            label="Value"
            showValue={true}
            showLabel={true}
            animated={true}
          />
          <button
            onClick={() => setValue((v) => Math.min(100, v + 10))}
            className="px-3 py-1 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80"
          >
            +10
          </button>
        </div>
      </div>
    );
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
      <h3 className="text-lg font-semibold text-foreground">Dark Mode Gauge</h3>
      <div className="flex gap-8">
        <Gauge
          value={75}
          label="Primary"
          colorScheme="primary"
          showValue={true}
          showLabel={true}
        />
        <Gauge
          value={45}
          label="Success"
          colorScheme="success"
          showValue={true}
          showLabel={true}
        />
        <Gauge
          value={88}
          label="Chart1"
          colorScheme="chart1"
          showValue={true}
          showLabel={true}
        />
      </div>
    </div>
  ),
};

export const MultipleGauges: Story = {
  name: "Multiple Gauges",
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">System Metrics</h3>
      <div className="flex gap-8 flex-wrap">
        <div className="flex flex-col items-center">
          <Gauge
            value={68}
            min={0}
            max={100}
            label="CPU"
            colorScheme="warning"
            showValue={true}
            showLabel={true}
            size="sm"
          />
        </div>
        <div className="flex flex-col items-center">
          <Gauge
            value={45}
            min={0}
            max={100}
            label="Memory"
            colorScheme="chart1"
            showValue={true}
            showLabel={true}
            size="sm"
          />
        </div>
        <div className="flex flex-col items-center">
          <Gauge
            value={82}
            min={0}
            max={100}
            label="Storage"
            colorScheme="success"
            showValue={true}
            showLabel={true}
            size="sm"
          />
        </div>
        <div className="flex flex-col items-center">
          <Gauge
            value={23}
            min={0}
            max={100}
            label="Network"
            colorScheme="chart2"
            showValue={true}
            showLabel={true}
            size="sm"
          />
        </div>
      </div>
    </div>
  ),
};
