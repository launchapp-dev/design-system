import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  globalPluginRegistry,
  customButtonPlugin,
  hoverCardPlugin,
  createPlugin,
  type Plugin,
} from "../index";
import { Button } from "../components/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/Card";

const meta: Meta = {
  title: "System/Plugin System",
  parameters: {
    layout: "centered",
  },
};

export default meta;

const PluginDemoComponent = () => {
  const [pluginsLoaded, setPluginsLoaded] = useState(false);
  const [registeredPlugins, setRegisteredPlugins] = useState<Plugin[]>([]);

  const handleLoadPlugins = () => {
    globalPluginRegistry.clear();
    globalPluginRegistry.registerPlugin(customButtonPlugin);
    globalPluginRegistry.registerPlugin(hoverCardPlugin);
    setPluginsLoaded(true);
    setRegisteredPlugins(globalPluginRegistry.getPlugins());
  };

  const handleClearPlugins = () => {
    globalPluginRegistry.clear();
    setPluginsLoaded(false);
    setRegisteredPlugins([]);
  };

  const handleCreateCustomPlugin = () => {
    const customPlugin = createPlugin({
      name: "demo-plugin",
      version: "1.0.0",
      description: "Demo plugin created in Storybook",
      extensions: [
        {
          componentName: "Button",
          variants: [
            {
              name: "demo",
              description: "Demo custom variant",
              values: {
                neon: "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-bold animate-pulse",
              },
            },
          ],
          hooks: {
            beforeRender: (props) => {
              if (props.variant === "demo") {
                return {
                  className: (props.className || "") + " font-bold tracking-wider",
                };
              }
              return undefined;
            },
          },
        },
      ],
      hooks: {
        onLoad: (registry) => {
          console.log("Demo plugin loaded!");
        },
        onUnload: (registry) => {
          console.log("Demo plugin unloaded!");
        },
      },
    });

    globalPluginRegistry.registerPlugin(customPlugin);
    setRegisteredPlugins(globalPluginRegistry.getPlugins());
  };

  return (
    <div className="space-y-8 p-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Design System Plugin System</h1>
        <p className="text-gray-600">
          The plugin system allows extending components with custom variants and behaviors.
        </p>
      </div>

      <div className="space-y-4 border-t pt-6">
        <h2 className="text-2xl font-bold">Plugin Management</h2>
        <div className="flex gap-4">
          <Button onClick={handleLoadPlugins} variant="default">
            Load Example Plugins
          </Button>
          <Button onClick={handleCreateCustomPlugin} variant="outline">
            Create Custom Plugin
          </Button>
          <Button onClick={handleClearPlugins} variant="destructive">
            Clear All Plugins
          </Button>
        </div>
      </div>

      {pluginsLoaded && (
        <div className="space-y-4 border-t pt-6">
          <h2 className="text-2xl font-bold">Loaded Plugins</h2>
          <div className="grid gap-4">
            {registeredPlugins.map((plugin) => (
              <Card key={plugin.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{plugin.name}</CardTitle>
                  <CardDescription>{plugin.version}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plugin.description && <p className="text-sm">{plugin.description}</p>}
                  {plugin.author && (
                    <p className="text-sm text-gray-600">by {plugin.author}</p>
                  )}
                  <div>
                    <h3 className="font-semibold mb-2">Extensions:</h3>
                    <ul className="space-y-2">
                      {plugin.extensions.map((ext, idx) => (
                        <li key={idx} className="text-sm text-gray-700">
                          <strong>Component:</strong> {ext.componentName}
                          {ext.variants && (
                            <div className="ml-4 mt-1">
                              <span className="font-medium">Variants:</span>
                              <ul className="ml-4">
                                {ext.variants.map((v) => (
                                  <li key={v.name} className="text-xs">
                                    • {v.name}
                                    {v.description && ` - ${v.description}`}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {ext.hooks && (
                            <div className="ml-4 mt-1 text-xs">
                              🪝 Has hooks registered
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4 border-t pt-6">
        <h2 className="text-2xl font-bold">Component Variants</h2>
        {pluginsLoaded && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Button Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Card with Hover Effects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>This card demonstrates the hover effects plugin.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
        {!pluginsLoaded && (
          <p className="text-gray-600">Load plugins to see available variants.</p>
        )}
      </div>

      <div className="space-y-4 border-t pt-6 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold">Plugin System Features</h2>
        <ul className="space-y-2 text-sm">
          <li>✓ Register custom component variants</li>
          <li>✓ Add hooks for component lifecycle events</li>
          <li>✓ Extend component behavior without modifying core</li>
          <li>✓ Dynamically load/unload plugins</li>
          <li>✓ Query registered variants and hooks</li>
          <li>✓ Support for plugin metadata (name, version, author)</li>
        </ul>
      </div>
    </div>
  );
};

export const PluginSystem: StoryObj = {
  render: () => <PluginDemoComponent />,
};

export const Overview: StoryObj = {
  render: () => (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">Plugin System Overview</h1>
        <div className="space-y-4 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-2">What is the Plugin System?</h2>
            <p>
              The design system plugin system enables developers to extend components with custom
              variants and behaviors without modifying the core library. Plugins can be registered
              dynamically and work across all components.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Core Features</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Custom component variants</li>
              <li>Component lifecycle hooks</li>
              <li>Dynamic plugin registration</li>
              <li>TypeScript support</li>
              <li>Plugin metadata and versioning</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Creating a Plugin</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
              {`import { createPlugin } from "@launchapp/design-system";

export const myPlugin = createPlugin({
  name: "my-plugin",
  version: "1.0.0",
  extensions: [
    {
      componentName: "Button",
      variants: [
        {
          name: "custom",
          values: {
            gradient: "bg-gradient-to-r from-blue-500 to-purple-600"
          }
        }
      ]
    }
  ]
});`}
            </pre>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Using a Plugin</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
              {`import { globalPluginRegistry, myPlugin } from "@launchapp/design-system";

globalPluginRegistry.registerPlugin(myPlugin);

// Now use custom variant:
<Button variant="custom">My Custom Button</Button>`}
            </pre>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Available Example Plugins</h2>
            <div className="space-y-2">
              <div>
                <h3 className="font-semibold">customButtonPlugin</h3>
                <p className="text-sm text-gray-600">
                  Adds gradient, animated, and state variants to Button component
                </p>
              </div>
              <div>
                <h3 className="font-semibold">hoverCardPlugin</h3>
                <p className="text-sm text-gray-600">
                  Adds hover effects and interactive variants to Card component
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Documentation</h2>
            <p>
              See <code className="bg-gray-100 px-2 py-1 rounded">PLUGIN_SYSTEM_README.md</code> for
              comprehensive documentation and API reference.
            </p>
          </section>
        </div>
      </div>
    </div>
  ),
};
