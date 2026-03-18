import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./index";

const meta = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    error: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "320px" }}>
      <Input placeholder="Default" />
      <Input placeholder="Error state" error />
      <Input placeholder="Disabled" disabled />
      <Input placeholder="With value" defaultValue="Filled content" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "320px" }}>
      <Input size="sm" placeholder="Small (sm)" />
      <Input size="md" placeholder="Medium (md)" />
      <Input size="lg" placeholder="Large (lg)" />
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    placeholder: "Type something...",
    size: "md",
    error: false,
    disabled: false,
  },
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
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "320px" }}>
      <Input placeholder="Default dark" />
      <Input placeholder="Error dark" error />
      <Input placeholder="Disabled dark" disabled />
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "320px" }}>
      <Input placeholder="A very long placeholder that might overflow the input field container" />
      <Input defaultValue="A very long value that might overflow the input field container area when typed" />
      <Input placeholder="" />
      <Input type="password" placeholder="Password input" defaultValue="secret" />
      <Input type="number" placeholder="Number input" defaultValue={42} />
    </div>
  ),
};
