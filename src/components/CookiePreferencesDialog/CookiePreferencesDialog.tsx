import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";
import { Button } from "../Button";

export interface CookiePreferenceCategory {
  id: string;
  name: string;
  description: string;
  required?: boolean;
  enabled: boolean;
  details?: string;
}

export interface CookiePreferencesDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: (preferences: Record<string, boolean>) => void;
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  categories?: CookiePreferenceCategory[];
  title?: string;
  description?: string;
  privacyPolicyUrl?: string;
  className?: string;
}

const PREFERENCES_DEFAULT_CATEGORIES: CookiePreferenceCategory[] = [
  {
    id: "essential",
    name: "Essential",
    description: "Strictly necessary cookies that enable core site functionality.",
    details:
      "These cookies are required for the website to operate and cannot be switched off. They include session management, authentication tokens, and security features.",
    required: true,
    enabled: true,
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Help us measure and improve our service.",
    details:
      "We use analytics cookies to understand how visitors interact with our website. All data is anonymised and aggregated. We use tools such as Google Analytics and PostHog.",
    required: false,
    enabled: false,
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Personalised ads and retargeting.",
    details:
      "Marketing cookies are used to track visitors across websites to allow publishers to display relevant and engaging advertisements. These may be set by our advertising partners.",
    required: false,
    enabled: false,
  },
  {
    id: "preferences",
    name: "Preferences",
    description: "Remember your site settings and personalisation choices.",
    details:
      "Preference cookies allow the website to remember information that changes the way the site behaves or looks, such as your preferred language or region.",
    required: false,
    enabled: false,
  },
];

function CookiePreferencesDialog({
  open,
  onOpenChange,
  onSave,
  onAcceptAll,
  onRejectAll,
  categories = PREFERENCES_DEFAULT_CATEGORIES,
  title = "Privacy Preferences",
  description = "Manage your cookie preferences. You can enable or disable the following types of cookies and learn more about each.",
  privacyPolicyUrl,
  className,
}: CookiePreferencesDialogProps) {
  const [preferences, setPreferences] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(categories.map((c) => [c.id, c.enabled])),
  );
  const [activeTab, setActiveTab] = React.useState(categories[0]?.id ?? "");

  React.useEffect(() => {
    setPreferences(Object.fromEntries(categories.map((c) => [c.id, c.enabled])));
  }, [categories]);

  function handleToggle(id: string, checked: boolean) {
    setPreferences((prev) => ({ ...prev, [id]: checked }));
  }

  function handleAcceptAll() {
    const all = Object.fromEntries(categories.map((c) => [c.id, true]));
    setPreferences(all);
    onAcceptAll?.();
    onOpenChange?.(false);
  }

  function handleRejectAll() {
    const required = Object.fromEntries(categories.map((c) => [c.id, c.required === true]));
    setPreferences(required);
    onRejectAll?.();
    onOpenChange?.(false);
  }

  function handleSave() {
    onSave?.(preferences);
    onOpenChange?.(false);
  }

  const _activeCategory = categories.find((c) => c.id === activeTab);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/50",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]",
            "w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col",
            "rounded-lg border border-border bg-background shadow-xl",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            className,
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-border p-6 pb-4">
            <div>
              <DialogPrimitive.Title className="text-lg font-semibold text-foreground">
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-1.5 text-sm text-muted-foreground">
                {description}
                {privacyPolicyUrl && (
                  <>
                    {" "}
                    <a
                      href={privacyPolicyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline"
                    >
                      Privacy Policy
                    </a>
                  </>
                )}
              </DialogPrimitive.Description>
            </div>
            <DialogPrimitive.Close
              className={cn(
                "ml-4 shrink-0 rounded-sm opacity-70 ring-offset-background",
                "transition-opacity hover:opacity-100",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:pointer-events-none",
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>

          {/* Body — tabbed layout */}
          <div className="flex min-h-0 flex-1 overflow-hidden">
            <TabsPrimitive.Root
              value={activeTab}
              onValueChange={setActiveTab}
              orientation="vertical"
              className="flex min-h-0 flex-1"
            >
              {/* Tab list (sidebar) */}
              <TabsPrimitive.List
                aria-label="Cookie categories"
                className="flex w-44 shrink-0 flex-col gap-1 border-r border-border p-3"
              >
                {categories.map((category) => (
                  <TabsPrimitive.Trigger
                    key={category.id}
                    value={category.id}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm",
                      "transition-colors",
                      "hover:bg-muted",
                      "data-[state=active]:bg-muted data-[state=active]:font-medium",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    )}
                  >
                    <span className="truncate text-foreground">
                      {category.name}
                    </span>
                    {category.required && (
                      <span className="ml-1 shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        On
                      </span>
                    )}
                  </TabsPrimitive.Trigger>
                ))}
              </TabsPrimitive.List>

              {/* Tab panels */}
              <div className="flex-1 overflow-y-auto p-6">
                {categories.map((category) => (
                  <TabsPrimitive.Content
                    key={category.id}
                    value={category.id}
                    className="space-y-4 focus-visible:outline-none"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-medium text-foreground">
                          {category.name} Cookies
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                      <SwitchPrimitive.Root
                        checked={preferences[category.id] ?? category.enabled}
                        onCheckedChange={(checked) => handleToggle(category.id, checked)}
                        disabled={category.required}
                        aria-label={`${category.name} cookies`}
                        className={cn(
                          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
                          "transition-colors focus-visible:outline-none focus-visible:ring-2",
                          "focus-visible:ring-ring focus-visible:ring-offset-2",
                          "focus-visible:ring-offset-background",
                          "disabled:cursor-not-allowed disabled:opacity-50",
                          "data-[state=checked]:bg-primary",
                          "data-[state=unchecked]:bg-input",
                        )}
                      >
                        <SwitchPrimitive.Thumb
                          className={cn(
                            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
                            "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
                          )}
                        />
                      </SwitchPrimitive.Root>
                    </div>

                    {category.required && (
                      <div className="rounded-md bg-muted px-4 py-3 text-sm text-muted-foreground">
                        These cookies are always active as they are required for the site to
                        function.
                      </div>
                    )}

                    {category.details && (
                      <p className="text-sm text-muted-foreground">
                        {category.details}
                      </p>
                    )}
                  </TabsPrimitive.Content>
                ))}
              </div>
            </TabsPrimitive.Root>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-2 border-t border-border p-4 sm:flex-row sm:justify-end">
            <Button variant="outline" size="sm" onClick={handleRejectAll}>
              Reject All
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              Save Preferences
            </Button>
            <Button size="sm" onClick={handleAcceptAll}>
              Accept All
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

CookiePreferencesDialog.displayName = "CookiePreferencesDialog";

export { CookiePreferencesDialog, PREFERENCES_DEFAULT_CATEGORIES };
