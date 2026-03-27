# Figma Token Format Specification

## Overview

This document specifies the exact format for exporting and importing design tokens between the LaunchApp design system and Figma.

## Token Format

### HSL Color Format (Code → Figma)

#### Input Format (Code)
```
HSLString: "{hue} {saturation}% {lightness}%"

Examples:
- "262 83% 58%"   // Primary color
- "0 0% 100%"     // White
- "240 10% 3.9%"  // Dark foreground
```

**Constraints**:
- Hue: 0-360 (integer or decimal)
- Saturation: 0-100% (integer or decimal)
- Lightness: 0-100% (integer or decimal)
- No alpha channel in code format

#### Output Format (Figma)
```json
{
  "type": "COLOR",
  "value": {
    "r": 0.0,
    "g": 0.0,
    "b": 1.0,
    "a": 1.0
  }
}
```

**Constraints**:
- RGB values normalized to 0-1 range
- Alpha always 1.0 (fully opaque)
- Conversion preserves color fidelity within floating-point precision

### Conversion Formula

#### HSL to RGB

```typescript
function hslToRGB(h: number, s: number, l: number): RGB {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  if (s === 0) {
    // Achromatic (gray)
    return { r: l, g: l, b: l, a: 1 };
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  return {
    r: hue2rgb(p, q, h + 1 / 3),
    g: hue2rgb(p, q, h),
    b: hue2rgb(p, q, h - 1 / 3),
    a: 1,
  };
}
```

#### RGB to HSL

```typescript
function rgbToHSL(r: number, g: number, b: number): HSL {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  switch (max) {
    case r:
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      break;
    case g:
      h = ((b - r) / d + 2) / 6;
      break;
    case b:
      h = ((r - g) / d + 4) / 6;
      break;
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
  };
}
```

## Export Format Specification

### Top-Level Structure

```json
{
  "metadata": {
    "version": "1.0",
    "timestamp": "2026-03-26T18:00:00Z",
    "figmaFileKey": "optional-file-key",
    "lastSyncBy": "user@launchapp.com",
    "lastSyncAt": "2026-03-26T18:00:00Z"
  },
  "palettes": [
    {
      "name": "default",
      "label": "Default",
      "description": "Default palette for LaunchApp design system",
      "tokens": {
        "light": { ... },
        "dark": { ... }
      }
    }
  ]
}
```

### Palette Structure

```json
{
  "name": "default",
  "label": "Default",
  "description": "Optional description of the palette",
  "tokens": {
    "light": {
      "background": "0 0% 100%",
      "foreground": "240 10% 3.9%",
      "card": "0 0% 100%",
      "card-foreground": "240 10% 3.9%",
      "popover": "0 0% 100%",
      "popover-foreground": "240 10% 3.9%",
      "primary": "262 83% 58%",
      "primary-foreground": "0 0% 98%",
      "secondary": "240 4.8% 95.9%",
      "secondary-foreground": "240 5.9% 10%",
      "muted": "240 4.8% 95.9%",
      "muted-foreground": "240 3.8% 46.1%",
      "accent": "240 4.8% 95.9%",
      "accent-foreground": "240 5.9% 10%",
      "destructive": "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 98%",
      "border": "240 5.9% 90%",
      "input": "240 5.9% 90%",
      "ring": "262 83% 58%"
    },
    "dark": {
      "background": "240 10% 3.9%",
      "foreground": "0 0% 98%",
      // ... all 19 tokens for dark variant
    }
  }
}
```

### Semantic Token Names (Required)

All palettes MUST include these 19 tokens in both light and dark variants:

**Structural tokens**:
- `background` - Default background color
- `foreground` - Default text/foreground color
- `card` - Card/container background
- `card-foreground` - Card text color
- `popover` - Popover/tooltip background
- `popover-foreground` - Popover text color

**Intent tokens**:
- `primary` - Primary action color
- `primary-foreground` - Primary action text
- `secondary` - Secondary action color
- `secondary-foreground` - Secondary action text
- `accent` - Accent/highlight color
- `accent-foreground` - Accent text
- `destructive` - Destructive action color
- `destructive-foreground` - Destructive text
- `muted` - Muted/disabled color
- `muted-foreground` - Muted text

**UI tokens**:
- `border` - Border/divider color
- `input` - Input field background
- `ring` - Focus ring/outline color

## Import Format Specification

### Figma Variable Format

When importing from Figma, expect variables in this structure:

```typescript
interface FigmaVariable {
  id: string;                                    // Unique Figma variable ID
  name: string;                                  // Must match naming convention
  resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
  valuesByMode: {
    [modeId: string]: RGBColor | number | string | boolean
  };
  description?: string;
}

interface RGBColor {
  r: number;    // 0.0 - 1.0
  g: number;    // 0.0 - 1.0
  b: number;    // 0.0 - 1.0
  a: number;    // 0.0 - 1.0
}
```

### Figma Variable Naming Convention

Pattern: `launchapp/{palette}/{variant}/{tokenName}`

Examples:
- `launchapp/default/light/primary`
- `launchapp/default/dark/primary-foreground`
- `launchapp/ocean/light/background`

**Components**:
- `launchapp`: Namespace (fixed)
- `{palette}`: Palette name (lowercase alphanumeric with hyphens)
- `{variant}`: Either `light` or `dark`
- `{tokenName}`: Semantic token name (kebab-case)

### Figma Token Set Naming

Pattern: `launchapp-{palette}-{variant}`

Examples:
- `launchapp-default-light`
- `launchapp-default-dark`
- `launchapp-ocean-light`

## Round-Trip Conversion

### Data Integrity

The conversion process is designed to be lossless within the constraints of color representation:

1. **Export**: Code HSL → Figma RGB (conversion)
2. **Import**: Figma RGB → Code HSL (reverse conversion)
3. **Result**: Original HSL values recovered with minor floating-point rounding

### Precision Handling

- HSL components stored as integers (0-360, 0-100)
- Floating-point RGB conversion may introduce ±0.001 rounding errors
- Post-import HSL values may have ±0.1% variance in S/L components
- Visual impact: Imperceptible to human eye

### Validation

Round-trip validation ensures:
```typescript
const original = "262 83% 58%";
const rgb = hslToRGB(original);
const recovered = rgbToHSL(rgb);
// Expect: original ≈ recovered (within ±0.5% tolerance)
```

## Metadata Fields

### Version
- Current: "1.0"
- Format: Semantic versioning
- Breaking changes will increment major version

### Timestamp
- Format: ISO 8601 datetime
- Example: "2026-03-26T18:00:00Z"
- Always UTC

### Figma File Key
- Optional field
- Used to identify target Figma file
- Format: Figma file key string
- Example: "abc123def456"

### Last Sync Information
- `lastSyncBy`: Email or username
- `lastSyncAt`: Timestamp of last sync
- Used for audit and change tracking

## Error Handling

### Export Errors

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Palette 'invalid' has invalid HSL format",
  "context": {
    "palette": "invalid",
    "token": "primary",
    "value": "400 150% 120%"
  }
}
```

### Import Errors

```json
{
  "code": "HSL_CONVERSION_ERROR",
  "message": "Failed to convert Figma RGB value",
  "context": {
    "palette": "default",
    "token": "primary",
    "value": { "r": 1.5, "g": 0.5, "b": 0.3, "a": 1 }
  }
}
```

### Validation Errors

Valid HSL ranges:
- Hue: 0-360
- Saturation: 0-100
- Lightness: 0-100

Invalid values will be rejected with error details.

## Examples

### Complete Export Example

```json
{
  "metadata": {
    "version": "1.0",
    "timestamp": "2026-03-26T18:00:00Z",
    "lastSyncBy": "design@launchapp.com"
  },
  "palettes": [
    {
      "name": "default",
      "label": "Default",
      "tokens": {
        "light": {
          "background": "0 0% 100%",
          "foreground": "240 10% 3.9%",
          "primary": "262 83% 58%",
          "primary-foreground": "0 0% 98%",
          "secondary": "240 4.8% 95.9%",
          "secondary-foreground": "240 5.9% 10%",
          "muted": "240 4.8% 95.9%",
          "muted-foreground": "240 3.8% 46.1%",
          "accent": "240 4.8% 95.9%",
          "accent-foreground": "240 5.9% 10%",
          "card": "0 0% 100%",
          "card-foreground": "240 10% 3.9%",
          "popover": "0 0% 100%",
          "popover-foreground": "240 10% 3.9%",
          "destructive": "0 84.2% 60.2%",
          "destructive-foreground": "0 0% 98%",
          "border": "240 5.9% 90%",
          "input": "240 5.9% 90%",
          "ring": "262 83% 58%"
        },
        "dark": {
          "background": "240 10% 3.9%",
          "foreground": "0 0% 98%",
          "primary": "263 70% 50%",
          "primary-foreground": "0 0% 98%",
          "secondary": "240 3.7% 15.9%",
          "secondary-foreground": "0 0% 98%",
          "muted": "240 3.7% 15.9%",
          "muted-foreground": "240 5% 64.9%",
          "accent": "240 3.7% 15.9%",
          "accent-foreground": "0 0% 98%",
          "card": "240 10% 3.9%",
          "card-foreground": "0 0% 98%",
          "popover": "240 10% 3.9%",
          "popover-foreground": "0 0% 98%",
          "destructive": "0 62.8% 30.6%",
          "destructive-foreground": "0 0% 98%",
          "border": "240 3.7% 15.9%",
          "input": "240 3.7% 15.9%",
          "ring": "263 70% 50%"
        }
      }
    }
  ]
}
```

## Testing & Validation

### Unit Test Cases

1. **HSL Validation**
   - Valid: "262 83% 58%"
   - Invalid: "400 150% 120%"
   - Invalid: "262 83 58" (missing %)

2. **Round-Trip Conversion**
   - Input: "262 83% 58%"
   - Expected output after round-trip: "262 83% 58%" (±0.5%)

3. **RGB Normalization**
   - Figma values: 0-1
   - Code values: Integer percentages

4. **Palette Completeness**
   - All 19 tokens required
   - Both light and dark variants required
   - Extra tokens rejected

5. **Naming Convention**
   - Valid: `launchapp/default/light/primary`
   - Invalid: `figma/default/light/primary`
   - Invalid: `launchapp/default/primary` (missing variant)

## Migration Path

### From Previous Versions

Currently at version "1.0" (initial release).

Future versions will:
1. Maintain backward compatibility where possible
2. Document breaking changes clearly
3. Provide migration tooling

## References

- [W3C HSL Color Specification](https://www.w3.org/TR/css-color-3/#hsl-color)
- [Figma API Documentation](https://www.figma.com/developers/api)
- [Figma Variables API](https://www.figma.com/developers/api#variables)
