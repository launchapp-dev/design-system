import type { Meta, StoryObj } from "@storybook/react";
import { DropZone } from "./DropZone";

const meta: Meta<typeof DropZone> = {
  title: "Blocks/Files/DropZone",
  component: DropZone,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { DropZone } from "@launchapp/design-system/blocks/files";

export default function Page() {
  return (
    <DropZone
      accept="image/*"
      maxSize={5 * 1024 * 1024}
      multiple
      onFilesSelected={(files) => console.log(files)}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropZone>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 520 }}>
      <DropZone {...args} />
    </div>
  ),
  args: {
    multiple: true,
  },
};

export const ImagesOnly: Story = {
  render: (args) => (
    <div style={{ maxWidth: 520 }}>
      <DropZone {...args} />
    </div>
  ),
  args: {
    accept: "image/*",
    maxSize: 5 * 1024 * 1024,
    multiple: true,
  },
};

export const SingleFile: Story = {
  render: (args) => (
    <div style={{ maxWidth: 520 }}>
      <DropZone {...args} />
    </div>
  ),
  args: {
    accept: ".pdf,.doc,.docx",
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div style={{ maxWidth: 520 }}>
      <DropZone {...args} />
    </div>
  ),
  args: {
    disabled: true,
    multiple: true,
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "24px", maxWidth: 520 }}>
      <DropZone {...args} />
    </div>
  ),
  args: {
    multiple: true,
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => (
    <div style={{ padding: "16px" }}>
      <DropZone {...args} />
    </div>
  ),
  args: {
    multiple: true,
  },
};
