import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/Button";
import { Separator } from "../../components/Separator";
import { Badge } from "../../components/Badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../components/Sheet";

// Inline SVG icons (avoiding lucide-react dependency)
function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

export type SettingsNavItem = {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  description?: string;
};

export type SettingsNavSection = {
  title?: string;
  items: SettingsNavItem[];
};

export interface SettingsLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sections: SettingsNavSection[];
  activeItemId?: string;
  onItemClick?: (item: SettingsNavItem) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  mobileMenuLabel?: string;
}

function SettingsLayout({
  sections,
  activeItemId,
  onItemClick,
  header,
  footer,
  sidebarFooter,
  children,
  title = "Settings",
  description,
  mobileMenuLabel = "Menu",
  className,
  ...props
}: SettingsLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const activeItem = sections.flatMap((s) => s.items).find((item) => item.id === activeItemId);

  const handleItemClick = (item: SettingsNavItem) => {
    if (!item.disabled) {
      onItemClick?.(item);
      setMobileOpen(false);
    }
  };

  const NavContent = () => (
    <nav className="space-y-6">
      {sections.map((section, sectionIndex) => (
        <div key={section.title || `section-${sectionIndex}`}>
          {section.title && (
            <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h4>
          )}
          <div className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = item.id === activeItemId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    item.disabled && "cursor-not-allowed opacity-50",
                  )}
                >
                  {item.icon && (
                    <span className="flex-shrink-0" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge !== undefined && (
                    <Badge
                      variant={isActive ? "default" : "secondary"}
                      className="h-5 min-w-5 px-1.5 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <div className={cn("min-h-screen", className)} {...props}>
      {header && <div className="border-b border-border">{header}</div>}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Mobile header */}
        <div className="mb-6 flex items-center gap-4 lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label={mobileMenuLabel}>
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader className="mb-4">
                <SheetTitle>{title}</SheetTitle>
              </SheetHeader>
              <NavContent />
              {sidebarFooter && (
                <>
                  <Separator className="my-4" />
                  {sidebarFooter}
                </>
              )}
            </SheetContent>
          </Sheet>
          <div>
            <h1 className="text-lg font-semibold">{activeItem?.label || title}</h1>
            {activeItem?.description && (
              <p className="text-sm text-muted-foreground">{activeItem.description}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-8">
              {(title || description) && (
                <div className="mb-6">
                  <h1 className="text-xl font-semibold">{title}</h1>
                  {description && (
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                  )}
                </div>
              )}
              <NavContent />
              {sidebarFooter && (
                <>
                  <Separator className="my-4" />
                  {sidebarFooter}
                </>
              )}
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1">
            {/* Desktop page header */}
            <div className="mb-6 hidden lg:block">
              <h2 className="text-2xl font-bold tracking-tight">{activeItem?.label || title}</h2>
              {activeItem?.description && (
                <p className="mt-1 text-muted-foreground">{activeItem.description}</p>
              )}
            </div>
            <div className="space-y-6">{children}</div>
          </main>
        </div>
      </div>

      {footer && <div className="border-t border-border mt-auto">{footer}</div>}
    </div>
  );
}

SettingsLayout.displayName = "SettingsLayout";

export { SettingsLayout };
