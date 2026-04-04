import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  CookieConsent,
  CookieConsentBanner,
  CookieConsentProvider,
  CookiePreferencesModal,
  DEFAULT_CATEGORIES,
  useCookieConsent,
} from "./index";

const meta: Meta<typeof CookieConsent> = {
  title: "Components/CookieConsent",
  component: CookieConsent,
  parameters: {
    docs: {
      description: {
        component: `
GDPR-ready cookie consent system with banner, preferences modal, context provider, and hook.

## Components
- **CookieConsentBanner** — fixed bottom banner with Accept All / Customize / Reject All
- **CookiePreferencesModal** — category toggles (essential, analytics, marketing, preferences)
- **CookieConsentProvider** — context + localStorage persistence
- **useCookieConsent** — hook to read/write consent from any component
- **CookieConsent** — backward-compatible alias for CookiePreferencesModal

## Keyboard Navigation
- **Tab**: Navigate through all controls
- **Space**: Toggle switches
- **Enter**: Activate buttons
- **Escape**: Close modal
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CookieConsent>;

function ControlledModal() {
  const [open, setOpen] = React.useState(false);
  const [saved, setSaved] = React.useState<Record<string, boolean> | null>(null);
  return (
    <div style={{ padding: "24px" }}>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          border: "1px solid #e2e8f0",
          cursor: "pointer",
        }}
      >
        Open Cookie Preferences
      </button>
      {saved && (
        <pre style={{ marginTop: "16px", fontSize: "12px" }}>
          {JSON.stringify(saved, null, 2)}
        </pre>
      )}
      <CookieConsent
        open={open}
        onOpenChange={setOpen}
        onAcceptAll={() => setSaved(Object.fromEntries(DEFAULT_CATEGORIES.map((c) => [c.id, true])))}
        onRejectAll={() => setSaved(Object.fromEntries(DEFAULT_CATEGORIES.map((c) => [c.id, c.required === true])))}
        onSavePreferences={setSaved}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <ControlledModal />,
};

export const OpenByDefault: Story = {
  render: () => (
    <CookieConsent
      open={true}
      onOpenChange={() => undefined}
    />
  ),
};

export const CustomCategories: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <CookieConsent
        open={open}
        onOpenChange={setOpen}
        title="Privacy Settings"
        description="Manage your data and privacy preferences."
        categories={[
          {
            id: "essential",
            name: "Essential",
            description: "Required for the site to work.",
            required: true,
            enabled: true,
          },
          {
            id: "personalisation",
            name: "Personalisation",
            description: "Remember your preferences for a tailored experience.",
            required: false,
            enabled: true,
          },
          {
            id: "thirdParty",
            name: "Third-party Embeds",
            description: "Enable YouTube, Vimeo, and other embedded content.",
            required: false,
            enabled: false,
          },
        ]}
      />
    );
  },
};

function StatusDisplay() {
  const { state, preferences, reset } = useCookieConsent();
  if (state === "undecided") return null;
  return (
    <div style={{ marginTop: "16px" }}>
      <p style={{ fontSize: "14px" }}>Consent state: <strong>{state}</strong></p>
      <pre style={{ fontSize: "12px", marginTop: "8px" }}>
        {JSON.stringify(preferences, null, 2)}
      </pre>
      <button
        onClick={reset}
        style={{
          marginTop: "8px",
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid #e2e8f0",
          cursor: "pointer",
          fontSize: "12px",
        }}
      >
        Reset Consent
      </button>
    </div>
  );
}

function BannerDemo() {
  return (
    <CookieConsentProvider>
      <div style={{ padding: "24px", minHeight: "300px" }}>
        <p style={{ color: "#666" }}>The cookie banner appears at the bottom of the page.</p>
        <StatusDisplay />
      </div>
      <CookieConsentBanner />
      <CookiePreferencesModal />
    </CookieConsentProvider>
  );
}

export const BannerWithProvider: Story = {
  render: () => <BannerDemo />,
};

function BannerBottomLeft() {
  return (
    <CookieConsentProvider>
      <div style={{ padding: "24px", minHeight: "300px" }}>
        <p style={{ color: "#666" }}>Banner positioned bottom-left.</p>
      </div>
      <CookieConsentBanner position="bottom-left" />
      <CookiePreferencesModal />
    </CookieConsentProvider>
  );
}

export const BannerPositionBottomLeft: Story = {
  render: () => <BannerBottomLeft />,
};

function BannerBottomRight() {
  return (
    <CookieConsentProvider>
      <div style={{ padding: "24px", minHeight: "300px" }}>
        <p style={{ color: "#666" }}>Banner positioned bottom-right.</p>
      </div>
      <CookieConsentBanner position="bottom-right" />
      <CookiePreferencesModal />
    </CookieConsentProvider>
  );
}

export const BannerPositionBottomRight: Story = {
  render: () => <BannerBottomRight />,
};

function BannerNoReject() {
  return (
    <CookieConsentProvider>
      <div style={{ padding: "24px", minHeight: "300px" }}>
        <p style={{ color: "#666" }}>Banner without Reject All button.</p>
      </div>
      <CookieConsentBanner showReject={false} />
      <CookiePreferencesModal />
    </CookieConsentProvider>
  );
}

export const BannerWithoutReject: Story = {
  render: () => <BannerNoReject />,
};
