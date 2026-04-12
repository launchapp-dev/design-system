import * as React from "react";
import { cn } from "../../lib/utils";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Card";
import { Input } from "../../components/Input";
import { Switch } from "../../components/Switch";

// ── Icons (inline SVG to avoid lucide-react dep) ─────────────────────────────
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

function SettingsIcon({ className }: { className?: string }) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function PuzzleIcon({ className }: { className?: string }) {
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
      <path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.684a1 1 0 0 1-1.414 1.414l-1.684-1.683a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.014 1 1 0 0 0 .474-1.68l-1.683-1.684a1 1 0 1 1 1.414-1.414l1.684 1.683z" />
      <path d="M12.007 2.001a9.997 9.997 0 1 0 9.995 9.996 1 1 0 0 0-2 0 8.001 8.001 0 1 1-8.004-8.004 1 1 0 0 0 .009-1.992z" />
    </svg>
  );
}

export type IntegrationStatus = "installed" | "not_installed" | "update_available" | "error";
export type IntegrationCategory = "analytics" | "communication" | "crm" | "developer" | "marketing" | "payment" | "storage";

export interface Integration {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  icon?: React.ReactNode;
  category: IntegrationCategory;
  status: IntegrationStatus;
  version?: string;
  latestVersion?: string;
  isEnabled?: boolean;
  installedAt?: string;
}

export interface IntegrationMarketplaceProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  integrations: Integration[];
  onInstall: (integration: Integration) => void;
  onConfigure: (integration: Integration) => void;
  onUninstall: (integration: Integration) => void;
  onToggle: (integration: Integration, enabled: boolean) => void;
  onUpdate?: (integration: Integration) => void;
  title?: string;
  description?: string;
  showSearch?: boolean;
  showCategories?: boolean;
}

const categoryConfig: Record<IntegrationCategory, { label: string; color: string }> = {
  analytics: { label: "Analytics", color: "bg-info/10 text-info border-info/20" },
  communication: { label: "Communication", color: "bg-primary/10 text-primary border-primary/20" },
  crm: { label: "CRM", color: "bg-success/10 text-success border-success/20" },
  developer: { label: "Developer", color: "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20" },
  marketing: { label: "Marketing", color: "bg-pink-500/10 text-pink-600 border-pink-500/20" },
  payment: { label: "Payment", color: "bg-warning/10 text-warning border-warning/20" },
  storage: { label: "Storage", color: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20" },
};

const statusConfig: Record<IntegrationStatus, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  installed: { label: "Installed", variant: "default" },
  not_installed: { label: "Not Installed", variant: "outline" },
  update_available: { label: "Update Available", variant: "secondary" },
  error: { label: "Error", variant: "destructive" },
};

function IntegrationMarketplace({
  integrations,
  onInstall,
  onConfigure,
  onUninstall,
  onToggle,
  onUpdate,
  title = "Integrations",
  description = "Connect your favorite tools and services",
  showSearch = true,
  showCategories = true,
  className,
  ...props
}: IntegrationMarketplaceProps) {
  const [search, setSearch] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<IntegrationCategory | "all">("all");

  const categories = React.useMemo(() => {
    const cats = new Set(integrations.map((i) => i.category));
    return Array.from(cats);
  }, [integrations]);

  const filteredIntegrations = React.useMemo(() => {
    return integrations.filter((integration) => {
      const matchesSearch = integration.name.toLowerCase().includes(search.toLowerCase()) ||
        integration.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [integrations, search, selectedCategory]);

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <PuzzleIcon className="h-6 w-6 text-muted-foreground" />
            {title}
          </h2>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
        {showSearch && (
          <div className="relative w-full sm:w-72">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search integrations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        )}
      </div>

      {showCategories && (
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory("all")}
          >
            All
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className={cn("cursor-pointer", selectedCategory === cat ? "" : categoryConfig[cat].color)}
              onClick={() => setSelectedCategory(cat)}
            >
              {categoryConfig[cat].label}
            </Badge>
          ))}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredIntegrations.map((integration) => {
          const status = statusConfig[integration.status];
          const category = categoryConfig[integration.category];

          return (
            <Card key={integration.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-muted">
                  {integration.icon || integration.iconUrl ? (
                    <img src={integration.iconUrl} alt="" className="h-8 w-8" />
                  ) : (
                    <PuzzleIcon className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base truncate">{integration.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{integration.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={category.color}>
                    {category.label}
                  </Badge>
                  <Badge variant={status.variant}>{status.label}</Badge>
                  {integration.version && (
                    <Badge variant="outline" className="text-xs">
                      v{integration.version}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-auto pt-2">
                  {integration.status === "installed" ? (
                    <>
                      {onToggle && (
                        <Switch
                          checked={integration.isEnabled ?? true}
                          onCheckedChange={(checked) => onToggle(integration, checked)}
                          aria-label={`Toggle ${integration.name}`}
                        />
                      )}
                      <Button variant="outline" size="sm" className="ml-auto" onClick={() => onConfigure(integration)}>
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                    </>
                  ) : integration.status === "update_available" && onUpdate ? (
                    <>
                      <Button variant="outline" size="sm" onClick={() => onConfigure(integration)}>
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                      <Button size="sm" onClick={() => onUpdate(integration)}>
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Update
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" className="w-full" onClick={() => onInstall(integration)}>
                      <CheckIcon className="mr-2 h-4 w-4" />
                      Install
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

IntegrationMarketplace.displayName = "IntegrationMarketplace";

export { IntegrationMarketplace };
