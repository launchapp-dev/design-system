import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";

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
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export type IntegrationStatus = "connected" | "disconnected" | "error" | "pending";
export type IntegrationCategory =
  | "analytics"
  | "payments"
  | "crm"
  | "communication"
  | "storage"
  | "auth"
  | "other";

export interface IntegrationCard {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  logoInitial?: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  connectedAt?: string;
  isPremium?: boolean;
  isPopular?: boolean;
}

export interface IntegrationCardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  integrations: IntegrationCard[];
  onConnect?: (integration: IntegrationCard) => void;
  onDisconnect?: (integration: IntegrationCard) => void;
  onConfigure?: (integration: IntegrationCard) => void;
  searchable?: boolean;
  filterByCategory?: IntegrationCategory | "all";
  title?: string;
  description?: string;
}

const CATEGORY_LABELS: Record<IntegrationCategory, string> = {
  analytics: "Analytics",
  payments: "Payments",
  crm: "CRM",
  communication: "Communication",
  storage: "Storage",
  auth: "Auth",
  other: "Other",
};

const STATUS_CONFIG: Record<
  IntegrationStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  connected: { label: "Connected", variant: "outline" },
  disconnected: { label: "Not connected", variant: "secondary" },
  error: { label: "Error", variant: "destructive" },
  pending: { label: "Pending", variant: "default" },
};

function IntegrationLogoPlaceholder({
  initial,
  className,
}: {
  initial: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-base font-semibold uppercase text-muted-foreground",
        className,
      )}
      aria-hidden="true"
    >
      {initial.slice(0, 2)}
    </div>
  );
}

function IntegrationCardItem({
  integration,
  onConnect,
  onDisconnect,
  onConfigure,
}: {
  integration: IntegrationCard;
  onConnect?: (i: IntegrationCard) => void;
  onDisconnect?: (i: IntegrationCard) => void;
  onConfigure?: (i: IntegrationCard) => void;
}) {
  const { label, variant } = STATUS_CONFIG[integration.status];
  const isConnected = integration.status === "connected";

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          {integration.logoUrl ? (
            <img
              src={integration.logoUrl}
              alt={`${integration.name} logo`}
              className="h-10 w-10 rounded-lg object-contain"
            />
          ) : (
            <IntegrationLogoPlaceholder initial={integration.logoInitial ?? integration.name} />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <CardTitle className="text-sm">{integration.name}</CardTitle>
              {integration.isPremium && (
                <Badge variant="secondary" className="text-xs">
                  Premium
                </Badge>
              )}
              {integration.isPopular && (
                <Badge variant="outline" className="text-xs">
                  Popular
                </Badge>
              )}
            </div>
            <Badge variant={variant} className="mt-1 text-xs">
              {label}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <CardDescription className="text-xs leading-relaxed">
          {integration.description}
        </CardDescription>
        <Badge variant="secondary" className="mt-2 text-xs">
          {CATEGORY_LABELS[integration.category]}
        </Badge>
      </CardContent>
      <CardFooter className="gap-2 pt-0">
        {isConnected ? (
          <>
            {onConfigure && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onConfigure(integration)}
              >
                Configure
              </Button>
            )}
            {onDisconnect && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDisconnect(integration)}
                className="text-destructive hover:text-destructive"
              >
                Disconnect
              </Button>
            )}
          </>
        ) : (
          <Button
            size="sm"
            className="flex-1 gap-1.5"
            onClick={() => onConnect?.(integration)}
            disabled={integration.status === "pending"}
          >
            {integration.status === "pending" ? (
              "Connecting…"
            ) : (
              <>
                <CheckIcon className="h-3.5 w-3.5" />
                Connect
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

const ALL_CATEGORIES: Array<IntegrationCategory | "all"> = [
  "all",
  "analytics",
  "payments",
  "crm",
  "communication",
  "storage",
  "auth",
  "other",
];

function IntegrationCardGrid({
  integrations,
  onConnect,
  onDisconnect,
  onConfigure,
  searchable = true,
  filterByCategory: filterProp,
  title,
  description,
  className,
  ...props
}: IntegrationCardGridProps) {
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<IntegrationCategory | "all">(
    filterProp ?? "all",
  );

  const presentCategories = React.useMemo(() => {
    const cats = new Set(integrations.map((i) => i.category));
    return ALL_CATEGORIES.filter((c) => c === "all" || cats.has(c as IntegrationCategory));
  }, [integrations]);

  const filtered = React.useMemo(() => {
    return integrations.filter((i) => {
      if (activeCategory !== "all" && i.category !== activeCategory) return false;
      if (
        search &&
        !i.name.toLowerCase().includes(search.toLowerCase()) &&
        !i.description.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [integrations, activeCategory, search]);

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {(title || description) && (
        <div>
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {searchable && (
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search integrations…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        )}
        <div className="flex flex-wrap gap-1.5">
          {presentCategories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className="h-7 px-2.5 text-xs"
            >
              {cat === "all" ? "All" : CATEGORY_LABELS[cat as IntegrationCategory]}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed py-10 text-center text-sm text-muted-foreground">
          No integrations found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((integration) => (
            <IntegrationCardItem
              key={integration.id}
              integration={integration}
              onConnect={onConnect}
              onDisconnect={onDisconnect}
              onConfigure={onConfigure}
            />
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        {filtered.filter((i) => i.status === "connected").length} of {integrations.length}{" "}
        integrations connected
      </p>
    </div>
  );
}

IntegrationCardGrid.displayName = "IntegrationCardGrid";

export { IntegrationCardGrid };
