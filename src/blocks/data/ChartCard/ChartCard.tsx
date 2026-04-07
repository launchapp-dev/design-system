import type * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/DropdownMenu";

export interface ChartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children: React.ReactNode;
  period?: string;
  onPeriodChange?: (period: string) => void;
  periods?: string[];
  controls?: React.ReactNode;
  loading?: boolean;
  error?: string;
  actions?: React.ReactNode;
}

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const MoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

function ChartCard({
  title,
  description,
  children,
  period,
  onPeriodChange,
  periods = ["7d", "30d", "90d"],
  controls,
  loading = false,
  error,
  actions,
  className,
  ...props
}: ChartCardProps) {
  return (
    <Card ref={null} className={cn("overflow-hidden", className)} {...props}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {description && <CardDescription className="text-xs">{description}</CardDescription>}
        </div>
        <div className="flex items-center gap-2">
          {controls}
          {actions}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreIcon />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <DownloadIcon />
                Export data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      {periods.length > 0 && (
        <div className="px-6">
          <div className="flex gap-1 border-b border-border">
            {periods.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onPeriodChange?.(p)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors border-b-2 -mb-px",
                  period === p
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      <CardContent className={cn("pt-4", loading && "opacity-50")}>
        {error ? (
          <div className="flex h-48 items-center justify-center text-sm text-destructive">
            {error}
          </div>
        ) : loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}

ChartCard.displayName = "ChartCard";

export { ChartCard };
