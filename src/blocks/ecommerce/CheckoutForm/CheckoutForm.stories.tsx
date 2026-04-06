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
    price: 149.0,
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
    docs: {
      source: {
        code: `import { CheckoutForm } from "@launchapp/design-system/blocks";

const orderSummary = [
  { name: "Wireless Headphones", quantity: 1, price: 99.99 },
  { name: "Smart Watch", quantity: 2, price: 299.99 },
];

export default function Page() {
  return (
    <CheckoutForm
      orderSummary={orderSummary}
      onSubmit={async (values) => {
        console.log(values);
      }}
    />
  );
}`,
      },
    },
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

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  args: {
    orderItems,
    onSubmit: async (values) => console.log(values),
  },
  parameters: {
    docs: {
      description: {
        story:
          "CheckoutForm is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Badge,
  Button,
  Card, CardHeader, CardTitle, CardContent,
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
  Input, Label,
  RadioGroup, RadioGroupItem,
  Separator,
} from "@launchapp/design-system";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const checkoutSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(5),
  city: z.string().min(1),
  postalCode: z.string().min(3),
  country: z.string().min(1),
  paymentMethod: z.enum(["card", "paypal"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
});

export function CheckoutForm({ orderItems = [], onSubmit, isLoading }) {
  const form = useForm({ resolver: zodResolver(checkoutSchema), defaultValues: { paymentMethod: "card" } });
  const subtotal = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
            <CardContent>
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Shipping address</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {/* firstName, lastName, address, city, postalCode, country fields */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card">Card</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )} />
              {/* Card number, expiry, CVC fields shown when paymentMethod === "card" */}
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing…" : \`Pay $\${subtotal.toFixed(2)}\`}
          </Button>
        </form>
      </Form>

      <div className="space-y-4">
        <Card>
          <CardHeader><CardTitle>Order summary</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {orderItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>\${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span><span>\${subtotal.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}`,
      },
    },
  },
};
