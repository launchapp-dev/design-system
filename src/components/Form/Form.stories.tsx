import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./index";
import { Input } from "../Input";
import { Button } from "../Button";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInValues = z.infer<typeof signInSchema>;

function SignInForm() {
  const [submitted, setSubmitted] = React.useState<SignInValues | null>(null);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignInValues) {
    setSubmitted(values);
  }

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Sign in</h2>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormDescription>We&apos;ll never share your email.</FormDescription>
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
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </Form>
      {submitted && (
        <pre className="rounded-md bg-muted p-4 text-xs">{JSON.stringify(submitted, null, 2)}</pre>
      )}
    </div>
  );
}

const meta: Meta = {
  title: "Components/Form",
  component: Form,
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### ARIA Attributes
- Form fields have associated \`<label>\` elements
- Required fields marked with \`aria-required="true"\`
- Error messages linked with \`aria-describedby\`
- Help text associated with \`aria-helptext\`

### Keyboard Navigation
- **Tab**: Navigate through form fields
- **Shift+Tab**: Navigate backwards
- **Enter**: Submit form from any control
- **Space**: Toggle checkboxes/radios
- **Arrow Keys**: Navigate radio groups/select options

### Screen Reader Behavior
- Form controls announced with their labels
- Required status announced
- Error messages announced as form descriptions
- Help text announced when focused
- Form submission status announced

### Focus Management
- First error field receives focus on validation failure
- Clear focus indicators on all form controls
- Label click properly focuses associated control
- Focus management for dynamic fields
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const SignIn: Story = {
  render: () => <SignInForm />,
};

export const WithValidationErrors: Story = {
  render: () => {
    const form = useForm<SignInValues>({
      resolver: zodResolver(signInSchema),
      defaultValues: { email: "not-an-email", password: "short" },
    });

    React.useEffect(() => {
      form.trigger();
    }, [form]);

    return (
      <div className="w-full max-w-sm">
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    );
  },
};
