import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Progress } from "./index";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
  args: {
    size: "md",
    value: 60,
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: "320px" }}>
      <Progress {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "320px" }}>
      <div>
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>0%</span>
        <Progress value={0} />
      </div>
      <div>
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>25%</span>
        <Progress value={25} />
      </div>
      <div>
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>50%</span>
        <Progress value={50} />
      </div>
      <div>
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>75%</span>
        <Progress value={75} />
      </div>
      <div>
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>100%</span>
        <Progress value={100} />
      </div>
      <div>
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>indeterminate</span>
        <Progress value={undefined} />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "320px" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: 24, fontSize: "12px", color: "var(--muted-foreground)" }}>{size}</span>
          <Progress size={size} value={65} style={{ flex: 1 }} />
        </div>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(30);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "320px" }}>
        <Progress {...args} value={value} />
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            style={{ flex: 1 }}
          />
          <span style={{ fontSize: "14px", width: "40px", textAlign: "right" }}>{value}%</span>
        </div>
      </div>
    );
  },
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "24px", background: "hsl(var(--background))", borderRadius: "8px", width: "320px" }}>
      <Progress size="sm" value={40} />
      <Progress size="md" value={65} />
      <Progress size="lg" value={80} />
    </div>
  ),
};

export const Animated: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
      const interval = setInterval(() => {
        setValue((v) => (v >= 100 ? 0 : v + 5));
      }, 300);
      return () => clearInterval(interval);
    }, []);
    return (
      <div style={{ width: "320px" }}>
        <Progress value={value} />
      </div>
    );
  },
};
