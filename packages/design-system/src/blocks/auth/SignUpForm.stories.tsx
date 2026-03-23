import type { Meta, StoryObj } from "@storybook/react";
import { SignUpForm } from "./SignUpForm";

const meta: Meta<typeof SignUpForm> = {
  title: "Blocks/Auth/SignUpForm",
  component: SignUpForm,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `import { SignUpForm } from "@launchapp/design-system/blocks";

export default function Page() {
  return (
    <SignUpForm
      onSubmit={async (values) => {
        console.log(values);
      }}
      onSignInClick={() => console.log("sign in")}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SignUpForm>;

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
    error: "An account with this email already exists.",
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
          "SignUpForm is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
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

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
  terms: z.boolean().refine((v) => v === true, "You must accept the terms"),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export function SignUpForm({ onSubmit, onLoginClick, isLoading, error }) {
  const form = useForm({ resolver: zodResolver(signUpSchema) });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your details to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
            )}
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
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
                <FormControl><Input type="password" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl><Input type="password" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="terms" render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                  <Label htmlFor="terms">I agree to the terms of service</Label>
                </div>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account…" : "Create account"}
            </Button>
          </form>
        </Form>
      </CardContent>
      {onLoginClick && (
        <CardFooter className="justify-center">
          <Button variant="link" className="px-0 h-auto" onClick={onLoginClick}>Already have an account? Sign in</Button>
        </CardFooter>
      )}
    </Card>
  );
}`,
      },
    },
  },
};
