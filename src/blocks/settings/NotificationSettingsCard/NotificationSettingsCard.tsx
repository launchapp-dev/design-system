import type * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Switch } from "@/components/Switch";
import { Separator } from "@/components/Separator";

export interface NotificationChannelSetting {
  id: string;
  channel: "email" | "push" | "sms" | "in_app";
  label: string;
  enabled: boolean;
}

export interface NotificationGroupSetting {
  id: string;
  label: string;
  description?: string;
  channels: NotificationChannelSetting[];
}

export interface NotificationSettingsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  groups: NotificationGroupSetting[];
  title?: string;
  description?: string;
  onChannelToggle?: (groupId: string, channelId: string, enabled: boolean) => void;
  onGroupToggle?: (groupId: string, enabled: boolean) => void;
}

const channelIcons = {
  email: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  push: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3.64v16.72a2 2 0 0 0 1.1 1.79l.9.55.9-.55A2 2 0 0 0 18 20.36V3.64a2 2 0 0 0-1.1-1.79l-.9-.55z" />
    </svg>
  ),
  sms: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.22 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  in_app: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
};

const channelLabels = {
  email: "Email",
  push: "Push",
  sms: "SMS",
  in_app: "In-app",
};

function NotificationSettingsCard({
  groups,
  title = "Notification Preferences",
  description = "Choose how you want to be notified about updates and activity.",
  onChannelToggle,
  onGroupToggle,
  className,
  ...props
}: NotificationSettingsCardProps) {
  return (
    <Card ref={null} className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="mt-1">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {groups.map((group, groupIndex) => {
          const allEnabled = group.channels.every((c) => c.enabled);
          const _someEnabled = group.channels.some((c) => c.enabled);

          return (
            <div key={group.id}>
              {groupIndex > 0 && <Separator className="mb-6" />}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-medium text-sm">{group.label}</p>
                  {group.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{group.description}</p>
                  )}
                </div>
                <Switch
                  checked={allEnabled}
                  onCheckedChange={(checked) => onGroupToggle?.(group.id, checked)}
                  aria-label={`Toggle all ${group.label} notifications`}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {group.channels.map((channel) => (
                  <div
                    key={channel.id}
                    className={cn(
                      "flex items-center justify-between rounded-lg border p-3 transition-colors",
                      channel.enabled
                        ? "border-border bg-background"
                        : "border-border bg-muted/30 opacity-60",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{channelIcons[channel.channel]}</span>
                      <span className="text-sm">{channelLabels[channel.channel]}</span>
                    </div>
                    <Switch
                      checked={channel.enabled}
                      onCheckedChange={(checked) =>
                        onChannelToggle?.(group.id, channel.id, checked)
                      }
                      aria-label={`Toggle ${channelLabels[channel.channel]} for ${group.label}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

NotificationSettingsCard.displayName = "NotificationSettingsCard";

export { NotificationSettingsCard };
