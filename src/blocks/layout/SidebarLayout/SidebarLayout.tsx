import * as React from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/Sheet";

export type SidebarLayoutVariant = "app" | "docs" | "minimal";

export interface SidebarNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: string | number;
  disabled?: boolean;
  children?: SidebarNavItem[];
}

export interface SidebarLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SidebarLayoutVariant;
  sidebar: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
  sidebarWidth?: number | "auto";
  sidebarCollapsible?: boolean;
  mobileSidebarOpen?: boolean;
  onMobileSidebarClose?: () => void;
}

const SidebarLayout = React.forwardRef<HTMLDivElement, SidebarLayoutProps>(
  (
    {
      variant = "app",
      sidebar,
      header,
      children,
      className,
      sidebarWidth = 256,
      sidebarCollapsible = false,
      mobileSidebarOpen = false,
      onMobileSidebarClose,
      ...props
    },
    ref,
  ) => {
    const widthClass = sidebarWidth === "auto" ? "w-auto" : `w-[${sidebarWidth}px]`;
    return (
      <div ref={ref} className={cn("flex min-h-screen", className)} {...props}>
        <aside
          className={cn(
            "sticky top-0 flex h-screen flex-shrink-0 flex-col border-r border-border bg-background",
            "hidden lg:flex",
            widthClass,
            variant === "docs" && "bg-muted/30",
            variant === "minimal" && "bg-transparent",
          )}
          style={sidebarWidth !== "auto" ? { width: sidebarWidth } : undefined}
        >
          {sidebar}
        </aside>

        {sidebarCollapsible && (
          <Sheet open={mobileSidebarOpen} onOpenChange={(open) => !open && onMobileSidebarClose?.()}>
            <SheetContent side="left" className="w-[280px] p-0 pt-16">
              <div className="flex h-full flex-col">{sidebar}</div>
            </SheetContent>
          </Sheet>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          {header && (
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-6 backdrop-blur">
              {sidebarCollapsible && (
                <button
                  type="button"
                  onClick={onMobileSidebarClose}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted lg:hidden"
                  aria-label="Open sidebar"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </svg>
                </button>
              )}
              <div className="flex-1">{header}</div>
            </header>
          )}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    );
  },
);
SidebarLayout.displayName = "SidebarLayout";

export { SidebarLayout };