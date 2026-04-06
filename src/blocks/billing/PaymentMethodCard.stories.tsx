import type { Meta, StoryObj } from "@storybook/react";
import { PaymentMethodCard } from "./PaymentMethodCard";

const meta: Meta<typeof PaymentMethodCard> = {
  title: "Blocks/Billing/PaymentMethodCard",
  component: PaymentMethodCard,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const defaultMethods = [
  {
    id: "pm_1",
    type: "card" as const,
    brand: "Visa",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2027,
    isDefault: true,
    name: "Personal card",
  },
  {
    id: "pm_2",
    type: "card" as const,
    brand: "Mastercard",
    last4: "8888",
    expiryMonth: 6,
    expiryYear: 2026,
    isDefault: false,
    name: "Business card",
  },
  {
    id: "pm_3",
    type: "paypal" as const,
    isDefault: false,
    name: "paypal@company.com",
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <PaymentMethodCard
        methods={defaultMethods}
        selectedId="pm_1"
        onSelect={(m) => console.log("Select", m.id)}
        onManage={(m) => console.log("Manage", m.id)}
        onSetDefault={(m) => console.log("Set default", m.id)}
        onAddNew={() => console.log("Add new")}
      />
    </div>
  ),
};

export const RadioMode: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <PaymentMethodCard
        methods={defaultMethods}
        selectedId="pm_2"
        onSelect={(m) => console.log("Selected", m.id)}
        onManage={(m) => console.log("Manage", m.id)}
      />
    </div>
  ),
};

export const DisplayOnly: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <PaymentMethodCard methods={defaultMethods} />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <PaymentMethodCard methods={[]} onAddNew={() => console.log("Add new")} />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <PaymentMethodCard
        methods={defaultMethods.slice(0, 2)}
        selectedId="pm_1"
        onSelect={(m) => console.log("Select", m.id)}
        onManage={(m) => console.log("Manage", m.id)}
        onAddNew={() => console.log("Add new")}
      />
    </div>
  ),
};
