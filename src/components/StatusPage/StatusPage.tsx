import * as React from "react";
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
    dotClass: "bg-green-500",
    barClass: "bg-green-500",
    badgeClass:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  degraded: {
    label: "Degraded Performance",
    dotClass: "bg-yellow-500",
    barClass: "bg-yellow-500",
    badgeClass:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  partial_outage: {
    label: "Partial Outage",
    dotClass: "bg-orange-500",
    barClass: "bg-orange-500",
    badgeClass:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  },
  major_outage: {
    label: "Major Outage",
    dotClass: "bg-red-500",
    barClass: "bg-red-500",
    badgeClass:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
  maintenance: {
    label: "Under Maintenance",
    dotClass: "bg-blue-500",
    barClass: "bg-blue-500",
    badgeClass:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
};

const overallStatusVariants = cva(
  "rounded-lg px-4 py-3 text-sm font-medium",
  {
    variants: {
      status: {
        operational: "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300",
        degraded: "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
        partial_outage: "bg-orange-50 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
        major_outage: "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300",
        maintenance: "bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      },
    },
    defaultVariants: {
      status: "operational",
    },
  }
);

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
        <h1 className="text-2xl font-bold text-[hsl(var(--la-foreground))]">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
            {description}
          </p>
        )}
      </div>

      <div className={cn(overallStatusVariants({ status: overall }))}>
        <div className="flex items-center gap-2">
          <span
            className={cn("h-2.5 w-2.5 rounded-full flex-shrink-0", config.dotClass)}
          />
          <span>{config.label} — All Systems</span>
        </div>
        {lastUpdated && (
          <p className="mt-1 text-xs opacity-70">Last updated: {lastUpdated}</p>
        )}
      </div>

      <div className="divide-y divide-[hsl(var(--la-border))] rounded-lg border border-[hsl(var(--la-border))] bg-[hsl(var(--la-card))]">
        {services.map((service) => {
          const sConfig = STATUS_CONFIG[service.status];
          const history = service.uptimeHistory ?? [];
          const uptime =
            service.uptimePercentage ?? computeUptime(history);

          return (
            <div key={service.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full flex-shrink-0",
                        sConfig.dotClass
                      )}
                    />
                    <span className="font-medium text-sm text-[hsl(var(--la-card-foreground))]">
                      {service.name}
                    </span>
                  </div>
                  {service.description && (
                    <p className="mt-0.5 ps-4 text-xs text-[hsl(var(--la-muted-foreground))]">
                      {service.description}
                    </p>
                  )}
                </div>
                <span
                  className={cn(
                    "flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    sConfig.badgeClass
                  )}
                >
                  {sConfig.label}
                </span>
              </div>

              {history.length > 0 && (
                <div className="mt-3 ps-4">
                  <div className="flex items-end gap-0.5">
                    {history.map((entry, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-7 w-1.5 rounded-sm flex-shrink-0",
                          STATUS_CONFIG[entry.status].barClass
                        )}
                        title={`${entry.date}: ${STATUS_CONFIG[entry.status].label}`}
                      />
                    ))}
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-[hsl(var(--la-muted-foreground))]">
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
export { StatusPage, overallStatusVariants };
export type { VariantProps };
