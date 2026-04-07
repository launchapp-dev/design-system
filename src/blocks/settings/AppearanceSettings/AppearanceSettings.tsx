import type * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { Switch } from "@/components/Switch";

export interface AppearanceTheme {
  id: string;
  label: string;
  preview?: React.ReactNode;
}

export interface AppearanceFont {
  id: string;
  label: string;
  value: string;
}

export interface AppearanceSettingsProps extends React.HTMLAttributes<HTMLDivElement> {
  themes?: AppearanceTheme[];
  activeThemeId?: string;
  onThemeChange?: (themeId: string) => void;
  fonts?: AppearanceFont[];
  activeFontId?: string;
  onFontChange?: (fontId: string) => void;
  compactMode?: boolean;
  onCompactModeChange?: (enabled: boolean) => void;
  reduceMotion?: boolean;
  onReduceMotionChange?: (enabled: boolean) => void;
  animationsEnabled?: boolean;
  onAnimationsEnabledChange?: (enabled: boolean) => void;
}

function AppearanceSettings({
  themes = [],
  activeThemeId,
  onThemeChange,
  fonts = [],
  activeFontId,
  onFontChange,
  compactMode,
  onCompactModeChange,
  reduceMotion,
  onReduceMotionChange,
  animationsEnabled,
  onAnimationsEnabledChange,
  className,
  ...props
}: AppearanceSettingsProps) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {themes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Theme</CardTitle>
            <CardDescription>Choose your preferred color scheme.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {themes.map((theme) => {
                const isActive = theme.id === activeThemeId;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => onThemeChange?.(theme.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg border p-3 text-center transition-all",
                      isActive
                        ? "border-primary ring-1 ring-primary bg-primary/5"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    {theme.preview || (
                      <div className="flex h-12 w-full items-center justify-center rounded-md bg-muted text-xs font-medium">
                        {theme.label}
                      </div>
                    )}
                    <span className="text-xs font-medium">{theme.label}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {fonts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Font</CardTitle>
            <CardDescription>Choose your preferred typeface.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {fonts.map((font) => {
                const isActive = font.id === activeFontId;
                return (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => onFontChange?.(font.id)}
                    className={cn(
                      "w-full flex items-center justify-between rounded-lg border p-3 text-left transition-all",
                      isActive
                        ? "border-primary ring-1 ring-primary bg-primary/5"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <span
                      className="text-lg"
                      style={{ fontFamily: font.value }}
                    >
                      {font.label}
                    </span>
                    {isActive && (
                      <span className="text-xs font-medium text-primary">Active</span>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Display</CardTitle>
          <CardDescription>Customize how the interface looks and behaves.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {compactMode !== undefined && (
            <ToggleRow
              label="Compact mode"
              description="Reduce spacing and padding throughout the interface."
              checked={compactMode}
              onCheckedChange={onCompactModeChange}
            />
          )}

          {animationsEnabled !== undefined && (
            <ToggleRow
              label="Animations"
              description="Enable or disable UI animations and transitions."
              checked={animationsEnabled}
              onCheckedChange={onAnimationsEnabledChange}
            />
          )}

          {reduceMotion !== undefined && (
            <ToggleRow
              label="Reduce motion"
              description="Minimize animations for users who prefer reduced motion."
              checked={reduceMotion}
              onCheckedChange={onReduceMotionChange}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

AppearanceSettings.displayName = "AppearanceSettings";

export { AppearanceSettings };
