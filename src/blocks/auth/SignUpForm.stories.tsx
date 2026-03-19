import type { Meta, StoryObj } from "@storybook/react";
import { SignUpForm } from "./SignUpForm";

const meta: Meta<typeof SignUpForm> = {
  title: "Blocks/Auth/SignUpForm",
  component: SignUpForm,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SignUpForm>;

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
    error: "An account with this email already exists.",
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
