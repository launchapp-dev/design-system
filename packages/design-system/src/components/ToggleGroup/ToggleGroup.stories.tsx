import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "./index";

const meta: Meta<typeof ToggleGroup> = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    type: "single",
    variant: "default",
    size: "md",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {(["default", "outline"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "var(--muted-foreground)", textTransform: "capitalize" }}>{variant}</span>
          <ToggleGroup type="single" variant={variant} defaultValue="b">
            <ToggleGroupItem value="a">Left</ToggleGroupItem>
            <ToggleGroupItem value="b">Center</ToggleGroupItem>
            <ToggleGroupItem value="c">Right</ToggleGroupItem>
          </ToggleGroup>
        </div>
      ))}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>multiple selection</span>
        <ToggleGroup type="multiple" variant="outline" defaultValue={["a", "c"]}>
          <ToggleGroupItem value="a">Bold</ToggleGroupItem>
          <ToggleGroupItem value="b">Italic</ToggleGroupItem>
          <ToggleGroupItem value="c">Underline</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>disabled</span>
        <ToggleGroup type="single" variant="outline" disabled>
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: 24, fontSize: "12px", color: "var(--muted-foreground)" }}>{size}</span>
          <ToggleGroup type="single" size={size} variant="outline" defaultValue="b">
            <ToggleGroupItem value="a">A</ToggleGroupItem>
            <ToggleGroupItem value="b">B</ToggleGroupItem>
            <ToggleGroupItem value="c">C</ToggleGroupItem>
          </ToggleGroup>
        </div>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string>("b");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <ToggleGroup
          {...args}
          type="single"
          value={value}
          onValueChange={(v) => { if (v) setValue(v); }}
        >
          <ToggleGroupItem value="a">Option A</ToggleGroupItem>
          <ToggleGroupItem value="b">Option B</ToggleGroupItem>
          <ToggleGroupItem value="c">Option C</ToggleGroupItem>
        </ToggleGroup>
        <span style={{ fontSize: "14px", color: "var(--muted-foreground)" }}>
          Selected: {value}
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
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "24px", background: "hsl(var(--background))", borderRadius: "8px" }}>
      <ToggleGroup type="single" defaultValue="b">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
        <ToggleGroupItem value="c">C</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" variant="outline" defaultValue="a">
        <ToggleGroupItem value="a">Left</ToggleGroupItem>
        <ToggleGroupItem value="b">Center</ToggleGroupItem>
        <ToggleGroupItem value="c">Right</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="multiple" variant="outline" defaultValue={["a", "c"]}>
        <ToggleGroupItem value="a">Bold</ToggleGroupItem>
        <ToggleGroupItem value="b">Italic</ToggleGroupItem>
        <ToggleGroupItem value="c">Underline</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};
