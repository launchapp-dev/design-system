import type { Meta, StoryObj } from "@storybook/react";
import { OTPVerification } from "./OTPVerification";

const meta: Meta<typeof OTPVerification> = {
  title: "Blocks/Auth/OTPVerification",
  component: OTPVerification,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `import { OTPVerification } from "@launchapp/design-system/blocks/auth";

export default function Page() {
  return (
    <OTPVerification
      onVerify={async (otp) => {
        console.log(otp);
      }}
      onResend={() => console.log("resend")}
    />
  );
}`,
      },
    },
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

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    email: "jane@example.com",
    onResend: () => {},
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  args: {
    email: "jane@example.com",
    onResend: () => {},
  },
};
