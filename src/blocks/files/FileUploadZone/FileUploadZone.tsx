import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Progress } from "@/components/Progress";
import { Badge } from "@/components/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function UploadCloudIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /><polyline points="16 16 12 12 8 16" />
    </svg>
  );
}
function MoreHorizontalIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" />
    </svg>
  );
}

export type UploadStatus = "pending" | "uploading" | "complete" | "error";

export interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: UploadStatus;
  error?: string;
  url?: string;
}

export interface FileUploadZoneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop"> {
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  onUpload?: (files: UploadFile[]) => void;
  onRemove?: (id: string) => void;
  onCancel?: (id: string) => void;
  onRetry?: (id: string) => void;
}

const FileUploadZone = React.forwardRef<HTMLDivElement, FileUploadZoneProps>(
  (
    {
      accept,
      maxSize,
      maxFiles = 10,
      disabled = false,
      onUpload,
      onRemove,
      onCancel,
      onRetry,
      className,
      ...props
    },
    ref
  ) => {
    const [dragActive, setDragActive] = React.useState(false);
    const [uploads, setUploads] = React.useState<UploadFile[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    function validateFiles(fileList: FileList | null): File[] {
      if (!fileList) return [];
      let files = Array.from(fileList);
      if (maxFiles && files.length > maxFiles) {
        const msg = `Maximum ${maxFiles} files allowed.`;
        setError(msg);
        return files.slice(0, maxFiles);
      }
      if (maxSize) {
        const invalid = files.find((f) => f.size > maxSize);
        if (invalid) {
          setError(`"${invalid.name}" exceeds max size of ${formatBytes(maxSize)}`);
          files = files.filter((f) => f.size <= maxSize);
        }
      }
      setError(null);
      return files;
    }

    function addFiles(files: File[]) {
      const newUploads: UploadFile[] = files.map((file) => ({
        id: Math.random().toString(36).slice(2),
        file,
        progress: 0,
        status: "pending" as UploadStatus,
      }));
      setUploads((prev) => [...prev, ...newUploads]);
      onUpload?.(newUploads);
      simulateUploads(newUploads.map((u) => u.id));
    }

    function simulateUploads(ids: string[]) {
      ids.forEach((id) => {
        setUploads((prev) =>
          prev.map((u) => (u.id === id ? { ...u, status: "uploading" as UploadStatus } : u))
        );
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 20 + 10;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setUploads((prev) =>
              prev.map((u) =>
                u.id === id ? { ...u, progress: 100, status: "complete" as UploadStatus } : u
              )
            );
          } else {
            setUploads((prev) =>
              prev.map((u) => (u.id === id ? { ...u, progress } : u))
            );
          }
        }, 300);
      });
    }

    function handleDrop(e: React.DragEvent) {
      e.preventDefault();
      setDragActive(false);
      if (!disabled) addFiles(validateFiles(e.dataTransfer.files));
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      addFiles(validateFiles(e.target.files));
      e.target.value = "";
    }

    function removeUpload(id: string) {
      setUploads((prev) => prev.filter((u) => u.id !== id));
      onRemove?.(id);
    }

    function retryUpload(id: string) {
      setUploads((prev) =>
        prev.map((u) => (u.id === id ? { ...u, progress: 0, status: "pending" as UploadStatus, error: undefined } : u))
      );
      simulateUploads([id]);
    }

    const statusIcon: Record<UploadStatus, React.ReactNode> = {
      pending: <UploadCloudIcon className="h-4 w-4 text-muted-foreground" />,
      uploading: <Progress value={0} className="w-16 h-2" aria-hidden />,
      complete: <Badge variant="default" className="text-xs h-5">Done</Badge>,
      error: <Badge variant="destructive" className="text-xs h-5">Failed</Badge>,
    };

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Drop files here or click to browse"
          aria-disabled={disabled}
          onClick={() => !disabled && inputRef.current?.click()}
          onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !disabled) { e.preventDefault(); inputRef.current?.click(); } }}
          onDragEnter={(e) => { e.preventDefault(); if (!disabled) setDragActive(true); }}
          onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
          onDragOver={(e) => { e.preventDefault(); }}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            dragActive && "border-primary bg-primary/5",
            !dragActive && !disabled && "border-border hover:border-primary/50 hover:bg-muted/30 cursor-pointer",
            disabled && "cursor-not-allowed opacity-50 border-muted"
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <UploadCloudIcon className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {dragActive ? "Drop to upload" : "Drag & drop files here, or click to browse"}
            </p>
            <p className="text-xs text-muted-foreground">
              {[accept && `Accepted: ${accept}`, maxSize && `Max: ${formatBytes(maxSize)}`, `Up to ${maxFiles} files`]
                .filter(Boolean).join(" · ")}
            </p>
          </div>
          <Button type="button" variant="outline" size="sm" disabled={disabled} onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); inputRef.current?.click(); }}>
            Browse files
          </Button>
        </div>

        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

        {uploads.length > 0 && (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploads.map((upload) => (
                  <TableRow key={upload.id}>
                    <TableCell className="text-sm font-medium truncate max-w-[200px]">{upload.file.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{formatBytes(upload.file.size)}</TableCell>
                    <TableCell>
                      {upload.status === "uploading" ? (
                        <div className="flex items-center gap-2">
                          <Progress value={upload.progress} className="w-20 h-2" aria-label={`${Math.round(upload.progress)}% uploaded`} />
                          <span className="text-xs text-muted-foreground">{Math.round(upload.progress)}%</span>
                        </div>
                      ) : upload.status === "complete" ? (
                        <Badge variant="default" className="text-xs h-5">Done</Badge>
                      ) : upload.status === "error" ? (
                        <Badge variant="destructive" className="text-xs h-5">Failed</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs h-5">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {upload.status === "error" && onRetry ? (
                        <Button variant="ghost" size="sm" onClick={() => retryUpload(upload.id)} className="h-7 px-2 text-xs">Retry</Button>
                      ) : upload.status !== "complete" && onCancel ? (
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeUpload(upload.id)}>
                          <XIcon className="h-4 w-4" />
                        </Button>
                      ) : onRemove ? (
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeUpload(upload.id)}>
                          <XIcon className="h-4 w-4" />
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          disabled={disabled}
          onChange={handleInputChange}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    );
  }
);
FileUploadZone.displayName = "FileUploadZone";

export { FileUploadZone };
