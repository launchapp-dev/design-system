import * as React from "react";
import { Button } from "@/components/Button";
import { Progress } from "@/components/Progress";
import { cn } from "@/lib/utils";

export type UploadStatus = "idle" | "uploading" | "complete" | "error";

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: UploadStatus;
  errorMessage?: string;
  previewUrl?: string;
}

export interface FileUploadZoneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  uploadUrl?: string;
  disabled?: boolean;
  files: UploadedFile[];
  onFilesSelected: (files: File[]) => void;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
  title?: string;
  dropLabel?: string;
  browseLabel?: string;
}

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const FileIcon = () => (
  <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const ImageIcon = () => (
  <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-4 w-4 shrink-0 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const RetryIcon = () => (
  <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const FileUploadZone = React.forwardRef<HTMLDivElement, FileUploadZoneProps>(
  (
    {
      accept,
      maxSize,
      maxFiles,
      multiple = true,
      disabled = false,
      files,
      onFilesSelected,
      onRemove,
      onRetry,
      title = "Upload Files",
      dropLabel = "Drag & drop files here, or click to browse",
      browseLabel = "Browse files",
      className,
      ...props
    },
    ref
  ) => {
    const [dragActive, setDragActive] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const validateAndEmit = (fileList: FileList | null) => {
      if (!fileList) return;
      const rawFiles = Array.from(fileList);

      if (maxFiles && rawFiles.length + files.length > maxFiles) {
        const msg = `Maximum ${maxFiles} files allowed. You selected ${rawFiles.length}, ${files.length} already uploaded.`;
        setError(msg);
        return;
      }

      const oversized = maxSize ? rawFiles.find((f) => f.size > maxSize) : null;
      if (oversized) {
        const msg = `"${oversized.name}" exceeds the maximum file size of ${formatBytes(maxSize)}.`;
        setError(msg);
        return;
      }

      setError(null);
      onFilesSelected(rawFiles);
    };

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (!disabled) validateAndEmit(e.dataTransfer.files);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      validateAndEmit(e.target.files);
      e.target.value = "";
    };

    const openPicker = () => {
      if (!disabled) inputRef.current?.click();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPicker();
      }
    };

    const isImage = (name: string) => /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(name);
    const uploading = files.filter((f) => f.status === "uploading").length;
    const hasError = files.some((f) => f.status === "error");

    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {title && (
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">{title}</h3>
            {files.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {files.length} file{files.length !== 1 ? "s" : ""}
                {uploading > 0 && ` · ${uploading} uploading`}
              </span>
            )}
          </div>
        )}

        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={`File upload zone. ${multiple ? "Upload multiple files" : "Upload a single file"}. ${dragActive ? "Drop to upload" : dropLabel}`}
          aria-disabled={disabled}
          onClick={openPicker}
          onKeyDown={handleKeyDown}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            dragActive && "border-primary bg-primary/5",
            !dragActive && !disabled && "border-border hover:border-primary/50 hover:bg-muted/30 cursor-pointer",
            disabled && "cursor-not-allowed opacity-50 border-muted",
            hasError && "border-destructive/50"
          )}
        >
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            hasError ? "bg-destructive/10" : "bg-muted"
          )}>
            {hasError ? (
              <svg className="h-6 w-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            ) : uploading > 0 ? (
              <svg className="h-6 w-6 animate-spin text-primary" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium">
              {dragActive ? "Drop to upload" : dropLabel}
            </p>
            <p className="text-xs text-muted-foreground">
              {[
                accept && `Accepted: ${accept}`,
                maxSize && `Max: ${formatBytes(maxSize)}`,
                maxFiles ? `Up to ${maxFiles} files` : multiple ? "Multiple files" : "Single file",
              ].filter(Boolean).join(" · ")}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              openPicker();
            }}
          >
            {browseLabel}
          </Button>
        </div>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        {files.length > 0 && (
          <ul className="space-y-2" role="list" aria-label="Uploaded files">
            {files.map((file) => (
              <li
                key={file.id}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors",
                  file.status === "error" && "border-destructive/30 bg-destructive/5",
                  file.status === "complete" && "border-green-500/20 bg-green-500/5",
                  file.status === "uploading" && "border-border bg-muted/30"
                )}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted">
                  {file.previewUrl ? (
                    <img src={file.previewUrl} alt="" className="h-8 w-8 rounded object-cover" />
                  ) : isImage(file.name) ? (
                    <ImageIcon />
                  ) : (
                    <FileIcon />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <div className="flex items-center gap-2">
                    {file.status === "uploading" && (
                      <>
                        <Progress value={file.progress} className="h-1 flex-1" aria-label={`Upload progress: ${file.progress}%`} />
                        <span className="text-xs text-muted-foreground tabular-nums">{file.progress}%</span>
                      </>
                    )}
                    {file.status === "complete" && (
                      <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                        <CheckIcon /> {formatBytes(file.size)}
                      </span>
                    )}
                    {file.status === "error" && (
                      <span className="text-xs text-destructive">{file.errorMessage ?? "Upload failed"}</span>
                    )}
                    {file.status === "idle" && (
                      <span className="text-xs text-muted-foreground">{formatBytes(file.size)}</span>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 gap-1">
                  {file.status === "error" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onRetry(file.id)}
                      aria-label={`Retry upload for ${file.name}`}
                    >
                      <RetryIcon />
                    </Button>
                  )}
                  {file.status !== "uploading" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => onRemove(file.id)}
                      aria-label={`Remove ${file.name}`}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
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
