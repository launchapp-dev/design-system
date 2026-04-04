import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ChatInput } from "./index";

const meta: Meta<typeof ChatInput> = {
  title: "Components/ChatInput",
  component: ChatInput,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "filled", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    sendButtonVariant: {
      control: "select",
      options: ["default", "outline", "ghost"],
    },
    disabled: { control: "boolean" },
    showCharacterCount: { control: "boolean" },
    maxLength: { control: "number" },
    placeholder: { control: "text" },
  },
  args: {
    variant: "default",
    size: "md",
    sendButtonVariant: "default",
    disabled: false,
    showCharacterCount: false,
    placeholder: "Type a message... (Enter to send, Shift+Enter for new line)",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Default: Story = {
  render: (args) => {
    const [messages, setMessages] = React.useState<string[]>([]);

    const handleSend = (value: string) => {
      setMessages((prev) => [...prev, value]);
    };

    return (
      <div className="space-y-4">
        <ChatInput {...args} onSend={handleSend} />
        {messages.length > 0 && (
          <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
            <strong>Sent messages:</strong>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              {messages.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

export const WithAttachments: Story = {
  render: (args) => {
    const handleSend = (value: string) => {
      console.log("Send:", value);
    };

    const handleAttachment = () => {
      console.log("Attachment clicked");
    };

    const handleVoice = () => {
      console.log("Voice clicked");
    };

    return (
      <ChatInput
        {...args}
        onSend={handleSend}
        onAttachment={handleAttachment}
        onVoice={handleVoice}
      />
    );
  },
};

export const WithCharacterCount: Story = {
  render: (args) => <ChatInput {...args} showCharacterCount maxLength={500} />,
};

export const Disabled: Story = {
  render: (args) => (
    <ChatInput {...args} disabled value="This input is disabled" />
  ),
};

export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <span className="text-xs text-muted-foreground mb-2 block">Small</span>
        <ChatInput size="sm" placeholder="Small input" />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-2 block">
          Medium (default)
        </span>
        <ChatInput size="md" placeholder="Medium input" />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-2 block">Large</span>
        <ChatInput size="lg" placeholder="Large input" />
      </div>
    </div>
  ),
};

export const StyleVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <span className="text-xs text-muted-foreground mb-2 block">
          Default
        </span>
        <ChatInput variant="default" placeholder="Default style" />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-2 block">Filled</span>
        <ChatInput variant="filled" placeholder="Filled style" />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-2 block">
          Outline
        </span>
        <ChatInput variant="outline" placeholder="Outline style" />
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div className="space-y-4 p-4 bg-background rounded-lg">
      <ChatInput placeholder="Type a message..." />
      <ChatInput variant="filled" placeholder="Filled variant..." />
      <ChatInput
        showCharacterCount
        maxLength={200}
        placeholder="With character count..."
      />
      <ChatInput disabled value="Disabled input" />
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const [message, setMessage] = React.useState("");
    const [chatHistory, setChatHistory] = React.useState<
      Array<{ text: string; sender: "user" | "assistant" }>
    >([{ text: "Hello! How can I help you today?", sender: "assistant" }]);

    const handleSend = (value: string) => {
      if (value.trim()) {
        setChatHistory((prev) => [...prev, { text: value, sender: "user" }]);
        setTimeout(() => {
          setChatHistory((prev) => [
            ...prev,
            { text: "This is a simulated response.", sender: "assistant" },
          ]);
        }, 1000);
      }
    };

    return (
      <div className="flex flex-col h-96 max-w-lg">
        <div className="flex-1 overflow-y-auto p-4 bg-muted/50 rounded-t-lg space-y-3">
          {chatHistory.map((chat, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                chat.sender === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-background border"
              }`}
            >
              {chat.text}
            </div>
          ))}
        </div>
        <ChatInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onSend={(value) => {
            handleSend(value);
            setMessage("");
          }}
          placeholder="Type your message..."
        />
      </div>
    );
  },
};
