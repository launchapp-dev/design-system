import * as React from "react";
import { cn } from "../../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import { Building2, Plus, ChevronDown } from "lucide-react";

export interface Workspace {
  id: string;
  name: string;
  slug?: string;
  role?: string;
  avatarUrl?: string;
}

export interface WorkspaceSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
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
        <Building2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Workspaces</span>
      </div>

      <Select
        value={currentId}
        onValueChange={(id) => {
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
              <Plus className="mr-2 h-4 w-4" />
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
export type { WorkspaceSwitcherProps, Workspace };
