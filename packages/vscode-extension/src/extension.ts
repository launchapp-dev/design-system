import * as vscode from "vscode";

let componentProvider: ComponentCompletionProvider;
let tokenProvider: TokenCompletionProvider;

export function activate(context: vscode.ExtensionContext) {
  console.log("LaunchApp Design System extension activated");

  // Register component completion provider
  componentProvider = new ComponentCompletionProvider();
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { scheme: "file", language: "typescriptreact" },
      componentProvider,
      "<"
    )
  );

  // Register design token completion provider
  tokenProvider = new TokenCompletionProvider();
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { scheme: "file", language: "typescriptreact" },
      tokenProvider,
      "-"
    )
  );

  // Register insert component command
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "launchapp-ds.insertComponent",
      async () => {
        await insertComponentCommand();
      }
    )
  );

  // Register preview token command
  context.subscriptions.push(
    vscode.commands.registerCommand("launchapp-ds.previewToken", () => {
      previewTokenCommand();
    })
  );
}

export function deactivate() {}

class ComponentCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] {
    const items: vscode.CompletionItem[] = [];

    // Component completion items will be populated by sub-tasks
    // This is a placeholder that agents will implement with real components

    return items;
  }

  resolveCompletionItem?(item: vscode.CompletionItem): vscode.CompletionItem {
    return item;
  }
}

class TokenCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] {
    const items: vscode.CompletionItem[] = [];

    // Token completion items will be populated by sub-tasks
    // This is a placeholder that agents will implement with real tokens

    return items;
  }

  resolveCompletionItem?(item: vscode.CompletionItem): vscode.CompletionItem {
    return item;
  }
}

async function insertComponentCommand(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  // Component insertion logic will be implemented by sub-tasks
  vscode.window.showInformationMessage("Component insertion feature coming soon");
}

function previewTokenCommand(): void {
  // Token preview logic will be implemented by sub-tasks
  vscode.window.showInformationMessage("Token preview feature coming soon");
}
