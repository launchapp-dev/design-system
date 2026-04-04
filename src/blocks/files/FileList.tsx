import * as React from "react";
import { Button } from "@/components/Button";
import { Progress } from "@/components/Progress";
import { cn } from "@/lib/utils";

export type UploadStatus = "uploading" | "complete" | "error";

export interface UploadFile {
  id: string;
  name: string;
  size: number;
  progress?: number;
  status: UploadStatus;
  errorMessage?: string;
}

export interface FileListProps extends React.HTMLAttributes<HTMLDivElement> {
  files: UploadFile[];
  onRemove?: (id: string) => void;
  title?: string;
}

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const FileIcon = () => (
  <svg
    className="h-5 w-5 shrink-0 text-muted-foreground"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
    />
  </svg>
);

const FileList = React.forwardRef<HTMLDivElement, FileListProps>(
  ({ files, onRemove, title, className, ...props }, ref) => {
    if (files.length === 0) return null;

    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {title && <h3 className="text-sm font-medium">{title}</h3>}
        <ul className="space-y-2">
          {files.map((file) => (
            <li key={file.id} className="rounded-lg border bg-card p-3">
              <div className="flex items-start gap-3">
                <FileIcon />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatBytes(file.size)}
                        {file.status === "uploading" &&
                          file.progress != null && <> · {file.progress}%</>}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {file.status === "complete" && (
                        <span aria-label="Upload complete">
                          <svg
                            className="h-4 w-4 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                      )}
                      {file.status === "error" && (
                        <span aria-label="Upload error">
                          <svg
                            className="h-4 w-4 text-destructive"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                          </svg>
                        </span>
                      )}
                      {onRemove && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemove(file.id)}
                          aria-label={`Remove ${file.name}`}
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </Button>
                      )}
                    </div>
                  </div>
                  {file.status === "uploading" && (
                    <Progress
                      value={file.progress ?? 0}
                      size="sm"
                      aria-label={`Uploading ${file.name}`}
                    />
                  )}
                  {file.status === "error" && file.errorMessage && (
                    <p role="alert" className="text-xs text-destructive">
                      {file.errorMessage}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
FileList.displayName = "FileList";

export { FileList };
