import type { Meta, StoryObj } from "@storybook/react";
import { FeedbackButtons } from "./index";

const meta: Meta<typeof FeedbackButtons> = {
  title: "Components/FeedbackButtons",
  component: FeedbackButtons,
  args: {
    content: "This is the AI response content that will be copied to clipboard.",
  },
};

export default meta;
type Story = StoryObj<typeof FeedbackButtons>;

export const Default: Story = {};

export const WithCallbacks: Story = {
  args: {
    onThumbsUp: () => console.log("Thumbs up"),
    onThumbsDown: () => console.log("Thumbs down"),
    onRegenerate: () => console.log("Regenerate"),
  },
};

export const InContext: Story = {
  render: () => (
    <div
      style={{
        maxWidth: 480,
        border: "1px solid hsl(var(--la-border))",
        borderRadius: 8,
        padding: 16,
      }}
    >
      <p style={{ fontSize: 14, lineHeight: "1.6", marginBottom: 12 }}>
        React is a JavaScript library for building user interfaces. It lets you
        compose complex UIs from small, isolated pieces of code called
        &ldquo;components&rdquo;.
      </p>
      <FeedbackButtons
        content="React is a JavaScript library for building user interfaces."
        onThumbsUp={() => console.log("Helpful")}
        onThumbsDown={() => console.log("Not helpful")}
        onRegenerate={() => console.log("Regenerating...")}
      />
    </div>
  ),
};
