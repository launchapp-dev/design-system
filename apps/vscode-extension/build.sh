#!/bin/bash
# Build script for vscode-extension that works around monorepo limitations

set -e

# Get the absolute path of this script's directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Build with absolute paths to avoid directory traversal issues with tsconfig.json
npx -p 'typescript@^5.9.3' tsc \
  "${SCRIPT_DIR}"/src/*.ts \
  --outDir "${SCRIPT_DIR}"/dist \
  --target ES2020 \
  --module commonjs \
  --skipLibCheck \
  --lib ES2020 \
  --types node \
  --moduleResolution node \
  --sourceMap \
  --declaration

echo "Build complete: ${SCRIPT_DIR}/dist/"
