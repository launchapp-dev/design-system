import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TagInput, type TagInputTag } from "./TagInput";

const meta: Meta<typeof TagInput> = {
  title: "Components/TagInput",
  component: TagInput,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    allowCreate: {
      control: "boolean",
    },
    tagVariant: {
      control: "select",
      options: ["default", "secondary", "outline"],
    },
    error: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TagInput>;

const defaultTags: TagInputTag[] = [
  { id: "1", label: "React", value: "react" },
  { id: "2", label: "TypeScript", value: "typescript" },
];

const TECH_SUGGESTIONS = [
  { id: "s1", label: "JavaScript", value: "javascript" },
  { id: "s2", label: "React", value: "react" },
  { id: "s3", label: "Vue", value: "vue" },
  { id: "s4", label: "Angular", value: "angular" },
  { id: "s5", label: "Svelte", value: "svelte" },
  { id: "s6", label: "TypeScript", value: "typescript" },
  { id: "s7", label: "Node.js", value: "nodejs" },
  { id: "s8", label: "Next.js", value: "nextjs" },
  { id: "s9", label: "GraphQL", value: "graphql" },
  { id: "s10", label: "REST API", value: "rest-api" },
  { id: "s11", label: "Docker", value: "docker" },
  { id: "s12", label: "Kubernetes", value: "kubernetes" },
];

export const Default: Story = {
  args: {
    value: defaultTags,
    onChange: (tags) => console.log("Tags:", tags),
    placeholder: "Add a tag...",
  },
};

export const WithSuggestions: Story = {
  args: {
    value: defaultTags,
    onChange: (tags) => console.log("Tags:", tags),
    suggestions: TECH_SUGGESTIONS,
    placeholder: "Type to search...",
  },
};

export const Empty: Story = {
  args: {
    value: [],
    onChange: (tags) => console.log("Tags:", tags),
    placeholder: "Add your first tag...",
  },
};

export const WithMaxTags: Story = {
  args: {
    value: defaultTags.slice(0, 1),
    onChange: (tags) => console.log("Tags:", tags),
    maxTags: 3,
    placeholder: "Maximum 3 tags",
  },
};

export const NoCreate: Story = {
  args: {
    value: defaultTags,
    onChange: (tags) => console.log("Tags:", tags),
    suggestions: TECH_SUGGESTIONS,
    allowCreate: false,
    placeholder: "Select from suggestions only",
  },
};

export const Small: Story = {
  args: {
    value: defaultTags,
    onChange: (tags) => console.log("Tags:", tags),
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    value: defaultTags,
    onChange: (tags) => console.log("Tags:", tags),
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    value: defaultTags,
    onChange: () => {},
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    value: defaultTags,
    onChange: (tags) => console.log("Tags:", tags),
    error: true,
  },
};

export const CommaDelimiter: Story = {
  args: {
    value: [],
    onChange: (tags) => console.log("Tags:", tags),
    delimiter: ",",
    placeholder: "Type comma-separated values...",
  },
};

export const StringArrayMode: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>(["React", "TypeScript"]);
    return (
      <div style={{ padding: "40px", maxWidth: "480px" }}>
        <p style={{ fontSize: "12px", color: "hsl(var(--muted-foreground))", marginBottom: "8px" }}>
          String array mode - can use simple string arrays for values.
        </p>
        <TagInput
          value={tags}
          onChange={setTags}
          suggestions={["React", "TypeScript", "JavaScript", "Node.js", "Python"]}
          aria-label="Technology tags"
        />
        <p style={{ marginTop: "12px", fontSize: "12px", color: "hsl(var(--muted-foreground))" }}>
          Tags: {tags.join(", ") || "(none)"}
        </p>
      </div>
    );
  },
};

function InteractiveTagInput() {
  const [tags, setTags] = React.useState<TagInputTag[]>(defaultTags);

  return (
    <div className="space-y-4">
      <TagInput
        value={tags}
        onChange={setTags}
        suggestions={TECH_SUGGESTIONS}
        placeholder="Add tags..."
        allowCreate
      />
      <div className="text-sm text-muted-foreground">
        <strong>Selected tags:</strong>{" "}
        {tags.map((t) => t.label).join(", ") || "None"}
      </div>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveTagInput />,
};
