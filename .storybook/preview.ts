import type { Decorator, Preview } from "@storybook/react";
import React, { useEffect } from "react";
import "../src/styles/globals.css";

const withDarkMode: Decorator = (Story, context) => {
  const theme = context.globals.theme as string;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return React.createElement(Story);
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  parameters: {
    backgrounds: { disable: true },
    layout: "centered",
  },
  decorators: [withDarkMode],
};

export default preview;
