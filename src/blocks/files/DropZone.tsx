import * as React from "react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export interface DropZoneProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop" | "onError"> {
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  disabled?: boolean;
  onFilesSelected?: (files: File[]) => void;
  onError?: (message: string) => void;
}

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const DropZone = React.forwardRef<HTMLDivElement, DropZoneProps>(
  (
    {
      accept,
      maxSize,
      multiple = false,
      disabled = false,
      onFilesSelected,
      onError,
      className,
      ...props
    },
    ref,
  ) => {
    const [dragActive, setDragActive] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const validateAndEmit = (fileList: FileList | null) => {
      if (!fileList) return;
      const files = Array.from(fileList);
      const invalidSize = maxSize ? files.find((f) => f.size > maxSize) : null;
      if (invalidSize) {
        const msg = `"${invalidSize.name}" exceeds the maximum file size of ${formatBytes(maxSize!)}`;
        setError(msg);
        onError?.(msg);
        return;
      }
      setError(null);
      onFilesSelected?.(files);
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

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={`Drop zone. ${multiple ? "Drop files here" : "Drop a file here"} or click to browse`}
          aria-disabled={disabled}
          onClick={openPicker}
          onKeyDown={handleKeyDown}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            dragActive && "border-primary bg-primary/5",
            !dragActive &&
              !disabled &&
              "border-border hover:border-primary/50 hover:bg-muted/30 cursor-pointer",
            disabled && "cursor-not-allowed opacity-50 border-muted",
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <svg
              className="h-6 w-6 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {dragActive
                ? "Drop to upload"
                : "Drag & drop here, or click to browse"}
            </p>
            <p className="text-xs text-muted-foreground">
              {[
                accept && `Accepted: ${accept}`,
                maxSize && `Max size: ${formatBytes(maxSize)}`,
                multiple ? "Multiple files allowed" : "Single file only",
              ]
                .filter(Boolean)
                .join(" · ")}
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
            Browse files
          </Button>
        </div>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
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
  },
);
DropZone.displayName = "DropZone";

export { DropZone };
