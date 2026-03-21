import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ThinkingIndicator } from "./index";

const meta: Meta<typeof ThinkingIndicator> = {
  title: "Components/ThinkingIndicator",
  component: ThinkingIndicator,
  argTypes: {
    label: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Thinking…",
    size: "md",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>Small</p>
        <ThinkingIndicator size="sm" label="Thinking…" />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>Medium (default)</p>
        <ThinkingIndicator size="md" label="Thinking…" />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>Large</p>
        <ThinkingIndicator size="lg" label="Thinking…" />
      </div>
    </div>
  ),
};

export const CustomLabels: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <ThinkingIndicator label="Analyzing your request…" />
      <ThinkingIndicator label="Processing…" />
      <ThinkingIndicator label="Generating response…" />
      <ThinkingIndicator label="Searching knowledge base…" />
    </div>
  ),
};

export const WithoutLabel: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>Without visible label</p>
        <ThinkingIndicator label="" />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>With aria-label only</p>
        <ThinkingIndicator label="AI is thinking" />
      </div>
    </div>
  ),
};

export const InChatContext: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
      <div className="flex justify-end">
        <div className="rounded-2xl bg-primary px-4 py-2 text-primary-foreground">
          Can you help me understand quantum computing?
        </div>
      </div>
      <div className="flex justify-start">
        <ThinkingIndicator label="Thinking…" />
      </div>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <ThinkingIndicator size="sm" label="Thinking…" />
      <ThinkingIndicator size="md" label="Analyzing…" />
      <ThinkingIndicator size="lg" label="Processing…" />
    </div>
  ),
};
