import type { Meta, StoryObj } from "@storybook/react";
import { ProfileSettings } from "./ProfileSettings";

const meta: Meta<typeof ProfileSettings> = {
  title: "Blocks/Settings/ProfileSettings",
  component: ProfileSettings,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { ProfileSettings } from "@launchapp/design-system/blocks";

export default function Page() {
  return (
    <ProfileSettings
      onSave={async (values) => {
        console.log(values);
      }}
    />
  );
}`,
      },
    },
  },
  argTypes: {
    avatarFallback: { control: "text" },
    avatarSrc: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <ProfileSettings
        defaultValues={{
          name: "Jane Doe",
          username: "janedoe",
          bio: "Designer & coffee lover.",
        }}
        avatarFallback="JD"
        onSave={(values) => console.log("Saved:", values)}
      />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <ProfileSettings onSave={(values) => console.log("Saved:", values)} />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div
        className="dark"
        style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <ProfileSettings
        defaultValues={{
          name: "Jane Doe",
          username: "janedoe",
          bio: "Designer & coffee lover.",
        }}
        avatarFallback="JD"
      />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <ProfileSettings
      defaultValues={{
        name: "Jane Doe",
        username: "janedoe",
        bio: "Designer & coffee lover.",
      }}
      avatarFallback="JD"
      onSave={(values) => console.log("Saved:", values)}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <ProfileSettings
        defaultValues={{
          name: "Jane Doe",
          username: "janedoe",
          bio: "Designer & coffee lover.",
        }}
        avatarFallback="JD"
        onSave={(values) => console.log("Saved:", values)}
      />
    </div>
  ),
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <ProfileSettings
        defaultValues={{
          name: "Jane Doe",
          username: "janedoe",
          bio: "Designer & coffee lover.",
        }}
        avatarFallback="JD"
        onSave={(values) => console.log("Saved:", values)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ProfileSettings is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Avatar, AvatarFallback, AvatarImage,
  Button,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
  Input, Textarea,
} from "@launchapp/design-system";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(2),
  username: z.string().regex(/^[a-z0-9_-]+$/, "Lowercase letters, numbers, hyphens, underscores only"),
  bio: z.string().max(160).optional(),
});

export function ProfileSettings({ defaultValues, avatarSrc, avatarFallback, onSave, isLoading }) {
  const form = useForm({ resolver: zodResolver(schema), defaultValues });
  const [preview, setPreview] = React.useState(avatarSrc);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your public profile information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                {preview && <AvatarImage src={preview} />}
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              </Avatar>
              <Button type="button" variant="outline" size="sm" asChild>
                <label>
                  Upload photo
                  <input type="file" accept="image/*" className="sr-only" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPreview(URL.createObjectURL(file));
                  }} />
                </label>
              </Button>
            </div>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Display name</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="username" render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="bio" render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl><Textarea rows={3} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving…" : "Save changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}`,
      },
    },
  },
};
