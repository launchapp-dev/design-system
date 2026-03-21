import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CodeBlock } from "./index";

const meta: Meta<typeof CodeBlock> = {
  title: "Components/CodeBlock",
  component: CodeBlock,
  argTypes: {
    language: {
      control: "select",
      options: ["typescript", "javascript", "jsx", "tsx", "python", "bash", "json", "css"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showLineNumbers: { control: "boolean" },
    showCopyButton: { control: "boolean" },
    scrollable: { control: "boolean" },
  },
  args: {
    language: "typescript",
    size: "md",
    showLineNumbers: true,
    showCopyButton: true,
    scrollable: true,
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

const basicCode = `function greet(name: string): string {
  const message = \`Hello, \${name}!\`;
  return message;
}

const greeting = greet("World");
console.log(greeting);`;

const pythonCode = `def fibonacci(n: int) -> list[int]:
    """Generate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    
    return sequence

result = fibonacci(10)
print(result)`;

const diffCode = [
  { content: "function calculateTotal(items) {", diff: "none" as const },
  { content: "  let total = 0;", diff: "remove" as const },
  { content: "  var total = 0;", diff: "add" as const },
  { content: "  for (const item of items) {", diff: "none" as const },
  { content: "    total += item.price;", diff: "none" as const },
  { content: "  }", diff: "none" as const },
  { content: "  return total;", diff: "none" as const },
  { content: "}", diff: "none" as const },
];

export const Default: Story = {
  render: (args) => (
    <CodeBlock
      {...args}
      code={basicCode}
      filename="greeting.ts"
    />
  ),
};

export const WithFilename: Story = {
  render: (args) => (
    <CodeBlock
      {...args}
      code={`import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`}
      filename="Counter.tsx"
      language="tsx"
    />
  ),
};

export const WithoutLineNumbers: Story = {
  render: (args) => (
    <CodeBlock
      {...args}
      code={basicCode}
      showLineNumbers={false}
    />
  ),
};

export const WithoutCopyButton: Story = {
  render: (args) => (
    <CodeBlock
      {...args}
      code={basicCode}
      showCopyButton={false}
    />
  ),
};

export const Python: Story = {
  render: (args) => (
    <CodeBlock
      {...args}
      code={pythonCode}
      filename="fibonacci.py"
      language="python"
    />
  ),
};

export const DiffView: Story = {
  render: (args) => (
    <CodeBlock
      {...args}
      code={diffCode}
      filename="calculator.ts"
      language="typescript"
    />
  ),
};

export const HighlightedLines: Story = {
  render: (args) => (
    <CodeBlock
      {...args}
      code={basicCode}
      filename="greeting.ts"
      highlightLines={[2, 3]}
    />
  ),
};

export const SmallSize: Story = {
  render: (args) => (
    <CodeBlock
      {...args}
      code={basicCode}
      filename="greeting.ts"
      size="sm"
    />
  ),
};

export const LargeSize: Story = {
  render: (args) => (
    <CodeBlock
      {...args}
      code={basicCode}
      filename="greeting.ts"
      size="lg"
    />
  ),
};

export const MaxLines: Story = {
  render: (args) => (
    <CodeBlock
      {...args}
      code={`// Line 1: This is a long file with many lines
// Line 2
// Line 3
// Line 4
// Line 5
// Line 6
// Line 7
// Line 8
// Line 9
// Line 10
// Line 11
// Line 12`}
      filename="long-file.ts"
      maxLines={5}
    />
  ),
};

export const Bash: Story = {
  render: (args) => (
    <CodeBlock
      {...args}
      code={`#!/bin/bash

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "Done!"`}
      filename="deploy.sh"
      language="bash"
    />
  ),
};
