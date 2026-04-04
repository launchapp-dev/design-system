import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "./index";

const meta: Meta = {
  title: "Components/Tabs",
  argTypes: {
    defaultValue: { control: "text" },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    defaultValue: "account",
    orientation: "horizontal",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <TabsRoot
      defaultValue={args.defaultValue as string}
      orientation={args.orientation as "horizontal" | "vertical"}
      style={{ width: 400 }}
    >
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p style={{ padding: "16px 0", fontSize: 14 }}>
          Manage your account details and preferences.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p style={{ padding: "16px 0", fontSize: 14 }}>
          Change your password and security settings.
        </p>
      </TabsContent>
      <TabsContent value="settings">
        <p style={{ padding: "16px 0", fontSize: 14 }}>
          Configure application settings and notifications.
        </p>
      </TabsContent>
    </TabsRoot>
  ),
};

export const MultipleTabs: Story = {
  render: () => (
    <TabsRoot defaultValue="tab1" style={{ width: 500 }}>
      <TabsList>
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
        <TabsTrigger value="tab4" disabled>
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p style={{ padding: "16px 0", fontSize: 14 }}>
          Overview content goes here.
        </p>
      </TabsContent>
      <TabsContent value="tab2">
        <p style={{ padding: "16px 0", fontSize: 14 }}>
          Analytics dashboard content.
        </p>
      </TabsContent>
      <TabsContent value="tab3">
        <p style={{ padding: "16px 0", fontSize: 14 }}>
          Reports and export options.
        </p>
      </TabsContent>
      <TabsContent value="tab4">
        <p style={{ padding: "16px 0", fontSize: 14 }}>Billing information.</p>
      </TabsContent>
    </TabsRoot>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("tab1");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p style={{ fontSize: "14px" }}>
          Active tab: <strong>{value}</strong>
        </p>
        <TabsRoot value={value} onValueChange={setValue} style={{ width: 400 }}>
          <TabsList>
            <TabsTrigger value="tab1">Tab One</TabsTrigger>
            <TabsTrigger value="tab2">Tab Two</TabsTrigger>
            <TabsTrigger value="tab3">Tab Three</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <p style={{ padding: "16px 0", fontSize: 14 }}>
              Content for Tab One.
            </p>
          </TabsContent>
          <TabsContent value="tab2">
            <p style={{ padding: "16px 0", fontSize: 14 }}>
              Content for Tab Two.
            </p>
          </TabsContent>
          <TabsContent value="tab3">
            <p style={{ padding: "16px 0", fontSize: 14 }}>
              Content for Tab Three.
            </p>
          </TabsContent>
        </TabsRoot>
      </div>
    );
  },
};
