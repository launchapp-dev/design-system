import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../Button";
import { Switch } from "../Switch";

export interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required?: boolean;
  defaultEnabled?: boolean;
}

export interface CookieConsentProps {
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  onSavePreferences?: (enabledCategories: string[]) => void;
  title?: string;
  description?: string;
  categories?: CookieCategory[];
  showPreferences?: boolean;
  className?: string;
}

const defaultCategories: CookieCategory[] = [
  {
    id: "essential",
    name: "Essential",
    description: "Required for the website to function properly. Cannot be disabled.",
    required: true,
    defaultEnabled: true,
  },
  {
    id: "functional",
    name: "Functional",
    description: "Enable personalized features and remember your preferences.",
    defaultEnabled: false,
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Help us understand how visitors interact with our website.",
    defaultEnabled: false,
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Used to deliver personalized advertisements.",
    defaultEnabled: false,
  },
];

const CookieConsent = ({
  onAcceptAll,
  onRejectAll,
  onSavePreferences,
  title = "We value your privacy",
  description = "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking \"Accept All\", you consent to our use of cookies.",
  categories = defaultCategories,
  showPreferences = true,
  className,
}: CookieConsentProps) => {
  const [preferences, setPreferences] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    categories.forEach((cat) => {
      initial[cat.id] = cat.defaultEnabled ?? false;
    });
    return initial;
  });
  const [showDetails, setShowDetails] = React.useState(false);

  const handleToggle = (categoryId: string, required?: boolean) => {
    if (required) return;
    setPreferences((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleAcceptAll = () => {
    const allEnabled = categories.map((cat) => cat.id);
    setPreferences(() => {
      const all: Record<string, boolean> = {};
      categories.forEach((cat) => {
        all[cat.id] = true;
      });
      return all;
    });
    onAcceptAll?.();
  };

  const handleRejectAll = () => {
    setPreferences(() => {
      const onlyEssential: Record<string, boolean> = {};
      categories.forEach((cat) => {
        onlyEssential[cat.id] = cat.required ?? false;
      });
      return onlyEssential;
    });
    onRejectAll?.();
  };

  const handleSavePreferences = () => {
    const enabled = categories.filter((cat) => preferences[cat.id]).map((cat) => cat.id);
    onSavePreferences?.(enabled);
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-background p-6 shadow-lg",
        className
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      <div className="mb-6">
        <h2 id="cookie-consent-title" className="text-lg font-semibold">
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>

      {showPreferences && (
        <div className="mb-6 space-y-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {showDetails ? "Hide" : "Manage"} cookie preferences
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
              className={cn("transition-transform", showDetails && "rotate-180")}
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {showDetails && (
            <div className="space-y-3 rounded-lg border border-border bg-muted/50 p-4">
              {categories.map((category) => (
                <CookiePreferenceItem
                  key={category.id}
                  category={category}
                  enabled={preferences[category.id]}
                  onToggle={() => handleToggle(category.id, category.required)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={handleRejectAll}>
         Reject All
        </Button>
        <Button variant="secondary" onClick={handleSavePreferences}>
         Save Preferences
        </Button>
        <Button onClick={handleAcceptAll}>Accept All</Button>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        You can change your preferences at any time in your account settings.
      </p>
    </div>
  );
};

interface CookiePreferenceItemProps {
  category: CookieCategory;
  enabled: boolean;
  onToggle: () => void;
}

function CookiePreferenceItem({ category, enabled, onToggle }: CookiePreferenceItemProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{category.name}</span>
          {category.required && (
            <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
              Required
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{category.description}</p>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={onToggle}
        disabled={category.required}
        aria-label={`${category.name} cookies ${enabled ? "enabled" : "disabled"}`}
      />
    </div>
  );
}

export { CookieConsent };
