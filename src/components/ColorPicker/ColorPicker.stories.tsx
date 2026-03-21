import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ColorPicker, DEFAULT_PRESETS } from "./index";

const meta: Meta<typeof ColorPicker> = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    value: { control: "color" },
  },
  args: {
    variant: "default",
    size: "md",
    disabled: false,
    value: "#8b5cf6",
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  render: (args) => {
    const [color, setColor] = React.useState(args.value ?? "#8b5cf6");
    return (
      <ColorPicker
        {...args}
        value={color}
        onChange={setColor}
      />
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [color, setColor] = React.useState("#3b82f6");
    return (
      <div className="flex flex-col gap-4">
        <ColorPicker value={color} onChange={setColor} />
        <div
          className="h-16 w-full rounded-md border"
          style={{ backgroundColor: color }}
        />
        <p className="text-sm text-muted-foreground">Selected: {color}</p>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [color, setColor] = React.useState("#22c55e");
    return (
      <div className="flex flex-col gap-3">
        <ColorPicker size="sm" value={color} onChange={setColor} />
        <ColorPicker size="md" value={color} onChange={setColor} />
        <ColorPicker size="lg" value={color} onChange={setColor} />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [color, setColor] = React.useState("#ef4444");
    return (
      <div className="flex flex-col gap-3">
        <ColorPicker variant="default" value={color} onChange={setColor} />
        <ColorPicker variant="outline" value={color} onChange={setColor} />
        <ColorPicker variant="ghost" value={color} onChange={setColor} />
      </div>
    );
  },
};

export const CustomPresets: Story = {
  render: () => {
    const [color, setColor] = React.useState("#1e40af");
    const brandColors = [
      "#1e40af",
      "#1d4ed8",
      "#2563eb",
      "#3b82f6",
      "#60a5fa",
      "#93c5fd",
      "#bfdbfe",
    ];
    return (
      <ColorPicker
        value={color}
        onChange={setColor}
        presets={brandColors}
      />
    );
  },
};

export const NoPresets: Story = {
  render: () => {
    const [color, setColor] = React.useState("#000000");
    return (
      <ColorPicker value={color} onChange={setColor} presets={[]} />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <ColorPicker value="#8b5cf6" disabled />
  ),
};

export const AllPresets: Story = {
  render: () => {
    const [color, setColor] = React.useState("#06b6d4");
    return (
      <ColorPicker
        value={color}
        onChange={setColor}
        presets={DEFAULT_PRESETS}
      />
    );
  },
};
