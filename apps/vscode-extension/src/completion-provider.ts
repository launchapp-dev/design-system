import * as vscode from "vscode";
import { PropExtractor } from "./prop-extractor";

interface ComponentContext {
  name: string;
  isJSXTag: boolean;
}

export class DesignSystemCompletionProvider
  implements vscode.CompletionItemProvider
{
  private propExtractor: PropExtractor;
  private componentNamesCache: Set<string> = new Set();

  constructor(designSystemPath: string) {
    this.propExtractor = new PropExtractor(designSystemPath);
    this.initializeComponentNames();
  }

  private initializeComponentNames(): void {
    const names = this.propExtractor.getAllComponentNames();
    names.forEach((name) => this.componentNamesCache.add(name));
  }

  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.CompletionItem[] {
    const line = document.lineAt(position).text;
    const linePrefix = line.substring(0, position.character);

    // Check if we're in a JSX context
    const componentContext = this.extractComponentContext(
      document,
      position,
      linePrefix
    );

    if (!componentContext) {
      return [];
    }

    // If we're completing a prop name
    if (linePrefix.includes(" ") && !linePrefix.includes("=")) {
      return this.completePropNames(componentContext.name);
    }

    // If we're completing a prop value
    if (linePrefix.includes("=")) {
      return this.completePropValues(componentContext.name, linePrefix);
    }

    return [];
  }

  private extractComponentContext(
    document: vscode.TextDocument,
    position: vscode.Position,
    linePrefix: string
  ): ComponentContext | null {
    // Look for opening JSX tags
    const tagMatch = linePrefix.match(/<(\w+)\s*$/);
    if (!tagMatch) {
      return null;
    }

    const componentName = tagMatch[1];

    // Check if it's a design system component
    if (!this.componentNamesCache.has(componentName)) {
      return null;
    }

    return {
      name: componentName,
      isJSXTag: true,
    };
  }

  private completePropNames(componentName: string): vscode.CompletionItem[] {
    const componentInfo = this.propExtractor.getComponent(componentName);
    if (!componentInfo) {
      return [];
    }

    const items: vscode.CompletionItem[] = [];

    // Add standard HTML attributes first
    const htmlAttrs = [
      "className",
      "style",
      "id",
      "key",
      "ref",
      "children",
    ];
    htmlAttrs.forEach((attr) => {
      const item = new vscode.CompletionItem(
        attr,
        vscode.CompletionItemKind.Property
      );
      item.detail = "HTML attribute";
      item.sortText = `0_${attr}`;
      items.push(item);
    });

    // Add component-specific props
    componentInfo.props.forEach((prop) => {
      const item = new vscode.CompletionItem(
        prop.name,
        vscode.CompletionItemKind.Property
      );

      item.detail = prop.type;
      item.documentation = new vscode.MarkdownString(
        this.formatPropDocumentation(prop)
      );
      item.sortText = `1_${prop.name}`;
      item.insertText = `${prop.name}=`;
      item.command = {
        title: "Trigger Suggest",
        command: "editor.action.triggerSuggest",
      };

      items.push(item);
    });

    // Add variant props with special handling
    if (componentInfo.variantInfo) {
      Object.entries(componentInfo.variantInfo).forEach(
        ([variantName, variantData]) => {
          // Check if prop is already in the list
          if (!componentInfo.props.find((p) => p.name === variantName)) {
            const item = new vscode.CompletionItem(
              variantName,
              vscode.CompletionItemKind.EnumMember
            );

            item.detail = `"${variantData.options.join('" | "')}"`;
            const defaultStr = variantData.default
              ? ` (default: "${variantData.default}")`
              : "";
            item.documentation = new vscode.MarkdownString(
              `**Variant:** ${variantData.options.join(", ")}${defaultStr}`
            );
            item.sortText = `1_${variantName}`;
            item.insertText = `${variantName}=`;
            item.command = {
              title: "Trigger Suggest",
              command: "editor.action.triggerSuggest",
            };

            items.push(item);
          }
        }
      );
    }

    return items;
  }

  private completePropValues(
    componentName: string,
    linePrefix: string
  ): vscode.CompletionItem[] {
    // Extract the prop name being completed
    const propMatch = linePrefix.match(/(\w+)="[^"]*$/);
    if (!propMatch) {
      return [];
    }

    const propName = propMatch[1];
    const componentInfo = this.propExtractor.getComponent(componentName);
    if (!componentInfo || !componentInfo.variantInfo) {
      return [];
    }

    // Check if this prop has variant options
    const variantData = componentInfo.variantInfo[propName];
    if (!variantData) {
      return [];
    }

    const items: vscode.CompletionItem[] = [];

    variantData.options.forEach((option) => {
      const item = new vscode.CompletionItem(
        option,
        vscode.CompletionItemKind.EnumMember
      );

      item.detail = option === variantData.default ? "default" : "variant";
      item.sortText = option === variantData.default ? "0_default" : option;
      item.insertText = `${option}"`;

      items.push(item);
    });

    return items;
  }

  private formatPropDocumentation(prop: any): string {
    let doc = `**${prop.name}**: \`${prop.type}\``;

    if (!prop.required) {
      doc += " _(optional)_";
    }

    if (prop.default) {
      doc += `\n\nDefault: \`${prop.default}\``;
    }

    if (prop.description) {
      doc += `\n\n${prop.description}`;
    }

    return doc;
  }

  resolveCompletionItem(
    item: vscode.CompletionItem,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.CompletionItem> {
    return item;
  }
}
