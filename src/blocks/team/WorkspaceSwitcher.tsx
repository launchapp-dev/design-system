import * as React from "react";
import { cn } from "../../lib/utils";
import {
  SelectRoot as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";

// ── Icons (inline SVG to avoid lucide-react dep in block layer) ──────────────
function Building2Icon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
    </svg>
  );
}
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14" /><path d="M12 5v14" />
    </svg>
  );
}

export interface Workspace {
  id: string;
  name: string;
  slug?: string;
  role?: string;
  avatarUrl?: string;
}

export interface WorkspaceSwitcherProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  workspaces: Workspace[];
  currentId?: string;
  onChange?: (workspace: Workspace) => void;
  onCreate?: () => void;
  onSettings?: (workspace: Workspace) => void;
  isLoading?: boolean;
}

function WorkspaceSwitcher({
  workspaces,
  currentId,
  onChange,
  onCreate,
  onSettings,
  isLoading,
  className,
  ...props
}: WorkspaceSwitcherProps) {
  const current = workspaces.find((w) => w.id === currentId);

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="flex items-center gap-2 flex-wrap">
        <Building2Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Workspaces</span>
      </div>

      <Select
        value={currentId}
        onValueChange={(id: string) => {
          const w = workspaces.find((x) => x.id === id);
          if (w) onChange?.(w);
        }}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full justify-between">
          <SelectValue>
            {current ? (
              <div className="flex items-center gap-2">
                <span className="font-medium">{current.name}</span>
                {current.role && (
                  <Badge variant="secondary" className="text-xs">
                    {current.role}
                  </Badge>
                )}
              </div>
            ) : (
              <span className="text-muted-foreground">Select workspace</span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {workspaces.map((workspace) => (
            <SelectItem key={workspace.id} value={workspace.id}>
              <div className="flex items-center gap-2">
                <span>{workspace.name}</span>
                {workspace.role && (
                  <Badge variant="outline" className="text-xs">
                    {workspace.role}
                  </Badge>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {(onCreate || onSettings) && (
        <div className="flex gap-2">
          {onCreate && (
            <Button variant="outline" size="sm" className="flex-1" onClick={onCreate}>
              <PlusIcon className="mr-2 h-4 w-4" />
              New workspace
            </Button>
          )}
          {onSettings && current && (
            <Button variant="ghost" size="sm" onClick={() => onSettings(current)}>
              Settings
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

WorkspaceSwitcher.displayName = "WorkspaceSwitcher";

export { WorkspaceSwitcher };
