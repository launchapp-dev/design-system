import type { Meta, StoryObj } from "@storybook/react";
import { AccountDeletionCard } from "./AccountDeletionCard";

const meta: Meta<typeof AccountDeletionCard> = {
  title: "Blocks/Settings/AccountDeletionCard",
  component: AccountDeletionCard,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { AccountDeletionCard } from "@launchapp/design-system/blocks";

<AccountDeletionCard onDelete={() => console.log("account deleted")} />`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <AccountDeletionCard onDelete={() => console.log("account deleted")} />,
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => <AccountDeletionCard onDelete={() => console.log("account deleted")} />,
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => <AccountDeletionCard onDelete={() => console.log("account deleted")} />,
};
