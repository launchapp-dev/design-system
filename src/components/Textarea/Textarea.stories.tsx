import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./index";
import { Label } from "../Label";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  argTypes: {
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
    },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    rows: { control: "number" },
    placeholder: { control: "text" },
  },
  args: {
    resize: "vertical",
    disabled: false,
    error: false,
    rows: 3,
    placeholder: "Type something...",
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: "320px" }}>
      <Textarea {...args} />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "8px" }}>
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" placeholder="Tell us about yourself..." rows={4} />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "4px" }}>
      <Label htmlFor="err-input">Description</Label>
      <Textarea id="err-input" error placeholder="This field is required" />
      <span style={{ fontSize: "12px", color: "hsl(var(--destructive))" }}>
        This field is required.
      </span>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <Textarea disabled value="This textarea is disabled and cannot be edited." rows={3} />
    </div>
  ),
};

export const ResizeVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "320px" }}>
      {(["none", "vertical", "horizontal", "both"] as const).map((resize) => (
        <div key={resize} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Label style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
            resize: {resize}
          </Label>
          <Textarea resize={resize} rows={2} placeholder={`resize: ${resize}`} />
        </div>
      ))}
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div
      style={{
        padding: "24px",
        background: "hsl(var(--background))",
        borderRadius: "8px",
        width: "320px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Textarea placeholder="Default textarea..." />
      <Textarea error placeholder="Error state..." />
      <Textarea disabled value="Disabled textarea" />
    </div>
  ),
};
