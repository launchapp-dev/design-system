import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const statusPageVariants = cva("", {
  variants: {},
  defaultVariants: {},
});

const statusBadgeVariants = cva("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", {
  variants: {
    status: {
      operational: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
      degraded: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
      partial: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
      outage: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
      maintenance: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
      unknown: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    },
  },
  defaultVariants: {
    status: "unknown",
  },
});

export type ServiceStatus = "operational" | "degraded" | "partial" | "outage" | "maintenance" | "unknown";

export interface Service {
  id: string;
  name: string;
  status: ServiceStatus;
  uptime?: number;
  latency?: number;
  description?: string;
  category?: string;
  incidents?: Incident[];
}

export interface Incident {
  id: string;
  title: string;
  status: ServiceStatus;
  date: string;
  duration?: string;
  impact?: string;
}

export interface UptimeHistoryEntry {
  date: string;
  uptime: number;
}

export interface StatusPageProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statusPageVariants> {
  services: Service[];
  title?: string;
  description?: string;
  showUptime?: boolean;
  showLatency?: boolean;
  uptimeHistory?: UptimeHistoryEntry[];
}

const StatusPage = React.forwardRef<HTMLDivElement, StatusPageProps>(
  ({ className, services, title = "System Status", description, showUptime = true, showLatency = true, uptimeHistory, ...props }, ref) => {
    const overallStatus = React.useMemo(() => {
      const hasOutage = services.some(s => s.status === "outage");
      const hasDegraded = services.some(s => s.status === "degraded" || s.status === "partial");
      if (hasOutage) return "outage";
      if (hasDegraded) return "degraded";
      return "operational";
    }, [services]);

    const averageUptime = React.useMemo(() => {
      const servicesWithUptime = services.filter(s => s.uptime !== undefined);
      if (servicesWithUptime.length === 0) return null;
      const sum = servicesWithUptime.reduce((acc, s) => acc + (s.uptime ?? 0), 0);
      return sum / servicesWithUptime.length;
    }, [services]);

    return (
      <div ref={ref} className={cn(statusPageVariants({ className }), className)} {...props}>
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">{title}</h2>
            <StatusBadge status={overallStatus} />
          </div>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
          {averageUptime !== null && showUptime && (
            <p className="mt-2 text-sm text-muted-foreground">
              Average uptime: <span className="font-medium text-foreground">{averageUptime.toFixed(2)}%</span> (last 90 days)
            </p>
          )}
        </div>

        <div className="space-y-6">
          {uptimeHistory && uptimeHistory.length > 0 && (
            <UptimeChart data={uptimeHistory} />
          )}

          <ServicesList
            services={services}
            showUptime={showUptime}
            showLatency={showLatency}
          />
        </div>
      </div>
    );
  }
);
StatusPage.displayName = "StatusPage";

function ServicesList({
  services,
  showUptime,
  showLatency,
}: {
  services: Service[];
  showUptime: boolean;
  showLatency: boolean;
}) {
  const groupedServices = React.useMemo(() => {
    const groups: Record<string, Service[]> = {};
    services.forEach(service => {
      const category = service.category || "Other";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(service);
    });
    return groups;
  }, [services]);

  return (
    <div className="space-y-4">
      {Object.entries(groupedServices).map(([category, categoryServices]) => (
        <div key={category} className="rounded-lg border border-border">
          <div className="border-b border-border bg-muted/50 px-4 py-2">
            <h3 className="text-sm font-medium">{category}</h3>
          </div>
          <div className="divide-y divide-border">
            {categoryServices.map(service => (
              <ServiceRow
                key={service.id}
                service={service}
                showUptime={showUptime}
                showLatency={showLatency}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ServiceRow({
  service,
  showUptime,
  showLatency,
}: {
  service: Service;
  showUptime: boolean;
  showLatency: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <StatusDot status={service.status} />
        <div>
          <p className="text-sm font-medium">{service.name}</p>
          {service.description && (
            <p className="text-xs text-muted-foreground">{service.description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {showUptime && service.uptime !== undefined && (
          <span className="text-sm text-muted-foreground">
            {service.uptime.toFixed(2)}% uptime
          </span>
        )}
        {showLatency && service.latency !== undefined && (
          <span className="text-sm text-muted-foreground">
            {service.latency}ms
          </span>
        )}
        <StatusBadge status={service.status} />
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: ServiceStatus }) {
  const colorClass = {
    operational: "bg-green-500",
    degraded: "bg-amber-500",
    partial: "bg-orange-500",
    outage: "bg-red-500",
    maintenance: "bg-blue-500",
    unknown: "bg-gray-400",
  }[status];

  return (
    <span className={cn("h-2.5 w-2.5 rounded-full", colorClass)} aria-hidden="true" />
  );
}

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: ServiceStatus;
}

function StatusBadge({ className, status, ...props }: StatusBadgeProps) {
  const label = {
    operational: "Operational",
    degraded: "Degraded",
    partial: "Partial Outage",
    outage: "Major Outage",
    maintenance: "Maintenance",
    unknown: "Unknown",
  }[status];

  return (
    <span className={cn(statusBadgeVariants({ status }), className)} {...props}>
      <StatusDot status={status} />
      {label}
    </span>
  );
}

function UptimeChart({ data }: { data: UptimeHistoryEntry[] }) {
  const maxUptime = 100;
  const minUptime = 99;

  return (
    <div className="rounded-lg border border-border p-4">
      <h3 className="mb-4 text-sm font-medium">Uptime History (Last 30 Days)</h3>
      <div className="flex h-16 items-end gap-1">
        {data.slice(-30).map((entry, index) => {
          const height = Math.max(4, ((entry.uptime - minUptime) / (maxUptime - minUptime)) * 100);
          const color = entry.uptime >= 99.9 ? "bg-green-500" : entry.uptime >= 99 ? "bg-amber-500" : "bg-red-500";
          return (
            <div
              key={index}
              className="group relative flex flex-1 items-end"
            >
              <div
                className={cn("w-full rounded-t transition-colors hover:opacity-80", color)}
                style={{ height: `${height}%` }}
              />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden items-center justify-center group-hover:flex">
                <div className="rounded bg-popover px-2 py-1 text-xs shadow-md">
                  <p className="font-medium">{entry.uptime.toFixed(2)}%</p>
                  <p className="text-muted-foreground">{entry.date}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{data[data.length - 30]?.date || ""}</span>
        <span>{data[data.length - 1]?.date || ""}</span>
      </div>
    </div>
  );
}

export { StatusPage, StatusBadge, statusBadgeVariants };
