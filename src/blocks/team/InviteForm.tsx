import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "../../lib/utils";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../components/Form";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { RoleSelector, type Role } from "./RoleSelector";
import { Mail } from "lucide-react";

const inviteSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["admin", "member", "billing"]),
});

type InviteValues = z.infer<typeof inviteSchema>;

export interface InviteFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onSubmit?: (values: { email: string; role: Role }) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  error?: string;
  defaultRole?: Role;
  maxRecipients?: number;
  sentCount?: number;
}

function InviteForm({
  onSubmit,
  onCancel,
  isLoading,
  error,
  defaultRole = "member",
  maxRecipients,
  sentCount = 0,
  className,
  ...props
}: InviteFormProps) {
  const remaining = maxRecipients ? maxRecipients - sentCount : undefined;
  const form = useForm<InviteValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: defaultRole,
    },
  });

  async function handleSubmit(values: InviteValues) {
    await onSubmit?.({ email: values.email, role: values.role as Role });
    form.reset({ email: "", role: values.role });
  }

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="colleague@company.com"
                    autoComplete="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <RoleSelector
                    value={field.value as Role}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={isLoading || (remaining !== undefined && remaining <= 0)}>
              <Mail className="mr-2 h-4 w-4" />
              {isLoading ? "Sending invite…" : "Send invite"}
            </Button>
            {onCancel && (
              <Button variant="outline" type="button" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>

          {remaining !== undefined && (
            <p className="text-xs text-muted-foreground">
              {remaining > 0
                ? `${remaining} invite${remaining !== 1 ? "s" : ""} remaining`
                : "All invites used. Upgrade to add more members."}
            </p>
          )}
        </form>
      </Form>
    </div>
  );
}

InviteForm.displayName = "InviteForm";

export { InviteForm };
export type { InviteFormProps };
