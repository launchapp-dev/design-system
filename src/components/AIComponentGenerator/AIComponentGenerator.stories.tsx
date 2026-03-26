import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AIComponentGenerator } from "./index";

const meta: Meta<typeof AIComponentGenerator> = {
  title: "Components/AIComponentGenerator",
  component: AIComponentGenerator,
  argTypes: {
    apiKey: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    apiKey: "",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof AIComponentGenerator>;

export const Default: Story = {
  render: (args) => <AIComponentGenerator {...args} />,
};

export const WithDisabled: Story = {
  render: (args) => <AIComponentGenerator {...args} disabled />,
  args: {
    disabled: true,
  },
};

export const WithExampleDescription: Story = {
  render: () => {
    const [code, setCode] = React.useState<string>("");

    return (
      <div className="space-y-4">
        <AIComponentGenerator
          onComponentGenerated={(generatedCode) => setCode(generatedCode)}
          disabled
        />
        {code && (
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground mb-2">
              Generated code (example):
            </p>
            <pre className="text-xs bg-muted p-3 rounded overflow-auto">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    );
  },
};

export const Demo: Story = {
  render: () => {
    const [generatedCode, setGeneratedCode] = React.useState<string>("");

    return (
      <div className="space-y-4">
        <AIComponentGenerator onComponentGenerated={setGeneratedCode} />
        {generatedCode && (
          <div className="rounded-lg border p-4 bg-card">
            <h3 className="font-semibold mb-2">Generated Code Preview:</h3>
            <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-96">
              <code>{generatedCode}</code>
            </pre>
          </div>
        )}
      </div>
    );
  },
};
