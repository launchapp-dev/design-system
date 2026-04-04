import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  CookieBanner,
  CookiePreferences,
  CookieConsentProvider,
  ConsentGate,
  useCookieConsent,
  DEFAULT_CATEGORIES,
} from "./index";
import type { ConsentPreferences } from "./index";

const meta: Meta<typeof CookieConsentProvider> = {
  title: "Components/CookieConsent",
  component: CookieConsentProvider,
  parameters: {
    docs: {
      description: {
        component: `
## Cookie Consent System

Full GDPR/ePrivacy cookie consent system with:
- **CookieBanner** — fixed bottom banner shown on first visit
- **CookiePreferences** — modal for granular cookie control
- **CookieConsentProvider** — context provider with persistent cookie storage
- **useCookieConsent** — hook to check consent status
- **ConsentGate** — conditionally render children based on consent
- **ConsentScript** — inject scripts only when consent is granted

### Categories
- **Essential** — required, always on
- **Functional** — preferences, language, region
- **Analytics** — anonymous usage tracking
- **Marketing** — advertising and retargeting

### Accessibility (WCAG AA)
- Banner has \`role="dialog"\` with \`aria-label\`
- Preferences modal uses Radix Dialog (focus trap, aria-labelledby)
- All switches have \`aria-label\` descriptions
- Keyboard: Tab, Space, Enter, Escape
- Focus management within modal

### Script Blocking
Wrap analytics/marketing scripts in \`<ConsentScript>\` or \`<ConsentGate>\` — they only execute after the user grants consent for that category.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CookieConsentProvider>;

function PreferencesLink() {
  const { setShowPreferences, hasConsented, consent } = useCookieConsent();
  return (
    <div style={{ padding: "24px" }}>
      <p style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
        {hasConsented
          ? `Consent saved: ${JSON.stringify(consent)}`
          : "No consent given yet — banner should be visible below."}
      </p>
      <button
        onClick={() => setShowPreferences(true)}
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          border: "1px solid #e2e8f0",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Cookie Settings (footer link)
      </button>
    </div>
  );
}

function GatedContent() {
  const { hasConsent } = useCookieConsent();
  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
      <ConsentGate category="analytics" fallback={<span style={{ color: "#999" }}>Analytics blocked</span>}>
        <span style={{ color: "#22c55e" }}>Analytics scripts loaded</span>
      </ConsentGate>
      <ConsentGate category="marketing" fallback={<span style={{ color: "#999" }}>Marketing blocked</span>}>
        <span style={{ color: "#22c55e" }}>Marketing pixels loaded</span>
      </ConsentGate>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <CookieConsentProvider privacyPolicyUrl="/privacy">
      <PreferencesLink />
      <GatedContent />
    </CookieConsentProvider>
  ),
};

export const BannerOnly: Story = {
  render: () => (
    <div style={{ position: "relative", minHeight: "300px" }}>
      <CookieBanner
        onAcceptAll={() => alert("Accepted all")}
        onRejectAll={() => alert("Rejected all")}
        onOpenPreferences={() => alert("Open preferences")}
        privacyPolicyUrl="/privacy"
      />
    </div>
  ),
};

export const PreferencesModal: Story = {
  render: () => {
    const [prefs, setPrefs] = React.useState<ConsentPreferences>({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
    return (
      <CookiePreferences
        open={true}
        onOpenChange={() => undefined}
        categories={DEFAULT_CATEGORIES}
        preferences={prefs}
        onToggle={(id, checked) => setPrefs((p) => ({ ...p, [id]: checked }))}
        onAcceptAll={() => undefined}
        onRejectAll={() => undefined}
        onSave={() => undefined}
      />
    );
  },
};

export const WithCustomCategories: Story = {
  render: () => (
    <CookieConsentProvider
      categories={[
        { id: "essential", name: "Essential", description: "Required for site operation.", required: true, enabled: true },
        { id: "functional", name: "Functional", description: "Remember your preferences.", required: false, enabled: false },
        { id: "analytics", name: "Performance", description: "Help us measure and improve.", required: false, enabled: false },
        { id: "marketing", name: "Advertising", description: "Personalised ads.", required: false, enabled: false },
      ]}
      bannerTitle="Your Privacy Matters"
      bannerDescription="Choose which cookies we can use."
      preferencesTitle="Privacy Settings"
    >
      <PreferencesLink />
    </CookieConsentProvider>
  ),
};
