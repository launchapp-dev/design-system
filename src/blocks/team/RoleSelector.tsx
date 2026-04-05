import * as React from "react";
import { cn } from "../../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "../../components/Form";
import { Shield } from "lucide-react";

export type Role = "owner" | "admin" | "member" | "billing";

export interface RoleSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
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
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <FormField name="role">
          <FormItem>
            <FormLabel>Role</FormLabel>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>{role.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </FormItem>
        </FormField>
      </Select>

      {description && (
        <FormField name="role-description">
          <FormDescription>{description}</FormDescription>
        </FormField>
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
export type { RoleSelectorProps, Role };
