import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Switch } from "@/components/Switch";
import { Separator } from "@/components/Separator";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export interface PrivacyToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  onChange: (id: string, enabled: boolean) => void;
}

export interface PrivacySettingsProps extends React.HTMLAttributes<HTMLDivElement> {
  toggles?: PrivacyToggle[];
  onExportData?: () => void;
  onDeleteAccount?: () => void;
}

const PrivacySettings = React.forwardRef<HTMLDivElement, PrivacySettingsProps>(
  (
    {
      toggles = [],
      onExportData,
      onDeleteAccount,
      className,
      ...props
    },
    ref,
  ) => {
    const defaultToggles: PrivacyToggle[] = toggles.length
      ? toggles
      : [
          { id: "analytics", label: "Usage analytics", description: "Help us improve by sharing anonymous usage data.", enabled: true, onChange: () => {} },
          { id: "marketing", label: "Marketing emails", description: "Receive updates about new features and offers.", enabled: false, onChange: () => {} },
          { id: "crash", label: "Crash reports", description: "Automatically send crash reports to help fix issues.", enabled: true, onChange: () => {} },
          { id: "profile", label: "Public profile", description: "Make your profile visible to others.", enabled: false, onChange: () => {} },
        ];

    return (
      <div ref={ref} className={cn("space-y-8", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Data & Privacy</CardTitle>
            <CardDescription>Control how we use your data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {defaultToggles.map((toggle, index) => (
              <React.Fragment key={toggle.id}>
                {index > 0 && <Separator />}
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">{toggle.label}</p>
                    <p className="text-xs text-muted-foreground">{toggle.description}</p>
                  </div>
                  <Switch
                    checked={toggle.enabled}
                    onCheckedChange={(checked) => toggle.onChange(toggle.id, checked)}
                    aria-label={toggle.label}
                  />
                </div>
              </React.Fragment>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Export your data</CardTitle>
            <CardDescription>Download a copy of all your data.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" onClick={onExportData}>
              Request data export
            </Button>
          </CardContent>
        </Card>

        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Delete account</CardTitle>
            <CardDescription>Permanently remove your account and all associated data.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" size="sm" onClick={onDeleteAccount}>
              Delete account
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  },
);
PrivacySettings.displayName = "PrivacySettings";

export { PrivacySettings };