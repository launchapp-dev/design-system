import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CookieConsent } from "./index";

const meta: Meta<typeof CookieConsent> = {
  title: "Components/CookieConsent",
  component: CookieConsent,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "gray", value: "#f3f4f6" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CookieConsent>;

export const Default: Story = {
  render: () => (
    <CookieConsent
      onAcceptAll={() => console.log("Accept all")}
      onRejectAll={() => console.log("Reject all")}
      onSavePreferences={(enabled) => console.log("Save preferences:", enabled)}
    />
  ),
};

export const WithCustomCategories: Story = {
  render: () => (
    <CookieConsent
      onAcceptAll={() => console.log("Accept all")}
      onRejectAll={() => console.log("Reject all")}
      onSavePreferences={(enabled) => console.log("Save preferences:", enabled)}
      categories={[
        {
          id: "essential",
          name: "Strictly Necessary",
          description: "These cookies are essential for the website to function and cannot be switched off.",
          required: true,
          defaultEnabled: true,
        },
        {
          id: "preferences",
          name: "Preference Cookies",
          description: "These cookies enable a more personalized experience by remembering your settings.",
          defaultEnabled: true,
        },
        {
          id: "analytics",
          name: "Performance Cookies",
          description: "These cookies collect anonymous information about how visitors use our website.",
          defaultEnabled: false,
        },
        {
          id: "marketing",
          name: "Targeting Cookies",
          description: "These cookies may be set by our advertising partners to build a profile of your interests.",
          defaultEnabled: false,
        },
        {
          id: "social",
          name: "Social Media Cookies",
          description: "These cookies are set by social media services to enable sharing content.",
          defaultEnabled: false,
        },
      ]}
    />
  ),
};

export const PreferencesExpanded: Story = {
  render: () => {
    const [showDetails, setShowDetails] = React.useState(true);
    return (
      <CookieConsent
        onAcceptAll={() => console.log("Accept all")}
        onRejectAll={() => console.log("Reject all")}
        onSavePreferences={(enabled) => console.log("Save preferences:", enabled)}
        className="max-w-lg"
      />
    );
  },
};

export const WithoutPreferences: Story = {
  render: () => (
    <CookieConsent
      onAcceptAll={() => console.log("Accept all")}
      onRejectAll={() => console.log("Reject all")}
      showPreferences={false}
    />
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "48px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <CookieConsent
      onAcceptAll={() => console.log("Accept all")}
      onRejectAll={() => console.log("Reject all")}
      onSavePreferences={(enabled) => console.log("Save preferences:", enabled)}
    />
  ),
};

export const InPageLayout: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <h1 className="text-2xl font-bold">Cookie Consent Example</h1>
        <p className="text-gray-600">
          This is an example page showing how the cookie consent banner might appear
          on a website. Click the buttons below to simulate different states.
        </p>
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="font-semibold">Page Content</h2>
          <p className="text-sm text-gray-500">
            Your main page content would go here. The cookie consent banner should
            appear prominently at the bottom of the viewport or in a modal overlay.
          </p>
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-4">
          <div className="mx-auto max-w-2xl">
            <CookieConsent
              onAcceptAll={() => console.log("Accept all")}
              onRejectAll={() => console.log("Reject all")}
              onSavePreferences={(enabled) => console.log("Save preferences:", enabled)}
            />
          </div>
        </div>
      </div>
    </div>
  ),
};
