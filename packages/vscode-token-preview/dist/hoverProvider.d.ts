import * as vscode from 'vscode';
import { Token } from './tokenExtractor';
export declare class DesignTokenHoverProvider implements vscode.HoverProvider {
    private workspaceRoot;
    private tokens;
    private lastConfigPath;
    constructor(workspaceRoot: string);
    private loadTokens;
    reloadTokens(configPath?: string): void;
    provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover>;
    private createHoverContent;
}
