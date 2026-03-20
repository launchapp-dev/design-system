import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ProfileSettings } from "./ProfileSettings";

const meta: Meta<typeof ProfileSettings> = {
  title: "Blocks/Settings/ProfileSettings",
  component: ProfileSettings,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { ProfileSettings } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <ProfileSettings
      onSave={async (values) => {
        console.log(values);
      }}
    />
  );
}`,
      },
    },
  },
  argTypes: {
    avatarFallback: { control: "text" },
    avatarSrc: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <ProfileSettings
        defaultValues={{ name: "Jane Doe", username: "janedoe", bio: "Designer & coffee lover." }}
        avatarFallback="JD"
        onSave={(values) => console.log("Saved:", values)}
      />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <ProfileSettings onSave={(values) => console.log("Saved:", values)} />
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
    <div style={{ maxWidth: 640 }}>
      <ProfileSettings
        defaultValues={{ name: "Jane Doe", username: "janedoe", bio: "Designer & coffee lover." }}
        avatarFallback="JD"
      />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <ProfileSettings
      defaultValues={{ name: "Jane Doe", username: "janedoe", bio: "Designer & coffee lover." }}
      avatarFallback="JD"
      onSave={(values) => console.log("Saved:", values)}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <ProfileSettings
        defaultValues={{ name: "Jane Doe", username: "janedoe", bio: "Designer & coffee lover." }}
        avatarFallback="JD"
        onSave={(values) => console.log("Saved:", values)}
      />
    </div>
  ),
};
