export type ComponentCategory =
  | "inputs"
  | "display"
  | "layout"
  | "navigation"
  | "overlays"
  | "feedback"
  | "data"
  | "forms"
  | "utilities";

export interface PropDef {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

export interface ComponentExample {
  title: string;
  description?: string;
  code: string;
}

export interface ComponentEntry {
  slug: string;
  name: string;
  description: string;
  category: ComponentCategory;
  props: PropDef[];
  examples: ComponentExample[];
  importStatement: string;
}

export const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  inputs: "Inputs & Controls",
  display: "Display",
  layout: "Layout",
  navigation: "Navigation",
  overlays: "Overlays",
  feedback: "Feedback",
  data: "Data & Charts",
  forms: "Forms",
  utilities: "Utilities",
};

export const components: ComponentEntry[] = [
  {
    slug: "accordion",
    name: "Accordion",
    description:
      "A vertically stacked set of interactive headings that reveal or hide associated sections of content.",
    category: "display",
    importStatement: `import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from "@launchapp/design-system";`,
    props: [
      { name: "type", type: '"single" | "multiple"', defaultValue: '"single"', description: "Determines whether one or multiple items can be open at the same time." },
      { name: "defaultValue", type: "string | string[]", description: "The default open item(s) when uncontrolled." },
      { name: "value", type: "string | string[]", description: "The controlled open item(s)." },
      { name: "onValueChange", type: "(value: string | string[]) => void", description: "Callback fired when the open state changes." },
      { name: "collapsible", type: "boolean", defaultValue: "false", description: "When type is 'single', allows closing all items." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Prevents user interaction with the accordion." },
    ],
    examples: [
      {
        title: "Basic Accordion",
        code: `<AccordionRoot type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles using CSS custom properties.
    </AccordionContent>
  </AccordionItem>
</AccordionRoot>`,
      },
    ],
  },
  {
    slug: "alert",
    name: "Alert",
    description: "Displays a callout for user attention with support for different severity levels.",
    category: "feedback",
    importStatement: `import { Alert, AlertTitle, AlertDescription } from "@launchapp/design-system";`,
    props: [
      { name: "variant", type: '"default" | "destructive"', defaultValue: '"default"', description: "The visual style of the alert." },
      { name: "className", type: "string", description: "Additional CSS classes to apply." },
    ],
    examples: [
      {
        title: "Default Alert",
        code: `<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>`,
      },
      {
        title: "Destructive Alert",
        code: `<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`,
      },
    ],
  },
  {
    slug: "alert-dialog",
    name: "AlertDialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
    category: "overlays",
    importStatement: `import {
  AlertDialogRoot, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogFooter, AlertDialogTitle,
  AlertDialogDescription, AlertDialogAction, AlertDialogCancel
} from "@launchapp/design-system";`,
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
      { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "Initial open state when uncontrolled." },
    ],
    examples: [
      {
        title: "Basic AlertDialog",
        code: `<AlertDialogRoot>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialogRoot>`,
      },
    ],
  },
  {
    slug: "aspect-ratio",
    name: "AspectRatio",
    description: "Displays content within a desired ratio, preventing layout shifts.",
    category: "layout",
    importStatement: `import { AspectRatio } from "@launchapp/design-system";`,
    props: [
      { name: "ratio", type: "number", defaultValue: "1", description: "The desired ratio (width/height). E.g. 16/9." },
    ],
    examples: [
      {
        title: "16:9 Aspect Ratio",
        code: `<div className="w-[300px]">
  <AspectRatio ratio={16 / 9}>
    <img
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800"
      alt="Photo"
      className="rounded-md object-cover w-full h-full"
    />
  </AspectRatio>
</div>`,
      },
    ],
  },
  {
    slug: "avatar",
    name: "Avatar",
    description: "An image element with a fallback for representing users or entities.",
    category: "display",
    importStatement: `import { Avatar, AvatarImage, AvatarFallback } from "@launchapp/design-system";`,
    props: [
      { name: "className", type: "string", description: "Additional CSS classes." },
      { name: "src", type: "string", description: "Source URL for the avatar image (on AvatarImage)." },
      { name: "alt", type: "string", description: "Alt text for the image (on AvatarImage)." },
    ],
    examples: [
      {
        title: "Avatar with Image",
        code: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
      },
      {
        title: "Avatar Fallback",
        code: `<Avatar>
  <AvatarFallback>AG</AvatarFallback>
</Avatar>`,
      },
    ],
  },
  {
    slug: "badge",
    name: "Badge",
    description: "Displays a badge or a component that looks like a badge.",
    category: "display",
    importStatement: `import { Badge } from "@launchapp/design-system";`,
    props: [
      { name: "variant", type: '"default" | "secondary" | "destructive" | "outline"', defaultValue: '"default"', description: "The visual style of the badge." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    examples: [
      {
        title: "All Variants",
        code: `<div className="flex gap-2">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
</div>`,
      },
    ],
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    description: "Displays the path to the current resource using a hierarchy of links.",
    category: "navigation",
    importStatement: `import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator
} from "@launchapp/design-system";`,
    props: [
      { name: "separator", type: "React.ReactNode", description: "Custom separator element (on BreadcrumbSeparator)." },
    ],
    examples: [
      {
        title: "Basic Breadcrumb",
        code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
      },
    ],
  },
  {
    slug: "button",
    name: "Button",
    description:
      "Displays a button or a component that looks like a button with multiple variants and sizes.",
    category: "inputs",
    importStatement: `import { Button } from "@launchapp/design-system";`,
    props: [
      { name: "variant", type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"', defaultValue: '"default"', description: "The visual style of the button." },
      { name: "size", type: '"sm" | "md" | "lg" | "icon"', defaultValue: '"md"', description: "The size of the button." },
      { name: "asChild", type: "boolean", defaultValue: "false", description: "Render as a child component via Radix Slot." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Prevents user interaction." },
      { name: "onClick", type: "React.MouseEventHandler<HTMLButtonElement>", description: "Click event handler." },
    ],
    examples: [
      {
        title: "All Variants",
        code: `<div className="flex flex-wrap gap-2">
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="link">Link</Button>
</div>`,
      },
      {
        title: "Sizes",
        code: `<div className="flex items-center gap-2">
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</div>`,
      },
      {
        title: "Disabled State",
        code: `<Button disabled>Disabled</Button>`,
      },
    ],
  },
  {
    slug: "calendar",
    name: "Calendar",
    description: "A date field component that allows users to enter and edit date.",
    category: "inputs",
    importStatement: `import { Calendar } from "@launchapp/design-system";`,
    props: [
      { name: "mode", type: '"single" | "multiple" | "range"', defaultValue: '"single"', description: "Selection mode for the calendar." },
      { name: "selected", type: "Date | Date[] | DateRange", description: "The selected date(s)." },
      { name: "onSelect", type: "(date: Date | undefined) => void", description: "Callback when a date is selected." },
      { name: "disabled", type: "Matcher | Matcher[]", description: "Dates to disable." },
      { name: "initialFocus", type: "boolean", description: "Whether to focus the calendar on mount." },
    ],
    examples: [
      {
        title: "Single Date Picker",
        code: `const [date, setDate] = React.useState<Date | undefined>();

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`,
      },
    ],
  },
  {
    slug: "card",
    name: "Card",
    description: "Displays a card with header, content, and footer sections.",
    category: "display",
    importStatement: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@launchapp/design-system";`,
    props: [
      { name: "className", type: "string", description: "Additional CSS classes for the card container." },
    ],
    examples: [
      {
        title: "Basic Card",
        code: `<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`,
      },
    ],
  },
  {
    slug: "chart",
    name: "Chart",
    description: "A collection of chart components built on top of Recharts for data visualization.",
    category: "data",
    importStatement: `import { ChartContainer, LineChart, BarChart, AreaChart, PieChart } from "@launchapp/design-system";`,
    props: [
      { name: "config", type: "ChartConfig", required: true, description: "Chart configuration mapping data keys to labels and colors." },
      { name: "className", type: "string", description: "Additional CSS classes for the chart container." },
      { name: "data", type: "Record<string, unknown>[]", required: true, description: "The data array to render (on chart sub-components)." },
    ],
    examples: [
      {
        title: "Line Chart",
        code: `const data = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
  { month: "Mar", value: 237 },
];

const config = {
  value: { label: "Value", color: "hsl(var(--la-chart-1))" },
};

<ChartContainer config={config} className="h-[200px]">
  <LineChart data={data}>
    <XAxis dataKey="month" />
    <YAxis />
    <Line type="monotone" dataKey="value" stroke="var(--color-value)" />
  </LineChart>
</ChartContainer>`,
      },
    ],
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    description:
      "A control that allows the user to toggle between checked and not checked.",
    category: "inputs",
    importStatement: `import { Checkbox } from "@launchapp/design-system";`,
    props: [
      { name: "checked", type: "boolean | 'indeterminate'", description: "The controlled checked state." },
      { name: "defaultChecked", type: "boolean", defaultValue: "false", description: "Initial checked state when uncontrolled." },
      { name: "onCheckedChange", type: "(checked: boolean | 'indeterminate') => void", description: "Callback when checked state changes." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Prevents user interaction." },
      { name: "required", type: "boolean", description: "Makes the checkbox required in forms." },
      { name: "name", type: "string", description: "Form field name." },
    ],
    examples: [
      {
        title: "Basic Checkbox",
        code: `<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms" className="text-sm font-medium">
    Accept terms and conditions
  </label>
</div>`,
      },
    ],
  },
  {
    slug: "collapsible",
    name: "Collapsible",
    description: "An interactive component which expands/collapses a panel.",
    category: "display",
    importStatement: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@launchapp/design-system";`,
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "Initial open state when uncontrolled." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Prevents user interaction." },
    ],
    examples: [
      {
        title: "Basic Collapsible",
        code: `<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="outline">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="rounded-md border px-4 py-3 text-sm mt-2">
      This content can be collapsed.
    </div>
  </CollapsibleContent>
</Collapsible>`,
      },
    ],
  },
  {
    slug: "combobox",
    name: "Combobox",
    description:
      "An autocomplete input combined with a dropdown list for selecting from options.",
    category: "inputs",
    importStatement: `import { Combobox } from "@launchapp/design-system";`,
    props: [
      { name: "options", type: "ComboboxOption[]", required: true, description: "Array of options with value and label." },
      { name: "value", type: "string", description: "Controlled selected value." },
      { name: "onValueChange", type: "(value: string) => void", description: "Callback when value changes." },
      { name: "placeholder", type: "string", defaultValue: '"Select..."', description: "Placeholder text when no value is selected." },
      { name: "searchPlaceholder", type: "string", defaultValue: '"Search..."', description: "Placeholder for the search input." },
      { name: "emptyMessage", type: "string", defaultValue: '"No results found."', description: "Message shown when no options match the search." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the combobox." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Size of the trigger button." },
    ],
    examples: [
      {
        title: "Basic Combobox",
        code: `const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

<Combobox
  options={frameworks}
  placeholder="Select framework..."
  searchPlaceholder="Search frameworks..."
/>`,
      },
    ],
  },
  {
    slug: "command",
    name: "Command",
    description: "Fast, composable command menu component built on cmdk.",
    category: "overlays",
    importStatement: `import {
  Command, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandSeparator, CommandShortcut
} from "@launchapp/design-system";`,
    props: [
      { name: "value", type: "string", description: "Controlled selected value." },
      { name: "onValueChange", type: "(value: string) => void", description: "Callback when selection changes." },
      { name: "filter", type: "(value: string, search: string) => number", description: "Custom filter function." },
      { name: "shouldFilter", type: "boolean", defaultValue: "true", description: "Whether to filter items based on search." },
    ],
    examples: [
      {
        title: "Command Palette",
        code: `<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>
        Profile
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
      },
    ],
  },
  {
    slug: "context-menu",
    name: "ContextMenu",
    description: "Displays a menu located at the pointer, triggered by a right-click or long-press.",
    category: "overlays",
    importStatement: `import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent,
  ContextMenuItem, ContextMenuSeparator, ContextMenuLabel
} from "@launchapp/design-system";`,
    props: [
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
    ],
    examples: [
      {
        title: "Basic Context Menu",
        code: `<ContextMenu>
  <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent className="w-64">
    <ContextMenuLabel>My Account</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Settings</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
      },
    ],
  },
  {
    slug: "data-table",
    name: "DataTable",
    description:
      "A powerful data table component with sorting, filtering, and pagination built on TanStack Table.",
    category: "data",
    importStatement: `import { DataTable } from "@launchapp/design-system";`,
    props: [
      { name: "columns", type: "ColumnDef<TData, TValue>[]", required: true, description: "Column definitions from TanStack Table." },
      { name: "data", type: "TData[]", required: true, description: "The data array to display." },
      { name: "filterColumn", type: "string", description: "Column key to use for the filter input." },
      { name: "filterPlaceholder", type: "string", defaultValue: '"Filter..."', description: "Placeholder for the filter input." },
    ],
    examples: [
      {
        title: "Basic Data Table",
        code: `const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "status", header: "Status" },
];

const data = [
  { name: "Alice", email: "alice@example.com", status: "Active" },
  { name: "Bob", email: "bob@example.com", status: "Inactive" },
];

<DataTable columns={columns} data={data} filterColumn="name" />`,
      },
    ],
  },
  {
    slug: "date-picker",
    name: "DatePicker",
    description: "A date picker input that combines a button trigger with a calendar popover.",
    category: "inputs",
    importStatement: `import { DatePicker } from "@launchapp/design-system";`,
    props: [
      { name: "selected", type: "Date | undefined", description: "Controlled selected date." },
      { name: "onSelect", type: "(date: Date | undefined) => void", description: "Callback when date is selected." },
      { name: "placeholder", type: "string", defaultValue: '"Pick a date"', description: "Placeholder text when no date is selected." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the picker." },
      { name: "dateFormat", type: "string", defaultValue: '"PPP"', description: "date-fns format string for the displayed date." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    examples: [
      {
        title: "Date Picker",
        code: `const [date, setDate] = React.useState<Date | undefined>();

<DatePicker
  selected={date}
  onSelect={setDate}
  placeholder="Pick a date"
/>`,
      },
    ],
  },
  {
    slug: "dialog",
    name: "Dialog",
    description: "A window overlaid on either the primary window, rendering the content underneath inert.",
    category: "overlays",
    importStatement: `import {
  DialogRoot, DialogTrigger, DialogContent,
  DialogHeader, DialogFooter, DialogTitle, DialogDescription
} from "@launchapp/design-system";`,
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
      { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "Initial open state." },
    ],
    examples: [
      {
        title: "Basic Dialog",
        code: `<DialogRoot>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <Input placeholder="Name" />
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</DialogRoot>`,
      },
    ],
  },
  {
    slug: "dropdown-menu",
    name: "DropdownMenu",
    description: "Displays a menu to the user — such as a set of actions — triggered by a button.",
    category: "overlays",
    importStatement: `import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator
} from "@launchapp/design-system";`,
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
      { name: "modal", type: "boolean", defaultValue: "true", description: "Whether to render in a modal context." },
    ],
    examples: [
      {
        title: "Dropdown Menu",
        code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      },
    ],
  },
  {
    slug: "focus-scope",
    name: "FocusScope",
    description: "A utility that traps focus within a container, useful for accessible modals and overlays.",
    category: "utilities",
    importStatement: `import { FocusScope } from "@launchapp/design-system";`,
    props: [
      { name: "trapped", type: "boolean", defaultValue: "false", description: "Whether focus is trapped within the scope." },
      { name: "loop", type: "boolean", defaultValue: "false", description: "Whether tab navigation loops within the scope." },
      { name: "onMountAutoFocus", type: "(event: Event) => void", description: "Handler for auto-focus on mount." },
      { name: "onUnmountAutoFocus", type: "(event: Event) => void", description: "Handler for auto-focus on unmount." },
      { name: "asChild", type: "boolean", defaultValue: "false", description: "Render as child element via Radix Slot." },
    ],
    examples: [
      {
        title: "Trapped Focus",
        code: `<FocusScope trapped loop>
  <div className="flex gap-2 p-4 border rounded">
    <Button>First</Button>
    <Button>Second</Button>
    <Button>Third</Button>
  </div>
</FocusScope>`,
      },
    ],
  },
  {
    slug: "form",
    name: "Form",
    description: "Building forms with React Hook Form and Zod validation, with accessible error messages.",
    category: "forms",
    importStatement: `import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@launchapp/design-system";`,
    props: [
      { name: "...form", type: "UseFormReturn", required: true, description: "The react-hook-form form instance spread as props." },
    ],
    examples: [
      {
        title: "Basic Form",
        code: `const form = useForm({
  resolver: zodResolver(z.object({ username: z.string().min(2) })),
  defaultValues: { username: "" },
});

<Form {...form}>
  <form onSubmit={form.handleSubmit(console.log)}>
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="Enter username" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>`,
      },
    ],
  },
  {
    slug: "input",
    name: "Input",
    description: "Displays a form input field or a component that looks like an input field.",
    category: "inputs",
    importStatement: `import { Input } from "@launchapp/design-system";`,
    props: [
      { name: "type", type: "string", defaultValue: '"text"', description: "HTML input type." },
      { name: "placeholder", type: "string", description: "Placeholder text." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the input." },
      { name: "value", type: "string", description: "Controlled value." },
      { name: "onChange", type: "React.ChangeEventHandler<HTMLInputElement>", description: "Change event handler." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    examples: [
      {
        title: "Basic Input",
        code: `<Input type="email" placeholder="Email" />`,
      },
      {
        title: "Disabled Input",
        code: `<Input disabled placeholder="Disabled" />`,
      },
      {
        title: "With Label",
        code: `<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`,
      },
    ],
  },
  {
    slug: "kpi-card",
    name: "KPICard",
    description: "A card component for displaying key performance indicators with trend information.",
    category: "data",
    importStatement: `import { KPICard } from "@launchapp/design-system";`,
    props: [
      { name: "label", type: "string", required: true, description: "The KPI title/label." },
      { name: "value", type: "string | number", required: true, description: "The main KPI value to display." },
      { name: "trend", type: '"up" | "down" | "neutral"', description: "Trend direction for color coding." },
      { name: "trendLabel", type: "string", description: "Label describing the trend (e.g. '+20% from last month')." },
      { name: "sparklineData", type: "number[]", description: "Array of numbers to render a sparkline chart." },
      { name: "sparklineColor", type: "string", description: "Color for the sparkline chart." },
    ],
    examples: [
      {
        title: "KPI Card",
        code: `<KPICard
  label="Total Revenue"
  value="$45,231"
  trend="up"
  trendLabel="+20.1% from last month"
/>`,
      },
    ],
  },
  {
    slug: "label",
    name: "Label",
    description: "Renders an accessible label associated with controls.",
    category: "forms",
    importStatement: `import { Label } from "@launchapp/design-system";`,
    props: [
      { name: "htmlFor", type: "string", description: "The ID of the form element this label is for." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    examples: [
      {
        title: "Label with Input",
        code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="name">Your name</Label>
  <Input id="name" placeholder="Enter your name" />
</div>`,
      },
    ],
  },
  {
    slug: "logo",
    name: "Logo",
    description: "The LaunchApp brand logo with support for horizontal, stacked, mark-only, and wordmark variants in multiple sizes and color schemes.",
    category: "display",
    importStatement: `import { Logo } from "@launchapp/design-system";`,
    props: [
      { name: "variant", type: '"horizontal" | "stacked" | "mark" | "wordmark"', defaultValue: '"horizontal"', description: "Visual layout of the logo." },
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', defaultValue: '"md"', description: "Size preset for the logo." },
      { name: "color", type: '"brand" | "white" | "black" | "current"', defaultValue: '"brand"', description: "Color scheme — brand uses bronze + blue, white/black for monochrome, current inherits CSS color." },
      { name: "label", type: "string", defaultValue: '"LaunchApp"', description: "Accessible label for screen readers." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    examples: [
      {
        title: "Default (horizontal, brand)",
        code: `<Logo />`,
      },
      {
        title: "All variants",
        code: `<div className="flex flex-col gap-4">
  <Logo variant="horizontal" size="md" />
  <Logo variant="stacked" size="md" />
  <Logo variant="mark" size="md" />
  <Logo variant="wordmark" size="md" />
</div>`,
      },
      {
        title: "All sizes",
        code: `<div className="flex flex-col gap-4">
  <Logo size="xs" />
  <Logo size="sm" />
  <Logo size="md" />
  <Logo size="lg" />
  <Logo size="xl" />
</div>`,
      },
      {
        title: "Color schemes",
        code: `<div className="flex flex-col gap-4">
  <Logo color="brand" />
  <div className="p-2 bg-slate-900 rounded-md inline-flex">
    <Logo color="white" />
  </div>
  <Logo color="black" />
</div>`,
      },
    ],
  },
  {
    slug: "menubar",
    name: "Menubar",
    description: "A visually persistent menu common in desktop applications providing quick access to commands.",
    category: "navigation",
    importStatement: `import {
  MenubarRoot, MenubarMenu, MenubarTrigger, MenubarContent,
  MenubarItem, MenubarSeparator, MenubarShortcut
} from "@launchapp/design-system";`,
    props: [
      { name: "value", type: "string", description: "Controlled value of the open menu." },
      { name: "onValueChange", type: "(value: string) => void", description: "Callback when the open menu changes." },
    ],
    examples: [
      {
        title: "Basic Menubar",
        code: `<MenubarRoot>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
      <MenubarItem>New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
      <MenubarItem>Redo</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</MenubarRoot>`,
      },
    ],
  },
  {
    slug: "multi-select",
    name: "MultiSelect",
    description: "An input component for selecting multiple options from a dropdown list.",
    category: "inputs",
    importStatement: `import { MultiSelect } from "@launchapp/design-system";`,
    props: [
      { name: "options", type: "MultiSelectOption[]", required: true, description: "Array of options with value and label." },
      { name: "value", type: "string[]", description: "Controlled selected values." },
      { name: "onValueChange", type: "(values: string[]) => void", description: "Callback when selection changes." },
      { name: "placeholder", type: "string", defaultValue: '"Select options..."', description: "Placeholder text." },
      { name: "maxCount", type: "number", description: "Maximum number of badge chips to show before collapsing." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the multi-select." },
    ],
    examples: [
      {
        title: "Multi Select",
        code: `const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

<MultiSelect
  options={frameworks}
  placeholder="Select frameworks..."
  maxCount={2}
/>`,
      },
    ],
  },
  {
    slug: "navigation-menu",
    name: "NavigationMenu",
    description: "A collection of links for navigating websites with full keyboard support.",
    category: "navigation",
    importStatement: `import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem,
  NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink
} from "@launchapp/design-system";`,
    props: [
      { name: "value", type: "string", description: "Controlled open value." },
      { name: "onValueChange", type: "(value: string) => void", description: "Callback when open value changes." },
      { name: "delayDuration", type: "number", defaultValue: "200", description: "Duration from when the mouse enters a trigger to when the content opens." },
    ],
    examples: [
      {
        title: "Navigation Menu",
        code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="p-4">
          <NavigationMenuLink href="/">Introduction</NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
      },
    ],
  },
  {
    slug: "pagination",
    name: "Pagination",
    description: "Pagination with page navigation, next and previous links.",
    category: "navigation",
    importStatement: `import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis
} from "@launchapp/design-system";`,
    props: [],
    examples: [
      {
        title: "Basic Pagination",
        code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
      },
    ],
  },
  {
    slug: "popover",
    name: "Popover",
    description: "Displays rich content in a portal, triggered by a button.",
    category: "overlays",
    importStatement: `import { Popover, PopoverTrigger, PopoverContent } from "@launchapp/design-system";`,
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
      { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "Initial open state." },
      { name: "side", type: '"top" | "right" | "bottom" | "left"', defaultValue: '"bottom"', description: "Preferred side of the trigger (on PopoverContent)." },
      { name: "align", type: '"start" | "center" | "end"', defaultValue: '"center"', description: "Preferred alignment (on PopoverContent)." },
    ],
    examples: [
      {
        title: "Basic Popover",
        code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
    </div>
  </PopoverContent>
</Popover>`,
      },
    ],
  },
  {
    slug: "portal",
    name: "Portal",
    description: "A utility component that renders its children into a different DOM node.",
    category: "utilities",
    importStatement: `import { Portal } from "@launchapp/design-system";`,
    props: [
      { name: "container", type: "HTMLElement | null", description: "Target DOM container. Defaults to document.body." },
      { name: "asChild", type: "boolean", defaultValue: "false", description: "Render as child element." },
    ],
    examples: [
      {
        title: "Portal Usage",
        code: `<Portal>
  <div className="fixed inset-0 bg-black/50 pointer-events-none" />
</Portal>`,
      },
    ],
  },
  {
    slug: "progress",
    name: "Progress",
    description: "Displays an indicator showing the completion progress of a task.",
    category: "feedback",
    importStatement: `import { Progress } from "@launchapp/design-system";`,
    props: [
      { name: "value", type: "number | null", description: "The current progress value (0-100). null shows indeterminate." },
      { name: "max", type: "number", defaultValue: "100", description: "The maximum value." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    examples: [
      {
        title: "Progress Bar",
        code: `<Progress value={60} className="w-[60%]" />`,
      },
      {
        title: "Animated Progress",
        code: `const [progress, setProgress] = React.useState(13);

React.useEffect(() => {
  const timer = setTimeout(() => setProgress(66), 500);
  return () => clearTimeout(timer);
}, []);

<Progress value={progress} className="w-[60%]" />`,
      },
    ],
  },
  {
    slug: "radio-group",
    name: "RadioGroup",
    description: "A set of checkable buttons—known as radio buttons—where no more than one can be checked at a time.",
    category: "inputs",
    importStatement: `import { RadioGroup, RadioGroupItem } from "@launchapp/design-system";`,
    props: [
      { name: "value", type: "string", description: "Controlled selected value." },
      { name: "defaultValue", type: "string", description: "Initial value when uncontrolled." },
      { name: "onValueChange", type: "(value: string) => void", description: "Callback when value changes." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables all radio buttons." },
      { name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"vertical"', description: "Orientation of the group." },
    ],
    examples: [
      {
        title: "Radio Group",
        code: `<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>`,
      },
    ],
  },
  {
    slug: "resizable",
    name: "Resizable",
    description: "Accessible resizable panel groups and layouts with keyboard support.",
    category: "layout",
    importStatement: `import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@launchapp/design-system";`,
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "The resize orientation for the panel group." },
      { name: "onLayoutChange", type: "(layout: number[]) => void", description: "Callback when panel sizes change." },
      { name: "defaultSize", type: "number", description: "Default panel size as a percentage (on ResizablePanel)." },
      { name: "minSize", type: "number", description: "Minimum size of the panel (on ResizablePanel)." },
      { name: "withHandle", type: "boolean", defaultValue: "false", description: "Show a drag handle (on ResizableHandle)." },
    ],
    examples: [
      {
        title: "Horizontal Panels",
        code: `<ResizablePanelGroup orientation="horizontal" className="max-w-md rounded-lg border">
  <ResizablePanel defaultSize={50}>
    <div className="flex h-[200px] items-center justify-center p-6">
      <span className="font-semibold">Panel One</span>
    </div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50}>
    <div className="flex h-[200px] items-center justify-center p-6">
      <span className="font-semibold">Panel Two</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`,
      },
    ],
  },
  {
    slug: "scroll-area",
    name: "ScrollArea",
    description: "Augments native scroll functionality for custom, cross-browser styling.",
    category: "layout",
    importStatement: `import { ScrollArea, ScrollBar } from "@launchapp/design-system";`,
    props: [
      { name: "type", type: '"auto" | "always" | "scroll" | "hover"', defaultValue: '"hover"', description: "Scroll visibility strategy." },
      { name: "scrollHideDelay", type: "number", defaultValue: "600", description: "Delay before scrollbar hides (ms)." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    examples: [
      {
        title: "Scroll Area",
        code: `<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  {Array.from({ length: 20 }).map((_, i) => (
    <div key={i} className="text-sm py-1">Item {i + 1}</div>
  ))}
</ScrollArea>`,
      },
    ],
  },
  {
    slug: "select",
    name: "Select",
    description: "Displays a list of options for the user to pick from—triggered by a button.",
    category: "inputs",
    importStatement: `import {
  SelectRoot, SelectTrigger, SelectValue, SelectContent,
  SelectItem, SelectGroup, SelectLabel, SelectSeparator
} from "@launchapp/design-system";`,
    props: [
      { name: "value", type: "string", description: "Controlled selected value." },
      { name: "defaultValue", type: "string", description: "Initial value when uncontrolled." },
      { name: "onValueChange", type: "(value: string) => void", description: "Callback when value changes." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the select." },
      { name: "placeholder", type: "string", description: "Placeholder (on SelectValue)." },
    ],
    examples: [
      {
        title: "Basic Select",
        code: `<SelectRoot>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="blueberry">Blueberry</SelectItem>
    </SelectGroup>
  </SelectContent>
</SelectRoot>`,
      },
    ],
  },
  {
    slug: "separator",
    name: "Separator",
    description: "Visually or semantically separates content.",
    category: "display",
    importStatement: `import { Separator } from "@launchapp/design-system";`,
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "The axis the separator should align with." },
      { name: "decorative", type: "boolean", defaultValue: "false", description: "Whether the separator is purely visual (no ARIA role)." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    examples: [
      {
        title: "Horizontal Separator",
        code: `<div>
  <div className="space-y-1">
    <h4 className="text-sm font-medium">Radix Primitives</h4>
    <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
  </div>
  <Separator className="my-4" />
  <div className="flex h-5 items-center space-x-4 text-sm">
    <div>Blog</div>
    <Separator orientation="vertical" />
    <div>Docs</div>
  </div>
</div>`,
      },
    ],
  },
  {
    slug: "sheet",
    name: "Sheet",
    description: "Extends the Dialog component to display content that complements the main content of the screen from a side edge.",
    category: "overlays",
    importStatement: `import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription
} from "@launchapp/design-system";`,
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
      { name: "side", type: '"top" | "right" | "bottom" | "left"', defaultValue: '"right"', description: "Side from which the sheet slides (on SheetContent)." },
    ],
    examples: [
      {
        title: "Sheet from Right",
        code: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div className="py-4">
      <Input placeholder="Name" />
    </div>
  </SheetContent>
</Sheet>`,
      },
    ],
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    description: "Use to show a placeholder while content is loading.",
    category: "feedback",
    importStatement: `import { Skeleton } from "@launchapp/design-system";`,
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to control size and shape." },
    ],
    examples: [
      {
        title: "Skeleton Loading",
        code: `<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`,
      },
    ],
  },
  {
    slug: "slider",
    name: "Slider",
    description: "An input where the user selects a value from within a given range.",
    category: "inputs",
    importStatement: `import { Slider } from "@launchapp/design-system";`,
    props: [
      { name: "value", type: "number[]", description: "Controlled value(s). Array for range sliders." },
      { name: "defaultValue", type: "number[]", description: "Initial value when uncontrolled." },
      { name: "onValueChange", type: "(value: number[]) => void", description: "Callback when value changes." },
      { name: "min", type: "number", defaultValue: "0", description: "Minimum value." },
      { name: "max", type: "number", defaultValue: "100", description: "Maximum value." },
      { name: "step", type: "number", defaultValue: "1", description: "Step increment." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the slider." },
      { name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "The orientation of the slider." },
    ],
    examples: [
      {
        title: "Basic Slider",
        code: `<Slider defaultValue={[33]} max={100} step={1} className="w-[60%]" />`,
      },
    ],
  },
  {
    slug: "sonner",
    name: "Sonner",
    description: "An opinionated toast notification component built on Sonner.",
    category: "feedback",
    importStatement: `import { SonnerToaster, sonnerToast } from "@launchapp/design-system";`,
    props: [
      { name: "position", type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', defaultValue: '"bottom-right"', description: "Position of the toast container." },
      { name: "expand", type: "boolean", defaultValue: "false", description: "Whether toasts expand to full width." },
      { name: "richColors", type: "boolean", defaultValue: "false", description: "Whether to use rich colors for success/error/etc." },
      { name: "theme", type: '"light" | "dark" | "system"', defaultValue: '"system"', description: "Color theme." },
    ],
    examples: [
      {
        title: "Toast Notifications",
        code: `<SonnerToaster />

<Button
  variant="outline"
  onClick={() => sonnerToast("Event has been created")}
>
  Show Toast
</Button>`,
      },
    ],
  },
  {
    slug: "stat-display",
    name: "StatDisplay",
    description: "A compact component for displaying a statistic with optional label and trend indicator.",
    category: "data",
    importStatement: `import { StatDisplay } from "@launchapp/design-system";`,
    props: [
      { name: "items", type: "KPICardProps[]", required: true, description: "Array of KPI card data objects to display." },
      { name: "cols", type: "2 | 3 | 4", defaultValue: "4", description: "Number of columns in the grid layout." },
    ],
    examples: [
      {
        title: "Stat Display",
        code: `<StatDisplay
  items={[
    { label: "Active Users", value: "2,420", trend: "up", trendLabel: "+15%" },
    { label: "Bounce Rate", value: "38%", trend: "down", trendLabel: "-2%" },
    { label: "Page Views", value: "12.4k" },
  ]}
  cols={3}
/>`,
      },
    ],
  },
  {
    slug: "switch",
    name: "Switch",
    description: "A control that allows the user to toggle between checked and not checked.",
    category: "inputs",
    importStatement: `import { Switch } from "@launchapp/design-system";`,
    props: [
      { name: "checked", type: "boolean", description: "Controlled checked state." },
      { name: "defaultChecked", type: "boolean", defaultValue: "false", description: "Initial checked state." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Callback when checked state changes." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the switch." },
      { name: "required", type: "boolean", description: "Makes the switch required in forms." },
    ],
    examples: [
      {
        title: "Basic Switch",
        code: `<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`,
      },
    ],
  },
  {
    slug: "table",
    name: "Table",
    description: "A responsive table component with thead, tbody, and pagination support.",
    category: "data",
    importStatement: `import {
  Table, TableHeader, TableBody, TableRow,
  TableHead, TableCell, TableCaption
} from "@launchapp/design-system";`,
    props: [
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    examples: [
      {
        title: "Basic Table",
        code: `<Table>
  <TableCaption>A list of recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">INV002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell className="text-right">$150.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      },
    ],
  },
  {
    slug: "tabs",
    name: "Tabs",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    category: "navigation",
    importStatement: `import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "@launchapp/design-system";`,
    props: [
      { name: "value", type: "string", description: "Controlled active tab value." },
      { name: "defaultValue", type: "string", description: "Initial active tab when uncontrolled." },
      { name: "onValueChange", type: "(value: string) => void", description: "Callback when active tab changes." },
      { name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Orientation of the tab list." },
    ],
    examples: [
      {
        title: "Basic Tabs",
        code: `<TabsRoot defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p className="text-sm text-muted-foreground">Account settings here.</p>
  </TabsContent>
  <TabsContent value="password">
    <p className="text-sm text-muted-foreground">Password settings here.</p>
  </TabsContent>
</TabsRoot>`,
      },
    ],
  },
  {
    slug: "textarea",
    name: "Textarea",
    description: "Displays a form textarea or a component that looks like a textarea.",
    category: "inputs",
    importStatement: `import { Textarea } from "@launchapp/design-system";`,
    props: [
      { name: "placeholder", type: "string", description: "Placeholder text." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the textarea." },
      { name: "rows", type: "number", description: "Number of visible text rows." },
      { name: "value", type: "string", description: "Controlled value." },
      { name: "onChange", type: "React.ChangeEventHandler<HTMLTextAreaElement>", description: "Change event handler." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    examples: [
      {
        title: "Basic Textarea",
        code: `<Textarea placeholder="Type your message here." />`,
      },
      {
        title: "With Label",
        code: `<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your message</Label>
  <Textarea placeholder="Type your message here." id="message" />
</div>`,
      },
    ],
  },
  {
    slug: "toast",
    name: "Toast",
    description: "A succinct message that is displayed temporarily, with support for actions.",
    category: "feedback",
    importStatement: `import { Toaster, useToast } from "@launchapp/design-system";`,
    props: [
      { name: "variant", type: '"default" | "destructive"', defaultValue: '"default"', description: "The visual style of the toast." },
      { name: "title", type: "string", description: "Toast title." },
      { name: "description", type: "string", description: "Toast description." },
      { name: "duration", type: "number", defaultValue: "5000", description: "Auto-dismiss duration in ms." },
      { name: "action", type: "ToastActionElement", description: "Optional action button element." },
    ],
    examples: [
      {
        title: "Toast Usage",
        code: `function ToastExample() {
  const { toast } = useToast();

  return (
    <>
      <Toaster />
      <Button
        onClick={() => toast({ title: "Scheduled", description: "Monday, January 3rd at 6:00pm" })}
      >
        Show Toast
      </Button>
    </>
  );
}`,
      },
    ],
  },
  {
    slug: "toggle",
    name: "Toggle",
    description: "A two-state button that can be either on or off.",
    category: "inputs",
    importStatement: `import { Toggle } from "@launchapp/design-system";`,
    props: [
      { name: "pressed", type: "boolean", description: "Controlled pressed state." },
      { name: "defaultPressed", type: "boolean", defaultValue: "false", description: "Initial pressed state when uncontrolled." },
      { name: "onPressedChange", type: "(pressed: boolean) => void", description: "Callback when pressed state changes." },
      { name: "variant", type: '"default" | "outline"', defaultValue: '"default"', description: "Visual variant." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Size of the toggle." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the toggle." },
    ],
    examples: [
      {
        title: "Toggle States",
        code: `<div className="flex gap-2">
  <Toggle aria-label="Toggle italic">Italic</Toggle>
  <Toggle aria-label="Toggle bold" defaultPressed>Bold</Toggle>
</div>`,
      },
    ],
  },
  {
    slug: "toggle-group",
    name: "ToggleGroup",
    description: "A set of two-state buttons that can be toggled on or off.",
    category: "inputs",
    importStatement: `import { ToggleGroup, ToggleGroupItem } from "@launchapp/design-system";`,
    props: [
      { name: "type", type: '"single" | "multiple"', required: true, description: "Whether a single or multiple items can be selected." },
      { name: "value", type: "string | string[]", description: "Controlled selected value(s)." },
      { name: "onValueChange", type: "(value: string | string[]) => void", description: "Callback when value changes." },
      { name: "variant", type: '"default" | "outline"', defaultValue: '"default"', description: "Visual variant." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Size." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables all items." },
    ],
    examples: [
      {
        title: "Single Toggle Group",
        code: `<ToggleGroup type="single">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`,
      },
    ],
  },
  {
    slug: "toolbar",
    name: "Toolbar",
    description: "A container for grouping a set of controls, such as buttons, toggle groups or dropdown menus.",
    category: "navigation",
    importStatement: `import {
  ToolbarRoot, ToolbarButton, ToolbarLink,
  ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem
} from "@launchapp/design-system";`,
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "The orientation of the toolbar." },
      { name: "loop", type: "boolean", defaultValue: "true", description: "Whether keyboard navigation loops." },
    ],
    examples: [
      {
        title: "Basic Toolbar",
        code: `<ToolbarRoot className="flex w-full min-w-max rounded-md border bg-background p-0.5">
  <ToolbarToggleGroup type="multiple">
    <ToolbarToggleItem value="bold">Bold</ToolbarToggleItem>
    <ToolbarToggleItem value="italic">Italic</ToolbarToggleItem>
    <ToolbarToggleItem value="underline">Underline</ToolbarToggleItem>
  </ToolbarToggleGroup>
  <ToolbarSeparator />
  <ToolbarButton>Clear</ToolbarButton>
</ToolbarRoot>`,
      },
    ],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    category: "overlays",
    importStatement: `import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@launchapp/design-system";`,
    props: [
      { name: "delayDuration", type: "number", defaultValue: "400", description: "Time in ms from hover to open (on TooltipRoot)." },
      { name: "side", type: '"top" | "right" | "bottom" | "left"', defaultValue: '"top"', description: "Preferred side of the trigger (on TooltipContent)." },
      { name: "sideOffset", type: "number", defaultValue: "4", description: "Distance from trigger in px (on TooltipContent)." },
    ],
    examples: [
      {
        title: "Basic Tooltip",
        code: `<TooltipProvider>
  <TooltipRoot>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </TooltipRoot>
</TooltipProvider>`,
      },
    ],
  },
  {
    slug: "visually-hidden",
    name: "VisuallyHidden",
    description: "Hides content visually while keeping it accessible to screen readers.",
    category: "utilities",
    importStatement: `import { VisuallyHidden } from "@launchapp/design-system";`,
    props: [
      { name: "asChild", type: "boolean", defaultValue: "false", description: "Render as child element via Radix Slot." },
    ],
    examples: [
      {
        title: "Visually Hidden",
        code: `<button>
  <svg aria-hidden="true">/* icon */</svg>
  <VisuallyHidden>Close dialog</VisuallyHidden>
</button>`,
      },
    ],
  },

  // Animation & Visual Effects
  {
    slug: "animated-background",
    name: "Animated Background",
    description: "Animated gradient or particle background for hero sections and landing pages.",
    category: "display",
    importStatement: `import { AnimatedBackground } from "@launchapp/design-system";`,
    props: [
      { name: "variant", type: '"gradient" | "particles" | "noise"', defaultValue: '"gradient"', description: "Visual style of the animation." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    examples: [
      {
        title: "Gradient background",
        code: `<div className="relative h-64 rounded-xl overflow-hidden">
  <AnimatedBackground variant="gradient" />
  <div className="relative z-10 flex h-full items-center justify-center">
    <h1 className="text-3xl font-bold text-white">Hero Title</h1>
  </div>
</div>`,
      },
    ],
  },
  {
    slug: "animated-border",
    name: "Animated Border",
    description: "Component with an animated gradient border effect for highlighting cards or CTAs.",
    category: "display",
    importStatement: `import { AnimatedBorder } from "@launchapp/design-system";`,
    props: [
      { name: "children", type: "React.ReactNode", required: true, description: "Content inside the border." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    examples: [
      {
        title: "Animated border card",
        code: `<AnimatedBorder>
  <div className="rounded-xl bg-background p-6">
    <h3 className="font-semibold">Featured</h3>
    <p className="text-sm text-muted-foreground">Highlighted with an animated border.</p>
  </div>
</AnimatedBorder>`,
      },
    ],
  },
  {
    slug: "animated-height",
    name: "Animated Height",
    description: "Wrapper that animates height changes smoothly for expand/collapse transitions.",
    category: "layout",
    importStatement: `import { AnimatedHeight } from "@launchapp/design-system";`,
    props: [
      { name: "children", type: "React.ReactNode", required: true, description: "Content whose height is animated." },
      { name: "visible", type: "boolean", defaultValue: "true", description: "When false, collapses the height to 0." },
    ],
    examples: [
      {
        title: "Expand/collapse",
        code: `const [open, setOpen] = React.useState(false);
return (
  <>
    <button type="button" onClick={() => setOpen(!open)}>Toggle</button>
    <AnimatedHeight visible={open}>
      <div className="p-4 bg-muted rounded-md mt-2">
        <p>Hidden content revealed with smooth animation.</p>
      </div>
    </AnimatedHeight>
  </>
);`,
      },
    ],
  },
  {
    slug: "animated-text",
    name: "Animated Text",
    description: "Text with typewriter, fade-in, or word-reveal animation effects.",
    category: "display",
    importStatement: `import { AnimatedText } from "@launchapp/design-system";`,
    props: [
      { name: "text", type: "string", required: true, description: "Text content to animate." },
      { name: "variant", type: '"typewriter" | "fade" | "word-reveal"', defaultValue: '"typewriter"', description: "Animation style." },
      { name: "delay", type: "number", description: "Start delay in milliseconds." },
    ],
    examples: [
      {
        title: "Typewriter effect",
        code: `<AnimatedText text="Building great products starts here." variant="typewriter" />`,
      },
    ],
  },
  {
    slug: "background",
    name: "Background",
    description: "Static decorative background with grid, dots, or gradient patterns.",
    category: "display",
    importStatement: `import { Background } from "@launchapp/design-system";`,
    props: [
      { name: "variant", type: '"grid" | "dots" | "gradient" | "noise"', defaultValue: '"grid"', description: "Pattern style." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    examples: [
      {
        title: "Grid background",
        code: `<div className="relative h-48 rounded-xl overflow-hidden">
  <Background variant="grid" />
</div>`,
      },
    ],
  },
  {
    slug: "banner",
    name: "Banner",
    description: "Top-of-page announcement banner with dismiss action and optional CTA.",
    category: "feedback",
    importStatement: `import { Banner } from "@launchapp/design-system";`,
    props: [
      { name: "children", type: "React.ReactNode", required: true, description: "Banner message content." },
      { name: "variant", type: '"info" | "success" | "warning" | "error"', defaultValue: '"info"', description: "Color scheme." },
      { name: "dismissible", type: "boolean", defaultValue: "true", description: "Show dismiss button." },
      { name: "onDismiss", type: "() => void", description: "Called when dismissed." },
    ],
    examples: [
      {
        title: "Info banner",
        code: `<Banner variant="info" onDismiss={() => console.log("dismissed")}>
  🎉 New features available — <a href="/changelog">See what's new</a>
</Banner>`,
      },
    ],
  },
  {
    slug: "bento-grid",
    name: "Bento Grid",
    description: "CSS Grid layout for bento-style feature showcases with variable-size cards.",
    category: "layout",
    importStatement: `import { BentoGrid, BentoGridItem } from "@launchapp/design-system";`,
    props: [
      { name: "children", type: "React.ReactNode", required: true, description: "BentoGridItem children." },
      { name: "className", type: "string", description: "Additional CSS classes on the grid." },
    ],
    examples: [
      {
        title: "Feature bento grid",
        code: `<BentoGrid>
  <BentoGridItem className="col-span-2" title="Fast" description="Built for speed.">
    <div className="h-32 bg-muted rounded-md" />
  </BentoGridItem>
  <BentoGridItem title="Secure" description="Enterprise-grade.">
    <div className="h-32 bg-muted rounded-md" />
  </BentoGridItem>
</BentoGrid>`,
      },
    ],
  },
  {
    slug: "carousel",
    name: "Carousel",
    description: "Touch-friendly carousel with navigation arrows, dot indicators, and auto-play.",
    category: "display",
    importStatement: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@launchapp/design-system";`,
    props: [
      { name: "opts", type: "EmblaOptionsType", description: "Embla carousel options." },
      { name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Scroll direction." },
    ],
    examples: [
      {
        title: "Basic carousel",
        code: `<Carousel>
  <CarouselContent>
    <CarouselItem><div className="p-4 bg-muted rounded-xl h-48 flex items-center justify-center">Slide 1</div></CarouselItem>
    <CarouselItem><div className="p-4 bg-muted rounded-xl h-48 flex items-center justify-center">Slide 2</div></CarouselItem>
    <CarouselItem><div className="p-4 bg-muted rounded-xl h-48 flex items-center justify-center">Slide 3</div></CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
      },
    ],
  },
  {
    slug: "changelog",
    name: "Changelog",
    description: "Vertical timeline of product changelog entries grouped by version.",
    category: "display",
    importStatement: `import { Changelog } from "@launchapp/design-system";`,
    props: [
      { name: "entries", type: "ChangelogEntry[]", required: true, description: "Array of changelog entries." },
    ],
    examples: [
      {
        title: "Changelog timeline",
        code: `<Changelog entries={[
  { version: "2.0.0", date: "2024-03-01", title: "Major release", changes: ["New component library", "Dark mode support"] },
  { version: "1.5.0", date: "2024-02-01", title: "Feature update", changes: ["Added Carousel", "Improved performance"] },
]} />`,
      },
    ],
  },
  {
    slug: "chat-bubble",
    name: "Chat Bubble",
    description: "Individual chat message bubble with avatar, timestamp, and own/other variants.",
    category: "display",
    importStatement: `import { ChatBubble } from "@launchapp/design-system";`,
    props: [
      { name: "message", type: "string", required: true, description: "Message text content." },
      { name: "isOwn", type: "boolean", defaultValue: "false", description: "Style as sent message when true." },
      { name: "timestamp", type: "string", description: "Timestamp string displayed below the bubble." },
      { name: "avatar", type: "React.ReactNode", description: "Avatar element for the sender." },
    ],
    examples: [
      {
        title: "Received message",
        code: `<ChatBubble message="Hey! How's it going?" timestamp="10:00 AM" />`,
      },
      {
        title: "Sent message",
        code: `<ChatBubble message="Great, thanks!" isOwn timestamp="10:01 AM" />`,
      },
    ],
  },
  {
    slug: "chat-input",
    name: "Chat Input",
    description: "Message input bar with send button, emoji picker, and attachment support.",
    category: "inputs",
    importStatement: `import { ChatInput } from "@launchapp/design-system";`,
    props: [
      { name: "onSend", type: "(message: string) => void", description: "Called when the message is sent." },
      { name: "placeholder", type: "string", defaultValue: '"Type a message..."', description: "Input placeholder text." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the input and send button." },
    ],
    examples: [
      {
        title: "Basic chat input",
        code: `<ChatInput
  placeholder="Message #general"
  onSend={(msg) => console.log("sent:", msg)}
/>`,
      },
    ],
  },
  {
    slug: "color-picker",
    name: "Color Picker",
    description: "Color selection input with hex input, opacity slider, and recent colors.",
    category: "inputs",
    importStatement: `import { ColorPicker } from "@launchapp/design-system";`,
    props: [
      { name: "value", type: "string", description: "Controlled hex color value." },
      { name: "onChange", type: "(color: string) => void", description: "Called when the color changes." },
      { name: "presets", type: "string[]", description: "Preset color swatches." },
    ],
    examples: [
      {
        title: "Color picker",
        code: `const [color, setColor] = React.useState("#3b82f6");
return <ColorPicker value={color} onChange={setColor} />;`,
      },
    ],
  },
  {
    slug: "consent-history-table",
    name: "Consent History Table",
    description: "Table showing user consent history with timestamps, types, and status.",
    category: "data",
    importStatement: `import { ConsentHistoryTable } from "@launchapp/design-system";`,
    props: [
      { name: "entries", type: "ConsentEntry[]", required: true, description: "Array of consent history records." },
    ],
    examples: [
      {
        title: "Consent history",
        code: `<ConsentHistoryTable entries={[
  { id: "1", type: "analytics", granted: true, timestamp: "2024-01-01T10:00:00Z", version: "1.0" },
  { id: "2", type: "marketing", granted: false, timestamp: "2024-01-02T11:00:00Z", version: "1.0" },
]} />`,
      },
    ],
  },
  {
    slug: "cookie-consent",
    name: "Cookie Consent",
    description: "GDPR-compliant cookie consent manager with categories and preferences.",
    category: "feedback",
    importStatement: `import { CookieConsent } from "@launchapp/design-system";`,
    props: [
      { name: "onAccept", type: "(preferences: CookiePreferences) => void", description: "Called when user saves preferences." },
      { name: "onDeny", type: "() => void", description: "Called when user denies all." },
    ],
    examples: [
      {
        title: "Cookie consent banner",
        code: `<CookieConsent
  onAccept={(prefs) => console.log("accepted:", prefs)}
  onDeny={() => console.log("denied")}
/>`,
      },
    ],
  },
  {
    slug: "cookie-consent-banner",
    name: "Cookie Consent Banner",
    description: "Slim bottom banner for cookie consent with accept and customize options.",
    category: "feedback",
    importStatement: `import { CookieConsentBanner } from "@launchapp/design-system";`,
    props: [
      { name: "onAccept", type: "() => void", description: "Called when accepting all cookies." },
      { name: "onCustomize", type: "() => void", description: "Called when user clicks to customize." },
    ],
    examples: [
      {
        title: "Slim banner",
        code: `<CookieConsentBanner
  onAccept={() => console.log("accepted")}
  onCustomize={() => console.log("customize")}
/>`,
      },
    ],
  },
  {
    slug: "cookie-preferences-dialog",
    name: "Cookie Preferences Dialog",
    description: "Dialog for granular cookie preference management with category toggles.",
    category: "overlays",
    importStatement: `import { CookiePreferencesDialog } from "@launchapp/design-system";`,
    props: [
      { name: "open", type: "boolean", description: "Controls dialog open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when open state changes." },
      { name: "onSave", type: "(prefs: CookiePreferences) => void", description: "Called with saved preferences." },
    ],
    examples: [
      {
        title: "Preferences dialog",
        code: `const [open, setOpen] = React.useState(false);
return (
  <>
    <button type="button" onClick={() => setOpen(true)}>Cookie Preferences</button>
    <CookiePreferencesDialog
      open={open}
      onOpenChange={setOpen}
      onSave={(prefs) => { console.log(prefs); setOpen(false); }}
    />
  </>
);`,
      },
    ],
  },
  {
    slug: "copilot-panel",
    name: "Copilot Panel",
    description: "Sliding AI copilot panel with chat interface and suggested prompts.",
    category: "overlays",
    importStatement: `import { CopilotPanel } from "@launchapp/design-system";`,
    props: [
      { name: "open", type: "boolean", description: "Controls panel visibility." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when open state changes." },
      { name: "onSend", type: "(message: string) => Promise<string>", description: "Handles sending a message and returning AI response." },
    ],
    examples: [
      {
        title: "AI copilot panel",
        code: `const [open, setOpen] = React.useState(false);
return (
  <>
    <button type="button" onClick={() => setOpen(true)}>Open Copilot</button>
    <CopilotPanel
      open={open}
      onOpenChange={setOpen}
      onSend={async (msg) => "AI response to: " + msg}
    />
  </>
);`,
      },
    ],
  },
  {
    slug: "dashboard-grid",
    name: "Dashboard Grid",
    description: "Draggable and resizable dashboard widget grid layout.",
    category: "layout",
    importStatement: `import { DashboardGrid, DashboardGridItem } from "@launchapp/design-system";`,
    props: [
      { name: "children", type: "React.ReactNode", required: true, description: "DashboardGridItem widgets." },
      { name: "cols", type: "number", defaultValue: "12", description: "Number of grid columns." },
    ],
    examples: [
      {
        title: "Dashboard widget grid",
        code: `<DashboardGrid>
  <DashboardGridItem id="revenue" x={0} y={0} w={4} h={2}>
    <div className="h-full bg-muted rounded-lg p-4">Revenue</div>
  </DashboardGridItem>
  <DashboardGridItem id="users" x={4} y={0} w={4} h={2}>
    <div className="h-full bg-muted rounded-lg p-4">Users</div>
  </DashboardGridItem>
</DashboardGrid>`,
      },
    ],
  },
  {
    slug: "dock",
    name: "Dock",
    description: "macOS-style magnifying dock with icon zoom effect on hover.",
    category: "navigation",
    importStatement: `import { Dock, DockIcon } from "@launchapp/design-system";`,
    props: [
      { name: "children", type: "React.ReactNode", required: true, description: "DockIcon items." },
      { name: "direction", type: '"top" | "bottom" | "left" | "right"', defaultValue: '"bottom"', description: "Dock position." },
      { name: "magnification", type: "number", defaultValue: "60", description: "Maximum icon size at hover peak." },
    ],
    examples: [
      {
        title: "Bottom dock",
        code: `<Dock>
  <DockIcon><span className="text-2xl">🏠</span></DockIcon>
  <DockIcon><span className="text-2xl">📁</span></DockIcon>
  <DockIcon><span className="text-2xl">⚙️</span></DockIcon>
</Dock>`,
      },
    ],
  },
  {
    slug: "funnel-chart",
    name: "Funnel Chart",
    description: "Visual funnel chart for conversion and pipeline data visualization.",
    category: "data",
    importStatement: `import { FunnelChart } from "@launchapp/design-system";`,
    props: [
      { name: "data", type: "FunnelChartItem[]", required: true, description: "Array of funnel stages with label and value." },
    ],
    examples: [
      {
        title: "Conversion funnel",
        code: `<FunnelChart data={[
  { label: "Visitors", value: 10000 },
  { label: "Sign-ups", value: 3500 },
  { label: "Activated", value: 1200 },
  { label: "Paid", value: 420 },
]} />`,
      },
    ],
  },
  {
    slug: "gauge",
    name: "Gauge",
    description: "Circular gauge meter for displaying a single metric as a percentage.",
    category: "data",
    importStatement: `import { Gauge } from "@launchapp/design-system";`,
    props: [
      { name: "value", type: "number", required: true, description: "Current value (0-100)." },
      { name: "label", type: "string", description: "Label displayed below the value." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Gauge size." },
    ],
    examples: [
      {
        title: "Performance gauge",
        code: `<Gauge value={72} label="Performance" />`,
      },
    ],
  },
  {
    slug: "heatmap",
    name: "Heatmap",
    description: "Calendar-style heatmap for visualizing activity over time (GitHub-style).",
    category: "data",
    importStatement: `import { Heatmap } from "@launchapp/design-system";`,
    props: [
      { name: "data", type: "HeatmapEntry[]", required: true, description: "Array of { date, value } entries." },
      { name: "colorScale", type: "string[]", description: "CSS color values from low to high intensity." },
    ],
    examples: [
      {
        title: "Activity heatmap",
        code: `<Heatmap data={[
  { date: "2024-01-01", value: 3 },
  { date: "2024-01-02", value: 7 },
  { date: "2024-01-03", value: 1 },
]} />`,
      },
    ],
  },
  {
    slug: "image-comparison",
    name: "Image Comparison",
    description: "Side-by-side image comparison slider with drag handle.",
    category: "display",
    importStatement: `import { ImageComparison } from "@launchapp/design-system";`,
    props: [
      { name: "before", type: "{ src: string; alt: string }", required: true, description: "Before image." },
      { name: "after", type: "{ src: string; alt: string }", required: true, description: "After image." },
      { name: "defaultPosition", type: "number", defaultValue: "50", description: "Initial slider position (0-100)." },
    ],
    examples: [
      {
        title: "Before/after comparison",
        code: `<ImageComparison
  before={{ src: "/before.jpg", alt: "Before" }}
  after={{ src: "/after.jpg", alt: "After" }}
  defaultPosition={40}
/>`,
      },
    ],
  },
  {
    slug: "inline-editable",
    name: "Inline Editable",
    description: "Click-to-edit text field that toggles between display and input modes.",
    category: "inputs",
    importStatement: `import { InlineEditable } from "@launchapp/design-system";`,
    props: [
      { name: "value", type: "string", required: true, description: "Current text value." },
      { name: "onSave", type: "(value: string) => void", description: "Called when edits are saved." },
      { name: "placeholder", type: "string", description: "Placeholder shown in edit mode." },
    ],
    examples: [
      {
        title: "Inline edit",
        code: `const [name, setName] = React.useState("My Project");
return (
  <InlineEditable
    value={name}
    onSave={setName}
    placeholder="Enter project name"
  />
);`,
      },
    ],
  },
  {
    slug: "lightbox",
    name: "Lightbox",
    description: "Full-screen image viewer with navigation, zoom, and keyboard controls.",
    category: "overlays",
    importStatement: `import { Lightbox } from "@launchapp/design-system";`,
    props: [
      { name: "images", type: "LightboxImage[]", required: true, description: "Array of images with src, alt, and optional caption." },
      { name: "open", type: "boolean", description: "Controls lightbox visibility." },
      { name: "initialIndex", type: "number", defaultValue: "0", description: "Starting image index." },
      { name: "onClose", type: "() => void", description: "Called when lightbox closes." },
    ],
    examples: [
      {
        title: "Image lightbox",
        code: `const [open, setOpen] = React.useState(false);
return (
  <>
    <button type="button" onClick={() => setOpen(true)}>View Gallery</button>
    <Lightbox
      open={open}
      onClose={() => setOpen(false)}
      images={[
        { src: "/photo1.jpg", alt: "Photo 1" },
        { src: "/photo2.jpg", alt: "Photo 2" },
      ]}
    />
  </>
);`,
      },
    ],
  },
  {
    slug: "live-indicator",
    name: "Live Indicator",
    description: "Pulsing dot indicator for showing real-time or live status.",
    category: "feedback",
    importStatement: `import { LiveIndicator } from "@launchapp/design-system";`,
    props: [
      { name: "label", type: "string", defaultValue: '"Live"', description: "Text label next to the pulse dot." },
      { name: "variant", type: '"red" | "green" | "yellow"', defaultValue: '"red"', description: "Pulse color." },
    ],
    examples: [
      {
        title: "Live broadcast indicator",
        code: `<LiveIndicator label="Live" variant="red" />`,
      },
    ],
  },
  {
    slug: "magic-card",
    name: "Magic Card",
    description: "Card with mouse-tracking gradient spotlight effect.",
    category: "display",
    importStatement: `import { MagicCard } from "@launchapp/design-system";`,
    props: [
      { name: "children", type: "React.ReactNode", required: true, description: "Card content." },
      { name: "gradientColor", type: "string", defaultValue: '"#262626"', description: "Spotlight gradient color." },
    ],
    examples: [
      {
        title: "Interactive spotlight card",
        code: `<MagicCard gradientColor="#3b82f6">
  <div className="p-8">
    <h3 className="text-xl font-bold">Magic Card</h3>
    <p className="text-muted-foreground mt-2">Hover to see the spotlight effect.</p>
  </div>
</MagicCard>`,
      },
    ],
  },
  {
    slug: "marquee",
    name: "Marquee",
    description: "Infinite horizontal or vertical scrolling marquee for logos, testimonials, etc.",
    category: "display",
    importStatement: `import { Marquee } from "@launchapp/design-system";`,
    props: [
      { name: "children", type: "React.ReactNode", required: true, description: "Items to scroll." },
      { name: "direction", type: '"left" | "right" | "up" | "down"', defaultValue: '"left"', description: "Scroll direction." },
      { name: "speed", type: "number", defaultValue: "30", description: "Animation duration in seconds." },
      { name: "pauseOnHover", type: "boolean", defaultValue: "true", description: "Pause scrolling on hover." },
    ],
    examples: [
      {
        title: "Logo marquee",
        code: `<Marquee pauseOnHover>
  {["Acme", "Globex", "Initech", "Umbrella", "Stark Industries"].map((name) => (
    <div key={name} className="mx-8 text-sm font-semibold text-muted-foreground">{name}</div>
  ))}
</Marquee>`,
      },
    ],
  },
  {
    slug: "masonry",
    name: "Masonry",
    description: "CSS masonry layout for variable-height items like photos or cards.",
    category: "layout",
    importStatement: `import { Masonry } from "@launchapp/design-system";`,
    props: [
      { name: "children", type: "React.ReactNode", required: true, description: "Items to arrange in masonry layout." },
      { name: "columns", type: "number | Record<string, number>", defaultValue: "3", description: "Number of columns (or responsive breakpoint map)." },
      { name: "gap", type: "number", defaultValue: "4", description: "Gap between items in Tailwind units." },
    ],
    examples: [
      {
        title: "Photo masonry grid",
        code: `<Masonry columns={3} gap={4}>
  {photos.map((photo) => (
    <img key={photo.id} src={photo.src} alt={photo.alt} className="rounded-lg w-full" />
  ))}
</Masonry>`,
      },
    ],
  },
  {
    slug: "mobile-nav",
    name: "Mobile Nav",
    description: "Bottom navigation bar optimized for mobile with icon and label items.",
    category: "navigation",
    importStatement: `import { MobileNav, MobileNavItem } from "@launchapp/design-system";`,
    props: [
      { name: "children", type: "React.ReactNode", required: true, description: "MobileNavItem elements." },
    ],
    examples: [
      {
        title: "Mobile bottom nav",
        code: `<MobileNav>
  <MobileNavItem href="/" icon={<HomeIcon />} label="Home" isActive />
  <MobileNavItem href="/explore" icon={<SearchIcon />} label="Explore" />
  <MobileNavItem href="/profile" icon={<UserIcon />} label="Profile" />
</MobileNav>`,
      },
    ],
  },
  {
    slug: "multi-panel-layout",
    name: "Multi Panel Layout",
    description: "Configurable multi-panel layout with primary, secondary, and tertiary panes.",
    category: "layout",
    importStatement: `import { MultiPanelLayout } from "@launchapp/design-system";`,
    props: [
      { name: "primary", type: "React.ReactNode", required: true, description: "Main content panel." },
      { name: "secondary", type: "React.ReactNode", description: "Secondary sidebar or detail panel." },
      { name: "tertiary", type: "React.ReactNode", description: "Tertiary panel (e.g., inspector)." },
    ],
    examples: [
      {
        title: "Three-column layout",
        code: `<MultiPanelLayout
  primary={<div className="p-4">Main content</div>}
  secondary={<div className="p-4 bg-muted/30">Sidebar</div>}
  tertiary={<div className="p-4 bg-muted/20">Inspector</div>}
/>`,
      },
    ],
  },
  {
    slug: "multi-step-wizard",
    name: "Multi Step Wizard",
    description: "Configurable step-by-step wizard with validation and progress indicator.",
    category: "layout",
    importStatement: `import { MultiStepWizard } from "@launchapp/design-system";`,
    props: [
      { name: "steps", type: "WizardStep[]", required: true, description: "Array of step objects with id, title, and content." },
      { name: "onComplete", type: "() => void", description: "Called when all steps are completed." },
    ],
    examples: [
      {
        title: "Setup wizard",
        code: `<MultiStepWizard
  steps={[
    { id: "info", title: "Basic Info", content: <div>Step 1 form</div> },
    { id: "config", title: "Configuration", content: <div>Step 2 form</div> },
    { id: "review", title: "Review", content: <div>Summary</div> },
  ]}
  onComplete={() => console.log("done")}
/>`,
      },
    ],
  },
  {
    slug: "notification-bell",
    name: "Notification Bell",
    description: "Bell icon with unread count badge that opens a notification dropdown.",
    category: "feedback",
    importStatement: `import { NotificationBell } from "@launchapp/design-system";`,
    props: [
      { name: "count", type: "number", defaultValue: "0", description: "Unread notification count." },
      { name: "onClick", type: "() => void", description: "Called when bell is clicked." },
      { name: "maxCount", type: "number", defaultValue: "99", description: "Maximum displayed count before showing '+'." },
    ],
    examples: [
      {
        title: "Notification bell with badge",
        code: `<NotificationBell count={5} onClick={() => console.log("open notifications")} />`,
      },
    ],
  },
  {
    slug: "page-transition",
    name: "Page Transition",
    description: "Wrapper for animating page-to-page transitions with fade, slide, or scale effects.",
    category: "utilities",
    importStatement: `import { PageTransition } from "@launchapp/design-system";`,
    props: [
      { name: "children", type: "React.ReactNode", required: true, description: "Page content to animate." },
      { name: "variant", type: '"fade" | "slide-up" | "scale"', defaultValue: '"fade"', description: "Transition animation style." },
    ],
    examples: [
      {
        title: "Fade transition",
        code: `<PageTransition variant="fade">
  <div>Page content</div>
</PageTransition>`,
      },
    ],
  },
  {
    slug: "palette-switcher",
    name: "Palette Switcher",
    description: "Color palette switcher for dynamically changing the app's theme palette.",
    category: "utilities",
    importStatement: `import { PaletteSwitcher } from "@launchapp/design-system";`,
    props: [
      { name: "palettes", type: "Palette[]", required: true, description: "Available color palettes." },
      { name: "value", type: "string", description: "Currently active palette id." },
      { name: "onChange", type: "(id: string) => void", description: "Called when palette is selected." },
    ],
    examples: [
      {
        title: "Palette selector",
        code: `<PaletteSwitcher
  palettes={[
    { id: "blue", name: "Ocean Blue", primary: "#3b82f6" },
    { id: "green", name: "Forest Green", primary: "#16a34a" },
    { id: "purple", name: "Royal Purple", primary: "#9333ea" },
  ]}
  value="blue"
  onChange={(id) => console.log("palette:", id)}
/>`,
      },
    ],
  },
  {
    slug: "privacy-dashboard",
    name: "Privacy Dashboard",
    description: "User-facing privacy dashboard for managing data, consents, and downloads.",
    category: "display",
    importStatement: `import { PrivacyDashboard } from "@launchapp/design-system";`,
    props: [
      { name: "consents", type: "ConsentEntry[]", required: true, description: "Current consent records." },
      { name: "onDownloadData", type: "() => void", description: "Called when user requests data export." },
      { name: "onDeleteAccount", type: "() => void", description: "Called when user requests account deletion." },
    ],
    examples: [
      {
        title: "Privacy control center",
        code: `<PrivacyDashboard
  consents={[
    { id: "1", type: "analytics", granted: true, timestamp: "2024-01-01T10:00:00Z", version: "1.0" },
  ]}
  onDownloadData={() => console.log("download")}
  onDeleteAccount={() => console.log("delete account")}
/>`,
      },
    ],
  },
  {
    slug: "realtime-ticker",
    name: "Realtime Ticker",
    description: "Live-updating metric ticker that streams values with directional change indicators.",
    category: "data",
    importStatement: `import { RealtimeTicker } from "@launchapp/design-system";`,
    props: [
      { name: "items", type: "TickerItem[]", required: true, description: "Array of ticker items with symbol, value, and change." },
      { name: "interval", type: "number", defaultValue: "2000", description: "Update interval in milliseconds." },
    ],
    examples: [
      {
        title: "Stock ticker",
        code: `<RealtimeTicker items={[
  { symbol: "ACME", value: 142.50, change: +2.3 },
  { symbol: "GLOB", value: 87.20, change: -1.1 },
]} />`,
      },
    ],
  },
  {
    slug: "sankey-diagram",
    name: "Sankey Diagram",
    description: "Flow diagram showing proportional relationships between categories.",
    category: "data",
    importStatement: `import { SankeyDiagram } from "@launchapp/design-system";`,
    props: [
      { name: "nodes", type: "SankeyNode[]", required: true, description: "Array of nodes with id and label." },
      { name: "links", type: "SankeyLink[]", required: true, description: "Array of links with source, target, and value." },
    ],
    examples: [
      {
        title: "Traffic flow sankey",
        code: `<SankeyDiagram
  nodes={[{ id: "organic" }, { id: "paid" }, { id: "signup" }, { id: "purchase" }]}
  links={[
    { source: "organic", target: "signup", value: 400 },
    { source: "paid", target: "signup", value: 200 },
    { source: "signup", target: "purchase", value: 350 },
  ]}
/>`,
      },
    ],
  },
  {
    slug: "scroll-animate",
    name: "Scroll Animate",
    description: "Wrapper that triggers entrance animations when elements scroll into view.",
    category: "utilities",
    importStatement: `import { ScrollAnimate } from "@launchapp/design-system";`,
    props: [
      { name: "children", type: "React.ReactNode", required: true, description: "Content to animate on scroll." },
      { name: "animation", type: '"fade-up" | "fade-in" | "slide-left" | "slide-right"', defaultValue: '"fade-up"', description: "Animation type." },
      { name: "delay", type: "number", defaultValue: "0", description: "Animation delay in milliseconds." },
    ],
    examples: [
      {
        title: "Fade-up on scroll",
        code: `<ScrollAnimate animation="fade-up">
  <div className="p-6 rounded-xl bg-muted">
    <h2 className="text-xl font-bold">Animated section</h2>
    <p className="mt-2 text-muted-foreground">Appears as you scroll down.</p>
  </div>
</ScrollAnimate>`,
      },
    ],
  },
  {
    slug: "scroll-effects",
    name: "Scroll Effects",
    description: "Parallax and scroll-driven animation effects for immersive layouts.",
    category: "utilities",
    importStatement: `import { ScrollEffects } from "@launchapp/design-system";`,
    props: [
      { name: "children", type: "React.ReactNode", required: true, description: "Content to apply scroll effects to." },
      { name: "effect", type: '"parallax" | "sticky" | "fade-out"', defaultValue: '"parallax"', description: "Scroll-driven effect type." },
      { name: "speed", type: "number", defaultValue: "0.5", description: "Effect intensity multiplier." },
    ],
    examples: [
      {
        title: "Parallax hero",
        code: `<ScrollEffects effect="parallax" speed={0.3}>
  <div className="h-screen bg-gradient-to-b from-primary/10 to-background flex items-center justify-center">
    <h1 className="text-5xl font-bold">Hero Title</h1>
  </div>
</ScrollEffects>`,
      },
    ],
  },
  {
    slug: "smart-theming-generator",
    name: "Smart Theming Generator",
    description: "AI-powered theme generator that creates a full design token set from a base color.",
    category: "utilities",
    importStatement: `import { SmartThemingGenerator } from "@launchapp/design-system";`,
    props: [
      { name: "onGenerate", type: "(theme: ThemeTokens) => void", description: "Called with generated theme tokens." },
      { name: "defaultColor", type: "string", description: "Starting brand color hex value." },
    ],
    examples: [
      {
        title: "Generate theme from brand color",
        code: `<SmartThemingGenerator
  defaultColor="#3b82f6"
  onGenerate={(tokens) => console.log("generated tokens:", tokens)}
/>`,
      },
    ],
  },
  {
    slug: "sparkline",
    name: "Sparkline",
    description: "Miniature inline chart for showing trends within a small space.",
    category: "data",
    importStatement: `import { Sparkline } from "@launchapp/design-system";`,
    props: [
      { name: "data", type: "number[]", required: true, description: "Array of numeric values to plot." },
      { name: "type", type: '"line" | "bar" | "area"', defaultValue: '"line"', description: "Chart type." },
      { name: "width", type: "number", defaultValue: "100", description: "Chart width in pixels." },
      { name: "height", type: "number", defaultValue: "32", description: "Chart height in pixels." },
    ],
    examples: [
      {
        title: "Revenue trend sparkline",
        code: `<Sparkline data={[30, 45, 28, 60, 72, 55, 80, 95]} type="area" />`,
      },
    ],
  },
  {
    slug: "spotlight",
    name: "Spotlight",
    description: "Mouse-tracking spotlight overlay effect for dark backgrounds.",
    category: "display",
    importStatement: `import { Spotlight } from "@launchapp/design-system";`,
    props: [
      { name: "children", type: "React.ReactNode", required: true, description: "Content over the spotlight background." },
      { name: "fill", type: "string", defaultValue: '"white"', description: "Spotlight color." },
    ],
    examples: [
      {
        title: "Spotlight hero",
        code: `<div className="relative min-h-[300px] bg-black rounded-xl overflow-hidden">
  <Spotlight fill="rgba(100, 200, 255, 0.3)" />
  <div className="relative z-10 flex items-center justify-center h-64 text-white text-2xl font-bold">
    Move your cursor over me
  </div>
</div>`,
      },
    ],
  },
  {
    slug: "staggered-list",
    name: "Staggered List",
    description: "List where items animate in with a sequential stagger delay.",
    category: "display",
    importStatement: `import { StaggeredList } from "@launchapp/design-system";`,
    props: [
      { name: "children", type: "React.ReactNode", required: true, description: "List items to stagger." },
      { name: "staggerDelay", type: "number", defaultValue: "50", description: "Delay between each item in milliseconds." },
    ],
    examples: [
      {
        title: "Staggered menu items",
        code: `<StaggeredList staggerDelay={75}>
  {["Dashboard", "Projects", "Team", "Settings"].map((item) => (
    <div key={item} className="py-2 px-4 rounded-md hover:bg-muted">{item}</div>
  ))}
</StaggeredList>`,
      },
    ],
  },
  {
    slug: "status-page",
    name: "Status Page",
    description: "Public status page showing system health, incidents, and uptime metrics.",
    category: "display",
    importStatement: `import { StatusPage } from "@launchapp/design-system";`,
    props: [
      { name: "services", type: "ServiceStatus[]", required: true, description: "Array of services with name and status." },
      { name: "incidents", type: "Incident[]", description: "Recent and ongoing incidents." },
      { name: "overallStatus", type: '"operational" | "degraded" | "partial" | "outage"', description: "Overall system status." },
    ],
    examples: [
      {
        title: "System status page",
        code: `<StatusPage
  overallStatus="operational"
  services={[
    { id: "api", name: "API", status: "operational" },
    { id: "db", name: "Database", status: "operational" },
    { id: "cdn", name: "CDN", status: "degraded" },
  ]}
  incidents={[
    { id: "1", title: "CDN latency increase", status: "investigating", startedAt: "2024-01-15T10:00:00Z" },
  ]}
/>`,
      },
    ],
  },
  {
    slug: "streaming-text",
    name: "Streaming Text",
    description: "Character-by-character streaming text display for AI response simulation.",
    category: "display",
    importStatement: `import { StreamingText } from "@launchapp/design-system";`,
    props: [
      { name: "text", type: "string", required: true, description: "Full text to stream." },
      { name: "speed", type: "number", defaultValue: "30", description: "Characters per second." },
      { name: "onComplete", type: "() => void", description: "Called when streaming completes." },
    ],
    examples: [
      {
        title: "AI response stream",
        code: `<StreamingText
  text="Here is the analysis you requested. The data shows a 23% increase in user engagement over the past month..."
  speed={40}
  onComplete={() => console.log("done")}
/>`,
      },
    ],
  },
  {
    slug: "tab-content-crossfade",
    name: "Tab Content Crossfade",
    description: "Tabs with animated crossfade transition between content panels.",
    category: "display",
    importStatement: `import { TabContentCrossfade } from "@launchapp/design-system";`,
    props: [
      { name: "tabs", type: "Array<{ id: string; label: string; content: React.ReactNode }>", required: true, description: "Tab definitions." },
      { name: "defaultTab", type: "string", description: "Initially active tab id." },
    ],
    examples: [
      {
        title: "Animated tab switcher",
        code: `<TabContentCrossfade
  tabs={[
    { id: "overview", label: "Overview", content: <div>Overview content</div> },
    { id: "details", label: "Details", content: <div>Details content</div> },
    { id: "history", label: "History", content: <div>History content</div> },
  ]}
  defaultTab="overview"
/>`,
      },
    ],
  },
  {
    slug: "tag-input",
    name: "Tag Input",
    description: "Multi-value tag input that creates removable tags on Enter or comma.",
    category: "inputs",
    importStatement: `import { TagInput } from "@launchapp/design-system";`,
    props: [
      { name: "value", type: "string[]", description: "Controlled array of tags." },
      { name: "onChange", type: "(tags: string[]) => void", description: "Called when tags change." },
      { name: "placeholder", type: "string", defaultValue: '"Add tag..."', description: "Input placeholder." },
      { name: "maxTags", type: "number", description: "Maximum number of tags allowed." },
    ],
    examples: [
      {
        title: "Skills tag input",
        code: `const [tags, setTags] = React.useState(["React", "TypeScript"]);
return (
  <TagInput
    value={tags}
    onChange={setTags}
    placeholder="Add skill..."
  />
);`,
      },
    ],
  },
  {
    slug: "terminal",
    name: "Terminal",
    description: "Styled terminal emulator for displaying command output and code execution.",
    category: "display",
    importStatement: `import { Terminal } from "@launchapp/design-system";`,
    props: [
      { name: "lines", type: "TerminalLine[]", required: true, description: "Array of terminal output lines." },
      { name: "title", type: "string", defaultValue: '"Terminal"', description: "Window title bar text." },
      { name: "animate", type: "boolean", defaultValue: "true", description: "Enable typewriter animation." },
    ],
    examples: [
      {
        title: "Install command",
        code: `<Terminal
  title="Getting Started"
  lines={[
    { type: "command", content: "npm install @launchapp/design-system" },
    { type: "output", content: "added 42 packages in 3.2s" },
    { type: "command", content: "npm run dev" },
    { type: "output", content: "⚡ Server ready on http://localhost:3000" },
  ]}
/>`,
      },
    ],
  },
  {
    slug: "text-animate",
    name: "Text Animate",
    description: "Advanced text animation with letter-by-letter, word, or line reveal variants.",
    category: "display",
    importStatement: `import { TextAnimate } from "@launchapp/design-system";`,
    props: [
      { name: "text", type: "string", required: true, description: "Text to animate." },
      { name: "by", type: '"letter" | "word" | "line"', defaultValue: '"letter"', description: "Animation granularity." },
      { name: "animation", type: '"fadeIn" | "slideUp" | "blurIn" | "popIn"', defaultValue: '"fadeIn"', description: "Animation style." },
    ],
    examples: [
      {
        title: "Word-by-word reveal",
        code: `<TextAnimate text="Ship products faster than ever." by="word" animation="slideUp" />`,
      },
    ],
  },
  {
    slug: "theme-card",
    name: "Theme Card",
    description: "Preview card for displaying a color theme with swatches and name.",
    category: "display",
    importStatement: `import { ThemeCard } from "@launchapp/design-system";`,
    props: [
      { name: "name", type: "string", required: true, description: "Theme name." },
      { name: "colors", type: "string[]", required: true, description: "Array of hex color swatches." },
      { name: "isActive", type: "boolean", description: "Highlights the card as the active theme." },
      { name: "onSelect", type: "() => void", description: "Called when the card is selected." },
    ],
    examples: [
      {
        title: "Theme selection card",
        code: `<ThemeCard
  name="Ocean Blue"
  colors={["#0f172a", "#1e40af", "#3b82f6", "#bfdbfe"]}
  isActive={false}
  onSelect={() => console.log("selected")}
/>`,
      },
    ],
  },
  {
    slug: "theme-generator",
    name: "Theme Generator",
    description: "Interactive tool for generating a complete design token theme from a brand color.",
    category: "utilities",
    importStatement: `import { ThemeGenerator } from "@launchapp/design-system";`,
    props: [
      { name: "onApply", type: "(tokens: ThemeTokens) => void", description: "Called when generated theme is applied." },
    ],
    examples: [
      {
        title: "Theme generator tool",
        code: `<ThemeGenerator onApply={(tokens) => console.log("apply theme:", tokens)} />`,
      },
    ],
  },
  {
    slug: "theme-preview",
    name: "Theme Preview",
    description: "Live preview of a design theme applied to common UI patterns.",
    category: "display",
    importStatement: `import { ThemePreview } from "@launchapp/design-system";`,
    props: [
      { name: "tokens", type: "ThemeTokens", required: true, description: "Design tokens to preview." },
    ],
    examples: [
      {
        title: "Theme preview pane",
        code: `<ThemePreview tokens={{ primary: "#3b82f6", secondary: "#6b7280", background: "#ffffff" }} />`,
      },
    ],
  },
  {
    slug: "thinking-indicator",
    name: "Thinking Indicator",
    description: "Animated indicator for AI 'thinking' state with bouncing dots or spinner.",
    category: "feedback",
    importStatement: `import { ThinkingIndicator } from "@launchapp/design-system";`,
    props: [
      { name: "label", type: "string", defaultValue: '"Thinking..."', description: "Text label next to the indicator." },
      { name: "variant", type: '"dots" | "pulse" | "spinner"', defaultValue: '"dots"', description: "Animation style." },
    ],
    examples: [
      {
        title: "AI thinking state",
        code: `<ThinkingIndicator label="AI is thinking..." variant="dots" />`,
      },
    ],
  },
  {
    slug: "tree-map",
    name: "Tree Map",
    description: "Hierarchical tree map visualization for proportional data analysis.",
    category: "data",
    importStatement: `import { TreeMap } from "@launchapp/design-system";`,
    props: [
      { name: "data", type: "TreeMapNode", required: true, description: "Hierarchical tree map data with name and children." },
      { name: "width", type: "number", description: "Chart width in pixels." },
      { name: "height", type: "number", defaultValue: "400", description: "Chart height in pixels." },
    ],
    examples: [
      {
        title: "Budget breakdown",
        code: `<TreeMap
  data={{
    name: "Budget",
    children: [
      { name: "Engineering", value: 400000 },
      { name: "Marketing", value: 200000 },
      { name: "Design", value: 100000 },
      { name: "Operations", value: 80000 },
    ],
  }}
  height={300}
/>`,
      },
    ],
  },
  {
    slug: "video-player",
    name: "Video Player",
    description: "Custom video player with playback controls, progress bar, and fullscreen.",
    category: "display",
    importStatement: `import { VideoPlayer } from "@launchapp/design-system";`,
    props: [
      { name: "src", type: "string", required: true, description: "Video source URL." },
      { name: "poster", type: "string", description: "Poster image shown before playback." },
      { name: "autoPlay", type: "boolean", defaultValue: "false", description: "Start playback automatically." },
      { name: "muted", type: "boolean", defaultValue: "false", description: "Start muted." },
    ],
    examples: [
      {
        title: "Product demo video",
        code: `<VideoPlayer
  src="https://example.com/demo.mp4"
  poster="https://example.com/thumb.jpg"
  muted
/>`,
      },
    ],
  },
];

export function getComponent(slug: string): ComponentEntry | undefined {
  return components.find((c) => c.slug === slug);
}

export function getComponentsByCategory(): Record<ComponentCategory, ComponentEntry[]> {
  return components.reduce(
    (acc, component) => {
      if (!acc[component.category]) acc[component.category] = [];
      acc[component.category].push(component);
      return acc;
    },
    {} as Record<ComponentCategory, ComponentEntry[]>
  );
}

export const ALL_CATEGORIES: ComponentCategory[] = [
  "inputs",
  "display",
  "layout",
  "navigation",
  "overlays",
  "feedback",
  "data",
  "forms",
  "utilities",
];
