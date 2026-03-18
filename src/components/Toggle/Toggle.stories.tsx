import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Toggle } from "./index";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    pressed: { control: "boolean" },
  },
  args: {
    variant: "default",
    size: "md",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: (args) => <Toggle {...args}>Toggle</Toggle>,
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {(["default", "outline"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "var(--muted-foreground)", textTransform: "capitalize" }}>{variant}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Toggle variant={variant}>Idle</Toggle>
            <Toggle variant={variant} defaultPressed>Pressed</Toggle>
            <Toggle variant={variant} disabled>Disabled</Toggle>
            <Toggle variant={variant} defaultPressed disabled>Dis+Pressed</Toggle>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: 24, fontSize: "12px", color: "var(--muted-foreground)" }}>{size}</span>
          <Toggle size={size}>Idle</Toggle>
          <Toggle size={size} defaultPressed>Pressed</Toggle>
          <Toggle size={size} variant="outline">Outline</Toggle>
          <Toggle size={size} variant="outline" defaultPressed>Out+Press</Toggle>
        </div>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: (args) => {
    const [pressed, setPressed] = React.useState(false);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Toggle {...args} pressed={pressed} onPressedChange={setPressed}>
          {pressed ? "On" : "Off"}
        </Toggle>
        <span style={{ fontSize: "14px", color: "var(--muted-foreground)" }}>
          State: {pressed ? "pressed" : "idle"}
        </span>
      </div>
    );
  },
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div style={{ display: "flex", gap: "8px", padding: "24px", background: "hsl(var(--background))", borderRadius: "8px" }}>
      <Toggle>Idle</Toggle>
      <Toggle defaultPressed>Pressed</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle variant="outline" defaultPressed>Out+Press</Toggle>
      <Toggle disabled>Disabled</Toggle>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "300px" }}>
      <Toggle>Short</Toggle>
      <Toggle>A toggle with a much longer label text</Toggle>
      <Toggle variant="outline">Another long label that may wrap</Toggle>
    </div>
  ),
};
