import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CartDrawer } from "./CartDrawer";
import type { DrawerCartItem } from "./CartDrawer";

const items: DrawerCartItem[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    price: 79.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    currency: "$",
    maxQuantity: 10,
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    price: 149.0,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    currency: "$",
    maxQuantity: 5,
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: 49.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop",
    currency: "$",
    maxQuantity: 20,
  },
];

function CartDrawerDemo({ items: demoItems, ...props }: { items: DrawerCartItem[] }) {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState(demoItems);

  const handleUpdate = (id: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)),
    );
  };

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClear = () => setCartItems([]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Open Cart ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)
      </button>
      <CartDrawer
        open={open}
        onOpenChange={setOpen}
        items={cartItems}
        onUpdateQuantity={handleUpdate}
        onRemoveItem={handleRemove}
        onClearCart={handleClear}
        onCheckout={() => console.log("Checkout")}
        {...props}
      />
    </>
  );
}

const meta: Meta<typeof CartDrawer> = {
  title: "Blocks/Ecommerce/CartDrawer",
  component: CartDrawer,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof CartDrawer>;

export const Default: Story = {
  render: () => <CartDrawerDemo items={items} />,
};

export const WithShippingAndTax: Story = {
  name: "With Shipping and Tax",
  render: () => (
    <CartDrawerDemo
      items={items}
      shippingCost={5.99}
      taxRate={0.08}
      discount={{ code: "SAVE10", amount: 10 }}
    />
  ),
};

export const FreeShipping: Story = {
  render: () => <CartDrawerDemo items={items} shippingCost={0} taxRate={0.08} />,
};

export const Empty: Story = {
  render: () => <CartDrawerDemo items={[]} />,
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  render: () => <CartDrawerDemo items={items} />,
};
