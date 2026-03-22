import type { Config } from 'chromatic';

const config: Config = {
  storybookBaseDir: './',
  storybookConfigDir: './.storybook',
  
  // Capture all stories by default
  onlyChanged: false,
  
  // Don't exit with zero on changes (fail the build)
  exitZeroOnChanges: false,
  
  // Auto-accept changes on main branch
  autoAcceptChanges: ['main'],
  
  // Preserve missing stories (don't fail)
  preserveMissing: true,
  
  // Skip stories that are known to be flaky
  skip: [],
  
  // Ignore these files when determining what changed
  untraced: [
    '*.md',
    '*.mdx',
    '.github/**/*',
    '.ao/**/*',
    'docs/**/*',
    '**/*.test.{ts,tsx}',
    '**/*.spec.{ts,tsx}',
  ],
  
  // Debug mode (set via environment variable)
  debug: process.env.CHROMATIC_DEBUG === 'true',
  
  // Upload diagnostics on failure
  diagnostics: 'full',
  
  // Test all viewports
  viewportPresets: [
    { width: 1280, height: 720 },  // Desktop
    { width: 375, height: 667 },   // Mobile
  ],
};

export default config;
