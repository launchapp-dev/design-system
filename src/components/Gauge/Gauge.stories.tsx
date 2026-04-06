import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Gauge } from "./index";
import type { GaugeColorZone } from "./Gauge";

const meta: Meta<typeof Gauge> = {
  title: "Components/Gauge",
  component: Gauge,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    min: {
      control: { type: "number", min: 0, max: 100 },
    },
    max: {
      control: { type: "number", min: 100, max: 1000 },
    },
    showValue: { control: "boolean" },
    showMinMax: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### ARIA Attributes
- Container has \`role="progressbar"\` or \`role="meter"\`
- \`aria-valuenow\` shows current value
- \`aria-valuemin\` and \`aria-valuemax\` define range
- \`aria-label\` describes gauge purpose (e.g., "Memory usage")

### Screen Reader Behavior
- Current value announced as percentage or absolute number
- Min/max values announced if shown
- Color status zones announced (e.g., "Critical", "Optimal")
- Gauge purpose clearly stated

### Visual Indicators
- Color zones provide visual status indication
- Numeric value displayed for clarity
- Clear min/max labels when shown
- High contrast between gauge and background

### Focus Management
- Gauge is non-interactive (no keyboard focus needed)
- Used for display/monitoring purposes
- Screen reader announces all values
        `,
      },
    },
  },
  args: {
    size: "md",
    value: 65,
    min: 0,
    max: 100,
    label: "CPU Usage",
    unit: "%",
    showValue: true,
    showMinMax: true,
  },
};

export default meta;
type Story = StoryObj<typeof Gauge>;

export const Default: Story = {
  render: (args) => <Gauge {...args} />,
};

export const Small: Story = {
  name: "Small Size",
  args: {
    size: "sm",
    value: 45,
    label: "Memory",
    unit: "GB",
    showValue: true,
  },
};

export const Large: Story = {
  name: "Large Size",
  args: {
    size: "lg",
    value: 78,
    label: "Disk Usage",
    unit: "%",
    showValue: true,
    showMinMax: true,
  },
};

export const SpeedGauge: Story = {
  name: "Speed Gauge (km/h)",
  args: {
    value: 85,
    min: 0,
    max: 200,
    label: "Speed",
    unit: "km/h",
    showValue: true,
    showMinMax: true,
  },
};

export const TemperatureGauge: Story = {
  name: "Temperature Gauge",
  args: {
    value: 72,
    min: -20,
    max: 120,
    label: "Temperature",
    unit: "°F",
    showValue: true,
    showMinMax: true,
  },
};

export const CustomColorZones: Story = {
  name: "Custom Color Zones",
  args: {
    value: 55,
    min: 0,
    max: 100,
    label: "Performance Score",
    unit: "",
    showValue: true,
    showMinMax: true,
    colorZones: [
      { from: 0, to: 40, color: "hsl(142, 71%, 45%)" },
      { from: 40, to: 70, color: "hsl(45, 93%, 47%)" },
      { from: 70, to: 100, color: "hsl(0, 72%, 51%)" },
    ] as GaugeColorZone[],
  },
};

export const CustomTrackAndNeedleColors: Story = {
  name: "Custom Track and Needle Colors",
  args: {
    value: 72,
    label: "Battery Level",
    unit: "%",
    showValue: true,
    showMinMax: true,
    trackColor: "hsl(var(--la-muted))",
    needleColor: "hsl(142, 76%, 36%)",
    centerColor: "hsl(var(--la-card))",
  },
};

export const WithoutLabel: Story = {
  name: "Without Label",
  args: {
    value: 60,
    showValue: true,
    showMinMax: false,
  },
};

export const WithoutValue: Story = {
  name: "Without Value Display",
  args: {
    value: 75,
    label: "Load",
    showValue: false,
    showMinMax: true,
  },
};

export const WithoutMinMax: Story = {
  name: "Without Min/Max Labels",
  args: {
    value: 45,
    label: "Progress",
    showValue: true,
    showMinMax: false,
  },
};

export const MinValue: Story = {
  name: "Minimum Value",
  args: {
    value: 0,
    label: "CPU Usage",
    unit: "%",
    showValue: true,
    showMinMax: true,
  },
};

export const MaxValue: Story = {
  name: "Maximum Value",
  args: {
    value: 100,
    label: "CPU Usage",
    unit: "%",
    showValue: true,
    showMinMax: true,
  },
};

export const HalfValue: Story = {
  name: "Half Value",
  args: {
    value: 50,
    label: "Storage",
    unit: "%",
    showValue: true,
    showMinMax: true,
  },
};

export const CustomFormat: Story = {
  name: "Custom Format Value",
  render: (args) => <Gauge {...args} formatValue={(v) => v.toFixed(1)} />,
  args: {
    value: 75.6,
    min: 0,
    max: 100,
    label: "Precision",
    unit: "",
    showValue: true,
    showMinMax: true,
  },
};

export const MultipleGauges: Story = {
  name: "Multiple Gauges",
  render: () => (
    <div className="flex flex-wrap gap-8">
      <Gauge value={25} label="Network" unit="Mbps" showValue showMinMax />
      <Gauge value={68} label="CPU" unit="%" showValue showMinMax />
      <Gauge value={82} label="Memory" unit="GB" showValue showMinMax />
    </div>
  ),
};

export const Interactive: Story = {
  name: "Interactive (Click to Change)",
  render: (args) => {
    const [value, setValue] = React.useState(50);

    return (
      <div className="flex flex-col items-center gap-4">
        <Gauge {...args} value={value} showValue showMinMax />
        <div className="flex gap-2">
          {[25, 50, 75, 100].map((v) => (
            <button
              key={v}
              onClick={() => setValue(v)}
              className="px-3 py-1 text-sm rounded border border-border hover:bg-accent transition-colors"
            >
              {v}%
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Click a button to change the gauge value</p>
      </div>
    );
  },
  args: {
    label: "Interactive Gauge",
    unit: "%",
  },
};

export const AllSizes: Story = {
  name: "All Sizes Comparison",
  render: () => (
    <div className="flex items-end gap-8">
      <div className="flex flex-col items-center gap-2">
        <Gauge size="sm" value={60} showValue />
        <span className="text-sm text-muted-foreground">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Gauge size="md" value={60} showValue />
        <span className="text-sm text-muted-foreground">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Gauge size="lg" value={60} showValue />
        <span className="text-sm text-muted-foreground">Large</span>
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div className="p-8 rounded-lg bg-zinc-900">
      <div className="flex flex-wrap gap-8">
        <Gauge value={35} label="Low" unit="%" showValue showMinMax />
        <Gauge value={65} label="Medium" unit="%" showValue showMinMax />
        <Gauge value={85} label="High" unit="%" showValue showMinMax />
      </div>
    </div>
  ),
};

export const DashboardLayout: Story = {
  name: "Dashboard Layout Example",
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="p-6 rounded-lg border border-border bg-card">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">CPU Usage</h3>
        <div className="flex justify-center">
          <Gauge value={72} label="Processor" unit="%" showValue showMinMax size="lg" />
        </div>
      </div>
      <div className="p-6 rounded-lg border border-border bg-card">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Memory Usage</h3>
        <div className="flex justify-center">
          <Gauge value={58} label="RAM" unit="GB" showValue showMinMax size="lg" />
        </div>
      </div>
      <div className="p-6 rounded-lg border border-border bg-card">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Disk Usage</h3>
        <div className="flex justify-center">
          <Gauge value={85} label="Storage" unit="%" showValue showMinMax size="lg" />
        </div>
      </div>
    </div>
  ),
};

export const HealthCheck: Story = {
  name: "Health Check Gauges",
  render: () => (
    <div className="flex flex-wrap gap-6">
      <Gauge
        value={95}
        label="Database"
        showValue
        showMinMax={false}
        colorZones={[
          { from: 0, to: 60, color: "hsl(0, 72%, 51%)" },
          { from: 60, to: 85, color: "hsl(45, 93%, 47%)" },
          { from: 85, to: 100, color: "hsl(142, 71%, 45%)" },
        ]}
      />
      <Gauge
        value={78}
        label="API"
        showValue
        showMinMax={false}
        colorZones={[
          { from: 0, to: 60, color: "hsl(0, 72%, 51%)" },
          { from: 60, to: 85, color: "hsl(45, 93%, 47%)" },
          { from: 85, to: 100, color: "hsl(142, 71%, 45%)" },
        ]}
      />
      <Gauge
        value={42}
        label="Cache"
        showValue
        showMinMax={false}
        colorZones={[
          { from: 0, to: 60, color: "hsl(0, 72%, 51%)" },
          { from: 60, to: 85, color: "hsl(45, 93%, 47%)" },
          { from: 85, to: 100, color: "hsl(142, 71%, 45%)" },
        ]}
      />
    </div>
  ),
};
