import * as vscode from "vscode";
import { PropCompletionProvider } from "./propIntelliSense";
import { TokenPreviewCommand } from "./tokenPreview";
import { ComponentRegistry } from "./registry";

export async function activate(context: vscode.ExtensionContext) {
  console.log("LaunchApp Design System extension activated");

  // Load component registry
  const registry = new ComponentRegistry();
  await registry.load();

  // Register prop completion provider
  const propProvider = new PropCompletionProvider(registry);
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      ["typescriptreact", "javascriptreact"],
      propProvider,
      " ",
      "\n",
      "="
    )
  );

  // Register token preview command
  const tokenPreview = new TokenPreviewCommand();
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "launchapp-design-system.previewToken",
      () => tokenPreview.execute()
    )
  );

  // Status bar indicator
  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBar.text = "$(icon-design) LaunchApp DS";
  statusBar.tooltip = "LaunchApp Design System - Press Cmd/Ctrl+Shift+T to preview token";
  statusBar.show();
  context.subscriptions.push(statusBar);
}

export function deactivate() {
  console.log("LaunchApp Design System extension deactivated");
}
