import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AddressAutocomplete, type AddressSuggestion } from "./AddressAutocomplete";

const meta: Meta<typeof AddressAutocomplete> = {
  title: "Components/AddressAutocomplete",
  component: AddressAutocomplete,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showDetails: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddressAutocomplete>;

const mockSuggestions: AddressSuggestion[] = [
  {
    id: "1",
    label: "123 Main St, San Francisco, CA 94102",
    street: "123 Main St",
    city: "San Francisco",
    state: "CA",
    postalCode: "94102",
    country: "United States",
    countryCode: "US",
  },
  {
    id: "2",
    label: "456 Oak Ave, Los Angeles, CA 90001",
    street: "456 Oak Ave",
    city: "Los Angeles",
    state: "CA",
    postalCode: "90001",
    country: "United States",
    countryCode: "US",
  },
  {
    id: "3",
    label: "789 Pine Rd, New York, NY 10001",
    street: "789 Pine Rd",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
    countryCode: "US",
  },
];

const mockSearch = async (query: string): Promise<AddressSuggestion[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!query.trim()) return [];
  return mockSuggestions.filter(
    (s) =>
      s.street.toLowerCase().includes(query.toLowerCase()) ||
      s.city.toLowerCase().includes(query.toLowerCase())
  );
};

export const Default: Story = {
  args: {
    value: null,
    onChange: (value) => console.log("Address:", value),
    onSearch: mockSearch,
    placeholder: "Enter your address",
  },
};

export const Small: Story = {
  args: {
    value: null,
    size: "sm",
    onChange: (value) => console.log("Address:", value),
    onSearch: mockSearch,
  },
};

export const Large: Story = {
  args: {
    value: null,
    size: "lg",
    onChange: (value) => console.log("Address:", value),
    onSearch: mockSearch,
  },
};

export const WithoutDetails: Story = {
  args: {
    value: null,
    showDetails: false,
    onChange: (value) => console.log("Address:", value),
    onSearch: mockSearch,
  },
};

export const WithError: Story = {
  args: {
    value: null,
    error: true,
    onChange: (value) => console.log("Address:", value),
    onSearch: mockSearch,
  },
};

export const Disabled: Story = {
  args: {
    value: mockSuggestions[0],
    disabled: true,
    onChange: () => {},
    onSearch: mockSearch,
  },
};

export const WithControlledSuggestions: Story = {
  args: {
    value: null,
    suggestions: mockSuggestions,
    onChange: (value) => console.log("Address:", value),
    placeholder: "Suggestions always visible",
  },
};

function InteractiveAddressInput() {
  const [address, setAddress] = React.useState<any>(null);

  return (
    <div className="space-y-4">
      <AddressAutocomplete
        value={address}
        onChange={setAddress}
        onSearch={mockSearch}
        placeholder="Start typing an address..."
        showDetails
      />
      <div className="text-sm space-y-1">
        <p className="font-medium">Selected Address:</p>
        {address ? (
          <pre className="bg-muted p-3 rounded-md text-xs overflow-auto">
            {JSON.stringify(address, null, 2)}
          </pre>
        ) : (
          <p className="text-muted-foreground">No address selected</p>
        )}
      </div>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveAddressInput />,
};

function AddressForm() {
  const [address, setAddress] = React.useState<any>(null);

  return (
    <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="text-sm font-medium">Street Address</label>
        <div className="mt-1">
          <AddressAutocomplete
            value={address}
            onChange={setAddress}
            onSearch={mockSearch}
            showDetails={false}
            placeholder="Search for your address..."
          />
        </div>
      </div>

      {address && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">City</label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="mt-1 w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">State</label>
            <input
              type="text"
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              className="mt-1 w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">ZIP Code</label>
            <input
              type="text"
              value={address.postalCode}
              onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
              className="mt-1 w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Country</label>
            <input
              type="text"
              value={address.country}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
              className="mt-1 w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
        </div>
      )}
    </form>
  );
}

export const InForm: Story = {
  render: () => <AddressForm />,
};
