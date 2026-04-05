import type { Meta, StoryObj } from "@storybook/react";
import { AuthFormBlock } from "./AuthFormBlock";

const meta: Meta<typeof AuthFormBlock> = {
  title: "Blocks/Auth/AuthFormBlock",
  component: AuthFormBlock,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `import { AuthFormBlock } from "@launchapp/design-system/blocks";

export default function Page() {
  return (
    <AuthFormBlock
      variant="login"
      onSubmit={async (values) => {
        console.log(values);
      }}
      onSocialLogin={(provider) => {
        console.log("social login:", provider);
      }}
      onSwitchVariant={(variant) => {
        console.log("switch to:", variant);
      }}
    />
  );
}`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["login", "register", "forgot-password"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthFormBlock>;

export const Login: Story = {
  args: {
    variant: "login",
    onSwitchVariant: (v) => alert(`Switch to: ${v}`),
    onSocialLogin: (p) => alert(`Social login: ${p}`),
  },
};

export const Register: Story = {
  args: {
    variant: "register",
    onSwitchVariant: (v) => alert(`Switch to: ${v}`),
    onSocialLogin: (p) => alert(`Social login: ${p}`),
  },
};

export const ForgotPassword: Story = {
  args: {
    variant: "forgot-password",
    onSwitchVariant: (v) => alert(`Switch to: ${v}`),
  },
};

export const ForgotPasswordSuccess: Story = {
  args: {
    variant: "forgot-password",
    success: true,
    onSwitchVariant: (v) => alert(`Switch to: ${v}`),
  },
};

export const LoginLoading: Story = {
  args: {
    variant: "login",
    isLoading: true,
    onSwitchVariant: (v) => alert(`Switch to: ${v}`),
    onSocialLogin: (p) => alert(`Social login: ${p}`),
  },
};

export const RegisterLoading: Story = {
  args: {
    variant: "register",
    isLoading: true,
    onSwitchVariant: (v) => alert(`Switch to: ${v}`),
    onSocialLogin: (p) => alert(`Social login: ${p}`),
  },
};

export const LoginWithError: Story = {
  args: {
    variant: "login",
    error: "Invalid email or password. Please try again.",
    onSwitchVariant: (v) => alert(`Switch to: ${v}`),
    onSocialLogin: (p) => alert(`Social login: ${p}`),
  },
};

export const RegisterWithError: Story = {
  args: {
    variant: "register",
    error: "An account with this email already exists.",
    onSwitchVariant: (v) => alert(`Switch to: ${v}`),
    onSocialLogin: (p) => alert(`Social login: ${p}`),
  },
};

export const LoginNoSocial: Story = {
  args: {
    variant: "login",
    socialProviders: [],
    onSwitchVariant: (v) => alert(`Switch to: ${v}`),
  },
};

export const LoginGoogleOnly: Story = {
  args: {
    variant: "login",
    socialProviders: [{ id: "google" }],
    onSwitchVariant: (v) => alert(`Switch to: ${v}`),
    onSocialLogin: (p) => alert(`Social login: ${p}`),
  },
};

export const Mobile: Story = {
  args: {
    variant: "login",
    onSwitchVariant: (v) => alert(`Switch to: ${v}`),
    onSocialLogin: (p) => alert(`Social login: ${p}`),
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
