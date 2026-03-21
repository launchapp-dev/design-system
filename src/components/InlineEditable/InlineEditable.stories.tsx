import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InlineEditable } from "./InlineEditable";

const meta: Meta<typeof InlineEditable> = {
  title: "Components/InlineEditable",
  component: InlineEditable,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "underline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    editOnDoubleClick: {
      control: "boolean",
    },
    editable: {
      control: "boolean",
    },
    multiline: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof InlineEditable>;

export const Default: Story = {
  args: {
    value: "Click to edit",
    onChange: (value) => console.log("Changed:", value),
    onCommit: (value) => console.log("Committed:", value),
  },
};

export const UnderlineVariant: Story = {
  args: {
    value: "Hover for underline effect",
    variant: "underline",
    onChange: (value) => console.log("Changed:", value),
  },
};

export const GhostVariant: Story = {
  args: {
    value: "No visible hover state",
    variant: "ghost",
    onChange: (value) => console.log("Changed:", value),
  },
};

export const Small: Story = {
  args: {
    value: "Small editable text",
    size: "sm",
    onChange: (value) => console.log("Changed:", value),
  },
};

export const Large: Story = {
  args: {
    value: "Large editable text",
    size: "lg",
    onChange: (value) => console.log("Changed:", value),
  },
};

export const Placeholder: Story = {
  args: {
    value: "",
    placeholder: "Click to add text...",
    onChange: (value) => console.log("Changed:", value),
  },
};

export const NotEditable: Story = {
  args: {
    value: "This text cannot be edited",
    editable: false,
    onChange: () => {},
  },
};

export const DoubleClickToEdit: Story = {
  args: {
    value: "Double-click to edit",
    editOnDoubleClick: true,
    onChange: (value) => console.log("Changed:", value),
  },
};

export const WithMaxLength: Story = {
  args: {
    value: "Limited to 20 characters",
    maxLength: 20,
    onChange: (value) => console.log("Changed:", value),
  },
};

export const Multiline: Story = {
  args: {
    value: "This is a multiline editable field.\nPress Escape to cancel or click away to save.",
    multiline: true,
    onChange: (value) => console.log("Changed:", value),
  },
};

export const Disabled: Story = {
  args: {
    value: "This field is read-only",
    editable: false,
    onChange: () => {},
  },
};

export const Sizes: Story = {
  render: () => {
    const [sm, setSm] = React.useState("Small text");
    const [md, setMd] = React.useState("Medium text");
    const [lg, setLg] = React.useState("Large text");
    return (
      <div style={{ padding: "40px", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <InlineEditable value={sm} onChange={setSm} size="sm" />
        <InlineEditable value={md} onChange={setMd} size="md" />
        <InlineEditable value={lg} onChange={setLg} size="lg" />
      </div>
    );
  },
};

function InteractiveExample() {
  const [text, setText] = React.useState("Hello World");
  const [savedText, setSavedText] = React.useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div>
        <span className="text-sm text-muted-foreground">Current value: </span>
        <InlineEditable
          value={text}
          onChange={setText}
          onCommit={(value) => {
            setSavedText(value);
            console.log("Saved:", value);
          }}
        />
      </div>
      {savedText && (
        <p className="text-sm text-muted-foreground">
          Last saved: {savedText}
        </p>
      )}
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveExample />,
};

function MultipleFields() {
  const [fields, setFields] = React.useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
  });

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <span className="text-sm font-medium w-16">Name:</span>
        <InlineEditable
          value={fields.name}
          onChange={(v) => setFields({ ...fields, name: v })}
        />
      </div>
      <div className="flex gap-2">
        <span className="text-sm font-medium w-16">Email:</span>
        <InlineEditable
          value={fields.email}
          onChange={(v) => setFields({ ...fields, email: v })}
        />
      </div>
      <div className="flex gap-2">
        <span className="text-sm font-medium w-16">Phone:</span>
        <InlineEditable
          value={fields.phone}
          onChange={(v) => setFields({ ...fields, phone: v })}
        />
      </div>
    </div>
  );
}

export const MultipleFieldsExample: Story = {
  render: () => <MultipleFields />,
};
