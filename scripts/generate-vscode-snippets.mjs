#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// Utility function to convert CamelCase to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

// Extract variants from CVA definitions
function extractVariantsFromCode(code) {
  const variants = {};

  // Match CVA variant definitions - find variants block
  const variantsMatch = code.match(
    /variants:\s*{([\s\S]*?)},\s*defaultVariants/,
  );

  if (variantsMatch) {
    const variantsBlock = variantsMatch[1];

    // Split by variant type (e.g., variant:, size:, etc.)
    // Look for pattern like: typeName: { value1: "...", value2: "..." }
    const typeRegex = /(\w+):\s*{([^}]*)}/gs;
    let match;

    while ((match = typeRegex.exec(variantsBlock)) !== null) {
      const typeName = match[1];
      const valuesBlock = match[2];

      // Extract all values within this type
      const valueRegex = /(\w+):\s*["']?[^,"']*["']?/g;
      const values = [];
      let valueMatch;

      while ((valueMatch = valueRegex.exec(valuesBlock)) !== null) {
        const valueName = valueMatch[1];
        if (valueName && !values.includes(valueName)) {
          values.push(valueName);
        }
      }

      if (values.length > 0) {
        variants[typeName] = values;
      }
    }
  }

  return variants;
}

// Generate snippet body based on component name and variants
function generateSnippetBody(componentName, variants) {
  const _kebabName = toKebabCase(componentName);
  const props = [];
  let tabIndex = 1;

  // Add variant props
  Object.entries(variants).forEach(([variantType, values]) => {
    if (values.length > 0) {
      props.push(`${variantType}="$${tabIndex}"`);
      tabIndex++;
    }
  });

  // Add common props
  props.push(`className="$${tabIndex}"`);

  // Generate opening tag
  const openTag =
    props.length > 0
      ? `<${componentName} ${props.join(" ")} />`
      : `<${componentName} />`;

  return [openTag];
}

// Main function
async function generateSnippets() {
  console.log("📝 Generating VS Code snippets...");

  // Read registry.json
  const registryPath = join(ROOT, "registry.json");
  const registryContent = await readFile(registryPath, "utf-8");
  const registry = JSON.parse(registryContent);

  const snippets = {};

  // Process each UI component
  for (const item of registry.items) {
    // Skip non-UI components and utils
    if (item.type !== "registry:ui" || !item.files || item.files.length === 0) {
      continue;
    }

    const componentName = item.name;
    const mainFile = item.files.find(
      (f) => f.path.endsWith(".tsx") && !f.path.includes("index"),
    );

    if (!mainFile) {
      continue;
    }

    try {
      const filePath = join(ROOT, mainFile.path);
      const fileContent = await readFile(filePath, "utf-8");

      // Extract component names and variants
      const componentRegex = /export\s*{[\s\n]*([\w,\s]+)\s*}/;
      const matches = fileContent.match(componentRegex);
      let exportedComponents = [];

      if (matches) {
        exportedComponents = matches[1]
          .split(",")
          .map((c) => c.trim())
          .filter(
            (c) =>
              c.length > 0 &&
              !c.includes("Props") &&
              !c.includes("Variants") &&
              !c.includes("Root"),
          );
      }

      // If no matches, try to extract main component name from file
      if (exportedComponents.length === 0) {
        const fileNameMatch = mainFile.path.match(/\/(\w+)\.tsx$/);
        if (fileNameMatch) {
          exportedComponents = [fileNameMatch[1]];
        }
      }

      // Extract variants
      const variants = extractVariantsFromCode(fileContent);

      // Generate snippets for each exported component
      for (const component of exportedComponents) {
        if (component.length === 0) continue;

        const snippetKey = toKebabCase(component);
        const snippetBody = generateSnippetBody(component, variants);

        snippets[snippetKey] = {
          scope: "typescriptreact,jsx",
          prefix: snippetKey,
          body: snippetBody,
          description: `${component} component from @launchapp/design-system`,
        };

        // Add variants as separate snippets if they exist
        Object.entries(variants).forEach(([variantType, values]) => {
          values.forEach((value, index) => {
            if (index < 3) {
              // Only add first 3 variants
              const variantKey = `${snippetKey}-${value}`;
              const variantBody = [
                `<${component} ${variantType}="${value}" $\{1:} />`,
              ];

              snippets[variantKey] = {
                scope: "typescriptreact,jsx",
                prefix: variantKey,
                body: variantBody,
                description: `${component} with ${variantType}="${value}"`,
              };
            }
          });
        });
      }

      console.log(`✓ Generated snippets for ${componentName}`);
    } catch (error) {
      console.warn(`⚠ Could not process ${componentName}:`, error.message);
    }
  }

  // Write snippets to file
  const snippetsPath = join(ROOT, "snippets", "components.json");
  const snippetsDir = join(ROOT, "snippets");

  // Create snippets directory if it doesn't exist
  try {
    await writeFile(snippetsPath, JSON.stringify(snippets, null, 2));
    console.log(`\n✅ Generated ${Object.keys(snippets).length} snippets`);
    console.log(`📁 Snippets written to: snippets/components.json`);
  } catch (error) {
    // Ensure directory exists
    if (error.code === "ENOENT") {
      const fs = await import("node:fs");
      fs.mkdirSync(snippetsDir, { recursive: true });
      await writeFile(snippetsPath, JSON.stringify(snippets, null, 2));
      console.log(`\n✅ Generated ${Object.keys(snippets).length} snippets`);
      console.log(`📁 Snippets written to: snippets/components.json`);
    } else {
      throw error;
    }
  }
}

generateSnippets().catch((error) => {
  console.error("❌ Error generating snippets:", error);
  process.exit(1);
});
