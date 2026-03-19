import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ShoppingCart } from "./index";
import type { CartItem } from "./index";

const sampleItems: CartItem[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    price: 79.99,
    quantity: 1,
    variant: "Midnight Black",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    price: 149.00,
    quantity: 1,
    variant: "Brown / 42mm",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: 49.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop",
  },
];

const meta: Meta<typeof ShoppingCart> = {
  title: "Blocks/Ecommerce/ShoppingCart",
  component: ShoppingCart,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ShoppingCart>;

export const Default: Story = {
  args: {
    items: sampleItems,
    onCheckout: () => alert("Proceeding to checkout"),
  },
};

export const WithFreeShipping: Story = {
  args: {
    items: sampleItems,
    freeShippingThreshold: 200,
    onCheckout: () => {},
  },
};

export const NearFreeShipping: Story = {
  args: {
    items: [sampleItems[0]],
    freeShippingThreshold: 100,
    onCheckout: () => {},
  },
};

export const SingleItem: Story = {
  args: {
    items: [sampleItems[0]],
    onCheckout: () => {},
  },
};

export const EmptyCart: Story = {
  args: {
    items: [],
  },
};

export const WithCallbacks: Story = {
  render: () => {
    const [items, setItems] = React.useState<CartItem[]>(sampleItems);

    function handleQuantityChange(id: string, quantity: number) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }

    function handleRemove(id: string) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }

    return (
      <ShoppingCart
        items={items}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemove}
        onCheckout={() => alert("Checkout!")}
        freeShippingThreshold={200}
      />
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
  args: {
    items: sampleItems,
    freeShippingThreshold: 200,
    onCheckout: () => {},
  },
};
