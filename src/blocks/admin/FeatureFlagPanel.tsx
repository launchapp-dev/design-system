import type * as React from "react";
import { cn } from "../../lib/utils";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Card";
import { Input } from "../../components/Input";
import { Switch } from "../../components/Switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/Dialog";

// ── Icons (inline SVG to avoid lucide-react dep) ─────────────────────────────
function FlagIcon({ className }: { className?: string }) {
  return (
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
      className={className}
      aria-hidden="true"
    >
      <path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-7.333-2q-2 0-3.067.8A1 1 0 0 1 4 16" />
      <path d="M4 10h12" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
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
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
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
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function Trash2Icon({ className }: { className?: string }) {
  return (
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
      className={className}
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
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
      className={className}
      aria-hidden="true"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

export type FeatureFlagEnvironment = "development" | "staging" | "production";

export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description?: string;
  environments: Record<FeatureFlagEnvironment, boolean>;
  createdAt: string;
  updatedAt: string;
  owner?: string;
}

export interface FeatureFlagPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  flags: FeatureFlag[];
  onToggle: (flag: FeatureFlag, environment: FeatureFlagEnvironment, enabled: boolean) => void;
  onCreate?: (flag: Omit<FeatureFlag, "id" | "createdAt" | "updatedAt">) => void;
  onDelete?: (flag: FeatureFlag) => void;
  onEdit?: (flag: FeatureFlag) => void;
  title?: string;
  description?: string;
  showCreateButton?: boolean;
}

const environmentConfig: Record<FeatureFlagEnvironment, { label: string; color: string }> = {
  development: { label: "Dev", color: "bg-slate-500" },
  staging: { label: "Staging", color: "bg-amber-500" },
  production: { label: "Prod", color: "bg-emerald-500" },
};

function FeatureFlagPanel({
  flags,
  onToggle,
  onCreate,
  onDelete,
  onEdit,
  title = "Feature Flags",
  description = "Manage feature flags across environments",
  showCreateButton = true,
  className,
  ...props
}: FeatureFlagPanelProps) {
  const [search, setSearch] = React.useState("");
  const [selectedEnv, setSelectedEnv] = React.useState<FeatureFlagEnvironment | "all">("all");
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [newFlag, setNewFlag] = React.useState({
    key: "",
    name: "",
    description: "",
    environments: {
      development: false,
      staging: false,
      production: false,
    } as Record<FeatureFlagEnvironment, boolean>,
  });

  const filteredFlags = React.useMemo(() => {
    return flags.filter((flag) => {
      const matchesSearch = flag.name.toLowerCase().includes(search.toLowerCase()) ||
        flag.key.toLowerCase().includes(search.toLowerCase()) ||
        (flag.description?.toLowerCase().includes(search.toLowerCase()) ?? false);
      return matchesSearch;
    });
  }, [flags, search]);

  const handleCreate = () => {
    if (onCreate && newFlag.key && newFlag.name) {
      onCreate(newFlag);
      setNewFlag({
        key: "",
        name: "",
        description: "",
        environments: { development: false, staging: false, production: false },
      });
      setIsCreateOpen(false);
    }
  };

  return (
    <div className={cn("space-y-6", className)} {...props}>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <FlagIcon className="h-6 w-6 text-muted-foreground" />
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
        </div>
        {showCreateButton && onCreate && (
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                New Flag
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Feature Flag</DialogTitle>
                <DialogDescription>Add a new feature flag to control rollouts</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Key</label>
                  <Input
                    placeholder="e.g., new-dashboard"
                    value={newFlag.key}
                    onChange={(e) => setNewFlag({ ...newFlag, key: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    placeholder="e.g., New Dashboard"
                    value={newFlag.name}
                    onChange={(e) => setNewFlag({ ...newFlag, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    placeholder="Brief description of the feature"
                    value={newFlag.description}
                    onChange={(e) => setNewFlag({ ...newFlag, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default Environments</label>
                  <div className="flex gap-4">
                    {(Object.keys(environmentConfig) as FeatureFlagEnvironment[]).map((env) => (
                      <label key={env} className="flex items-center gap-2">
                        <Switch
                          checked={newFlag.environments[env]}
                          onCheckedChange={(checked) =>
                            setNewFlag({
                              ...newFlag,
                              environments: { ...newFlag.environments, [env]: checked },
                            })
                          }
                        />
                        <span className="text-sm capitalize">{env}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button onClick={handleCreate} disabled={!newFlag.key || !newFlag.name}>
                  Create Flag
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search flags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedEnv} onValueChange={(v) => setSelectedEnv(v as FeatureFlagEnvironment | "all")}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter by env" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Environments</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="staging">Staging</SelectItem>
            <SelectItem value="production">Production</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Flags List */}
      <div className="space-y-4">
        {filteredFlags.map((flag) => (
          <Card key={flag.id}>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{flag.name}</h3>
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{flag.key}</code>
                    </div>
                    {flag.description && (
                      <p className="text-sm text-muted-foreground mt-1">{flag.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>Updated {new Date(flag.updatedAt).toLocaleDateString()}</span>
                      {flag.owner && <span>• {flag.owner}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {onEdit && (
                      <Button variant="ghost" size="icon" onClick={() => onEdit(flag)}>
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button variant="ghost" size="icon" onClick={() => onDelete(flag)} className="text-destructive">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-6">
                  {(Object.keys(environmentConfig) as FeatureFlagEnvironment[]).map((env) => (
                    <div key={env} className="flex items-center gap-3">
                      <div className={cn("h-2 w-2 rounded-full", environmentConfig[env].color)} />
                      <span className="text-sm capitalize">{env}</span>
                      <Switch
                        checked={flag.environments[env]}
                        onCheckedChange={(checked) => onToggle(flag, env, checked)}
                        aria-label={`Toggle ${flag.name} for ${env}`}
                      />
                      <Badge variant={flag.environments[env] ? "default" : "outline"} className="text-xs">
                        {flag.environments[env] ? "On" : "Off"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFlags.length === 0 && (
        <div className="text-center py-12">
          <FlagIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No flags found</h3>
          <p className="text-muted-foreground">Try adjusting your search or create a new flag</p>
        </div>
      )}
    </div>
  );
}

FeatureFlagPanel.displayName = "FeatureFlagPanel";

export { FeatureFlagPanel };
