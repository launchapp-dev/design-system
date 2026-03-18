import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Combobox } from "./index";

const meta: Meta = {
  title: "Components/Combobox",
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
];

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
  { value: "cn", label: "China" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="w-full max-w-sm">
        <Combobox
          options={frameworks}
          value={value}
          onValueChange={setValue}
          placeholder="Select a framework..."
        />
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [sm, setSm] = React.useState("");
    const [md, setMd] = React.useState("");
    const [lg, setLg] = React.useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "320px" }}>
        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>Small</p>
          <Combobox size="sm" options={frameworks} value={sm} onValueChange={setSm} placeholder="Select..." />
        </div>
        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>Medium (default)</p>
          <Combobox size="md" options={frameworks} value={md} onValueChange={setMd} placeholder="Select..." />
        </div>
        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>Large</p>
          <Combobox size="lg" options={frameworks} value={lg} onValueChange={setLg} placeholder="Select..." />
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="flex flex-col gap-4" style={{ maxWidth: "320px" }}>
        <Combobox
          options={countries}
          value={value}
          onValueChange={setValue}
          placeholder="Select a country..."
          searchPlaceholder="Search countries..."
        />
        {value && (
          <p className="text-sm text-muted-foreground">
            Selected: <strong>{countries.find((c) => c.value === value)?.label}</strong>
          </p>
        )}
        <button
          className="text-sm text-muted-foreground underline underline-offset-2 self-start"
          onClick={() => setValue("")}
        >
          Clear selection
        </button>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Combobox
        options={frameworks}
        value="react"
        placeholder="Select a framework..."
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
    const [value, setValue] = React.useState("");
    return (
      <div className="w-full max-w-sm">
        <Combobox
          options={frameworks}
          value={value}
          onValueChange={setValue}
          placeholder="Select a framework..."
        />
      </div>
    );
  },
};

export const EdgeCases: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const longOptions = [
      { value: "opt1", label: "This is a very long option label that may overflow its container" },
      { value: "opt2", label: "Another reasonably long option label for testing" },
      { value: "opt3", label: "Short" },
      { value: "opt4", label: "Medium length option" },
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "320px" }}>
        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>Long option labels</p>
          <Combobox options={longOptions} value={value} onValueChange={setValue} placeholder="Select..." />
        </div>
        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>Empty options list</p>
          <Combobox options={[]} value="" onValueChange={() => {}} placeholder="No options available" emptyText="No options." />
        </div>
      </div>
    );
  },
};
