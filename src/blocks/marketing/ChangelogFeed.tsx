import * as React from "react";
import { cn } from "../../lib/utils";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card";
import { Input } from "../../components/Input";
import {
  SelectRoot as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";

// ── Icons (inline SVG to avoid lucide-react dep) ─────────────────────────────
function TagIcon({ className }: { className?: string }) {
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
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function FileTextIcon({ className }: { className?: string }) {
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
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

export type ChangelogEntryType = "feature" | "improvement" | "fix" | "security" | "breaking";

export interface ChangelogEntry {
  id: string;
  version: string;
  title: string;
  description: string;
  date: string;
  type: ChangelogEntryType;
}

export interface ChangelogFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: ChangelogEntry[];
  title?: string;
  description?: string;
  showFilters?: boolean;
  showSearch?: boolean;
  entriesPerPage?: number;
}

const typeConfig: Record<ChangelogEntryType, { label: string; color: string; icon: React.ReactNode }> = {
  feature: {
    label: "Feature",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    icon: <TagIcon className="h-4 w-4" />,
  },
  improvement: {
    label: "Improvement",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    icon: <TagIcon className="h-4 w-4" />,
  },
  fix: {
    label: "Fix",
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    icon: <TagIcon className="h-4 w-4" />,
  },
  security: {
    label: "Security",
    color: "bg-red-500/10 text-red-600 border-red-500/20",
    icon: <TagIcon className="h-4 w-4" />,
  },
  breaking: {
    label: "Breaking",
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    icon: <TagIcon className="h-4 w-4" />,
  },
};

function ChangelogFeed({
  entries,
  title = "Changelog",
  description,
  showFilters = true,
  showSearch = true,
  entriesPerPage = 10,
  className,
  ...props
}: ChangelogFeedProps) {
  const [search, setSearch] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<ChangelogEntryType | "all">("all");
  const [page, setPage] = React.useState(1);

  const filteredEntries = React.useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch = entry.title.toLowerCase().includes(search.toLowerCase()) ||
        entry.description.toLowerCase().includes(search.toLowerCase()) ||
        entry.version.toLowerCase().includes(search.toLowerCase());
      const matchesType = selectedType === "all" || entry.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [entries, search, selectedType]);

  const paginatedEntries = React.useMemo(() => {
    const start = (page - 1) * entriesPerPage;
    return filteredEntries.slice(start, start + entriesPerPage);
  }, [filteredEntries, page, entriesPerPage]);

  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

  const groupedByVersion = React.useMemo(() => {
    const groups: Record<string, ChangelogEntry[]> = {};
    paginatedEntries.forEach((entry) => {
      if (!groups[entry.version]) {
        groups[entry.version] = [];
      }
      groups[entry.version].push(entry);
    });
    return groups;
  }, [paginatedEntries]);

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <FileTextIcon className="h-6 w-6 text-muted-foreground" />
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
        </div>

        {(showSearch || showFilters) && (
          <div className="flex flex-col sm:flex-row gap-3">
            {showSearch && (
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search changelog..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            )}
            {showFilters && (
              <Select value={selectedType} onValueChange={(v: string) => setSelectedType(v as ChangelogEntryType | "all")}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="feature">Feature</SelectItem>
                  <SelectItem value="improvement">Improvement</SelectItem>
                  <SelectItem value="fix">Fix</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="breaking">Breaking</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        )}
      </div>

      <div className="space-y-8">
        {Object.entries(groupedByVersion).map(([version, versionEntries]) => (
          <div key={version} className="space-y-4">
            <div className="flex items-center gap-3 sticky top-0 bg-background/95 backdrop-blur-sm py-2 z-10">
              <Badge variant="outline" className="text-lg px-3 py-1 font-semibold">
                v{version}
              </Badge>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="space-y-4 pl-4">
              {versionEntries.map((entry) => {
                const type = typeConfig[entry.type];
                return (
                  <Card key={entry.id} className="relative overflow-hidden">
                    <div className={cn("absolute left-0 top-0 bottom-0 w-1", type.color.split(" ")[0])} />
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-base">{entry.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4" />
                            {new Date(entry.date).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                        <Badge variant="outline" className={cn("shrink-0", type.color)}>
                          {type.icon}
                          <span className="ml-1">{type.label}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <p className="text-muted-foreground whitespace-pre-line">{entry.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <Button variant="outline" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button variant="outline" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

ChangelogFeed.displayName = "ChangelogFeed";

export { ChangelogFeed };
