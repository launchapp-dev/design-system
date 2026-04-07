import type { Meta, StoryObj } from "@storybook/react";
import { OrderSummary } from "./OrderSummary";
import type { SummaryItem } from "./OrderSummary";

const items: SummaryItem[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    quantity: 1,
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    quantity: 1,
    price: 149.0,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    quantity: 2,
    price: 49.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop",
  },
];

const meta: Meta<typeof OrderSummary> = {
  title: "Blocks/Ecommerce/OrderSummary",
  component: OrderSummary,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof OrderSummary>;

export const Default: Story = {
  args: {
    items,
    taxRate: 0.08,
    shippingCost: 5.99,
    freeShippingThreshold: 150,
    discountInput: true,
    onApplyDiscount: async (code: string) => {
      if (code === "SAVE10") return 10;
      throw new Error("Invalid code");
    },
  },
};

export const WithDiscount: Story = {
  name: "With Discount Applied",
  args: {
    items,
    taxRate: 0.08,
    shippingCost: 0,
    discount: { code: "SAVE20", amount: 20, description: "20% off promotion" },
    discountInput: true,
    onApplyDiscount: async (code: string) => {
      if (code === "SAVE10") return 10;
      throw new Error("Invalid code");
    },
    onRemoveDiscount: () => console.log("Remove discount"),
  },
};

export const FreeShipping: Story = {
  name: "Free Shipping",
  args: {
    items,
    taxRate: 0.08,
    shippingCost: 0,
    freeShippingThreshold: 150,
    discountInput: false,
  },
};

export const Loading: Story = {
  args: {
    items,
    loading: true,
    taxRate: 0.08,
    shippingCost: 5.99,
    discountInput: true,
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
  args: {
    items,
    taxRate: 0.08,
    shippingCost: 5.99,
    freeShippingThreshold: 150,
    discountInput: true,
    onApplyDiscount: async (code: string) => {
      if (code === "SAVE10") return 10;
      throw new Error("Invalid code");
    },
  },
};
