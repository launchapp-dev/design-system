export interface ParsedProp {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
}

export interface ParsedRequirements {
  componentName: string;
  componentType: string;
  props: ParsedProp[];
  variants: Record<string, string[]>;
  description: string;
}

const COMPONENT_KEYWORDS: Record<string, string[]> = {
  button: ["button", "btn", "cta", "submit", "action"],
  input: ["input", "textfield", "text field", "text input", "field", "form field"],
  card: ["card", "panel", "tile", "box"],
  badge: ["badge", "tag", "label", "chip", "pill"],
  dialog: ["dialog", "modal", "popup", "overlay", "lightbox"],
  alert: ["alert", "notification", "toast", "banner", "message"],
  avatar: ["avatar", "profile picture", "user image", "profile image"],
  checkbox: ["checkbox", "check box", "toggle", "switch"],
  select: ["select", "dropdown", "combobox", "picker"],
  textarea: ["textarea", "text area", "multiline", "multi-line"],
};

const VARIANT_KEYWORDS: Record<string, string[]> = {
  variant: [
    "default", "primary", "secondary", "destructive", "outline",
    "ghost", "link", "success", "warning", "info", "danger", "subtle",
  ],
  size: ["xs", "sm", "small", "md", "medium", "lg", "large", "xl", "icon"],
  state: ["disabled", "loading", "error", "active", "hover", "focus"],
};

const SIZE_NORMALIZE: Record<string, string> = {
  small: "sm",
  medium: "md",
  large: "lg",
};

const PROP_PATTERNS: Array<{ pattern: RegExp; name: string; type: string; required: boolean }> = [
  { pattern: /\b(onClick|on click|clickable|click handler)\b/i, name: "onClick", type: "() => void", required: false },
  { pattern: /\b(disabled|disable)\b/i, name: "disabled", type: "boolean", required: false },
  { pattern: /\b(loading|isLoading|is loading)\b/i, name: "loading", type: "boolean", required: false },
  { pattern: /\b(icon|with icon|has icon)\b/i, name: "icon", type: "React.ReactNode", required: false },
  { pattern: /\b(label|with label|labeled)\b/i, name: "label", type: "string", required: false },
  { pattern: /\b(placeholder)\b/i, name: "placeholder", type: "string", required: false },
  { pattern: /\b(error message|errorMessage|error text|error state)\b/i, name: "error", type: "string", required: false },
  { pattern: /\b(required|mandatory)\b/i, name: "required", type: "boolean", required: false },
  { pattern: /\b(full width|fullWidth|full-width|block)\b/i, name: "fullWidth", type: "boolean", required: false },
  { pattern: /\b(children|child|content|slot)\b/i, name: "children", type: "React.ReactNode", required: false },
  { pattern: /\b(href|link|url|anchor)\b/i, name: "href", type: "string", required: false },
  { pattern: /\b(as ?child|asChild|polymorphic)\b/i, name: "asChild", type: "boolean", required: false },
];

function detectComponentType(text: string): string {
  const lower = text.toLowerCase();
  for (const [type, keywords] of Object.entries(COMPONENT_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return type;
    }
  }
  return "component";
}

function extractComponentName(text: string, componentType: string): string {
  const explicitMatch = text.match(
    /\b(?:a|an|the)?\s*([A-Z][a-zA-Z]+(?:Button|Input|Card|Badge|Dialog|Alert|Avatar|Checkbox|Select|Textarea|Component))\b/
  );
  if (explicitMatch) return explicitMatch[1];

  const quotedMatch = text.match(/"([^"]+)"|'([^']+)'/);
  if (quotedMatch) {
    const raw = (quotedMatch[1] ?? quotedMatch[2]).replace(/\s+/g, "");
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }

  const adjective = text.match(/\b(primary|secondary|danger|success|warning|outline|ghost)\s+(\w+)/i);
  if (adjective) {
    const adj = adjective[1].charAt(0).toUpperCase() + adjective[1].slice(1);
    return `${adj}${componentType.charAt(0).toUpperCase() + componentType.slice(1)}`;
  }

  return componentType.charAt(0).toUpperCase() + componentType.slice(1);
}

function extractVariants(text: string): Record<string, string[]> {
  const lower = text.toLowerCase();
  const result: Record<string, string[]> = {};

  for (const [group, keywords] of Object.entries(VARIANT_KEYWORDS)) {
    const found = keywords.filter((kw) => lower.includes(kw));
    if (found.length > 0) {
      result[group] = found.map((v) => SIZE_NORMALIZE[v] ?? v);
    }
  }

  const listMatch = text.match(
    /variants?[:\s]+([a-z]+(?:[,\s]+(?:and\s+)?[a-z]+)*)/i
  );
  if (listMatch) {
    const listed = listMatch[1]
      .split(/,|\s+and\s+|\s+or\s+/)
      .map((v) => v.trim().toLowerCase())
      .filter(Boolean);

    for (const v of listed) {
      const normalized = SIZE_NORMALIZE[v] ?? v;
      if (VARIANT_KEYWORDS.size.includes(v)) {
        result.size = [...new Set([...(result.size ?? []), normalized])];
      } else {
        result.variant = [...new Set([...(result.variant ?? []), normalized])];
      }
    }
  }

  return result;
}

function extractProps(text: string): ParsedProp[] {
  const found: ParsedProp[] = [];
  const seen = new Set<string>();

  for (const { pattern, name, type, required } of PROP_PATTERNS) {
    if (pattern.test(text) && !seen.has(name)) {
      seen.add(name);
      found.push({ name, type, required });
    }
  }

  const inlineProps = text.match(/\bwith\s+([\w\s,]+?)(?:\s+and\s+[\w\s]+)?(?:\.|,|$)/gi);
  if (inlineProps) {
    for (const match of inlineProps) {
      const parts = match
        .replace(/^with\s+/i, "")
        .split(/,|\s+and\s+/)
        .map((p) => p.trim().toLowerCase())
        .filter(Boolean);

      for (const part of parts) {
        const camel = part.replace(/\s+(\w)/g, (_, c: string) => c.toUpperCase());
        if (!seen.has(camel) && /^[a-z]\w+$/.test(camel) && camel.length > 2) {
          seen.add(camel);
          found.push({ name: camel, type: "string", required: false });
        }
      }
    }
  }

  return found;
}

export function parseComponentRequirements(description: string): ParsedRequirements {
  if (!description || typeof description !== "string" || !description.trim()) {
    throw new Error("description must be a non-empty string");
  }

  const trimmed = description.trim();
  const componentType = detectComponentType(trimmed);
  const componentName = extractComponentName(trimmed, componentType);
  const variants = extractVariants(trimmed);
  const props = extractProps(trimmed);

  return {
    componentName,
    componentType,
    props,
    variants,
    description: trimmed,
  };
}
