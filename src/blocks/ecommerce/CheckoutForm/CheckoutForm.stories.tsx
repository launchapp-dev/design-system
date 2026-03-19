import type { Meta, StoryObj } from "@storybook/react";
import { CheckoutForm } from "./index";
import type { OrderSummaryItem } from "./index";

const orderItems: OrderSummaryItem[] = [
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

const meta: Meta<typeof CheckoutForm> = {
  title: "Blocks/Ecommerce/CheckoutForm",
  component: CheckoutForm,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof CheckoutForm>;

export const Default: Story = {
  args: {
    orderItems,
    onSubmit: async (values) => {
      console.log("Order submitted:", values);
      await new Promise((r) => setTimeout(r, 1000));
    },
  },
};

export const Loading: Story = {
  args: {
    orderItems,
    isLoading: true,
  },
};

export const EmptyOrder: Story = {
  args: {
    orderItems: [],
    onSubmit: (values) => console.log(values),
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
    orderItems,
    onSubmit: async (values) => console.log(values),
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    orderItems,
    onSubmit: async (values) => console.log(values),
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  args: {
    orderItems,
    onSubmit: async (values) => console.log(values),
  },
};
