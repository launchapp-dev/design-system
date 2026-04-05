import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CookieConsentBanner, BANNER_DEFAULT_CATEGORIES } from "./index";

const meta: Meta<typeof CookieConsentBanner> = {
  title: "Components/CookieConsentBanner",
  component: CookieConsentBanner,
  argTypes: {
    visible: { control: "boolean" },
    position: { control: "select", options: ["bottom", "top"] },
    title: { control: "text" },
    description: { control: "text" },
    onAcceptAll: { action: "onAcceptAll" },
    onRejectAll: { action: "onRejectAll" },
    onCustomize: { action: "onCustomize" },
  },
  args: {
    visible: true,
    position: "bottom",
    title: "We value your privacy",
    description:
      "We use cookies to enhance your browsing experience, serve personalised content, and analyse site traffic. Choose which cookies you accept below.",
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
## Cookie Consent Banner

A fixed-position banner for GDPR/ePrivacy cookie consent. Supports essential, analytics, and marketing categories with per-category toggles.

## Accessibility Features

### ARIA Roles & Attributes
- Banner has \`role="region"\` with \`aria-label="Cookie consent"\`
- Category toggles have \`aria-label\` per category (e.g. "Analytics cookies")
- Required categories have \`disabled\` attribute on their switch

### Keyboard Navigation
- **Tab**: Move between buttons and switches
- **Space / Enter**: Toggle switches, activate buttons
- Back button returns focus to the main banner view

### Screen Reader Behaviour
- Region announced on page load
- Switch state (on/off) announced per category
- "Required" badge is visible text, not just visual

### Dark Mode
Fully themed via \`--la-*\` CSS custom properties. Works with the \`dark\` class strategy used across LaunchApp templates.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CookieConsentBanner>;

export const Default: Story = {
  render: (args) => {
    const [saved, setSaved] = React.useState<Record<string, boolean> | null>(null);
    return (
      <div style={{ minHeight: "200px", position: "relative" }}>
        {saved && (
          <pre
            style={{
              padding: "16px",
              fontSize: "12px",
              fontFamily: "monospace",
            }}
          >
            Saved: {JSON.stringify(saved, null, 2)}
          </pre>
        )}
        <CookieConsentBanner
          {...args}
          onAcceptAll={() => {
            args.onAcceptAll?.();
            setSaved(Object.fromEntries(BANNER_DEFAULT_CATEGORIES.map((c) => [c.id, true])));
          }}
          onRejectAll={() => {
            args.onRejectAll?.();
            setSaved(
              Object.fromEntries(
                BANNER_DEFAULT_CATEGORIES.map((c) => [c.id, c.required === true])
              )
            );
          }}
          onCustomize={(prefs) => {
            args.onCustomize?.(prefs);
            setSaved(prefs);
          }}
        />
      </div>
    );
  },
};

export const TopPosition: Story = {
  args: {
    position: "top",
  },
  render: (args) => (
    <div style={{ minHeight: "200px", position: "relative" }}>
      <CookieConsentBanner {...args} />
    </div>
  ),
};

export const CustomizeOpen: Story = {
  render: (args) => {
    const [saved, setSaved] = React.useState<Record<string, boolean> | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const buttons = containerRef.current?.querySelectorAll("button");
      if (buttons) {
        for (const btn of buttons) {
          if (btn.textContent?.trim() === "Customize") {
            btn.click();
            break;
          }
        }
      }
    }, []);

    return (
      <div ref={containerRef} style={{ minHeight: "300px", position: "relative" }}>
        {saved && (
          <pre style={{ padding: "16px", fontSize: "12px", fontFamily: "monospace" }}>
            Saved: {JSON.stringify(saved, null, 2)}
          </pre>
        )}
        <CookieConsentBanner
          {...args}
          onCustomize={(prefs) => {
            args.onCustomize?.(prefs);
            setSaved(prefs);
          }}
        />
      </div>
    );
  },
};

export const CustomCategories: Story = {
  args: {
    title: "Privacy Settings",
    description: "Manage your data and privacy preferences.",
    categories: [
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
    ],
  },
  render: (args) => (
    <div style={{ minHeight: "200px", position: "relative" }}>
      <CookieConsentBanner {...args} />
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
    backgrounds: { default: "dark" },
  },
  render: (args) => (
    <div className="dark" style={{ minHeight: "200px", position: "relative" }}>
      <CookieConsentBanner {...args} />
    </div>
  ),
};

export const Hidden: Story = {
  args: {
    visible: false,
  },
  render: (args) => (
    <div style={{ padding: "24px" }}>
      <p style={{ fontSize: "14px", color: "#666" }}>
        Banner is hidden (visible=false). Nothing should render below.
      </p>
      <CookieConsentBanner {...args} />
    </div>
  ),
};
