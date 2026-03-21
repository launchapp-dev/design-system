import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PhoneNumberInput, type Country } from "./PhoneNumberInput";

const meta: Meta<typeof PhoneNumberInput> = {
  title: "Components/PhoneNumberInput",
  component: PhoneNumberInput,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    defaultCountryCode: {
      control: "select",
      options: ["US", "GB", "CA", "AU", "DE", "FR", "JP", "CN", "IN"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PhoneNumberInput>;

export const Default: Story = {
  args: {
    value: "",
    onChange: (value) => console.log("Phone:", value),
    placeholder: "Phone number",
  },
};

export const USNumber: Story = {
  args: {
    value: "+15551234567",
    defaultCountryCode: "US",
    onChange: (value) => console.log("Phone:", value),
  },
};

export const UKNumber: Story = {
  args: {
    value: "",
    defaultCountryCode: "GB",
    onChange: (value) => console.log("Phone:", value),
  },
};

export const Small: Story = {
  args: {
    value: "",
    size: "sm",
    onChange: (value) => console.log("Phone:", value),
  },
};

export const Large: Story = {
  args: {
    value: "",
    size: "lg",
    onChange: (value) => console.log("Phone:", value),
  },
};

export const Disabled: Story = {
  args: {
    value: "+15551234567",
    disabled: true,
    onChange: () => {},
  },
};

export const WithError: Story = {
  args: {
    value: "",
    error: true,
    onChange: (value) => console.log("Phone:", value),
  },
};

const limitedCountries: Country[] = [
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
];

export const LimitedCountries: Story = {
  args: {
    value: "",
    countries: limitedCountries,
    defaultCountryCode: "US",
    onChange: (value) => console.log("Phone:", value),
  },
};

function InteractivePhoneInput() {
  const [phone, setPhone] = React.useState("");
  const [country, setCountry] = React.useState<Country | null>(null);

  return (
    <div className="space-y-4">
      <PhoneNumberInput
        value={phone}
        onChange={setPhone}
        onCountryChange={setCountry}
        placeholder="Enter phone number"
      />
      <div className="text-sm space-y-1">
        <p>
          <strong>Full number:</strong> {phone || "(not entered)"}
        </p>
        {country && (
          <p>
            <strong>Selected country:</strong> {country.flag} {country.name}
          </p>
        )}
      </div>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractivePhoneInput />,
};

function PhoneForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "+1",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitted: ${formData.name} - ${formData.phone}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      <div>
        <label className="text-sm font-medium">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 w-full px-3 py-2 border rounded-md"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Phone Number</label>
        <div className="mt-1">
          <PhoneNumberInput
            value={formData.phone}
            onChange={(phone) => setFormData({ ...formData, phone })}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-primary text-white rounded-md hover:opacity-90"
      >
        Submit
      </button>
    </form>
  );
}

export const InForm: Story = {
  render: () => <PhoneForm />,
};
