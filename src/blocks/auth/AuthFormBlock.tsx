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
import { Checkbox } from "../../components/Checkbox";
import { Label } from "../../components/Label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/Card";
import { Separator } from "../../components/Separator";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, "You must accept the terms to continue"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;
type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export type AuthFormVariant = "login" | "register" | "forgot-password" | "reset-password";

export interface SocialProvider {
  id: "google" | "github";
  label?: string;
}

export interface AuthFormBlockProps {
  variant?: AuthFormVariant;
  onSubmit?: (
    values: LoginValues | RegisterValues | ForgotPasswordValues | ResetPasswordValues,
  ) => void | Promise<void>;
  onSocialLogin?: (provider: "google" | "github") => void | Promise<void>;
  onSwitchVariant?: (variant: AuthFormVariant) => void;
  socialProviders?: SocialProvider[];
  isLoading?: boolean;
  error?: string;
  success?: boolean;
  className?: string;
}

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
    <path
      d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      fill="#4285F4"
    />
    <path
      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      fill="#34A853"
    />
    <path
      d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      fill="#EA4335"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    fill="currentColor"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const PROVIDER_ICONS: Record<string, React.ReactNode> = {
  google: <GoogleIcon />,
  github: <GitHubIcon />,
};

const PROVIDER_LABELS: Record<string, string> = {
  google: "Continue with Google",
  github: "Continue with GitHub",
};

function SocialButtons({
  providers,
  onSocialLogin,
  isLoading,
}: {
  providers: SocialProvider[];
  onSocialLogin?: (provider: "google" | "github") => void | Promise<void>;
  isLoading?: boolean;
}) {
  if (!providers.length) return null;
  return (
    <div className="space-y-2">
      {providers.map((p) => (
        <Button
          key={p.id}
          type="button"
          variant="outline"
          className="w-full gap-2.5"
          disabled={isLoading}
          onClick={() => onSocialLogin?.(p.id)}
        >
          {PROVIDER_ICONS[p.id]}
          {p.label ?? PROVIDER_LABELS[p.id]}
        </Button>
      ))}
    </div>
  );
}

function OrDivider() {
  return (
    <div className="flex items-center gap-3">
      <Separator className="flex-1" />
      <span className="text-xs text-muted-foreground shrink-0">or</span>
      <Separator className="flex-1" />
    </div>
  );
}

function LoginVariant({
  onSubmit,
  onSwitchVariant,
  socialProviders,
  onSocialLogin,
  isLoading,
  error,
}: {
  onSubmit?: (values: LoginValues) => void | Promise<void>;
  onSwitchVariant?: (variant: AuthFormVariant) => void;
  socialProviders: SocialProvider[];
  onSocialLogin?: (provider: "google" | "github") => void | Promise<void>;
  isLoading?: boolean;
  error?: string;
}) {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {socialProviders.length > 0 && (
          <>
            <SocialButtons
              providers={socialProviders}
              onSocialLogin={onSocialLogin}
              isLoading={isLoading}
            />
            <OrDivider />
          </>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              await onSubmit?.(values);
            })}
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
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    {onSwitchVariant && (
                      <Button
                        variant="link"
                        type="button"
                        className="px-0 h-auto text-xs font-normal text-muted-foreground"
                        onClick={() => onSwitchVariant("forgot-password")}
                      >
                        Forgot password?
                      </Button>
                    )}
                  </div>
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
                      id="auth-remember-me"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                    <Label
                      htmlFor="auth-remember-me"
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
      {onSwitchVariant && (
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Button
              variant="link"
              className="px-0 h-auto"
              type="button"
              onClick={() => onSwitchVariant("register")}
            >
              Sign up
            </Button>
          </p>
        </CardFooter>
      )}
    </Card>
  );
}

function RegisterVariant({
  onSubmit,
  onSwitchVariant,
  socialProviders,
  onSocialLogin,
  isLoading,
  error,
}: {
  onSubmit?: (values: RegisterValues) => void | Promise<void>;
  onSwitchVariant?: (variant: AuthFormVariant) => void;
  socialProviders: SocialProvider[];
  onSocialLogin?: (provider: "google" | "github") => void | Promise<void>;
  isLoading?: boolean;
  error?: string;
}) {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", terms: false },
  });

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Fill in the details below to get started.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {socialProviders.length > 0 && (
          <>
            <SocialButtons
              providers={socialProviders}
              onSocialLogin={onSocialLogin}
              isLoading={isLoading}
            />
            <OrDivider />
          </>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              await onSubmit?.(values);
            })}
            className="space-y-4"
          >
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      autoComplete="name"
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
                  <FormLabel>Confirm password</FormLabel>
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
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="auth-terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor="auth-terms"
                      className="text-sm font-normal cursor-pointer leading-snug"
                    >
                      I agree to the terms of service and privacy policy
                    </Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account…" : "Create account"}
            </Button>
          </form>
        </Form>
      </CardContent>
      {onSwitchVariant && (
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              className="px-0 h-auto"
              type="button"
              onClick={() => onSwitchVariant("login")}
            >
              Sign in
            </Button>
          </p>
        </CardFooter>
      )}
    </Card>
  );
}

function ForgotPasswordVariant({
  onSubmit,
  onSwitchVariant,
  isLoading,
  error,
  success,
}: {
  onSubmit?: (values: ForgotPasswordValues) => void | Promise<void>;
  onSwitchVariant?: (variant: AuthFormVariant) => void;
  isLoading?: boolean;
  error?: string;
  success?: boolean;
}) {
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Forgot password</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you a reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="rounded-md bg-primary/10 p-4 text-sm text-primary text-center space-y-1">
            <p className="font-medium">Check your inbox</p>
            <p className="text-muted-foreground">
              If that email is registered, a reset link is on its way.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (values) => {
                await onSubmit?.(values);
              })}
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending…" : "Send reset link"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      {onSwitchVariant && (
        <CardFooter className="justify-center">
          <Button
            variant="link"
            className="px-0 h-auto text-sm"
            type="button"
            onClick={() => onSwitchVariant("login")}
          >
            ← Back to sign in
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

function ResetPasswordVariant({
  onSubmit,
  onSwitchVariant,
  isLoading,
  error,
  success,
}: {
  onSubmit?: (values: ResetPasswordValues) => void | Promise<void>;
  onSwitchVariant?: (variant: AuthFormVariant) => void;
  isLoading?: boolean;
  error?: string;
  success?: boolean;
}) {
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Reset password</CardTitle>
        <CardDescription>Create a new password for your account.</CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="rounded-md bg-primary/10 p-4 text-sm text-primary text-center space-y-1">
            <p className="font-medium">Password updated</p>
            <p className="text-muted-foreground">
              Your password has been changed. You can now sign in.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (values) => {
                await onSubmit?.(values);
              })}
              className="space-y-4"
            >
              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
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
      {onSwitchVariant && (
        <CardFooter className="justify-center">
          <Button
            variant="link"
            className="px-0 h-auto text-sm"
            type="button"
            onClick={() => onSwitchVariant("login")}
          >
            ← Back to sign in
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

const DEFAULT_SOCIAL_PROVIDERS: SocialProvider[] = [{ id: "google" }, { id: "github" }];

function AuthFormBlock({
  variant = "login",
  onSubmit,
  onSocialLogin,
  onSwitchVariant,
  socialProviders = DEFAULT_SOCIAL_PROVIDERS,
  isLoading,
  error,
  success,
  className,
  ref,
}: AuthFormBlockProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className={cn("w-full max-w-sm", className)}>
      {variant === "login" && (
        <LoginVariant
          onSubmit={onSubmit as (values: LoginValues) => void | Promise<void>}
          onSwitchVariant={onSwitchVariant}
          socialProviders={socialProviders}
          onSocialLogin={onSocialLogin}
          isLoading={isLoading}
          error={error}
        />
      )}
      {variant === "register" && (
        <RegisterVariant
          onSubmit={onSubmit as (values: RegisterValues) => void | Promise<void>}
          onSwitchVariant={onSwitchVariant}
          socialProviders={socialProviders}
          onSocialLogin={onSocialLogin}
          isLoading={isLoading}
          error={error}
        />
      )}
      {variant === "forgot-password" && (
        <ForgotPasswordVariant
          onSubmit={onSubmit as (values: ForgotPasswordValues) => void | Promise<void>}
          onSwitchVariant={onSwitchVariant}
          isLoading={isLoading}
          error={error}
          success={success}
        />
      )}
      {variant === "reset-password" && (
        <ResetPasswordVariant
          onSubmit={onSubmit as (values: ResetPasswordValues) => void | Promise<void>}
          onSwitchVariant={onSwitchVariant}
          isLoading={isLoading}
          error={error}
          success={success}
        />
      )}
    </div>
  );
}

AuthFormBlock.displayName = "AuthFormBlock";

export { AuthFormBlock };
export type { LoginValues, RegisterValues, ForgotPasswordValues, ResetPasswordValues };
