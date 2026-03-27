import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { Button } from "../Button";
import { ThinkingIndicator } from "../ThinkingIndicator";
import { ChatBubble, ChatBubbleGroup } from "../ChatBubble";
import { Input } from "../Input";
import {
  CopilotPanel,
  CopilotPanelTrigger,
  CopilotPanelClose,
  CopilotPanelHeader,
  CopilotPanelTitle,
  CopilotPanelDescription,
  CopilotPanelContent,
  CopilotPanelFooter,
  CopilotPanelContext,
  CopilotPanelContextList,
  CopilotPanelSuggestions,
  CopilotPanelSuggestion,
  CopilotPanelDivider,
  CopilotPanelInput,
  CopilotPanelChatHistory,
} from "./index";

const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SparkleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const WandIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 4V2" />
    <path d="M15 16v-2" />
    <path d="M8 9h2" />
    <path d="M20 9h2" />
    <path d="M17.8 11.8 19 13" />
    <path d="M15 9h0" />
    <path d="M17.8 6.2 19 5" />
    <path d="m3 21 9-9" />
    <path d="M12.2 6.2 11 5" />
  </svg>
);

const LightbulbIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

const RefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
);

const meta: Meta<typeof CopilotPanel> = {
  title: "Components/CopilotPanel",
  component: CopilotPanel,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
      description: "Width of the panel",
    },
  },
  args: {
    size: "md",
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof CopilotPanel>;

const DefaultPanelContent = () => (
  <>
    <CopilotPanelHeader>
      <CopilotPanelTitle>
        <SparkleIcon />
        AI Assistant
      </CopilotPanelTitle>
      <CopilotPanelDescription>
        Ask me anything about your project
      </CopilotPanelDescription>
    </CopilotPanelHeader>

    <CopilotPanelContent>
      <CopilotPanelContextList>
        <CopilotPanelContext
          icon={<FileIcon />}
          label="Current file"
          value="src/components/Button.tsx"
        />
        <CopilotPanelContext
          icon={<UserIcon />}
          label="Assigned to"
          value="Sarah Chen"
        />
      </CopilotPanelContextList>

      <CopilotPanelDivider />

      <CopilotPanelSuggestions title="Quick actions">
        <CopilotPanelSuggestion icon={<WandIcon />}>
          Generate tests
        </CopilotPanelSuggestion>
        <CopilotPanelSuggestion icon={<LightbulbIcon />}>
          Explain code
        </CopilotPanelSuggestion>
        <CopilotPanelSuggestion variant="primary" icon={<RefreshIcon />}>
          Refactor
        </CopilotPanelSuggestion>
        <CopilotPanelSuggestion variant="secondary">
          Add comments
        </CopilotPanelSuggestion>
      </CopilotPanelSuggestions>

      <CopilotPanelDivider />

      <ChatBubbleGroup>
        <ChatBubble variant="assistant" avatarFallback="AI">
          I can help you with the Button component. What would you like to do?
        </ChatBubble>
      </ChatBubbleGroup>
    </CopilotPanelContent>

    <CopilotPanelFooter>
      <div className="flex gap-2">
        <Input placeholder="Ask a question..." className="flex-1" />
        <Button size="sm">Send</Button>
      </div>
    </CopilotPanelFooter>
  </>
);

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative h-[600px] w-full overflow-hidden rounded-lg border bg-background">
        <div className="flex h-full items-center justify-center">
          <Button onClick={() => setOpen(true)}>Open Copilot</Button>
        </div>
        <CopilotPanel {...args} open={open} onOpenChange={setOpen}>
          <DefaultPanelContent />
        </CopilotPanel>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [openSm, setOpenSm] = useState(false);
    const [openMd, setOpenMd] = useState(false);
    const [openLg, setOpenLg] = useState(false);

    return (
      <div className="flex h-[500px] w-full items-center justify-center gap-4">
        <Button onClick={() => setOpenSm(true)}>Small Panel</Button>
        <Button onClick={() => setOpenMd(true)}>Medium Panel</Button>
        <Button onClick={() => setOpenLg(true)}>Large Panel</Button>

        <CopilotPanel size="sm" open={openSm} onOpenChange={setOpenSm}>
          <DefaultPanelContent />
        </CopilotPanel>
        <CopilotPanel size="md" open={openMd} onOpenChange={setOpenMd}>
          <DefaultPanelContent />
        </CopilotPanel>
        <CopilotPanel size="lg" open={openLg} onOpenChange={setOpenLg}>
          <DefaultPanelContent />
        </CopilotPanel>
      </div>
    );
  },
};

export const WithThinkingIndicator: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative h-[600px] w-full overflow-hidden rounded-lg border bg-background">
        <div className="flex h-full items-center justify-center">
          <Button onClick={() => setOpen(true)}>Open Copilot</Button>
        </div>
        <CopilotPanel {...args} open={open} onOpenChange={setOpen}>
          <CopilotPanelHeader>
            <CopilotPanelTitle>
              <SparkleIcon />
              AI Assistant
            </CopilotPanelTitle>
            <CopilotPanelDescription>
              Processing your request
            </CopilotPanelDescription>
          </CopilotPanelHeader>

          <CopilotPanelContent>
            <CopilotPanelContextList>
              <CopilotPanelContext
                icon={<FileIcon />}
                label="Analyzing"
                value="src/components/Button.tsx"
              />
            </CopilotPanelContextList>

            <CopilotPanelDivider />

            <ThinkingIndicator
              variant="chain"
              steps={[
                "Reading file contents...",
                "Analyzing code structure...",
                "Generating suggestions...",
              ]}
              currentStep={2}
            />
          </CopilotPanelContent>

          <CopilotPanelFooter>
            <CopilotPanelClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </CopilotPanelClose>
          </CopilotPanelFooter>
        </CopilotPanel>
      </div>
    );
  },
};

export const SuggestionVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">Default</h4>
        <div className="flex flex-wrap gap-2">
          <CopilotPanelSuggestion icon={<WandIcon />}>Generate code</CopilotPanelSuggestion>
          <CopilotPanelSuggestion icon={<LightbulbIcon />}>Explain</CopilotPanelSuggestion>
          <CopilotPanelSuggestion icon={<RefreshIcon />}>Refactor</CopilotPanelSuggestion>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">Primary</h4>
        <div className="flex flex-wrap gap-2">
          <CopilotPanelSuggestion variant="primary" icon={<SparkleIcon />}>
            AI Suggest
          </CopilotPanelSuggestion>
          <CopilotPanelSuggestion variant="primary">Quick Fix</CopilotPanelSuggestion>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">Secondary</h4>
        <div className="flex flex-wrap gap-2">
          <CopilotPanelSuggestion variant="secondary">Add docs</CopilotPanelSuggestion>
          <CopilotPanelSuggestion variant="secondary">Format code</CopilotPanelSuggestion>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">Mixed</h4>
        <CopilotPanelSuggestions title="Quick actions">
          <CopilotPanelSuggestion icon={<WandIcon />}>Generate tests</CopilotPanelSuggestion>
          <CopilotPanelSuggestion variant="primary" icon={<SparkleIcon />}>
            AI Fix
          </CopilotPanelSuggestion>
          <CopilotPanelSuggestion variant="secondary">Add types</CopilotPanelSuggestion>
          <CopilotPanelSuggestion icon={<LightbulbIcon />}>Explain code</CopilotPanelSuggestion>
          <CopilotPanelSuggestion variant="primary">Optimize</CopilotPanelSuggestion>
        </CopilotPanelSuggestions>
      </div>
    </div>
  ),
};

export const ContextDisplay: Story = {
  render: () => (
    <div className="max-w-md space-y-4 p-6">
      <CopilotPanelContextList>
        <CopilotPanelContext
          icon={<FileIcon />}
          label="Current file"
          value="src/components/Button/Button.tsx"
        />
        <CopilotPanelContext
          icon={<UserIcon />}
          label="Author"
          value="John Doe"
        />
        <CopilotPanelContext
          icon={<FileIcon />}
          label="Related files"
        >
          <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
            <li>Button.test.tsx</li>
            <li>Button.stories.tsx</li>
            <li>index.ts</li>
          </ul>
        </CopilotPanelContext>
      </CopilotPanelContextList>
    </div>
  ),
};

export const FullExample: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
      {
        role: "assistant",
        content: "I can help you build better components. What would you like assistance with?",
      },
    ]);

    const handleSend = (value: string) => {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: value },
        {
          role: "assistant",
          content: "I understand. Let me help you with that. What specific aspect would you like to focus on?",
        },
      ]);
    };

    return (
      <div className="relative h-[700px] w-full overflow-hidden rounded-lg border bg-background">
        <div className="flex h-full items-center justify-center">
          <Button onClick={() => setOpen(true)}>
            <SparkleIcon />
            Open AI Copilot
          </Button>
        </div>

        <CopilotPanel {...args} open={open} onOpenChange={setOpen}>
          <CopilotPanelHeader>
            <CopilotPanelTitle>
              <SparkleIcon />
              Code Copilot
            </CopilotPanelTitle>
            <CopilotPanelDescription>
              Your AI-powered coding assistant
            </CopilotPanelDescription>
          </CopilotPanelHeader>

          <CopilotPanelContent>
            <CopilotPanelContextList>
              <CopilotPanelContext
                icon={<FileIcon />}
                label="Working on"
                value="src/components/CopilotPanel/CopilotPanel.tsx"
              />
              <CopilotPanelContext
                icon={<UserIcon />}
                label="Branch"
                value="feature/copilot-panel"
              />
            </CopilotPanelContextList>

            <CopilotPanelDivider />

            <CopilotPanelSuggestions title="Suggested actions">
              <CopilotPanelSuggestion
                variant="primary"
                icon={<WandIcon />}
                onClick={() => handleSend("Complete component")}
              >
                Complete component
              </CopilotPanelSuggestion>
              <CopilotPanelSuggestion
                icon={<LightbulbIcon />}
                onClick={() => handleSend("Add JSDoc comments")}
              >
                Add JSDoc comments
              </CopilotPanelSuggestion>
              <CopilotPanelSuggestion
                icon={<RefreshIcon />}
                onClick={() => handleSend("Generate tests")}
              >
                Generate tests
              </CopilotPanelSuggestion>
              <CopilotPanelSuggestion variant="secondary" onClick={() => handleSend("Create story")}>
                Create story
              </CopilotPanelSuggestion>
            </CopilotPanelSuggestions>

            <CopilotPanelDivider />

            <CopilotPanelChatHistory>
              <ChatBubbleGroup>
                {messages.map((msg, idx) => (
                  <ChatBubble
                    key={idx}
                    variant={msg.role === "user" ? "user" : "assistant"}
                    avatarFallback={msg.role === "user" ? "You" : "AI"}
                  >
                    {msg.content}
                  </ChatBubble>
                ))}
              </ChatBubbleGroup>
            </CopilotPanelChatHistory>
          </CopilotPanelContent>

          <CopilotPanelFooter>
            <CopilotPanelInput onSend={handleSend} />
            <CopilotPanelSuggestions title="Follow-up">
              <CopilotPanelSuggestion
                onClick={() => handleSend("Tell me more")}
                className="text-xs px-2 py-1"
              >
                Tell me more
              </CopilotPanelSuggestion>
              <CopilotPanelSuggestion
                onClick={() => handleSend("Show code example")}
                className="text-xs px-2 py-1"
              >
                Code example
              </CopilotPanelSuggestion>
            </CopilotPanelSuggestions>
          </CopilotPanelFooter>
        </CopilotPanel>
      </div>
    );
  },
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative h-[600px] w-full overflow-hidden rounded-lg border border-border bg-background">
        <div className="flex h-full items-center justify-center">
          <Button onClick={() => setOpen(true)}>Open Copilot</Button>
        </div>
        <CopilotPanel {...args} open={open} onOpenChange={setOpen}>
          <DefaultPanelContent />
        </CopilotPanel>
      </div>
    );
  },
};

export const WithKeyboardNavigation: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
      {
        role: "assistant",
        content:
          "Welcome! This panel supports full keyboard navigation. Try tabbing through elements, using arrow keys on suggestions, and pressing Enter to send messages. Press Escape to close.",
      },
    ]);
    const inputRef = React.useRef<HTMLTextAreaElement>(null);

    const handleSend = (value: string) => {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: value },
        { role: "assistant", content: `You said: "${value}". Great input!` },
      ]);
      setTimeout(() => inputRef.current?.focus(), 0);
    };

    const handleSuggestionClick = (suggestion: string) => {
      handleSend(suggestion);
    };

    return (
      <div className="relative h-[600px] w-full overflow-hidden rounded-lg border bg-background">
        <div className="flex h-full items-center justify-center gap-4">
          <div className="text-center">
            <p className="mb-2 text-sm text-muted-foreground">
              Keyboard Navigation Demo
            </p>
            <Button onClick={() => setOpen(true)}>Open Panel</Button>
            <p className="mt-4 text-xs text-muted-foreground max-w-xs">
              Try: Tab through elements, Space/Enter on suggestions, Ctrl+Enter for new line, Escape to close
            </p>
          </div>
        </div>

        <CopilotPanel {...args} open={open} onOpenChange={setOpen}>
          <CopilotPanelHeader>
            <CopilotPanelTitle>
              <SparkleIcon />
              Keyboard Navigation Demo
            </CopilotPanelTitle>
            <CopilotPanelDescription>
              Try keyboard navigation (Tab, Arrow keys, Enter, Escape)
            </CopilotPanelDescription>
          </CopilotPanelHeader>

          <CopilotPanelContent>
            <CopilotPanelSuggestions title="Interactive suggestions (focusable via Tab)">
              <CopilotPanelSuggestion
                variant="primary"
                icon={<WandIcon />}
                onClick={() => handleSuggestionClick("Implement keyboard navigation")}
              >
                Implement keyboard nav
              </CopilotPanelSuggestion>
              <CopilotPanelSuggestion
                icon={<LightbulbIcon />}
                onClick={() => handleSuggestionClick("Add focus management")}
              >
                Add focus management
              </CopilotPanelSuggestion>
              <CopilotPanelSuggestion
                onClick={() => handleSuggestionClick("Test accessibility")}
              >
                Test a11y
              </CopilotPanelSuggestion>
            </CopilotPanelSuggestions>

            <CopilotPanelDivider />

            <CopilotPanelChatHistory>
              <ChatBubbleGroup>
                {messages.map((msg, idx) => (
                  <ChatBubble
                    key={idx}
                    variant={msg.role === "user" ? "user" : "assistant"}
                    avatarFallback={msg.role === "user" ? "You" : "AI"}
                  >
                    {msg.content}
                  </ChatBubble>
                ))}
              </ChatBubbleGroup>
            </CopilotPanelChatHistory>
          </CopilotPanelContent>

          <CopilotPanelFooter>
            <CopilotPanelInput
              ref={inputRef}
              onSend={handleSend}
              placeholder="Type message (Enter to send, Shift+Enter for new line)..."
            />
          </CopilotPanelFooter>
        </CopilotPanel>
      </div>
    );
  },
};
