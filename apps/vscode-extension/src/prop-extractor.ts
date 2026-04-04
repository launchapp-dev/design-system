import * as fs from "node:fs";
import * as path from "node:path";

interface PropInfo {
  name: string;
  type: string;
  description?: string;
  required: boolean;
  default?: string;
  variants?: Record<string, string[]>;
}

interface ComponentInfo {
  name: string;
  filePath: string;
  props: PropInfo[];
  documentation?: string;
  variantInfo?: {
    [key: string]: {
      options: string[];
      default?: string;
    };
  };
}

export class PropExtractor {
  private componentCache: Map<string, ComponentInfo> = new Map();
  private designSystemPath: string;

  constructor(designSystemPath: string) {
    this.designSystemPath = designSystemPath;
  }

  extractAllComponents(): ComponentInfo[] {
    const componentsDir = path.join(this.designSystemPath, "src", "components");
    if (!fs.existsSync(componentsDir)) {
      return [];
    }

    const components: ComponentInfo[] = [];
    const dirs = fs.readdirSync(componentsDir);

    for (const dir of dirs) {
      const componentPath = path.join(componentsDir, dir);
      const stat = fs.statSync(componentPath);

      if (!stat.isDirectory()) continue;

      const componentFile = path.join(componentPath, `${dir}.tsx`);
      if (!fs.existsSync(componentFile)) continue;

      const componentInfo = this.extractComponent(componentFile, dir);
      if (componentInfo) {
        components.push(componentInfo);
        this.componentCache.set(dir, componentInfo);
      }
    }

    return components;
  }

  private extractComponent(
    filePath: string,
    componentName: string,
  ): ComponentInfo | null {
    try {
      const content = fs.readFileSync(filePath, "utf-8");

      const props = this.extractProps(content, componentName);
      const variantInfo = this.extractVariants(content, componentName);
      const documentation = this.extractDocumentation(content, componentName);

      return {
        name: componentName,
        filePath,
        props,
        documentation,
        variantInfo,
      };
    } catch (error) {
      console.error(`Failed to extract component ${componentName}:`, error);
      return null;
    }
  }

  private extractProps(content: string, componentName: string): PropInfo[] {
    const props: PropInfo[] = [];

    // Find interface definition for [ComponentName]Props
    const interfaceRegex = new RegExp(
      `export interface ${componentName}Props[\\s\\S]*?\\{([\\s\\S]*?)\\}`,
      "m",
    );
    const interfaceMatch = content.match(interfaceRegex);

    if (interfaceMatch) {
      const interfaceBody = interfaceMatch[1];
      // Extract individual props
      const propPattern = /(\w+)\s*\??:\s*([^;]+);/g;
      let match;

      while ((match = propPattern.exec(interfaceBody)) !== null) {
        const [, propName, propType] = match;
        const required = !match[0].includes("?");

        props.push({
          name: propName.trim(),
          type: propType.trim(),
          required,
        });
      }
    }

    // Also extract props from extends
    const extendsRegex = /extends ([^{]+)\{/m;
    const extendsMatch = content.match(extendsRegex);
    if (extendsMatch) {
      const extendsStr = extendsMatch[1];
      // Parse common React HTML attributes
      if (extendsStr.includes("HTMLAttributes")) {
        props.push(
          {
            name: "className",
            type: "string",
            required: false,
            description: "CSS class name for custom styling",
          },
          {
            name: "children",
            type: "React.ReactNode",
            required: false,
            description: "Child elements",
          },
          {
            name: "ref",
            type: "React.Ref",
            required: false,
            description: "Forward ref",
          },
        );
      }
    }

    // Add standard Radix UI props
    if (content.includes("VariantProps")) {
      props.push({
        name: "variant",
        type: "string",
        required: false,
        description: "Visual variant of the component",
        default: "default",
      });
      props.push({
        name: "size",
        type: "string",
        required: false,
        description: "Size variant of the component",
        default: "md",
      });
    }

    if (content.includes("asChild")) {
      props.push({
        name: "asChild",
        type: "boolean",
        required: false,
        description: "Change the component to a different HTML element",
        default: "false",
      });
    }

    return props;
  }

  private extractVariants(
    content: string,
    _componentName: string,
  ): Record<string, { options: string[]; default?: string }> | undefined {
    const variantInfo: Record<string, { options: string[]; default?: string }> =
      {};

    // Look for CVA variants definition
    const cvaRegex =
      /const (\w+)Variants = cva\(\s*[^{]*\{[^}]*variants:\s*\{([^}]+)\}[^}]*defaultVariants:\s*\{([^}]+)\}/ms;
    const cvaMatch = content.match(cvaRegex);

    if (cvaMatch) {
      const variantsBlock = cvaMatch[2];
      const defaultsBlock = cvaMatch[3];

      // Extract variant options
      const variantKeyPattern = /(\w+):\s*\{([^}]+)\}/g;
      let match;

      while ((match = variantKeyPattern.exec(variantsBlock)) !== null) {
        const variantName = match[1];
        const variantValues = match[2];

        const options: string[] = [];
        const optionPattern = /"([^"]+)"/g;
        let optMatch;

        while ((optMatch = optionPattern.exec(variantValues)) !== null) {
          options.push(optMatch[1]);
        }

        if (options.length > 0) {
          variantInfo[variantName] = { options };
        }
      }

      // Extract default values
      const defaultPattern = /(\w+):\s*"([^"]+)"/g;
      while ((match = defaultPattern.exec(defaultsBlock)) !== null) {
        const variantName = match[1];
        const defaultValue = match[2];

        if (variantInfo[variantName]) {
          variantInfo[variantName].default = defaultValue;
        }
      }
    }

    return Object.keys(variantInfo).length > 0 ? variantInfo : undefined;
  }

  private extractDocumentation(
    content: string,
    componentName: string,
  ): string | undefined {
    // Look for JSDoc comments before component declaration
    const docRegex = new RegExp(
      `/\\*\\*([^*]*(?:\\*(?!\\/)[^*]*)*)\\*\\/\\s*(?:export\\s+)?(?:const|function)\\s+${componentName}`,
      "m",
    );
    const docMatch = content.match(docRegex);

    if (docMatch) {
      return docMatch[1]
        .split("\n")
        .map((line) => line.replace(/^\s*\*\s?/, "").trim())
        .filter((line) => line.length > 0)
        .join("\n");
    }

    return undefined;
  }

  getComponent(name: string): ComponentInfo | undefined {
    if (this.componentCache.has(name)) {
      return this.componentCache.get(name);
    }

    // Try to find and load if not cached
    const componentsDir = path.join(this.designSystemPath, "src", "components");
    const componentFile = path.join(componentsDir, name, `${name}.tsx`);

    if (fs.existsSync(componentFile)) {
      const result = this.extractComponent(componentFile, name);
      return result || undefined;
    }

    return undefined;
  }

  getAllComponentNames(): string[] {
    const componentsDir = path.join(this.designSystemPath, "src", "components");
    if (!fs.existsSync(componentsDir)) {
      return [];
    }

    return fs
      .readdirSync(componentsDir)
      .filter((dir) => {
        const componentPath = path.join(componentsDir, dir);
        const stat = fs.statSync(componentPath);
        if (!stat.isDirectory()) return false;

        const componentFile = path.join(componentPath, `${dir}.tsx`);
        return fs.existsSync(componentFile);
      })
      .sort();
  }
}
