"use client";

import * as React from "react";
import { blockPreviews } from "@/lib/block-previews";
import { cn } from "@/lib/utils";

type Viewport = "mobile" | "tablet" | "desktop";

const VIEWPORT_WIDTHS: Record<Viewport, string> = {
  mobile: "375px",
  tablet: "768px",
  desktop: "100%",
};

interface BlockPreviewProps {
  blockId: string;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function BlockPreview({ blockId }: BlockPreviewProps) {
  const [viewport, setViewport] = React.useState<Viewport>("desktop");
  const PreviewFn = blockPreviews[blockId];

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
        <span className="text-xs font-medium text-muted-foreground">
          Preview
        </span>
        <div
          className="flex items-center gap-1"
          role="group"
          aria-label="Viewport size"
        >
          <ViewportButton
            label="Mobile"
            icon={<MobileIcon />}
            active={viewport === "mobile"}
            onClick={() => setViewport("mobile")}
          />
          <ViewportButton
            label="Tablet"
            icon={<TabletIcon />}
            active={viewport === "tablet"}
            onClick={() => setViewport("tablet")}
          />
          <ViewportButton
            label="Desktop"
            icon={<DesktopIcon />}
            active={viewport === "desktop"}
            onClick={() => setViewport("desktop")}
          />
        </div>
      </div>
      <div className="bg-muted/30 overflow-auto p-4">
        <div
          className={cn(
            "bg-background mx-auto transition-all duration-300 overflow-auto",
            viewport !== "desktop" &&
              "border border-border rounded-lg shadow-sm",
          )}
          style={{ width: VIEWPORT_WIDTHS[viewport], maxWidth: "100%" }}
        >
          <ErrorBoundary
            fallback={
              <div className="flex min-h-[200px] items-center justify-center p-8">
                <div className="text-center text-sm text-muted-foreground">
                  <p className="mb-1 font-medium">Preview unavailable</p>
                  <p className="text-xs">
                    See the code snippet below for usage.
                  </p>
                </div>
              </div>
            }
          >
            {PreviewFn ? (
              <div className="p-6">
                <PreviewFn />
              </div>
            ) : (
              <div className="flex min-h-[200px] items-center justify-center p-8">
                <div className="text-center text-sm text-muted-foreground">
                  <p className="mb-1 font-medium">No preview available</p>
                  <p className="text-xs">
                    See the code snippet below for usage.
                  </p>
                </div>
              </div>
            )}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

interface ViewportButtonProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function ViewportButton({ label, icon, active, onClick }: ViewportButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors",
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function MobileIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function TabletIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}
