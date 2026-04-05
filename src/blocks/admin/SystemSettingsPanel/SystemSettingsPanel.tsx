import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Switch } from "@/components/Switch";
import { Separator } from "@/components/Separator";

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface AppConfigField {
  id: string;
  label: string;
  type: "text" | "number" | "email" | "url";
  value: string;
  placeholder?: string;
}

export interface SystemSettingsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  appName?: string;
  appConfig?: AppConfigField[];
  featureFlags?: FeatureFlag[];
  onConfigChange?: (id: string, value: string) => void;
  onFlagToggle?: (id: string, enabled: boolean) => void;
  onSaveConfig?: (config: Record<string, string>) => void;
  onSaveFlags?: (flags: Record<string, boolean>) => void;
  onResetConfig?: () => void;
  onResetFlags?: () => void;
  saving?: boolean;
}

function SystemSettingsPanelInner(
  {
    appName = "My Application",
    appConfig = [],
    featureFlags = [],
    onConfigChange,
    onFlagToggle,
    onSaveConfig,
    onSaveFlags,
    onResetConfig,
    onResetFlags,
    saving = false,
    className,
  }: SystemSettingsPanelProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [configValues, setConfigValues] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(appConfig.map((f) => [f.id, f.value]))
  );
  const [flagStates, setFlagStates] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(featureFlags.map((f) => [f.id, f.enabled]))
  );
  const [configDirty, setConfigDirty] = React.useState(false);
  const [flagsDirty, setFlagsDirty] = React.useState(false);

  React.useEffect(() => {
    setConfigValues(Object.fromEntries(appConfig.map((f) => [f.id, f.value])));
    setFlagStates(Object.fromEntries(featureFlags.map((f) => [f.id, f.enabled])));
  }, [appConfig, featureFlags]);

  const handleConfigChange = (id: string, value: string) => {
    setConfigValues((prev) => ({ ...prev, [id]: value }));
    setConfigDirty(true);
    onConfigChange?.(id, value);
  };

  const handleFlagToggle = (id: string, enabled: boolean) => {
    setFlagStates((prev) => ({ ...prev, [id]: enabled }));
    setFlagsDirty(true);
    onFlagToggle?.(id, enabled);
  };

  const handleSaveConfig = () => {
    onSaveConfig?.(configValues);
    setConfigDirty(false);
  };

  const handleSaveFlags = () => {
    onSaveFlags?.(flagStates);
    setFlagsDirty(false);
  };

  const handleResetConfig = () => {
    setConfigValues(Object.fromEntries(appConfig.map((f) => [f.id, f.value])));
    setConfigDirty(false);
    onResetConfig?.();
  };

  const handleResetFlags = () => {
    setFlagStates(Object.fromEntries(featureFlags.map((f) => [f.id, f.enabled])));
    setFlagsDirty(false);
    onResetFlags?.();
  };

  return (
    <div ref={ref} className={cn("space-y-8", className)}>
      <div>
        <h2 className="text-xl font-semibold tracking-tight">System Settings</h2>
        <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
          Configure {appName} application settings and feature flags.
        </p>
      </div>

      {appConfig.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Application Configuration</CardTitle>
            <CardDescription>Global settings for {appName}.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {appConfig.map((field) => (
              <div key={field.id} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Label htmlFor={field.id} className="sm:pt-2">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  type={field.type}
                  value={configValues[field.id] ?? ""}
                  placeholder={field.placeholder}
                  onChange={(e) => handleConfigChange(field.id, e.target.value)}
                />
              </div>
            ))}
          </CardContent>
          <div className="flex items-center gap-2 p-4 pt-0">
            <div className="flex-1" />
            {configDirty && (
              <Button variant="outline" size="sm" onClick={handleResetConfig}>
                Reset
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleSaveConfig}
              disabled={!configDirty || saving}
              loading={saving}
            >
              Save Config
            </Button>
          </div>
        </Card>
      )}

      {featureFlags.length > 0 && (
        <>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle>Feature Flags</CardTitle>
              <CardDescription>
                Toggle features on or off for {appName}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {featureFlags.map((flag) => (
                <div key={flag.id} className="flex items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <Label htmlFor={flag.id} className="text-base font-medium">
                      {flag.name}
                    </Label>
                    <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
                      {flag.description}
                    </p>
                  </div>
                  <Switch
                    id={flag.id}
                    checked={flagStates[flag.id] ?? false}
                    onCheckedChange={(checked) => handleFlagToggle(flag.id, !!checked)}
                  />
                </div>
              ))}
            </CardContent>
            <div className="flex items-center gap-2 p-4 pt-0">
              <div className="flex-1" />
              {flagsDirty && (
                <Button variant="outline" size="sm" onClick={handleResetFlags}>
                  Reset
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleSaveFlags}
                disabled={!flagsDirty || saving}
                loading={saving}
              >
                Save Flags
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

export const SystemSettingsPanel = React.forwardRef(SystemSettingsPanelInner) as (
  props: SystemSettingsPanelProps & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

(SystemSettingsPanel as React.ForwardRefExoticComponent<SystemSettingsPanelProps>).displayName = "SystemSettingsPanel";
