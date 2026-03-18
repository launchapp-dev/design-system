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
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "qwik", label: "Qwik" },
];

const ControlledCombobox = (props: React.ComponentProps<typeof Combobox>) => {
  const [value, setValue] = React.useState("");
  return <Combobox {...props} value={value} onValueChange={setValue} />;
};

export const Default: Story = {
  render: () => (
    <div className="w-[280px]">
      <ControlledCombobox options={frameworks} placeholder="Select framework..." />
    </div>
  ),
};

export const WithInitialValue: Story = {
  render: () => {
    const [value, setValue] = React.useState("react");
    return (
      <div className="w-[280px]">
        <Combobox options={frameworks} value={value} onValueChange={setValue} />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[280px]">
      <Combobox options={frameworks} disabled placeholder="Select framework..." />
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
      { value: "solid", label: "Solid" },
    ];
    const [value, setValue] = React.useState("");
    return (
      <div className="w-[280px]">
        <Combobox options={options} value={value} onValueChange={setValue} placeholder="Select framework..." />
      </div>
    );
  },
};

export const EmptyState: Story = {
  render: () => (
    <div className="w-[280px]">
      <ControlledCombobox options={[]} emptyText="No frameworks available." />
    </div>
  ),
};

export const LongOptionList: Story = {
  render: () => {
    const countries = [
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "ca", label: "Canada" },
      { value: "au", label: "Australia" },
      { value: "de", label: "Germany" },
      { value: "fr", label: "France" },
      { value: "jp", label: "Japan" },
      { value: "cn", label: "China" },
      { value: "br", label: "Brazil" },
      { value: "in", label: "India" },
      { value: "mx", label: "Mexico" },
      { value: "kr", label: "South Korea" },
    ];
    const [value, setValue] = React.useState("");
    return (
      <div className="w-[280px]">
        <Combobox options={countries} value={value} onValueChange={setValue} placeholder="Select country..." searchPlaceholder="Search countries..." />
      </div>
    );
  },
};

export const DarkMode: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="dark rounded-lg bg-background p-6 w-[280px]">
        <Combobox options={frameworks} value={value} onValueChange={setValue} placeholder="Select framework..." />
      </div>
    );
  },
};
