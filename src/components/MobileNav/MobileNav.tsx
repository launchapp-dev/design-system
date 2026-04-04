import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../Sheet";

export interface MobileNavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  children?: MobileNavItem[];
}

export interface MobileNavProps {
  items: MobileNavItem[];
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

function MobileNav({
  items,
  className,
  triggerClassName,
  contentClassName,
}: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("md:hidden", triggerClassName)}
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className={cn("w-[280px] md:hidden", contentClassName)}
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Navigate through the application
        </SheetDescription>
        <nav className={cn("flex flex-col gap-1 mt-8", className)}>
          {items.map((item, index) => (
            <MobileNavItemComponent
              key={index}
              item={item}
              onNavigate={() => setOpen(false)}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

interface MobileNavItemComponentProps {
  item: MobileNavItem;
  onNavigate: () => void;
  depth?: number;
}

function MobileNavItemComponent({
  item,
  onNavigate,
  depth = 0,
}: MobileNavItemComponentProps) {
  const [expanded, setExpanded] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const contentId = React.useId();

  const handleClick = () => {
    if (hasChildren) {
      setExpanded(!expanded);
    } else {
      item.onClick?.();
      onNavigate();
    }
  };

  if (item.href && !hasChildren) {
    return (
      <a
        href={item.href}
        onClick={(e) => {
          e.preventDefault();
          item.onClick?.();
          onNavigate();
        }}
        className={cn(
          "flex items-center rounded-md px-4 py-3 text-sm font-medium transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:bg-accent focus:text-accent-foreground focus:outline-none",
          "min-h-[44px]",
          depth > 0 && "pl-8",
        )}
      >
        {item.label}
      </a>
    );
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-4 py-3 text-sm font-medium transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:bg-accent focus:text-accent-foreground focus:outline-none",
          "min-h-[44px]",
          depth > 0 && "pl-8",
        )}
        aria-expanded={hasChildren ? expanded : undefined}
        aria-controls={hasChildren ? contentId : undefined}
      >
        <span>{item.label}</span>
        {hasChildren && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "transition-transform duration-200",
              expanded && "rotate-180",
            )}
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
      </button>
      {hasChildren && expanded && (
        <div id={contentId} className="mt-1">
          {item.children!.map((child, index) => (
            <MobileNavItemComponent
              key={index}
              item={child}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { MobileNav };
