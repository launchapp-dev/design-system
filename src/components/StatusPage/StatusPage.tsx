import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export type ServiceStatus =
  | "operational"
  | "degraded"
  | "partial_outage"
  | "major_outage"
  | "maintenance";

export interface UptimeEntry {
  date: string;
  status: ServiceStatus;
}

export interface StatusService {
  id: string;
  name: string;
  description?: string;
  status: ServiceStatus;
  uptimeHistory?: UptimeEntry[];
  uptimePercentage?: number;
}

export interface StatusPageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  services: StatusService[];
  lastUpdated?: string;
}

const STATUS_CONFIG: Record<
  ServiceStatus,
  { label: string; dotClass: string; barClass: string; badgeClass: string }
> = {
  operational: {
    label: "Operational",
    dotClass: "bg-success",
    barClass: "bg-success",
    badgeClass: "bg-success/10 text-success dark:bg-success/30 dark:dark:text-success",
  },
  degraded: {
    label: "Degraded Performance",
    dotClass: "bg-warning",
    barClass: "bg-warning",
    badgeClass: "bg-warning/10 text-warning dark:bg-warning/10 dark:text-warning",
  },
  partial_outage: {
    label: "Partial Outage",
    dotClass: "bg-warning",
    barClass: "bg-warning",
    badgeClass: "bg-warning text-warning dark:bg-warning/10 dark:text-warning",
  },
  major_outage: {
    label: "Major Outage",
    dotClass: "bg-destructive",
    barClass: "bg-destructive",
    badgeClass: "bg-destructive text-destructive-foreground dark:bg-destructive/30 dark:text-destructive",
  },
  maintenance: {
    label: "Under Maintenance",
    dotClass: "bg-info",
    barClass: "bg-info",
    badgeClass: "bg-info text-info-foreground dark:bg-info/30 dark:text-info",
  },
};

const overallStatusVariants = cva("rounded-lg px-4 py-3 text-sm font-medium", {
  variants: {
    status: {
      operational: "bg-success text-success dark:bg-success/20 dark:text-success",
      degraded: "bg-warning/5 text-warning dark:bg-warning/10 dark:text-warning",
      partial_outage: "bg-warning text-warning dark:bg-warning/10 dark:text-warning",
      major_outage: "bg-destructive/5 text-destructive-foreground dark:bg-destructive/20 dark:text-destructive",
      maintenance: "bg-info text-info-foreground dark:bg-info/20 dark:text-info",
    },
  },
  defaultVariants: {
    status: "operational",
  },
});

function getOverallStatus(services: StatusService[]): ServiceStatus {
  const priority: ServiceStatus[] = [
    "major_outage",
    "partial_outage",
    "degraded",
    "maintenance",
    "operational",
  ];
  for (const s of priority) {
    if (services.some((svc) => svc.status === s)) return s;
  }
  return "operational";
}

function computeUptime(history: UptimeEntry[]): number {
  if (history.length === 0) return 100;
  const operational = history.filter((e) => e.status === "operational").length;
  return Math.round((operational / history.length) * 1000) / 10;
}

function StatusPage({
  className,
  title = "System Status",
  description,
  services,
  lastUpdated,
  ...props
}: StatusPageProps) {
  const overall = getOverallStatus(services);
  const config = STATUS_CONFIG[overall];

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className={cn(overallStatusVariants({ status: overall }))}>
        <div className="flex items-center gap-2">
          <span className={cn("h-2.5 w-2.5 rounded-full flex-shrink-0", config.dotClass)} />
          <span>{config.label} — All Systems</span>
        </div>
        {lastUpdated && <p className="mt-1 text-xs opacity-70">Last updated: {lastUpdated}</p>}
      </div>

      <div className="divide-y divide-border rounded-lg border border-border bg-card">
        {services.map((service) => {
          const sConfig = STATUS_CONFIG[service.status];
          const history = service.uptimeHistory ?? [];
          const uptime = service.uptimePercentage ?? computeUptime(history);

          return (
            <div key={service.id} className="px-4 py-4 sm:px-6">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full flex-shrink-0", sConfig.dotClass)} />
                    <span className="font-medium text-sm text-card-foreground">
                      {service.name}
                    </span>
                  </div>
                  {service.description && (
                    <p className="mt-0.5 pl-4 text-xs text-muted-foreground">
                      {service.description}
                    </p>
                  )}
                </div>
                <span
                  className={cn(
                    "flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    sConfig.badgeClass,
                  )}
                >
                  {sConfig.label}
                </span>
              </div>

              {history.length > 0 && (
                <div className="mt-3 pl-4">
                  <div className="flex items-end gap-0.5">
                    {history.map((entry, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-7 w-1.5 rounded-sm flex-shrink-0",
                          STATUS_CONFIG[entry.status].barClass,
                        )}
                        title={`${entry.date}: ${STATUS_CONFIG[entry.status].label}`}
                      />
                    ))}
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>{history.length} days ago</span>
                    <span>{uptime}% uptime</span>
                    <span>Today</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

StatusPage.displayName = "StatusPage";
export type OverallStatusVariants = VariantProps<typeof overallStatusVariants>;

export { StatusPage, overallStatusVariants };
export type { VariantProps };
