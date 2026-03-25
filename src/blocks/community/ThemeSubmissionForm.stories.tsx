import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSubmissionForm } from "./ThemeSubmissionForm";

const meta: Meta<typeof ThemeSubmissionForm> = {
  title: "Blocks/Community/ThemeSubmissionForm",
  component: ThemeSubmissionForm,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `import { ThemeSubmissionForm } from "@launchapp/design-system/blocks";

export default function Page() {
  return (
    <ThemeSubmissionForm
      onSubmit={async (theme) => {
        console.log("Theme submitted:", theme);
      }}
      onCancel={() => console.log("Form cancelled")}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeSubmissionForm>;

export const Default: Story = {
  args: {
    onSubmit: async (theme) => {
      console.log("Theme submitted:", theme);
      alert(`Theme "${theme.name}" submitted successfully!`);
    },
    onCancel: () => console.log("Form cancelled"),
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
    onCancel: () => {},
  },
};

export const WithError: Story = {
  args: {
    error: "This theme ID is already taken. Please choose a different ID.",
    onSubmit: async () => {},
    onCancel: () => {},
  },
};
