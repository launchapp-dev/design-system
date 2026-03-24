import type { ParsedRequirements, ParsedProp } from "./nlp-parser";

export interface GeneratedComponent {
  code: string;
  componentName: string;
  fileName: string;
}

const RADIX_PRIMITIVE_MAP: Record<string, string | null> = {
  button: "@radix-ui/react-slot",
  dialog: "@radix-ui/react-dialog",
  alert: null,
  badge: null,
  card: null,
  input: null,
  textarea: null,
  checkbox: "@radix-ui/react-checkbox",
  select: "@radix-ui/react-select",
  avatar: "@radix-ui/react-avatar",
  component: null,
};

const DEFAULT_VARIANT_CLASSES: Record<string, Record<string, string>> = {
  variant: {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    info: "bg-blue-500 text-white hover:bg-blue-600",
    subtle: "bg-muted text-muted-foreground hover:bg-muted/80",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  },
  size: {
    xs: "h-7 px-2 text-xs",
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-11 px-8 text-base",
    xl: "h-12 px-10 text-lg",
    icon: "h-10 w-10",
  },
  state: {
    disabled: "opacity-50 cursor-not-allowed pointer-events-none",
    loading: "opacity-70 cursor-wait",
    error: "border-destructive focus-visible:ring-destructive",
    active: "ring-2 ring-ring ring-offset-2",
  },
};

const BASE_CLASSES: Record<string, string> = {
  button:
    "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  input:
    "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  card: "rounded-lg border bg-card text-card-foreground shadow-sm",
  badge:
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  dialog: "fixed inset-0 z-50 flex items-center justify-center",
  alert: "relative w-full rounded-lg border p-4",
  avatar: "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
  checkbox:
    "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  select:
    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  textarea:
    "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  component: "relative flex w-full flex-col",
};

const HTML_ELEMENT_MAP: Record<string, string> = {
  button: "button",
  input: "input",
  card: "div",
  badge: "div",
  dialog: "div",
  alert: "div",
  avatar: "span",
  checkbox: "button",
  select: "button",
  textarea: "textarea",
  component: "div",
};

function buildVariantBlock(
  groupName: string,
  values: string[]
): string {
  const classes = DEFAULT_VARIANT_CLASSES[groupName] ?? {};
  const entries = values
    .map((v) => {
      const cls = classes[v] ?? `/* ${v} variant classes */`;
      return `        ${v}: "${cls}",`;
    })
    .join("\n");
  return `      ${groupName}: {\n${entries}\n      },`;
}

function buildDefaultVariants(variants: Record<string, string[]>): string {
  const defaults: string[] = [];
  for (const [group, values] of Object.entries(variants)) {
    if (values.length > 0) {
      defaults.push(`      ${group}: "${values[0]}",`);
    }
  }
  return defaults.join("\n");
}

function buildPropsInterface(
  name: string,
  htmlElement: string,
  props: ParsedProp[],
  variants: Record<string, string[]>,
  usesSlot: boolean
): string {
  const htmlAttr =
    htmlElement === "button"
      ? "React.ButtonHTMLAttributes<HTMLButtonElement>"
      : htmlElement === "input"
        ? "React.InputHTMLAttributes<HTMLInputElement>"
        : htmlElement === "textarea"
          ? "React.TextareaHTMLAttributes<HTMLTextAreaElement>"
          : `React.HTMLAttributes<HTML${htmlElement.charAt(0).toUpperCase() + htmlElement.slice(1)}Element>`;

  const variantsPart = Object.keys(variants).length > 0 ? `,\n    VariantProps<typeof ${lcFirst(name)}Variants>` : "";
  const extraProps = props
    .filter((p) => !["onClick", "disabled", "placeholder", "children"].includes(p.name))
    .map((p) => `  ${p.name}${p.required ? "" : "?"}: ${p.type};`)
    .join("\n");

  const slotProp = usesSlot ? "\n  asChild?: boolean;" : "";

  return (
    `export interface ${name}Props\n` +
    `  extends ${htmlAttr}${variantsPart} {\n` +
    (extraProps ? extraProps + "\n" : "") +
    slotProp +
    `}`
  );
}

function lcFirst(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function buildImports(componentType: string, hasVariants: boolean, usesSlot: boolean): string {
  const lines: string[] = [`import * as React from "react";`];

  if (usesSlot) {
    lines.push(`import { Slot } from "@radix-ui/react-slot";`);
  }

  if (hasVariants) {
    lines.push(`import { cva, type VariantProps } from "class-variance-authority";`);
  }

  lines.push(`import { cn } from "../../lib/utils";`);

  const radixPkg = RADIX_PRIMITIVE_MAP[componentType];
  if (radixPkg && radixPkg !== "@radix-ui/react-slot") {
    const primitive = componentType.charAt(0).toUpperCase() + componentType.slice(1);
    lines.push(`import * as ${primitive}Primitive from "${radixPkg}";`);
  }

  return lines.join("\n");
}

function buildComponentBody(
  name: string,
  componentType: string,
  htmlElement: string,
  variants: Record<string, string[]>,
  usesSlot: boolean
): string {
  const varName = lcFirst(name) + "Variants";
  const hasVariants = Object.keys(variants).length > 0;

  const variantGroups = Object.entries(variants)
    .map(([group, values]) => buildVariantBlock(group, values))
    .join("\n");

  const defaultVariants = buildDefaultVariants(variants);

  const cvaBlock = hasVariants
    ? `const ${varName} = cva(\n  "${BASE_CLASSES[componentType] ?? BASE_CLASSES.component}",\n  {\n    variants: {\n${variantGroups}\n    },\n    defaultVariants: {\n${defaultVariants}\n    },\n  }\n);\n\n`
    : "";

  const variantParams = Object.keys(variants)
    .map((g) => `${g},`)
    .join(" ");

  const compParam = usesSlot ? "asChild = false, " : "";
  const compInner = usesSlot ? "  const Comp = asChild ? Slot : \"" + htmlElement + "\";\n" : "";
  const compTag = usesSlot ? "Comp" : htmlElement;

  const classNameArg = hasVariants
    ? `cn(${varName}({ ${variantParams} className }))`
    : `cn("${BASE_CLASSES[componentType] ?? BASE_CLASSES.component}", className)`;

  const refType =
    htmlElement === "button"
      ? "HTMLButtonElement"
      : htmlElement === "input"
        ? "HTMLInputElement"
        : htmlElement === "textarea"
          ? "HTMLTextAreaElement"
          : `HTML${htmlElement.charAt(0).toUpperCase() + htmlElement.slice(1)}Element`;

  const isSelfClosing = htmlElement === "input" || htmlElement === "textarea";
  const innerContent = isSelfClosing
    ? `    return (\n      <${compTag}\n        className={${classNameArg}}\n        ref={ref}\n        {...props}\n      />\n    );`
    : `    return (\n      <${compTag}\n        className={${classNameArg}}\n        ref={ref}\n        {...props}\n      />\n    );`;

  return (
    cvaBlock +
    `function ${name}({\n  className,\n  ${variantParams} ${compParam}ref,\n  ...props\n}: ${name}Props & { ref?: React.Ref<${refType}> }) {\n` +
    compInner +
    innerContent +
    `\n}\n\n${name}.displayName = "${name}";`
  );
}

export function generateComponent(requirements: ParsedRequirements): GeneratedComponent {
  const { componentName, componentType, props, variants } = requirements;
  const name = componentName;
  const htmlElement = HTML_ELEMENT_MAP[componentType] ?? "div";
  const usesSlot = componentType === "button";
  const hasVariants = Object.keys(variants).length > 0;

  const imports = buildImports(componentType, hasVariants, usesSlot);
  const propsInterface = buildPropsInterface(name, htmlElement, props, variants, usesSlot);
  const body = buildComponentBody(name, componentType, htmlElement, variants, usesSlot);

  const varName = lcFirst(name) + "Variants";
  const exportLine = hasVariants
    ? `export { ${name}, ${varName} };`
    : `export { ${name} };`;

  const code = [imports, "", propsInterface, "", body, "", exportLine].join("\n");

  return {
    code,
    componentName: name,
    fileName: `${name}.tsx`,
  };
}
