import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { StreamingText, StreamingTextBlock } from "./index";

const meta: Meta<typeof StreamingText> = {
  title: "Components/StreamingText",
  component: StreamingText,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isStreaming: { control: "boolean" },
    speed: { control: { type: "range", min: 10, max: 100 } },
    cursorChar: { control: "text" },
  },
  args: {
    size: "md",
    isStreaming: true,
    speed: 30,
    cursorChar: "│",
  },
};

export default meta;
type Story = StoryObj<typeof StreamingText>;

const sampleText = "Hello! I'm an AI assistant. I can help you with various tasks like writing code, answering questions, and providing information.";

export const Default: Story = {
  render: (args) => {
    const [key, setKey] = React.useState(0);
    return (
      <div className="p-4 max-w-2xl">
        <StreamingText {...args} text={sampleText} key={key} />
        <button
          onClick={() => setKey(k => k + 1)}
          className="mt-4 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded"
        >
          Restart
        </button>
      </div>
    );
  },
};

export const NotStreaming: Story = {
  render: (args) => (
    <div className="p-4 max-w-2xl">
      <StreamingText {...args} isStreaming={false} text={sampleText} />
    </div>
  ),
};

export const StreamingBlock: StoryObj<typeof StreamingTextBlock> = {
  render: (args) => {
    const [key, setKey] = React.useState(0);
    const codeText = `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Example usage
console.log(fibonacci(10)); // 55`;
    return (
      <div className="p-4 max-w-2xl">
        <StreamingTextBlock
          {...args}
          text={codeText}
          key={key}
          className="bg-muted rounded-lg p-4"
        />
        <button
          onClick={() => setKey(k => k + 1)}
          className="mt-4 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded"
        >
          Restart
        </button>
      </div>
    );
  },
};

export const WithLineNumbers: StoryObj<typeof StreamingTextBlock> = {
  render: (args) => {
    const [key, setKey] = React.useState(0);
    const codeText = `import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children }: ButtonProps) {
  return (
    <button className={\`btn btn-\${variant}\`}>
      {children}
    </button>
  );
}`;
    return (
      <div className="p-4 max-w-3xl">
        <StreamingTextBlock
          {...args}
          text={codeText}
          key={key}
          showLineNumbers
          className="bg-muted rounded-lg p-4"
        />
        <button
          onClick={() => setKey(k => k + 1)}
          className="mt-4 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded"
        >
          Restart
        </button>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [keys, setKeys] = React.useState({ sm: 0, md: 0, lg: 0 });
    return (
      <div className="flex flex-col gap-6 p-4 max-w-2xl">
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase">{size}</span>
            <StreamingText
              size={size}
              text={sampleText.slice(0, 50)}
              key={keys[size]}
            />
          </div>
        ))}
        <button
          onClick={() => setKeys({ sm: 1, md: 1, lg: 1 })}
          className="mt-4 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded"
        >
          Restart All
        </button>
      </div>
    );
  },
};
