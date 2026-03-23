import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FileList } from "./FileList";
import type { UploadFile } from "./FileList";

const mockFiles: UploadFile[] = [
  {
    id: "1",
    name: "project-brief.pdf",
    size: 2_450_000,
    status: "complete",
  },
  {
    id: "2",
    name: "design-assets.zip",
    size: 18_700_000,
    progress: 64,
    status: "uploading",
  },
  {
    id: "3",
    name: "logo.png",
    size: 340_000,
    status: "error",
    errorMessage: "Network error. Please try again.",
  },
  {
    id: "4",
    name: "readme.md",
    size: 12_000,
    status: "complete",
  },
];

const meta: Meta<typeof FileList> = {
  title: "Blocks/Files/FileList",
  component: FileList,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { FileList } from "@launchapp/design-system/blocks/files";

export default function Page() {
  return (
    <FileList
      files={files}
      onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileList>;

const InteractiveTemplate = (args: React.ComponentProps<typeof FileList>) => {
  const [files, setFiles] = React.useState(args.files);
  return (
    <div style={{ maxWidth: 520 }}>
      <FileList
        {...args}
        files={files}
        onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
      />
    </div>
  );
};

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    files: mockFiles,
    title: "Uploaded files",
  },
};

export const AllUploading: Story = {
  render: (args) => (
    <div style={{ maxWidth: 520 }}>
      <FileList {...args} />
    </div>
  ),
  args: {
    files: [
      { id: "1", name: "presentation.pptx", size: 5_200_000, progress: 23, status: "uploading" },
      { id: "2", name: "spreadsheet.xlsx", size: 1_100_000, progress: 78, status: "uploading" },
    ],
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "24px", maxWidth: 520 }}>
      <FileList {...args} />
    </div>
  ),
  args: {
    files: mockFiles,
    title: "Uploaded files",
  },
};
