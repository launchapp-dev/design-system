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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/Card";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export interface ForgotPasswordFormProps {
  onSubmit?: (values: ForgotPasswordValues) => void | Promise<void>;
  onLoginClick?: () => void;
  isLoading?: boolean;
  error?: string;
  success?: boolean;
  className?: string;
}

const ForgotPasswordForm = React.forwardRef<
  HTMLDivElement,
  ForgotPasswordFormProps
>(
  (
    { onSubmit, onLoginClick, isLoading, error, success, className },
    ref
  ) => {
    const form = useForm<ForgotPasswordValues>({
      resolver: zodResolver(forgotPasswordSchema),
      defaultValues: {
        email: "",
      },
    });

    async function handleSubmit(values: ForgotPasswordValues) {
      await onSubmit?.(values);
    }

    return (
      <div ref={ref} className={cn("w-full max-w-sm", className)}>
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
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending…" : "Send reset link"}
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
);

ForgotPasswordForm.displayName = "ForgotPasswordForm";

export { ForgotPasswordForm };
export type { ForgotPasswordValues };
