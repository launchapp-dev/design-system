import type { Meta, StoryObj } from "@storybook/react";
import { VisuallyHidden } from "./index";

const meta = {
  title: "Utility/VisuallyHidden",
  component: VisuallyHidden,
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <button>
        <span aria-hidden>✕</span>
        <VisuallyHidden>Close dialog</VisuallyHidden>
      </button>
    </div>
  ),
};

export const WithScreenReaderText: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <p>
        The button below has a visible icon but accessible label hidden
        visually:
      </p>
      <button style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <span aria-hidden>🔍</span>
        <VisuallyHidden>Search</VisuallyHidden>
      </button>
    </div>
  ),
};

export const InForm: Story = {
  render: () => (
    <form style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div>
        <VisuallyHidden as="label" htmlFor="email">
          Email address
        </VisuallyHidden>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
    </form>
  ),
};
