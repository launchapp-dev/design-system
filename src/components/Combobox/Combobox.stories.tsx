import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Combobox } from "./index";

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
  argTypes: {
    placeholder: { control: "text" },
    searchPlaceholder: { control: "text" },
    emptyText: { control: "text" },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### ARIA Roles & Attributes
- Combobox has \`role="combobox"\` with \`aria-expanded\` showing popup state
- Listbox has \`role="listbox"\` with proper item markup
- Active option marked with \`aria-selected="true"\`
- Input has \`aria-autocomplete="list"\` for predictive text

### Keyboard Navigation
- **Arrow Up/Down**: Navigate options
- **Enter**: Select focused option
- **Escape**: Close popup
- **Type**: Filter options by search
- **Home/End**: Jump to first/last option

### Screen Reader Behavior
- Announces "combobox" role with autocomplete capability
- Option count announced
- Selected value announced
- Filtered results announced as list updates

### Focus Management
- Input receives focus initially
- Focus moves within listbox when open
- Focus returns to input after selection
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

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
  { value: "mx", label: "Mexico" },
  { value: "kr", label: "South Korea" },
];

const ControlledCombobox = (props: React.ComponentProps<typeof Combobox>) => {
  const [value, setValue] = React.useState("");
  return <Combobox {...props} value={value} onValueChange={setValue} />;
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: `Basic combobox with searchable options. Use arrow keys to navigate, Enter to select.`,
      },
    },
  },
  render: () => (
    <div className="w-full max-w-sm">
      <ControlledCombobox options={frameworks} placeholder="Select a framework..." />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => {
    const [sm, setSm] = React.useState("");
    const [md, setMd] = React.useState("");
    const [lg, setLg] = React.useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "320px" }}>
        <div>
          <p
            style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}
          >
            Small
          </p>
          <Combobox
            size="sm"
            options={frameworks}
            value={sm}
            onValueChange={setSm}
            placeholder="Select..."
          />
        </div>
        <div>
          <p
            style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}
          >
            Medium (default)
          </p>
          <Combobox
            size="md"
            options={frameworks}
            value={md}
            onValueChange={setMd}
            placeholder="Select..."
          />
        </div>
        <div>
          <p
            style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}
          >
            Large
          </p>
          <Combobox
            size="lg"
            options={frameworks}
            value={lg}
            onValueChange={setLg}
            placeholder="Select..."
          />
        </div>
      </div>
    );
  },
};

export const WithInitialValue: Story = {
  render: () => {
    const [value, setValue] = React.useState("react");
    return (
      <div className="w-full max-w-sm">
        <Combobox options={frameworks} value={value} onValueChange={setValue} />
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
      <Combobox options={frameworks} value="react" placeholder="Select a framework..." disabled />
    </div>
  ),
};

export const WithDisabledOptions: Story = {
  render: () => {
    const options = [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue", disabled: true },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte", disabled: true },
      { value: "solid", label: "SolidJS" },
    ];
    const [value, setValue] = React.useState("");
    return (
      <div className="w-full max-w-sm">
        <Combobox
          options={options}
          value={value}
          onValueChange={setValue}
          placeholder="Select framework..."
        />
      </div>
    );
  },
};

export const EmptyState: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <ControlledCombobox options={[]} emptyText="No frameworks available." />
    </div>
  ),
};

export const LongOptionList: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="w-full max-w-sm">
        <Combobox
          options={countries}
          value={value}
          onValueChange={setValue}
          placeholder="Select a country..."
          searchPlaceholder="Search countries..."
        />
      </div>
    );
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
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
