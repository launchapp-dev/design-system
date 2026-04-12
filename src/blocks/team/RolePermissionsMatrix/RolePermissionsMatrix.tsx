import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { ScrollArea } from "@/components/ScrollArea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";

export type PermissionLevel = "none" | "limited" | "full";

export interface PermissionEntry {
  permissionId: string;
  label: string;
  description?: string;
  category: string;
  level: PermissionLevel;
}

export interface RoleSummary {
  id: string;
  name: string;
  color?: string;
  permissionCount: number;
  categoryBreakdown: Record<string, number>;
  highestPermission: PermissionLevel;
}

export interface RolePermissionsMatrixProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  roles: RoleSummary[];
  permissions: PermissionEntry[];
  onExport?: (format: "csv" | "json") => void;
  onRoleClick?: (roleId: string) => void;
  title?: string;
  showDescriptions?: boolean;
}

const levelColors: Record<PermissionLevel, string> = {
  none: "bg-muted",
  limited: "bg-warning/10 dark:bg-warning/10",
  full: "bg-success dark:bg-success",
};

const levelLabel: Record<PermissionLevel, string> = {
  none: "None",
  limited: "Limited",
  full: "Full",
};

const levelTextColors: Record<PermissionLevel, string> = {
  none: "text-muted-foreground",
  limited: "text-warning dark:text-warning",
  full: "text-success dark:dark:text-success",
};

function RoleCard({
  role,
  onClick,
}: {
  role: RoleSummary;
  onClick?: () => void;
}) {
  const totalPerms = Object.values(role.categoryBreakdown).reduce((a, b) => a + b, 0);
  const categories = Object.entries(role.categoryBreakdown);

  return (
    <Card
      className={cn(
        "cursor-pointer transition-shadow hover:shadow-md",
        onClick && "hover:border-primary/50"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">{role.name}</CardTitle>
          <Badge
            variant="secondary"
            className={cn("text-[10px]", levelTextColors[role.highestPermission])}
          >
            {levelLabel[role.highestPermission]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{totalPerms} permissions</span>
        </div>
        {categories.slice(0, 3).map(([cat, count]) => (
          <div key={cat} className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{cat}</span>
            <span className="font-medium">{count}</span>
          </div>
        ))}
        {categories.length > 3 && (
          <p className="text-[10px] text-muted-foreground">
            +{categories.length - 3} more categories
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function RolePermissionsMatrix({
  roles,
  permissions,
  onExport,
  onRoleClick,
  title = "Role Permissions Overview",
  showDescriptions = true,
  className,
  ...props
}: RolePermissionsMatrixProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    for (const p of permissions) cats.add(p.category);
    return Array.from(cats).sort();
  }, [permissions]);

  const filteredPermissions = selectedCategory
    ? permissions.filter((p) => p.category === selectedCategory)
    : permissions;

  const permissionMatrix = React.useMemo(() => {
    const matrix: Record<string, Record<string, PermissionLevel>> = {};
    for (const role of roles) {
      matrix[role.id] = {};
    }
    for (const perm of permissions) {
      for (const role of roles) {
        const count = role.categoryBreakdown[perm.category] ?? 0;
        if (count === 0) {
          matrix[role.id][perm.permissionId] = "none";
        } else if (count >= 3) {
          matrix[role.id][perm.permissionId] = "full";
        } else {
          matrix[role.id][perm.permissionId] = "limited";
        }
      }
    }
    return matrix;
  }, [roles, permissions]);

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <Button
                size="sm"
                variant={selectedCategory === null ? "default" : "outline"}
                className="h-7 text-xs"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className="h-7 text-xs"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          )}
          {onExport && (
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs"
                onClick={() => onExport("csv")}
              >
                Export CSV
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs"
                onClick={() => onExport("json")}
              >
                Export JSON
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Roles ({roles.length})
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {roles.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                onClick={onRoleClick ? () => onRoleClick(role.id) : undefined}
              />
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border">
          <ScrollArea className="w-full">
            <table className="w-full border-collapse text-sm" style={{ minWidth: 400 }}>
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 min-w-[160px] border-b bg-background p-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Permission
                  </th>
                  {roles.map((role) => (
                    <th
                      key={role.id}
                      className="min-w-[100px] border-b border-l bg-background p-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {role.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(selectedCategory ? filteredPermissions : permissions).map((perm) => (
                  <tr key={perm.permissionId} className="hover:bg-muted/20">
                    <td className="sticky left-0 z-10 border-b bg-background px-3 py-2">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium">{perm.label}</span>
                        {showDescriptions && perm.description && (
                          <span className="text-[10px] text-muted-foreground line-clamp-1">
                            {perm.description}
                          </span>
                        )}
                      </div>
                    </td>
                    {roles.map((role) => {
                      const level = permissionMatrix[role.id]?.[perm.permissionId] ?? "none";
                      return (
                        <td
                          key={role.id}
                          className={cn(
                            "border-b border-l bg-background p-0 text-center align-middle",
                            "h-10"
                          )}
                        >
                          <div
                            className={cn(
                              "mx-auto h-2 w-16 rounded-full",
                              levelColors[level]
                            )}
                            aria-label={`${role.name}: ${perm.label} — ${levelLabel[level]}`}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        {(["full", "limited", "none"] as PermissionLevel[]).map((level) => (
          <div key={level} className="flex items-center gap-1.5">
            <div className={cn("h-2 w-16 rounded-full", levelColors[level])} />
            <span>{levelLabel[level]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

RolePermissionsMatrix.displayName = "RolePermissionsMatrix";
