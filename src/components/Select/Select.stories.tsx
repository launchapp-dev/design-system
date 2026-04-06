import type { Meta, StoryObj } from "@storybook/react";
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectSeparator,
} from "./index";

const meta: Meta = {
  title: "Components/Select",
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <SelectRoot>
      <SelectTrigger size={args.size as "sm" | "md" | "lg"} disabled={args.disabled} style={{ width: 200 }}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </SelectRoot>
  ),
};

export const WithPlaceholder: Story = {
  render: () => (
    <SelectRoot>
      <SelectTrigger style={{ width: 200 }}>
        <SelectValue placeholder="Choose an option…" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </SelectRoot>
  ),
};

export const Disabled: Story = {
  render: () => (
    <SelectRoot>
      <SelectTrigger disabled style={{ width: 200 }}>
        <SelectValue placeholder="Disabled select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="item">Item</SelectItem>
      </SelectContent>
    </SelectRoot>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <SelectRoot>
      <SelectTrigger style={{ width: 220 }}>
        <SelectValue placeholder="Select a food" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  ),
};

export const WithError: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: 200 }}>
      <SelectRoot>
        <SelectTrigger
          style={{ width: 200 }}
          className="border-destructive focus:ring-destructive"
          aria-invalid="true"
        >
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </SelectRoot>
      <span style={{ fontSize: "12px", color: "hsl(var(--destructive))" }}>Please select a value</span>
    </div>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <SelectRoot>
      <SelectTrigger style={{ width: 220 }}>
        <SelectValue placeholder="Select a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Free</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
        <SelectItem value="enterprise" disabled>Enterprise (contact sales)</SelectItem>
      </SelectContent>
    </SelectRoot>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <SelectRoot key={size}>
          <SelectTrigger size={size} style={{ width: 200 }}>
            <SelectValue placeholder={`Size: ${size}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </SelectRoot>
      ))}
    </div>
  ),
};
