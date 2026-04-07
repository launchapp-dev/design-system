import type * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { SelectRoot, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/Select";

export interface Language {
  code: string;
  label: string;
  nativeLabel?: string;
  region?: string;
}

export interface LanguageSettingsProps extends React.HTMLAttributes<HTMLDivElement> {
  languages?: Language[];
  activeLanguageCode?: string;
  onLanguageChange?: (code: string) => void;
  dateFormats?: { id: string; label: string; example: string }[];
  activeDateFormat?: string;
  onDateFormatChange?: (id: string) => void;
  timezones?: { id: string; label: string }[];
  activeTimezone?: string;
  onTimezoneChange?: (id: string) => void;
}

function LanguageSettings({
  languages = [],
  activeLanguageCode,
  onLanguageChange,
  dateFormats = [],
  activeDateFormat,
  onDateFormatChange,
  timezones = [],
  activeTimezone,
  onTimezoneChange,
  className,
  ...props
}: LanguageSettingsProps) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {languages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Language & Region</CardTitle>
            <CardDescription>
              Choose your preferred language and regional formatting.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="language-select" className="text-sm font-medium">
                Display language
              </label>
              <SelectRoot value={activeLanguageCode} onValueChange={onLanguageChange}>
                <SelectTrigger id="language-select" className="w-full sm:w-80">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.label}
                      {lang.nativeLabel && lang.nativeLabel !== lang.label && (
                        <span className="ml-2 text-muted-foreground">{lang.nativeLabel}</span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </div>

            {dateFormats.length > 0 && (
              <div className="space-y-2">
                <label htmlFor="date-format-select" className="text-sm font-medium">
                  Date format
                </label>
                <SelectRoot value={activeDateFormat} onValueChange={onDateFormatChange}>
                  <SelectTrigger id="date-format-select" className="w-full sm:w-80">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    {dateFormats.map((fmt) => (
                      <SelectItem key={fmt.id} value={fmt.id}>
                        {fmt.label}
                        <span className="ml-2 text-muted-foreground text-xs">{fmt.example}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </div>
            )}

            {timezones.length > 0 && (
              <div className="space-y-2">
                <label htmlFor="timezone-select" className="text-sm font-medium">
                  Time zone
                </label>
                <SelectRoot value={activeTimezone} onValueChange={onTimezoneChange}>
                  <SelectTrigger id="timezone-select" className="w-full sm:w-80">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.id} value={tz.id}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

LanguageSettings.displayName = "LanguageSettings";

export { LanguageSettings };
