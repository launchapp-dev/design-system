import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Blocks/Auth/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `import { LoginForm } from "@launchapp/design-system/blocks";

export default function Page() {
  return (
    <LoginForm
      onSubmit={async (values) => {
        console.log(values);
      }}
      onSignUpClick={() => console.log("sign up")}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};

export const WithSignUpLink: Story = {
  args: {
    onSignUpClick: () => alert("Navigate to sign-up"),
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    error: "Invalid email or password. Please try again.",
    onSignUpClick: () => {},
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

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  parameters: {
    docs: {
      description: {
        story:
          "LoginForm is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
  Input, Button, Checkbox, Label,
} from "@launchapp/design-system";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

export function LoginForm({ onSubmit, onSignUpClick, isLoading, error }) {
  const form = useForm({ resolver: zodResolver(loginSchema) });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
            )}
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="rememberMe" render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-me" checked={field.value} onCheckedChange={field.onChange} />
                  <Label htmlFor="remember-me">Remember me</Label>
                </div>
              </FormItem>
            )} />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </Form>
      </CardContent>
      {onSignUpClick && (
        <CardFooter className="justify-center">
          <Button variant="link" className="px-0 h-auto" onClick={onSignUpClick}>Sign up</Button>
        </CardFooter>
      )}
    </Card>
  );
}`,
      },
    },
  },
};
