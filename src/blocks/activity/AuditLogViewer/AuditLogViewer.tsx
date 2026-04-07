import * as React from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import {
  SelectRoot as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/Table";

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

export type AuditLogLevel = "info" | "warning" | "error" | "success";
export type AuditLogSeverity = "low" | "medium" | "high" | "critical";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  actorEmail?: string;
  resource?: string;
  resourceId?: string;
  level: AuditLogLevel;
  severity?: AuditLogSeverity;
  description?: string;
  metadata?: Record<string, string>;
}

export interface AuditLogFilter {
  search?: string;
  level?: AuditLogLevel | "all";
  severity?: AuditLogSeverity | "all";
  actor?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface AuditLogViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  logs: AuditLogEntry[];
  filter?: AuditLogFilter;
  onFilterChange?: (filter: AuditLogFilter) => void;
  onExport?: () => void;
  title?: string;
  pageSize?: number;
}

const levelVariant: Record<AuditLogLevel, "default" | "secondary" | "destructive" | "outline"> = {
  info: "default",
  warning: "secondary",
  error: "destructive",
  success: "outline",
};

const levelLabel: Record<AuditLogLevel, string> = {
  info: "Info",
  warning: "Warning",
  error: "Error",
  success: "Success",
};

function formatTimestamp(ts: string): string {
  return new Date(ts).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const PAGE_SIZE_OPTIONS = ["10", "25", "50", "100"];

function AuditLogViewer({
  logs,
  filter: filterProp,
  onFilterChange,
  onExport,
  title = "Audit Log",
  pageSize: pageSizeProp = 10,
  className,
  ...props
}: AuditLogViewerProps) {
  const [filter, setFilter] = React.useState<AuditLogFilter>(filterProp ?? { level: "all", severity: "all" });
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(pageSizeProp);
  const [sortField, setSortField] = React.useState<keyof AuditLogEntry>("timestamp");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");

  React.useEffect(() => { setFilter(filterProp ?? { level: "all", severity: "all" }); }, [filterProp]);

  const updateFilter = (patch: Partial<AuditLogFilter>) => {
    const next = { ...filter, ...patch };
    setFilter(next);
    onFilterChange?.(next);
    setPage(0);
  };

  const sorted = React.useMemo(() => {
    return [...logs].sort((a, b) => {
      const av = a[sortField] ?? "";
      const bv = b[sortField] ?? "";
      const cmp = String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [logs, sortField, sortDir]);

  const filtered = React.useMemo(() => {
    return sorted.filter((log) => {
      if (filter.search && !log.action.toLowerCase().includes(filter.search.toLowerCase()) && !log.actor.toLowerCase().includes(filter.search.toLowerCase())) return false;
      if (filter.level && filter.level !== "all" && log.level !== filter.level) return false;
      if (filter.severity && filter.severity !== "all" && log.severity !== filter.severity) return false;
      if (filter.actor && !log.actor.toLowerCase().includes(filter.actor.toLowerCase())) return false;
      return true;
    });
  }, [sorted, filter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice(page * pageSize, (page + 1) * pageSize);

  function toggleSort(field: keyof AuditLogEntry) {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("desc"); }
  }

  function SortHeader({ field, children }: { field: keyof AuditLogEntry; children: React.ReactNode }) {
    return (
      <TableHead
        className={cn("cursor-pointer select-none hover:text-foreground", sortField !== field && "text-muted-foreground")}
        onClick={() => toggleSort(field)}
      >
        <span className="flex items-center gap-1">
          {children}
          {sortField === field && <ChevronUpIcon className={cn("h-3 w-3", sortDir === "asc" && "rotate-180")} />}
        </span>
      </TableHead>
    );
  }

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">{title}</h3>
        {onExport && (
          <Button variant="outline" size="sm" onClick={onExport}>
            Export CSV
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[180px]">
              <Input
                placeholder="Search actions or actors…"
                value={filter.search ?? ""}
                onChange={(e) => updateFilter({ search: e.target.value })}
                className="pl-8"
              />
              <FilterIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Select value={filter.level ?? "all"} onValueChange={(v) => updateFilter({ level: v as AuditLogLevel | "all" })}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filter.severity ?? "all"} onValueChange={(v) => updateFilter({ severity: v as AuditLogSeverity | "all" })}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All severity</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Actor filter"
              value={filter.actor ?? ""}
              onChange={(e) => updateFilter({ actor: e.target.value })}
              className="w-[140px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <SortHeader field="timestamp">Time</SortHeader>
              <SortHeader field="action">Action</SortHeader>
              <SortHeader field="actor">Actor</SortHeader>
              <TableHead>Resource</TableHead>
              <SortHeader field="level">Level</SortHeader>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                  No audit log entries match the current filters.
                </TableCell>
              </TableRow>
            ) : (
              pageData.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {formatTimestamp(log.timestamp)}
                  </TableCell>
                  <TableCell className="text-sm font-medium">{log.action}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="font-medium">{log.actor}</span>
                      {log.actorEmail && (
                        <span className="ml-1 text-xs text-muted-foreground">({log.actorEmail})</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {log.resource ? (
                      <span>
                        {log.resource}
                        {log.resourceId && <span className="text-xs text-muted-foreground ml-1">#{log.resourceId}</span>}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={levelVariant[log.level]}>{levelLabel[log.level]}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                    {log.description ?? "—"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filtered.length)} of {filtered.length} entries
        </p>
        <div className="flex items-center gap-2">
          <Select value={String(pageSize)} onValueChange={(v) => { setPageSize(Number(v)); setPage(0); }}>
            <SelectTrigger className="w-[90px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s} per page</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">{page + 1} / {pageCount}</span>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))} disabled={page >= pageCount - 1}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

AuditLogViewer.displayName = "AuditLogViewer";

export { AuditLogViewer };
