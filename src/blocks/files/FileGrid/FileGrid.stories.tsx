import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FileGrid, type FileGridItem } from "./FileGrid";

const mockFiles: FileGridItem[] = [
  {
    id: "1",
    name: "Project Proposal.pdf",
    size: 2_450_000,
    type: "document",
    extension: "pdf",
    modifiedAt: "2 hours ago",
    selected: false,
  },
  {
    id: "2",
    name: "Dashboard Mockup.png",
    size: 1_200_000,
    type: "image",
    thumbnailUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop",
    modifiedAt: "5 hours ago",
    selected: false,
  },
  {
    id: "3",
    name: "Team Meeting.mp4",
    size: 45_600_000,
    type: "video",
    modifiedAt: "Yesterday",
    selected: false,
  },
  {
    id: "4",
    name: "Audio Notes.m4a",
    size: 5_400_000,
    type: "audio",
    modifiedAt: "Yesterday",
    selected: false,
  },
  {
    id: "5",
    name: "archive.zip",
    size: 12_800_000,
    type: "archive",
    modifiedAt: "2 days ago",
    selected: false,
  },
  {
    id: "6",
    name: "Contract.docx",
    size: 890_000,
    type: "document",
    extension: "docx",
    modifiedAt: "3 days ago",
    selected: false,
  },
  {
    id: "7",
    name: "Avatar.jpg",
    size: 340_000,
    type: "image",
    thumbnailUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    modifiedAt: "1 week ago",
    selected: false,
  },
  {
    id: "8",
    name: "Backup.tar.gz",
    size: 156_000_000,
    type: "archive",
    modifiedAt: "1 week ago",
    selected: false,
  },
];

const meta: Meta<typeof FileGrid> = {
  title: "Blocks/Files/FileGrid",
  component: FileGrid,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof FileGrid>;

const InteractiveTemplate = (args: React.ComponentProps<typeof FileGrid>) => {
  const [files, setFiles] = React.useState(args.files);

  const handleSelect = (id: string, selected: boolean) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, selected } : f))
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setFiles((prev) => prev.map((f) => ({ ...f, selected })));
  };

  return (
    <FileGrid
      {...args}
      files={files}
      onFileSelect={handleSelect}
      onSelectAll={handleSelectAll}
      onOpen={(id) => console.log("Open:", id)}
      onDownload={(id) => console.log("Download:", id)}
      onRename={(id) => console.log("Rename:", id)}
      onDelete={(id) => console.log("Delete:", id)}
    />
  );
};

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    files: mockFiles,
  },
};

export const WithSelection: Story = {
  render: () => {
    const [files, setFiles] = React.useState<FileGridItem[]>(
      mockFiles.map((f, i) => ({ ...f, selected: i < 3 }))
    );

    return (
      <FileGrid
        files={files}
        onFileSelect={(id, selected) =>
          setFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, selected } : f))
          )
        }
        onSelectAll={(selected) =>
          setFiles((prev) => prev.map((f) => ({ ...f, selected })))
        }
        onOpen={(id) => console.log("Open:", id)}
        onDownload={(id) => console.log("Download:", id)}
      />
    );
  },
};

export const TwoColumns: Story = {
  render: InteractiveTemplate,
  args: {
    files: mockFiles.slice(0, 4),
    columns: 2,
  },
};

export const SixColumns: Story = {
  render: InteractiveTemplate,
  args: {
    files: mockFiles,
    columns: 6,
  },
};

export const Empty: Story = {
  render: () => <FileGrid files={[]} />,
};

export const CustomEmptyState: Story = {
  render: () => (
    <FileGrid
      files={[]}
      emptyState={
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <svg
              className="h-8 w-8 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-sm font-medium">No files yet</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Upload your first file to get started
          </p>
        </div>
      }
    />
  ),
};

export const NoSelection: Story = {
  render: InteractiveTemplate,
  args: {
    files: mockFiles,
    selectionEnabled: false,
  },
};

export const DarkMode: Story = {
  render: InteractiveTemplate,
  args: {
    files: mockFiles,
  },
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Mobile: Story = {
  render: InteractiveTemplate,
  args: {
    files: mockFiles,
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
