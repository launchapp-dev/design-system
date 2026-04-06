"use client";

import * as React from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/Resizable";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface MultiPanelLayoutPanel {
  /** Unique identifier for the panel */
  id: string;
  /** Content to render inside the panel */
  children: React.ReactNode;
  /** Initial size as a percentage (1-100) */
  defaultSize?: number;
  /** Minimum panel size in percent */
  minSize?: number;
  /** Maximum panel size in percent */
  maxSize?: number;
  /** Panel header shown above the panel content */
  header?: React.ReactNode;
  /** Panel footer shown below the panel content */
  footer?: React.ReactNode;
  /** CSS class for the panel container */
  className?: string;
  /** CSS class for the panel content area */
  contentClassName?: string;
}

export interface MultiPanelLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of panel definitions */
  panels: MultiPanelLayoutPanel[];
  /** Layout direction: "horizontal" (side-by-side) or "vertical" (stacked) */
  direction?: "horizontal" | "vertical";
  /** Whether panels can be resized by dragging handles */
  resizable?: boolean;
  /** Whether to show resize handles */
  showHandles?: boolean;
  /** Whether handles have a visible drag indicator (grip dots) */
  handleWithHandleIndicator?: boolean;
  /** CSS class applied to the panel group container */
  groupClassName?: string;
}

// ── Main Component ─────────────────────────────────────────────────────────────

const MultiPanelLayout = React.forwardRef<HTMLDivElement, MultiPanelLayoutProps>(
  (
    {
      panels,
      direction = "horizontal",
      resizable = true,
      showHandles = true,
      handleWithHandleIndicator = false,
      groupClassName,
      className,
      ...props
    },
    ref,
  ) => {
    const isHorizontal = direction === "horizontal";
    const groupDirection = isHorizontal ? ("horizontal" as const) : ("vertical" as const);

    return (
      <div ref={ref} className={cn("flex h-full", className)} {...props}>
        <ResizablePanelGroup
          orientation={groupDirection}
          className={cn("flex h-full w-full", groupClassName)}
        >
          {panels.map((panel, idx) => (
            <React.Fragment key={panel.id}>
              <ResizablePanel
                id={panel.id}
                defaultSize={panel.defaultSize ?? Math.floor(100 / panels.length)}
                minSize={panel.minSize ?? 5}
                maxSize={panel.maxSize ?? 100}
              >
                <div className={cn("flex h-full flex-col", panel.className)}>
                  {panel.header && (
                    <div
                      className={cn(
                        "flex shrink-0 items-center gap-2 border-b border-border bg-background px-3 py-2 text-sm font-medium",
                      )}
                    >
                      {panel.header}
                    </div>
                  )}
                  <div className={cn("flex-1 overflow-auto", panel.contentClassName)}>
                    {panel.children}
                  </div>
                  {panel.footer && (
                    <div className="shrink-0 border-t border-border bg-background px-3 py-2">
                      {panel.footer}
                    </div>
                  )}
                </div>
              </ResizablePanel>

              {resizable && showHandles && idx < panels.length - 1 && (
                <ResizableHandle
                  withHandle={handleWithHandleIndicator}
                  className={cn(isHorizontal ? "w-px" : "h-px flex-col")}
                />
              )}
            </React.Fragment>
          ))}
        </ResizablePanelGroup>
      </div>
    );
  },
);
MultiPanelLayout.displayName = "MultiPanelLayout";

export { MultiPanelLayout };
