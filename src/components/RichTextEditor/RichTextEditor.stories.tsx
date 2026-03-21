import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { RichTextEditor } from "./index";

const meta: Meta<typeof RichTextEditor> = {
  title: "Components/RichTextEditor",
  component: RichTextEditor,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    size: "md",
    disabled: false,
    error: false,
    placeholder: "Start typing...",
    minHeight: 150,
  },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("<p>Start editing this text...</p>");
    return (
      <div className="space-y-4">
        <RichTextEditor {...args} value={value} onChange={setValue} />
        <div className="rounded-md border border-[hsl(var(--la-border))] p-4">
          <p className="mb-2 text-sm font-medium text-[hsl(var(--la-foreground))]">Output HTML:</p>
          <pre className="max-h-40 overflow-auto text-xs text-[hsl(var(--la-muted-foreground))]">
            {value}
          </pre>
        </div>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("<h2>Rich Text Editor</h2><p>This is a <strong>controlled</strong> editor with <em>formatting</em>.</p><ul><li>Supports lists</li><li>And more</li></ul>");
    return (
      <div className="space-y-4">
        <RichTextEditor value={value} onChange={setValue} />
        <button
          onClick={() => setValue("")}
          className="rounded-md bg-[hsl(var(--la-primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--la-primary-foreground))]"
        >
          Clear Content
        </button>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [sm, setSm] = React.useState("<p>Small editor</p>");
    const [md, setMd] = React.useState("<p>Medium editor</p>");
    const [lg, setLg] = React.useState("<p>Large editor</p>");
    return (
      <div className="flex flex-col gap-4">
        <RichTextEditor size="sm" value={sm} onChange={setSm} placeholder="Small size" />
        <RichTextEditor size="md" value={md} onChange={setMd} placeholder="Medium size" />
        <RichTextEditor size="lg" value={lg} onChange={setLg} placeholder="Large size" />
      </div>
    );
  },
};

export const WithInitialContent: Story = {
  render: () => {
    const [value, setValue] = React.useState(`
      <h2>Meeting Notes</h2>
      <p>Here are the <strong>key points</strong> from today's meeting:</p>
      <ul>
        <li>Review project timeline</li>
        <li>Discuss <em>budget allocation</em></li>
        <li>Plan next sprint</li>
      </ul>
      <blockquote>
        <p>"The best time to plant a tree was 20 years ago. The second best time is now."</p>
      </blockquote>
      <p>For more details, check the <a href="#">documentation</a>.</p>
      <pre><code>console.log("Hello, World!");</code></pre>
    `);
    return <RichTextEditor value={value} onChange={setValue} minHeight={300} />;
  },
};

export const Error: Story = {
  render: () => {
    const [value, setValue] = React.useState("<p>Content with error state</p>");
    return (
      <div className="space-y-2">
        <RichTextEditor value={value} onChange={setValue} error />
        <p className="text-sm text-[hsl(var(--la-destructive))]">This field has an error</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <RichTextEditor
        value="<p>This editor is disabled. You cannot edit this content.</p>"
        disabled
      />
    );
  },
};

export const CustomHeight: Story = {
  render: () => {
    const [value, setValue] = React.useState("<p>Tall editor with custom max height</p>");
    return (
      <RichTextEditor
        value={value}
        onChange={setValue}
        minHeight={200}
        maxHeight={400}
      />
    );
  },
};
