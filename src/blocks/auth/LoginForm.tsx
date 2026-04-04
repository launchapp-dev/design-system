import { zodResolver } from "@hookform/resolvers/zod";
import type * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../../components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/Card";
import { Checkbox } from "../../components/Checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/Form";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { cn } from "../../lib/utils";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  onSubmit?: (values: LoginValues) => void | Promise<void>;
  onSignUpClick?: () => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

function LoginForm({
  onSubmit,
  onSignUpClick,
  isLoading,
  error,
  className,
  ref,
}: LoginFormProps & { ref?: React.Ref<HTMLDivElement> }) {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function handleSubmit(values: LoginValues) {
    await onSubmit?.(values);
  }

  return (
    <div ref={ref} className={cn("w-full max-w-sm", className)}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
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
                name="rememberMe"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="login-remember-me"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                      <Label
                        htmlFor="login-remember-me"
                        className="text-sm font-normal cursor-pointer"
                      >
                        Remember me
                      </Label>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </Form>
        </CardContent>
        {onSignUpClick && (
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Button
                variant="link"
                className="px-0 h-auto"
                type="button"
                onClick={onSignUpClick}
              >
                Sign up
              </Button>
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

LoginForm.displayName = "LoginForm";

export type { LoginValues };
export { LoginForm };
