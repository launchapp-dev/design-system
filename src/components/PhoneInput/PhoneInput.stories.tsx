import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { PhoneInput, DEFAULT_COUNTRIES } from "./index";

const meta: Meta<typeof PhoneInput> = {
  title: "Components/PhoneInput",
  component: PhoneInput,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    showFlag: { control: "boolean" },
    showDialCode: { control: "boolean" },
  },
  args: {
    size: "md",
    disabled: false,
    error: false,
    showFlag: true,
    showDialCode: true,
    placeholder: "Enter phone number",
  },
};

export default meta;
type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    const [country, setCountry] = React.useState<{ dialCode: string; name: string } | null>(null);
    return (
      <div className="space-y-4">
        <PhoneInput
          {...args}
          value={value}
          onChange={(v, c) => {
            setValue(v);
            setCountry(c);
          }}
        />
        <div className="text-sm text-[hsl(var(--la-muted-foreground))]">
          <p>Value: {value || "(empty)"}</p>
          <p>Country: {country ? `${country.name} (${country.dialCode})` : "(none)"}</p>
        </div>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("+14155551234");
    return (
      <div className="space-y-4">
        <PhoneInput value={value} onChange={(v) => setValue(v)} />
        <div className="flex gap-2">
          <button
            onClick={() => setValue("+442071234567")}
            className="rounded-md bg-[hsl(var(--la-primary))] px-3 py-1.5 text-sm text-[hsl(var(--la-primary-foreground))]"
          >
            Set UK Number
          </button>
          <button
            onClick={() => setValue("")}
            className="rounded-md border border-[hsl(var(--la-border))] px-3 py-1.5 text-sm"
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [sm, setSm] = React.useState("");
    const [md, setMd] = React.useState("");
    const [lg, setLg] = React.useState("");
    return (
      <div className="flex flex-col gap-4">
        <PhoneInput size="sm" value={sm} onChange={setSm} placeholder="Small size" />
        <PhoneInput size="md" value={md} onChange={setMd} placeholder="Medium size" />
        <PhoneInput size="lg" value={lg} onChange={setLg} placeholder="Large size" />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="space-y-2">
        <PhoneInput value={value} onChange={setValue} error />
        <p className="text-sm text-[hsl(var(--la-destructive))]">Please enter a valid phone number</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <PhoneInput value="+14155551234" disabled />
  ),
};

export const HideFlag: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <PhoneInput
        value={value}
        onChange={setValue}
        showFlag={false}
        placeholder="No flag, dial code only"
      />
    );
  },
};

export const HideDialCode: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <PhoneInput
        value={value}
        onChange={setValue}
        showDialCode={false}
        placeholder="Flag only, no dial code"
      />
    );
  },
};

export const DifferentDefaultCountry: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <PhoneInput
        value={value}
        onChange={setValue}
        defaultCountryCode="GB"
        placeholder="Default: United Kingdom"
      />
    );
  },
};

export const CustomCountries: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const customCountries = DEFAULT_COUNTRIES.filter((c) =>
      ["US", "GB", "CA", "AU", "DE", "FR"].includes(c.code)
    );
    return (
      <PhoneInput
        value={value}
        onChange={setValue}
        countries={customCountries}
        placeholder="Limited country selection"
      />
    );
  },
};

export const WithInitialValue: Story = {
  render: () => {
    const [value, setValue] = React.useState("+442079460123");
    return (
      <div className="space-y-4">
        <PhoneInput value={value} onChange={setValue} />
        <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
          Initial value: +442079460123 (UK number, auto-detected)
        </p>
      </div>
    );
  },
};
