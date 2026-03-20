import type { Meta, StoryObj } from "@storybook/react";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

const meta: Meta<typeof ForgotPasswordForm> = {
  title: "Blocks/Auth/ForgotPasswordForm",
  component: ForgotPasswordForm,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `import { ForgotPasswordForm } from "@launchapp/design-system/blocks";

export default function Page() {
  return (
    <ForgotPasswordForm
      onSubmit={async (values) => {
        console.log(values);
      }}
      onBackToLoginClick={() => console.log("back to login")}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ForgotPasswordForm>;

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
    error: "Something went wrong. Please try again.",
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

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  parameters: {
    docs: {
      description: {
        story:
          "ForgotPasswordForm is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
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

const schema = z.object({ email: z.string().email() });

export function ForgotPasswordForm({ onSubmit, onLoginClick, isLoading, error, success }) {
  const form = useForm({ resolver: zodResolver(schema) });
  if (success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Check your inbox</CardTitle>
          <CardDescription>We sent a reset link to your email.</CardDescription>
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
        <CardTitle>Forgot password?</CardTitle>
        <CardDescription>Enter your email and we'll send a reset link.</CardDescription>
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending…" : "Send reset link"}
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
