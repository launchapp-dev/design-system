import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { Progress } from "@/components/Progress";
import {
  SelectRoot as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";

function DownloadIcon({ className }: { className?: string }) {
  return (
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
      className={className}
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
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
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
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
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export type DataExportFormat = "json" | "csv" | "zip";
export type DataExportScope = "all" | "account" | "billing" | "activity";
export type DataExportStatus = "idle" | "pending" | "processing" | "ready" | "error";

export interface ExportHistoryItem {
  id: string;
  requestedAt: string;
  completedAt?: string;
  format: DataExportFormat;
  scope: DataExportScope;
  status: DataExportStatus;
  sizeBytes?: number;
  downloadUrl?: string;
}

export interface DataExportPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  history?: ExportHistoryItem[];
  currentExport?: ExportHistoryItem | null;
  progress?: number;
  onRequestExport?: (format: DataExportFormat, scope: DataExportScope) => void;
  onDownload?: (item: ExportHistoryItem) => void;
  title?: string;
  description?: string;
}

const FORMAT_LABELS: Record<DataExportFormat, string> = {
  json: "JSON",
  csv: "CSV",
  zip: "ZIP (all formats)",
};

const SCOPE_LABELS: Record<DataExportScope, string> = {
  all: "All data",
  account: "Account & profile",
  billing: "Billing & invoices",
  activity: "Activity log",
};

const STATUS_BADGE: Record<
  DataExportStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  idle: { label: "Idle", variant: "secondary" },
  pending: { label: "Queued", variant: "secondary" },
  processing: { label: "Processing", variant: "default" },
  ready: { label: "Ready", variant: "outline" },
  error: { label: "Error", variant: "destructive" },
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function DataExportPanel({
  history = [],
  currentExport = null,
  progress = 0,
  onRequestExport,
  onDownload,
  title = "Export Your Data",
  description = "Download a copy of your data in multiple formats. Large exports may take a few minutes.",
  className,
  ...props
}: DataExportPanelProps) {
  const [format, setFormat] = React.useState<DataExportFormat>("json");
  const [scope, setScope] = React.useState<DataExportScope>("all");

  const isProcessing =
    currentExport?.status === "processing" || currentExport?.status === "pending";

  function handleRequest() {
    onRequestExport?.(format, scope);
  }

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none" htmlFor="export-format">
                Format
              </label>
              <Select value={format} onValueChange={(v) => setFormat(v as DataExportFormat)}>
                <SelectTrigger id="export-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.entries(FORMAT_LABELS) as [DataExportFormat, string][]).map(
                    ([val, label]) => (
                      <SelectItem key={val} value={val}>
                        {label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none" htmlFor="export-scope">
                Data scope
              </label>
              <Select value={scope} onValueChange={(v) => setScope(v as DataExportScope)}>
                <SelectTrigger id="export-scope">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.entries(SCOPE_LABELS) as [DataExportScope, string][]).map(
                    ([val, label]) => (
                      <SelectItem key={val} value={val}>
                        {label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {currentExport?.status === "pending" ? "Queued…" : "Preparing your export…"}
                </span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleRequest} disabled={isProcessing} className="gap-2">
            <DownloadIcon className="h-4 w-4" />
            {isProcessing ? "Export in progress…" : "Request Export"}
          </Button>
        </CardFooter>
      </Card>

      {history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Export History</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {history.map((item) => {
                const { label, variant } = STATUS_BADGE[item.status];
                return (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-lg border p-3"
                  >
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {SCOPE_LABELS[item.scope]} — {FORMAT_LABELS[item.format]}
                        </span>
                        <Badge variant={variant}>{label}</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ClockIcon className="h-3 w-3" />
                        <span>{formatDate(item.requestedAt)}</span>
                        {item.sizeBytes !== undefined && (
                          <span className="ml-2">{formatBytes(item.sizeBytes)}</span>
                        )}
                      </div>
                    </div>
                    {item.status === "ready" && item.downloadUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDownload?.(item)}
                        className="shrink-0 gap-1.5"
                      >
                        <CheckIcon className="h-3.5 w-3.5" />
                        Download
                      </Button>
                    )}
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

DataExportPanel.displayName = "DataExportPanel";

export { DataExportPanel };
