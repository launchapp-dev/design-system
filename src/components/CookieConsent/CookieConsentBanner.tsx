import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../../lib/utils";
import type { CookieCategory } from "./CookieConsent";

export const LAUNCHAPP_CATEGORIES: CookieCategory[] = [
  {
    id: "essential",
    name: "Essential",
    description: "Required for the website to function correctly. These cannot be disabled.",
    required: true,
    enabled: true,
  },
  {
    id: "analytics",
    name: "Analytics",
    description:
      "Help us understand how visitors interact with our site by collecting anonymous usage data.",
    required: false,
    enabled: false,
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Used to show relevant advertisements and track campaign effectiveness.",
    required: false,
    enabled: false,
  },
];

export interface CookieConsentBannerProps {
  show: boolean;
  onConsent: (preferences: Record<string, boolean>) => void;
  categories?: CookieCategory[];
  policyHref?: string;
}

function CookieConsentBanner({
  show,
  onConsent,
  categories = LAUNCHAPP_CATEGORIES,
  policyHref = "/cookie-policy",
}: CookieConsentBannerProps) {
  const [visible, setVisible] = React.useState(false);
  const [showCustomize, setShowCustomize] = React.useState(false);
  const [prefs, setPrefs] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(categories.map((c) => [c.id, c.enabled])),
  );

  React.useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, [show]);

  function save(preferences: Record<string, boolean>) {
    onConsent(preferences);
    setVisible(false);
  }

  function handleAcceptAll() {
    save(Object.fromEntries(categories.map((c) => [c.id, true])));
  }

  function handleRejectAll() {
    save(Object.fromEntries(categories.map((c) => [c.id, c.required === true])));
  }

  function handleSaveCustom() {
    save({
      ...prefs,
      ...Object.fromEntries(categories.filter((c) => c.required).map((c) => [c.id, true])),
    });
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
    >
      <div
        className={cn(
          "mx-auto max-w-2xl rounded-xl p-6",
          "border border-border bg-background shadow-2xl",
        )}
      >
        <h2 className="text-base font-semibold text-foreground">
          Cookie Preferences
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          We use cookies to enhance your experience and analyse our traffic. Choose which cookies
          you allow us to use.{" "}
          <a href={policyHref} className="underline hover:text-foreground">
            Cookie Policy
          </a>
        </p>

        {showCustomize && (
          <div className="mt-4 space-y-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className={cn(
                  "flex flex-col sm:flex-row items-start justify-between gap-4 rounded-lg p-3",
                  "border border-border",
                )}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {category.name}
                    </span>
                    {category.required && (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs",
                          "bg-muted text-muted-foreground",
                        )}
                      >
                        Required
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <SwitchPrimitive.Root
                  checked={prefs[category.id] ?? category.enabled}
                  onCheckedChange={(checked) => setPrefs((p) => ({ ...p, [category.id]: checked }))}
                  disabled={category.required}
                  aria-label={`${category.name} cookies`}
                  className={cn(
                    "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
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
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {showCustomize ? (
            <>
              <button
                type="button"
                onClick={handleSaveCustom}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  "bg-primary text-primary-foreground",
                  "hover:opacity-90",
                )}
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                  "border-border text-foreground",
                  "hover:bg-muted",
                )}
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleRejectAll}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                  "border-border text-foreground",
                  "hover:bg-muted",
                )}
              >
                Reject All
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleAcceptAll}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  "bg-primary text-primary-foreground",
                  "hover:opacity-90",
                )}
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleRejectAll}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                  "border-border text-foreground",
                  "hover:bg-muted",
                )}
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={() => setShowCustomize(true)}
                className="text-sm text-muted-foreground underline hover:text-foreground"
              >
                Customize
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

CookieConsentBanner.displayName = "CookieConsentBanner";
export { CookieConsentBanner };

export interface CookieSettingsButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

function CookieSettingsButton({
  onClick,
  children = "Cookie Settings",
  className,
}: CookieSettingsButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-sm text-muted-foreground hover:text-foreground transition-colors",
        className,
      )}
    >
      {children}
    </button>
  );
}

CookieSettingsButton.displayName = "CookieSettingsButton";
export { CookieSettingsButton };
