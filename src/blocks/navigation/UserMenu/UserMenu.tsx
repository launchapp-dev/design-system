import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/DropdownMenu";
import { Button } from "@/components/Button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";

export interface UserMenuItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string;
  disabled?: boolean;
  danger?: boolean;
  items?: UserMenuItem[];
}

export interface UserMenuSection {
  label?: string;
  items: UserMenuItem[];
}

export interface UserMenuProps extends React.HTMLAttributes<HTMLElement> {
  user: {
    name: string;
    email?: string;
    avatarSrc?: string;
    avatarFallback?: string;
    role?: string;
  };
  sections?: UserMenuSection[];
  trigger?: React.ReactNode;
  align?: "start" | "center" | "end";
}

const UserIcon = () => (
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
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsIcon = () => (
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
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CreditCardIcon = () => (
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
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const LogoutIcon = () => (
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
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

const KeyboardIcon = () => (
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
    <rect width="20" height="16" x="2" y="4" rx="2" ry="2" />
    <path d="M6 8h.001" />
    <path d="M10 8h.001" />
    <path d="M14 8h.001" />
    <path d="M18 8h.001" />
    <path d="M8 12h.001" />
    <path d="M12 12h.001" />
    <path d="M16 12h.001" />
    <path d="M7 16h10" />
  </svg>
);

function UserMenuInner({
  user,
  sections = [],
  trigger,
  align = "end",
  className,
  ref,
  ..._props
}: UserMenuProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const defaultSections: UserMenuSection[] = sections.length
    ? sections
    : [
        {
          items: [
            { label: "Profile", href: "/profile", icon: <UserIcon /> },
            { label: "Settings", href: "/settings", icon: <SettingsIcon /> },
            { label: "Billing", href: "/billing", icon: <CreditCardIcon /> },
          ],
        },
        {
          items: [
            { label: "Keyboard shortcuts", icon: <KeyboardIcon />, badge: "⌘" },
            { label: "Log out", icon: <LogoutIcon />, danger: true },
          ],
        },
      ];

  const defaultTrigger = (
    <Button
      variant="ghost"
      className="h-auto gap-2 px-2 py-1.5"
      aria-label={`User menu for ${user.name}`}
    >
      <Avatar size="sm">
        {user.avatarSrc && <AvatarImage src={user.avatarSrc} alt={user.name} />}
        <AvatarFallback>
          {user.avatarFallback ?? user.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="hidden md:flex flex-col items-start min-w-0">
        <span className="text-sm font-medium truncate max-w-[120px]">{user.name}</span>
        {user.email && (
          <span className="text-xs text-muted-foreground truncate max-w-[120px]">{user.email}</span>
        )}
      </div>
    </Button>
  );

  const renderItem = (item: UserMenuItem) => {
    if (item.items && item.items.length > 0) {
      return (
        <DropdownMenuSub key={item.label}>
          <DropdownMenuSubTrigger disabled={item.disabled}>
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {item.items.map((subItem) => (
              <DropdownMenuItem key={subItem.label} disabled={subItem.disabled}>
                {subItem.icon && <span className="mr-2">{subItem.icon}</span>}
                {subItem.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      );
    }

    return (
      <DropdownMenuItem
        key={item.label}
        disabled={item.disabled}
        className={cn(item.danger && "text-destructive focus:text-destructive")}
        onClick={item.onClick}
      >
        {item.icon && <span className="mr-2">{item.icon}</span>}
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <Badge variant="secondary" className="ml-2 text-xs">
            {item.badge}
          </Badge>
        )}
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild ref={ref}>
        {trigger ?? defaultTrigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            {user.email && <p className="text-xs text-muted-foreground">{user.email}</p>}
            {user.role && (
              <p className="text-xs text-muted-foreground">
                <Badge variant="secondary" className="mt-1">
                  {user.role}
                </Badge>
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {defaultSections.map((section, sIdx) => (
          <React.Fragment key={sIdx}>
            {section.label && sIdx > 0 && <DropdownMenuSeparator />}
            <DropdownMenuGroup>{section.items.map((item) => renderItem(item))}</DropdownMenuGroup>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

UserMenuInner.displayName = "UserMenu";

export const UserMenu = UserMenuInner;
