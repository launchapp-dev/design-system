import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Separator } from "../../components/Separator";
import { Alert, AlertTitle, AlertDescription } from "../../components/Alert";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../../components/Form";
import { cn } from "../../lib/utils";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type EmailFormValues = z.infer<typeof emailSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export interface AccountSettingsProps {
  currentEmail?: string;
  onEmailChange?: (values: EmailFormValues) => void | Promise<void>;
  onPasswordChange?: (values: PasswordFormValues) => void | Promise<void>;
  onDeleteAccount?: () => void | Promise<void>;
  className?: string;
}

function AccountSettings({
  currentEmail = "",
  onEmailChange,
  onPasswordChange,
  onDeleteAccount,
  className,
  ref,
}: AccountSettingsProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [emailSaving, setEmailSaving] = React.useState(false);
  const [passwordSaving, setPasswordSaving] = React.useState(false);
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: currentEmail },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const handleEmailSubmit = async (values: EmailFormValues) => {
    setEmailSaving(true);
    try {
      await onEmailChange?.(values);
    } finally {
      setEmailSaving(false);
    }
  };

  const handlePasswordSubmit = async (values: PasswordFormValues) => {
    setPasswordSaving(true);
    try {
      await onPasswordChange?.(values);
      passwordForm.reset();
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div ref={ref} className={cn("space-y-8", className)}>
      <div>
        <h3 className="text-lg font-semibold text-foreground">Account</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account credentials and security.
        </p>
      </div>
      <Separator />

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-foreground">Email address</h4>
          <p className="text-sm text-muted-foreground">
            Update the email address associated with your account.
          </p>
        </div>
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4 max-w-md">
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    We will send a verification link to the new address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="sm" disabled={emailSaving}>
              {emailSaving ? "Saving\u2026" : "Update email"}
            </Button>
          </form>
        </Form>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-foreground">Password</h4>
          <p className="text-sm text-muted-foreground">
            Change your password to keep your account secure.
          </p>
        </div>
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
            className="space-y-4 max-w-md"
          >
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>Minimum 8 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="sm" disabled={passwordSaving}>
              {passwordSaving ? "Saving\u2026" : "Change password"}
            </Button>
          </form>
        </Form>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-destructive">Danger zone</h4>
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all associated data.
          </p>
        </div>
        {!deleteConfirm ? (
          <Button variant="destructive" size="sm" onClick={() => setDeleteConfirm(true)}>
            Delete account
          </Button>
        ) : (
          <Alert variant="destructive">
            <AlertTitle>Are you sure?</AlertTitle>
            <AlertDescription className="space-y-3">
              <p>This action cannot be undone. All your data will be permanently deleted.</p>
              <div className="flex gap-2 pt-1">
                <Button variant="destructive" size="sm" onClick={() => onDeleteAccount?.()}>
                  Yes, delete my account
                </Button>
                <Button variant="outline" size="sm" onClick={() => setDeleteConfirm(false)}>
                  Cancel
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

AccountSettings.displayName = "AccountSettings";

export { AccountSettings };
