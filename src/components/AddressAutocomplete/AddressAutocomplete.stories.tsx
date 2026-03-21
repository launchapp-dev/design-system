import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AddressAutocomplete, type AddressSuggestion } from "./index";

const meta: Meta<typeof AddressAutocomplete> = {
  title: "Components/AddressAutocomplete",
  component: AddressAutocomplete,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    showIcons: { control: "boolean" },
    debounceMs: { control: { type: "number", min: 0, max: 1000 } },
    minChars: { control: { type: "number", min: 1, max: 10 } },
  },
  args: {
    size: "md",
    disabled: false,
    error: false,
    showIcons: true,
    debounceMs: 300,
    minChars: 3,
    placeholder: "Search for an address...",
  },
};

export default meta;
type Story = StoryObj<typeof AddressAutocomplete>;

const MOCK_SUGGESTIONS: AddressSuggestion[] = [
  {
    id: "1",
    label: "1600 Amphitheatre Parkway",
    description: "Mountain View, CA 94043, USA",
    street: "1600 Amphitheatre Parkway",
    city: "Mountain View",
    state: "CA",
    postalCode: "94043",
    country: "United States",
    countryCode: "US",
    latitude: 37.422,
    longitude: -122.084,
  },
  {
    id: "2",
    label: "1 Infinite Loop",
    description: "Cupertino, CA 95014, USA",
    street: "1 Infinite Loop",
    city: "Cupertino",
    state: "CA",
    postalCode: "95014",
    country: "United States",
    countryCode: "US",
    latitude: 37.331,
    longitude: -122.029,
  },
  {
    id: "3",
    label: "10 Downing Street",
    description: "London SW1A 2AA, United Kingdom",
    street: "10 Downing Street",
    city: "London",
    postalCode: "SW1A 2AA",
    country: "United Kingdom",
    countryCode: "GB",
    latitude: 51.503,
    longitude: -0.127,
  },
  {
    id: "4",
    label: "Eiffel Tower",
    description: "Champ de Mars, Paris, France",
    street: "Champ de Mars",
    city: "Paris",
    country: "France",
    countryCode: "FR",
    latitude: 48.858,
    longitude: 2.294,
  },
  {
    id: "5",
    label: "Sydney Opera House",
    description: "Sydney NSW 2000, Australia",
    street: "Bennelong Point",
    city: "Sydney",
    postalCode: "2000",
    country: "Australia",
    countryCode: "AU",
    latitude: -33.856,
    longitude: 151.215,
  },
];

const mockSearch = async (query: string): Promise<AddressSuggestion[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_SUGGESTIONS.filter(
    (s) =>
      s.label.toLowerCase().includes(query.toLowerCase()) ||
      s.description?.toLowerCase().includes(query.toLowerCase())
  );
};

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    const [selected, setSelected] = React.useState<AddressSuggestion | null>(null);
    return (
      <div className="space-y-4">
        <AddressAutocomplete
          {...args}
          value={value}
          onChange={(v, s) => {
            setValue(v);
            setSelected(s);
          }}
          onSearch={mockSearch}
        />
        <div className="rounded-md border border-[hsl(var(--la-border))] p-4">
          <p className="text-sm font-medium">Selected Address:</p>
          <pre className="mt-2 max-h-40 overflow-auto text-xs text-[hsl(var(--la-muted-foreground))]">
            {selected ? JSON.stringify(selected, null, 2) : "(none)"}
          </pre>
        </div>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [selected, setSelected] = React.useState<AddressSuggestion | null>(null);
    return (
      <div className="space-y-4">
        <AddressAutocomplete
          value={value}
          onChange={(v, s) => {
            setValue(v);
            if (s) setSelected(s);
          }}
          onSearch={mockSearch}
        />
        <div className="flex gap-2">
          <button
            onClick={() => {
              setValue("1600 Amphitheatre Parkway");
              setSelected(null);
            }}
            className="rounded-md bg-[hsl(var(--la-primary))] px-3 py-1.5 text-sm text-[hsl(var(--la-primary-foreground))]"
          >
            Set Google HQ
          </button>
          <button
            onClick={() => {
              setValue("");
              setSelected(null);
            }}
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
        <AddressAutocomplete
          size="sm"
          value={sm}
          onChange={setSm}
          onSearch={mockSearch}
          placeholder="Small size"
        />
        <AddressAutocomplete
          size="md"
          value={md}
          onChange={setMd}
          onSearch={mockSearch}
          placeholder="Medium size"
        />
        <AddressAutocomplete
          size="lg"
          value={lg}
          onChange={setLg}
          onSearch={mockSearch}
          placeholder="Large size"
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="space-y-2">
        <AddressAutocomplete
          value={value}
          onChange={setValue}
          onSearch={mockSearch}
          error
        />
        <p className="text-sm text-[hsl(var(--la-destructive))]">Please select a valid address</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <AddressAutocomplete
      value="1600 Amphitheatre Parkway"
      disabled
      onSearch={mockSearch}
    />
  ),
};

export const NoIcons: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <AddressAutocomplete
        value={value}
        onChange={setValue}
        onSearch={mockSearch}
        showIcons={false}
        placeholder="No location icon"
      />
    );
  },
};

export const ExternalSuggestions: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [suggestions, setSuggestions] = React.useState<AddressSuggestion[]>([]);
    const [loading, setLoading] = React.useState(false);

    const handleSearch = async (query: string) => {
      setLoading(true);
      const results = await mockSearch(query);
      setSuggestions(results);
      setLoading(false);
    };

    return (
      <div className="space-y-4">
        <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
          Suggestions are managed externally (controlled suggestions mode)
        </p>
        <AddressAutocomplete
          value={value}
          onChange={setValue}
          suggestions={suggestions}
          loading={loading}
          placeholder="Type to search..."
        />
        <button
          onClick={() => handleSearch(value)}
          className="rounded-md border border-[hsl(var(--la-border))] px-3 py-1.5 text-sm"
        >
          Search: "{value || "..."}"
        </button>
        <div className="text-sm">
          {suggestions.length} suggestions loaded
        </div>
      </div>
    );
  },
};

export const OnSuggestionSelect: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [selectedSuggestion, setSelectedSuggestion] = React.useState<AddressSuggestion | null>(null);
    
    return (
      <div className="space-y-4">
        <AddressAutocomplete
          value={value}
          onChange={(v) => setValue(v)}
          onSearch={mockSearch}
          onSuggestionSelect={(suggestion) => {
            setSelectedSuggestion(suggestion);
            console.log("Selected:", suggestion);
          }}
        />
        {selectedSuggestion && (
          <div className="rounded-md bg-[hsl(var(--la-muted))] p-4">
            <p className="font-medium">{selectedSuggestion.label}</p>
            {selectedSuggestion.description && (
              <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
                {selectedSuggestion.description}
              </p>
            )}
            {selectedSuggestion.latitude && selectedSuggestion.longitude && (
              <p className="mt-2 text-xs text-[hsl(var(--la-muted-foreground))]">
                Coordinates: {selectedSuggestion.latitude.toFixed(4)}, {selectedSuggestion.longitude.toFixed(4)}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
};

export const CustomDebounce: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="space-y-2">
        <AddressAutocomplete
          value={value}
          onChange={setValue}
          onSearch={mockSearch}
          debounceMs={100}
          minChars={2}
        />
        <p className="text-xs text-[hsl(var(--la-muted-foreground))]">
          Faster debounce (100ms) and lower minimum chars (2)
        </p>
      </div>
    );
  },
};
