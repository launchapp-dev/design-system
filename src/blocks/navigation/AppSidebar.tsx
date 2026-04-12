import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/Button";
import { Separator } from "../../components/Separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../components/Collapsible";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/Avatar";

const ChevronLeftIcon = () => (
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
    aria-hidden="true"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
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
    aria-hidden="true"
  >
    <path d="m9 18 6-6-6-6" />
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

export interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  children?: NavItem[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface AppSidebarProps extends React.HTMLAttributes<HTMLElement> {
  sections?: NavSection[];
  logo?: React.ReactNode;
  user?: {
    name: string;
    email?: string;
    avatarSrc?: string;
    avatarFallback?: string;
  };
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

interface SidebarNavItemProps {
  item: NavItem;
  collapsed: boolean;
}

const SidebarNavItem = ({ item, collapsed }: SidebarNavItemProps) => {
  const [open, setOpen] = React.useState(false);

  const itemClass = cn(
    "flex w-full items-center gap-3 rounded-[--la-radius] px-3 py-2 text-sm font-medium transition-colors",
    "text-foreground",
    "hover:bg-accent hover:text-accent-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
    item.isActive && "bg-accent text-accent-foreground",
    collapsed && "justify-center px-2",
  );

  if (item.children && item.children.length > 0) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button className={itemClass} title={collapsed ? item.label : undefined}>
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            {!collapsed && (
              <>
                <span className="flex-1 truncate text-left">{item.label}</span>
                <span
                  className={cn(
                    "ml-auto shrink-0 transition-transform duration-200",
                    open && "rotate-180",
                  )}
                >
                  <ChevronDownIcon />
                </span>
              </>
            )}
          </button>
        </CollapsibleTrigger>
        {!collapsed && (
          <CollapsibleContent>
            <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-border pl-3">
              {item.children.map((child) => (
                <SidebarNavItem key={child.label} item={child} collapsed={false} />
              ))}
            </div>
          </CollapsibleContent>
        )}
      </Collapsible>
    );
  }

  return (
    <a
      href={item.href ?? "#"}
      className={itemClass}
      aria-current={item.isActive ? "page" : undefined}
      title={collapsed ? item.label : undefined}
    >
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      {!collapsed && <span className="truncate">{item.label}</span>}
    </a>
  );
};

function AppSidebar({
  className,
  sections = [],
  logo,
  user,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  ref,
  ...props
}: AppSidebarProps & { ref?: React.Ref<HTMLElement> }) {
  const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed);
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const handleToggle = () => {
    const next = !collapsed;
    setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  return (
    <aside
      ref={ref}
      className={cn(
        "flex h-full flex-col border-r border-border bg-background transition-[width] duration-300 ease-in-out",
        collapsed ? "w-[60px]" : "w-[240px]",
        className,
      )}
      {...props}
    >
      <div
        className={cn("flex items-center p-3", collapsed ? "justify-center" : "justify-between")}
      >
        {!collapsed && logo && (
          <div className="flex items-center gap-2 font-semibold text-foreground">
            {logo}
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="shrink-0"
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </Button>
      </div>

      <Separator />

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2" aria-label="Main navigation">
        {sections.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            {!collapsed && section.title && (
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </p>
            )}
            {section.items.map((item) => (
              <SidebarNavItem key={item.label} item={item} collapsed={collapsed} />
            ))}
            {idx < sections.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </nav>

      {user && (
        <>
          <Separator />
          <div className={cn("flex items-center gap-3 p-3", collapsed && "justify-center")}>
            <Avatar size="sm">
              <AvatarImage src={user.avatarSrc} alt={user.name} />
              <AvatarFallback>
                {user.avatarFallback ?? user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {user.name}
                </p>
                {user.email && (
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </aside>
  );
}

AppSidebar.displayName = "AppSidebar";

export { AppSidebar };
