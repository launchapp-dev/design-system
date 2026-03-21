import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock, CodeInline } from "./CodeBlock";

const meta = {
  title: "Components/Rich Media/CodeBlock",
  component: CodeBlock,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "dark", "light"],
    },
    showLineNumbers: {
      control: "boolean",
    },
    showCopyButton: {
      control: "boolean",
    },
    showLanguage: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCode = `function greet(name: string): string {
  const greeting = \`Hello, \${name}!\`;
  console.log(greeting);
  return greeting;
}

const result = greet("World");
console.log(result);`;

const diffCode = `function calculateTotal(items: CartItem[]): number {
-  return items.reduce((sum, item) => sum + item.price, 0);
+  return items.reduce((sum, item) => {
+    const discount = item.quantity > 10 ? 0.1 : 0;
+    return sum + item.price * item.quantity * (1 - discount);
+  }, 0);
}`;

export const Default: Story = {
  args: {
    code: sampleCode,
    language: "typescript",
    filename: "greet.ts",
    variant: "dark",
    showLineNumbers: true,
    showCopyButton: true,
    showLanguage: true,
    className: "w-full max-w-2xl",
  },
};

export const Light: Story = {
  args: {
    ...Default.args,
    variant: "light",
  },
};

export const WithoutLineNumbers: Story = {
  args: {
    ...Default.args,
    showLineNumbers: false,
  },
};

export const HighlightedLines: Story = {
  args: {
    code: sampleCode,
    language: "typescript",
    filename: "greet.ts",
    highlightLines: [1, 2, 3],
    className: "w-full max-w-2xl",
  },
};

export const DiffView: Story = {
  args: {
    code: diffCode,
    language: "typescript",
    filename: "cart.ts",
    diffLines: {
      added: [2, 3, 4, 5],
      removed: [1],
    },
    className: "w-full max-w-2xl",
  },
};

export const WithoutCopyButton: Story = {
  args: {
    ...Default.args,
    showCopyButton: false,
  },
};

export const InlineCode: StoryObj<typeof CodeInline> = {
  render: () => (
    <p className="max-w-md text-[hsl(var(--la-foreground))]">
      You can use the <CodeInline>useState</CodeInline> hook to manage state in your React components.
      For example: <CodeInline>{"const [count, setCount] = useState(0)"}</CodeInline>
    </p>
  ),
};
