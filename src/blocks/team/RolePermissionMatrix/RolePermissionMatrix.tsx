import * as React from "react";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { ScrollArea } from "@/components/ScrollArea";
import { Separator } from "@/components/Separator";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";

export type Permission = "read" | "write" | "delete" | "admin";

export type PermissionCategory =
  | "Content"
  | "Users"
  | "Billing"
  | "Integrations"
  | "Security"
  | "Settings";

export interface Role {
  id: string;
  name: string;
  description: string;
  color?: string;
  permissions: Record<string, Permission[]>;
  isSystem?: boolean;
}

export interface RolePermissionMatrixProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  roles: Role[];
  permissionCategories: PermissionCategory[];
  permissionMap: Record<string, string[]>;
  onPermissionChange?: (roleId: string, permissionId: string, granted: boolean) => void;
  onRoleEdit?: (role: Role) => void;
  onRoleAdd?: () => void;
  canManage?: boolean;
  title?: string;
}

const permissionLabels: Record<string, string> = {
  "content.view": "View Content",
  "content.create": "Create Content",
  "content.edit": "Edit Content",
  "content.delete": "Delete Content",
  "users.view": "View Users",
  "users.invite": "Invite Users",
  "users.manage": "Manage Users",
  "users.remove": "Remove Users",
  "billing.view": "View Billing",
  "billing.manage": "Manage Billing",
  "integrations.view": "View Integrations",
  "integrations.connect": "Connect Integrations",
  "integrations.manage": "Manage Integrations",
  "security.view": "View Audit Logs",
  "security.export": "Export Audit Logs",
  "settings.view": "View Settings",
  "settings.manage": "Manage Settings",
};

const CheckAllIcon = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const DashIcon = () => (
  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4" y="11" width="16" height="2" rx="1" />
  </svg>
);

function getPermissionVariant(
  role: Role,
  permissionId: string
): "full" | "partial" | "none" {
  const perms = role.permissions[permissionId];
  if (!perms || perms.length === 0) return "none";
  return perms.length >= 2 ? "full" : "partial";
}

function hasPermission(role: Role, permissionId: string): boolean {
  return (role.permissions[permissionId]?.length ?? 0) > 0;
}

const roleColors: Record<string, string> = {
  owner: "bg-primary text-primary dark:bg-primary/30 dark:text-primary",
  admin: "bg-info text-info-foreground dark:bg-info/30 dark:text-info",
  member: "bg-success/10 text-success dark:bg-success/30 dark:text-success",
  guest: "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground",
  default: "bg-muted text-muted-foreground",
};

function RolePermissionMatrix({
  roles,
  permissionCategories,
  permissionMap,
  onPermissionChange,
  onRoleEdit,
  onRoleAdd,
  canManage = true,
  title = "Role Permissions",
  className,
  ...props
}: RolePermissionMatrixProps) {
  const allPermissions = React.useMemo(() => {
    const perms: string[] = [];
    for (const category of permissionCategories) {
      const catPerms = permissionMap[category] ?? [];
      perms.push(...catPerms);
    }
    return perms;
  }, [permissionCategories, permissionMap]);

  function togglePermission(roleId: string, permissionId: string, current: boolean) {
    onPermissionChange?.(roleId, permissionId, !current);
  }

  function toggleCategoryForRole(role: Role, category: PermissionCategory, granted: boolean) {
    const catPerms = permissionMap[category] ?? [];
    catPerms.forEach((p) => onPermissionChange?.(role.id, p, granted));
  }

  const groupedPermissions = React.useMemo(() => {
    const groups: Record<PermissionCategory, string[]> = {} as Record<PermissionCategory, string[]>;
    for (const category of permissionCategories) {
      groups[category] = permissionMap[category] ?? [];
    }
    return groups;
  }, [permissionCategories, permissionMap]);

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">{title}</h3>
        {canManage && onRoleAdd && (
          <Button size="sm" onClick={onRoleAdd}>
            Add Role
          </Button>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border">
        <div className="overflow-x-auto">
          <ScrollArea className="w-full">
            <table className="w-full border-collapse text-sm" style={{ minWidth: 600 }}>
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 min-w-[200px] border-b bg-background p-3 text-left font-semibold">
                    Role / Permission
                  </th>
                  {roles.map((role) => (
                    <th key={role.id} className="min-w-[120px] border-b border-l bg-background p-3 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-xs font-medium">{role.name}</span>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px]", roleColors[role.id] ?? roleColors.default)}
                        >
                          {role.isSystem ? "System" : "Custom"}
                        </Badge>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissionCategories.map((category) => (
                  <React.Fragment key={category}>
                    <tr className="bg-muted/40">
                      <td
                        colSpan={roles.length + 1}
                        className="sticky left-0 z-10 px-3 py-1.5 font-semibold text-xs uppercase tracking-wider text-muted-foreground"
                      >
                        {category}
                      </td>
                    </tr>
                    {(groupedPermissions[category] ?? []).map((permissionId) => (
                      <tr key={permissionId} className="hover:bg-muted/20">
                        <td className="sticky left-0 z-10 border-b bg-background px-3 py-2 text-sm text-muted-foreground">
                          {permissionLabels[permissionId] ?? permissionId}
                        </td>
                        {roles.map((role) => {
                          const granted = hasPermission(role, permissionId);
                          return (
                            <td
                              key={role.id}
                              className="border-b border-l bg-background p-0 text-center"
                            >
                              <button
                                type="button"
                                aria-label={`${role.name}: ${permissionLabels[permissionId] ?? permissionId} — ${granted ? "granted" : "not granted"}`}
                                aria-pressed={granted}
                                disabled={!canManage}
                                onClick={() => togglePermission(role.id, permissionId, granted)}
                                className={cn(
                                  "flex h-9 w-full items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                  canManage && "cursor-pointer hover:bg-muted",
                                  !canManage && "cursor-default",
                                  granted
                                    ? "text-success dark:dark:text-success"
                                    : "text-muted-foreground/40"
                                )}
                              >
                                {granted ? <CheckAllIcon /> : <DashIcon />}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <CheckAllIcon />
          <span>Has permission</span>
        </div>
        <div className="flex items-center gap-1.5">
          <DashIcon />
          <span>No permission</span>
        </div>
      </div>
    </div>
  );
}

RolePermissionMatrix.displayName = "RolePermissionMatrix";

export { RolePermissionMatrix };
