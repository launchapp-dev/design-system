import type * as React from "react";
import { cn } from "../../lib/utils";
import {
  SelectRoot as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";
import { Label } from "../../components/Label";

// ── Icons (inline SVG to avoid lucide-react dep in block layer) ──────────────
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export type Role = "owner" | "admin" | "member" | "billing";

export interface RoleSelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: Role;
  onChange?: (role: Role) => void;
  disabled?: boolean;
  description?: string;
}

const ROLES: { value: Role; label: string; description: string }[] = [
  {
    value: "admin",
    label: "Admin",
    description: "Can manage team members and settings, but cannot delete the workspace.",
  },
  {
    value: "member",
    label: "Member",
    description: "Can view and edit content they're given access to.",
  },
  {
    value: "billing",
    label: "Billing",
    description: "Can manage billing and subscriptions, but cannot manage team.",
  },
];

function RoleSelector({
  value,
  onChange,
  disabled,
  description,
  className,
  ...props
}: RoleSelectorProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="space-y-2">
        <Label htmlFor="role-select">Role</Label>
        <Select value={value} onValueChange={onChange as (v: string) => void} disabled={disabled}>
          <SelectTrigger id="role-select">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                <div className="flex items-center gap-2">
                  <ShieldIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{role.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {value && (
        <div className="rounded-lg border p-3">
          <p className="text-sm">
            {ROLES.find((r) => r.value === value)?.description}
          </p>
        </div>
      )}
    </div>
  );
}

RoleSelector.displayName = "RoleSelector";

export { RoleSelector };
