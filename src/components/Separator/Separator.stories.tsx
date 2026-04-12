import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./index";

const meta = {
  title: "Components/Separator",
  component: Separator,
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    decorative: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: "300px" }}>
      <Separator {...args} />
    </div>
  ),
  args: {
    orientation: "horizontal",
    decorative: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "300px" }}>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "14px" }}>Horizontal</p>
        <Separator orientation="horizontal" />
      </div>
      <div style={{ display: "flex", alignItems: "center", height: "40px", gap: "16px" }}>
        <span style={{ fontSize: "14px" }}>Left</span>
        <Separator orientation="vertical" />
        <span style={{ fontSize: "14px" }}>Right</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "300px" }}>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px" }}>Full width</p>
        <Separator />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px" }}>Half width</p>
        <Separator style={{ width: "50%" }} />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px" }}>Fixed 100px</p>
        <Separator style={{ width: "100px" }} />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: (args) => (
    <div style={{ width: "300px", height: "60px", display: "flex", alignItems: "center" }}>
      <Separator {...args} />
    </div>
  ),
  args: {
    orientation: "horizontal",
    decorative: true,
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <Separator orientation="horizontal" />
      <div style={{ display: "flex", alignItems: "center", height: "40px", gap: "16px" }}>
        <span style={{ fontSize: "14px", color: "#fff" }}>Left</span>
        <Separator orientation="vertical" />
        <span style={{ fontSize: "14px", color: "#fff" }}>Right</span>
      </div>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "4px" }}>Between content blocks</p>
        <div>First section</div>
        <Separator style={{ margin: "8px 0" }} />
        <div>Second section</div>
      </div>
      <div style={{ display: "flex", height: "80px", alignItems: "stretch", gap: "8px" }}>
        <div>Col A</div>
        <Separator orientation="vertical" />
        <div>Col B</div>
        <Separator orientation="vertical" />
        <div>Col C</div>
      </div>
    </div>
  ),
};
