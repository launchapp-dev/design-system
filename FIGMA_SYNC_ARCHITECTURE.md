# Figma Sync Architecture

## Overview

This document describes the bidirectional token synchronization between the LaunchApp design system and Figma. This enables design tokens defined in code to stay in sync with Figma design files, and vice versa.

## Current State

### Design Token Structure

The design system uses:
- **Format**: HSL (Hue, Saturation, Lightness) color values stored as strings (e.g., "262 83% 58%")
- **CSS Custom Properties**: `--la-*` format (e.g., `--la-primary`, `--la-primary-foreground`)
- **Storage**:
  - CSS files in `src/themes/` for runtime
  - TypeScript `Palette` objects for programmatic access
  - 19 semantic token names per palette
- **Theme Structure**: Each palette has `light` and `dark` variants

### Current Palettes

- default, ocean, forest, sunset, rose, slate, amber, teal, violet, ruby

### Token Categories

```
Semantic tokens (19 total):
- background, foreground
- card, card-foreground
- popover, popover-foreground
- primary, primary-foreground
- secondary, secondary-foreground
- muted, muted-foreground
- accent, accent-foreground
- destructive, destructive-foreground
- border, input, ring
```

## Bidirectional Sync Architecture

### Export: Code → Figma

**Trigger**: Automated on every merge to main, or manual trigger via CLI

**Flow**:
1. Extract all palettes from `src/themes/`
2. Convert HSL tokens to Figma-compatible format
3. Create/update Figma variables and token sets
4. Push changes via Figma HTTP API (via HTTP MCP)

**Format (Token Set JSON)**:
```json
{
  "version": "1.0",
  "timestamp": "2026-03-26T18:00:00Z",
  "palettes": [
    {
      "name": "default",
      "label": "Default",
      "description": "Default palette for LaunchApp",
      "tokens": {
        "light": {
          "primary": "hsl(262, 83%, 58%)",
          "primary-foreground": "hsl(0, 0%, 98%)",
          "secondary": "hsl(240, 4.8%, 95.9%)",
          ...
        },
        "dark": {
          ...
        }
      }
    }
  ]
}
```

### Import: Figma → Code

**Trigger**: Manual trigger with user confirmation, or webhook on Figma file updates

**Flow**:
1. Fetch Figma variables/tokens via HTTP MCP
2. Parse Figma token format
3. Validate against current schema
4. Generate updated `Palette` objects
5. Create PR with changes
6. User reviews and merges

**Format Conversion**:
- Figma HSL → Code HSL string format
- Figma variable names → semantic token names
- Figma token sets → Light/Dark variants

## Implementation Plan

### Phase 1: Foundational Utilities (NOW)

**File**: `src/lib/figma-sync/`

#### `types.ts`
- `FigmaToken` interface (format from Figma)
- `TokenSyncFormat` interface (export format)
- `PaletteExport` interface
- Type guards and validators

#### `export.ts`
- `exportPalettesToTokenSet()`: Convert Palette[] → TokenSyncFormat
- `convertHSLToFigmaFormat()`: HSL string → Figma HSL format
- `validateExportFormat()`: Ensure output matches schema

#### `import.ts`
- `importTokensFromFigma()`: Process Figma token data
- `convertFigmaFormatToHSL()`: Figma HSL → code HSL string
- `validateImportedTokens()`: Ensure imported tokens match schema
- `createPaletteFromImport()`: Generate Palette object

### Phase 2: CLI Tools (BLOCKED - needs HTTP MCP)

**File**: `scripts/figma-sync.ts`

- `figma-sync export`: Push tokens to Figma
- `figma-sync import`: Fetch from Figma and generate PR
- `figma-sync validate`: Verify sync readiness

### Phase 3: GitHub Actions (BLOCKED - needs HTTP MCP)

**File**: `.github/workflows/figma-sync.yml`

- Automated export on every merge to main
- Manual trigger for import workflow
- Token validation and audit logs

### Phase 4: Figma Tokens Plugin Support (BLOCKED - needs HTTP MCP)

Integration with Figma Tokens plugin:
- Export to `tokens.json` format
- Support for token aliases
- Theme mapping in plugin UI

## HTTP MCP Integration Points

### Required HTTP MCP Capabilities

1. **Figma API Authentication**
   - OAuth 2.0 flow or PAT support
   - Secure token storage

2. **Variable Management API**
   ```
   GET /files/{file_key}/variables
   POST /files/{file_key}/variables
   PUT /files/{file_key}/variables/{id}
   DELETE /files/{file_key}/variables/{id}
   ```

3. **Token Set Management**
   ```
   GET /files/{file_key}/token-sets
   POST /files/{file_key}/token-sets
   PUT /files/{file_key}/token-sets/{id}
   ```

4. **Batch Operations**
   - Bulk variable updates
   - Transaction support

### Expected MCP Handler

```typescript
// Pseudo-code for future HTTP MCP
const figmaApi = await mcpClient.request('http://figma.com', {
  method: 'GET',
  path: `/v1/files/${fileKey}/variables`,
  headers: { 'X-FIGMA-TOKEN': process.env.FIGMA_TOKEN }
});
```

## Data Sync Rules

### Export Rules (Code → Figma)
1. All palettes export as separate variable collections
2. Light/dark variants map to Figma token sets
3. HSL values convert to Figma format without loss of precision
4. Metadata includes: palette name, last sync timestamp, version

### Import Rules (Figma → Code)
1. Only validate and import explicitly marked token sets
2. Preserve semantic token names (no renaming)
3. Validate HSL format matches expected range
4. Generate migration PR with side-by-side diff

### Conflict Resolution
1. **On Export Conflict**: Abort and require manual resolution
2. **On Import Conflict**: Create separate branch for review
3. **No Auto-Merge**: All changes require human review

## Token Format Specifications

### Export Format (JSON Schema)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "version": { "type": "string" },
    "timestamp": { "type": "string", "format": "date-time" },
    "palettes": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "label": { "type": "string" },
          "tokens": {
            "type": "object",
            "properties": {
              "light": { "type": "object" },
              "dark": { "type": "object" }
            }
          }
        },
        "required": ["name", "tokens"]
      }
    }
  },
  "required": ["version", "timestamp", "palettes"]
}
```

### Figma Color Format

Figma expects HSL in specific format for variables:
```
{
  type: "COLOR",
  value: {
    r: 0.0-1.0,  // Red (0-255 normalized)
    g: 0.0-1.0,  // Green
    b: 0.0-1.0,  // Blue
    a: 1.0        // Alpha
  }
}
```

Conversion: `hsl(H, S%, L%)` → RGB → Figma format

## Validation

### Pre-Export Checks
1. All palettes parse correctly
2. All tokens are valid HSL
3. No duplicate token names
4. Light/dark pairs are complete
5. Figma file is accessible and writable

### Pre-Import Checks
1. Figma tokens parse correctly
2. Token set contains all 19 required semantic tokens
3. HSL values are in valid range
4. No destructive changes (tokens removed)
5. Metadata matches expected version

## Figma Tokens Plugin Compatibility

### Token Set Naming Convention
```
launchapp-{palette}-light
launchapp-{palette}-dark
```

### Plugin Configuration (`tokens.json`)
```json
{
  "$schema": "https://tokens.studio/schema.json",
  "default": {
    "colors": {
      "primary": {
        "value": "#a855f7",
        "type": "color",
        "description": "Primary action color"
      }
    }
  }
}
```

### Sync Support
- Tokens Studio plugin can read from exported `tokens.json`
- Manual sync via git push workflow
- Future: Webhook integration once HTTP MCP available

## Security Considerations

1. **Token Protection**
   - Figma tokens stored in environment variables only
   - No tokens committed to git
   - Rotation policy: Every 90 days

2. **Access Control**
   - Only design and eng leads can trigger exports
   - All imports require 2-person review
   - Audit log of all sync operations

3. **Data Validation**
   - Strict schema validation on import
   - Checksums to detect corruption
   - Rollback capability for failed syncs

## Monitoring & Observability

### Sync Audit Log
```
{
  timestamp: "2026-03-26T18:00:00Z",
  direction: "export|import",
  palettes: ["default", "ocean"],
  status: "success|failed",
  changes: {
    added: 0,
    modified: 5,
    removed: 0
  },
  initiatedBy: "user@launchapp.com",
  diffHash: "sha256:..."
}
```

### Metrics
- Sync duration (target: <5 min)
- Palette update frequency
- Import success rate
- Validation errors

## Future Enhancements

1. **Real-time Sync**: Webhook from Figma on design token changes
2. **Token Aliases**: Support Figma token references/aliases
3. **Component Mappings**: Link tokens to specific component variants
4. **Multi-brand Support**: Extend to support multiple brand token sets
5. **Design Handoff**: Automated token generation from Figma designs

## Blocked Dependencies

- **HTTP MCP Support**: Required for Figma API communication
- **OAuth Setup**: For secure Figma authentication
- **Figma Workspace Permissions**: Team admin access required

## Testing Strategy

### Unit Tests
- HSL conversion functions
- Token validation and parsing
- Schema validation

### Integration Tests
- Export format verification (no HTTP required)
- Import format parsing
- Round-trip conversion (export → import → export)

### Manual Testing (post HTTP MCP)
- Actual Figma API communication
- File synchronization
- Conflict resolution

## References

- [Figma REST API Docs](https://www.figma.com/developers/api)
- [Figma Variables API](https://www.figma.com/developers/api#variables)
- [Figma Tokens Plugin](https://tokens.studio/)
- [HSL Color Format](https://www.w3.org/TR/css-color-3/#hsl-color)
