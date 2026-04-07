import type * as React from "react";
import { cn } from "../../lib/utils";
import { Badge } from "../../components/Badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Card";
import { Progress } from "../../components/Progress";

// ── Icons (inline SVG to avoid lucide-react dep) ─────────────────────────────
function ActivityIcon({ className }: { className?: string }) {
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
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
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

function CheckCircleIcon({ className }: { className?: string }) {
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
      <path d="m9 12 2 2 4-4" />
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

function XCircleIcon({ className }: { className?: string }) {
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
      <line x1="15" x2="9" y1="9" y2="15" />
      <line x1="9" x2="15" y1="9" y2="15" />
    </svg>
  );
}

function ServerIcon({ className }: { className?: string }) {
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
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

export type ServiceStatus = "operational" | "degraded" | "partial_outage" | "major_outage" | "maintenance";

export interface Service {
  id: string;
  name: string;
  description?: string;
  status: ServiceStatus;
  uptime: number;
  lastIncident?: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  startedAt: string;
  resolvedAt?: string;
  affectedServices: string[];
}

export interface StatusPageProps extends React.HTMLAttributes<HTMLDivElement> {
  services: Service[];
  incidents?: Incident[];
  overallStatus?: ServiceStatus;
  title?: string;
  description?: string;
  lastUpdated?: string;
}

const statusConfig: Record<ServiceStatus, { label: string; color: string; icon: React.ReactNode; badge: "default" | "secondary" | "destructive" | "outline" }> = {
  operational: {
    label: "Operational",
    color: "bg-emerald-500",
    icon: <CheckCircleIcon className="h-5 w-5 text-emerald-500" />,
    badge: "default",
  },
  degraded: {
    label: "Degraded Performance",
    color: "bg-yellow-500",
    icon: <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />,
    badge: "secondary",
  },
  partial_outage: {
    label: "Partial Outage",
    color: "bg-orange-500",
    icon: <AlertTriangleIcon className="h-5 w-5 text-orange-500" />,
    badge: "destructive",
  },
  major_outage: {
    label: "Major Outage",
    color: "bg-red-500",
    icon: <XCircleIcon className="h-5 w-5 text-red-500" />,
    badge: "destructive",
  },
  maintenance: {
    label: "Maintenance",
    color: "bg-blue-500",
    icon: <ClockIcon className="h-5 w-5 text-blue-500" />,
    badge: "outline",
  },
};

const incidentStatusConfig: Record<Incident["status"], { label: string; color: string }> = {
  investigating: { label: "Investigating", color: "bg-red-500" },
  identified: { label: "Identified", color: "bg-orange-500" },
  monitoring: { label: "Monitoring", color: "bg-yellow-500" },
  resolved: { label: "Resolved", color: "bg-emerald-500" },
};

function StatusPage({
  services,
  incidents = [],
  overallStatus,
  title = "System Status",
  description = "Real-time status of our services",
  lastUpdated,
  className,
  ...props
}: StatusPageProps) {
  const computedOverallStatus = overallStatus || (() => {
    if (services.some(s => s.status === "major_outage")) return "major_outage";
    if (services.some(s => s.status === "partial_outage")) return "partial_outage";
    if (services.some(s => s.status === "degraded")) return "degraded";
    if (services.some(s => s.status === "maintenance")) return "maintenance";
    return "operational";
  })();

  const overall = statusConfig[computedOverallStatus];
  const activeIncidents = incidents.filter(i => i.status !== "resolved");

  return (
    <div className={cn("space-y-6", className)} {...props}>
      {/* Overall Status Banner */}
      <Card className={cn("border-l-4", overall.color.replace("bg-", "border-l-"))}>
        <CardContent className="flex items-center gap-4 py-6">
          {overall.icon}
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <Badge variant={overall.badge} className="text-sm px-3 py-1">
            {overall.label}
          </Badge>
        </CardContent>
      </Card>

      {/* Last Updated */}
      {lastUpdated && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ClockIcon className="h-4 w-4" />
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </div>
      )}

      {/* Active Incidents */}
      {activeIncidents.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangleIcon className="h-5 w-5 text-destructive" />
            Active Incidents
          </h2>
          {activeIncidents.map(incident => {
            const status = incidentStatusConfig[incident.status];
            return (
              <Card key={incident.id} className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{incident.title}</CardTitle>
                      <CardDescription>{incident.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className={status.color.replace("bg-", "border-").replace("500", "500/30") + " " + status.color.replace("bg-", "text-")}>
                      {status.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      Started: {new Date(incident.startedAt).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <ServerIcon className="h-4 w-4" />
                      Affected: {incident.affectedServices.join(", ")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Services Grid */}
      <div className="grid gap-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ActivityIcon className="h-5 w-5 text-muted-foreground" />
          Services
        </h2>
        {services.map(service => {
          const status = statusConfig[service.status];
          return (
            <Card key={service.id}>
              <CardContent className="flex items-center gap-4 py-4">
                <div className={cn("h-3 w-3 rounded-full shrink-0", status.color)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{service.name}</span>
                    <Badge variant="outline" className="text-xs">{status.label}</Badge>
                  </div>
                  {service.description && (
                    <p className="text-sm text-muted-foreground truncate">{service.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span>{service.uptime.toFixed(2)}%</span>
                    <Progress value={service.uptime} className="w-24 h-2" />
                  </div>
                  <span className="hidden sm:inline">Uptime (30d)</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

StatusPage.displayName = "StatusPage";

export { StatusPage };
