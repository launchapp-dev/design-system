import * as React from "react";
import { cn } from "@/lib/utils";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/Dialog";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { ScrollArea } from "@/components/ScrollArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { X } from "lucide-react";

export type InviteRole = "admin" | "member" | "viewer" | "guest";

export interface InviteRecipient {
  id: string;
  email: string;
  role: InviteRole;
}

export interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultRole?: InviteRole;
  maxRecipients?: number;
  sentCount?: number;
  onInvite: (recipients: InviteRecipient[]) => void;
  isLoading?: boolean;
  error?: string;
  title?: string;
  description?: string;
}

const roleLabels: Record<InviteRole, string> = {
  admin: "Admin",
  member: "Member",
  viewer: "Viewer",
  guest: "Guest",
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function InviteMemberDialog({
  open,
  onOpenChange,
  defaultRole = "member",
  maxRecipients,
  sentCount = 0,
  onInvite,
  isLoading,
  error,
  title = "Invite team members",
  description = "Enter email addresses and assign roles to invite people to your workspace.",
}: InviteMemberDialogProps) {
  const [recipients, setRecipients] = React.useState<InviteRecipient[]>([
    { id: "1", email: "", role: defaultRole },
  ]);
  const [emailErrors, setEmailErrors] = React.useState<Record<string, string>>({});
  const inputRef = React.useRef<HTMLInputElement>(null);

  const remainingSlots = maxRecipients !== undefined ? Math.max(0, maxRecipients - sentCount) : Infinity;
  const atLimit = remainingSlots <= 0;
  const canAddMore = recipients.length < remainingSlots || remainingSlots === Infinity;

  React.useEffect(() => {
    if (open) {
      setRecipients([{ id: "1", email: "", role: defaultRole }]);
      setEmailErrors({});
    }
  }, [open, defaultRole]);

  function addRecipient() {
    if (!canAddMore) return;
    setRecipients((prev) => [
      ...prev,
      { id: String(Date.now()), email: "", role: defaultRole },
    ]);
  }

  function removeRecipient(id: string) {
    setRecipients((prev) => {
      if (prev.length === 1) return prev;
      const next = prev.filter((r) => r.id !== id);
      return next;
    });
    setEmailErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function updateEmail(id: string, email: string) {
    setRecipients((prev) =>
      prev.map((r) => (r.id === id ? { ...r, email } : r))
    );
    if (emailErrors[id]) {
      setEmailErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  }

  function updateRole(id: string, role: InviteRole) {
    setRecipients((prev) =>
      prev.map((r) => (r.id === id ? { ...r, role } : r))
    );
  }

  function validate(): boolean {
    const errors: Record<string, string> = {};
    let hasValidEmail = false;
    for (const r of recipients) {
      const email = r.email.trim();
      if (!email) continue;
      hasValidEmail = true;
      if (!validateEmail(email)) {
        errors[r.id] = "Invalid email address";
      }
    }
    setEmailErrors(errors);
    return Object.keys(errors).length === 0 && hasValidEmail;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const valid = recipients.filter((r) => r.email.trim());
    if (valid.length === 0) return;
    onInvite(valid);
  }

  const validRecipients = recipients.filter((r) => r.email.trim());

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {atLimit && (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              You've reached your seat limit. Upgrade your plan to invite more members.
            </div>
          )}

          {error && (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Recipients
                {maxRecipients !== undefined && (
                  <span className="ml-2 text-muted-foreground">
                    ({validRecipients.length}
                    {remainingSlots !== Infinity && ` of ${remainingSlots}`} slots)
                  </span>
                )}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addRecipient}
                disabled={!canAddMore || atLimit}
                className="h-7 text-xs"
              >
                + Add another
              </Button>
            </div>

            <ScrollArea className="max-h-60">
              <div className="space-y-2 pr-3">
                {recipients.map((recipient, idx) => (
                  <div
                    key={recipient.id}
                    className="flex items-start gap-2 rounded-lg border bg-background p-2"
                  >
                    <div className="flex flex-1 flex-col gap-1.5">
                      <Input
                        ref={idx === 0 ? inputRef : undefined}
                        type="email"
                        placeholder="colleague@company.com"
                        value={recipient.email}
                        onChange={(e) => updateEmail(recipient.id, e.target.value)}
                        className={cn(
                          "h-8",
                          emailErrors[recipient.id] && "border-destructive"
                        )}
                        disabled={atLimit}
                      />
                      {emailErrors[recipient.id] && (
                        <p className="text-xs text-destructive">
                          {emailErrors[recipient.id]}
                        </p>
                      )}
                    </div>
                    <Select
                      value={recipient.role}
                      onValueChange={(v) => updateRole(recipient.id, v as InviteRole)}
                      disabled={atLimit}
                    >
                      <SelectTrigger className="h-8 w-32 shrink-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(roleLabels) as InviteRole[]).map((role) => (
                          <SelectItem key={role} value={role}>
                            <div className="flex flex-col">
                              <span className="text-sm">{roleLabels[role]}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {recipients.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() => removeRecipient(recipient.id)}
                        disabled={atLimit}
                        aria-label="Remove recipient"
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {validRecipients.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {validRecipients.map((r) => (
                <Badge key={r.id} variant="secondary" className="text-xs">
                  {r.email}{" "}
                  <span className="text-muted-foreground ml-0.5">
                    → {roleLabels[r.role]}
                  </span>
                </Badge>
              ))}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isLoading ||
                validRecipients.length === 0 ||
                Object.keys(emailErrors).length > 0
              }
            >
              {isLoading ? "Sending…" : `Send ${validRecipients.length > 0 ? `invites (${validRecipients.length})` : "invites"}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}

InviteMemberDialog.displayName = "InviteMemberDialog";

export { InviteMemberDialog };
