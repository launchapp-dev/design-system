import * as vscode from "vscode";
import { PropExtractor } from "./prop-extractor";

export class QuickInsertProvider {
  private propExtractor: PropExtractor;

  constructor(designSystemPath: string) {
    this.propExtractor = new PropExtractor(designSystemPath);
  }

  registerCommands(context: vscode.ExtensionContext) {
    const insertComponentCommand = vscode.commands.registerCommand(
      "launchapp.insertComponent",
      () => this.showComponentPicker(),
    );

    const insertBlockCommand = vscode.commands.registerCommand(
      "launchapp.insertBlock",
      () => this.showBlockPicker(),
    );

    context.subscriptions.push(insertComponentCommand);
    context.subscriptions.push(insertBlockCommand);
  }

  private async showComponentPicker() {
    const components = this.propExtractor.getAllComponentNames();

    const selected = await vscode.window.showQuickPick(components, {
      placeHolder: "Select a component to insert",
      matchOnDescription: true,
    });

    if (selected) {
      await this.insertComponent(selected);
    }
  }

  private async showBlockPicker() {
    const blocks = [
      { label: "Card", description: "A card container component" },
      { label: "Dialog", description: "A modal dialog component" },
      { label: "FormGroup", description: "Form with label and input" },
      { label: "Header", description: "Page header layout" },
      { label: "Sidebar", description: "Sidebar navigation layout" },
      { label: "Tabs", description: "Tab navigation component" },
      { label: "Table", description: "Data table component" },
    ];

    const selected = await vscode.window.showQuickPick(blocks, {
      placeHolder: "Select a block to insert",
    });

    if (selected) {
      await this.insertBlock(selected.label);
    }
  }

  private async insertComponent(componentName: string) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("No active editor");
      return;
    }

    const template = `<${componentName} className="">
  {/* Content goes here */}
</${componentName}>`;

    await editor.edit((editBuilder) => {
      editBuilder.insert(editor.selection.active, template);
    });
  }

  private async insertBlock(blockName: string) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("No active editor");
      return;
    }

    const templates: Record<string, string> = {
      Card: `<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>`,
      Dialog: `<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>`,
      FormGroup: `<div className="space-y-2">
  <Label htmlFor="input">Label</Label>
  <Input id="input" placeholder="Enter text..." />
</div>`,
      Header: `<header className="border-b">
  <div className="container mx-auto px-4 py-4">
    <h1>Header</h1>
  </div>
</header>`,
      Sidebar: `<aside className="w-64 border-r">
  <nav className="space-y-2 p-4">
    <a href="#" className="block p-2 hover:bg-muted rounded">Link</a>
  </nav>
</aside>`,
      Tabs: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`,
      Table: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
      <TableHead>Column 2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data</TableCell>
      <TableCell>Data</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    };

    const template = templates[blockName] || `<!-- ${blockName} Block -->`;

    await editor.edit((editBuilder) => {
      editBuilder.insert(editor.selection.active, template);
    });
  }
}
