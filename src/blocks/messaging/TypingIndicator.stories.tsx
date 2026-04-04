import type { Meta, StoryObj } from "@storybook/react";
import { TypingIndicator } from "./TypingIndicator";

const meta: Meta<typeof TypingIndicator> = {
  title: "Blocks/Messaging/TypingIndicator",
  component: TypingIndicator,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { TypingIndicator } from "@launchapp/design-system/blocks/messaging";

export default function Chat() {
  return <TypingIndicator label="Alice is typing…" />;
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TypingIndicator>;

export const Default: Story = {
  args: {
    label: "Alice is typing…",
  },
};

export const NoLabel: Story = {
  args: {
    label: "",
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div
      className="dark"
      style={{ background: "hsl(240 10% 3.9%)", padding: "24px" }}
    >
      <TypingIndicator {...args} />
    </div>
  ),
  args: {
    label: "Alice is typing…",
  },
};
