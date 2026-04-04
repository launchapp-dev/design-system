import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../../lib/utils";
import { Button } from "../Button";

const COOKIE_NAME = "la-cookie-consent";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

export type ConsentCategory = "essential" | "functional" | "analytics" | "marketing";

export interface CookieCategory {
  id: ConsentCategory;
  name: string;
  description: string;
  required?: boolean;
  enabled: boolean;
}

export type ConsentPreferences = Record<ConsentCategory, boolean>;

export interface CookieConsentProps {
  categories?: CookieCategory[];
  privacyPolicyUrl?: string;
  onConsentChange?: (preferences: ConsentPreferences) => void;
  bannerTitle?: string;
  bannerDescription?: string;
  preferencesTitle?: string;
  preferencesDescription?: string;
  cookieName?: string;
  cookieMaxAge?: number;
}

export interface CookieBannerProps {
  title?: string;
  description?: string;
  privacyPolicyUrl?: string;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onOpenPreferences: () => void;
}

export interface CookiePreferencesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: CookieCategory[];
  preferences: ConsentPreferences;
  onToggle: (id: ConsentCategory, checked: boolean) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSave: () => void;
  title?: string;
  description?: string;
}

interface CookieConsentContextValue {
  consent: ConsentPreferences | null;
  hasConsented: boolean;
  showBanner: boolean;
  showPreferences: boolean;
  setShowPreferences: (show: boolean) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: ConsentPreferences) => void;
  hasConsent: (category: ConsentCategory) => boolean;
}

const CookieConsentContext = React.createContext<CookieConsentContextValue | null>(null);

const DEFAULT_CATEGORIES: CookieCategory[] = [
  {
    id: "essential",
    name: "Essential",
    description:
      "Cookies required for the website to function properly. These cannot be disabled.",
    required: true,
    enabled: true,
  },
  {
    id: "functional",
    name: "Functional",
    description:
      "Allow the website to remember choices you make, such as language or region, for a more personalised experience.",
    required: false,
    enabled: false,
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
];

function readConsentCookie(name: string): ConsentPreferences | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

function writeConsentCookie(
  name: string,
  preferences: ConsentPreferences,
  maxAge: number,
): void {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(preferences));
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function getDefaultPreferences(categories: CookieCategory[]): ConsentPreferences {
  return Object.fromEntries(
    categories.map((c) => [c.id, c.enabled]),
  ) as ConsentPreferences;
}

function getAcceptAllPreferences(categories: CookieCategory[]): ConsentPreferences {
  return Object.fromEntries(
    categories.map((c) => [c.id, true]),
  ) as ConsentPreferences;
}

function getRejectAllPreferences(categories: CookieCategory[]): ConsentPreferences {
  return Object.fromEntries(
    categories.map((c) => [c.id, c.required === true]),
  ) as ConsentPreferences;
}

function CookieBanner({
  title = "We use cookies",
  description = "We use cookies to enhance your browsing experience, serve personalised content, and analyse our traffic. Please choose your cookie preferences.",
  privacyPolicyUrl,
  onAcceptAll,
  onRejectAll,
  onOpenPreferences,
}: CookieBannerProps) {
  return (
    <div
      role="dialog"
      aria-label={title}
      aria-live="polite"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-[hsl(var(--la-border))] bg-[hsl(var(--la-background))] p-4 shadow-lg",
        "animate-in slide-in-from-bottom-full duration-300",
        "sm:p-6",
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold text-[hsl(var(--la-foreground))]">
            {title}
          </h2>
          <p className="mt-1 text-sm text-[hsl(var(--la-muted-foreground))]">
            {description}
            {privacyPolicyUrl && (
              <>
                {" "}
                <a
                  href={privacyPolicyUrl}
                  className="underline underline-offset-4 hover:text-[hsl(var(--la-foreground))]"
                >
                  Privacy Policy
                </a>
              </>
            )}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button variant="outline" size="sm" onClick={onOpenPreferences}>
            Manage Preferences
          </Button>
          <Button variant="outline" size="sm" onClick={onRejectAll}>
            Reject All
          </Button>
          <Button size="sm" onClick={onAcceptAll}>
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}

CookieBanner.displayName = "CookieBanner";

function CookiePreferences({
  open,
  onOpenChange,
  categories,
  preferences,
  onToggle,
  onAcceptAll,
  onRejectAll,
  onSave,
  title = "Cookie Preferences",
  description = "We use cookies to enhance your browsing experience and analyse our traffic. Please choose which cookies you are happy for us to use.",
}: CookiePreferencesProps) {
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
            "w-full max-w-lg max-h-[90vh] overflow-y-auto",
            "rounded-lg border border-[hsl(var(--la-border))] bg-[hsl(var(--la-background))] shadow-lg",
            "p-6",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
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
                        Always on
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-[hsl(var(--la-muted-foreground))]">
                    {category.description}
                  </p>
                </div>
                <SwitchPrimitive.Root
                  checked={preferences[category.id] ?? category.enabled}
                  onCheckedChange={(checked) => onToggle(category.id, checked)}
                  disabled={category.required}
                  aria-label={`${category.name} cookies`}
                  className={cn(
                    "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
                    "transition-colors focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-[hsl(var(--la-background))]",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "data-[state=checked]:bg-[hsl(var(--la-primary))]",
                    "data-[state=unchecked]:bg-[hsl(var(--la-input))]",
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

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={onRejectAll}>
              Reject All
            </Button>
            <Button variant="outline" onClick={onSave}>
              Save Preferences
            </Button>
            <Button onClick={onAcceptAll}>Accept All</Button>
          </div>

          <DialogPrimitive.Close
            className={cn(
              "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[hsl(var(--la-background))]",
              "transition-opacity hover:opacity-100",
              "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))] focus:ring-offset-2",
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
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

CookiePreferences.displayName = "CookiePreferences";

function CookieConsentProvider({
  categories = DEFAULT_CATEGORIES,
  privacyPolicyUrl,
  onConsentChange,
  bannerTitle,
  bannerDescription,
  preferencesTitle,
  preferencesDescription,
  cookieName = COOKIE_NAME,
  cookieMaxAge = COOKIE_MAX_AGE,
  children,
}: CookieConsentProps & { children: React.ReactNode }) {
  const [consent, setConsent] = React.useState<ConsentPreferences | null>(() =>
    readConsentCookie(cookieName),
  );
  const [showBanner, setShowBanner] = React.useState(() => !readConsentCookie(cookieName));
  const [showPreferences, setShowPreferences] = React.useState(false);
  const [draftPreferences, setDraftPreferences] = React.useState<ConsentPreferences>(
    () => consent ?? getDefaultPreferences(categories),
  );

  const persist = React.useCallback(
    (prefs: ConsentPreferences) => {
      writeConsentCookie(cookieName, prefs, cookieMaxAge);
      setConsent(prefs);
      setShowBanner(false);
      setShowPreferences(false);
      onConsentChange?.(prefs);
    },
    [cookieName, cookieMaxAge, onConsentChange],
  );

  const acceptAll = React.useCallback(() => {
    const prefs = getAcceptAllPreferences(categories);
    setDraftPreferences(prefs);
    persist(prefs);
  }, [categories, persist]);

  const rejectAll = React.useCallback(() => {
    const prefs = getRejectAllPreferences(categories);
    setDraftPreferences(prefs);
    persist(prefs);
  }, [categories, persist]);

  const savePreferences = React.useCallback(
    (prefs: ConsentPreferences) => {
      setDraftPreferences(prefs);
      persist(prefs);
    },
    [persist],
  );

  const hasConsent = React.useCallback(
    (category: ConsentCategory): boolean => {
      if (!consent) return false;
      return consent[category] === true;
    },
    [consent],
  );

  const handleToggle = React.useCallback(
    (id: ConsentCategory, checked: boolean) => {
      setDraftPreferences((prev) => ({ ...prev, [id]: checked }));
    },
    [],
  );

  const handleSave = React.useCallback(() => {
    persist(draftPreferences);
  }, [draftPreferences, persist]);

  const handleAcceptAllFromModal = React.useCallback(() => {
    acceptAll();
  }, [acceptAll]);

  const handleRejectAllFromModal = React.useCallback(() => {
    rejectAll();
  }, [rejectAll]);

  const handleOpenPreferences = React.useCallback(() => {
    setDraftPreferences(consent ?? getDefaultPreferences(categories));
    setShowPreferences(true);
  }, [consent, categories]);

  const contextValue = React.useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      hasConsented: consent !== null,
      showBanner,
      showPreferences,
      setShowPreferences: handleOpenPreferences,
      acceptAll,
      rejectAll,
      savePreferences,
      hasConsent,
    }),
    [consent, showBanner, showPreferences, handleOpenPreferences, acceptAll, rejectAll, savePreferences, hasConsent],
  );

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
      {showBanner && (
        <CookieBanner
          title={bannerTitle}
          description={bannerDescription}
          privacyPolicyUrl={privacyPolicyUrl}
          onAcceptAll={acceptAll}
          onRejectAll={rejectAll}
          onOpenPreferences={handleOpenPreferences}
        />
      )}
      <CookiePreferences
        open={showPreferences}
        onOpenChange={(open) => {
          if (!open) setShowPreferences(false);
        }}
        categories={categories}
        preferences={draftPreferences}
        onToggle={handleToggle}
        onAcceptAll={handleAcceptAllFromModal}
        onRejectAll={handleRejectAllFromModal}
        onSave={handleSave}
        title={preferencesTitle}
        description={preferencesDescription}
      />
    </CookieConsentContext.Provider>
  );
}

CookieConsentProvider.displayName = "CookieConsentProvider";

function useCookieConsent(): CookieConsentContextValue {
  const context = React.useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}

interface ConsentGateProps {
  category: ConsentCategory;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function ConsentGate({ category, children, fallback = null }: ConsentGateProps) {
  const { hasConsent } = useCookieConsent();
  return <>{hasConsent(category) ? children : fallback}</>;
}

ConsentGate.displayName = "ConsentGate";

interface ConsentScriptProps {
  category: ConsentCategory;
  src?: string;
  children?: string;
  strategy?: "afterInteractive" | "lazyOnload";
}

function ConsentScript({ category, src, children, strategy = "afterInteractive" }: ConsentScriptProps) {
  const { hasConsent } = useCookieConsent();
  const allowed = hasConsent(category);
  const injectedRef = React.useRef(false);

  React.useEffect(() => {
    if (!allowed || injectedRef.current) return;
    injectedRef.current = true;

    const inject = () => {
      const script = document.createElement("script");
      if (src) {
        script.src = src;
        script.async = true;
      } else if (children) {
        script.textContent = children;
      }
      document.head.appendChild(script);
    };

    if (strategy === "lazyOnload") {
      if (document.readyState === "complete") {
        inject();
      } else {
        window.addEventListener("load", inject, { once: true });
        return () => window.removeEventListener("load", inject);
      }
    } else {
      inject();
    }
  }, [allowed, src, children, strategy]);

  return null;
}

ConsentScript.displayName = "ConsentScript";

export {
  CookieBanner,
  CookiePreferences,
  CookieConsentProvider,
  ConsentGate,
  ConsentScript,
  useCookieConsent,
  DEFAULT_CATEGORIES,
  COOKIE_NAME,
};
