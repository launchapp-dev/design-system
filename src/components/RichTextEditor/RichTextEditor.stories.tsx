import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RichTextEditor } from "./RichTextEditor";

const meta: Meta<typeof RichTextEditor> = {
  title: "Components/RichTextEditor",
  component: RichTextEditor,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    minHeight: {
      control: "number",
    },
    maxHeight: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = {
  args: {
    value: "",
    onChange: (html) => console.log("Content:", html),
    placeholder: "Start typing...",
  },
};

export const WithInitialContent: Story = {
  args: {
    value: "<h2>Hello World</h2><p>This is <strong>bold</strong> and <em>italic</em> text.</p><ul><li>Item 1</li><li>Item 2</li></ul>",
    onChange: (html) => console.log("Content:", html),
  },
};

export const Small: Story = {
  args: {
    value: "",
    size: "sm",
    minHeight: 100,
    onChange: (html) => console.log("Content:", html),
  },
};

export const Large: Story = {
  args: {
    value: "",
    size: "lg",
    minHeight: 200,
    onChange: (html) => console.log("Content:", html),
  },
};

export const Compact: Story = {
  args: {
    value: "",
    minHeight: 80,
    maxHeight: 150,
    onChange: (html) => console.log("Content:", html),
  },
};

export const Disabled: Story = {
  args: {
    value: "<p>This content cannot be edited.</p>",
    disabled: true,
    onChange: () => {},
  },
};

export const WithError: Story = {
  args: {
    value: "",
    error: true,
    onChange: (html) => console.log("Content:", html),
  },
};

function InteractiveEditor() {
  const [content, setContent] = React.useState("");

  return (
    <div className="space-y-4">
      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder="Write something amazing..."
        minHeight={200}
      />
      <div className="space-y-2">
        <h4 className="text-sm font-medium">HTML Output:</h4>
        <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-40">
          {content || "(empty)"}
        </pre>
      </div>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveEditor />,
};

function EditorWithCounter() {
  const [content, setContent] = React.useState("");
  const wordCount = content.replace(/<[^>]*>/g, "").trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.replace(/<[^>]*>/g, "").length;

  return (
    <div className="space-y-2">
      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder="Type to see word count..."
        minHeight={150}
      />
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>{wordCount} words</span>
        <span>{charCount} characters</span>
      </div>
    </div>
  );
}

export const WithCharacterCounter: Story = {
  render: () => <EditorWithCounter />,
};
