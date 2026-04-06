import * as React from "react";
import { Switch } from "../../../components/Switch";
import { Label } from "../../../components/Label";
import { Separator } from "../../../components/Separator";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/Card";
import { CookiePreferencesDialog } from "../../../components/CookiePreferencesDialog";
import { cn } from "../../../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CookieCategoryId = "essential" | "functional" | "analytics" | "marketing";

export interface CookieCategory {
  id: CookieCategoryId;
  name: string;
  description: string;
  details?: string;
  required?: boolean;
}

export interface CookiePreferencesProps {
  /** Controlled preference values. When provided, the component is controlled. */
  values?: Record<CookieCategoryId, boolean>;
  /** Called when a single category toggle changes (uncontrolled mode). */
  onChange?: (id: CookieCategoryId, enabled: boolean) => void;
  /** Called when the user clicks "Save Preferences". Receives the full preferences map. */
  onSave?: (preferences: Record<CookieCategoryId, boolean>) => void;
  /** Called when the user clicks "Accept All". */
  onAcceptAll?: (preferences: Record<CookieCategoryId, boolean>) => void;
  /** Called when the user clicks "Reject All". */
  onRejectAll?: (preferences: Record<CookieCategoryId, boolean>) => void;
  /** Override category definitions. Useful for localisation. */
  categories?: CookieCategory[];
  /** Cookie policy / privacy policy URL surfaced in the detailed dialog. */
  privacyPolicyUrl?: string;
  className?: string;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_CATEGORIES: CookieCategory[] = [
  {
    id: "essential",
    name: "Essential",
    description: "Required for the site to function correctly. These cannot be disabled.",
    details:
      "Essential cookies enable core functionality such as session management, authentication tokens, security features, and load balancing. Without these cookies the website cannot provide its services.",
    required: true,
  },
  {
    id: "functional",
    name: "Functional",
    description: "Remember your preferences and personalisation choices.",
    details:
      "Functional cookies allow the site to remember information you have entered or choices you make (such as your preferred language, region, or theme) so we can provide a more personalised experience on return visits.",
    required: false,
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Help us understand how visitors interact with our site.",
    details:
      "Analytics cookies collect information about how you use this site — which pages you visit, how long you spend, and how you navigate between pages. All data is aggregated and anonymised. We use tools such as PostHog and Google Analytics.",
    required: false,
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Used to show relevant ads and track campaign effectiveness.",
    details:
      "Marketing cookies track your browsing activity across websites so our advertising partners can show you relevant ads. They are also used to limit how often you see an ad and to measure the effectiveness of advertising campaigns.",
    required: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

function CookiePreferences({
  values,
  onChange,
  onSave,
  onAcceptAll,
  onRejectAll,
  categories = DEFAULT_CATEGORIES,
  privacyPolicyUrl,
  className,
  ref,
}: CookiePreferencesProps & { ref?: React.Ref<HTMLDivElement> }) {
  // Local state used in uncontrolled mode.
  const [localValues, setLocalValues] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const cat of categories) {
      initial[cat.id] = !!(cat.required ?? false );
    }
    return initial;
  });

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const getChecked = (id: string): boolean => values?.[id as CookieCategoryId] ?? localValues[id] ?? false;

  const buildAll = (enabled: boolean): Record<CookieCategoryId, boolean> =>
    Object.fromEntries(
      categories.map((c) => [c.id, c.required ? true : enabled])
    ) as Record<CookieCategoryId, boolean>;

  const currentPreferences = (): Record<CookieCategoryId, boolean> =>
    Object.fromEntries(
      categories.map((c) => [c.id, getChecked(c.id)])
    ) as Record<CookieCategoryId, boolean>;

  function handleToggle(id: CookieCategoryId, checked: boolean) {
    if (!values) {
      setLocalValues((prev) => ({ ...prev, [id]: checked }));
    }
    onChange?.(id, checked);
  }

  function handleAcceptAll() {
    const prefs = buildAll(true);
    if (!values) setLocalValues(prefs);
    onAcceptAll?.(prefs);
  }

  function handleRejectAll() {
    const prefs = buildAll(false);
    if (!values) setLocalValues(prefs);
    onRejectAll?.(prefs);
  }

  function handleSave() {
    onSave?.(currentPreferences());
  }

  // Map categories to the shape expected by CookiePreferencesDialog.
  const dialogCategories = categories.map((c) => ({
    id: c.id,
    name: c.name,
    description: c.description,
    details: c.details,
    required: c.required,
    enabled: getChecked(c.id),
  }));

  return (
    <div ref={ref} className={cn("space-y-6", className)}>
      {/* Section heading */}
      <div>
        <h3 className="text-lg font-semibold text-foreground">Cookie preferences</h3>
        <p className="text-sm text-muted-foreground">
          Manage how this site uses cookies and similar tracking technologies.{" "}
          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            className="underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            View full details
          </button>
        </p>
      </div>

      <Separator />

      {/* Category cards */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Cookie categories</CardTitle>
        </CardHeader>

        <CardContent className="space-y-0">
          {categories.map((category, index) => (
            <React.Fragment key={category.id}>
              <div className="flex items-start justify-between gap-4 py-3">
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Label
                      htmlFor={`cookie-pref-${category.id}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {category.name}
                    </Label>
                    {category.required && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        Required
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </div>
                <Switch
                  id={`cookie-pref-${category.id}`}
                  checked={getChecked(category.id)}
                  onCheckedChange={(checked) => handleToggle(category.id as CookieCategoryId, checked)}
                  disabled={category.required}
                  aria-label={`${category.name} cookies`}
                />
              </div>
              {index < categories.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-end gap-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRejectAll}
          >
            Reject All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAcceptAll}
          >
            Accept All
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
          >
            Save Preferences
          </Button>
        </CardFooter>
      </Card>

      {/* Full detail dialog */}
      <CookiePreferencesDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        categories={dialogCategories}
        privacyPolicyUrl={privacyPolicyUrl}
        onSave={(prefs) => {
          // Sync dialog save back to the block state.
          if (!values) {
            setLocalValues((prev) => ({ ...prev, ...prefs }));
          }
          onSave?.(prefs as Record<CookieCategoryId, boolean>);
          setDialogOpen(false);
        }}
        onAcceptAll={() => {
          handleAcceptAll();
          setDialogOpen(false);
        }}
        onRejectAll={() => {
          handleRejectAll();
          setDialogOpen(false);
        }}
      />
    </div>
  );
}

CookiePreferences.displayName = "CookiePreferences";

export { CookiePreferences, DEFAULT_CATEGORIES as COOKIE_PREFERENCES_DEFAULT_CATEGORIES };
