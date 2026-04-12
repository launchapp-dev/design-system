import type { Meta, StoryObj } from "@storybook/react";
import { FeedbackWidget } from "./FeedbackWidget";

const meta: Meta<typeof FeedbackWidget> = {
  title: "Blocks/Notifications/FeedbackWidget",
  component: FeedbackWidget,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Popover: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <FeedbackWidget
        variant="popover"
        onSubmit={(f) => console.log("Feedback", f)}
      />
    </div>
  ),
};

export const Compact: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <FeedbackWidget
        variant="compact"
        onSubmit={(f) => console.log("Feedback", f)}
      />
    </div>
  ),
};

export const Inline: Story = {
  render: () => (
    <div className="max-w-sm">
      <FeedbackWidget
        variant="inline"
        title="We'd love your feedback"
        onSubmit={(f) => console.log("Feedback", f)}
      />
    </div>
  ),
};

export const WithEmail: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <FeedbackWidget
        variant="popover"
        showEmail
        onSubmit={(f) => console.log("Feedback", f)}
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <FeedbackWidget
        variant="popover"
        isLoading
        onSubmit={(f) => console.log("Feedback", f)}
      />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex items-center justify-center p-8">
      <FeedbackWidget
        variant="popover"
        onSubmit={(f) => console.log("Feedback", f)}
      />
    </div>
  ),
};
