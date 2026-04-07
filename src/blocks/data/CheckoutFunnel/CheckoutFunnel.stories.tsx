import type { Meta, StoryObj } from "@storybook/react";
import { CheckoutFunnel } from "./CheckoutFunnel";
import type { CheckoutFunnelStep } from "./CheckoutFunnel";

const funnelSteps: CheckoutFunnelStep[] = [
  { id: "view", label: "Product View", count: 10000 },
  { id: "add-cart", label: "Add to Cart", count: 6234 },
  { id: "begin-checkout", label: "Begin Checkout", count: 3847 },
  { id: "shipping", label: "Shipping Info", count: 2943 },
  { id: "payment", label: "Payment", count: 2587 },
  { id: "complete", label: "Order Complete", count: 2311 },
];

const meta: Meta<typeof CheckoutFunnel> = {
  title: "Blocks/Data/CheckoutFunnel",
  component: CheckoutFunnel,
};

export default meta;
type Story = StoryObj<typeof CheckoutFunnel>;

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <CheckoutFunnel steps={funnelSteps} startCount={10000} />
    </div>
  ),
};

export const WithoutDropoff: Story = {
  render: () => (
    <div className="p-4">
      <CheckoutFunnel steps={funnelSteps} startCount={10000} showDropoff={false} />
    </div>
  ),
};

export const SmallDataset: Story = {
  render: () => (
    <div className="p-4">
      <CheckoutFunnel
        steps={[
          { id: "sign", label: "Sign Up", count: 847 },
          { id: "verify", label: "Email Verified", count: 712 },
          { id: "profile", label: "Profile Complete", count: 534 },
          { id: "first-action", label: "First Action", count: 389 },
        ]}
        startCount={1000}
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
    <CheckoutFunnel steps={funnelSteps} startCount={10000} />
  ),
};
