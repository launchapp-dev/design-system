import React from "react";
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
  FormDescription,
} from "../../components/Form";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { Button } from "../../components/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, } from "../../components/Card";
import { TabsRoot, TabsContent, TabsList, TabsTrigger } from "../../components/Tabs";
import { ThemePreview } from "../../components/ThemePreview";
import { validateCommunityTheme, validateHslValue, type CommunityTheme, type CommunityThemeTokens } from "../../themes/community-themes";
import type { VisionColorMap } from "../../lib/vision";

const _tokenSchema = z.record(
  z.string().regex(/^--la-/, "Token name must start with --la-"),
  z.string().refine((val) => validateHslValue(val), "Must be valid HSL value (e.g., '262 83% 58%')")
);

function adjustHue(hex: string, amount: number): string {
  const clean = hex.replace("#", "");
  let h = parseInt(clean.substring(0, 2), 16);
  h = Math.min(255, Math.max(0, h + amount));
  return "#" + h.toString(16).padStart(2, "0") + clean.substring(2);
}

const themeSubmissionSchema = z.object({
  id: z
    .string()
    .min(1, "Theme ID is required")
    .regex(/^[a-z0-9-]+$/, "ID must contain only lowercase letters, numbers, and hyphens")
    .max(50, "ID must be at most 50 characters"),
  name: z
    .string()
    .min(1, "Theme name is required")
    .max(100, "Name must be at most 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  authorName: z
    .string()
    .min(1, "Author name is required")
    .max(100, "Author name must be at most 100 characters"),
  authorUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  authorEmail: z
    .string()
    .email("Must be a valid email")
    .optional()
    .or(z.literal("")),
  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/, "Version must be in semver format (e.g., 1.0.0)"),
  license: z
    .string()
    .min(1, "License is required")
    .max(50, "License must be at most 50 characters"),
  repository: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  keywords: z
    .string()
    .optional(),
  previewColor: z
    .string()
    .regex(/^\d{1,3}\s+\d{1,3}%\s+\d{1,3}%$/, "Must be valid HSL value")
    .optional(),
  primaryColor: z.string().regex(/^#[0-9a-f]{6}$/i, "Must be valid hex color"),
  secondaryColor: z.string().regex(/^#[0-9a-f]{6}$/i, "Must be valid hex color"),
  accentColor: z.string().regex(/^#[0-9a-f]{6}$/i, "Must be valid hex color"),
});

type ThemeSubmissionValues = z.infer<typeof themeSubmissionSchema>;

export interface ThemeSubmissionFormProps {
  onSubmit?: (theme: CommunityTheme) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

function ThemeSubmissionForm(
  { onSubmit, onCancel, isLoading, error, className }: ThemeSubmissionFormProps,
  ref: React.Ref<HTMLDivElement>
): React.ReactElement {
  const [previewColors, setPreviewColors] = React.useState<VisionColorMap | null>(null);

  const form = useForm<ThemeSubmissionValues>({
    resolver: zodResolver(themeSubmissionSchema),
    defaultValues: {
      id: "",
      name: "",
      description: "",
      authorName: "",
      authorUrl: "",
      authorEmail: "",
      version: "1.0.0",
      license: "MIT",
      repository: "",
      keywords: "",
      primaryColor: "#262350",
      secondaryColor: "#6d5d7b",
      accentColor: "#c6a0ff",
    },
  });

  React.useEffect(() => {
    const subscription = form.watch((values) => {
      setPreviewColors({
        primary: values.primaryColor || "#262350",
        secondary: values.secondaryColor || "#6d5d7b",
        accent: values.accentColor || "#c6a0ff",
        muted: values.secondaryColor ? adjustHue(values.secondaryColor, 10) : "#a89db5",
        destructive: "#ff6b6b",
      });
    });
    return () => subscription.unsubscribe();
  }, [form]);

  async function handleSubmit(values: ThemeSubmissionValues) {
    const lightTokens = generateTokens(values.primaryColor, values.secondaryColor, "light");
    const darkTokens = generateTokens(values.primaryColor, values.secondaryColor, "dark");

    const theme: CommunityTheme = {
      id: values.id,
      name: values.name,
      description: values.description,
      author: {
        name: values.authorName,
        url: values.authorUrl || undefined,
        email: values.authorEmail || undefined,
      },
      version: values.version,
      license: values.license,
      repository: values.repository || undefined,
      keywords: values.keywords ? values.keywords.split(",").map((k) => k.trim()).filter(Boolean) : [],
      previewColor: values.previewColor,
      tokens: {
        light: lightTokens,
        dark: darkTokens,
      },
    };

    const validation = validateCommunityTheme(theme);
    if (!validation.valid) {
      form.setError("root", {
        message: validation.errors.join("; "),
      });
      return;
    }

    await onSubmit?.(theme);
  }

  return (
    <div ref={ref} className={cn("w-full max-w-4xl", className)}>
      <Card>
        <CardHeader>
          <CardTitle>Submit a Community Theme</CardTitle>
          <CardDescription>
            Create and submit a custom color theme for the LaunchApp design system
          </CardDescription>
        </CardHeader>

        <CardContent>
          <TabsRoot defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Theme Info</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-6">
                {error && (
                  <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                {form.formState.errors.root && (
                  <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {form.formState.errors.root.message}
                  </div>
                )}

                <TabsContent value="info" className="space-y-6 mt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Theme ID</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="my-awesome-theme"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            Unique identifier (lowercase, numbers, hyphens only)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Theme Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="My Awesome Theme"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your theme and what inspired it..."
                            disabled={isLoading}
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4 border-t pt-6">
                    <h3 className="font-semibold text-sm">Author Information</h3>
                    <FormField
                      control={form.control}
                      name="authorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="authorUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input
                                type="url"
                                placeholder="https://example.com"
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
                        name="authorEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                disabled={isLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 border-t pt-6">
                    <h3 className="font-semibold text-sm">Theme Metadata</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="version"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Version</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="1.0.0"
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
                        name="license"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>License</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="MIT"
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
                        name="repository"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Repository</FormLabel>
                            <FormControl>
                              <Input
                                type="url"
                                placeholder="https://github.com/user/repo"
                                disabled={isLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="keywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Keywords</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="dark, purple, vibrant"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            Comma-separated keywords for categorization
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="colors" className="space-y-6 mt-0">
                  <p className="text-sm text-muted-foreground">
                    Choose your primary colors. Additional shades will be automatically generated.
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="primaryColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Color</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                disabled={isLoading}
                                className="h-10 w-full rounded border border-border cursor-pointer"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs font-mono">
                            {field.value}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="secondaryColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Secondary Color</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                disabled={isLoading}
                                className="h-10 w-full rounded border border-border cursor-pointer"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs font-mono">
                            {field.value}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="accentColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Accent Color</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                disabled={isLoading}
                                className="h-10 w-full rounded border border-border cursor-pointer"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs font-mono">
                            {field.value}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="previewColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preview Color (HSL)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="262 83% 58%"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          HSL value shown in theme gallery (optional, will auto-detect if omitted)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="preview" className="space-y-6 mt-0">
                  <p className="text-sm text-muted-foreground">
                    Preview how your theme looks with actual components
                  </p>
                  {previewColors && <ThemePreview colors={previewColors} />}
                </TabsContent>

                <div className="flex gap-2 justify-end pt-6 border-t">
                  {onCancel && (
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isLoading}
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Theme"}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsRoot>
        </CardContent>
      </Card>
    </div>
  );
}

function generateTokens(
  primaryHex: string,
  secondaryHex: string,
  mode: "light" | "dark"
): CommunityThemeTokens {
  const primaryHsl = hexToHsl(primaryHex);
  const secondaryHsl = hexToHsl(secondaryHex);
  const _lightness = mode === "light" ? 50 : 30;

  return {
    "--la-background": mode === "light" ? "0 0% 100%" : `${primaryHsl.split(" ")[0]} 15% 18%`,
    "--la-foreground": mode === "light" ? `${primaryHsl.split(" ")[0]} 15% 18%` : "60 30% 96%",
    "--la-card": mode === "light" ? "0 0% 100%" : `${primaryHsl.split(" ")[0]} 15% 22%`,
    "--la-card-foreground": mode === "light" ? `${primaryHsl.split(" ")[0]} 15% 18%` : "60 30% 96%",
    "--la-popover": mode === "light" ? "0 0% 100%" : `${primaryHsl.split(" ")[0]} 15% 22%`,
    "--la-popover-foreground": mode === "light" ? `${primaryHsl.split(" ")[0]} 15% 18%` : "60 30% 96%",
    "--la-primary": primaryHsl,
    "--la-primary-foreground": mode === "light" ? "0 0% 100%" : `${primaryHsl.split(" ")[0]} 15% 18%`,
    "--la-secondary": secondaryHsl,
    "--la-secondary-foreground": mode === "light" ? "0 0% 100%" : "60 30% 96%",
    "--la-muted": mode === "light" ? "0 0% 90%" : `${primaryHsl.split(" ")[0]} 15% 40%`,
    "--la-muted-foreground": mode === "light" ? `${primaryHsl.split(" ")[0]} 15% 45%` : `${primaryHsl.split(" ")[0]} 15% 70%`,
    "--la-accent": primaryHsl,
    "--la-accent-foreground": mode === "light" ? "0 0% 100%" : `${primaryHsl.split(" ")[0]} 15% 18%`,
    "--la-destructive": "0 100% 67%",
    "--la-destructive-foreground": "0 0% 100%",
    "--la-border": mode === "light" ? "0 0% 88%" : `${primaryHsl.split(" ")[0]} 15% 32%`,
    "--la-input": mode === "light" ? "0 0% 88%" : `${primaryHsl.split(" ")[0]} 15% 32%`,
    "--la-ring": primaryHsl,
  };
}

function hexToHsl(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

const ThemeSubmissionFormComponent = React.forwardRef<HTMLDivElement, ThemeSubmissionFormProps>(
  ThemeSubmissionForm
);
ThemeSubmissionFormComponent.displayName = "ThemeSubmissionForm";

export { ThemeSubmissionFormComponent as ThemeSubmissionForm };
