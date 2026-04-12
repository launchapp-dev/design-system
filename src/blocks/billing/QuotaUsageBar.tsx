import type * as React from "react";
import { cn } from "../../lib/utils";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Card";
import { Progress } from "../../components/Progress";
import { TooltipRoot as Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/Tooltip";

// ── Icons (inline SVG to avoid lucide-react dep) ─────────────────────────────
function GaugeIcon({ className }: { className?: string }) {
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
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function AlertTriangleIcon({ className }: { className?: string }) {
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  );
}

function ZapIcon({ className }: { className?: string }) {
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
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
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
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export interface QuotaItem {
  id: string;
  name: string;
  used: number;
  limit: number;
  unit?: string;
  resetDate?: string;
  tooltip?: string;
}

export interface QuotaUsageBarProps extends React.HTMLAttributes<HTMLDivElement> {
  quotas: QuotaItem[];
  onUpgrade?: () => void;
  title?: string;
  description?: string;
  showUpgradeButton?: boolean;
  warningThreshold?: number;
  criticalThreshold?: number;
  planName?: string;
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString();
}

function QuotaUsageBar({
  quotas,
  onUpgrade,
  title = "Usage & Limits",
  description,
  showUpgradeButton = true,
  warningThreshold = 75,
  criticalThreshold = 90,
  planName,
  className,
  ...props
}: QuotaUsageBarProps) {
  const getStatus = (used: number, limit: number) => {
    const pct = (used / limit) * 100;
    if (pct >= criticalThreshold) return "critical";
    if (pct >= warningThreshold) return "warning";
    return "normal";
  };

  const anyWarning = quotas.some(q => getStatus(q.used, q.limit) === "warning");
  const anyCritical = quotas.some(q => getStatus(q.used, q.limit) === "critical");

  const statusConfig = {
    normal: { color: "bg-primary", text: "text-foreground" },
    warning: { color: "bg-amber-500", text: "text-amber-600" },
    critical: { color: "bg-destructive", text: "text-destructive" },
  };

  return (
    <TooltipProvider>
      <Card className={className} {...props}>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <GaugeIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
              </div>
            </div>
            {planName && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <ZapIcon className="h-3 w-3" />
                {planName}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {quotas.map((quota) => {
            const pct = Math.min((quota.used / quota.limit) * 100, 100);
            const status = getStatus(quota.used, quota.limit);
            const config = statusConfig[status];

            return (
              <div key={quota.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{quota.name}</span>
                    {quota.tooltip && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{quota.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("tabular-nums", config.text)}>
                      {formatNumber(quota.used)} / {formatNumber(quota.limit)} {quota.unit}
                    </span>
                    <span className="text-muted-foreground">({pct.toFixed(0)}%)</span>
                    {status === "critical" && (
                      <AlertTriangleIcon className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                </div>
                <Progress
                  value={pct}
                  className={cn("h-2", config.color)}
                />
                {quota.resetDate && (
                  <p className="text-xs text-muted-foreground">
                    Resets {new Date(quota.resetDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            );
          })}

          {showUpgradeButton && onUpgrade && (anyCritical || anyWarning) && (
            <div className="flex items-center gap-3 pt-2 border-t">
              {anyCritical ? (
                <>
                  <AlertTriangleIcon className="h-5 w-5 text-destructive" />
                  <p className="text-sm text-muted-foreground flex-1">
                    You've exceeded a usage limit. Upgrade to avoid interruptions.
                  </p>
                </>
              ) : (
                <>
                  <AlertTriangleIcon className="h-5 w-5 text-amber-500" />
                  <p className="text-sm text-muted-foreground flex-1">
                    Approaching usage limits. Consider upgrading soon.
                  </p>
                </>
              )}
              <Button onClick={onUpgrade} variant={anyCritical ? "default" : "outline"}>
                Upgrade Plan
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

QuotaUsageBar.displayName = "QuotaUsageBar";

export { QuotaUsageBar };
