import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  ChatBubble,
  ChatBubbleContent,
  ChatBubbleCode,
  ChatBubbleCodeInline,
} from "./index";

const meta: Meta<typeof ChatBubble> = {
  title: "Components/ChatBubble",
  component: ChatBubble,
  argTypes: {
    variant: {
      control: "select",
      options: ["user", "assistant", "system"],
    },
    showAvatar: { control: "boolean" },
    senderName: { control: "text" },
    timestamp: { control: "text" },
  },
  args: {
    variant: "assistant",
    showAvatar: true,
    senderName: "AI Assistant",
    timestamp: "2:34 PM",
  },
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 p-4">
      <ChatBubble {...args}>
        Hello! How can I help you today?
      </ChatBubble>
    </div>
  ),
};

export const UserMessage: Story = {
  args: {
    variant: "user",
    senderName: undefined,
    timestamp: "2:33 PM",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 p-4">
      <ChatBubble {...args}>
        Can you help me write a React component?
      </ChatBubble>
    </div>
  ),
};

export const SystemMessage: Story = {
  args: {
    variant: "system",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 p-4">
      <ChatBubble {...args}>
        New conversation started
      </ChatBubble>
    </div>
  ),
};

export const Conversation: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 max-w-2xl">
      <ChatBubble variant="user" timestamp="2:33 PM">
        Can you help me write a React component?
      </ChatBubble>
      <ChatBubble
        variant="assistant"
        senderName="AI Assistant"
        avatarInitials="AI"
        timestamp="2:34 PM"
      >
        <ChatBubbleContent>
          Of course! I'd be happy to help you write a React component. What kind of component are you looking to build?
        </ChatBubbleContent>
      </ChatBubble>
      <ChatBubble variant="user" timestamp="2:34 PM">
        A button component with variants
      </ChatBubble>
      <ChatBubble
        variant="assistant"
        senderName="AI Assistant"
        avatarInitials="AI"
        timestamp="2:35 PM"
      >
        <ChatBubbleContent>
          Here's a simple button component with variants:
        </ChatBubbleContent>
        <ChatBubbleCode>
{`import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "rounded-md font-medium",
  {
    variants: {
      variant: {
        primary: "bg-blue-500 text-white",
        secondary: "bg-gray-200 text-gray-900",
      },
    },
  }
);`}
        </ChatBubbleCode>
      </ChatBubble>
    </div>
  ),
};

export const WithCodeBlock: Story = {
  args: {
    variant: "assistant",
    senderName: "AI Assistant",
    avatarInitials: "AI",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 p-4 max-w-2xl">
      <ChatBubble {...args}>
        <ChatBubbleContent>
          Here's an example using the <ChatBubbleCodeInline>useState</ChatBubbleCodeInline> hook:
        </ChatBubbleContent>
        <ChatBubbleCode>
{`const [count, setCount] = useState(0);

const increment = () => {
  setCount(prev => prev + 1);
};`}
        </ChatBubbleCode>
        <ChatBubbleContent>
          This creates a simple counter that increments when you call the function.
        </ChatBubbleContent>
      </ChatBubble>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4 max-w-2xl">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase">User Message</span>
        <ChatBubble variant="user" timestamp="2:33 PM">
          This is a user message
        </ChatBubble>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase">Assistant Message</span>
        <ChatBubble variant="assistant" senderName="AI" timestamp="2:34 PM">
          This is an assistant message
        </ChatBubble>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase">System Message</span>
        <ChatBubble variant="system" timestamp="2:30 PM">
          System notification
        </ChatBubble>
      </div>
    </div>
  ),
};
