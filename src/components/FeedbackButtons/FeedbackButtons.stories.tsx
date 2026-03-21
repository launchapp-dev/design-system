import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FeedbackButtons } from "./index";

const meta: Meta<typeof FeedbackButtons> = {
  title: "Components/FeedbackButtons",
  component: FeedbackButtons,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "minimal"],
    },
    showRegenerate: { control: "boolean" },
    showCopy: { control: "boolean" },
    showShare: { control: "boolean" },
  },
  args: {
    variant: "default",
    showRegenerate: true,
    showCopy: true,
    showShare: false,
  },
};

export default meta;
type Story = StoryObj<typeof FeedbackButtons>;

export const Default: Story = {
  render: (args) => {
    const [thumbsUp, setThumbsUp] = React.useState<boolean | null>(null);
    const [thumbsDown, setThumbsDown] = React.useState<boolean | null>(null);
    const [copied, setCopied] = React.useState(false);

    return (
      <div className="p-4 max-w-2xl">
        <div className="rounded-lg bg-muted p-4 mb-2">
          <p className="text-sm">
            This is a sample AI response. You can provide feedback using the buttons below.
          </p>
        </div>
        <FeedbackButtons
          {...args}
          isThumbsUp={thumbsUp}
          isThumbsDown={thumbsDown}
          copied={copied}
          onThumbsUp={() => {
            setThumbsUp(true);
            setThumbsDown(false);
          }}
          onThumbsDown={() => {
            setThumbsDown(true);
            setThumbsUp(false);
          }}
          onCopy={() => {
            navigator.clipboard.writeText("Sample response");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          onRegenerate={() => alert("Regenerating response...")}
        />
      </div>
    );
  },
};

export const Minimal: Story = {
  args: {
    variant: "minimal",
  },
  render: (args) => {
    const [copied, setCopied] = React.useState(false);

    return (
      <div className="p-4 max-w-2xl">
        <div className="group rounded-lg bg-muted p-4">
          <p className="text-sm mb-2">
            Hover over this message to see the feedback buttons appear.
          </p>
          <FeedbackButtons
            {...args}
            copied={copied}
            onThumbsUp={() => alert("Thumbs up!")}
            onThumbsDown={() => alert("Thumbs down!")}
            onCopy={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            onRegenerate={() => alert("Regenerating...")}
          />
        </div>
      </div>
    );
  },
};

export const WithShare: Story = {
  render: (args) => (
    <div className="p-4 max-w-2xl">
      <div className="rounded-lg bg-muted p-4 mb-2">
        <p className="text-sm">Response with share option enabled.</p>
      </div>
      <FeedbackButtons
        {...args}
        showShare
        onThumbsUp={() => alert("Thumbs up!")}
        onThumbsDown={() => alert("Thumbs down!")}
        onCopy={() => alert("Copied!")}
        onRegenerate={() => alert("Regenerating...")}
        onShare={() => alert("Opening share dialog...")}
      />
    </div>
  ),
};

export const ThumbsUpSelected: Story = {
  render: () => (
    <div className="p-4 max-w-2xl">
      <div className="rounded-lg bg-muted p-4 mb-2">
        <p className="text-sm">You marked this response as helpful.</p>
      </div>
      <FeedbackButtons
        isThumbsUp={true}
        isThumbsDown={false}
        onThumbsUp={() => {}}
        onThumbsDown={() => {}}
        onCopy={() => {}}
        onRegenerate={() => {}}
      />
    </div>
  ),
};

export const ThumbsDownSelected: Story = {
  render: () => (
    <div className="p-4 max-w-2xl">
      <div className="rounded-lg bg-muted p-4 mb-2">
        <p className="text-sm">You marked this response as not helpful.</p>
      </div>
      <FeedbackButtons
        isThumbsUp={false}
        isThumbsDown={true}
        onThumbsUp={() => {}}
        onThumbsDown={() => {}}
        onCopy={() => {}}
        onRegenerate={() => {}}
      />
    </div>
  ),
};

export const CopiedState: Story = {
  render: () => (
    <div className="p-4 max-w-2xl">
      <div className="rounded-lg bg-muted p-4 mb-2">
        <p className="text-sm">The copy button shows a checkmark when content is copied.</p>
      </div>
      <FeedbackButtons
        copied={true}
        onThumbsUp={() => {}}
        onThumbsDown={() => {}}
        onCopy={() => {}}
        onRegenerate={() => {}}
      />
    </div>
  ),
};

export const MinimalButtons: Story = {
  render: () => (
    <div className="p-4 max-w-2xl">
      <div className="rounded-lg bg-muted p-4 mb-2">
        <p className="text-sm">Only thumbs up/down, no other buttons.</p>
      </div>
      <FeedbackButtons
        showRegenerate={false}
        showCopy={false}
        onThumbsUp={() => alert("Thumbs up!")}
        onThumbsDown={() => alert("Thumbs down!")}
      />
    </div>
  ),
};
