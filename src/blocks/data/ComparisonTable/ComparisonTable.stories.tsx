import type { Meta, StoryObj } from "@storybook/react";
import { ComparisonTable } from "./ComparisonTable";
import type { ComparisonProduct, ComparisonAttribute } from "./ComparisonTable";

const products: ComparisonProduct[] = [
  {
    id: "1",
    name: "Wireless Headphones Pro",
    price: 79.99,
    rating: 4.5,
    badge: "Best Value",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    batteryLife: "30 hours",
    noiseCancellation: true,
    wireless: true,
    waterResistance: "IPX4",
    warranty: "1 year",
    weight: "250g",
    pros: ["Excellent battery life", "Comfortable fit", "Great ANC"],
    cons: ["Slightly heavy", "No aptX support"],
  },
  {
    id: "2",
    name: "Studio Max Headphones",
    price: 149.0,
    rating: 4.8,
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&sat=-100",
    batteryLife: "40 hours",
    noiseCancellation: true,
    wireless: true,
    waterResistance: "IPX7",
    warranty: "2 years",
    weight: "220g",
    pros: ["Best-in-class ANC", "Premium build", "LDAC support"],
    cons: ["Expensive"],
  },
  {
    id: "3",
    name: "Sport Wireless Earbuds",
    price: 49.99,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
    batteryLife: "8 hours",
    noiseCancellation: false,
    wireless: true,
    waterResistance: "IPX5",
    warranty: "1 year",
    weight: "60g",
    pros: ["Very portable", "Affordable", "Secure fit"],
    cons: ["No ANC", "Shorter battery"],
  },
];

const attributes: ComparisonAttribute[] = [
  { key: "price", label: "Price" },
  { key: "rating", label: "Rating" },
  { key: "batteryLife", label: "Battery Life" },
  { key: "noiseCancellation", label: "Active Noise Cancellation" },
  { key: "wireless", label: "Wireless" },
  { key: "waterResistance", label: "Water Resistance" },
  { key: "warranty", label: "Warranty" },
  { key: "weight", label: "Weight" },
];

const meta: Meta<typeof ComparisonTable> = {
  title: "Blocks/Data/ComparisonTable",
  component: ComparisonTable,
};

export default meta;
type Story = StoryObj<typeof ComparisonTable>;

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <ComparisonTable
        products={products}
        attributes={attributes}
        onAddToCart={(p) => console.log("Add to cart", p.name)}
        onRemove={(p) => console.log("Remove", p.name)}
      />
    </div>
  ),
};

export const WithSelection: Story = {
  render: () => (
    <div className="p-4">
      <ComparisonTable
        products={products}
        attributes={attributes}
        selectedIds={["1", "2"]}
        onSelectionChange={(ids) => console.log("Selected", ids)}
        onAddToCart={(p) => console.log("Add to cart", p.name)}
      />
    </div>
  ),
};

export const TwoProducts: Story = {
  render: () => (
    <div className="p-4">
      <ComparisonTable
        products={products.slice(0, 2)}
        attributes={attributes}
        onAddToCart={(p) => console.log("Add to cart", p.name)}
      />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <ComparisonTable
      products={products.slice(0, 2)}
      attributes={attributes}
      onAddToCart={(p) => console.log("Add to cart", p.name)}
    />
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <ComparisonTable
      products={products}
      attributes={attributes}
      onAddToCart={(p) => console.log("Add to cart", p.name)}
    />
  ),
};
