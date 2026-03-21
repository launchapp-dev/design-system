import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SignaturePad } from "./index";

const meta: Meta<typeof SignaturePad> = {
  title: "Components/SignaturePad",
  component: SignaturePad,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    strokeColor: { control: "color" },
    strokeWidth: { control: { type: "range", min: 1, max: 10, step: 0.5 } },
    placeholder: { control: "text" },
    showClearButton: { control: "boolean" },
    showUndoButton: { control: "boolean" },
  },
  args: {
    size: "md",
    disabled: false,
    error: false,
    strokeColor: "#000000",
    strokeWidth: 2,
    placeholder: "Sign here",
    showClearButton: true,
    showUndoButton: true,
  },
};

export default meta;
type Story = StoryObj<typeof SignaturePad>;

export const Default: Story = {
  render: (args) => {
    const [signature, setSignature] = React.useState<string | null>(null);
    return (
      <div className="space-y-4">
        <SignaturePad {...args} value={signature ?? undefined} onChange={setSignature} />
        {signature && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-[hsl(var(--la-foreground))]">Preview:</p>
            <img 
              src={signature} 
              alt="Signature preview" 
              className="rounded-md border border-[hsl(var(--la-border))] bg-white"
            />
          </div>
        )}
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [signature, setSignature] = React.useState<string | null>(null);
    return (
      <div className="space-y-4">
        <SignaturePad value={signature ?? undefined} onChange={setSignature} />
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (signature) {
                const link = document.createElement('a');
                link.download = 'signature.png';
                link.href = signature;
                link.click();
              }
            }}
            disabled={!signature}
            className="rounded-md bg-[hsl(var(--la-primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--la-primary-foreground))] disabled:opacity-50"
          >
            Download Signature
          </button>
          <button
            onClick={() => setSignature(null)}
            disabled={!signature}
            className="rounded-md border border-[hsl(var(--la-input))] px-4 py-2 text-sm font-medium text-[hsl(var(--la-foreground))] disabled:opacity-50"
          >
            Reset
          </button>
        </div>
        <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
          {signature ? "Signature captured" : "No signature yet"}
        </p>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [sm, setSm] = React.useState<string | null>(null);
    const [md, setMd] = React.useState<string | null>(null);
    const [lg, setLg] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-6">
        <div>
          <p className="mb-2 text-sm font-medium">Small</p>
          <SignaturePad size="sm" value={sm ?? undefined} onChange={setSm} />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Medium</p>
          <SignaturePad size="md" value={md ?? undefined} onChange={setMd} />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Large</p>
          <SignaturePad size="lg" value={lg ?? undefined} onChange={setLg} />
        </div>
      </div>
    );
  },
};

export const CustomStroke: Story = {
  render: () => {
    const [signature, setSignature] = React.useState<string | null>(null);
    return (
      <div className="space-y-4">
        <SignaturePad
          value={signature ?? undefined}
          onChange={setSignature}
          strokeColor="#3b82f6"
          strokeWidth={3}
          placeholder="Sign with blue ink"
        />
      </div>
    );
  },
};

export const Error: Story = {
  render: () => {
    const [signature, setSignature] = React.useState<string | null>(null);
    return (
      <div className="space-y-2">
        <SignaturePad value={signature ?? undefined} onChange={setSignature} error />
        <p className="text-sm text-[hsl(var(--la-destructive))]">Signature is required</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <SignaturePad
      disabled
      placeholder="Signature pad is disabled"
    />
  ),
};

export const MinimalControls: Story = {
  render: () => {
    const [signature, setSignature] = React.useState<string | null>(null);
    return (
      <SignaturePad
        value={signature ?? undefined}
        onChange={setSignature}
        showClearButton={false}
        showUndoButton={false}
        placeholder="Sign here (no controls)"
      />
    );
  },
};

export const OnlyClear: Story = {
  render: () => {
    const [signature, setSignature] = React.useState<string | null>(null);
    return (
      <SignaturePad
        value={signature ?? undefined}
        onChange={setSignature}
        showClearButton={true}
        showUndoButton={false}
      />
    );
  },
};

export const OnlyUndo: Story = {
  render: () => {
    const [signature, setSignature] = React.useState<string | null>(null);
    return (
      <SignaturePad
        value={signature ?? undefined}
        onChange={setSignature}
        showClearButton={false}
        showUndoButton={true}
      />
    );
  },
};
