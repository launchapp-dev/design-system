import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/Avatar";
import { Button } from "../../components/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/Collapsible";
import { Separator } from "../../components/Separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/Sheet";
import { cn } from "../../lib/utils";
import type { NavItem, NavSection } from "./AppSidebar";

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const ChevronDownIcon = () => (
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
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const DrawerNavItem = ({ item }: { item: NavItem }) => {
  const [open, setOpen] = React.useState(false);

  const itemClass = cn(
    "flex w-full items-center gap-3 rounded-[--la-radius] px-3 py-2.5 text-sm font-medium transition-colors",
    "text-[hsl(var(--la-foreground))]",
    "hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))]",
    item.isActive &&
      "bg-[hsl(var(--la-accent))] text-[hsl(var(--la-accent-foreground))]",
  );

  if (item.children && item.children.length > 0) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button className={itemClass}>
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span className="flex-1 truncate text-left">{item.label}</span>
            <span
              className={cn(
                "ml-auto shrink-0 transition-transform duration-200",
                open && "rotate-180",
              )}
            >
              <ChevronDownIcon />
            </span>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-[hsl(var(--la-border))] pl-3">
            {item.children.map((child) => (
              <DrawerNavItem key={child.label} item={child} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <a
      href={item.href ?? "#"}
      className={itemClass}
      aria-current={item.isActive ? "page" : undefined}
    >
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      <span className="truncate">{item.label}</span>
    </a>
  );
};

export interface MobileNavDrawerProps {
  sections?: NavSection[];
  logo?: React.ReactNode;
  title?: string;
  user?: {
    name: string;
    email?: string;
    avatarSrc?: string;
    avatarFallback?: string;
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerClassName?: string;
}

const MobileNavDrawer = ({
  sections = [],
  logo,
  title = "Navigation",
  user,
  open,
  onOpenChange,
  triggerClassName,
}: MobileNavDrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
          className={cn("md:hidden", triggerClassName)}
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-[280px] flex-col gap-0 p-0 sm:max-w-[280px]"
      >
        <SheetHeader className="border-b border-[hsl(var(--la-border))] p-4">
          <SheetTitle asChild>
            <div className="flex items-center gap-2">
              {logo ? (
                <div className="flex items-center gap-2 font-semibold text-[hsl(var(--la-foreground))]">
                  {logo}
                </div>
              ) : (
                <span className="text-base font-semibold text-[hsl(var(--la-foreground))]">
                  {title}
                </span>
              )}
            </div>
          </SheetTitle>
        </SheetHeader>

        <nav
          className="flex flex-1 flex-col gap-1 overflow-y-auto p-3"
          aria-label="Main navigation"
        >
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              {section.title && (
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--la-muted-foreground))]">
                  {section.title}
                </p>
              )}
              {section.items.map((item) => (
                <DrawerNavItem key={item.label} item={item} />
              ))}
              {idx < sections.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
        </nav>

        {user && (
          <>
            <Separator />
            <div className="flex items-center gap-3 p-4">
              <Avatar size="sm">
                <AvatarImage src={user.avatarSrc} alt={user.name} />
                <AvatarFallback>
                  {user.avatarFallback ?? user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[hsl(var(--la-foreground))]">
                  {user.name}
                </p>
                {user.email && (
                  <p className="truncate text-xs text-[hsl(var(--la-muted-foreground))]">
                    {user.email}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

MobileNavDrawer.displayName = "MobileNavDrawer";

export type { NavItem, NavSection };
export { MobileNavDrawer };
