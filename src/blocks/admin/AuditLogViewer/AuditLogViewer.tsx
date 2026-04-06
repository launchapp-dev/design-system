import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { ScrollArea } from "@/components/ScrollArea";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/Pagination";

export type AuditLogLevel = "info" | "warning" | "error" | "debug";
export type AuditLogAction = "create" | "update" | "delete" | "login" | "logout" | "api_call" | "config_change" | "user_action";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  level: AuditLogLevel;
  action: AuditLogAction;
  description: string;
  actor?: string;
  resource?: string;
  metadata?: Record<string, string>;
  ipAddress?: string;
}

export interface AuditLogViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  logs: AuditLogEntry[];
  searchPlaceholder?: string;
  pageSize?: number;
  onSearch?: (query: string) => void;
  onFilterLevel?: (level: AuditLogLevel | null) => void;
  onFilterAction?: (action: AuditLogAction | null) => void;
  onViewDetails?: (entry: AuditLogEntry) => void;
  loading?: boolean;
}

const levelColors: Record<AuditLogLevel, "default" | "secondary" | "destructive" | "outline"> = {
  info: "default",
  warning: "secondary",
  error: "destructive",
  debug: "outline",
};

const actionLabel: Record<AuditLogAction, string> = {
  create: "Created",
  update: "Updated",
  delete: "Deleted",
  login: "Login",
  logout: "Logout",
  api_call: "API Call",
  config_change: "Config",
  user_action: "User Action",
};

const levelLabel: Record<AuditLogLevel, string> = {
  info: "INFO",
  warning: "WARN",
  error: "ERROR",
  debug: "DEBUG",
};

function AuditLogViewerInner(
  {
    logs,
    searchPlaceholder = "Search logs...",
    pageSize = 20,
    onSearch,
    onFilterLevel,
    onFilterAction,
    onViewDetails,
    loading = false,
    className,
  }: AuditLogViewerProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [search, setSearch] = React.useState("");
  const [selectedLevel, setSelectedLevel] = React.useState<AuditLogLevel | null>(null);
  const [selectedAction, setSelectedAction] = React.useState<AuditLogAction | null>(null);
  const [page, setPage] = React.useState(0);

  const levels: AuditLogLevel[] = ["info", "warning", "error", "debug"];
  const actions: AuditLogAction[] = ["create", "update", "delete", "login", "logout", "api_call", "config_change", "user_action"];

  const filtered = React.useMemo(() => {
    let result = logs;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.description.toLowerCase().includes(q) ||
          l.actor?.toLowerCase().includes(q) ||
          l.resource?.toLowerCase().includes(q)
      );
    }
    if (selectedLevel) result = result.filter((l) => l.level === selectedLevel);
    if (selectedAction) result = result.filter((l) => l.action === selectedAction);
    return result;
  }, [logs, search, selectedLevel, selectedAction]);

  const pageCount = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(page * pageSize, (page + 1) * pageSize);

  React.useEffect(() => { setPage(0); }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch?.(value);
  };

  const toggleLevel = (level: AuditLogLevel) => {
    const next = selectedLevel === level ? null : level;
    setSelectedLevel(next);
    onFilterLevel?.(next);
  };

  const toggleAction = (action: AuditLogAction) => {
    const next = selectedAction === action ? null : action;
    setSelectedAction(next);
    onFilterAction?.(next);
  };

  return (
    <div ref={ref} className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Audit Log</h2>
          <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
            {filtered.length} entr{filtered.length !== 1 ? "ies" : "y"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          <span className="self-center text-xs text-[hsl(var(--la-muted-foreground))]">Level:</span>
          {levels.map((level) => (
            <Badge
              key={level}
              variant={selectedLevel === level ? levelColors[level] : "outline"}
              className="cursor-pointer"
              onClick={() => toggleLevel(level)}
            >
              {levelLabel[level]}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="self-center text-xs text-[hsl(var(--la-muted-foreground))]">Action:</span>
          {actions.map((action) => (
            <Badge
              key={action}
              variant={selectedAction === action ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleAction(action)}
            >
              {actionLabel[action]}
            </Badge>
          ))}
        </div>
      </div>

      <ScrollArea className="h-[400px] rounded-md border border-[hsl(var(--la-border))]">
        <div className="divide-y divide-[hsl(var(--la-border))]">
          {loading ? (
            <div className="flex items-center justify-center h-32 text-[hsl(var(--la-muted-foreground))]">
              Loading...
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-[hsl(var(--la-muted-foreground))]">
              No logs found.
            </div>
          ) : (
            paginated.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-3 px-4 py-3 hover:bg-[hsl(var(--la-muted))] cursor-pointer"
                onClick={() => onViewDetails?.(entry)}
              >
                <div className="shrink-0 pt-0.5">
                  <Badge variant={levelColors[entry.level]} className="text-[10px] px-1.5">
                    {levelLabel[entry.level]}
                  </Badge>
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-[10px]">{actionLabel[entry.action]}</Badge>
                    {entry.actor && (
                      <span className="text-xs font-medium">{entry.actor}</span>
                    )}
                    <span className="text-xs text-[hsl(var(--la-muted-foreground))]">{entry.timestamp}</span>
                    {entry.ipAddress && (
                      <span className="text-xs text-[hsl(var(--la-muted-foreground))]">{entry.ipAddress}</span>
                    )}
                  </div>
                  <p className="text-sm leading-snug">{entry.description}</p>
                  {entry.resource && (
                    <p className="text-xs text-[hsl(var(--la-muted-foreground))]">
                      Resource: {entry.resource}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {pageCount > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className={page === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="text-sm px-3 py-2">
                Page {page + 1} of {pageCount}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                className={page === pageCount - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export const AuditLogViewer = React.forwardRef(AuditLogViewerInner) as (
  props: AuditLogViewerProps & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

(AuditLogViewer as React.ForwardRefExoticComponent<AuditLogViewerProps>).displayName = "AuditLogViewer";
