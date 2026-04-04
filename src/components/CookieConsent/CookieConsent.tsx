import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../../lib/utils";
import { Button } from "../Button";

export interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required?: boolean;
  enabled: boolean;
}

export type CookieConsentState = "undecided" | "accepted" | "rejected" | "custom";

export interface CookieConsentContextValue {
  state: CookieConsentState;
  preferences: Record<string, boolean>;
  showBanner: boolean;
  showPreferences: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: Record<string, boolean>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  reset: () => void;
}

const STORAGE_KEY = "la-cookie-consent";

const CookieConsentContext = React.createContext<CookieConsentContextValue | null>(null);

function useCookieConsent(): CookieConsentContextValue {
  const ctx = React.useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return ctx;
}

const DEFAULT_CATEGORIES: CookieCategory[] = [
  {
    id: "necessary",
    name: "Necessary",
    description:
      "Essential cookies required for the website to function. These cannot be disabled.",
    required: true,
    enabled: true,
  },
  {
    id: "analytics",
    name: "Analytics",
    description:
      "Help us understand how visitors interact with our website by collecting and reporting information anonymously.",
    required: false,
    enabled: false,
  },
  {
    id: "marketing",
    name: "Marketing",
    description:
      "Used to track visitors across websites to display relevant and engaging advertisements.",
    required: false,
    enabled: false,
  },
  {
    id: "preferences",
    name: "Preferences",
    description:
      "Allow the website to remember choices you make, such as language or region, for a more personalised experience.",
    required: false,
    enabled: false,
  },
];

interface StoredConsent {
  state: CookieConsentState;
  preferences: Record<string, boolean>;
}

function readStorage(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredConsent;
  } catch {
    return null;
  }
}

function writeStorage(data: StoredConsent): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // noop
  }
}

function clearStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // noop
  }
}

export interface CookieConsentProviderProps {
  children: React.ReactNode;
  categories?: CookieCategory[];
  onConsentChange?: (state: CookieConsentState, preferences: Record<string, boolean>) => void;
}

function CookieConsentProvider({
  children,
  categories = DEFAULT_CATEGORIES,
  onConsentChange,
}: CookieConsentProviderProps) {
  const [state, setState] = React.useState<CookieConsentState>(() => {
    const stored = readStorage();
    return stored?.state ?? "undecided";
  });
  const [preferences, setPreferences] = React.useState<Record<string, boolean>>(() => {
    const stored = readStorage();
    return stored?.preferences ?? Object.fromEntries(categories.map((c) => [c.id, c.enabled]));
  });
  const [showPreferences, setShowPreferences] = React.useState(false);

  const showBanner = state === "undecided";

  const acceptAll = React.useCallback(() => {
    const all = Object.fromEntries(categories.map((c) => [c.id, true]));
    setPreferences(all);
    setState("accepted");
    setShowPreferences(false);
    writeStorage({ state: "accepted", preferences: all });
    onConsentChange?.("accepted", all);
  }, [categories, onConsentChange]);

  const rejectAll = React.useCallback(() => {
    const required = Object.fromEntries(
      categories.map((c) => [c.id, c.required === true])
    );
    setPreferences(required);
    setState("rejected");
    setShowPreferences(false);
    writeStorage({ state: "rejected", preferences: required });
    onConsentChange?.("rejected", required);
  }, [categories, onConsentChange]);

  const savePreferences = React.useCallback(
    (prefs: Record<string, boolean>) => {
      setPreferences(prefs);
      setState("custom");
      setShowPreferences(false);
      writeStorage({ state: "custom", preferences: prefs });
      onConsentChange?.("custom", prefs);
    },
    [onConsentChange]
  );

  const openPreferences = React.useCallback(() => {
    setShowPreferences(true);
  }, []);

  const closePreferences = React.useCallback(() => {
    setShowPreferences(false);
  }, []);

  const reset = React.useCallback(() => {
    const defaults = Object.fromEntries(categories.map((c) => [c.id, c.enabled]));
    setPreferences(defaults);
    setState("undecided");
    setShowPreferences(false);
    clearStorage();
    onConsentChange?.("undecided", defaults);
  }, [categories, onConsentChange]);

  const value = React.useMemo<CookieConsentContextValue>(
    () => ({
      state,
      preferences,
      showBanner,
      showPreferences,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closePreferences,
      reset,
    }),
    [
      state,
      preferences,
      showBanner,
      showPreferences,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closePreferences,
      reset,
    ]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

CookieConsentProvider.displayName = "CookieConsentProvider";

export interface CookieConsentBannerProps {
  className?: string;
  title?: string;
  description?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  customizeLabel?: string;
  showReject?: boolean;
  position?: "bottom" | "bottom-left" | "bottom-right";
}

const CookieConsentBanner = React.forwardRef<HTMLDivElement, CookieConsentBannerProps>(
  (
    {
      className,
      title = "We use cookies",
      description = "We use cookies to enhance your browsing experience and analyse our traffic. You can accept all cookies or customise your preferences.",
      acceptLabel = "Accept All",
      rejectLabel = "Reject All",
      customizeLabel = "Customize",
      showReject = true,
      position = "bottom",
    },
    ref
  ) => {
    const ctx = React.useContext(CookieConsentContext);

    const showBanner = ctx ? ctx.showBanner : true;
    const acceptAll = ctx?.acceptAll;
    const rejectAll = ctx?.rejectAll;
    const openPreferences = ctx?.openPreferences;

    if (!showBanner) return null;

    const positionClasses = {
      bottom: "inset-x-0 bottom-0",
      "bottom-left": "bottom-4 left-4 max-w-md",
      "bottom-right": "bottom-4 right-4 max-w-md",
    };

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Cookie consent"
        className={cn(
          "fixed z-50 p-4",
          positionClasses[position],
          className
        )}
      >
        <div
          className={cn(
            "rounded-lg border border-[hsl(var(--la-border))] bg-[hsl(var(--la-background))] p-6 shadow-lg",
            position === "bottom" && "mx-auto max-w-4xl"
          )}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-[hsl(var(--la-foreground))]">
                {title}
              </h3>
              <p className="mt-1 text-sm text-[hsl(var(--la-muted-foreground))]">
                {description}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              {showReject && (
                <Button variant="outline" size="sm" onClick={rejectAll}>
                  {rejectLabel}
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={openPreferences}>
                {customizeLabel}
              </Button>
              <Button size="sm" onClick={acceptAll}>
                {acceptLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CookieConsentBanner.displayName = "CookieConsentBanner";

export interface CookiePreferencesModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  onSavePreferences?: (preferences: Record<string, boolean>) => void;
  categories?: CookieCategory[];
  title?: string;
  description?: string;
}

function CookiePreferencesModal({
  open: openProp,
  onOpenChange: onOpenChangeProp,
  onAcceptAll: onAcceptAllProp,
  onRejectAll: onRejectAllProp,
  onSavePreferences: onSavePreferencesProp,
  categories = DEFAULT_CATEGORIES,
  title = "Cookie Preferences",
  description = "We use cookies to enhance your browsing experience and analyse our traffic. Please choose which cookies you are happy for us to use.",
}: CookiePreferencesModalProps) {
  const ctx = React.useContext(CookieConsentContext);

  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : (ctx?.showPreferences ?? false);
  const onOpenChange = isControlled
    ? onOpenChangeProp
    : (val: boolean) => {
        if (!val) ctx?.closePreferences();
        onOpenChangeProp?.(val);
      };

  const [localPrefs, setLocalPrefs] = React.useState<Record<string, boolean>>(
    () => ctx?.preferences ?? Object.fromEntries(categories.map((c) => [c.id, c.enabled]))
  );

  React.useEffect(() => {
    if (open) {
      setLocalPrefs(
        ctx?.preferences ?? Object.fromEntries(categories.map((c) => [c.id, c.enabled]))
      );
    }
  }, [open, ctx?.preferences, categories]);

  function handleToggle(id: string, checked: boolean) {
    setLocalPrefs((prev) => ({ ...prev, [id]: checked }));
  }

  function handleAcceptAll() {
    const all = Object.fromEntries(categories.map((c) => [c.id, true]));
    setLocalPrefs(all);
    if (ctx) {
      ctx.acceptAll();
    } else {
      onOpenChangeProp?.(false);
    }
    onAcceptAllProp?.();
  }

  function handleRejectAll() {
    const required = Object.fromEntries(
      categories.map((c) => [c.id, c.required === true])
    );
    setLocalPrefs(required);
    if (ctx) {
      ctx.rejectAll();
    } else {
      onOpenChangeProp?.(false);
    }
    onRejectAllProp?.();
  }

  function handleSave() {
    if (ctx) {
      ctx.savePreferences(localPrefs);
    } else {
      onOpenChangeProp?.(false);
    }
    onSavePreferencesProp?.(localPrefs);
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/50",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]",
            "w-full max-w-lg max-h-[90vh] overflow-y-auto",
            "rounded-lg border border-[hsl(var(--la-border))] bg-[hsl(var(--la-background))] shadow-lg",
            "p-6",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
          )}
        >
          <DialogPrimitive.Title className="text-lg font-semibold text-[hsl(var(--la-foreground))]">
            {title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-2 text-sm text-[hsl(var(--la-muted-foreground))]">
            {description}
          </DialogPrimitive.Description>

          <div className="mt-6 space-y-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-start justify-between gap-4 rounded-lg border border-[hsl(var(--la-border))] p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[hsl(var(--la-foreground))]">
                      {category.name}
                    </span>
                    {category.required && (
                      <span className="rounded-full bg-[hsl(var(--la-muted))] px-2 py-0.5 text-xs text-[hsl(var(--la-muted-foreground))]">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-[hsl(var(--la-muted-foreground))]">
                    {category.description}
                  </p>
                </div>
                <SwitchPrimitive.Root
                  checked={localPrefs[category.id] ?? category.enabled}
                  onCheckedChange={(checked) => handleToggle(category.id, checked)}
                  disabled={category.required}
                  aria-label={`${category.name} cookies`}
                  className={cn(
                    "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
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
                      "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
                      "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                    )}
                  />
                </SwitchPrimitive.Root>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={handleRejectAll}>
              Reject All
            </Button>
            <Button variant="outline" onClick={handleSave}>
              Save Preferences
            </Button>
            <Button onClick={handleAcceptAll}>Accept All</Button>
          </div>

          <DialogPrimitive.Close
            className={cn(
              "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[hsl(var(--la-background))]",
              "transition-opacity hover:opacity-100",
              "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))] focus:ring-offset-2",
              "disabled:pointer-events-none"
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
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

CookiePreferencesModal.displayName = "CookiePreferencesModal";

export type CookieConsentProps = CookiePreferencesModalProps;
const CookieConsent = CookiePreferencesModal;

export {
  CookieConsent,
  CookieConsentBanner,
  CookieConsentContext,
  CookieConsentProvider,
  CookiePreferencesModal,
  DEFAULT_CATEGORIES,
  useCookieConsent,
};
