import type { Meta, StoryObj } from "@storybook/react";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

const meta: Meta<typeof ForgotPasswordForm> = {
  title: "Blocks/Auth/ForgotPasswordForm",
  component: ForgotPasswordForm,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `import { ForgotPasswordForm } from "@launchapp/design-system/blocks/auth";

export default function Page() {
  return (
    <ForgotPasswordForm
      onSubmit={async (values) => {
        console.log(values);
      }}
      onBackToLoginClick={() => console.log("back to login")}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ForgotPasswordForm>;

export const Default: Story = {};

export const WithLoginLink: Story = {
  args: {
    onLoginClick: () => alert("Navigate to login"),
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    error: "Something went wrong. Please try again.",
    onLoginClick: () => {},
  },
};

export const Success: Story = {
  args: {
    success: true,
    onLoginClick: () => {},
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
};
