import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";

export type StatusPageServiceStatus =
  | "operational"
  | "degraded"
  | "partial_outage"
  | "major_outage"
  | "maintenance"
  | "unknown";
export type StatusPageIncidentSeverity = "critical" | "high" | "medium" | "low";

export interface ServiceComponent {
  id: string;
  name: string;
  description?: string;
  status: StatusPageServiceStatus;
  updatedAt?: string;
  group?: string;
}

export interface StatusIncident {
  id: string;
  title: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  severity: StatusPageIncidentSeverity;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  affectedComponents?: string[];
  updates?: { timestamp: string; message: string }[];
}

export interface UptimeRecord {
  date: string;
  status: StatusPageServiceStatus;
}

export interface StatusPageDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  components: ServiceComponent[];
  incidents?: StatusIncident[];
  uptimeHistory?: UptimeRecord[];
  overallStatus?: StatusPageServiceStatus;
  lastChecked?: string;
  title?: string;
  organizationName?: string;
}

const STATUS_CONFIG: Record<
  StatusPageServiceStatus,
  {
    label: string;
    color: string;
    dotColor: string;
    badgeVariant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  operational: {
    label: "Operational",
    color: "text-green-600",
    dotColor: "bg-green-500",
    badgeVariant: "outline",
  },
  degraded: {
    label: "Degraded performance",
    color: "text-yellow-600",
    dotColor: "bg-yellow-500",
    badgeVariant: "secondary",
  },
  partial_outage: {
    label: "Partial outage",
    color: "text-orange-600",
    dotColor: "bg-orange-500",
    badgeVariant: "secondary",
  },
  major_outage: {
    label: "Major outage",
    color: "text-red-600",
    dotColor: "bg-red-500",
    badgeVariant: "destructive",
  },
  maintenance: {
    label: "Under maintenance",
    color: "text-blue-600",
    dotColor: "bg-blue-500",
    badgeVariant: "default",
  },
  unknown: {
    label: "Unknown",
    color: "text-muted-foreground",
    dotColor: "bg-muted-foreground",
    badgeVariant: "secondary",
  },
};

const INCIDENT_STATUS_LABELS = {
  investigating: "Investigating",
  identified: "Identified",
  monitoring: "Monitoring",
  resolved: "Resolved",
};

const SEVERITY_BADGE: Record<
  StatusPageIncidentSeverity,
  "default" | "secondary" | "destructive" | "outline"
> = {
  critical: "destructive",
  high: "destructive",
  medium: "secondary",
  low: "outline",
};

function StatusDot({ status, className }: { status: StatusPageServiceStatus; className?: string }) {
  const { dotColor } = STATUS_CONFIG[status];
  return (
    <span
      className={cn("inline-block h-2.5 w-2.5 rounded-full", dotColor, className)}
      aria-hidden="true"
    />
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function computeOverallStatus(components: ServiceComponent[]): StatusPageServiceStatus {
  const statuses = components.map((c) => c.status);
  if (statuses.includes("major_outage")) return "major_outage";
  if (statuses.includes("partial_outage")) return "partial_outage";
  if (statuses.includes("degraded")) return "degraded";
  if (statuses.includes("maintenance")) return "maintenance";
  if (statuses.every((s) => s === "operational")) return "operational";
  return "unknown";
}

function OverallStatusBanner({ status }: { status: StatusPageServiceStatus }) {
  const { label, color, dotColor } = STATUS_CONFIG[status];
  const isOperational = status === "operational";
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border p-4",
        isOperational
          ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30"
          : "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/30",
      )}
    >
      <span className={cn("h-3 w-3 rounded-full", dotColor)} aria-hidden="true" />
      <span className={cn("text-base font-semibold", color)}>{label}</span>
    </div>
  );
}

function UptimeBar({ records }: { records: UptimeRecord[] }) {
  const last90 = records.slice(-90);
  return (
    <div className="flex h-8 items-end gap-px">
      {last90.map((r, i) => {
        const { dotColor } = STATUS_CONFIG[r.status];
        return (
          <div
            key={i}
            title={`${r.date}: ${STATUS_CONFIG[r.status].label}`}
            className={cn("flex-1 min-w-[3px] rounded-sm", dotColor)}
            style={{ height: r.status === "operational" ? "100%" : "60%" }}
          />
        );
      })}
    </div>
  );
}

function StatusPageDashboard({
  components,
  incidents = [],
  uptimeHistory = [],
  overallStatus: overallStatusProp,
  lastChecked,
  title = "System Status",
  organizationName,
  className,
  ...props
}: StatusPageDashboardProps) {
  const overallStatus = overallStatusProp ?? computeOverallStatus(components);

  // Group components
  const groups = React.useMemo(() => {
    const map = new Map<string, ServiceComponent[]>();
    for (const c of components) {
      const key = c.group ?? "";
      if (!map.has(key)) map.set(key, []);
      map.get(key)?.push(c);
    }
    return map;
  }, [components]);

  const activeIncidents = incidents.filter((i) => i.status !== "resolved");
  const pastIncidents = incidents.filter((i) => i.status === "resolved");

  return (
    <div className={cn("space-y-6", className)} {...props}>
      {/* Header */}
      <div className="space-y-1">
        {organizationName && (
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {organizationName}
          </p>
        )}
        <h2 className="text-2xl font-bold">{title}</h2>
        {lastChecked && (
          <p className="text-xs text-muted-foreground">Last checked: {formatDate(lastChecked)}</p>
        )}
      </div>

      {/* Overall status */}
      <OverallStatusBanner status={overallStatus} />

      {/* Active incidents */}
      {activeIncidents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-destructive">Active Incidents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeIncidents.map((incident) => (
              <div
                key={incident.id}
                className="space-y-2 rounded-lg border border-destructive/20 p-3"
              >
                <div className="flex flex-wrap items-start gap-2">
                  <span className="text-sm font-semibold flex-1">{incident.title}</span>
                  <div className="flex gap-1.5">
                    <Badge
                      variant={SEVERITY_BADGE[incident.severity]}
                      className="text-xs capitalize"
                    >
                      {incident.severity}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {INCIDENT_STATUS_LABELS[incident.status]}
                    </Badge>
                  </div>
                </div>
                {incident.affectedComponents && incident.affectedComponents.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Affected: {incident.affectedComponents.join(", ")}
                  </p>
                )}
                {incident.updates && incident.updates.length > 0 && (
                  <div className="space-y-1 border-t pt-2">
                    {incident.updates.slice(-2).map((u, i) => (
                      <div key={i} className="text-xs">
                        <span className="text-muted-foreground">{formatDate(u.timestamp)}: </span>
                        {u.message}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Component status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from(groups.entries()).map(([group, groupComponents]) => (
            <div key={group} className="space-y-2">
              {group && (
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group}
                </h4>
              )}
              <ul className="space-y-0 divide-y rounded-lg border">
                {groupComponents.map((component) => {
                  const { label, color } = STATUS_CONFIG[component.status];
                  return (
                    <li key={component.id} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <span className="text-sm font-medium">{component.name}</span>
                        {component.description && (
                          <p className="text-xs text-muted-foreground">{component.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn("text-xs font-medium", color)}>{label}</span>
                        <StatusDot status={component.status} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Uptime history */}
      {uptimeHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Uptime — last 90 days</CardTitle>
          </CardHeader>
          <CardContent>
            <UptimeBar records={uptimeHistory} />
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>90 days ago</span>
              <span>Today</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Past incidents */}
      {pastIncidents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Past Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {pastIncidents.slice(0, 5).map((incident) => (
                <li key={incident.id} className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium line-through decoration-muted-foreground/50">
                      {incident.title}
                    </p>
                    {incident.resolvedAt && (
                      <p className="text-xs text-muted-foreground">
                        Resolved {formatDate(incident.resolvedAt)}
                      </p>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">
                    Resolved
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

StatusPageDashboard.displayName = "StatusPageDashboard";

export { StatusPageDashboard };
