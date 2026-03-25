import * as vscode from 'vscode';
import { DesignTokenHoverProvider } from './hoverProvider';

let hoverProvider: DesignTokenHoverProvider;

export function activate(context: vscode.ExtensionContext) {
  const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

  if (!workspaceRoot) {
    vscode.window.showWarningMessage(
      'Design Token Preview: No workspace folder found'
    );
    return;
  }

  hoverProvider = new DesignTokenHoverProvider(workspaceRoot);

  const languages = [
    'css',
    'scss',
    'less',
    'html',
    'typescript',
    'typescriptreact',
    'javascript',
    'javascriptreact',
  ];

  const hoverDisposables = languages.map((language) =>
    vscode.languages.registerHoverProvider(language, hoverProvider)
  );

  context.subscriptions.push(...hoverDisposables);

  const fileWatcher = vscode.workspace.createFileSystemWatcher('**/globals.css');
  fileWatcher.onDidChange(() => {
    hoverProvider.reloadTokens();
    vscode.window.showInformationMessage(
      'Design Token Preview: Tokens reloaded'
    );
  });

  context.subscriptions.push(fileWatcher);

  vscode.window.showInformationMessage(
    'Design Token Preview extension activated'
  );
}

export function deactivate() {
  // Cleanup if needed
}
