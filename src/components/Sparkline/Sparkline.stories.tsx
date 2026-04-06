import type { Meta, StoryObj } from "@storybook/react";
import { Sparkline } from "./index";

const generateData = (
  length: number,
  min: number,
  max: number,
  trend: "up" | "down" | "flat" | "volatile" = "up",
): number[] => {
  const data: number[] = [];
  let current = (max + min) / 2;
  const step = (max - min) / length;

  for (let i = 0; i < length; i++) {
    if (trend === "up") {
      current += step * (0.5 + Math.random());
    } else if (trend === "down") {
      current -= step * (0.5 + Math.random());
    } else if (trend === "volatile") {
      current += (Math.random() - 0.5) * step * 3;
    }
    current = Math.max(min, Math.min(max, current));
    data.push(parseFloat(current.toFixed(2)));
  }

  return data;
};

const meta: Meta<typeof Sparkline> = {
  title: "Components/Sparkline",
  component: Sparkline,
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
        "destructive",
        "muted",
        "accent",
        "success",
        "warning",
        "chart1",
        "chart2",
        "chart3",
        "chart4",
        "chart5",
      ],
    },
    curveType: {
      control: "select",
      options: ["linear", "smooth", "step"],
    },
    showArea: { control: "boolean" },
    showPoints: { control: "boolean" },
    strokeWidth: { control: { type: "range", min: 0.5, max: 4, step: 0.5 } },
    pointRadius: { control: { type: "range", min: 0.5, max: 4, step: 0.5 } },
  },
  args: {
    size: "md",
    colorScheme: "primary",
    curveType: "smooth",
    showArea: false,
    showPoints: false,
    strokeWidth: 1.5,
    pointRadius: 1.5,
    data: generateData(12, 0, 100, "up"),
  },
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### Data Accessibility
- Sparkline has \`aria-label\` describing trend (e.g., "Monthly sales trend")
- Numeric data values available via data attribute
- Summary statistics provided (min, max, average)

### Screen Reader Behavior
- Current trend announced (up/down/neutral)
- Key metrics announced (start, end, min, max values)
- Data point count announced
- Sparkline typically announces summary rather than each point

### Visual Indicators
- Trend direction clear from line shape
- Color coding indicates positive/negative movement
- Area fill provides visual weight
- Points visible when enabled

### Data Table Alternative
- Provide data table with all values
- Table shows date/time and corresponding values
- More detailed than sparkline visualization
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sparkline>;

export const Default: Story = {
  render: (args) => <Sparkline {...args} />,
};

export const UpwardTrend: Story = {
  args: {
    data: generateData(12, 10, 100, "up"),
  },
};

export const DownwardTrend: Story = {
  args: {
    data: generateData(12, 10, 100, "down"),
    colorScheme: "destructive",
  },
};

export const Volatile: Story = {
  args: {
    data: generateData(20, 20, 80, "volatile"),
    colorScheme: "warning",
  },
};

export const WithArea: Story = {
  args: {
    data: generateData(12, 10, 100, "up"),
    showArea: true,
  },
};

export const WithPoints: Story = {
  args: {
    data: generateData(8, 10, 100, "up"),
    showPoints: true,
    strokeWidth: 2,
  },
};

export const WithAreaAndPoints: Story = {
  args: {
    data: generateData(10, 10, 100, "up"),
    showArea: true,
    showPoints: true,
    strokeWidth: 2,
    pointRadius: 2,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    data: generateData(8, 10, 100, "up"),
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    data: generateData(15, 10, 100, "up"),
    showArea: true,
  },
};

export const LinearCurve: Story = {
  args: {
    curveType: "linear",
    data: generateData(12, 10, 100, "up"),
  },
};

export const StepCurve: Story = {
  args: {
    curveType: "step",
    data: generateData(12, 10, 100, "up"),
  },
};

export const ColorSchemes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "80px", fontSize: "12px" }}>Primary:</span>
        <Sparkline data={generateData(12, 10, 100, "up")} colorScheme="primary" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "80px", fontSize: "12px" }}>Secondary:</span>
        <Sparkline data={generateData(12, 10, 100, "up")} colorScheme="secondary" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "80px", fontSize: "12px" }}>Destructive:</span>
        <Sparkline data={generateData(12, 10, 100, "down")} colorScheme="destructive" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "80px", fontSize: "12px" }}>Muted:</span>
        <Sparkline data={generateData(12, 10, 100, "flat")} colorScheme="muted" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "80px", fontSize: "12px" }}>Accent:</span>
        <Sparkline data={generateData(12, 10, 100, "up")} colorScheme="accent" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "80px", fontSize: "12px" }}>Success:</span>
        <Sparkline data={generateData(12, 10, 100, "up")} colorScheme="success" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "80px", fontSize: "12px" }}>Warning:</span>
        <Sparkline data={generateData(12, 10, 100, "volatile")} colorScheme="warning" />
      </div>
    </div>
  ),
};

export const ChartColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "80px", fontSize: "12px" }}>Chart 1:</span>
        <Sparkline data={generateData(12, 10, 100, "up")} colorScheme="chart1" showArea />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "80px", fontSize: "12px" }}>Chart 2:</span>
        <Sparkline data={generateData(12, 10, 100, "up")} colorScheme="chart2" showArea />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "80px", fontSize: "12px" }}>Chart 3:</span>
        <Sparkline data={generateData(12, 10, 100, "up")} colorScheme="chart3" showArea />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "80px", fontSize: "12px" }}>Chart 4:</span>
        <Sparkline data={generateData(12, 10, 100, "up")} colorScheme="chart4" showArea />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "80px", fontSize: "12px" }}>Chart 5:</span>
        <Sparkline data={generateData(12, 10, 100, "up")} colorScheme="chart5" showArea />
      </div>
    </div>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <div style={{ fontSize: "14px", lineHeight: "24px" }}>
      <p>
        Revenue is up 23% this quarter{" "}
        <Sparkline data={[20, 35, 28, 45, 52, 48, 65, 72, 68, 85, 92, 98]} size="sm" /> compared to
        last quarter.
      </p>
      <p style={{ marginTop: "8px" }}>
        User engagement dropped{" "}
        <Sparkline
          data={[80, 75, 72, 68, 65, 60, 58, 52, 48, 45, 42, 38]}
          size="sm"
          colorScheme="destructive"
        />{" "}
        over the past month.
      </p>
    </div>
  ),
};

export const CustomDimensions: Story = {
  args: {
    width: 200,
    height: 40,
    data: generateData(20, 10, 100, "up"),
    showArea: true,
    strokeWidth: 2,
  },
};

export const ThickStroke: Story = {
  args: {
    strokeWidth: 3,
    data: generateData(10, 10, 100, "up"),
    showPoints: true,
    pointRadius: 3,
  },
};

export const ThinStroke: Story = {
  args: {
    strokeWidth: 0.75,
    data: generateData(15, 10, 100, "up"),
  },
};

export const FewPoints: Story = {
  args: {
    data: [10, 30, 50, 70, 90],
    showPoints: true,
    curveType: "linear",
  },
};

export const ManyPoints: Story = {
  args: {
    data: generateData(50, 10, 100, "volatile"),
    size: "lg",
  },
};

export const EmptyData: Story = {
  args: {
    data: [],
  },
};

export const SinglePoint: Story = {
  args: {
    data: [50],
    showPoints: true,
    pointRadius: 3,
  },
};

export const TwoPoints: Story = {
  args: {
    data: [20, 80],
    showPoints: true,
  },
};

export const FlatLine: Story = {
  args: {
    data: [50, 50, 50, 50, 50, 50, 50, 50],
    colorScheme: "muted",
  },
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div style={{ padding: "24px", background: "hsl(var(--background))", borderRadius: "8px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: "80px", fontSize: "12px", color: "hsl(var(--foreground))" }}>
            Primary:
          </span>
          <Sparkline data={generateData(12, 10, 100, "up")} colorScheme="primary" showArea />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: "80px", fontSize: "12px", color: "hsl(var(--foreground))" }}>
            Destructive:
          </span>
          <Sparkline data={generateData(12, 10, 100, "down")} colorScheme="destructive" showArea />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: "80px", fontSize: "12px", color: "hsl(var(--foreground))" }}>
            Chart 1:
          </span>
          <Sparkline data={generateData(12, 10, 100, "up")} colorScheme="chart1" showArea />
        </div>
      </div>
    </div>
  ),
};
