import type { Meta, StoryObj } from "@storybook/react";
import { ThinkingIndicator } from "./index";

const meta: Meta<typeof ThinkingIndicator> = {
  title: "Components/ThinkingIndicator",
  component: ThinkingIndicator,
  argTypes: {
    variant: {
      control: "select",
      options: ["dots", "brain", "chain"],
      description: "Visual style of the thinking indicator",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the indicator",
    },
    label: {
      control: "text",
      description: "Optional label text",
    },
    steps: {
      control: "object",
      description: "Array of reasoning steps (for chain variant)",
    },
    currentStep: {
      control: { type: "number", min: 0 },
      description: "Current step index (for chain variant, 0 for auto-cycle)",
    },
  },
  args: {
    variant: "dots",
    size: "md",
    label: "Thinking...",
  },
};

export default meta;
type Story = StoryObj<typeof ThinkingIndicator>;

export const Default: Story = {
  render: (args) => <ThinkingIndicator {...args} />,
};

export const Dots: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <ThinkingIndicator variant="dots" size="sm" label="Analyzing..." />
      <ThinkingIndicator variant="dots" size="md" label="Thinking..." />
      <ThinkingIndicator variant="dots" size="lg" label="Processing..." />
    </div>
  ),
};

export const DotsNoLabel: Story = {
  render: () => <ThinkingIndicator variant="dots" />,
};

export const Brain: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <ThinkingIndicator variant="brain" size="sm" label="Reasoning..." />
      <ThinkingIndicator variant="brain" size="md" label="Computing..." />
      <ThinkingIndicator variant="brain" size="lg" label="Analyzing..." />
    </div>
  ),
};

export const BrainNoLabel: Story = {
  render: () => <ThinkingIndicator variant="brain" />,
};

export const Chain: Story = {
  args: {
    variant: "chain",
    steps: [
      "Understanding the question...",
      "Searching knowledge base...",
      "Analyzing context...",
      "Formulating response...",
      "Finalizing answer...",
    ],
  },
};

export const ChainWithCurrentStep: Story = {
  args: {
    variant: "chain",
    steps: [
      "Understanding the question...",
      "Searching knowledge base...",
      "Analyzing context...",
      "Formulating response...",
      "Finalizing answer...",
    ],
    currentStep: 3,
  },
};

export const ChainSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <span
          style={{
            fontSize: "12px",
            color: "var(--muted-foreground)",
            marginBottom: "8px",
            display: "block",
          }}
        >
          Small
        </span>
        <ThinkingIndicator
          variant="chain"
          size="sm"
          steps={["Loading data...", "Processing...", "Complete"]}
          currentStep={2}
        />
      </div>
      <div>
        <span
          style={{
            fontSize: "12px",
            color: "var(--muted-foreground)",
            marginBottom: "8px",
            display: "block",
          }}
        >
          Medium
        </span>
        <ThinkingIndicator
          variant="chain"
          size="md"
          steps={["Loading data...", "Processing...", "Complete"]}
          currentStep={2}
        />
      </div>
      <div>
        <span
          style={{
            fontSize: "12px",
            color: "var(--muted-foreground)",
            marginBottom: "8px",
            display: "block",
          }}
        >
          Large
        </span>
        <ThinkingIndicator
          variant="chain"
          size="lg"
          steps={["Loading data...", "Processing...", "Complete"]}
          currentStep={2}
        />
      </div>
    </div>
  ),
};

export const ChainAutoCycle: Story = {
  render: () => (
    <ThinkingIndicator
      variant="chain"
      steps={[
        "Initializing...",
        "Loading model...",
        "Processing input...",
        "Generating response...",
      ]}
    />
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <span
          style={{
            fontSize: "12px",
            color: "var(--muted-foreground)",
            marginBottom: "8px",
            display: "block",
          }}
        >
          Dots
        </span>
        <ThinkingIndicator variant="dots" label="Thinking..." />
      </div>
      <div>
        <span
          style={{
            fontSize: "12px",
            color: "var(--muted-foreground)",
            marginBottom: "8px",
            display: "block",
          }}
        >
          Brain
        </span>
        <ThinkingIndicator variant="brain" label="Reasoning..." />
      </div>
      <div>
        <span
          style={{
            fontSize: "12px",
            color: "var(--muted-foreground)",
            marginBottom: "8px",
            display: "block",
          }}
        >
          Chain
        </span>
        <ThinkingIndicator
          variant="chain"
          steps={["Step 1: Analyze...", "Step 2: Process...", "Step 3: Generate..."]}
          currentStep={2}
        />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: 24, fontSize: "12px", color: "var(--muted-foreground)" }}>
            {size}
          </span>
          <ThinkingIndicator variant="dots" size={size} />
        </div>
      ))}
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "24px",
        background: "hsl(var(--la-background))",
        borderRadius: "8px",
      }}
    >
      <ThinkingIndicator variant="dots" size="md" label="Thinking..." />
      <ThinkingIndicator variant="brain" size="md" label="Reasoning..." />
      <ThinkingIndicator
        variant="chain"
        steps={["Analyzing...", "Processing...", "Complete"]}
        currentStep={2}
      />
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
      <div
        style={{
          padding: "12px 16px",
          background: "hsl(var(--la-muted))",
          borderRadius: "12px",
          alignSelf: "flex-start",
        }}
      >
        <ThinkingIndicator variant="dots" size="sm" />
      </div>
      <div
        style={{
          padding: "12px 16px",
          background: "hsl(var(--la-primary) / 0.1)",
          borderRadius: "12px",
          alignSelf: "flex-end",
        }}
      >
        <p style={{ margin: 0, fontSize: "14px" }}>What is the capital of France?</p>
      </div>
      <div
        style={{
          padding: "12px 16px",
          background: "hsl(var(--la-muted))",
          borderRadius: "12px",
          alignSelf: "flex-start",
        }}
      >
        <ThinkingIndicator variant="brain" size="sm" label="Searching..." />
      </div>
    </div>
  ),
};

export const CustomClassName: Story = {
  render: () => (
    <ThinkingIndicator variant="dots" className="p-4 bg-accent rounded-lg border border-border" />
  ),
};
