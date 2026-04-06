import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./index";
import { Input } from "../Input/index";

const meta = {
  title: "Components/Label",
  component: Label,
  argTypes: {
    children: {
      control: "text",
    },
    htmlFor: {
      control: "text",
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Email address",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Label>Default label</Label>
      <Label htmlFor="input-linked">Label with htmlFor association</Label>
      <Label>
        Label with required indicator <span style={{ color: "red" }}>*</span>
      </Label>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "320px" }}>
        <Label htmlFor="paired-input">Paired with Input</Label>
        <Input id="paired-input" placeholder="Associated input" />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "320px" }}>
        <Label htmlFor="small-input">Label + Small input</Label>
        <Input id="small-input" size="sm" placeholder="Small" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "320px" }}>
        <Label htmlFor="medium-input">Label + Medium input</Label>
        <Input id="medium-input" size="md" placeholder="Medium" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "320px" }}>
        <Label htmlFor="large-input">Label + Large input</Label>
        <Input id="large-input" size="lg" placeholder="Large" />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    children: "Label text",
    htmlFor: "interactive-input",
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "320px" }}>
      <Label {...args} />
      <Input id="interactive-input" placeholder="Associated input" />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Label>Dark mode label</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "320px" }}>
        <Label htmlFor="dark-input">Paired dark mode</Label>
        <Input id="dark-input" placeholder="Dark input" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "320px" }}>
        <Label htmlFor="dark-error-input">Error state dark</Label>
        <Input id="dark-error-input" placeholder="Error input" error />
      </div>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "400px" }}>
      <Label>
        A very long label text that might wrap to multiple lines in a constrained layout scenario
      </Label>
      <Label>{""}</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <Label htmlFor="disabled-input">Label with disabled input (peer-disabled styling)</Label>
        <Input id="disabled-input" placeholder="Disabled" disabled />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <Label htmlFor="error-input">Label with error input</Label>
        <Input id="error-input" placeholder="Error state" error defaultValue="invalid@" />
      </div>
    </div>
  ),
};
