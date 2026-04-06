import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { TagInput } from "./index";

const TECH_SUGGESTIONS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "GraphQL",
  "REST API",
  "Docker",
  "Kubernetes",
  "AWS",
  "Tailwind CSS",
  "Next.js",
  "Vite",
  "PostgreSQL",
  "MongoDB",
];

const meta: Meta<typeof TagInput> = {
  title: "Components/TagInput",
  component: TagInput,
  argTypes: {
    disabled: { control: "boolean" },
    allowCreate: { control: "boolean" },
    tagVariant: {
      control: "select",
      options: ["default", "secondary", "outline"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    error: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>(["React", "TypeScript"]);
    return (
      <div style={{ padding: "40px", maxWidth: "480px" }}>
        <p
          style={{
            fontSize: "12px",
            color: "hsl(var(--la-muted-foreground))",
            marginBottom: "8px",
          }}
        >
          Type to search suggestions or create new tags. Press Enter or comma to add.
        </p>
        <TagInput
          value={tags}
          onChange={setTags}
          suggestions={TECH_SUGGESTIONS}
          id="default-tags"
        />
        <p
          style={{
            marginTop: "12px",
            fontSize: "12px",
            color: "hsl(var(--la-muted-foreground))",
          }}
        >
          Tags: {tags.join(", ") || "(none)"}
        </p>
      </div>
    );
  },
};

export const AutocompleteOnly: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>([]);
    return (
      <div style={{ padding: "40px", maxWidth: "480px" }}>
        <p
          style={{
            fontSize: "12px",
            color: "hsl(var(--la-muted-foreground))",
            marginBottom: "8px",
          }}
        >
          allowCreate=false — only suggestions can be added.
        </p>
        <TagInput
          value={tags}
          onChange={setTags}
          suggestions={TECH_SUGGESTIONS}
          allowCreate={false}
          placeholder="Search technologies…"
          id="autocomplete-tags"
        />
      </div>
    );
  },
};

export const WithMaxTags: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>(["React"]);
    return (
      <div style={{ padding: "40px", maxWidth: "480px" }}>
        <p
          style={{
            fontSize: "12px",
            color: "hsl(var(--la-muted-foreground))",
            marginBottom: "8px",
          }}
        >
          Maximum 3 tags allowed.
        </p>
        <TagInput
          value={tags}
          onChange={setTags}
          suggestions={TECH_SUGGESTIONS}
          maxTags={3}
          id="max-tags"
        />
      </div>
    );
  },
};

export const SizeVariants: Story = {
  render: () => {
    const [sm, setSm] = React.useState<string[]>(["React"]);
    const [md, setMd] = React.useState<string[]>(["React", "TypeScript"]);
    const [lg, setLg] = React.useState<string[]>(["React", "TypeScript", "Node.js"]);
    return (
      <div
        style={{
          padding: "40px",
          maxWidth: "480px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>Small (sm)</p>
          <TagInput
            value={sm}
            onChange={setSm}
            suggestions={TECH_SUGGESTIONS}
            size="sm"
            placeholder="Small input"
          />
        </div>
        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>
            Medium (md) - Default
          </p>
          <TagInput
            value={md}
            onChange={setMd}
            suggestions={TECH_SUGGESTIONS}
            size="md"
            placeholder="Medium input"
          />
        </div>
        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>Large (lg)</p>
          <TagInput
            value={lg}
            onChange={setLg}
            suggestions={TECH_SUGGESTIONS}
            size="lg"
            placeholder="Large input"
          />
        </div>
      </div>
    );
  },
};

export const TagVariants: Story = {
  render: () => {
    const [t1, setT1] = React.useState<string[]>(["React", "TypeScript"]);
    const [t2, setT2] = React.useState<string[]>(["React", "TypeScript"]);
    const [t3, setT3] = React.useState<string[]>(["React", "TypeScript"]);
    return (
      <div
        style={{
          padding: "40px",
          maxWidth: "480px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div>
          <p style={{ fontSize: "12px", marginBottom: "4px" }}>default</p>
          <TagInput
            value={t1}
            onChange={setT1}
            suggestions={TECH_SUGGESTIONS}
            tagVariant="default"
          />
        </div>
        <div>
          <p style={{ fontSize: "12px", marginBottom: "4px" }}>secondary</p>
          <TagInput
            value={t2}
            onChange={setT2}
            suggestions={TECH_SUGGESTIONS}
            tagVariant="secondary"
          />
        </div>
        <div>
          <p style={{ fontSize: "12px", marginBottom: "4px" }}>outline</p>
          <TagInput
            value={t3}
            onChange={setT3}
            suggestions={TECH_SUGGESTIONS}
            tagVariant="outline"
          />
        </div>
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>([]);
    return (
      <div style={{ padding: "40px", maxWidth: "480px" }}>
        <TagInput
          value={tags}
          onChange={setTags}
          suggestions={TECH_SUGGESTIONS}
          error={true}
          placeholder="At least one tag required"
          id="error-tags"
        />
        <p
          style={{
            marginTop: "4px",
            fontSize: "12px",
            color: "hsl(var(--la-destructive))",
          }}
        >
          At least one tag is required.
        </p>
      </div>
    );
  },
};

export const WithReactHookForm: Story = {
  render: () => {
    const { control, watch, handleSubmit } = useForm<{ skills: string[] }>({
      defaultValues: { skills: [] },
    });
    const skills = watch("skills");
    const [submitted, setSubmitted] = React.useState<string[] | null>(null);

    return (
      <div style={{ padding: "40px", maxWidth: "480px" }}>
        <form
          onSubmit={handleSubmit((data) => setSubmitted(data.skills))}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <label style={{ fontSize: "14px", fontWeight: 500 }}>
            Skills
            <div style={{ marginTop: "4px" }}>
              <Controller
                control={control}
                name="skills"
                rules={{
                  validate: (v) => v.length > 0 || "Add at least one skill",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <TagInput
                      value={field.value}
                      onChange={field.onChange}
                      suggestions={TECH_SUGGESTIONS}
                      error={!!fieldState.error}
                      id="skills-input"
                    />
                    {fieldState.error && (
                      <p
                        style={{
                          marginTop: "4px",
                          fontSize: "12px",
                          color: "hsl(var(--la-destructive))",
                        }}
                      >
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </label>
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              background: "hsl(var(--la-primary))",
              color: "hsl(var(--la-primary-foreground))",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Submit
          </button>
        </form>
        {submitted && (
          <p style={{ marginTop: "12px", fontSize: "12px" }}>
            Submitted: <strong>{submitted.join(", ")}</strong>
          </p>
        )}
        <p
          style={{
            marginTop: "8px",
            fontSize: "12px",
            color: "hsl(var(--la-muted-foreground))",
          }}
        >
          Current: {skills.join(", ") || "(none)"}
        </p>
      </div>
    );
  },
};
