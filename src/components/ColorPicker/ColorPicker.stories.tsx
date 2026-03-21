import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ColorPicker } from "./ColorPicker";

const meta: Meta<typeof ColorPicker> = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    format: {
      control: "select",
      options: ["hex", "rgb", "hsl"],
    },
    showEyedropper: {
      control: "boolean",
    },
    showInput: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    value: "#3B82F6",
    onChange: (color) => console.log("Color:", color),
  },
};

export const Small: Story = {
  args: {
    value: "#10B981",
    size: "sm",
    onChange: (color) => console.log("Color:", color),
  },
};

export const Large: Story = {
  args: {
    value: "#F59E0B",
    size: "lg",
    onChange: (color) => console.log("Color:", color),
  },
};

export const RGBFormat: Story = {
  args: {
    value: "rgb(139, 92, 246)",
    format: "rgb",
    onChange: (color) => console.log("Color:", color),
  },
};

export const HSLFormat: Story = {
  args: {
    value: "hsl(280, 100%, 70%)",
    format: "hsl",
    onChange: (color) => console.log("Color:", color),
  },
};

export const NoEyedropper: Story = {
  args: {
    value: "#EC4899",
    showEyedropper: false,
    onChange: (color) => console.log("Color:", color),
  },
};

export const NoInput: Story = {
  args: {
    value: "#8B5CF6",
    showInput: false,
    onChange: (color) => console.log("Color:", color),
  },
};

export const Disabled: Story = {
  args: {
    value: "#6B7280",
    disabled: true,
    onChange: () => {},
  },
};

export const CustomPresets: Story = {
  args: {
    value: "#2563EB",
    presets: [
      { label: "Primary", value: "#2563EB" },
      { label: "Secondary", value: "#64748B" },
      { label: "Success", value: "#16A34A" },
      { label: "Warning", value: "#D97706" },
      { label: "Danger", value: "#DC2626" },
      { label: "Info", value: "#0891B2" },
    ],
    onChange: (color) => console.log("Color:", color),
  },
};

export const Interactive: Story = {
  render: () => {
    const [color, setColor] = React.useState("#3b82f6");
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "80px" }}>
        <ColorPicker value={color} onChange={setColor} />
        <span style={{ fontSize: "13px", color: "hsl(var(--muted-foreground))", fontFamily: "monospace" }}>
          {color}
        </span>
      </div>
    );
  },
};

export const MultipleInstances: Story = {
  render: () => {
    const [primary, setPrimary] = React.useState("#3b82f6");
    const [secondary, setSecondary] = React.useState("#8b5cf6");
    const [accent, setAccent] = React.useState("#22c55e");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "80px" }}>
        {[
          { label: "Primary", color: primary, onChange: setPrimary },
          { label: "Secondary", color: secondary, onChange: setSecondary },
          { label: "Accent", color: accent, onChange: setAccent },
        ].map(({ label, color, onChange }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "13px", width: "72px" }}>{label}</span>
            <ColorPicker value={color} onChange={onChange} />
            <span style={{ fontSize: "13px", color: "hsl(var(--muted-foreground))", fontFamily: "monospace" }}>
              {color}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

export const PaletteBuilder: Story = {
  render: () => {
    const [colors, setColors] = React.useState({
      primary: "#3B82F6",
      secondary: "#64748B",
      accent: "#8B5CF6",
      background: "#FFFFFF",
      foreground: "#0F172A",
    });

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(colors).map(([name, value]) => (
            <div key={name} className="flex items-center gap-2">
              <ColorPicker
                value={value}
                onChange={(v) => setColors({ ...colors, [name]: v })}
                size="sm"
              />
              <span className="text-sm capitalize">{name}</span>
            </div>
          ))}
        </div>
        <div
          className="rounded-md border p-4"
          style={{
            backgroundColor: colors.background,
            color: colors.foreground,
          }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primary }}>
            Preview
          </h3>
          <p style={{ color: colors.foreground }}>
            This is how your colors look together.
          </p>
          <button
            className="mt-2 px-4 py-2 rounded-md"
            style={{ backgroundColor: colors.primary, color: "white" }}
          >
            Primary Button
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
  args: {
    value: "#8B5CF6",
    onChange: (color) => console.log("Color:", color),
  },
};
