import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AICommandBar } from "./index";

const meta: Meta<typeof AICommandBar> = {
  title: "Components/AICommandBar",
  component: AICommandBar,
  argTypes: {
    open: { control: "boolean" },
    placeholder: { control: "text" },
    aiPlaceholder: { control: "text" },
  },
  args: {
    open: true,
    placeholder: "Search commands...",
    aiPlaceholder: "Ask AI anything...",
  },
};

export default meta;
type Story = StoryObj<typeof AICommandBar>;

const sampleCommands = [
  { id: "1", label: "Open Settings", description: "⌘," },
  { id: "2", label: "New Document", description: "⌘N" },
  { id: "3", label: "Search Files", description: "⌘P" },
  { id: "4", label: "Toggle Sidebar", description: "⌘B" },
];

const sampleAISuggestions = [
  { id: "1", label: "Summarize this document", description: "AI" },
  { id: "2", label: "Explain the selected code", description: "AI" },
  { id: "3", label: "Fix grammar and spelling", description: "AI" },
];

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(args.open ?? true);
    return (
      <div style={{ minHeight: 400 }}>
        <button
          onClick={() => setOpen(true)}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Open Command Bar
        </button>
        <AICommandBar
          {...args}
          open={open}
          onOpenChange={setOpen}
          commands={sampleCommands}
          aiSuggestions={sampleAISuggestions}
          onAIQuery={(q) => alert(`AI query: ${q}`)}
        />
      </div>
    );
  },
};

export const CommandMode: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <div style={{ minHeight: 400 }}>
        <AICommandBar
          open={open}
          onOpenChange={setOpen}
          commands={sampleCommands}
          placeholder="Search commands..."
        />
      </div>
    );
  },
};

export const AIMode: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <div style={{ minHeight: 400 }}>
        <AICommandBar
          open={open}
          onOpenChange={setOpen}
          aiSuggestions={sampleAISuggestions}
          aiPlaceholder="Ask AI anything..."
          onAIQuery={(q) => console.log("AI query:", q)}
        />
      </div>
    );
  },
};
