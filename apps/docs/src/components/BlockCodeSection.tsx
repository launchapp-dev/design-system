"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BlockCodeSectionProps {
  usageCode: React.ReactNode;
  sourceCode: React.ReactNode | null;
}

export function BlockCodeSection({
  usageCode,
  sourceCode,
}: BlockCodeSectionProps) {
  const [tab, setTab] = React.useState<"usage" | "source">("usage");

  return (
    <div>
      {sourceCode && (
        <div
          className="flex items-center gap-1 mb-2"
          role="group"
          aria-label="Code view"
        >
          <button
            onClick={() => setTab("usage")}
            aria-pressed={tab === "usage"}
            className={cn(
              "rounded px-3 py-1 text-xs font-medium transition-colors",
              tab === "usage"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            Usage
          </button>
          <button
            onClick={() => setTab("source")}
            aria-pressed={tab === "source"}
            className={cn(
              "rounded px-3 py-1 text-xs font-medium transition-colors",
              tab === "source"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            View Source
          </button>
        </div>
      )}
      <div>{tab === "usage" || !sourceCode ? usageCode : sourceCode}</div>
    </div>
  );
}
