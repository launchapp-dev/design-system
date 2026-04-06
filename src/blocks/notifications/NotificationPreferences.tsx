import * as React from "react";
import { Switch } from "@/components/Switch";
import { Label } from "@/components/Label";
import { Separator } from "@/components/Separator";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/Card";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export interface NotificationChannel {
  id: string;
  label: string;
  description: string;
}

export interface NotificationCategory {
  id: string;
  title: string;
  description?: string;
  channels: NotificationChannel[];
}

export interface NotificationPreferencesCenterProps {
  categories?: NotificationCategory[];
  values?: Record<string, boolean>;
  onChange?: (categoryId: string, channelId: string, enabled: boolean) => void;
  onSave?: (values: Record<string, boolean>) => void | Promise<void>;
  onReset?: () => void;
  saving?: boolean;
  className?: string;
}

const defaultCategories: NotificationCategory[] = [
  {
    id: "product",
    title: "Product updates",
    description: "News about features, improvements, and product changes.",
    channels: [
      { id: "email", label: "Email", description: "Receive updates via email" },
      { id: "push", label: "Push notifications", description: "Browser and mobile push notifications" },
      { id: "inapp", label: "In-app", description: "Show within the application" },
    ],
  },
  {
    id: "account",
    title: "Account activity",
    description: "Security alerts, sign-ins, and important account changes.",
    channels: [
      { id: "email", label: "Email", description: "Receive alerts via email" },
      { id: "push", label: "Push notifications", description: "Browser and mobile push notifications" },
      { id: "sms", label: "SMS", description: "Text messages to your phone" },
    ],
  },
  {
    id: "social",
    title: "Social activity",
    description: "Mentions, comments, and interactions from other users.",
    channels: [
      { id: "email", label: "Email", description: "Receive social notifications via email" },
      { id: "push", label: "Push notifications", description: "Browser and mobile push notifications" },
      { id: "inapp", label: "In-app", description: "Show within the application" },
    ],
  },
  {
    id: "marketing",
    title: "Marketing & promotions",
    description: "Special offers, tips, and promotional content.",
    channels: [
      { id: "email", label: "Email", description: "Marketing emails and newsletters" },
      { id: "push", label: "Push notifications", description: "Promotional push notifications" },
    ],
  },
];

function NotificationPreferencesCenter({
  categories = defaultCategories,
  values,
  onChange,
  onSave,
  onReset,
  saving = false,
  className,
  ref,
}: NotificationPreferencesCenterProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [localValues, setLocalValues] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    categories.forEach((cat) => {
      cat.channels.forEach((channel) => {
        const key = `${cat.id}_${channel.id}`;
        initial[key] = values?.[key] ?? true;
      });
    });
    return initial;
  });

  const [hasChanges, setHasChanges] = React.useState(false);

  const getValue = (categoryId: string, channelId: string) => {
    const key = `${categoryId}_${channelId}`;
    return values?.[key] ?? localValues[key] ?? true;
  };

  const handleChange = (categoryId: string, channelId: string, enabled: boolean) => {
    const key = `${categoryId}_${channelId}`;
    if (values === undefined) {
      setLocalValues((prev) => ({ ...prev, [key]: enabled }));
    }
    setHasChanges(true);
    onChange?.(categoryId, channelId, enabled);
  };

  const handleSave = async () => {
    if (values === undefined) {
      await onSave?.(localValues);
    } else {
      await onSave?.(values);
    }
    setHasChanges(false);
  };

  const handleReset = () => {
    const initial: Record<string, boolean> = {};
    categories.forEach((cat) => {
      cat.channels.forEach((channel) => {
        const key = `${cat.id}_${channel.id}`;
        initial[key] = true;
      });
    });
    setLocalValues(initial);
    setHasChanges(false);
    onReset?.();
  };

  const allEnabled = React.useMemo(() => {
    return categories.every((cat) =>
      cat.channels.every((ch) => getValue(cat.id, ch.id))
    );
  }, [categories, localValues, values]);

  const handleToggleAll = (enabled: boolean) => {
    const newValues: Record<string, boolean> = {};
    categories.forEach((cat) => {
      cat.channels.forEach((channel) => {
        const key = `${cat.id}_${channel.id}`;
        newValues[key] = enabled;
      });
    });
    if (values === undefined) {
      setLocalValues(newValues);
    }
    setHasChanges(true);
    // Notify for each change
    categories.forEach((cat) => {
      cat.channels.forEach((channel) => {
        onChange?.(cat.id, channel.id, enabled);
      });
    });
  };

  return (
    <div ref={ref} className={cn("space-y-6", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Notification preferences</h3>
          <p className="text-sm text-muted-foreground">
            Choose how and when you want to be notified.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset} disabled={saving}>
            Reset to defaults
          </Button>
          <Button size="sm" onClick={handleSave} disabled={saving || !hasChanges}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between rounded-lg border bg-card p-4">
        <div>
          <p className="font-medium">Enable all notifications</p>
          <p className="text-sm text-muted-foreground">
            Turn on all notification channels across all categories.
          </p>
        </div>
        <Switch
          checked={allEnabled}
          onCheckedChange={handleToggleAll}
          aria-label="Enable all notifications"
        />
      </div>

      <div className="space-y-4">
        {categories.map((category, categoryIndex) => (
          <Card key={category.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">{category.title}</CardTitle>
              {category.description && (
                <CardDescription>{category.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.channels.map((channel, channelIndex) => (
                  <div key={channel.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-0.5">
                        <Label
                          htmlFor={`${category.id}_${channel.id}`}
                          className="text-sm font-medium"
                        >
                          {channel.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">{channel.description}</p>
                      </div>
                      <Switch
                        id={`${category.id}_${channel.id}`}
                        checked={getValue(category.id, channel.id)}
                        onCheckedChange={(checked) =>
                          handleChange(category.id, channel.id, checked)
                        }
                        aria-label={`${category.title} - ${channel.label}`}
                      />
                    </div>
                    {channelIndex < category.channels.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(onSave || onReset) && (
        <>
          <Separator />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleReset} disabled={saving}>
              Reset
            </Button>
            <Button onClick={handleSave} disabled={saving || !hasChanges}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

NotificationPreferencesCenter.displayName = "NotificationPreferencesCenter";

export { NotificationPreferencesCenter };
