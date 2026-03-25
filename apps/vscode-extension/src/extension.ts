import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { DesignSystemCompletionProvider } from "./completion-provider";

let completionProvider: DesignSystemCompletionProvider;

export function activate(context: vscode.ExtensionContext) {
  // Find the design system root
  const designSystemPath = findDesignSystemPath();

  if (!designSystemPath) {
    vscode.window.showWarningMessage(
      "LaunchApp Design System not found in workspace"
    );
    return;
  }

  // Create and register the completion provider
  completionProvider = new DesignSystemCompletionProvider(designSystemPath);

  const selector: vscode.DocumentSelector = [
    { language: "typescriptreact", scheme: "file" },
    { language: "javascriptreact", scheme: "file" },
  ];

  const completionRegistration = vscode.languages.registerCompletionItemProvider(
    selector,
    completionProvider,
    " ", // Trigger on space
    "=" // Trigger on equals
  );

  context.subscriptions.push(completionRegistration);

  // Register commands
  const showDocCommand = vscode.commands.registerCommand(
    "launchapp.showComponentDocs",
    (componentName: string) => {
      showComponentDocumentation(completionProvider, componentName);
    }
  );

  context.subscriptions.push(showDocCommand);

  console.log("LaunchApp Design System extension activated");
}

export function deactivate() {}

function findDesignSystemPath(): string | null {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    return null;
  }

  for (const folder of workspaceFolders) {
    const workspaceRoot = folder.uri.fsPath;

    // Check if package.json exists and contains @launchapp/design-system
    const packageJsonPath = path.join(workspaceRoot, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, "utf-8")
        );

        // Check if it's the design system itself
        if (packageJson.name === "@launchapp/design-system") {
          return workspaceRoot;
        }

        // Check if design system is installed
        const designSystemPath = path.join(
          workspaceRoot,
          "node_modules",
          "@launchapp",
          "design-system"
        );
        if (fs.existsSync(designSystemPath)) {
          return designSystemPath;
        }

        // Check dependencies
        const allDeps = {
          ...packageJson.dependencies,
          ...packageJson.devDependencies,
          ...packageJson.peerDependencies,
        };

        if (allDeps["@launchapp/design-system"]) {
          const installedPath = path.join(
            workspaceRoot,
            "node_modules",
            "@launchapp",
            "design-system"
          );
          if (fs.existsSync(installedPath)) {
            return installedPath;
          }
        }
      } catch (error) {
        console.error("Error reading package.json:", error);
      }
    }

    // Check for src/components directory
    const componentsPath = path.join(workspaceRoot, "src", "components");
    if (fs.existsSync(componentsPath)) {
      return workspaceRoot;
    }
  }

  return null;
}

function showComponentDocumentation(
  provider: DesignSystemCompletionProvider,
  componentName: string
) {
  const doc = vscode.window.createWebviewPanel(
    "componentDocs",
    `${componentName} Documentation`,
    vscode.ViewColumn.Beside,
    {}
  );

  doc.webview.html = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: system-ui; padding: 20px; }
            h1 { color: #333; }
            .prop { margin: 15px 0; padding: 10px; background: #f5f5f5; border-radius: 4px; }
            .prop-name { font-weight: bold; color: #0066cc; }
            .prop-type { color: #666; font-size: 0.9em; }
        </style>
    </head>
    <body>
        <h1>${componentName}</h1>
        <p>Component documentation panel</p>
    </body>
    </html>
  `;
}
