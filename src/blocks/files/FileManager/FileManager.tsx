import * as React from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { Progress } from "@/components/Progress";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import type { FileGridItem } from "../FileGrid/FileGrid";
import type { UploadFile } from "../FileList";

export type FileManagerViewMode = "grid" | "list";

export interface FileManagerFolder {
  id: string;
  name: string;
  path: string;
  fileCount?: number;
}

export interface FileManagerProps extends React.HTMLAttributes<HTMLDivElement> {
  files: FileGridItem[];
  folders?: FileManagerFolder[];
  currentFolder?: string;
  uploadFiles?: UploadFile[];
  onFolderSelect?: (folder: FileManagerFolder) => void;
  onFileOpen?: (id: string) => void;
  onFileDownload?: (id: string) => void;
  onFileRename?: (id: string) => void;
  onFileDelete?: (id: string) => void;
  onUpload?: (files: File[]) => void;
  onNewFolder?: () => void;
  onFileSelect?: (id: string, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  selectedFileIds?: string[];
  onDeleteSelected?: () => void;
  onDownloadSelected?: () => void;
  onViewModeChange?: (mode: FileManagerViewMode) => void;
  viewMode?: FileManagerViewMode;
  emptyMessage?: string;
  title?: string;
  maxUploadSize?: number;
}

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

const FolderPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    <line x1="12" x2="12" y1="11" y2="17" />
    <line x1="9" x2="15" y1="14" y2="14" />
  </svg>
);

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

const sampleFiles: FileGridItem[] = [
  {
    id: "1",
    name: "project Brief.pdf",
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

const sampleFolders: FileManagerFolder[] = [
  { id: "f1", name: "All Files", path: "/" },
  { id: "f2", name: "Documents", path: "/documents", fileCount: 12 },
  { id: "f3", name: "Images", path: "/images", fileCount: 8 },
  { id: "f4", name: "Videos", path: "/videos", fileCount: 3 },
  { id: "f5", name: "Archives", path: "/archives", fileCount: 2 },
];

function FileManager({
  files,
  folders = sampleFolders,
  currentFolder = "/",
  uploadFiles,
  onFolderSelect,
  onFileOpen,
  onFileDownload,
  onFileRename,
  onFileDelete,
  onUpload,
  onNewFolder,
  onFileSelect,
  onSelectAll,
  selectedFileIds = [],
  onDeleteSelected,
  onDownloadSelected,
  onViewModeChange,
  viewMode = "grid",
  emptyMessage = "No files in this folder",
  title,
  className,
  ...props
}: FileManagerProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState<string>("name");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const displayedFiles = React.useMemo(() => {
    let result = [...files];
    if (searchQuery) {
      result = result.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    result.sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;
      if (sortBy === "size") {
        aVal = a.size;
        bVal = b.size;
      } else if (sortBy === "modifiedAt") {
        aVal = a.modifiedAt ?? "";
        bVal = b.modifiedAt ?? "";
      } else {
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
      }
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return result;
  }, [files, searchQuery, sortBy, sortOrder]);

  const currentFolderData = folders.find((f) => f.path === currentFolder) ?? folders[0];
  const breadcrumbParts = currentFolder.split("/").filter(Boolean);

  return (
    <div ref={((props as { ref?: React.Ref<HTMLDivElement> }).ref) as React.Ref<HTMLDivElement>} className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {title !== undefined ? (
            <h2 className="text-lg font-semibold">{title}</h2>
          ) : null}
          {currentFolderData && currentFolder !== "/" && (
            <Badge variant="secondary">{currentFolderData.fileCount ?? displayedFiles.length} items</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-[200px]"
          />
          <SelectRoot value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-9 w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="size">Size</SelectItem>
              <SelectItem value="modifiedAt">Modified</SelectItem>
            </SelectContent>
          </SelectRoot>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setSortOrder((o) => (o === "asc" ? "desc" : "asc"))}
            aria-label={sortOrder === "asc" ? "Sort descending" : "Sort ascending"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={cn("transition-transform", sortOrder === "desc" && "rotate-180")}
            >
              <path d="m3 16 4 4 4-4M7 20V4m0 0-4 4 4-4M17 4v16" />
            </svg>
          </Button>
          <div className="flex items-center border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-9 w-9 rounded-none"
              onClick={() => onViewModeChange?.("grid")}
              aria-label="Grid view"
            >
              <GridIcon />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-9 w-9 rounded-none"
              onClick={() => onViewModeChange?.("list")}
              aria-label="List view"
            >
              <ListIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        <div className="w-full shrink-0 lg:w-48">
          <div className="rounded-lg border bg-card">
            <div className="border-b px-3 py-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Folders</span>
            </div>
            <div className="p-1">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => onFolderSelect?.(folder)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                    folder.path === currentFolder
                      ? "bg-accent text-accent-foreground font-medium"
                      : "hover:bg-accent",
                  )}
                >
                  <FolderIcon />
                  <span className="truncate">{folder.name}</span>
                  {folder.fileCount !== undefined && (
                    <span className="ml-auto text-xs text-muted-foreground">{folder.fileCount}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-4">
          {currentFolder !== "/" && breadcrumbParts.length > 0 && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <button
                onClick={() => onFolderSelect?.(folders[0])}
                className="hover:text-foreground transition-colors"
              >
                Root
              </button>
              {breadcrumbParts.map((part, i) => (
                <React.Fragment key={i}>
                  <ChevronRightIcon />
                  <span className={i === breadcrumbParts.length - 1 ? "text-foreground font-medium" : "hover:text-foreground transition-colors cursor-pointer"}>
                    {part}
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}

          {selectedFileIds.length > 0 && (
            <div className="flex items-center gap-2 rounded-lg border bg-accent/50 p-2">
              <span className="text-sm font-medium">{selectedFileIds.length} selected</span>
              <div className="ml-auto flex items-center gap-2">
                {onDownloadSelected && (
                  <Button size="sm" variant="outline" onClick={onDownloadSelected}>
                    Download
                  </Button>
                )}
                {onDeleteSelected && (
                  <Button size="sm" variant="destructive" onClick={onDeleteSelected}>
                    Delete
                  </Button>
                )}
              </div>
            </div>
          )}

          {uploadFiles && uploadFiles.length > 0 && (
            <div className="space-y-2 rounded-lg border p-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Uploading</span>
              {uploadFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-3">
                  <span className="truncate text-sm">{file.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{formatBytes(file.size)}</span>
                  {file.status === "uploading" && (
                    <Progress value={file.progress ?? 0} className="w-20" />
                  )}
                  {file.status === "complete" && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400">Done</span>
                  )}
                  {file.status === "error" && (
                    <span className="text-xs text-destructive">{file.errorMessage ?? "Error"}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {displayedFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-muted-foreground/50"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              <p className="mt-3 text-sm text-muted-foreground">{emptyMessage}</p>
              {onUpload && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadIcon />
                  <span className="ml-2">Upload files</span>
                </Button>
              )}
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {displayedFiles.map((file) => (
                <button
                  key={file.id}
                  onClick={() => onFileOpen?.(file.id)}
                  className={cn(
                    "group relative flex flex-col items-center gap-2 rounded-lg border bg-card p-3 text-left transition-colors hover:bg-accent",
                    selectedFileIds.includes(file.id) && "border-primary bg-primary/5",
                  )}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="truncate text-sm font-medium">{file.name}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="File actions"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onFileOpen?.(file.id)}>Open</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onFileDownload?.(file.id)}>Download</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onFileRename?.(file.id)}>Rename</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onFileDelete?.(file.id)} className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
                    <span>{formatBytes(file.size)}</span>
                    <span>{file.modifiedAt}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border">
              <div className="flex items-center border-b bg-muted/30 px-4 py-2">
                <span className="flex-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</span>
                <span className="w-24 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Size</span>
                <span className="w-32 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Modified</span>
              </div>
              {displayedFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => onFileOpen?.(file.id)}
                  className={cn(
                    "flex cursor-pointer items-center border-b px-4 py-2.5 last:border-b-0 transition-colors hover:bg-accent",
                    selectedFileIds.includes(file.id) && "bg-primary/5",
                  )}
                >
                  <span className="flex-1 truncate text-sm">{file.name}</span>
                  <span className="w-24 text-right text-sm text-muted-foreground">{formatBytes(file.size)}</span>
                  <span className="w-32 text-right text-sm text-muted-foreground">{file.modifiedAt}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 border-t pt-4">
        {onUpload && (
          <>
            <Button size="sm" onClick={() => fileInputRef.current?.click()}>
              <UploadIcon />
              <span className="ml-2">Upload</span>
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) onUpload(Array.from(e.target.files));
                e.target.value = "";
              }}
            />
          </>
        )}
        {onNewFolder && (
          <Button size="sm" variant="outline" onClick={onNewFolder}>
            <FolderPlusIcon />
            <span className="ml-2">New Folder</span>
          </Button>
        )}
      </div>
    </div>
  );
}

FileManager.displayName = "FileManager";

export { FileManager };
