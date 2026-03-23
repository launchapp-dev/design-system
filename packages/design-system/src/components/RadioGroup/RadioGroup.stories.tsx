import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { RadioGroup, RadioGroupItem } from "./index";
import { Label } from "../Label";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    orientation: "vertical",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-1" {...args}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="option-1" id="r1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="option-2" id="r2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="option-3" id="r3" />
        <Label htmlFor="r3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="a" orientation="horizontal" style={{ gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="a" id="ha" />
        <Label htmlFor="ha">Alpha</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="b" id="hb" />
        <Label htmlFor="hb">Beta</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="c" id="hc" />
        <Label htmlFor="hc">Gamma</Label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1" disabled>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="option-1" id="d1" />
        <Label htmlFor="d1">Option 1 (selected)</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="option-2" id="d2" />
        <Label htmlFor="d2">Option 2</Label>
      </div>
    </RadioGroup>
  ),
};

export const SingleItemDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="option-1" id="s1" />
        <Label htmlFor="s1">Available</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="option-2" id="s2" disabled />
        <Label htmlFor="s2" style={{ opacity: 0.5 }}>Disabled item</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="option-3" id="s3" />
        <Label htmlFor="s3">Available</Label>
      </div>
    </RadioGroup>
  ),
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div style={{ padding: "24px", background: "hsl(var(--background))", borderRadius: "8px" }}>
      <RadioGroup defaultValue="option-1">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <RadioGroupItem value="option-1" id="dk1" />
          <Label htmlFor="dk1">Dark Option 1</Label>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <RadioGroupItem value="option-2" id="dk2" />
          <Label htmlFor="dk2">Dark Option 2</Label>
        </div>
      </RadioGroup>
    </div>
  ),
};
