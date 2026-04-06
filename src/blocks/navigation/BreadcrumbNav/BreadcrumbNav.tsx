import * as React from "react";
import { cn } from "@/lib/utils";

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbNavProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  showHome?: boolean;
  separator?: React.ReactNode;
  maxItems?: number;
  onNavigate?: (href: string) => void;
  homeLabel?: string;
}

function BreadcrumbNavInner({
  items,
  showHome = true,
  separator,
  maxItems,
  onNavigate,
  homeLabel = "Home",
  className,
  ref,
  ...props
}: BreadcrumbNavProps & { ref?: React.Ref<HTMLElement> }) {
  const defaultSeparator = separator ?? <ChevronRightIcon />;

  const effectiveItems = React.useMemo(() => {
    if (maxItems && items.length > maxItems) {
      const kept = items.slice(-maxItems);
      return [{ label: "…", href: undefined }, ...kept];
    }
    return items;
  }, [items, maxItems]);

  const handleClick = (e: React.MouseEvent, href?: string) => {
    if (href && onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn("flex items-center", className)}
      {...props}
    >
      <ol className="flex items-center gap-1 text-sm">
        {showHome && (
          <li>
            <button
              onClick={(e) => handleClick(e, "/")}
              className="flex items-center gap-1 rounded-[--la-radius] px-2 py-1 text-muted-foreground transition-colors hover:text-foreground hover:bg-[hsl(var(--la-accent))]"
            >
              <HomeIcon />
              <span className="hidden sm:inline">{homeLabel}</span>
            </button>
          </li>
        )}
        {effectiveItems.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <span className="text-muted-foreground">{defaultSeparator}</span>
            {index === effectiveItems.length - 1 ? (
              <span className="font-medium text-foreground">{item.label}</span>
            ) : item.href ? (
              <button
                onClick={(e) => handleClick(e, item.href)}
                className="flex items-center gap-1 rounded-[--la-radius] px-2 py-1 text-muted-foreground transition-colors hover:text-foreground hover:bg-[hsl(var(--la-accent))]"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ) : (
              <span className="flex items-center gap-1 px-2 py-1 text-muted-foreground">
                {item.icon}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

BreadcrumbNavInner.displayName = "BreadcrumbNav";

export const BreadcrumbNav = BreadcrumbNavInner;
