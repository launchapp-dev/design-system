import type * as React from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/Command";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";

export interface CommandPaletteItem {
  id: string;
  label: string;
  description?: string;
  category?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  action?: () => void;
  href?: string;
  disabled?: boolean;
}

export interface CommandPaletteGroup {
  id: string;
  label: string;
  items: CommandPaletteItem[];
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups?: CommandPaletteGroup[];
  recentItems?: CommandPaletteItem[];
  placeholder?: string;
  emptyText?: string;
  maxRecent?: number;
  className?: string;
}

function CommandPalette({
  open,
  onOpenChange,
  groups = [],
  recentItems = [],
  placeholder = "Type a command or search...",
  emptyText = "No results found.",
  maxRecent = 5,
  className,
}: CommandPaletteProps) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} className={cn("", className)}>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>{emptyText}</CommandEmpty>
        {recentItems.length > 0 && (
          <>
            <CommandGroup heading="Recent">
              {recentItems.slice(0, maxRecent).map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={item.action}
                  disabled={item.disabled}
                  className="gap-2"
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.shortcut && (
                    <Badge variant="outline" className="text-[10px] h-5">
                      {item.shortcut}
                    </Badge>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}
        {groups.map((group) => (
          <CommandGroup key={group.id} heading={group.label}>
            {group.items.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={item.action}
                disabled={item.disabled}
                className="gap-2"
              >
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span className="flex-1 truncate">{item.label}</span>
                {item.description && (
                  <span className="text-xs text-muted-foreground truncate">{item.description}</span>
                )}
                {item.shortcut && (
                  <Badge variant="outline" className="text-[10px] h-5 shrink-0">
                    {item.shortcut}
                  </Badge>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

CommandPalette.displayName = "CommandPalette";

export { CommandPalette };
export type { CommandPaletteItem, CommandPaletteGroup, CommandPaletteProps };