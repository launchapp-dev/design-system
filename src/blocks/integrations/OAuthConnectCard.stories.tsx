import type { Meta, StoryObj } from "@storybook/react";
import { OAuthConnectCard } from "./OAuthConnectCard";

const meta: Meta<typeof OAuthConnectCard> = {
  title: "Blocks/Integrations/OAuthConnectCard",
  component: OAuthConnectCard,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const githubProvider = {
  id: "github",
  name: "GitHub",
  description: "Connect your GitHub account to enable OAuth login.",
  scopes: ["read:user", "user:email"],
};

export const Disconnected: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <OAuthConnectCard provider={githubProvider} onConnect={() => console.log("Connect GitHub")} />
    </div>
  ),
};

export const Connected: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <OAuthConnectCard
        provider={githubProvider}
        isConnected
        connectedEmail="user@github.com"
        onDisconnect={() => console.log("Disconnect GitHub")}
        onRefresh={() => console.log("Refresh GitHub")}
      />
    </div>
  ),
};

export const GoogleOAuth: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <OAuthConnectCard
        provider={{
          id: "google",
          name: "Google",
          description: "Sign in with your Google account.",
          scopes: ["email", "profile"],
        }}
        isConnected
        connectedEmail="user@gmail.com"
        onDisconnect={() => console.log("Disconnect Google")}
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <OAuthConnectCard
        provider={githubProvider}
        isLoading
        onConnect={() => console.log("Connect GitHub")}
      />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <OAuthConnectCard
        provider={githubProvider}
        isConnected
        connectedEmail="user@github.com"
        onDisconnect={() => console.log("Disconnect GitHub")}
        onRefresh={() => console.log("Refresh GitHub")}
      />
    </div>
  ),
};
