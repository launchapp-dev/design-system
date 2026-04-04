import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CookieConsentBanner } from "./index";

const meta: Meta<typeof CookieConsentBanner> = {
  title: "Components/CookieConsentBanner",
  component: CookieConsentBanner,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A fixed-position cookie consent banner shown on first visit. Provides Accept All / Reject All / Customize actions. Pairs with \`CookieConsent\` dialog for detailed preference management.

## Features
- **Categorized preferences**: Essential (always on), Analytics, Marketing
- **Two modes**: Full (with inline preferences) or Compact (accept/reject only)
- **Accessible**: \`role="dialog"\`, \`aria-label\`, keyboard navigable switches
- **Dark mode**: Uses \`--la-*\` design tokens
- **Responsive**: Stacks vertically on mobile, horizontal on desktop
- **Position**: Top or bottom of viewport

## GDPR Compliance
- No tracking before consent (analytics/marketing default to off)
- Granular category control
- Save/reject buttons always visible
- Privacy policy link support
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CookieConsentBanner>;

export const Default: Story = {
  args: {
    open: true,
    onAcceptAll: () => console.log("Accepted all"),
    onRejectAll: () => console.log("Rejected all"),
    onSavePreferences: (prefs) => console.log("Saved:", prefs),
  },
};

export const WithPrivacyLink: Story = {
  args: {
    open: true,
    privacyPolicyUrl: "/privacy",
  },
};

export const Compact: Story = {
  args: {
    open: true,
    compact: true,
    privacyPolicyUrl: "/privacy",
  },
};

export const TopPosition: Story = {
  args: {
    open: true,
    position: "top",
  },
};

export const WithCustomizeCallback: Story = {
  render: () => {
    const [showDialog, setShowDialog] = React.useState(false);
    return (
      <div>
        {showDialog && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.5)",
              zIndex: 100,
            }}
          >
            <div
              style={{
                background: "white",
                padding: 24,
                borderRadius: 8,
              }}
            >
              <p>Full cookie preferences dialog would open here.</p>
              <button onClick={() => setShowDialog(false)}>Close</button>
            </div>
          </div>
        )}
        <CookieConsentBanner
          open
          onCustomize={() => setShowDialog(true)}
          onAcceptAll={() => console.log("Accepted")}
          onRejectAll={() => console.log("Rejected")}
        />
      </div>
    );
  },
};
