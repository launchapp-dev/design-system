import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Switch } from "./index";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
  args: {
    size: "md",
    disabled: false,
    checked: false,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => <Switch {...args} />,
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Switch />
        <Switch checked={true} />
        <Switch disabled />
        <Switch checked={true} disabled />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "12px",
          color: "var(--muted-foreground)",
        }}
      >
        <span style={{ width: 40, textAlign: "center" }}>off</span>
        <span style={{ width: 40, textAlign: "center" }}>on</span>
        <span style={{ width: 52, textAlign: "center" }}>disabled</span>
        <span style={{ width: 72, textAlign: "center" }}>dis+on</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div
          key={size}
          style={{ display: "flex", alignItems: "center", gap: "16px" }}
        >
          <span
            style={{
              width: 24,
              fontSize: "12px",
              color: "var(--muted-foreground)",
            }}
          >
            {size}
          </span>
          <Switch size={size} />
          <Switch size={size} checked={true} />
          <Switch size={size} disabled />
        </div>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Switch {...args} checked={checked} onCheckedChange={setChecked} />
        <label style={{ fontSize: "14px" }}>{checked ? "On" : "Off"}</label>
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
        display: "flex",
        gap: "16px",
        padding: "24px",
        background: "hsl(var(--background))",
        borderRadius: "8px",
      }}
    >
      <Switch />
      <Switch checked={true} />
      <Switch disabled />
      <Switch checked={true} disabled />
    </div>
  ),
};
