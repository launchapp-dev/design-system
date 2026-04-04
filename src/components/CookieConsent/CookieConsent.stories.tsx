import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CookieConsent, DEFAULT_CATEGORIES } from "./index";

const meta: Meta<typeof CookieConsent> = {
  title: "Components/CookieConsent",
  component: CookieConsent,
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### ARIA Roles & Attributes
- Dialog has \`role="dialog"\` with \`aria-labelledby\` pointing to title
- Checkboxes have proper \`aria-label\` descriptions
- Buttons clearly labeled (Accept, Reject, Preferences)

### Keyboard Navigation
- **Tab**: Navigate through all controls
- **Space**: Toggle checkbox
- **Enter**: Activate buttons
- **Escape**: Close dialog (if allowed)

### Screen Reader Behavior
- Modal announced as dialog
- Purpose and available options described
- Current checkbox states announced
- Button functions clearly stated

### Focus Management
- Focus trap within dialog
- Return focus to trigger button after close
- Clear focus indicators on all controls
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CookieConsent>;

function Controlled() {
  const [open, setOpen] = React.useState(false);
  const [saved, setSaved] = React.useState<Record<string, boolean> | null>(
    null,
  );
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
        onAcceptAll={() =>
          setSaved(
            Object.fromEntries(DEFAULT_CATEGORIES.map((c) => [c.id, true])),
          )
        }
        onRejectAll={() =>
          setSaved(
            Object.fromEntries(
              DEFAULT_CATEGORIES.map((c) => [c.id, c.required === true]),
            ),
          )
        }
        onSavePreferences={setSaved}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <Controlled />,
};

export const OpenByDefault: Story = {
  render: () => <CookieConsent open={true} onOpenChange={() => undefined} />,
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
