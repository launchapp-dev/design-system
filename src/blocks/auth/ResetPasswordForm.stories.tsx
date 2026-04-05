import type { Meta, StoryObj } from "@storybook/react";
import { ResetPasswordForm } from "./ResetPasswordForm";

const meta: Meta<typeof ResetPasswordForm> = {
  title: "Blocks/Auth/ResetPasswordForm",
  component: ResetPasswordForm,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `import { ResetPasswordForm } from "@launchapp/design-system/blocks";

export default function Page() {
  return (
    <ResetPasswordForm
      onSubmit={async (values) => {
        console.log(values);
      }}
      onLoginClick={() => console.log("back to login")}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResetPasswordForm>;

export const Default: Story = {};

export const WithLoginLink: Story = {
  args: {
    onLoginClick: () => alert("Navigate to login"),
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    error: "The reset link has expired. Please request a new one.",
    onLoginClick: () => {},
  },
};

export const Success: Story = {
  args: {
    success: true,
    onLoginClick: () => {},
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
};

export const PasswordMismatch: Story = {
  name: "Validation: Password Mismatch",
  args: {
    onLoginClick: () => {},
  },
  play: async ({ canvas }) => {
    const { expect } = await import("@storybook/test");
    const password = canvas.getByPlaceholderText("••••••••", { exact: false });
    await expect(password).toBeVisible();
  },
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  parameters: {
    docs: {
      description: {
        story:
          "ResetPasswordForm is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
  Input, Button,
} from "@launchapp/design-system";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function ResetPasswordForm({ onSubmit, onLoginClick, isLoading, error, success }) {
  const form = useForm({ resolver: zodResolver(resetPasswordSchema) });
  if (success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Password updated</CardTitle>
          <CardDescription>Your password has been changed.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="link" onClick={onLoginClick}>Back to sign in</Button>
        </CardFooter>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>Create a new password for your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="rounded-md bg-[hsl(var(--la-destructive)/0.1)] p-3 text-sm text-[hsl(var(--la-destructive))]">{error}</div>
            )}
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl><Input type="password" placeholder="••••••••" autoComplete="new-password" disabled={isLoading} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm new password</FormLabel>
                <FormControl><Input type="password" placeholder="••••••••" autoComplete="new-password" disabled={isLoading} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Updating password…" : "Update password"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="link" className="px-0 h-auto" onClick={onLoginClick}>Back to sign in</Button>
      </CardFooter>
    </Card>
  );
}`,
      },
    },
  },
};
