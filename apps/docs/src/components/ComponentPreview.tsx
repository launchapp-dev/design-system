"use client";

import * as React from "react";
import { previews } from "@/lib/previews";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps {
  slug: string;
}

export function ComponentPreview({ slug }: ComponentPreviewProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const PreviewFn = previews[slug];

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
        <span className="text-xs font-medium text-muted-foreground">Preview</span>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium transition-colors hover:bg-accent text-muted-foreground hover:text-foreground"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              Dark
            </>
          ) : (
            <>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              Light
            </>
          )}
        </button>
      </div>
      <div
        className={cn(
          "flex min-h-[200px] items-center justify-center p-8",
          theme === "dark" ? "dark bg-[hsl(240,10%,3.9%)]" : "bg-background"
        )}
      >
        {PreviewFn ? (
          <PreviewFn />
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-1 font-medium">No preview available</p>
            <p className="text-xs">Check the code examples below.</p>
          </div>
        )}
      </div>
    </div>
  );
}
