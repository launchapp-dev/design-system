import * as vscode from "vscode";

let componentProvider: ComponentCompletionProvider;
let tokenProvider: TokenCompletionProvider;

const COMPONENTS = [
  {
    name: "Button",
    description: "Interactive button component",
    template: `<Button>Click me</Button>`,
    imports: `import { Button } from "@launchapp/design-system";`,
  },
  {
    name: "Input",
    description: "Text input component",
    template: `<Input placeholder="Enter text..." />`,
    imports: `import { Input } from "@launchapp/design-system";`,
  },
  {
    name: "Dialog",
    description: "Modal dialog component",
    template: `<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <DialogBody>
      Dialog content goes here
    </DialogBody>
  </DialogContent>
</Dialog>`,
    imports: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogBody } from "@launchapp/design-system";`,
  },
  {
    name: "Card",
    description: "Container component with border and padding",
    template: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>`,
    imports: `import { Card, CardHeader, CardTitle, CardContent } from "@launchapp/design-system";`,
  },
  {
    name: "Label",
    description: "Form label component",
    template: `<Label htmlFor="input">Label Text</Label>`,
    imports: `import { Label } from "@launchapp/design-system";`,
  },
  {
    name: "Checkbox",
    description: "Checkbox input component",
    template: `<Checkbox id="checkbox" />`,
    imports: `import { Checkbox } from "@launchapp/design-system";`,
  },
  {
    name: "Select",
    description: "Dropdown select component",
    template: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>`,
    imports: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@launchapp/design-system";`,
  },
  {
    name: "Tabs",
    description: "Tabbed interface component",
    template: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`,
    imports: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@launchapp/design-system";`,
  },
  {
    name: "Toast",
    description: "Notification toast component",
    template: `<Toaster />`,
    imports: `import { Toaster } from "@launchapp/design-system";`,
  },
  {
    name: "Accordion",
    description: "Collapsible accordion component",
    template: `<Accordion type="single" collapsible>
  <AccordionItem value="item1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>
      Content for section 1
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    imports: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@launchapp/design-system";`,
  },
];

export function activate(context: vscode.ExtensionContext) {
  console.log("LaunchApp Design System extension activated");

  componentProvider = new ComponentCompletionProvider();
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { scheme: "file", language: "typescriptreact" },
      componentProvider,
      "<"
    )
  );

  tokenProvider = new TokenCompletionProvider();
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { scheme: "file", language: "typescriptreact" },
      tokenProvider,
      "-"
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "launchapp-ds.insertComponent",
      async () => {
        await insertComponentCommand();
      }
    )
  );

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
    return items;
  }

  resolveCompletionItem?(item: vscode.CompletionItem): vscode.CompletionItem {
    return item;
  }
}

async function insertComponentCommand(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("No active editor found");
    return;
  }

  const quickPick = vscode.window.createQuickPick();
  quickPick.items = COMPONENTS.map((comp) => ({
    label: comp.name,
    description: comp.description,
    component: comp,
  }));
  quickPick.placeholder = "Select a component to insert";
  quickPick.onDidChangeSelection(async (selection) => {
    if (selection.length > 0) {
      const selected = selection[0] as any;
      await insertComponent(editor, selected.component);
      quickPick.hide();
    }
  });

  quickPick.show();
}

async function insertComponent(
  editor: vscode.TextEditor,
  component: (typeof COMPONENTS)[0]
): Promise<void> {
  const document = editor.document;
  const selection = editor.selection;

  const hasImport = document.getText().includes(component.imports);

  let insertText = component.template;
  if (!hasImport) {
    const firstLine = document.lineAt(0);
    const importInsertPosition = new vscode.Position(0, 0);

    await editor.edit((editBuilder) => {
      editBuilder.insert(importInsertPosition, component.imports + "\n");
    });
  }

  await editor.edit((editBuilder) => {
    editBuilder.replace(selection, insertText);
  });

  vscode.window.showInformationMessage(`Inserted ${component.name} component`);
}

function previewTokenCommand(): void {
  vscode.window.showInformationMessage(
    "Token preview feature coming soon"
  );
}
