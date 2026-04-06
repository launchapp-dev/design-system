import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FileUploadZone, type UploadedFile } from "./FileUploadZone";

const makeFile = (id: string, name: string, size: number, status: UploadedFile["status"], progress = 0): UploadedFile => ({
  id,
  name,
  size,
  status,
  progress,
});

const meta: Meta<typeof FileUploadZone> = {
  title: "Blocks/Forms/FileUploadZone",
  component: FileUploadZone,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { FileUploadZone } from "@launchapp/design-system/blocks/forms";
import { useState } from "react";

export default function UploadPage() {
  const [files, setFiles] = useState<FileUploadZoneProps["files"]>([]);

  return (
    <div style={{ maxWidth: 560 }}>
      <FileUploadZone
        accept="image/*,.pdf,.doc,.docx"
        maxSize={10 * 1024 * 1024}
        multiple
        files={files}
        onFilesSelected={(newFiles) => {
          const uploaded: UploadedFile[] = newFiles.map((f, i) => ({
            id: \`file-\${Date.now()}-\${i}\`,
            name: f.name,
            size: f.size,
            progress: 0,
            status: "uploading",
          }));
          setFiles((prev) => [...prev, ...uploaded]);
        }}
        onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
        onRetry={(id) => setFiles((prev) => prev.map((f) => f.id === id ? { ...f, status: "uploading", progress: 0 } : f))}
      />
    </div>
  );
}`,
      },
    },
  },
  argTypes: {
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof FileUploadZone>;

const InteractiveTemplate = (args: React.ComponentProps<typeof FileUploadZone>) => {
  const [files, setFiles] = React.useState<UploadedFile[]>(args.files);

  const handleFilesSelected = (newFiles: File[]) => {
    const added: UploadedFile[] = newFiles.map((f, i) => ({
      id: `file-${Date.now()}-${i}`,
      name: f.name,
      size: f.size,
      progress: 0,
      status: "uploading" as const,
    }));
    setFiles((prev) => [...prev, ...added]);

    added.forEach((file, idx) => {
      let prog = 0;
      const interval = setInterval(() => {
        prog += Math.random() * 30;
        if (prog >= 100) {
          prog = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) => f.id === file.id ? { ...f, progress: 100, status: "complete" } : f)
          );
        } else {
          setFiles((prev) =>
            prev.map((f) => f.id === file.id ? { ...f, progress: Math.round(prog) } : f)
          );
        }
      }, 400 + idx * 200);
    });
  };

  return (
    <div style={{ maxWidth: 560 }}>
      <FileUploadZone
        {...args}
        files={files}
        onFilesSelected={handleFilesSelected}
        onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
        onRetry={(id) => {
          setFiles((prev) => prev.map((f) =>
            f.id === id ? { ...f, status: "uploading", progress: 0, errorMessage: undefined } : f
          ));
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    accept: "image/*,.pdf,.doc,.docx",
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    files: [],
    title: "Upload Documents",
  },
};

export const WithExistingFiles: Story = {
  render: InteractiveTemplate,
  args: {
    accept: "*/*",
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    files: [
      makeFile("1", "quarterly-report.pdf", 1.2 * 1024 * 1024, "complete", 100),
      makeFile("2", "team-photo.png", 3.4 * 1024 * 1024, "complete", 100),
      makeFile("3", "presentation.pptx", 5.6 * 1024 * 1024, "uploading", 67),
    ],
    title: "Upload Files",
  },
};

export const WithErrors: Story = {
  render: InteractiveTemplate,
  args: {
    accept: "*/*",
    maxSize: 5 * 1024 * 1024,
    multiple: true,
    files: [
      makeFile("1", "annual-report.pdf", 1.2 * 1024 * 1024, "complete", 100),
      makeFile("2", "huge-video.mp4", 200 * 1024 * 1024, "error", 0),
      makeFile("2b", "another-file.zip", 50 * 1024 * 1024, "error", 0),
    ],
    title: "Upload Files",
  },
};

export const SingleFile: Story = {
  render: InteractiveTemplate,
  args: {
    accept: "image/*",
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    files: [],
    title: "Profile Photo",
    dropLabel: "Drag & drop your photo here, or click to browse",
    browseLabel: "Choose Photo",
  },
};

export const MaxFiles: Story = {
  render: InteractiveTemplate,
  args: {
    accept: "*/*",
    maxFiles: 3,
    multiple: true,
    files: [],
    title: "Upload (max 3 files)",
  },
};

export const Disabled: Story = {
  render: InteractiveTemplate,
  args: {
    accept: "*/*",
    multiple: true,
    files: [
      makeFile("1", "document.pdf", 1.2 * 1024 * 1024, "complete", 100),
    ],
    disabled: true,
    title: "Upload (disabled)",
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark bg-background p-6" style={{ maxWidth: 560 }}>
      <InteractiveTemplate {...args} />
    </div>
  ),
  args: {
    accept: "image/*,.pdf,.doc,.docx",
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    files: [],
    title: "Upload Documents",
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => (
    <div style={{ padding: "16px" }}>
      <InteractiveTemplate {...args} />
    </div>
  ),
  args: {
    accept: "*/*",
    multiple: true,
    files: [],
  },
};
