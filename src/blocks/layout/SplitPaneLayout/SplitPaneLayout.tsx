import * as React from "react";
import { cn } from "@/lib/utils";

export type SplitPaneOrientation = "horizontal" | "vertical";

export interface SplitPaneLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
  orientation?: SplitPaneOrientation;
  leftPaneSize?: number | string;
  minLeftPaneSize?: number | string;
  minRightPaneSize?: number | string;
  showDivider?: boolean;
  dividerPosition?: number;
  onDividerChange?: (position: number) => void;
}

const SplitPaneLayout = React.forwardRef<HTMLDivElement, SplitPaneLayoutProps>(
  (
    {
      leftPane,
      rightPane,
      orientation = "horizontal",
      leftPaneSize,
      minLeftPaneSize = 200,
      minRightPaneSize = 200,
      showDivider = true,
      className,
      ...props
    },
    ref,
  ) => {
    const isVertical = orientation === "vertical";

    return (
      <div
        ref={ref}
        className={cn("flex", isVertical ? "flex-row" : "flex-col", className)}
        {...props}
      >
        <div
          className="flex overflow-auto"
          style={
            leftPaneSize
              ? isVertical
                ? { width: leftPaneSize }
                : { height: leftPaneSize }
              : undefined
          }
        >
          {leftPane}
        </div>
        {showDivider && (
          <div
            className={cn(
              "flex-shrink-0 bg-border",
              isVertical ? "w-px cursor-col-resize" : "h-px cursor-row-resize",
            )}
            style={
              isVertical
                ? { minHeight: minRightPaneSize }
                : { minWidth: minRightPaneSize }
            }
          />
        )}
        <div className="flex min-w-0 flex-1 overflow-auto">{rightPane}</div>
      </div>
    );
  },
);
SplitPaneLayout.displayName = "SplitPaneLayout";

export { SplitPaneLayout };