import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Checkbox } from "./index";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    checked: {
      control: "select",
      options: [true, false, "indeterminate"],
    },
  },
  args: {
    size: "md",
    disabled: false,
    checked: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => <Checkbox {...args} />,
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Checkbox />
        <Checkbox checked={true} />
        <Checkbox checked="indeterminate" />
        <Checkbox disabled />
        <Checkbox checked={true} disabled />
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
        <span style={{ width: 28, textAlign: "center" }}>off</span>
        <span style={{ width: 28, textAlign: "center" }}>on</span>
        <span style={{ width: 58, textAlign: "center" }}>indet.</span>
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
          <Checkbox size={size} />
          <Checkbox size={size} checked={true} />
          <Checkbox size={size} checked="indeterminate" />
          <Checkbox size={size} disabled />
        </div>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState<boolean | "indeterminate">(
      false,
    );
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Checkbox
          {...args}
          checked={checked}
          onCheckedChange={(val) => setChecked(val)}
        />
        <label style={{ fontSize: "14px" }}>
          {checked === "indeterminate"
            ? "Indeterminate"
            : checked
              ? "Checked"
              : "Unchecked"}
        </label>
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
      <Checkbox />
      <Checkbox checked={true} />
      <Checkbox checked="indeterminate" />
      <Checkbox disabled />
      <Checkbox checked={true} disabled />
    </div>
  ),
};
