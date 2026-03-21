import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ThinkingIndicator } from "./index";
import type { ThinkingStep } from "./index";

const meta: Meta<typeof ThinkingIndicator> = {
  title: "Components/ThinkingIndicator",
  component: ThinkingIndicator,
  argTypes: {
    variant: {
      control: "select",
      options: ["dots", "pulse", "chain"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    label: { control: "text" },
  },
  args: {
    variant: "dots",
    size: "md",
    label: "Thinking…",
  },
};

export default meta;
type Story = StoryObj<typeof ThinkingIndicator>;

export const Default: Story = {
  render: (args) => (
    <div className="p-4">
      <ThinkingIndicator {...args} />
    </div>
  ),
};

export const Dots: Story = {
  args: {
    variant: "dots",
    label: "Typing…",
  },
  render: (args) => (
    <div className="p-4">
      <ThinkingIndicator {...args} />
    </div>
  ),
};

export const Pulse: Story = {
  args: {
    variant: "pulse",
    label: "Processing…",
  },
  render: (args) => (
    <div className="p-4">
      <ThinkingIndicator {...args} />
    </div>
  ),
};

export const Chain: Story = {
  args: {
    variant: "chain",
    label: "Thinking…",
  },
  render: (args) => {
    const [steps, setSteps] = React.useState<ThinkingStep[]>([
      { id: "1", label: "Analyzing input", status: "completed" },
      { id: "2", label: "Searching knowledge base", status: "active" },
      { id: "3", label: "Generating response", status: "pending" },
      { id: "4", label: "Verifying accuracy", status: "pending" },
    ]);

    React.useEffect(() => {
      const timers: NodeJS.Timeout[] = [];
      let currentStep = 1;
      
      const advance = () => {
        currentStep++;
        if (currentStep < steps.length) {
          setSteps(prev => prev.map((step, i) => ({
            ...step,
            status: i < currentStep ? "completed" : i === currentStep ? "active" : "pending"
          })));
          timers.push(setTimeout(advance, 2000));
        }
      };

      timers.push(setTimeout(advance, 2000));
      return () => timers.forEach(clearTimeout);
    }, []);

    return (
      <div className="p-4 max-w-md">
        <ThinkingIndicator {...args} steps={steps} />
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase">Dots</span>
        <ThinkingIndicator variant="dots" label="Typing…" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase">Pulse</span>
        <ThinkingIndicator variant="pulse" label="Processing…" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase">Chain</span>
        <ThinkingIndicator
          variant="chain"
          label="Thinking…"
          steps={[
            { id: "1", label: "Analyzing input", status: "completed" },
            { id: "2", label: "Searching knowledge base", status: "active" },
            { id: "3", label: "Generating response", status: "pending" },
          ]}
        />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase">{size}</span>
          <ThinkingIndicator variant="dots" size={size} label="Thinking…" />
        </div>
      ))}
    </div>
  ),
};
