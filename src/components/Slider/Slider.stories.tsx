import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Slider } from "./index";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: "horizontal",
  },
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### ARIA Attributes
- Slider has \`role="slider"\`
- \`aria-valuemin\`, \`aria-valuemax\`, \`aria-valuenow\` show range and value
- \`aria-label\` describes slider purpose (e.g., "Volume")
- \`aria-orientation\` indicates horizontal or vertical

### Keyboard Navigation
- **Left/Right Arrow** (horizontal): Decrease/increase value
- **Up/Down Arrow** (vertical): Increase/decrease value
- **Home/End**: Jump to minimum/maximum
- **Page Up/Down**: Larger increments
- Tab to focus slider

### Screen Reader Behavior
- Current value announced as slider value
- Min/max range announced
- Value changes announced as adjusted
- Disabled state announced if applicable

### Focus Management
- Slider is keyboard focusable
- Clear visual focus indicator
- Value announced on every change
- Focus does not move, only value updates
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: "300px", padding: "16px 0" }}>
      <Slider defaultValue={[50]} {...args} />
    </div>
  ),
};

export const RangeSlider: Story = {
  render: () => {
    const [values, setValues] = React.useState([25, 75]);
    return (
      <div style={{ width: "300px", padding: "16px 0" }}>
        <Slider min={0} max={100} step={1} value={values} onValueChange={setValues} />
        <div style={{ marginTop: "8px", fontSize: "12px", color: "var(--muted-foreground)" }}>
          Range: {values[0]} – {values[1]}
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: "300px", padding: "16px 0" }}>
      <Slider defaultValue={[40]} disabled />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ height: "200px", padding: "0 16px", display: "flex", gap: "32px" }}>
      <Slider orientation="vertical" defaultValue={[30]} />
      <Slider orientation="vertical" defaultValue={[20, 70]} />
      <Slider orientation="vertical" defaultValue={[50]} disabled />
    </div>
  ),
};

export const WithSteps: Story = {
  render: () => {
    const [value, setValue] = React.useState([0]);
    return (
      <div style={{ width: "300px", padding: "16px 0" }}>
        <Slider min={0} max={100} step={10} value={value} onValueChange={setValue} />
        <div style={{ marginTop: "8px", fontSize: "12px", color: "var(--muted-foreground)" }}>
          Value: {value[0]}
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
    <div
      style={{
        width: "300px",
        padding: "24px",
        background: "hsl(var(--background))",
        borderRadius: "8px",
      }}
    >
      <Slider defaultValue={[60]} />
    </div>
  ),
};
