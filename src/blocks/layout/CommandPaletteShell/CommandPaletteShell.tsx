import * as React from "react";
import { DialogRoot, DialogContent } from "@/components/Dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/Command";
import { cn } from "@/lib/utils";

export interface CommandPaletteAction {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  category?: string;
  onSelect: () => void;
  disabled?: boolean;
  badge?: string | number;
}

export interface CommandPaletteGroup {
  label: string;
  actions: CommandPaletteAction[];
}

export interface CommandPaletteShellProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups?: CommandPaletteGroup[];
  placeholder?: string;
  emptyMessage?: string;
  children?: React.ReactNode;
}

const CommandPaletteShell = React.forwardRef<HTMLDivElement, CommandPaletteShellProps>(
  (
    {
      open,
      onOpenChange,
      groups = [],
      placeholder = "Search commands...",
      emptyMessage = "No results found.",
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <DialogRoot open={open} onOpenChange={onOpenChange}>
        <DialogContent ref={ref} className={cn("overflow-hidden p-0", className)} {...props}>
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.actions.map((action) => (
                    <CommandItem
                      key={action.id}
                      onSelect={action.onSelect}
                      disabled={action.disabled}
                      className="flex items-center gap-2"
                    >
                      {action.icon && (
                        <span className="flex-shrink-0" aria-hidden="true">
                          {action.icon}
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="block truncate text-sm">{action.label}</span>
                        {action.description && (
                          <span className="block truncate text-xs text-muted-foreground">
                            {action.description}
                          </span>
                        )}
                      </div>
                      {action.badge !== undefined && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-xs">
                          {action.badge}
                        </span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
              {children}
            </CommandList>
          </Command>
        </DialogContent>
      </DialogRoot>
    );
  },
);
CommandPaletteShell.displayName = "CommandPaletteShell";

export { CommandPaletteShell };