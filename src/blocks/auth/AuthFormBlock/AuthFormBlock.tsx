import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "../../../lib/utils";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../../components/Form";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Checkbox } from "../../../components/Checkbox";
import { Label } from "../../../components/Label";
import { Separator } from "../../../components/Separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../components/Card";

const authFormBlockVariants = cva("w-full", {
  variants: {
    size: {
      sm: "max-w-xs",
      md: "max-w-sm",
      lg: "max-w-md",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

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
    terms: z
      .boolean()
      .refine((val) => val === true, "You must accept the terms to continue"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

export interface SocialLoginProvider {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

export interface AuthFormBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit">,
    VariantProps<typeof authFormBlockVariants> {
  mode?: "login" | "register";
  socialLogins?: SocialLoginProvider[];
  onSubmit?: (
    values: LoginValues | RegisterValues,
    mode: "login" | "register"
  ) => void | Promise<void>;
  onToggleMode?: (mode: "login" | "register") => void;
  onSocialLogin?: (providerId: string) => void;
  onForgotPassword?: () => void;
  isLoading?: boolean;
  error?: string;
}

function AuthFormBlock(
  {
    className,
    size,
    mode = "login",
    socialLogins,
    onSubmit,
    onToggleMode,
    onSocialLogin,
    onForgotPassword,
    isLoading,
    error,
    ref,
    ...props
  }: AuthFormBlockProps & { ref?: React.Ref<HTMLDivElement> }
) {
  const schema = mode === "login" ? loginSchema : registerSchema;
  const isLogin = mode === "login";

  const form = useForm<LoginValues | RegisterValues>({
    resolver: zodResolver(schema),
    defaultValues: isLogin
      ? { email: "", password: "", rememberMe: false }
      : { name: "", email: "", password: "", confirmPassword: "", terms: false },
  });

  async function handleSubmit(values: LoginValues | RegisterValues) {
    await onSubmit?.(values, mode);
  }

  return (
    <div
      ref={ref}
      className={cn(authFormBlockVariants({ size }), className)}
      {...props}
    >
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            {isLogin ? "Sign in" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Enter your credentials to access your account."
              : "Fill in the details below to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {socialLogins && socialLogins.length > 0 && (
            <>
              <div className="grid gap-2">
                {socialLogins.map((provider) => (
                  <Button
                    key={provider.id}
                    type="button"
                    variant="outline"
                    className="w-full gap-2"
                    disabled={isLoading}
                    onClick={() => onSocialLogin?.(provider.id)}
                  >
                    {provider.icon}
                    {provider.name}
                  </Button>
                ))}
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
            </>
          )}

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

              {!isLogin && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jane Doe"
                          autoComplete="name"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                      <FormLabel>
                        {isLogin ? "Password" : "Create password"}
                      </FormLabel>
                      {isLogin && onForgotPassword && (
                        <Button
                          type="button"
                          variant="link"
                          className="h-auto p-0 text-xs"
                          onClick={onForgotPassword}
                        >
                          Forgot password?
                        </Button>
                      )}
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        autoComplete={isLogin ? "current-password" : "new-password"}
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!isLogin && (
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
              )}

              {isLogin && (
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
              )}

              {!isLogin && (
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
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading
                  ? isLogin
                    ? "Signing in…"
                    : "Creating account…"
                  : isLogin
                    ? "Sign in"
                    : "Create account"}
              </Button>
            </form>
          </Form>
        </CardContent>

        {onToggleMode && (
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Button
                variant="link"
                className="px-0 h-auto"
                type="button"
                onClick={() => onToggleMode(isLogin ? "register" : "login")}
              >
                {isLogin ? "Sign up" : "Sign in"}
              </Button>
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

AuthFormBlock.displayName = "AuthFormBlock";

export { AuthFormBlock, authFormBlockVariants };
export type { LoginValues, RegisterValues };
