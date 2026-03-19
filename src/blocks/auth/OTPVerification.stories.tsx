import type { Meta, StoryObj } from "@storybook/react";
import { OTPVerification } from "./OTPVerification";

const meta: Meta<typeof OTPVerification> = {
  title: "Blocks/Auth/OTPVerification",
  component: OTPVerification,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof OTPVerification>;

export const Default: Story = {
  args: {
    email: "jane@example.com",
    onResend: () => alert("Code resent"),
  },
};

export const Loading: Story = {
  args: {
    email: "jane@example.com",
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    email: "jane@example.com",
    error: "Invalid code. Please try again.",
    onResend: () => {},
  },
};

export const ResendReady: Story = {
  args: {
    email: "jane@example.com",
    resendDelay: 0,
    onResend: () => alert("Code resent"),
  },
};
