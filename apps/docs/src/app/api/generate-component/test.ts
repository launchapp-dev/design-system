import { generateComponent } from "../../../lib/component-generator";

async function testComponentGeneration() {
  console.log("Testing component generation...\n");

  try {
    const result = await generateComponent({
      description: "Card component with header and footer sections",
      requirements:
        "Should have variant for elevated and outline styles, support for different content layouts",
    });

    console.log("Generated Component:");
    console.log("=====================");
    console.log(`Component Name: ${result.componentName}`);
    console.log(`Generated At: ${result.timestamp}`);
    console.log("\nGenerated Code:");
    console.log("-----");
    console.log(result.code);
    console.log("-----\n");

    // Basic validation
    const hasReactImport = result.code.includes("import * as React");
    const hasForwardRef = result.code.includes("React.forwardRef");
    const hasCVA = result.code.includes("cva");
    const hasCN = result.code.includes("cn(");
    const hasExport = result.code.includes("export");

    console.log("Validation Results:");
    console.log(`✓ React import: ${hasReactImport ? "✓" : "✗"}`);
    console.log(`✓ ForwardRef usage: ${hasForwardRef ? "✓" : "✗"}`);
    console.log(`✓ CVA usage: ${hasCVA ? "✓" : "✗"}`);
    console.log(`✓ cn() utility: ${hasCN ? "✓" : "✗"}`);
    console.log(`✓ Export statement: ${hasExport ? "✓" : "✗"}`);

    const allValid =
      hasReactImport && hasForwardRef && hasCVA && hasCN && hasExport;
    console.log(
      `\n${allValid ? "✓ All checks passed!" : "✗ Some checks failed"}`,
    );
  } catch (error) {
    console.error("Error during testing:");
    console.error(error);
    process.exit(1);
  }
}

testComponentGeneration();
