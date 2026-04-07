import type * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileUploadZone } from "./FileUploadZone";

const meta: Meta<typeof FileUploadZone> = {
  title: "Blocks/Files/FileUploadZone",
  component: FileUploadZone,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { FileUploadZone } from "@launchapp/design-system/blocks/files";

export default function Page() {
  return (
    <FileUploadZone
      accept="image/*,.pdf,.doc"
      maxSize={10 * 1024 * 1024}
      maxFiles={5}
      onUpload={(files) => console.log("Uploading", files)}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUploadZone>;

export const Default: Story = {
  args: {
    accept: "image/*,.pdf,.doc",
    maxSize: 10 * 1024 * 1024,
    maxFiles: 5,
  },
};

export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: (args) => (
    <div className="dark bg-background p-6 space-y-4">
      <FileUploadZone {...args} />
    </div>
  ),
  args: {
    accept: "*/*",
    maxSize: 50 * 1024 * 1024,
    maxFiles: 3,
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => <FileUploadZone {...args} />,
  args: {
    accept: "image/*",
    maxSize: 5 * 1024 * 1024,
    maxFiles: 3,
  },
};
