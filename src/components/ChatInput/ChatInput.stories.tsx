import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ChatInput } from "./index";
import type { AttachmentFile } from "./index";

const meta: Meta<typeof ChatInput> = {
  title: "Components/ChatInput",
  component: ChatInput,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    showAttachmentButton: { control: "boolean" },
    showVoiceButton: { control: "boolean" },
    showSendButton: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    size: "md",
    disabled: false,
    showAttachmentButton: true,
    showVoiceButton: true,
    showSendButton: true,
    placeholder: "Type a message...",
  },
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    return (
      <div className="max-w-2xl p-4">
        <ChatInput
          {...args}
          value={value}
          onChange={setValue}
          onSend={(v) => {
            alert(`Sent: ${v}`);
            setValue("");
          }}
        />
      </div>
    );
  },
};

export const WithAttachments: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    const [attachments, setAttachments] = React.useState<AttachmentFile[]>([
      { id: "1", name: "document.pdf", size: 245000, type: "application/pdf" },
      { id: "2", name: "image.png", size: 120000, type: "image/png", preview: "https://placehold.co/24x24" },
    ]);
    return (
      <div className="max-w-2xl p-4">
        <ChatInput
          {...args}
          value={value}
          onChange={setValue}
          attachments={attachments}
          onRemoveAttachment={(id) => setAttachments(prev => prev.filter(a => a.id !== id))}
          onAttachment={() => alert("Open file picker")}
          onSend={(v) => {
            alert(`Sent: ${v}`);
            setValue("");
          }}
        />
      </div>
    );
  },
};

export const WithMaxLength: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    return (
      <div className="max-w-2xl p-4">
        <ChatInput
          {...args}
          value={value}
          onChange={setValue}
          maxLength={100}
          onSend={(v) => {
            alert(`Sent: ${v}`);
            setValue("");
          }}
        />
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [values, setValues] = React.useState({ sm: "", md: "", lg: "" });
    return (
      <div className="flex flex-col gap-4 p-4 max-w-2xl">
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase">{size}</span>
            <ChatInput
              size={size}
              value={values[size]}
              onChange={(v) => setValues(prev => ({ ...prev, [size]: v }))}
              placeholder={`Size: ${size}`}
              onSend={(v) => alert(`Sent (${size}): ${v}`)}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const MinimalControls: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    return (
      <div className="max-w-2xl p-4">
        <ChatInput
          {...args}
          value={value}
          onChange={setValue}
          showAttachmentButton={false}
          showVoiceButton={false}
          onSend={(v) => {
            alert(`Sent: ${v}`);
            setValue("");
          }}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="max-w-2xl p-4">
      <ChatInput
        {...args}
        value="This input is disabled"
        disabled
      />
    </div>
  ),
};
