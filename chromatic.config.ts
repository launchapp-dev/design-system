import { defineConfig, setOutputDir } from 'chromatic';

export default defineConfig({
  projectToken: process.env.CHROMATIC_PROJECT_TOKEN,
  buildScript: 'npm run build:storybook',
  outputDir: 'storybook-static',
  storybookBaseDir: '.',
  exitOnceUploaded: false,
  exitZeroOnChanges: true,
  autoAcceptChanges: 'main',
  onlyChanged: true,
  traceChanged: true,
  parallel: 3,
  diagnostics: true,
});

setOutputDir('./chromatic-results');
