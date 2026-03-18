import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MultiSelect } from "./index";

const meta: Meta = {
  title: "Components/MultiSelect",
};

export default meta;
type Story = StoryObj<typeof meta>;

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
  { value: "qwik", label: "Qwik" },
  { value: "astro", label: "Astro" },
  { value: "remix", label: "Remix" },
];

const tags = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "enhancement", label: "Enhancement" },
  { value: "documentation", label: "Documentation" },
  { value: "security", label: "Security" },
  { value: "performance", label: "Performance" },
  { value: "refactor", label: "Refactor" },
  { value: "testing", label: "Testing" },
  { value: "ci", label: "CI/CD" },
  { value: "deps", label: "Dependencies" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <div className="w-full max-w-sm">
        <MultiSelect
          options={frameworks}
          value={value}
          onValueChange={setValue}
          placeholder="Select frameworks..."
        />
      </div>
    );
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(["react", "vue", "svelte"]);
    return (
      <div className="w-full max-w-sm">
        <MultiSelect
          options={frameworks}
          value={value}
          onValueChange={setValue}
          placeholder="Select frameworks..."
        />
      </div>
    );
  },
};

export const WithMaxCount: Story = {
  render: () => {
    const [value2, setValue2] = React.useState<string[]>(["react", "vue", "angular", "svelte", "solid"]);
    const [value5, setValue5] = React.useState<string[]>(["react", "vue", "angular", "svelte", "solid"]);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "320px" }}>
        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>maxCount=2 (shows "+3 more")</p>
          <MultiSelect options={frameworks} value={value2} onValueChange={setValue2} maxCount={2} />
        </div>
        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>maxCount=5 (no overflow)</p>
          <MultiSelect options={frameworks} value={value5} onValueChange={setValue5} maxCount={5} />
        </div>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [sm, setSm] = React.useState<string[]>(["react"]);
    const [md, setMd] = React.useState<string[]>(["react", "vue"]);
    const [lg, setLg] = React.useState<string[]>(["react", "vue"]);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "320px" }}>
        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>Small</p>
          <MultiSelect size="sm" options={frameworks} value={sm} onValueChange={setSm} placeholder="Select..." />
        </div>
        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>Medium (default)</p>
          <MultiSelect size="md" options={frameworks} value={md} onValueChange={setMd} placeholder="Select..." />
        </div>
        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>Large</p>
          <MultiSelect size="lg" options={frameworks} value={lg} onValueChange={setLg} placeholder="Select..." />
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <div className="flex flex-col gap-4" style={{ maxWidth: "360px" }}>
        <MultiSelect
          options={tags}
          value={value}
          onValueChange={setValue}
          placeholder="Select tags..."
          searchPlaceholder="Search tags..."
          maxCount={4}
        />
        {value.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {value.length} tag{value.length !== 1 ? "s" : ""} selected:{" "}
            <strong>{value.map((v) => tags.find((t) => t.value === v)?.label).join(", ")}</strong>
          </p>
        )}
        {value.length > 0 && (
          <button
            className="text-sm text-muted-foreground underline underline-offset-2 self-start"
            onClick={() => setValue([])}
          >
            Clear all
          </button>
        )}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <MultiSelect
        options={frameworks}
        value={["react", "vue"]}
        placeholder="Select frameworks..."
        disabled
      />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [value, setValue] = React.useState<string[]>(["react", "vue"]);
    return (
      <div className="w-full max-w-sm">
        <MultiSelect
          options={frameworks}
          value={value}
          onValueChange={setValue}
          placeholder="Select frameworks..."
        />
      </div>
    );
  },
};
