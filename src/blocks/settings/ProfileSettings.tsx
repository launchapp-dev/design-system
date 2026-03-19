import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/Avatar";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { Separator } from "../../components/Separator";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../../components/Form";
import { cn } from "../../lib/utils";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be 100 characters or less"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be 30 characters or less")
    .regex(/^[a-z0-9_-]+$/, "Only lowercase letters, numbers, hyphens, and underscores"),
  bio: z.string().max(160, "Bio must be 160 characters or less").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export interface ProfileSettingsProps {
  defaultValues?: Partial<ProfileFormValues>;
  avatarSrc?: string;
  avatarFallback?: string;
  onSave?: (values: ProfileFormValues) => void | Promise<void>;
  className?: string;
}

const ProfileSettings = React.forwardRef<HTMLDivElement, ProfileSettingsProps>(
  ({ defaultValues, avatarSrc, avatarFallback = "US", onSave, className }, ref) => {
    const [avatarPreview, setAvatarPreview] = React.useState<string | undefined>(avatarSrc);
    const [isSaving, setIsSaving] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const form = useForm<ProfileFormValues>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        name: "",
        username: "",
        bio: "",
        ...defaultValues,
      },
    });

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setAvatarPreview(url);
      }
    };

    const handleSubmit = async (values: ProfileFormValues) => {
      setIsSaving(true);
      try {
        await onSave?.(values);
      } finally {
        setIsSaving(false);
      }
    };

    return (
      <div ref={ref} className={cn("space-y-6", className)}>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Profile</h3>
          <p className="text-sm text-muted-foreground">Manage your public profile information.</p>
        </div>
        <Separator />
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar size="lg">
            <AvatarImage src={avatarPreview} alt="Profile avatar" />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleAvatarChange}
              aria-label="Upload avatar image"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Change avatar
            </Button>
            <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormDescription>Your publicly visible name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormDescription>Lowercase letters, numbers, - and _ only.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little about yourself"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Max 160 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving\u2026" : "Save changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }
);

ProfileSettings.displayName = "ProfileSettings";

export { ProfileSettings };
