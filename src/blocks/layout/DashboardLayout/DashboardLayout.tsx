import * as React from "react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

export type DashboardLayoutColumns = 1 | 2 | 3;

export interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of content columns.
   * - `1` — single column (full width)
   * - `2` — split: main + side panel
   * - `3` — triple: left panel + main + right panel
   */
  columns?: DashboardLayoutColumns;
  /** Sticky top header */
  header?: React.ReactNode;
  /**
   * Left / secondary panel (columns 2 & 3).
   * Always renders on the left side.
   */
  leftPanel?: React.ReactNode;
  /** Right panel (columns=3 only) */
  rightPanel?: React.ReactNode;
  /** Width of left panel (px) */
  leftPanelWidth?: number;
  /** Width of right panel (px, columns=3 only) */
  rightPanelWidth?: number;
  /** Main content — always present */
  children: React.ReactNode;
}

// ── Component ─────────────────────────────────────────────────────────────────

const DashboardLayout = React.forwardRef<HTMLDivElement, DashboardLayoutProps>(
  (
    {
      columns = 1,
      header,
      leftPanel,
      rightPanel,
      leftPanelWidth = 280,
      rightPanelWidth = 320,
      children,
      className,
      ...props
    },
    ref,
  ) => (
    <div ref={ref} className={cn("flex min-h-screen flex-col bg-background", className)} {...props}>
      {header && (
        <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {header}
        </header>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — split (col=2) or triple (col=3) */}
        {columns >= 2 && leftPanel && (
          <aside
            className="hidden h-full shrink-0 flex-col overflow-y-auto border-r border-border lg:flex"
            style={{ width: leftPanelWidth }}
          >
            {leftPanel}
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {columns === 1 ? (
            <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
          ) : (
            children
          )}
        </main>

        {/* Right panel — triple only */}
        {columns === 3 && rightPanel && (
          <aside
            className="hidden h-full shrink-0 flex-col overflow-y-auto border-l border-border xl:flex"
            style={{ width: rightPanelWidth }}
          >
            {rightPanel}
          </aside>
        )}
      </div>
    </div>
  ),
);
DashboardLayout.displayName = "DashboardLayout";

export { DashboardLayout };
