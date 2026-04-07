import type { Meta, StoryObj } from "@storybook/react";
import { FileManager } from "./FileManager";
import type { FileGridItem } from "../../../components/FileGrid/FileGrid";

const allFiles: FileGridItem[] = [
  {
    id: "1",
    name: "project-brief.pdf",
    size: 2457600,
    type: "document",
    extension: "pdf",
    modifiedAt: "2 days ago",
  },
  {
    id: "2",
    name: "hero-image.jpg",
    size: 3145728,
    type: "image",
    thumbnailUrl: "https://picsum.photos/seed/1/200/200",
    modifiedAt: "1 day ago",
  },
  {
    id: "3",
    name: "brand-guidelines.pdf",
    size: 5242880,
    type: "document",
    extension: "pdf",
    modifiedAt: "3 days ago",
  },
  {
    id: "4",
    name: "product-demo.mp4",
    size: 104857600,
    type: "video",
    modifiedAt: "5 days ago",
  },
  {
    id: "5",
    name: "presentation.pptx",
    size: 5242880,
    type: "document",
    modifiedAt: "1 week ago",
  },
  {
    id: "6",
    name: "podcast-ep-12.mp3",
    size: 52428800,
    type: "audio",
    modifiedAt: "2 weeks ago",
  },
];

const meta: Meta<typeof FileManager> = {
  title: "Blocks/Files/FileManager",
  component: FileManager,
  parameters: {
    layout: "padded",
  },
};
export default meta;
type Story = StoryObj<typeof FileManager>;

export const Default: Story = {
  args: {
    files: allFiles,
  },
};

export const GridView: Story = {
  args: {
    files: allFiles,
    viewMode: "grid",
  },
};

export const ListView: Story = {
  args: {
    files: allFiles,
    viewMode: "list",
  },
};

export const WithFolders: Story = {
  args: {
    files: allFiles,
    folders: [
      { id: "f1", name: "All Files", path: "/", fileCount: 6 },
      { id: "f2", name: "Documents", path: "/documents", fileCount: 12 },
      { id: "f3", name: "Images", path: "/images", fileCount: 8 },
      { id: "f4", name: "Videos", path: "/videos", fileCount: 3 },
      { id: "f5", name: "Archives", path: "/archives", fileCount: 2 },
    ],
  },
};

export const WithHandlers: Story = {
  args: {
    files: allFiles,
    onFileOpen: (id) => console.log("Open file:", id),
    onFileDownload: (id) => console.log("Download file:", id),
    onFileRename: (id) => console.log("Rename file:", id),
    onFileDelete: (id) => console.log("Delete file:", id),
    onUpload: (files) => console.log("Upload:", files),
    onNewFolder: () => console.log("New folder"),
  },
};

export const Empty: Story = {
  args: {
    files: [],
    emptyMessage: "No files yet. Upload your first file to get started.",
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  args: {
    files: allFiles,
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  args: {
    files: allFiles,
  },
};
