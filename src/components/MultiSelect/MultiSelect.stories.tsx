import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MultiSelect } from "./index";

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  argTypes: {
    placeholder: { control: "text" },
    searchPlaceholder: { control: "text" },
    emptyText: { control: "text" },
    disabled: { control: "boolean" },
    maxCount: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const colors = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "yellow", label: "Yellow" },
  { value: "purple", label: "Purple" },
  { value: "orange", label: "Orange" },
  { value: "pink", label: "Pink" },
  { value: "teal", label: "Teal" },
];

const ControlledMultiSelect = (props: React.ComponentProps<typeof MultiSelect>) => {
  const [value, setValue] = React.useState<string[]>([]);
  return <MultiSelect {...props} value={value} onValueChange={setValue} />;
};

export const Default: Story = {
  render: () => (
    <div className="w-[320px]">
      <ControlledMultiSelect options={colors} placeholder="Select colors..." />
    </div>
  ),
};

export const WithInitialValues: Story = {
  render: () => {
    const [value, setValue] = React.useState(["red", "blue", "green"]);
    return (
      <div className="w-[320px]">
        <MultiSelect options={colors} value={value} onValueChange={setValue} placeholder="Select colors..." />
      </div>
    );
  },
};

export const OverflowBadges: Story = {
  render: () => {
    const [value, setValue] = React.useState(["red", "blue", "green", "yellow", "purple"]);
    return (
      <div className="w-[320px]">
        <MultiSelect options={colors} value={value} onValueChange={setValue} placeholder="Select colors..." maxCount={2} />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[320px]">
      <MultiSelect options={colors} disabled placeholder="Select colors..." />
    </div>
  ),
};

export const WithDisabledOptions: Story = {
  render: () => {
    const options = [
      { value: "red", label: "Red" },
      { value: "green", label: "Green", disabled: true },
      { value: "blue", label: "Blue" },
      { value: "yellow", label: "Yellow", disabled: true },
      { value: "purple", label: "Purple" },
    ];
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <div className="w-[320px]">
        <MultiSelect options={options} value={value} onValueChange={setValue} placeholder="Select colors..." />
      </div>
    );
  },
};

export const EmptyState: Story = {
  render: () => (
    <div className="w-[320px]">
      <ControlledMultiSelect options={[]} emptyText="No colors available." />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(["red", "blue"]);
    return (
      <div className="dark rounded-lg bg-background p-6 w-[320px]">
        <MultiSelect options={colors} value={value} onValueChange={setValue} placeholder="Select colors..." />
      </div>
    );
  },
};
