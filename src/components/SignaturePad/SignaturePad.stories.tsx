import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SignaturePad } from "./SignaturePad";

const meta: Meta<typeof SignaturePad> = {
  title: "Components/SignaturePad",
  component: SignaturePad,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    strokeColor: {
      control: "color",
    },
    strokeWidth: {
      control: { type: "range", min: 1, max: 10 },
    },
    backgroundColor: {
      control: "color",
    },
    showClear: {
      control: "boolean",
    },
    showUndo: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SignaturePad>;

export const Default: Story = {
  args: {
    onChange: (value) => console.log("Signature:", value?.slice(0, 50)),
    placeholder: "Sign here",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    width: 300,
    height: 150,
    onChange: (value) => console.log("Signature:", value?.slice(0, 50)),
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    width: 600,
    height: 300,
    onChange: (value) => console.log("Signature:", value?.slice(0, 50)),
  },
};

export const CustomColors: Story = {
  args: {
    strokeColor: "#1e40af",
    backgroundColor: "#f0f9ff",
    onChange: (value) => console.log("Signature:", value?.slice(0, 50)),
  },
};

export const ThickStroke: Story = {
  args: {
    strokeWidth: 4,
    onChange: (value) => console.log("Signature:", value?.slice(0, 50)),
  },
};

export const ThinStroke: Story = {
  args: {
    strokeWidth: 1,
    onChange: (value) => console.log("Signature:", value?.slice(0, 50)),
  },
};

export const NoControls: Story = {
  args: {
    showClear: false,
    showUndo: false,
    onChange: (value) => console.log("Signature:", value?.slice(0, 50)),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onChange: () => {},
  },
};

export const WithError: Story = {
  args: {
    error: true,
    onChange: (value) => console.log("Signature:", value?.slice(0, 50)),
  },
};

export const SVGFormat: Story = {
  args: {
    format: "svg",
    onChange: (value) => console.log("Signature (SVG):", value?.slice(0, 50)),
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Draw your signature above the line",
    onChange: (value) => console.log("Signature:", value?.slice(0, 50)),
  },
};

export const DarkBackground: Story = {
  args: {
    backgroundColor: "#1f2937",
    strokeColor: "#ffffff",
    onChange: (value) => console.log("Signature:", value?.slice(0, 50)),
  },
};

function InteractiveSignaturePad() {
  const [signature, setSignature] = React.useState("");

  return (
    <div className="space-y-4">
      <SignaturePad
        value={signature}
        onChange={setSignature}
        placeholder="Sign here"
        width={400}
        height={200}
      />
      <div className="text-sm space-y-2">
        <p className="font-medium">Signature Status:</p>
        <p className="text-muted-foreground">
          {signature ? `Captured (${signature.length} chars)` : "Not signed"}
        </p>
        {signature && (
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.download = "signature.png";
              link.href = signature;
              link.click();
            }}
            className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:opacity-90"
          >
            Download Signature
          </button>
        )}
      </div>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveSignaturePad />,
};

function SignatureForm() {
  const [signature, setSignature] = React.useState("");
  const [agreed, setAgreed] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signature) {
      alert("Please sign the form");
      return;
    }
    alert("Form submitted with signature!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Terms Agreement</h3>
        <p className="text-sm text-muted-foreground">
          By signing below, you agree to the terms and conditions of this agreement.
        </p>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="rounded"
        />
        <span className="text-sm">I agree to the terms above</span>
      </label>

      <div>
        <label className="text-sm font-medium">Signature</label>
        <div className="mt-1">
          <SignaturePad
            value={signature}
            onChange={setSignature}
            placeholder="Sign here to agree"
            disabled={!agreed}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!signature || !agreed}
        className="w-full px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Agreement
      </button>
    </form>
  );
}

export const InForm: Story = {
  render: () => <SignatureForm />,
};

function MultiSignature() {
  const [signatures, setSignatures] = React.useState({
    applicant: "",
    witness: "",
  });

  return (
    <div className="space-y-6 max-w-md">
      <div>
        <label className="text-sm font-medium">Applicant Signature</label>
        <div className="mt-1">
          <SignaturePad
            value={signatures.applicant}
            onChange={(v) => setSignatures({ ...signatures, applicant: v })}
            height={120}
            strokeColor="#2563eb"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Witness Signature</label>
        <div className="mt-1">
          <SignaturePad
            value={signatures.witness}
            onChange={(v) => setSignatures({ ...signatures, witness: v })}
            height={120}
            strokeColor="#16a34a"
          />
        </div>
      </div>

      <button
        disabled={!signatures.applicant || !signatures.witness}
        className="w-full px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 disabled:opacity-50"
      >
        Submit Document
      </button>
    </div>
  );
}

export const MultipleSignatures: Story = {
  render: () => <MultiSignature />,
};
