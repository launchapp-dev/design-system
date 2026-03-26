import * as vscode from "vscode";

interface TokenInfo {
  name: string;
  description: string;
  category: string;
  examples: string[];
}

const DESIGN_TOKENS: Record<string, TokenInfo> = {
  // Color tokens
  "--la-border": {
    name: "Border",
    description: "Border color for UI elements",
    category: "Color",
    examples: ["border-gray-200", "border"],
  },
  "--la-input": {
    name: "Input",
    description: "Input field background color",
    category: "Color",
    examples: ["bg-input", "input:focus"],
  },
  "--la-ring": {
    name: "Ring",
    description: "Focus ring color for interactive elements",
    category: "Color",
    examples: ["ring", "focus:ring"],
  },
  "--la-background": {
    name: "Background",
    description: "Main background color",
    category: "Color",
    examples: ["bg-background", "bg"],
  },
  "--la-foreground": {
    name: "Foreground",
    description: "Main text foreground color",
    category: "Color",
    examples: ["text-foreground", "text"],
  },
  "--la-primary": {
    name: "Primary",
    description: "Primary brand color",
    category: "Color",
    examples: ["bg-primary", "text-primary"],
  },
  "--la-primary-foreground": {
    name: "Primary Foreground",
    description: "Text color on primary background",
    category: "Color",
    examples: ["text-primary-foreground"],
  },
  "--la-secondary": {
    name: "Secondary",
    description: "Secondary brand color",
    category: "Color",
    examples: ["bg-secondary"],
  },
  "--la-secondary-foreground": {
    name: "Secondary Foreground",
    description: "Text color on secondary background",
    category: "Color",
    examples: ["text-secondary-foreground"],
  },
  "--la-destructive": {
    name: "Destructive",
    description: "Color for destructive actions",
    category: "Color",
    examples: ["bg-destructive", "text-destructive"],
  },
  "--la-destructive-foreground": {
    name: "Destructive Foreground",
    description: "Text color on destructive background",
    category: "Color",
    examples: ["text-destructive-foreground"],
  },
  "--la-muted": {
    name: "Muted",
    description: "Muted background color",
    category: "Color",
    examples: ["bg-muted", "hover:bg-muted"],
  },
  "--la-muted-foreground": {
    name: "Muted Foreground",
    description: "Muted text color",
    category: "Color",
    examples: ["text-muted-foreground"],
  },
  "--la-accent": {
    name: "Accent",
    description: "Accent color for highlights",
    category: "Color",
    examples: ["bg-accent", "text-accent"],
  },
  "--la-accent-foreground": {
    name: "Accent Foreground",
    description: "Text color on accent background",
    category: "Color",
    examples: ["text-accent-foreground"],
  },
  "--la-popover": {
    name: "Popover",
    description: "Popover background color",
    category: "Color",
    examples: ["bg-popover"],
  },
  "--la-popover-foreground": {
    name: "Popover Foreground",
    description: "Text color on popover",
    category: "Color",
    examples: ["text-popover-foreground"],
  },
  "--la-card": {
    name: "Card",
    description: "Card background color",
    category: "Color",
    examples: ["bg-card"],
  },
  "--la-card-foreground": {
    name: "Card Foreground",
    description: "Text color on card",
    category: "Color",
    examples: ["text-card-foreground"],
  },
  "--la-chart-1": {
    name: "Chart 1",
    description: "Chart color 1",
    category: "Color",
    examples: ["fill-chart-1"],
  },
  "--la-chart-2": {
    name: "Chart 2",
    description: "Chart color 2",
    category: "Color",
    examples: ["fill-chart-2"],
  },
  "--la-chart-3": {
    name: "Chart 3",
    description: "Chart color 3",
    category: "Color",
    examples: ["fill-chart-3"],
  },
  "--la-chart-4": {
    name: "Chart 4",
    description: "Chart color 4",
    category: "Color",
    examples: ["fill-chart-4"],
  },
  "--la-chart-5": {
    name: "Chart 5",
    description: "Chart color 5",
    category: "Color",
    examples: ["fill-chart-5"],
  },

  // Radius tokens
  "--la-radius": {
    name: "Radius",
    description: "Border radius token",
    category: "Spacing",
    examples: ["rounded", "rounded-lg"],
  },

  // Font tokens
  "--la-font-sans": {
    name: "Font Sans",
    description: "Sans-serif font stack",
    category: "Typography",
    examples: ["font-sans"],
  },
  "--la-font-mono": {
    name: "Font Mono",
    description: "Monospace font stack",
    category: "Typography",
    examples: ["font-mono"],
  },
};

export class TokenHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.Hover> {
    const range = document.getWordRangeAtPosition(position);
    if (!range) {
      return null;
    }

    const word = document.getText(range);
    const line = document.lineAt(position).text;

    // Check if we're looking at a design token reference
    const tokenMatch = line.match(/--la-[\w-]+/g);
    if (!tokenMatch) {
      return null;
    }

    // Find the specific token at cursor position
    const tokenAtCursor = this.getTokenAtPosition(line, position.character);
    if (!tokenAtCursor) {
      return null;
    }

    const tokenInfo = DESIGN_TOKENS[tokenAtCursor];
    if (!tokenInfo) {
      return null;
    }

    const markdown = new vscode.MarkdownString();
    markdown.appendMarkdown(`**${tokenInfo.name}** \`${tokenAtCursor}\`\n\n`);
    markdown.appendMarkdown(`${tokenInfo.description}\n\n`);
    markdown.appendMarkdown(`**Category:** ${tokenInfo.category}\n\n`);
    markdown.appendMarkdown(`**Examples:**\n`);
    tokenInfo.examples.forEach((example) => {
      markdown.appendMarkdown(`- \`${example}\`\n`);
    });

    return new vscode.Hover(markdown);
  }

  private getTokenAtPosition(line: string, position: number): string | null {
    const tokenRegex = /--la-[\w-]+/g;
    let match;

    while ((match = tokenRegex.exec(line)) !== null) {
      const tokenStart = match.index;
      const tokenEnd = match.index + match[0].length;

      if (position >= tokenStart && position <= tokenEnd) {
        return match[0];
      }
    }

    return null;
  }
}

export class TokenCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.CompletionItem[] {
    // Only provide token completions after --la- prefix
    const line = document.lineAt(position).text;
    const linePrefix = line.substring(0, position.character);

    // Check if we're in a context where tokens are relevant
    const isInCSS =
      document.languageId === "css" ||
      document.languageId === "scss" ||
      document.languageId === "postcss";
    const isInJSString =
      linePrefix.includes('"') || linePrefix.includes("'");
    const isInTemplate = linePrefix.includes("`");

    if (!isInCSS && !isInJSString && !isInTemplate) {
      return [];
    }

    // Check if we have a partial token match
    const tokenMatch = linePrefix.match(/--la-[\w-]*$/);
    if (!tokenMatch) {
      return [];
    }

    const items: vscode.CompletionItem[] = [];

    Object.entries(DESIGN_TOKENS).forEach(([tokenName, tokenInfo]) => {
      const item = new vscode.CompletionItem(
        tokenName,
        vscode.CompletionItemKind.Variable
      );

      item.detail = `${tokenInfo.category} - ${tokenInfo.name}`;
      item.documentation = new vscode.MarkdownString(
        `${tokenInfo.description}\n\n**Examples:** ${tokenInfo.examples.join(", ")}`
      );
      item.insertText = tokenName;

      items.push(item);
    });

    return items;
  }
}
