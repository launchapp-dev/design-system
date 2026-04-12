import * as React from "react";
import { cn } from "../../../lib/utils";

interface StatItem {
  label: string;
  value: string;
  trend: "up" | "down";
}

interface TableRow {
  name: string;
  sub: string;
  badge: "green" | "yellow";
}

interface HeroBrowserFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string;
  stats?: StatItem[];
  tableRows?: TableRow[];
}

const defaultStats: StatItem[] = [
  { label: "Monthly Revenue", value: "$12.4k", trend: "up" },
  { label: "Active Users", value: "2,847", trend: "up" },
  { label: "Conversion", value: "3.24%", trend: "down" },
  { label: "Growth", value: "+18.2%", trend: "up" },
];

const defaultTableRows: TableRow[] = [
  { name: "Sarah Chen", sub: "Enterprise plan", badge: "green" },
  { name: "Marcus Rivera", sub: "Pro plan", badge: "yellow" },
  { name: "Priya Patel", sub: "Enterprise plan", badge: "green" },
  { name: "Alex Thompson", sub: "Starter plan", badge: "green" },
];

/**
 * HeroBrowserFrame
 * A browser-window mockup showing a dashboard preview, used in landing page hero sections.
 * Ported from Nuxt implementation.
 */
const HeroBrowserFrame = React.forwardRef<HTMLDivElement, HeroBrowserFrameProps>(
  ({ className, url = "app.launchapp.dev", stats = defaultStats, tableRows = defaultTableRows, ...props }, ref) => {
    const gradId = `dsBarGrad-${React.useId()}`;
    return (
      <div ref={ref} className={cn("relative w-full max-w-[900px] mx-auto", className)} {...props}>
        {/* Glow backdrop */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, var(--la-primary) 15%, transparent), transparent 70%)",
            filter: "blur(40px)",
            transform: "translateY(-10%)",
          }}
        />

        {/* Browser chrome */}
        <div
          className="relative z-10 rounded-xl overflow-hidden border border-border"
          style={{
            boxShadow: "0 0 0 1px var(--la-border), 0 20px 60px -10px color-mix(in srgb, var(--la-foreground) 12%, transparent), 0 8px 24px -6px color-mix(in srgb, var(--la-foreground) 8%, transparent)",
            transform: "perspective(1200px) rotateX(2deg) rotateY(-1deg)",
            transformOrigin: "top center",
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-3 py-2 border-b"
            style={{ background: "var(--la-muted)", borderColor: "var(--la-border)" }}
          >
            {/* Traffic lights */}
            <div className="flex gap-1.5 flex-shrink-0">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
            </div>

            {/* Address bar */}
            <div
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs max-w-[260px] mx-auto"
              style={{
                background: "var(--la-background)",
                border: "1px solid var(--la-border)",
                color: "var(--la-muted-foreground)",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <svg className="w-2.5 h-2.5 shrink-0" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                <path d="M9 5V4a3 3 0 0 0-6 0v1H2v6h8V5H9ZM5 4a1 1 0 0 1 2 0v1H5V4Z" />
              </svg>
              <span>{url}</span>
            </div>

            {/* Spacer to balance traffic lights */}
            <div className="w-[52px] flex-shrink-0" />
          </div>

          {/* Dashboard content */}
          <div className="flex" style={{ background: "var(--la-background)", height: "320px" }}>
            {/* Sidebar */}
            <aside
              className="hidden sm:flex w-40 shrink-0 flex-col gap-5 p-4 border-r"
              style={{ background: "var(--la-card)", borderColor: "var(--la-border)" }}
            >
              {/* Logo */}
              <div className="flex items-center gap-2 px-1">
                <div
                  className="w-5.5 h-5.5 rounded-md shrink-0"
                  style={{ background: "var(--la-primary)" }}
                />
                <div
                  className="h-2 w-14 rounded"
                  style={{ background: "var(--la-muted-foreground)", opacity: 0.3 }}
                />
              </div>

              {/* Nav items */}
              <nav className="hidden sm:flex flex-col gap-0.5 flex-1">
                {[
                  { label: "Dashboard", short: true, active: true },
                  { label: "Analytics", short: false, active: false },
                  { label: "Customers", medium: true, active: false },
                  { label: "Revenue", long: true, active: false },
                  { label: "Settings", short: false, active: false },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md"
                    style={item.active ? { background: "var(--la-accent)" } : {}}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded"
                      style={{
                        background: item.active ? "var(--la-primary)" : "var(--la-muted-foreground)",
                        opacity: item.active ? 1 : 0.3,
                      }}
                    />
                    <div
                      className="h-1.5 rounded"
                      style={{
                        background: "var(--la-muted-foreground)",
                        opacity: 0.3,
                        width: item.short ? "40%" : item.medium ? "65%" : item.long ? "75%" : "55%",
                      }}
                    />
                  </div>
                ))}
              </nav>

              {/* User footer */}
              <div
                className="flex items-center gap-2 px-1 border-t pt-3"
                style={{ borderColor: "var(--la-border)" }}
              >
                <div
                  className="w-6.5 h-6.5 rounded-full shrink-0"
                  style={{ background: "linear-gradient(135deg, var(--la-primary), color-mix(in srgb, var(--la-primary) 60%, purple))" }}
                />
                <div className="flex flex-col gap-1 flex-1">
                  <div
                    className="h-1.5 rounded"
                    style={{ background: "var(--la-muted-foreground)", opacity: 0.35, width: "70%" }}
                  />
                  <div
                    className="h-1 rounded"
                    style={{ background: "var(--la-muted-foreground)", opacity: 0.2, width: "90%" }}
                  />
                </div>
              </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col p-4 gap-3 overflow-hidden">
              {/* Topbar */}
              <div className="flex items-center justify-between">
                <div
                  className="h-3.5 w-28 rounded-md"
                  style={{ background: "var(--la-foreground)", opacity: 0.5 }}
                />
                <div className="flex gap-1.5">
                  <div
                    className="h-6 w-16 rounded-md border"
                    style={{ background: "var(--la-muted)", borderColor: "var(--la-border)" }}
                  />
                  <div
                    className="h-6 w-20 rounded-md"
                    style={{ background: "var(--la-primary)" }}
                  />
                </div>
              </div>

              {/* Stats row */}
              <div
                className="grid gap-2"
                className="grid-cols-2 sm:grid-cols-4"
              >
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-2.5 flex flex-col gap-1 border"
                    style={{ background: "var(--la-card)", borderColor: "var(--la-border)" }}
                  >
                    <div
                      className="h-1.5 rounded"
                      style={{ background: "var(--la-muted-foreground)", opacity: 0.3, width: "55%" }}
                    />
                    <div
                      className="h-4 rounded"
                      style={{ background: "var(--la-foreground)", opacity: 0.5, width: "60%" }}
                    />
                    <div
                      className="h-1.5 rounded w-10"
                      style={{ background: stat.trend === "up" ? "#22c55e" : "#ef4444", opacity: 0.5 }}
                    />
                  </div>
                ))}
              </div>

              {/* Content row: chart + table */}
              <div className="flex-1 flex flex-col sm:grid gap-2 min-h-0 sm:grid-cols-[1.4fr_1fr]">
                {/* Chart card */}
                <div
                  className="rounded-lg p-2.5 flex flex-col gap-2 border overflow-hidden"
                  style={{ background: "var(--la-card)", borderColor: "var(--la-border)" }}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="h-2 w-20 rounded"
                      style={{ background: "var(--la-foreground)", opacity: 0.4 }}
                    />
                    <div
                      className="h-4 w-12 rounded-full"
                      style={{ background: "var(--la-primary)", opacity: 0.15 }}
                    />
                  </div>
                  <div className="flex-1 min-h-0">
                    <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="w-full h-full">
                      <defs>
                        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--la-primary)" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="var(--la-primary)" stopOpacity="0.3" />
                        </linearGradient>
                      </defs>
                      <rect x="8" y="50" width="14" height="30" rx="2" fill={`url(#${gradId})`} />
                      <rect x="28" y="30" width="14" height="50" rx="2" fill={`url(#${gradId})`} />
                      <rect x="48" y="40" width="14" height="40" rx="2" fill={`url(#${gradId})`} />
                      <rect x="68" y="15" width="14" height="65" rx="2" fill={`url(#${gradId})`} />
                      <rect x="88" y="35" width="14" height="45" rx="2" fill={`url(#${gradId})`} />
                      <rect x="108" y="20" width="14" height="60" rx="2" fill={`url(#${gradId})`} />
                      <rect x="128" y="10" width="14" height="70" rx="2" fill={`url(#${gradId})`} />
                      <rect x="148" y="25" width="14" height="55" rx="2" fill={`url(#${gradId})`} />
                      <rect x="168" y="5" width="14" height="75" rx="2" fill={`url(#${gradId})`} />
                    </svg>
                  </div>
                </div>

                {/* Table card */}
                <div
                  className="rounded-lg p-2.5 flex flex-col gap-2 border overflow-hidden"
                  style={{ background: "var(--la-card)", borderColor: "var(--la-border)" }}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="h-2 w-16 rounded"
                      style={{ background: "var(--la-foreground)", opacity: 0.4 }}
                    />
                    <div
                      className="h-2 w-8 rounded"
                      style={{ background: "var(--la-primary)", opacity: 0.35 }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {tableRows.map((row, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <div
                          className="w-5.5 h-5.5 rounded-full shrink-0"
                          style={{
                            background: "linear-gradient(135deg, var(--la-primary) 0%, color-mix(in srgb, var(--la-primary) 50%, #a855f7) 100%)",
                            opacity: 0.5,
                          }}
                        />
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <div
                            className="h-1.5 rounded"
                            style={{
                              background: "var(--la-foreground)",
                              opacity: 0.35,
                              width: `${50 + i * 8}%`,
                            }}
                          />
                          <div
                            className="h-1 rounded"
                            style={{
                              background: "var(--la-muted-foreground)",
                              opacity: 0.2,
                              width: `${40 + i * 5}%`,
                            }}
                          />
                        </div>
                        <div
                          className="h-3.5 w-9 rounded-full shrink-0"
                          style={{
                            background: row.badge === "yellow" ? "rgba(245,158,11,0.35)" : "rgba(34,197,94,0.25)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  },
);

HeroBrowserFrame.displayName = "HeroBrowserFrame";

export { HeroBrowserFrame };
export type { HeroBrowserFrameProps };