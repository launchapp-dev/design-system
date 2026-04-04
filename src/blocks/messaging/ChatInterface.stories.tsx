import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ChatInterface } from "./ChatInterface";
import type { BubbleMessage } from "./MessageBubbles";

const initialMessages: BubbleMessage[] = [
  {
    id: "1",
    content: "Hey! How's it going?",
    sender: "received",
    senderName: "Alice",
    avatarInitials: "AL",
    timestamp: "9:30 AM",
  },
  {
    id: "2",
    content: "Great! Just finished the new component library.",
    sender: "sent",
    timestamp: "9:31 AM",
  },
  {
    id: "3",
    content: "That's amazing! Send me the link when it's ready.",
    sender: "received",
    senderName: "Alice",
    avatarInitials: "AL",
    timestamp: "9:32 AM",
  },
];

const meta: Meta<typeof ChatInterface> = {
  title: "Blocks/Messaging/ChatInterface",
  component: ChatInterface,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { ChatInterface } from "@launchapp/design-system/blocks/messaging";

export default function Page() {
  const [messages, setMessages] = useState(initialMessages);

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), content: text, sender: "sent", timestamp: "Now" },
    ]);
  };

  return <ChatInterface messages={messages} onSend={handleSend} title="Support chat" />;
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatInterface>;

const InteractiveTemplate = (
  args: React.ComponentProps<typeof ChatInterface>,
) => {
  const [messages, setMessages] = React.useState(args.messages);
  const [isTyping, setIsTyping] = React.useState(false);

  const handleSend = (text: string) => {
    const userMsg: BubbleMessage = {
      id: Date.now().toString(),
      content: text,
      sender: "sent",
      timestamp: "Now",
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "Thanks for your message! I'll get back to you shortly.",
          sender: "received",
          senderName: "Alice",
          avatarInitials: "AL",
          timestamp: "Now",
        },
      ]);
    }, 2000);
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <ChatInterface
        {...args}
        messages={messages}
        isTyping={isTyping}
        onSend={handleSend}
      />
    </div>
  );
};

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    title: "Support chat",
    messages: initialMessages,
    placeholder: "Type a message…",
  },
};

export const WithTyping: Story = {
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <ChatInterface {...args} />
    </div>
  ),
  args: {
    title: "Team chat",
    messages: initialMessages,
    isTyping: true,
    typingLabel: "Alice is typing…",
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div
      className="dark"
      style={{ background: "hsl(240 10% 3.9%)", padding: "24px" }}
    >
      <div style={{ maxWidth: 480 }}>
        <ChatInterface {...args} />
      </div>
    </div>
  ),
  args: {
    title: "Support chat",
    messages: initialMessages,
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: InteractiveTemplate,
  args: {
    title: "Support chat",
    messages: initialMessages,
  },
};
