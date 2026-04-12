import type { Meta, StoryObj } from "@storybook/react";
import { MessageBubbles } from "./MessageBubbles";
import type { BubbleMessage } from "./MessageBubbles";

const mockMessages: BubbleMessage[] = [
  {
    id: "1",
    content: "Hey! How's the design system coming along?",
    sender: "received",
    senderName: "Alice",
    avatarInitials: "AL",
    timestamp: "9:41 AM",
  },
  {
    id: "2",
    content: "Really well! Just finished the new block patterns.",
    sender: "sent",
    timestamp: "9:42 AM",
  },
  {
    id: "3",
    content: "That's awesome. Can I see a preview?",
    sender: "received",
    senderName: "Alice",
    avatarInitials: "AL",
    timestamp: "9:42 AM",
  },
  {
    id: "4",
    content: "Sure! Deploying to Storybook now. Should be live in a few minutes.",
    sender: "sent",
    timestamp: "9:43 AM",
  },
  {
    id: "5",
    content: "Perfect. I'll check it out after the standup.",
    sender: "received",
    senderName: "Alice",
    avatarInitials: "AL",
    timestamp: "9:44 AM",
  },
];

const meta: Meta<typeof MessageBubbles> = {
  title: "Blocks/Messaging/MessageBubbles",
  component: MessageBubbles,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { MessageBubbles } from "@launchapp/design-system/blocks/messaging";

export default function Chat() {
  return <MessageBubbles messages={messages} />;
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MessageBubbles>;

export const Default: Story = {
  render: (args) => (
    <div
      style={{
        maxWidth: 480,
        border: "1px solid var(--la-border)",
        borderRadius: "0.75rem",
        overflow: "hidden",
      }}
    >
      <MessageBubbles {...args} />
    </div>
  ),
  args: {
    messages: mockMessages,
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "24px" }}>
      <div
        style={{
          maxWidth: 480,
          border: "1px solid var(--la-border)",
          borderRadius: "0.75rem",
          overflow: "hidden",
        }}
      >
        <MessageBubbles {...args} />
      </div>
    </div>
  ),
  args: {
    messages: mockMessages,
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => (
    <div style={{ padding: "16px" }}>
      <MessageBubbles {...args} />
    </div>
  ),
  args: {
    messages: mockMessages,
  },
};
