#!/usr/bin/env node
import { existsSync } from "node:fs";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const REGISTRY_SCHEMA = "https://ui.shadcn.com/schema/registry.json";
const REGISTRY_NAME = "@launchapp/design-system";
const REGISTRY_HOMEPAGE = "https://github.com/launchapp-dev/design-system";

const PACKAGE_MAPPINGS = {
  "@radix-ui/react-accordion": "@radix-ui/react-accordion",
  "@radix-ui/react-alert-dialog": "@radix-ui/react-alert-dialog",
  "@radix-ui/react-aspect-ratio": "@radix-ui/react-aspect-ratio",
  "@radix-ui/react-avatar": "@radix-ui/react-avatar",
  "@radix-ui/react-checkbox": "@radix-ui/react-checkbox",
  "@radix-ui/react-collapsible": "@radix-ui/react-collapsible",
  "@radix-ui/react-context-menu": "@radix-ui/react-context-menu",
  "@radix-ui/react-dialog": "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu": "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-focus-scope": "@radix-ui/react-focus-scope",
  "@radix-ui/react-hover-card": "@radix-ui/react-hover-card",
  "@radix-ui/react-label": "@radix-ui/react-label",
  "@radix-ui/react-menubar": "@radix-ui/react-menubar",
  "@radix-ui/react-navigation-menu": "@radix-ui/react-navigation-menu",
  "@radix-ui/react-popover": "@radix-ui/react-popover",
  "@radix-ui/react-portal": "@radix-ui/react-portal",
  "@radix-ui/react-progress": "@radix-ui/react-progress",
  "@radix-ui/react-radio-group": "@radix-ui/react-radio-group",
  "@radix-ui/react-scroll-area": "@radix-ui/react-scroll-area",
  "@radix-ui/react-select": "@radix-ui/react-select",
  "@radix-ui/react-separator": "@radix-ui/react-separator",
  "@radix-ui/react-slider": "@radix-ui/react-slider",
  "@radix-ui/react-slot": "@radix-ui/react-slot",
  "@radix-ui/react-switch": "@radix-ui/react-switch",
  "@radix-ui/react-tabs": "@radix-ui/react-tabs",
  "@radix-ui/react-toast": "@radix-ui/react-toast",
  "@radix-ui/react-toggle": "@radix-ui/react-toggle",
  "@radix-ui/react-toggle-group": "@radix-ui/react-toggle-group",
  "@radix-ui/react-toolbar": "@radix-ui/react-toolbar",
  "@radix-ui/react-tooltip": "@radix-ui/react-tooltip",
  "@radix-ui/react-visually-hidden": "@radix-ui/react-visually-hidden",
  "class-variance-authority": "class-variance-authority",
  cmdk: "cmdk",
  "react-day-picker": "react-day-picker",
  "react-hook-form": "react-hook-form",
  "@hookform/resolvers": "@hookform/resolvers",
  "react-resizable-panels": "react-resizable-panels",
  recharts: "recharts",
  sonner: "sonner",
  zod: "zod",
  "@tanstack/react-table": "@tanstack/react-table",
  "@dnd-kit/core": "@dnd-kit/core",
  "@dnd-kit/sortable": "@dnd-kit/sortable",
  "@dnd-kit/utilities": "@dnd-kit/utilities",
  "embla-carousel-autoplay": "embla-carousel-autoplay",
  "embla-carousel-react": "embla-carousel-react",
  "date-fns": "date-fns",
  "framer-motion": "framer-motion",
};

const COMPONENT_DEPENDENCY_MAP = {
  alertdialog: ["button"],
  combobox: ["popover", "command"],
  datatable: ["table", "input", "button"],
  datepicker: ["calendar", "popover"],
  form: ["label"],
  kpicard: [],
  multiselect: ["popover", "command", "badge"],
  pagination: ["button"],
  statdisplay: ["kpi-card"],
  togglegroup: ["toggle"],
};

const BLOCK_DEPENDENCY_MAP = {
  "auth/LoginForm": ["form", "input", "button", "checkbox", "label", "card"],
  "auth/SignUpForm": ["form", "input", "button", "checkbox", "label", "card"],
  "auth/ForgotPasswordForm": ["form", "input", "button", "card"],
  "auth/OTPVerification": ["form", "input", "button", "card"],
  "navigation/AppSidebar": ["button", "separator", "collapsible", "avatar"],
  "navigation/TopNav": ["button", "avatar", "dropdown-menu"],
  "navigation/MobileNavDrawer": [
    "sheet",
    "button",
    "separator",
    "collapsible",
    "avatar",
    "block-app-sidebar",
  ],
  "settings/ProfileSettings": [
    "avatar",
    "button",
    "input",
    "textarea",
    "separator",
    "form",
  ],
  "settings/AccountSettings": ["button", "input", "separator", "alert", "form"],
  "settings/NotificationPreferences": ["switch", "label", "separator", "card"],
  "settings/BillingPage": [
    "card",
    "badge",
    "button",
    "progress",
    "separator",
    "table",
  ],
  "marketing/HeroSection": [],
  "marketing/FeatureGrid": ["card"],
  "marketing/PricingTable": ["card", "badge", "button", "separator"],
  "marketing/TestimonialCarousel": ["card", "avatar", "badge"],
  "dashboard/StatsOverview": ["stat-display", "card", "chart"],
  "dashboard/ActivityFeed": [
    "avatar",
    "badge",
    "scroll-area",
    "separator",
    "card",
  ],
  "dashboard/MetricCards": ["card", "chart"],
  "data/FullDataTable": [
    "table",
    "input",
    "button",
    "checkbox",
    "dropdown-menu",
    "popover",
    "select",
    "label",
  ],
  "data/KanbanBoard": [
    "card",
    "badge",
    "avatar",
    "button",
    "input",
    "scroll-area",
  ],
  "ecommerce/ProductCard": ["card", "button", "badge"],
  "ecommerce/ShoppingCart": ["card", "button", "separator", "badge"],
  "ecommerce/CheckoutForm": [
    "form",
    "input",
    "button",
    "label",
    "radio-group",
    "separator",
    "card",
    "badge",
  ],
};

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function extractDependencies(content, componentName) {
  const dependencies = new Set();
  const registryDependencies = new Set();

  for (const [importPattern, packageName] of Object.entries(PACKAGE_MAPPINGS)) {
    if (
      content.includes(`from "${importPattern}"`) ||
      content.includes(`from '${importPattern}'`)
    ) {
      dependencies.add(packageName);
    }
  }

  if (content.includes("class-variance-authority")) {
    dependencies.add("class-variance-authority");
  }

  const kebabName = toKebabCase(componentName);
  if (COMPONENT_DEPENDENCY_MAP[kebabName]) {
    for (const dep of COMPONENT_DEPENDENCY_MAP[kebabName]) {
      registryDependencies.add(dep);
    }
  }

  const componentImportPattern =
    /from\s+["']\.\.\/components\/([A-Za-z]+)["']/g;
  let match;
  while ((match = componentImportPattern.exec(content)) !== null) {
    const importedComponent = toKebabCase(match[1]);
    if (importedComponent !== kebabName) {
      registryDependencies.add(importedComponent);
    }
  }

  return {
    dependencies: Array.from(dependencies).sort(),
    registryDependencies: Array.from(registryDependencies).sort(),
  };
}

async function getComponentFiles(componentDir) {
  const files = [];
  const componentPath = join(ROOT, "src/components", componentDir);

  if (!existsSync(componentPath)) {
    return files;
  }

  const componentFile = join(componentPath, `${componentDir}.tsx`);
  if (existsSync(componentFile)) {
    files.push({
      path: `src/components/${componentDir}/${componentDir}.tsx`,
      type: "registry:ui",
    });
  }

  const indexFile = join(componentPath, "index.ts");
  if (existsSync(indexFile)) {
    files.push({
      path: `src/components/${componentDir}/index.ts`,
      type: "registry:ui",
    });
  }

  const additionalFiles = {
    Toast: ["useToast.ts"],
  };

  if (additionalFiles[componentDir]) {
    for (const extraFile of additionalFiles[componentDir]) {
      const filePath = join(componentPath, extraFile);
      if (existsSync(filePath)) {
        files.push({
          path: `src/components/${componentDir}/${extraFile}`,
          type: "registry:ui",
        });
      }
    }
  }

  return files;
}

async function scanComponents() {
  const componentsDir = join(ROOT, "src/components");
  const entries = await readdir(componentsDir);
  const items = [];

  for (const entry of entries) {
    const entryPath = join(componentsDir, entry);
    const stats = await stat(entryPath);

    if (!stats.isDirectory()) continue;

    const componentFile = join(entryPath, `${entry}.tsx`);
    if (!existsSync(componentFile)) continue;

    const content = await readFile(componentFile, "utf-8");
    const files = await getComponentFiles(entry);
    const { dependencies, registryDependencies } = extractDependencies(
      content,
      entry,
    );

    const kebabName = toKebabCase(entry);

    items.push({
      name: kebabName,
      type: "registry:ui",
      files,
      dependencies: dependencies.length > 0 ? dependencies : undefined,
      devDependencies: [],
      registryDependencies:
        registryDependencies.length > 0 ? registryDependencies : undefined,
    });
  }

  return items;
}

function _getBlockFiles(blockPath) {
  const files = [];
  const fullPath = join(ROOT, blockPath);

  if (existsSync(fullPath)) {
    files.push({
      path: blockPath,
      type: "registry:block",
    });
  }

  return files;
}

async function scanBlocks() {
  const blocksDir = join(ROOT, "src/blocks");
  const items = [];

  async function scanDir(dir, relativePath = "") {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = join(dir, entry.name);
      const entryRelativePath = relativePath
        ? `${relativePath}/${entry.name}`
        : entry.name;

      if (entry.isDirectory()) {
        await scanDir(entryPath, entryRelativePath);
      } else if (
        entry.name.endsWith(".tsx") &&
        !entry.name.includes(".stories.")
      ) {
        const blockName = entry.name.replace(".tsx", "");
        const blockKey = `${relativePath}/${blockName}`;
        const registryName = `block-${toKebabCase(blockName)}`;

        const content = await readFile(entryPath, "utf-8");

        let registryDeps = [];
        if (BLOCK_DEPENDENCY_MAP[blockKey]) {
          registryDeps = BLOCK_DEPENDENCY_MAP[blockKey];
        }

        const deps = new Set();
        for (const [importPattern, packageName] of Object.entries(
          PACKAGE_MAPPINGS,
        )) {
          if (
            content.includes(`from "${importPattern}"`) ||
            content.includes(`from '${importPattern}'`)
          ) {
            deps.add(packageName);
          }
        }

        items.push({
          name: registryName,
          type: "registry:block",
          files: [
            { path: `src/blocks/${blockKey}.tsx`, type: "registry:block" },
          ],
          dependencies: deps.size > 0 ? Array.from(deps).sort() : undefined,
          devDependencies: [],
          registryDependencies:
            registryDeps.length > 0 ? registryDeps : undefined,
        });
      }
    }
  }

  if (existsSync(blocksDir)) {
    await scanDir(blocksDir);
  }

  return items;
}

function getUtilsItem() {
  return {
    name: "utils",
    type: "registry:lib",
    files: [
      {
        path: "src/lib/utils.ts",
        type: "registry:lib",
      },
    ],
    dependencies: ["clsx", "tailwind-merge"],
  };
}

async function generateRegistry() {
  console.log("Scanning components...");
  const components = await scanComponents();
  console.log(`Found ${components.length} components`);

  console.log("Scanning blocks...");
  const blocks = await scanBlocks();
  console.log(`Found ${blocks.length} blocks`);

  const items = [getUtilsItem(), ...components, ...blocks];

  const registry = {
    $schema: REGISTRY_SCHEMA,
    name: REGISTRY_NAME,
    homepage: REGISTRY_HOMEPAGE,
    items: items.map((item) => ({
      name: item.name,
      type: item.type,
      files: item.files,
      ...(item.dependencies && { dependencies: item.dependencies }),
      devDependencies: item.devDependencies || [],
      ...(item.registryDependencies && {
        registryDependencies: item.registryDependencies,
      }),
    })),
  };

  const outputPath = join(ROOT, "registry.json");
  await writeFile(outputPath, `${JSON.stringify(registry, null, 2)}\n`);
  console.log(`\nRegistry generated at ${outputPath}`);
  console.log(`Total items: ${items.length}`);
}

generateRegistry().catch((err) => {
  console.error("Error generating registry:", err);
  process.exit(1);
});
