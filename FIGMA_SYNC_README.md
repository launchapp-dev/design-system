# Figma Bidirectional Token Sync

This implementation provides a framework for synchronizing design tokens bidirectionally between Figma and the LaunchApp design system codebase.

## Overview

The sync system is built on three main components:

1. **Token Mapper** (`tokenMapper.ts`) - Converts between Figma token format and design system format
2. **Sync Service** (`figmaTokenSync.ts`) - Orchestrates the synchronization process
3. **Webhook Handler** (`webhookHandler.ts`) - Receives and processes webhook events from Figma

## Architecture

```
┌─────────────────────┐
│   Figma File        │
│  (Variables/Styles) │
└──────────┬──────────┘
           │
           │ webhook event
           ▼
┌──────────────────────────────────────┐
│  Webhook Handler                     │
│  - Verify Figma signature            │
│  - Extract token changes             │
│  - Create sync event                 │
└──────────┬───────────────────────────┘
           │
           │ TokenSyncEvent
           ▼
┌──────────────────────────────────────┐
│  FigmaTokenSync Service              │
│  - Map Figma → DS tokens             │
│  - Validate token compatibility      │
│  - Create PR / Update Figma          │
│  - Update last sync timestamp        │
└──────────┬───────────────────────────┘
           │
      ┌────┴────┐
      │          │
      ▼          ▼
┌──────────┐  ┌─────────────┐
│ GitHub   │  │ Figma File  │
│ (PR/Code)│  │ (Variables) │
└──────────┘  └─────────────┘
```

## File Structure

```
src/lib/figma-sync/
├── types.ts                 # Type definitions and interfaces
├── tokenMapper.ts          # Token format conversion logic
├── tokenSchema.ts          # JSON schema and validation
├── figmaTokenSync.ts       # Main sync service (core logic)
├── webhookHandler.ts       # Webhook event processing
├── index.ts                # Public API exports
└── figmaTokenSync.test.ts  # Unit tests

scripts/
└── sync-figma-tokens.ts    # CLI script for manual/CI sync
```

## Current Implementation Status

✅ **Completed:**
- Token type definitions and interfaces
- Token mapper (Figma ↔ DS format conversion)
- Token schema and validation
- Sync service core (event processing, validation)
- Webhook handler framework
- CLI script framework
- Unit tests

❌ **BLOCKED - Requires HTTP MCP:**
- Making HTTP requests to Figma API
- Receiving webhook events from Figma
- Creating GitHub PRs programmatically
- Updating Figma files from codebase

## Token Format

### Design System Token Format

Tokens use CSS custom property naming (`--la-*`) and are organized by category:

```typescript
{
  name: "--la-primary",
  category: "color",
  value: "hsl(262 83% 58%)" | { light: "...", dark: "..." },
  description?: "Primary brand color",
  deprecated?: false
}
```

### Figma Token Format

Tokens in Figma use path-based naming and type system:

```typescript
{
  "Primary/Color": {
    value: "hsl(262 83% 58%)",
    type: "COLOR",
    description: "Primary brand color"
  }
}
```

### Supported Token Categories

- `color` - Color values (hex, rgb, hsl, CSS variables)
- `typography` - Font families and text styles
- `spacing` - Padding, margin, gap values
- `sizing` - Width, height values
- `border-radius` - Border radius values
- `shadow` - Box shadow values
- `opacity` - Opacity/transparency values
- `other` - Miscellaneous tokens

### Dual-Mode Tokens

Tokens can have different values for light and dark modes:

```typescript
{
  name: "--la-primary",
  category: "color",
  value: {
    light: "hsl(262 83% 58%)",    // Light mode
    dark: "hsl(262 70% 60%)"       // Dark mode
  }
}
```

## Sync Flows

### Figma → Codebase (Pull)

1. Changes to variables/styles in Figma
2. Figma publishes library → webhook triggered
3. Webhook Handler receives event
4. Token Mapper converts Figma → DS format
5. Tokens validated against schema
6. New PR created with updated tokens
7. GitHub PR auto-merged (configurable)

### Codebase → Figma (Push)

1. Token changes committed to codebase
2. CI/CD triggers sync script
3. Script loads tokens from files
4. Token Mapper converts DS → Figma format
5. Updates Figma variables/styles via API
6. Figma file updated automatically

## Configuration

### Environment Variables

Required:
- `FIGMA_API_KEY` - Figma personal access token
- `GITHUB_TOKEN` - GitHub personal access token or repo token
- `FIGMA_FILE_ID` - Target Figma file ID

Optional:
- `GITHUB_REPO` - Repository (default: `launchapp-dev/design-system`)
- `GITHUB_BRANCH` - Target branch (default: `main`)
- `AUTO_CREATE_PRS` - Create PRs automatically (default: `true`)
- `AUTO_MERGE_PRS` - Auto-merge PRs (default: `false`)
- `FIGMA_WEBHOOK_SECRET` - Webhook signature validation secret

### Configuration File

Create `.figma-sync.json` in project root:

```json
{
  "figmaApiKey": "${FIGMA_API_KEY}",
  "githubToken": "${GITHUB_TOKEN}",
  "githubRepo": "launchapp-dev/design-system",
  "githubBranch": "main",
  "figmaFiles": [
    {
      "fileId": "abc123xyz",
      "fileName": "LaunchApp Design Tokens",
      "libraryName": "@launchapp/design-system",
      "syncEnabled": true
    }
  ],
  "autoCreatePRs": true,
  "autoMergePRs": false,
  "prLabelPrefix": "chore"
}
```

## Usage

### Manual Sync (CLI)

```bash
# Sync from Figma to codebase
npx ts-node scripts/sync-figma-tokens.ts --direction figma-to-code

# Sync from codebase to Figma
npx ts-node scripts/sync-figma-tokens.ts --direction code-to-figma

# Bidirectional sync
npx ts-node scripts/sync-figma-tokens.ts --direction bidirectional

# Dry run (no changes)
npx ts-node scripts/sync-figma-tokens.ts --dry-run --verbose
```

### Programmatic API

```typescript
import { FigmaTokenSync, TokenMapper } from "@launchapp/design-system";

const syncer = new FigmaTokenSync({
  figmaApiKey: process.env.FIGMA_API_KEY,
  githubToken: process.env.GITHUB_TOKEN,
  githubRepo: "launchapp-dev/design-system",
  githubBranch: "main",
  figmaFiles: [
    {
      fileId: "abc123xyz",
      fileName: "Design Tokens",
      libraryName: "@launchapp/design-system",
      syncEnabled: true,
    },
  ],
  autoCreatePRs: true,
});

// Process sync event
const result = await syncer.processSyncEvent({
  id: "sync-123",
  timestamp: Date.now(),
  source: "figma",
  action: "update",
  tokens: [/* ... */],
  metadata: { figmaFileId: "abc123xyz" },
});

if (result.success) {
  console.log(`Synced ${result.tokensProcessed} tokens`);
}
```

### Webhook Receiver

```typescript
import { FigmaWebhookHandler } from "@launchapp/design-system";

const handler = new FigmaWebhookHandler(process.env.FIGMA_WEBHOOK_SECRET);

app.post("/webhooks/figma", (req, res) => {
  // Verify webhook signature (requires HTTP MCP)
  const verification = handler.verifySignature(
    JSON.stringify(req.body),
    req.headers["x-figma-signature"]
  );

  if (!verification.valid) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  // Process webhook
  const { success, syncEvent } = handler.processWebhook(req.body);

  if (success && syncEvent) {
    // Dispatch to sync service
    syncer.processSyncEvent(syncEvent);
  }

  res.json({ success });
});
```

## Figma Setup (When HTTP MCP Available)

### 1. Create Figma API Token

1. Go to https://www.figma.com/api-docs
2. Create a personal access token with `file:read` and `library:read` scopes
3. Add to environment as `FIGMA_API_KEY`

### 2. Enable Library Publishing

1. In Figma file settings, enable "Library"
2. Publish library to make components available
3. Note the file ID from the URL: `https://www.figma.com/file/{FILE_ID}/...`

### 3. Set Up Webhook

1. Create GitHub personal access token with `repo` scope
2. Set `GITHUB_TOKEN` environment variable
3. Configure webhook endpoint URL
4. Generate webhook secret and set as `FIGMA_WEBHOOK_SECRET`

### 4. Integrate with CI/CD

Add to GitHub Actions workflow:

```yaml
- name: Sync Figma Tokens
  env:
    FIGMA_API_KEY: ${{ secrets.FIGMA_API_KEY }}
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: npx ts-node scripts/sync-figma-tokens.ts --direction code-to-figma
```

## API Endpoints Needed (HTTP MCP)

When the HTTP MCP becomes available, the following endpoints will be utilized:

### Figma API

- `GET /v1/files/{file_id}` - Get file metadata
- `GET /v1/files/{file_id}/variables` - List file variables
- `GET /v1/files/{file_id}/styles` - List file styles
- `POST /v1/files/{file_id}/variables` - Create/update variables
- `GET /v1/webhooks` - List webhooks
- `POST /v1/webhooks` - Create webhook
- `DELETE /v1/webhooks/{id}` - Delete webhook

### GitHub API

- `POST /repos/{owner}/{repo}/pulls` - Create pull request
- `POST /repos/{owner}/{repo}/pulls/{number}/merge` - Merge PR
- `PATCH /repos/{owner}/{repo}/pulls/{number}` - Update PR

## Testing

Run the test suite:

```bash
npm test -- figmaTokenSync.test.ts
```

Test coverage includes:
- Token mapping (Figma ↔ DS)
- Token validation
- Sync event processing
- Configuration validation
- Error handling

## Error Handling

The system handles various error scenarios:

| Error | Severity | Recovery |
|-------|----------|----------|
| Invalid token name | Warning | Token skipped, sync continues |
| Missing Figma API key | Error | Sync aborted |
| GitHub API rate limit | Warning | Retry with exponential backoff |
| Invalid color value | Warning | Token validated, value used as-is |
| File not found | Error | Sync aborted |
| Permission denied | Error | Sync aborted, check token scopes |

## Performance Considerations

- **Token Batching**: Process tokens in batches of 100 to avoid API rate limits
- **Caching**: Cache file metadata to reduce API calls
- **Debouncing**: Webhook events debounced to prevent duplicate syncs
- **Partial Sync**: Sync only changed tokens (delta sync) when possible

## Troubleshooting

### "Missing environment variables" error
Ensure all required environment variables are set:
```bash
export FIGMA_API_KEY="..."
export GITHUB_TOKEN="..."
```

### "Figma file not found" error
Verify the file ID in configuration matches the Figma file URL

### Webhook not triggering
Check that:
1. Webhook secret is set correctly
2. Endpoint URL is publicly accessible
3. Figma library is published (triggers webhook)

### PR not created
Verify GitHub token has `repo` scope and permissions on the target repository

## Future Enhancements

- [ ] Support for component token mapping
- [ ] Design token versioning and changelog
- [ ] Token usage analytics
- [ ] Conflict resolution for bidirectional changes
- [ ] UI for token sync status dashboard
- [ ] Integration with design token tools (Token Studio, Tokens.studio)
- [ ] Support for multiple Figma files and teams

## Related Documentation

- [Figma API Docs](https://www.figma.com/developers/api)
- [Design Tokens Spec](https://design-tokens.github.io/community-group/format/)
- [GitHub API Reference](https://docs.github.com/en/rest)
- [Design System Guide](../../README.md)

## Notes

This implementation is framework-complete but awaits HTTP MCP infrastructure for:
- Actual Figma API calls
- Webhook event reception
- GitHub PR automation

The core logic and type safety are in place, allowing full integration once the HTTP MCP becomes available.
