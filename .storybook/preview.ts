import React, { useEffect } from 'react';
import type { Decorator, Preview } from '@storybook/react';
import { withTests } from '@chromatic-com/storybook';
import { defineConfig } from '@chromatic-com/storybook';
import '../src/styles/globals.css';

const chromaticConfig = defineConfig({
  // Enable chromatic for all stories by default
  // Individual stories can opt-out with chromatic: { disable: true }
});

const withDarkMode: Decorator = (Story, context) => {
  const theme = context.globals.theme as string;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return React.createElement(Story);
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  parameters: {
    backgrounds: { disable: true },
    layout: 'centered',
    chromatic: chromaticConfig,
  },
  decorators: [
    withDarkMode,
    withTests({
      // Chromatic will automatically detect and run tests
    }),
  ],
};

export default preview;
