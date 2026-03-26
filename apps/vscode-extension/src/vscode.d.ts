declare module 'vscode' {
  export type ProviderResult<T> = T | Thenable<T> | null | undefined;

  export namespace window {
    function showWarningMessage(message: string): Promise<string | undefined>;
    function showErrorMessage(message: string): Promise<string | undefined>;
    function createWebviewPanel(
      viewType: string,
      title: string,
      column: ViewColumn,
      options?: any
    ): WebviewPanel;
    function showQuickPick(
      items: string[] | Promise<string[]>,
      options?: QuickPickOptions
    ): Promise<string | undefined>;
    function showQuickPick(
      items: QuickPickItem[] | Promise<QuickPickItem[]>,
      options?: QuickPickOptions
    ): Promise<QuickPickItem | undefined>;
    const activeTextEditor: TextEditor | undefined;
  }

  export interface QuickPickOptions {
    placeHolder?: string;
    matchOnDescription?: boolean;
    matchOnDetail?: boolean;
  }

  export interface QuickPickItem {
    label: string;
    description?: string;
    detail?: string;
  }

  export interface TextEditor {
    readonly selection: Selection;
    edit(callback: (editBuilder: TextEditorEdit) => void): Promise<boolean>;
  }

  export interface TextEditorEdit {
    insert(location: Position, value: string): void;
    delete(range: Range): void;
    replace(range: Range, value: string): void;
  }

  export class Selection extends Range {
    constructor(anchor: Position, active: Position);
    readonly anchor: Position;
    readonly active: Position;
  }

  export namespace workspace {
    const workspaceFolders: WorkspaceFolder[] | undefined;
  }

  export namespace languages {
    function registerCompletionItemProvider(
      selector: DocumentSelector | DocumentSelector[],
      provider: CompletionItemProvider,
      ...triggerCharacters: string[]
    ): Disposable;

    function registerHoverProvider(
      selector: DocumentSelector | DocumentSelector[],
      provider: HoverProvider
    ): Disposable;
  }

  export namespace commands {
    function registerCommand(
      command: string,
      callback: (...args: any[]) => any,
      thisArg?: any
    ): Disposable;
  }

  export interface Disposable {
    dispose(): void;
  }

  export interface ExtensionContext {
    subscriptions: Disposable[];
  }

  export interface WorkspaceFolder {
    uri: Uri;
  }

  export interface Uri {
    fsPath: string;
  }

  export type DocumentSelector = (DocumentFilter | string)[];

  export interface DocumentFilter {
    language?: string;
    scheme?: string;
    pattern?: string;
  }

  export interface TextDocument {
    lineAt(line: number): TextLine;
    getText(range?: Range): string;
    getWordRangeAtPosition(position: Position, regex?: RegExp): Range | undefined;
    readonly languageId: string;
  }

  export interface TextLine {
    readonly text: string;
  }

  export class Position {
    constructor(line: number, character: number);
    readonly line: number;
    readonly character: number;
  }

  export class Range {
    constructor(start: Position, end: Position);
    readonly start: Position;
    readonly end: Position;
  }

  export interface CancellationToken {
    readonly isCancellationRequested: boolean;
  }

  export interface CompletionContext {
    readonly triggerCharacter?: string;
  }

  export interface CompletionItemProvider {
    provideCompletionItems(
      document: TextDocument,
      position: Position,
      token: CancellationToken,
      context: CompletionContext
    ): ProviderResult<CompletionItem[]>;
    resolveCompletionItem?(item: CompletionItem, token: CancellationToken): ProviderResult<CompletionItem>;
  }

  export interface HoverProvider {
    provideHover(
      document: TextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<Hover>;
  }

  export class CompletionItem {
    constructor(label: string, kind?: CompletionItemKind);
    label: string;
    kind?: CompletionItemKind;
    detail?: string;
    documentation?: string | MarkdownString;
    sortText?: string;
    insertText?: string;
    command?: Command;
  }

  export interface Command {
    title: string;
    command: string;
    arguments?: any[];
  }

  export enum CompletionItemKind {
    Text = 0,
    Method = 1,
    Function = 2,
    Constructor = 3,
    Field = 4,
    Variable = 5,
    Class = 6,
    Interface = 7,
    Module = 8,
    Property = 9,
    Unit = 10,
    Value = 11,
    Enum = 12,
    Keyword = 13,
    Snippet = 14,
    Color = 15,
    File = 16,
    Reference = 17,
    Folder = 18,
    EnumMember = 19,
    Constant = 20,
    Struct = 21,
    Event = 22,
    Operator = 23,
    TypeParameter = 24
  }

  export class Hover {
    constructor(contents: MarkdownString | string);
  }

  export class MarkdownString {
    constructor(value?: string);
    appendMarkdown(value: string): MarkdownString;
  }

  export interface WebviewPanel {
    readonly webview: Webview;
  }

  export interface Webview {
    html: string;
  }

  export enum ViewColumn {
    One = 1,
    Two = 2,
    Three = 3,
    Beside = -2
  }

  export type Thenable<T> = Promise<T>;
}
