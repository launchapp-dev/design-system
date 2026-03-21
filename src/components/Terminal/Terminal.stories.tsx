import type { Meta, StoryObj } from "@storybook/react";
import { Terminal } from "./Terminal";
import { useState } from "react";

const meta = {
  title: "Components/Rich Media/Terminal",
  component: Terminal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "light", "green"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    typing: {
      control: "boolean",
    },
    typingSpeed: {
      control: { type: "range", min: 10, max: 200 },
    },
  },
} satisfies Meta<typeof Terminal>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleLines = [
  { content: "npm install @design-system/react", type: "input" as const },
  { content: "", type: "output" as const },
  { content: "added 125 packages in 3.2s", type: "success" as const },
  { content: "", type: "output" as const },
  { content: "npm run dev", type: "input" as const },
  { content: "", type: "output" as const },
  { content: "  VITE v5.0.0  ready in 234 ms", type: "info" as const },
  { content: "", type: "output" as const },
  { content: "  ➜  Local:   http://localhost:5173/", type: "output" as const },
  { content: "  ➜  Network: http://192.168.1.100:5173/", type: "output" as const },
];

const errorLines = [
  { content: "npm run build", type: "input" as const },
  { content: "", type: "output" as const },
  { content: "Error: Cannot find module './utils'", type: "error" as const },
  { content: "    at Module._resolveFilename (node:internal/modules/cjs/loader:1077:15)", type: "error" as const },
  { content: "", type: "output" as const },
  { content: "Build failed with 1 error", type: "error" as const },
];

export const Default: Story = {
  args: {
    lines: sampleLines,
    title: "Terminal",
    typing: false,
    variant: "default",
    size: "md",
    className: "w-full max-w-xl",
  },
};

export const Typing: Story = {
  args: {
    lines: sampleLines,
    title: "Terminal",
    typing: true,
    typingSpeed: 30,
    variant: "default",
    className: "w-full max-w-xl",
  },
};

export const WithErrors: Story = {
  args: {
    lines: errorLines,
    title: "Build Output",
    typing: false,
    variant: "default",
    className: "w-full max-w-xl",
  },
};

export const GreenScreen: Story = {
  args: {
    lines: sampleLines,
    title: "Legacy Terminal",
    typing: false,
    variant: "green",
    className: "w-full max-w-xl",
  },
};

export const Light: Story = {
  args: {
    lines: sampleLines,
    title: "Light Terminal",
    typing: false,
    variant: "light",
    className: "w-full max-w-xl",
  },
};

export const Small: Story = {
  args: {
    lines: sampleLines.slice(0, 5),
    title: "Terminal",
    typing: false,
    size: "sm",
    className: "w-full max-w-md",
  },
};

export const Large: Story = {
  args: {
    lines: sampleLines,
    title: "Terminal",
    typing: false,
    size: "lg",
    className: "w-full max-w-2xl",
  },
};

export const WithoutControls: Story = {
  args: {
    lines: sampleLines,
    title: "Terminal",
    showControls: false,
    className: "w-full max-w-xl",
  },
};

export const Interactive: Story = {
  render: () => {
    const [isTyping, setIsTyping] = useState(false);
    const [lines, setLines] = useState<typeof sampleLines>([]);

    const handleStartTyping = () => {
      setLines(sampleLines);
      setIsTyping(true);
    };

    const handleTypingComplete = () => {
      setIsTyping(false);
    };

    return (
      <div className="flex flex-col gap-4">
        <Terminal
          lines={lines}
          typing={isTyping}
          typingSpeed={50}
          onTypingComplete={handleTypingComplete}
          className="w-full max-w-xl"
        />
        <button
          onClick={handleStartTyping}
          className="rounded bg-[hsl(var(--la-primary))] px-4 py-2 text-sm text-[hsl(var(--la-primary-foreground))]"
          disabled={isTyping}
        >
          {isTyping ? "Typing..." : "Start Typing Animation"}
        </button>
      </div>
    );
  },
};
