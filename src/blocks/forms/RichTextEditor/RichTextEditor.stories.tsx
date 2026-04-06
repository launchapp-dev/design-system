import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { RichTextEditor } from "./RichTextEditor";

const meta: Meta<typeof RichTextEditor> = {
  title: "Blocks/Forms/RichTextEditor",
  component: RichTextEditor,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { RichTextEditor } from "@launchapp/design-system/blocks/forms";

export default function BlogPostEditor() {
  const [content, setContent] = React.useState("<p>Write your post here...</p>");

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      label="Blog Post Content"
      placeholder="Start writing your blog post..."
      minHeight={300}
      showWordCount
    />
  );
}`,
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
    showWordCount: { control: "boolean" },
    minHeight: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    return <RichTextEditor {...args} value={value} onChange={setValue} />;
  },
  args: {
    placeholder: "Start writing your content...",
    label: "Description",
    minHeight: 200,
    showWordCount: true,
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    return <RichTextEditor {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Article Content",
    placeholder: "Write your article here...",
    minHeight: 300,
    showWordCount: true,
  },
};

export const WithContent: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(
      "<h1>Getting Started with LaunchApp</h1><p>LaunchApp is a modern SaaS starter kit that helps you ship faster. In this guide, we'll explore the key features.</p><h2>Authentication</h2><p>Built-in authentication with Better Auth provides secure session management out of the box.</p><ul><li>Email & password login</li><li>Social OAuth (Google, GitHub)</li><li>Magic link support</li></ul><blockquote>Pro tip: Enable 2FA for production deployments.</blockquote>",
    );
    return <RichTextEditor {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Blog Post",
    placeholder: "Start writing...",
    minHeight: 400,
    showWordCount: true,
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    return <RichTextEditor {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Post Body",
    placeholder: "Write your post...",
    minHeight: 200,
    showWordCount: true,
    error: "Content is required and must be at least 50 characters.",
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value] = React.useState(
      "<p>This editor is read-only. The user cannot modify the content.</p>",
    );
    return <RichTextEditor {...args} value={value} disabled />;
  },
  args: {
    label: "Terms of Service",
    placeholder: "Read-only content...",
    minHeight: 200,
    showWordCount: false,
  },
};

export const DarkMode: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    return (
      <div className="dark bg-background p-6">
        <RichTextEditor {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    label: "Dark Mode Editor",
    placeholder: "Type in the dark...",
    minHeight: 250,
    showWordCount: true,
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => {
    const [value, setValue] = React.useState("");
    return (
      <div style={{ padding: "16px" }}>
        <RichTextEditor {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    label: "Quick Note",
    placeholder: "Jot down a quick note...",
    minHeight: 150,
    showWordCount: true,
  },
};
