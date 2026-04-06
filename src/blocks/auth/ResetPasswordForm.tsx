import type * as React from "react";
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/Card";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export interface ResetPasswordFormProps {
  onSubmit?: (values: ResetPasswordValues) => void | Promise<void>;
  onLoginClick?: () => void;
  isLoading?: boolean;
  error?: string;
  success?: boolean;
  className?: string;
}

function ResetPasswordForm({
  onSubmit,
  onLoginClick,
  isLoading,
  error,
  success,
  className,
  ref,
}: ResetPasswordFormProps & { ref?: React.Ref<HTMLDivElement> }) {
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSubmit(values: ResetPasswordValues) {
    await onSubmit?.(values);
  }

  return (
    <div ref={ref} className={cn("w-full max-w-sm", className)}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>Create a new password for your account.</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="rounded-md bg-[hsl(var(--la-primary)/0.1)] p-4 text-sm text-[hsl(var(--la-primary))] text-center space-y-1">
              <p className="font-medium">Password updated</p>
              <p className="text-[hsl(var(--la-muted-foreground))]">
                Your password has been changed. You can now sign in.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                {error && (
                  <div className="rounded-md bg-[hsl(var(--la-destructive)/0.1)] p-3 text-sm text-[hsl(var(--la-destructive))]">
                    {error}
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          autoComplete="new-password"
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm new password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          autoComplete="new-password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Updating password…" : "Update password"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        {onLoginClick && (
          <CardFooter className="justify-center">
            <Button
              variant="link"
              className="px-0 h-auto text-sm"
              type="button"
              onClick={onLoginClick}
            >
              ← Back to sign in
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

ResetPasswordForm.displayName = "ResetPasswordForm";

export { ResetPasswordForm };
export type { ResetPasswordValues };
