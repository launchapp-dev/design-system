import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../Button";

export type CookieConsentValue = "granted" | "denied" | "pending";

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsentBannerProps {
  open?: boolean;
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  onCustomize?: () => void;
  onSavePreferences?: (preferences: CookiePreferences) => void;
  privacyPolicyUrl?: string;
  title?: string;
  description?: string;
  className?: string;
  position?: "bottom" | "top";
  compact?: boolean;
}

const CookieConsentBanner = React.forwardRef<
  HTMLDivElement,
  CookieConsentBannerProps
>(
  (
    {
      open = true,
      onAcceptAll,
      onRejectAll,
      onCustomize,
      onSavePreferences,
      privacyPolicyUrl,
      title = "We use cookies",
      description = "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. You can choose which cookies you allow.",
      className,
      position = "bottom",
      compact = false,
    },
    ref
  ) => {
    const [showPreferences, setShowPreferences] = React.useState(false);
    const [preferences, setPreferences] = React.useState<CookiePreferences>({
      essential: true,
      analytics: false,
      marketing: false,
    });

    function handleAcceptAll() {
      const all: CookiePreferences = {
        essential: true,
        analytics: true,
        marketing: true,
      };
      onSavePreferences?.(all);
      onAcceptAll?.();
    }

    function handleRejectAll() {
      const essentialOnly: CookiePreferences = {
        essential: true,
        analytics: false,
        marketing: false,
      };
      onSavePreferences?.(essentialOnly);
      onRejectAll?.();
    }

    function handleSavePreferences() {
      onSavePreferences?.(preferences);
    }

    function handleCustomize() {
      if (onCustomize) {
        onCustomize();
      } else {
        setShowPreferences((prev) => !prev);
      }
    }

    if (!open) return null;

    return (
      <div
        ref={ref}
        role="dialog"
        aria-label={title}
        aria-describedby="cookie-banner-description"
        className={cn(
          "fixed left-0 right-0 z-50",
          position === "bottom" ? "bottom-0" : "top-0",
          "border-[hsl(var(--la-border))]",
          position === "bottom" ? "border-t" : "border-b",
          "bg-[hsl(var(--la-background))] shadow-lg",
          "animate-in",
          position === "bottom"
            ? "slide-in-from-bottom-full"
            : "slide-in-from-top-full",
          "duration-300",
          className
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-5xl px-4 py-4",
            !compact && "sm:px-6 sm:py-6"
          )}
        >
          {compact ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p
                id="cookie-banner-description"
                className="text-sm text-[hsl(var(--la-foreground))]"
              >
                {description}{" "}
                {privacyPolicyUrl && (
                  <a
                    href={privacyPolicyUrl}
                    className="underline text-[hsl(var(--la-primary))] hover:text-[hsl(var(--la-primary)/.8)]"
                  >
                    Privacy Policy
                  </a>
                )}
              </p>
              <div className="flex shrink-0 gap-2">
                <Button size="sm" variant="outline" onClick={handleRejectAll}>
                  Reject
                </Button>
                <Button size="sm" onClick={handleAcceptAll}>
                  Accept
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-semibold text-[hsl(var(--la-foreground))]">
                    {title}
                  </h2>
                  <p
                    id="cookie-banner-description"
                    className="mt-1 text-sm text-[hsl(var(--la-muted-foreground))]"
                  >
                    {description}{" "}
                    {privacyPolicyUrl && (
                      <a
                        href={privacyPolicyUrl}
                        className="underline text-[hsl(var(--la-primary))] hover:text-[hsl(var(--la-primary)/.8)]"
                      >
                        Learn more
                      </a>
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button variant="outline" size="sm" onClick={handleCustomize}>
                    Customize
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRejectAll}>
                    Reject All
                  </Button>
                  <Button size="sm" onClick={handleAcceptAll}>
                    Accept All
                  </Button>
                </div>
              </div>

              {showPreferences && !onCustomize && (
                <div className="mt-4 space-y-3 border-t border-[hsl(var(--la-border))] pt-4">
                  <PreferenceRow
                    label="Essential"
                    description="Required for the website to function. Cannot be disabled."
                    checked={true}
                    disabled={true}
                    onChange={() => {}}
                  />
                  <PreferenceRow
                    label="Analytics"
                    description="Help us understand how visitors interact with our website."
                    checked={preferences.analytics}
                    onChange={(checked) =>
                      setPreferences((prev) => ({
                        ...prev,
                        analytics: checked,
                      }))
                    }
                  />
                  <PreferenceRow
                    label="Marketing"
                    description="Used to display relevant advertisements."
                    checked={preferences.marketing}
                    onChange={(checked) =>
                      setPreferences((prev) => ({
                        ...prev,
                        marketing: checked,
                      }))
                    }
                  />
                  <div className="flex justify-end pt-2">
                    <Button size="sm" onClick={handleSavePreferences}>
                      Save Preferences
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);

CookieConsentBanner.displayName = "CookieConsentBanner";

interface PreferenceRowProps {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

function PreferenceRow({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: PreferenceRowProps) {
  const id = React.useId();
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0 flex-1">
        <label
          htmlFor={id}
          className="text-sm font-medium text-[hsl(var(--la-foreground))]"
        >
          {label}
        </label>
        <p className="text-xs text-[hsl(var(--la-muted-foreground))]">
          {description}
        </p>
      </div>
      <button
        id={id}
        role="switch"
        type="button"
        aria-checked={checked}
        aria-label={`${label} cookies`}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
          "transition-colors focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2",
          "focus-visible:ring-offset-[hsl(var(--la-background))]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          checked
            ? "bg-[hsl(var(--la-primary))]"
            : "bg-[hsl(var(--la-input))]"
        )}
      >
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}

export { CookieConsentBanner };
