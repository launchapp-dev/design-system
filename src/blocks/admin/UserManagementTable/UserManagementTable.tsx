import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/Select";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/Dialog";
import { Label } from "@/components/Label";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "banned" | "pending";
  createdAt: string;
  lastActiveAt: string;
}

export interface UserManagementTableProps {
  users: User[];
  onBanUser?: (userId: string) => void;
  onUnbanUser?: (userId: string) => void;
  onDeleteUser?: (userId: string) => void;
  onEditUser?: (user: User) => void;
  onAddUser?: () => void;
  className?: string;
}

const roleColors: Record<User["role"], "default" | "secondary" | "outline"> = {
  admin: "default",
  editor: "secondary",
  viewer: "outline",
};

const statusColors: Record<User["status"], "default" | "destructive" | "secondary"> = {
  active: "default",
  banned: "destructive",
  pending: "secondary",
};

const roleLabel: Record<User["role"], string> = {
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
};

const statusLabel: Record<User["status"], string> = {
  active: "Active",
  banned: "Banned",
  pending: "Pending",
};

function UserManagementTableInner(
  {
    users,
    onBanUser,
    onUnbanUser,
    onDeleteUser,
    onEditUser,
    onAddUser,
    className,
  }: UserManagementTableProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [deleteTarget, setDeleteTarget] = React.useState<User | null>(null);

  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--la-muted))] text-xs font-medium">
              {row.original.name.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium">{row.original.name}</span>
          </div>
        ),
      },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <Badge variant={roleColors[row.original.role]}>
            {roleLabel[row.original.role]}
          </Badge>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={statusColors[row.original.status]}>
            {statusLabel[row.original.status]}
          </Badge>
        ),
      },
      { accessorKey: "createdAt", header: "Created" },
      { accessorKey: "lastActiveAt", header: "Last Active" },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center gap-1 justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditUser?.(row.original)}
              className="h-8 px-2 text-xs"
            >
              Edit
            </Button>
            {row.original.status === "banned" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUnbanUser?.(row.original.id)}
                className="h-8 px-2 text-xs"
              >
                Unban
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBanUser?.(row.original.id)}
                className="h-8 px-2 text-xs"
              >
                Ban
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeleteTarget(row.original)}
              className="h-8 px-2 text-xs text-destructive hover:text-destructive"
            >
              Delete
            </Button>
          </div>
        ),
        enableSorting: false,
      },
    ],
    [onEditUser, onBanUser, onUnbanUser]
  );

  return (
    <div ref={ref} className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Users</h2>
          <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
            {users.length} total user{users.length !== 1 ? "s" : ""}
          </p>
        </div>
        {onAddUser && (
          <Button onClick={onAddUser} size="sm">
            Add User
          </Button>
        )}
      </div>

      <DataTable columns={columns} data={users} pageSize={10} />

      <DialogRoot open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
            Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteTarget) onDeleteUser?.(deleteTarget.id);
                setDeleteTarget(null);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </div>
  );
}

export const UserManagementTable = React.forwardRef(UserManagementTableInner) as (
  props: UserManagementTableProps & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

(UserManagementTable as React.ForwardRefExoticComponent<UserManagementTableProps>).displayName = "UserManagementTable";
