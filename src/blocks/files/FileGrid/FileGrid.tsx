import * as React from "react";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/DropdownMenu";
import { cn } from "@/lib/utils";

export type FileItemType = "image" | "document" | "video" | "audio" | "archive" | "other";

export interface FileGridItem {
  id: string;
  name: string;
  size: number;
  type: FileItemType;
  thumbnailUrl?: string;
  extension?: string;
  modifiedAt: string;
  selected?: boolean;
}

export interface FileGridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  files: FileGridItem[];
  onFileSelect?: (id: string, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  onOpen?: (id: string) => void;
  onDownload?: (id: string) => void;
  onRename?: (id: string) => void;
  onDelete?: (id: string) => void;
  emptyState?: React.ReactNode;
  selectionEnabled?: boolean;
  columns?: 2 | 3 | 4 | 5 | 6;
}

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

const getFileIcon = (type: FileItemType, extension?: string) => {
  const iconClass = "h-10 w-10";

  switch (type) {
    case "image":
      return (
        <svg className={cn(iconClass, "text-purple-500")} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 6v12a2.25 2.25 0 002.25 2.25z" />
        </svg>
      );
    case "video":
      return (
        <svg className={cn(iconClass, "text-red-500")} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
        </svg>
      );
    case "audio":
      return (
        <svg className={cn(iconClass, "text-amber-500")} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-9.9-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-9.9-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
        </svg>
      );
    case "archive":
      return (
        <svg className={cn(iconClass, "text-orange-500")} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      );
    case "document":
      if (extension === "pdf") {
        return (
          <svg className={cn(iconClass, "text-red-600")} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        );
      }
      return (
        <svg className={cn(iconClass, "text-blue-500")} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    default:
      return (
        <svg className={cn(iconClass, "text-muted-foreground")} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
  }
};

const FileGrid = React.forwardRef<HTMLDivElement, FileGridProps>(
  (
    {
      files,
      onFileSelect,
      onSelectAll,
      onOpen,
      onDownload,
      onRename,
      onDelete,
      emptyState,
      selectionEnabled = true,
      columns = 4,
      className,
      ...props
    },
    ref
  ) => {
    const allSelected = files.length > 0 && files.every((f) => f.selected);
    const someSelected = files.some((f) => f.selected) && !allSelected;

    const gridCols = {
      2: "grid-cols-2",
      3: "grid-cols-2 sm:grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
      5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
      6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
    };

    if (files.length === 0) {
      return (
        <div ref={ref} className={cn("py-12", className)} {...props}>
          {emptyState ?? (
            <div className="flex flex-col items-center justify-center text-center">
              <svg
                className="h-12 w-12 text-muted-foreground/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                />
              </svg>
              <p className="mt-4 text-sm text-muted-foreground">No files found</p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {selectionEnabled && (
          <div className="flex items-center gap-2">
            <Checkbox
              checked={allSelected}
              data-indeterminate={someSelected}
              onCheckedChange={(checked) => onSelectAll?.(checked as boolean)}
              aria-label="Select all files"
            />
            <span className="text-sm text-muted-foreground">
              {files.filter((f) => f.selected).length} of {files.length} selected
            </span>
          </div>
        )}
        <div className={cn("grid gap-4", gridCols[columns])}>
          {files.map((file) => (
            <div
              key={file.id}
              className={cn(
                "group relative rounded-lg border bg-card p-3 transition-colors hover:bg-accent",
                file.selected && "border-primary bg-primary/5"
              )}
            >
              {selectionEnabled && (
                <div className="absolute left-2 top-2 z-10">
                  <Checkbox
                    checked={file.selected}
                    onCheckedChange={(checked) => onFileSelect?.(file.id, checked as boolean)}
                    aria-label={`Select ${file.name}`}
                  />
                </div>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-7 w-7 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="File actions"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onOpen?.(file.id)}>Open</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDownload?.(file.id)}>Download</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onRename?.(file.id)}>Rename</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete?.(file.id)} className="text-destructive focus:text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                onClick={() => onOpen?.(file.id)}
                className="flex w-full flex-col items-center gap-3 pt-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              >
                {file.thumbnailUrl && file.type === "image" ? (
                  <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
                    <img
                      src={file.thumbnailUrl}
                      alt={file.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center rounded-md bg-muted">
                    {getFileIcon(file.type, file.extension)}
                  </div>
                )}

                <div className="w-full min-w-0 space-y-0.5">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatBytes(file.size)}</span>
                    <span>·</span>
                    <span>{file.modifiedAt}</span>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
FileGrid.displayName = "FileGrid";

export { FileGrid };
