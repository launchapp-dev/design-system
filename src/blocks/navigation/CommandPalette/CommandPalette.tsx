import * as React from "react";
import { cn } from "../../../lib/utils";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "../../../components/Command";
import { Badge } from "../../../components/Badge";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CommandPaletteAction {
  id: string;
  label: string;
  /** Short description shown below the label */
  description?: string;
  /** Keyboard shortcut hint */
  shortcut?: string;
  /** Icon element */
  icon?: React.ReactNode;
  /** Badge label */
  badge?: string;
  /** Group key — must match a CommandPaletteGroup.id */
  group: string;
  /** Called when the item is selected */
  onSelect?: () => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Keywords for improved search matching (not shown in UI) */
  keywords?: string[];
}

export interface CommandPaletteGroup {
  id: string;
  label: string;
}

export interface CommandPaletteProps {
  /** Whether the palette is open */
  open: boolean;
  /** Called when the open state should change */
  onOpenChange: (open: boolean) => void;
  /** All available actions */
  actions: CommandPaletteAction[];
  /** Group definitions (order controls display order) */
  groups?: CommandPaletteGroup[];
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Text shown when no results found */
  emptyText?: string;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Called when the search query changes */
  onSearch?: (query: string) => void;
}

// ── Default groups fallback ───────────────────────────────────────────────────

function deriveGroups(actions: CommandPaletteAction[]): CommandPaletteGroup[] {
  const seen = new Set<string>();
  const groups: CommandPaletteGroup[] = [];
  for (const a of actions) {
    if (!seen.has(a.group)) {
      seen.add(a.group);
      groups.push({ id: a.group, label: a.group });
    }
  }
  return groups;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CommandPalette({
  open,
  onOpenChange,
  actions,
  groups,
  placeholder = "Search commands…",
  emptyText = "No results found.",
  footer,
  onSearch,
}: CommandPaletteProps) {
  const resolvedGroups = groups ?? deriveGroups(actions);

  const actionsByGroup = React.useMemo(() => {
    const map = new Map<string, CommandPaletteAction[]>();
    for (const g of resolvedGroups) {
      map.set(g.id, []);
    }
    for (const a of actions) {
      if (!map.has(a.group)) map.set(a.group, []);
      map.get(a.group)?.push(a);
    }
    return map;
  }, [actions, resolvedGroups]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={placeholder} onValueChange={onSearch} />
      <CommandList>
        <CommandEmpty>{emptyText}</CommandEmpty>
        {resolvedGroups.map((group, gi) => {
          const groupActions = actionsByGroup.get(group.id) ?? [];
          if (groupActions.length === 0) return null;
          return (
            <React.Fragment key={group.id}>
              {gi > 0 && <CommandSeparator />}
              <CommandGroup heading={group.label}>
                {groupActions.map((action) => (
                  <CommandItem
                    key={action.id}
                    value={[action.label, ...(action.keywords ?? [])].join(" ")}
                    disabled={action.disabled}
                    onSelect={() => {
                      action.onSelect?.();
                      onOpenChange(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    {action.icon && (
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground">
                        {action.icon}
                      </span>
                    )}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm">{action.label}</span>
                      {action.description && (
                        <span className="truncate text-xs text-muted-foreground">
                          {action.description}
                        </span>
                      )}
                    </div>
                    {action.badge && (
                      <Badge variant="secondary" className="ml-auto shrink-0 text-xs">
                        {action.badge}
                      </Badge>
                    )}
                    {action.shortcut && <CommandShortcut>{action.shortcut}</CommandShortcut>}
                  </CommandItem>
                ))}
              </CommandGroup>
            </React.Fragment>
          );
        })}
      </CommandList>
      {footer && (
        <div className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
          {footer}
        </div>
      )}
    </CommandDialog>
  );
}

// ── Trigger hook ──────────────────────────────────────────────────────────────

/**
 * useCommandPalette — manages open state and registers the ⌘K / Ctrl+K
 * keyboard shortcut globally.
 *
 * @example
 * const { open, setOpen } = useCommandPalette();
 * return <CommandPalette open={open} onOpenChange={setOpen} … />;
 */
export function useCommandPalette(defaultOpen = false) {
  const [open, setOpen] = React.useState(defaultOpen);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return { open, setOpen };
}

// ── Inline variant (not in a dialog) ─────────────────────────────────────────

export interface InlineCommandPaletteProps
  extends Omit<CommandPaletteProps, "open" | "onOpenChange"> {
  className?: string;
}

/**
 * InlineCommandPalette renders the command UI inline (no dialog/modal), useful
 * for embedding in a page or popover.
 */
export function InlineCommandPalette({
  actions,
  groups,
  placeholder = "Search…",
  emptyText = "No results found.",
  footer,
  onSearch,
  className,
}: InlineCommandPaletteProps) {
  const resolvedGroups = groups ?? deriveGroups(actions);

  const actionsByGroup = React.useMemo(() => {
    const map = new Map<string, CommandPaletteAction[]>();
    for (const g of resolvedGroups) {
      map.set(g.id, []);
    }
    for (const a of actions) {
      if (!map.has(a.group)) map.set(a.group, []);
      map.get(a.group)?.push(a);
    }
    return map;
  }, [actions, resolvedGroups]);

  return (
    <Command className={cn("rounded-lg border border-border shadow-md", className)}>
      <CommandInput placeholder={placeholder} onValueChange={onSearch} />
      <CommandList>
        <CommandEmpty>{emptyText}</CommandEmpty>
        {resolvedGroups.map((group, gi) => {
          const groupActions = actionsByGroup.get(group.id) ?? [];
          if (groupActions.length === 0) return null;
          return (
            <React.Fragment key={group.id}>
              {gi > 0 && <CommandSeparator />}
              <CommandGroup heading={group.label}>
                {groupActions.map((action) => (
                  <CommandItem
                    key={action.id}
                    value={[action.label, ...(action.keywords ?? [])].join(" ")}
                    disabled={action.disabled}
                    onSelect={action.onSelect}
                    className="flex items-center gap-2"
                  >
                    {action.icon && (
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground">
                        {action.icon}
                      </span>
                    )}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm">{action.label}</span>
                      {action.description && (
                        <span className="truncate text-xs text-muted-foreground">
                          {action.description}
                        </span>
                      )}
                    </div>
                    {action.badge && (
                      <Badge variant="secondary" className="ml-auto shrink-0 text-xs">
                        {action.badge}
                      </Badge>
                    )}
                    {action.shortcut && <CommandShortcut>{action.shortcut}</CommandShortcut>}
                  </CommandItem>
                ))}
              </CommandGroup>
            </React.Fragment>
          );
        })}
      </CommandList>
      {footer && (
        <div className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
          {footer}
        </div>
      )}
    </Command>
  );
}
