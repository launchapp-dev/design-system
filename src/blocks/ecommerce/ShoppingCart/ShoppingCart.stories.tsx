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
    docs: {
      source: {
        code: `import { ShoppingCart } from "@launchapp/design-system/blocks";

const items = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    quantity: 1,
    imageSrc: "/products/headphones.jpg",
    imageAlt: "Wireless Headphones",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    quantity: 2,
    imageSrc: "/products/watch.jpg",
    imageAlt: "Smart Watch",
  },
];

export default function Page() {
  return (
    <ShoppingCart
      items={items}
      taxRate={0.08}
      shippingCost={9.99}
      freeShippingThreshold={100}
      onCheckout={() => console.log("checkout")}
    />
  );
}`,
      },
    },
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

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    items: sampleItems,
    freeShippingThreshold: 200,
    onCheckout: () => {},
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  args: {
    items: sampleItems,
    freeShippingThreshold: 200,
    onCheckout: () => {},
  },
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  args: {
    items: sampleItems,
    freeShippingThreshold: 200,
    onCheckout: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          "ShoppingCart is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Badge,
  Button,
  Card, CardHeader, CardTitle, CardContent, CardFooter,
  Separator,
} from "@launchapp/design-system";

// ShoppingCart composes:
// – Card for the overall container
// – One row per cart item: product thumbnail, name, quantity controls (Button –/+), price, remove Button
// – Separator between items and order summary
// – Order summary section: subtotal, shipping badge ("Free" when threshold met), total
// – Checkout Button in CardFooter
// onUpdateQuantity and onRemoveItem callbacks allow the parent to manage cart state.
export function ShoppingCart({ items = [], freeShippingThreshold, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFree = freeShippingThreshold ? subtotal >= freeShippingThreshold : false;
  const total = shippingFree ? subtotal : subtotal + (items.length ? 9.99 : 0);

  return (
    <Card>
      <CardHeader><CardTitle>Shopping cart ({items.length})</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            {item.image && <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover" />}
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.name}</p>
              {item.variant && <p className="text-xs text-muted-foreground">{item.variant}</p>}
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => onUpdateQuantity?.(item.id, item.quantity - 1)}>−</Button>
              <span className="w-6 text-center text-sm">{item.quantity}</span>
              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}>+</Button>
            </div>
            <p className="w-16 text-right font-medium">\${(item.price * item.quantity).toFixed(2)}</p>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={() => onRemoveItem?.(item.id)}>×</Button>
          </div>
        ))}
        <Separator />
        <div className="space-y-1 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>\${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between items-center">
            <span>Shipping</span>
            {shippingFree ? <Badge variant="secondary">Free</Badge> : <span>$9.99</span>}
          </div>
          <div className="flex justify-between font-semibold text-base pt-1"><span>Total</span><span>\${total.toFixed(2)}</span></div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onCheckout}>Checkout</Button>
      </CardFooter>
    </Card>
  );
}`,
      },
    },
  },
};
