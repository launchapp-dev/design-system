import type { Meta, StoryObj } from "@storybook/react";
import { ThinkingIndicator } from "./index";

const meta: Meta<typeof ThinkingIndicator> = {
  title: "Components/ThinkingIndicator",
  component: ThinkingIndicator,
  argTypes: {
    isThinking: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    isThinking: true,
    label: "Thinking",
  },
};

export default meta;
type Story = StoryObj<typeof ThinkingIndicator>;

export const Default: Story = {};

export const WithReasoningChain: Story = {
  args: {
    isThinking: true,
    label: "Analyzing",
    steps: [
      { label: "Searching knowledge base", status: "done" },
      { label: "Analyzing relevant documents", status: "done" },
      { label: "Synthesizing response", status: "active" },
      { label: "Formatting output", status: "pending" },
    ],
  },
};

export const DoneThinking: Story = {
  args: {
    isThinking: false,
    label: "Done",
    steps: [
      { label: "Searched knowledge base", status: "done" },
      { label: "Analyzed documents", status: "done" },
      { label: "Synthesized response", status: "done" },
    ],
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <p style={{ fontSize: 12, marginBottom: 8, color: "gray" }}>Thinking</p>
        <ThinkingIndicator isThinking={true} label="Thinking" />
      </div>
      <div>
        <p style={{ fontSize: 12, marginBottom: 8, color: "gray" }}>With steps</p>
        <ThinkingIndicator
          isThinking={true}
          label="Analyzing"
          steps={[
            { label: "Searching...", status: "done" },
            { label: "Processing...", status: "active" },
            { label: "Responding...", status: "pending" },
          ]}
        />
      </div>
      <div>
        <p style={{ fontSize: 12, marginBottom: 8, color: "gray" }}>Done</p>
        <ThinkingIndicator isThinking={false} label="Complete" />
      </div>
    </div>
  ),
};
