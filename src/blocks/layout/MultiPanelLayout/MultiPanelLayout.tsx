import * as React from "react";
import { cn } from "@/lib/utils";

export interface MultiPanelLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  leftPanel?: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel?: React.ReactNode;
  leftPanelWidth?: number;
  rightPanelWidth?: number;
  header?: React.ReactNode;
}

const MultiPanelLayout = React.forwardRef<HTMLDivElement, MultiPanelLayoutProps>(
  (
    {
      leftPanel,
      centerPanel,
      rightPanel,
      leftPanelWidth = 280,
      rightPanelWidth = 300,
      header,
      className,
      ...props
    },
    ref,
  ) => (
    <div ref={ref} className={cn("flex min-h-screen flex-col", className)} {...props}>
      {header && (
        <header className="sticky top-0 z-10 border-b border-border bg-background">{header}</header>
      )}
      <div className="flex flex-1">
        {leftPanel && (
          <aside
            className="sticky top-0 flex h-screen w-full flex-shrink-0 flex-col overflow-y-auto border-r border-border"
            style={{ width: leftPanelWidth }}
          >
            {leftPanel}
          </aside>
        )}
        <main className="min-w-0 flex-1 overflow-auto">{centerPanel}</main>
        {rightPanel && (
          <aside
            className="sticky top-0 hidden h-screen w-full flex-shrink-0 flex-col overflow-y-auto border-l border-border xl:flex"
            style={{ width: rightPanelWidth }}
          >
            {rightPanel}
          </aside>
        )}
      </div>
    </div>
  ),
);
MultiPanelLayout.displayName = "MultiPanelLayout";

export { MultiPanelLayout };