import * as vscode from "vscode";
import { ComponentRegistry } from "./registry";

const COMPONENT_PROPS = {
  Button: [
    { name: "variant", type: "string", values: ["default", "destructive", "outline", "secondary", "ghost", "link"] },
    { name: "size", type: "string", values: ["sm", "md", "lg", "icon"] },
    { name: "onClick", type: "function", description: "Click handler" },
    { name: "disabled", type: "boolean", description: "Disable the button" },
    { name: "className", type: "string", description: "Additional CSS classes" },
    { name: "asChild", type: "boolean", description: "Render as child element" },
  ],
  Badge: [
    { name: "variant", type: "string", values: ["default", "secondary", "outline", "destructive"] },
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  Card: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  CardHeader: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  CardTitle: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  CardDescription: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  CardContent: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  Input: [
    { name: "type", type: "string", values: ["text", "email", "password", "number", "checkbox", "radio"] },
    { name: "placeholder", type: "string", description: "Input placeholder" },
    { name: "value", type: "string | number", description: "Input value" },
    { name: "onChange", type: "function", description: "Change handler" },
    { name: "disabled", type: "boolean", description: "Disable input" },
    { name: "required", type: "boolean", description: "Mark as required" },
  ],
  Label: [
    { name: "htmlFor", type: "string", description: "Associated input id" },
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  Dialog: [
    { name: "open", type: "boolean", description: "Dialog open state" },
    { name: "onOpenChange", type: "function", description: "Open state change handler" },
  ],
  DialogContent: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  DialogHeader: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  DialogTitle: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  DialogDescription: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  DialogTrigger: [
    { name: "asChild", type: "boolean", description: "Render as child element" },
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  Select: [
    { name: "value", type: "string", description: "Selected value" },
    { name: "onValueChange", type: "function", description: "Value change handler" },
  ],
  SelectTrigger: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  SelectContent: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  SelectItem: [
    { name: "value", type: "string", description: "Item value" },
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  SelectValue: [
    { name: "placeholder", type: "string", description: "Placeholder text" },
  ],
  Tabs: [
    { name: "defaultValue", type: "string", description: "Default active tab" },
    { name: "value", type: "string", description: "Controlled active tab" },
    { name: "onValueChange", type: "function", description: "Tab change handler" },
  ],
  TabsList: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  TabsTrigger: [
    { name: "value", type: "string", description: "Tab identifier" },
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  TabsContent: [
    { name: "value", type: "string", description: "Tab identifier" },
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  Checkbox: [
    { name: "checked", type: "boolean", description: "Checked state" },
    { name: "onCheckedChange", type: "function", description: "Check state change handler" },
    { name: "disabled", type: "boolean", description: "Disable checkbox" },
  ],
  RadioGroup: [
    { name: "value", type: "string", description: "Selected radio value" },
    { name: "onValueChange", type: "function", description: "Value change handler" },
  ],
  RadioGroupItem: [
    { name: "value", type: "string", description: "Radio item value" },
    { name: "id", type: "string", description: "Element id" },
  ],
  Tooltip: [
    { name: "delayDuration", type: "number", description: "Delay before showing" },
  ],
  TooltipTrigger: [
    { name: "asChild", type: "boolean", description: "Render as child element" },
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  TooltipContent: [
    { name: "className", type: "string", description: "Additional CSS classes" },
    { name: "side", type: "string", values: ["top", "right", "bottom", "left"] },
  ],
  Avatar: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  AvatarImage: [
    { name: "src", type: "string", description: "Image URL" },
    { name: "alt", type: "string", description: "Alt text" },
  ],
  AvatarFallback: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  Accordion: [
    { name: "type", type: "string", values: ["single", "multiple"], description: "Accordion type" },
    { name: "collapsible", type: "boolean", description: "Allow collapsing items" },
    { name: "value", type: "string", description: "Active accordion value" },
    { name: "onValueChange", type: "function", description: "Value change handler" },
  ],
  AccordionItem: [
    { name: "value", type: "string", description: "Item identifier" },
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  AccordionTrigger: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  AccordionContent: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  Alert: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  AlertTitle: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  AlertDescription: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  DropdownMenu: [],
  DropdownMenuTrigger: [
    { name: "asChild", type: "boolean", description: "Render as child element" },
  ],
  DropdownMenuContent: [
    { name: "className", type: "string", description: "Additional CSS classes" },
    { name: "align", type: "string", values: ["start", "center", "end"] },
  ],
  DropdownMenuItem: [
    { name: "onClick", type: "function", description: "Click handler" },
    { name: "disabled", type: "boolean", description: "Disable item" },
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  DropdownMenuSeparator: [],
  Table: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  TableHeader: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  TableBody: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  TableRow: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  TableHead: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
  TableCell: [
    { name: "className", type: "string", description: "Additional CSS classes" },
  ],
};

export class PropCompletionProvider implements vscode.CompletionItemProvider {
  constructor(private registry: any) {}

  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.CompletionItem[] | undefined {
    const line = document.lineAt(position);
    const lineText = line.text.substring(0, position.character);

    // Detect if we're inside a JSX component tag
    const componentMatch = lineText.match(/<(\w+)\s*([^>]*?)$/);
    if (!componentMatch) {
      return undefined;
    }

    const componentName = componentMatch[1];
    const props = (COMPONENT_PROPS as any)[componentName];

    if (!props) {
      return undefined;
    }

    // Check if we already have some props typed
    const alreadyTyped = componentMatch[2];

    return props
      .filter((prop: any) => !alreadyTyped.includes(prop.name))
      .map((prop: any) => {
        const completionItem = new vscode.CompletionItem(
          prop.name,
          vscode.CompletionItemKind.Property
        );

        completionItem.detail = `${prop.type}`;
        if (prop.description) {
          completionItem.documentation = new vscode.MarkdownString(
            `**${prop.type}** - ${prop.description}`
          );
        } else if (prop.values) {
          completionItem.documentation = new vscode.MarkdownString(
            `**${prop.type}** - Options: ${prop.values.join(", ")}`
          );
        }

        if (prop.values) {
          completionItem.sortText = "0";
          completionItem.insertText = prop.name;
          completionItem.commitCharacters = ["="];
        } else {
          completionItem.insertText = `${prop.name}=`;
          completionItem.commitCharacters = ["{"];
        }

        return completionItem;
      });
  }

  resolveCompletionItem(
    item: vscode.CompletionItem,
    token: vscode.CancellationToken
  ): vscode.CompletionItem | undefined {
    return item;
  }
}
