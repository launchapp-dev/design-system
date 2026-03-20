import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AccountSettings } from "./AccountSettings";

const meta: Meta<typeof AccountSettings> = {
  title: "Blocks/Settings/AccountSettings",
  component: AccountSettings,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { AccountSettings } from "@launchapp/design-system/blocks";

export default function Page() {
  return (
    <AccountSettings
      onEmailChange={async (values) => console.log(values)}
      onPasswordChange={async (values) => console.log(values)}
      onDeleteAccount={() => console.log("delete account")}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <AccountSettings
        currentEmail="jane@example.com"
        onEmailChange={(v) => console.log("Email changed:", v)}
        onPasswordChange={(v) => console.log("Password changed:", v)}
        onDeleteAccount={() => console.log("Delete account")}
      />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <AccountSettings currentEmail="jane@example.com" />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <AccountSettings
      currentEmail="jane@example.com"
      onEmailChange={(v) => console.log("Email changed:", v)}
      onPasswordChange={(v) => console.log("Password changed:", v)}
      onDeleteAccount={() => console.log("Delete account")}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <AccountSettings
        currentEmail="jane@example.com"
        onEmailChange={(v) => console.log("Email changed:", v)}
        onPasswordChange={(v) => console.log("Password changed:", v)}
        onDeleteAccount={() => console.log("Delete account")}
      />
    </div>
  ),
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <AccountSettings
        currentEmail="jane@example.com"
        onEmailChange={(v) => console.log("Email changed:", v)}
        onPasswordChange={(v) => console.log("Password changed:", v)}
        onDeleteAccount={() => console.log("Delete account")}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "AccountSettings is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Alert, AlertDescription,
  Button,
  Card, CardHeader, CardTitle, CardDescription, CardContent,
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
  Input, Separator,
} from "@launchapp/design-system";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const emailSchema = z.object({ email: z.string().email() });
const passwordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export function AccountSettings({ currentEmail, onEmailChange, onPasswordChange, onDeleteAccount }) {
  const emailForm = useForm({ resolver: zodResolver(emailSchema), defaultValues: { email: currentEmail } });
  const passwordForm = useForm({ resolver: zodResolver(passwordSchema) });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email address</CardTitle>
          <CardDescription>Change the email associated with your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onEmailChange)} className="space-y-4">
              <FormField control={emailForm.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit">Update email</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your account password.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordChange)} className="space-y-4">
              <FormField control={passwordForm.control} name="currentPassword" render={({ field }) => (
                <FormItem>
                  <FormLabel>Current password</FormLabel>
                  <FormControl><Input type="password" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={passwordForm.control} name="newPassword" render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl><Input type="password" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={passwordForm.control} name="confirmPassword" render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl><Input type="password" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit">Update password</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger zone</CardTitle>
          <CardDescription>Permanently delete your account and all data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={onDeleteAccount}>Delete account</Button>
        </CardContent>
      </Card>
    </div>
  );
}`,
      },
    },
  },
};
