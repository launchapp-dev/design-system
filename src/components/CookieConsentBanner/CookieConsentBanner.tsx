import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Button } from "../Button";

export interface CookieConsentBannerCategory {
  id: string;
  name: string;
  description: string;
  required?: boolean;
  enabled: boolean;
}

export interface CookieConsentBannerProps {
  visible?: boolean;
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  onCustomize?: (preferences: Record<string, boolean>) => void;
  categories?: CookieConsentBannerCategory[];
  title?: string;
  description?: string;
  position?: "bottom" | "top";
  className?: string;
}

const BANNER_DEFAULT_CATEGORIES: CookieConsentBannerCategory[] = [
  {
    id: "essential",
    name: "Essential",
    description: "Required for the site to function. Cannot be disabled.",
    required: true,
    enabled: true,
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Help us understand how visitors use our site anonymously.",
    required: false,
    enabled: false,
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Used to show relevant ads and track ad campaign effectiveness.",
    required: false,
    enabled: false,
  },
];

const cookieConsentBannerVariants = cva(
  [
    "fixed left-0 right-0 z-50 w-full",
    "border-[hsl(var(--la-border))] bg-[hsl(var(--la-background))]",
    "shadow-lg",
  ],
  {
    variants: {
      position: {
        bottom: "bottom-0 border-t",
        top: "top-0 border-b",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  }
);

function CookieConsentBanner({
  visible = true,
  onAcceptAll,
  onRejectAll,
  onCustomize,
  categories = BANNER_DEFAULT_CATEGORIES,
  title = "We value your privacy",
  description = "We use cookies to enhance your browsing experience, serve personalised content, and analyse site traffic. Choose which cookies you accept below.",
  position = "bottom",
  className,
}: CookieConsentBannerProps) {
  const [showCustomize, setShowCustomize] = React.useState(false);
  const [preferences, setPreferences] = React.useState<Record<string, boolean>>(
    () => Object.fromEntries(categories.map((c) => [c.id, c.enabled]))
  );

  React.useEffect(() => {
    setPreferences(Object.fromEntries(categories.map((c) => [c.id, c.enabled])));
  }, [categories]);

  if (!visible) return null;

  function handleToggle(id: string, checked: boolean) {
    setPreferences((prev) => ({ ...prev, [id]: checked }));
  }

  function handleAcceptAll() {
    const all = Object.fromEntries(categories.map((c) => [c.id, true]));
    setPreferences(all);
    onAcceptAll?.();
  }

  function handleRejectAll() {
    const required = Object.fromEntries(
      categories.map((c) => [c.id, c.required === true])
    );
    setPreferences(required);
    onRejectAll?.();
  }

  function handleSaveCustom() {
    onCustomize?.(preferences);
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className={cn(cookieConsentBannerVariants({ position }), className)}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {!showCustomize ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[hsl(var(--la-foreground))]">
                {title}
              </p>
              <p className="mt-1 text-sm text-[hsl(var(--la-muted-foreground))]">
                {description}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCustomize(true)}
              >
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
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[hsl(var(--la-foreground))]">
                Cookie Preferences
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCustomize(false)}
                aria-label="Back to cookie banner"
              >
                Back
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-start justify-between gap-3 rounded-lg border border-[hsl(var(--la-border))] p-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-[hsl(var(--la-foreground))]">
                        {category.name}
                      </span>
                      {category.required && (
                        <span className="rounded-full bg-[hsl(var(--la-muted))] px-1.5 py-0.5 text-[10px] text-[hsl(var(--la-muted-foreground))]">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-[hsl(var(--la-muted-foreground))]">
                      {category.description}
                    </p>
                  </div>
                  <SwitchPrimitive.Root
                    checked={preferences[category.id] ?? category.enabled}
                    onCheckedChange={(checked) => handleToggle(category.id, checked)}
                    disabled={category.required}
                    aria-label={`${category.name} cookies`}
                    className={cn(
                      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
                      "transition-colors focus-visible:outline-none focus-visible:ring-2",
                      "focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2",
                      "focus-visible:ring-offset-[hsl(var(--la-background))]",
                      "disabled:cursor-not-allowed disabled:opacity-50",
                      "data-[state=checked]:bg-[hsl(var(--la-primary))]",
                      "data-[state=unchecked]:bg-[hsl(var(--la-input))]"
                    )}
                  >
                    <SwitchPrimitive.Thumb
                      className={cn(
                        "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform",
                        "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
                      )}
                    />
                  </SwitchPrimitive.Root>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={handleRejectAll}>
                Reject All
              </Button>
              <Button size="sm" onClick={handleSaveCustom}>
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

CookieConsentBanner.displayName = "CookieConsentBanner";

export { CookieConsentBanner, BANNER_DEFAULT_CATEGORIES, cookieConsentBannerVariants };
