import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ColorPicker } from "./index";

const meta: Meta<typeof ColorPicker> = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  argTypes: {
    disabled: { control: "boolean" },
    value: { control: "color" },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### ARIA Attributes
- Color input has \`aria-label\` describing purpose
- Slider has \`aria-valuenow\`, \`aria-valuemin\`, \`aria-valuemax\`
- Preset buttons have clear labels

### Keyboard Navigation
- **Tab**: Navigate through color picker controls
- **Arrow Keys**: Adjust color value/saturation
- **Space/Enter**: Select preset color
- Escape to close picker if modal

### Screen Reader Behavior
- Current color value announced as hex/RGB
- Slider position announced for hue/saturation/brightness
- Preset colors announced by visual appearance

### Focus Management
- Visible focus indicator on all controls
- Focus trap within picker modal if applicable
- Return focus to trigger after selection
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: `Basic color picker with hex value display. Use arrow keys to adjust color.`,
      },
    },
  },
  render: () => {
    const [color, setColor] = React.useState("#3b82f6");
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "80px",
        }}
      >
        <ColorPicker value={color} onChange={setColor} />
        <span
          style={{
            fontSize: "13px",
            color: "hsl(var(--muted-foreground))",
            fontFamily: "monospace",
          }}
        >
          {color}
        </span>
      </div>
    );
  },
};

export const CustomPresets: Story = {
  parameters: {
    docs: {
      description: {
        story: `Color picker with custom preset swatches. Press Space to select a preset with keyboard.`,
      },
    },
  },
  render: () => {
    const [color, setColor] = React.useState("#10b981");
    const presets = [
      "#10b981",
      "#059669",
      "#047857",
      "#3b82f6",
      "#2563eb",
      "#1d4ed8",
      "#8b5cf6",
      "#7c3aed",
      "#6d28d9",
      "#f59e0b",
      "#d97706",
      "#b45309",
    ];
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "80px",
        }}
      >
        <ColorPicker value={color} onChange={setColor} presets={presets} />
        <span
          style={{
            fontSize: "13px",
            color: "hsl(var(--muted-foreground))",
            fontFamily: "monospace",
          }}
        >
          {color}
        </span>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ padding: "80px" }}>
      <ColorPicker value="#ef4444" disabled />
    </div>
  ),
};

export const MultipleInstances: Story = {
  render: () => {
    const [primary, setPrimary] = React.useState("#3b82f6");
    const [secondary, setSecondary] = React.useState("#8b5cf6");
    const [accent, setAccent] = React.useState("#22c55e");
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "80px",
        }}
      >
        {[
          { label: "Primary", color: primary, onChange: setPrimary },
          { label: "Secondary", color: secondary, onChange: setSecondary },
          { label: "Accent", color: accent, onChange: setAccent },
        ].map(({ label, color, onChange }) => (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <span style={{ fontSize: "13px", width: "72px" }}>{label}</span>
            <ColorPicker value={color} onChange={onChange} />
            <span
              style={{
                fontSize: "13px",
                color: "hsl(var(--muted-foreground))",
                fontFamily: "monospace",
              }}
            >
              {color}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => {
    const [color, setColor] = React.useState("#8b5cf6");
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "80px",
          background: "hsl(var(--background))",
        }}
      >
        <ColorPicker value={color} onChange={setColor} />
        <span
          style={{
            fontSize: "13px",
            color: "hsl(var(--muted-foreground))",
            fontFamily: "monospace",
          }}
        >
          {color}
        </span>
      </div>
    );
  },
};
