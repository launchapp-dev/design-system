"use strict";exports.id=211,exports.ids=[211],exports.modules={7371:(e,t,a)=>{a.d(t,{default:()=>n.a});var o=a(1812),n=a.n(o)},1812:(e,t,a)=>{let{createProxy:o}=a(8570);e.exports=o("/Users/samishukri/.ao/design-system-afed83519faf/worktrees/task-task-049/apps/docs/node_modules/next/dist/client/link.js")},5407:(e,t,a)=>{a.d(t,{Hs:()=>o,Xr:()=>i,m2:()=>r,wx:()=>n});let o={inputs:"Inputs & Controls",display:"Display",layout:"Layout",navigation:"Navigation",overlays:"Overlays",feedback:"Feedback",data:"Data & Charts",forms:"Forms",utilities:"Utilities"},n=[{slug:"accordion",name:"Accordion",description:"A vertically stacked set of interactive headings that reveal or hide associated sections of content.",category:"display",importStatement:'import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from "@audiogenius/design-system";',props:[{name:"type",type:'"single" | "multiple"',defaultValue:'"single"',description:"Determines whether one or multiple items can be open at the same time."},{name:"defaultValue",type:"string | string[]",description:"The default open item(s) when uncontrolled."},{name:"value",type:"string | string[]",description:"The controlled open item(s)."},{name:"onValueChange",type:"(value: string | string[]) => void",description:"Callback fired when the open state changes."},{name:"collapsible",type:"boolean",defaultValue:"false",description:"When type is 'single', allows closing all items."},{name:"disabled",type:"boolean",defaultValue:"false",description:"Prevents user interaction with the accordion."}],examples:[{title:"Basic Accordion",code:`<AccordionRoot type="single" collapsible>
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
</AccordionRoot>`}]},{slug:"alert",name:"Alert",description:"Displays a callout for user attention with support for different severity levels.",category:"feedback",importStatement:'import { Alert, AlertTitle, AlertDescription } from "@audiogenius/design-system";',props:[{name:"variant",type:'"default" | "destructive"',defaultValue:'"default"',description:"The visual style of the alert."},{name:"className",type:"string",description:"Additional CSS classes to apply."}],examples:[{title:"Default Alert",code:`<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>`},{title:"Destructive Alert",code:`<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`}]},{slug:"alert-dialog",name:"AlertDialog",description:"A modal dialog that interrupts the user with important content and expects a response.",category:"overlays",importStatement:`import {
  AlertDialogRoot, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogFooter, AlertDialogTitle,
  AlertDialogDescription, AlertDialogAction, AlertDialogCancel
} from "@audiogenius/design-system";`,props:[{name:"open",type:"boolean",description:"Controlled open state."},{name:"onOpenChange",type:"(open: boolean) => void",description:"Callback when open state changes."},{name:"defaultOpen",type:"boolean",defaultValue:"false",description:"Initial open state when uncontrolled."}],examples:[{title:"Basic AlertDialog",code:`<AlertDialogRoot>
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
</AlertDialogRoot>`}]},{slug:"aspect-ratio",name:"AspectRatio",description:"Displays content within a desired ratio, preventing layout shifts.",category:"layout",importStatement:'import { AspectRatio } from "@audiogenius/design-system";',props:[{name:"ratio",type:"number",defaultValue:"1",description:"The desired ratio (width/height). E.g. 16/9."}],examples:[{title:"16:9 Aspect Ratio",code:`<div className="w-[300px]">
  <AspectRatio ratio={16 / 9}>
    <img
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800"
      alt="Photo"
      className="rounded-md object-cover w-full h-full"
    />
  </AspectRatio>
</div>`}]},{slug:"avatar",name:"Avatar",description:"An image element with a fallback for representing users or entities.",category:"display",importStatement:'import { Avatar, AvatarImage, AvatarFallback } from "@audiogenius/design-system";',props:[{name:"className",type:"string",description:"Additional CSS classes."},{name:"src",type:"string",description:"Source URL for the avatar image (on AvatarImage)."},{name:"alt",type:"string",description:"Alt text for the image (on AvatarImage)."}],examples:[{title:"Avatar with Image",code:`<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`},{title:"Avatar Fallback",code:`<Avatar>
  <AvatarFallback>AG</AvatarFallback>
</Avatar>`}]},{slug:"badge",name:"Badge",description:"Displays a badge or a component that looks like a badge.",category:"display",importStatement:'import { Badge } from "@audiogenius/design-system";',props:[{name:"variant",type:'"default" | "secondary" | "destructive" | "outline"',defaultValue:'"default"',description:"The visual style of the badge."},{name:"className",type:"string",description:"Additional CSS classes."}],examples:[{title:"All Variants",code:`<div className="flex gap-2">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
</div>`}]},{slug:"breadcrumb",name:"Breadcrumb",description:"Displays the path to the current resource using a hierarchy of links.",category:"navigation",importStatement:`import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator
} from "@audiogenius/design-system";`,props:[{name:"separator",type:"React.ReactNode",description:"Custom separator element (on BreadcrumbSeparator)."}],examples:[{title:"Basic Breadcrumb",code:`<Breadcrumb>
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
</Breadcrumb>`}]},{slug:"button",name:"Button",description:"Displays a button or a component that looks like a button with multiple variants and sizes.",category:"inputs",importStatement:'import { Button } from "@audiogenius/design-system";',props:[{name:"variant",type:'"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',defaultValue:'"default"',description:"The visual style of the button."},{name:"size",type:'"sm" | "md" | "lg" | "icon"',defaultValue:'"md"',description:"The size of the button."},{name:"asChild",type:"boolean",defaultValue:"false",description:"Render as a child component via Radix Slot."},{name:"disabled",type:"boolean",defaultValue:"false",description:"Prevents user interaction."},{name:"onClick",type:"React.MouseEventHandler<HTMLButtonElement>",description:"Click event handler."}],examples:[{title:"All Variants",code:`<div className="flex flex-wrap gap-2">
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="link">Link</Button>
</div>`},{title:"Sizes",code:`<div className="flex items-center gap-2">
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</div>`},{title:"Disabled State",code:"<Button disabled>Disabled</Button>"}]},{slug:"calendar",name:"Calendar",description:"A date field component that allows users to enter and edit date.",category:"inputs",importStatement:'import { Calendar } from "@audiogenius/design-system";',props:[{name:"mode",type:'"single" | "multiple" | "range"',defaultValue:'"single"',description:"Selection mode for the calendar."},{name:"selected",type:"Date | Date[] | DateRange",description:"The selected date(s)."},{name:"onSelect",type:"(date: Date | undefined) => void",description:"Callback when a date is selected."},{name:"disabled",type:"Matcher | Matcher[]",description:"Dates to disable."},{name:"initialFocus",type:"boolean",description:"Whether to focus the calendar on mount."}],examples:[{title:"Single Date Picker",code:`const [date, setDate] = React.useState<Date | undefined>();

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`}]},{slug:"card",name:"Card",description:"Displays a card with header, content, and footer sections.",category:"display",importStatement:'import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@audiogenius/design-system";',props:[{name:"className",type:"string",description:"Additional CSS classes for the card container."}],examples:[{title:"Basic Card",code:`<Card className="w-[350px]">
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
</Card>`}]},{slug:"chart",name:"Chart",description:"A collection of chart components built on top of Recharts for data visualization.",category:"data",importStatement:'import { ChartContainer, LineChart, BarChart, AreaChart, PieChart } from "@audiogenius/design-system";',props:[{name:"config",type:"ChartConfig",required:!0,description:"Chart configuration mapping data keys to labels and colors."},{name:"className",type:"string",description:"Additional CSS classes for the chart container."},{name:"data",type:"Record<string, unknown>[]",required:!0,description:"The data array to render (on chart sub-components)."}],examples:[{title:"Line Chart",code:`const data = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
  { month: "Mar", value: 237 },
];

const config = {
  value: { label: "Value", color: "hsl(var(--ag-chart-1))" },
};

<ChartContainer config={config} className="h-[200px]">
  <LineChart data={data}>
    <XAxis dataKey="month" />
    <YAxis />
    <Line type="monotone" dataKey="value" stroke="var(--color-value)" />
  </LineChart>
</ChartContainer>`}]},{slug:"checkbox",name:"Checkbox",description:"A control that allows the user to toggle between checked and not checked.",category:"inputs",importStatement:'import { Checkbox } from "@audiogenius/design-system";',props:[{name:"checked",type:"boolean | 'indeterminate'",description:"The controlled checked state."},{name:"defaultChecked",type:"boolean",defaultValue:"false",description:"Initial checked state when uncontrolled."},{name:"onCheckedChange",type:"(checked: boolean | 'indeterminate') => void",description:"Callback when checked state changes."},{name:"disabled",type:"boolean",defaultValue:"false",description:"Prevents user interaction."},{name:"required",type:"boolean",description:"Makes the checkbox required in forms."},{name:"name",type:"string",description:"Form field name."}],examples:[{title:"Basic Checkbox",code:`<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms" className="text-sm font-medium">
    Accept terms and conditions
  </label>
</div>`}]},{slug:"collapsible",name:"Collapsible",description:"An interactive component which expands/collapses a panel.",category:"display",importStatement:'import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@audiogenius/design-system";',props:[{name:"open",type:"boolean",description:"Controlled open state."},{name:"defaultOpen",type:"boolean",defaultValue:"false",description:"Initial open state when uncontrolled."},{name:"onOpenChange",type:"(open: boolean) => void",description:"Callback when open state changes."},{name:"disabled",type:"boolean",defaultValue:"false",description:"Prevents user interaction."}],examples:[{title:"Basic Collapsible",code:`<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="outline">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="rounded-md border px-4 py-3 text-sm mt-2">
      This content can be collapsed.
    </div>
  </CollapsibleContent>
</Collapsible>`}]},{slug:"combobox",name:"Combobox",description:"An autocomplete input combined with a dropdown list for selecting from options.",category:"inputs",importStatement:'import { Combobox } from "@audiogenius/design-system";',props:[{name:"options",type:"ComboboxOption[]",required:!0,description:"Array of options with value and label."},{name:"value",type:"string",description:"Controlled selected value."},{name:"onValueChange",type:"(value: string) => void",description:"Callback when value changes."},{name:"placeholder",type:"string",defaultValue:'"Select..."',description:"Placeholder text when no value is selected."},{name:"searchPlaceholder",type:"string",defaultValue:'"Search..."',description:"Placeholder for the search input."},{name:"emptyMessage",type:"string",defaultValue:'"No results found."',description:"Message shown when no options match the search."},{name:"disabled",type:"boolean",defaultValue:"false",description:"Disables the combobox."},{name:"size",type:'"sm" | "md" | "lg"',defaultValue:'"md"',description:"Size of the trigger button."}],examples:[{title:"Basic Combobox",code:`const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

<Combobox
  options={frameworks}
  placeholder="Select framework..."
  searchPlaceholder="Search frameworks..."
/>`}]},{slug:"command",name:"Command",description:"Fast, composable command menu component built on cmdk.",category:"overlays",importStatement:`import {
  Command, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandSeparator, CommandShortcut
} from "@audiogenius/design-system";`,props:[{name:"value",type:"string",description:"Controlled selected value."},{name:"onValueChange",type:"(value: string) => void",description:"Callback when selection changes."},{name:"filter",type:"(value: string, search: string) => number",description:"Custom filter function."},{name:"shouldFilter",type:"boolean",defaultValue:"true",description:"Whether to filter items based on search."}],examples:[{title:"Command Palette",code:`<Command className="rounded-lg border shadow-md">
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
</Command>`}]},{slug:"context-menu",name:"ContextMenu",description:"Displays a menu located at the pointer, triggered by a right-click or long-press.",category:"overlays",importStatement:`import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent,
  ContextMenuItem, ContextMenuSeparator, ContextMenuLabel
} from "@audiogenius/design-system";`,props:[{name:"onOpenChange",type:"(open: boolean) => void",description:"Callback when open state changes."}],examples:[{title:"Basic Context Menu",code:`<ContextMenu>
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
</ContextMenu>`}]},{slug:"data-table",name:"DataTable",description:"A powerful data table component with sorting, filtering, and pagination built on TanStack Table.",category:"data",importStatement:'import { DataTable } from "@audiogenius/design-system";',props:[{name:"columns",type:"ColumnDef<TData, TValue>[]",required:!0,description:"Column definitions from TanStack Table."},{name:"data",type:"TData[]",required:!0,description:"The data array to display."},{name:"filterColumn",type:"string",description:"Column key to use for the filter input."},{name:"filterPlaceholder",type:"string",defaultValue:'"Filter..."',description:"Placeholder for the filter input."}],examples:[{title:"Basic Data Table",code:`const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "status", header: "Status" },
];

const data = [
  { name: "Alice", email: "alice@example.com", status: "Active" },
  { name: "Bob", email: "bob@example.com", status: "Inactive" },
];

<DataTable columns={columns} data={data} filterColumn="name" />`}]},{slug:"date-picker",name:"DatePicker",description:"A date picker input that combines a button trigger with a calendar popover.",category:"inputs",importStatement:'import { DatePicker } from "@audiogenius/design-system";',props:[{name:"selected",type:"Date | undefined",description:"Controlled selected date."},{name:"onSelect",type:"(date: Date | undefined) => void",description:"Callback when date is selected."},{name:"placeholder",type:"string",defaultValue:'"Pick a date"',description:"Placeholder text when no date is selected."},{name:"disabled",type:"boolean",defaultValue:"false",description:"Disables the picker."},{name:"dateFormat",type:"string",defaultValue:'"PPP"',description:"date-fns format string for the displayed date."},{name:"className",type:"string",description:"Additional CSS classes."}],examples:[{title:"Date Picker",code:`const [date, setDate] = React.useState<Date | undefined>();

<DatePicker
  selected={date}
  onSelect={setDate}
  placeholder="Pick a date"
/>`}]},{slug:"dialog",name:"Dialog",description:"A window overlaid on either the primary window, rendering the content underneath inert.",category:"overlays",importStatement:`import {
  DialogRoot, DialogTrigger, DialogContent,
  DialogHeader, DialogFooter, DialogTitle, DialogDescription
} from "@audiogenius/design-system";`,props:[{name:"open",type:"boolean",description:"Controlled open state."},{name:"onOpenChange",type:"(open: boolean) => void",description:"Callback when open state changes."},{name:"defaultOpen",type:"boolean",defaultValue:"false",description:"Initial open state."}],examples:[{title:"Basic Dialog",code:`<DialogRoot>
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
</DialogRoot>`}]},{slug:"dropdown-menu",name:"DropdownMenu",description:"Displays a menu to the user — such as a set of actions — triggered by a button.",category:"overlays",importStatement:`import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator
} from "@audiogenius/design-system";`,props:[{name:"open",type:"boolean",description:"Controlled open state."},{name:"onOpenChange",type:"(open: boolean) => void",description:"Callback when open state changes."},{name:"modal",type:"boolean",defaultValue:"true",description:"Whether to render in a modal context."}],examples:[{title:"Dropdown Menu",code:`<DropdownMenu>
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
</DropdownMenu>`}]},{slug:"focus-scope",name:"FocusScope",description:"A utility that traps focus within a container, useful for accessible modals and overlays.",category:"utilities",importStatement:'import { FocusScope } from "@audiogenius/design-system";',props:[{name:"trapped",type:"boolean",defaultValue:"false",description:"Whether focus is trapped within the scope."},{name:"loop",type:"boolean",defaultValue:"false",description:"Whether tab navigation loops within the scope."},{name:"onMountAutoFocus",type:"(event: Event) => void",description:"Handler for auto-focus on mount."},{name:"onUnmountAutoFocus",type:"(event: Event) => void",description:"Handler for auto-focus on unmount."},{name:"asChild",type:"boolean",defaultValue:"false",description:"Render as child element via Radix Slot."}],examples:[{title:"Trapped Focus",code:`<FocusScope trapped loop>
  <div className="flex gap-2 p-4 border rounded">
    <Button>First</Button>
    <Button>Second</Button>
    <Button>Third</Button>
  </div>
</FocusScope>`}]},{slug:"form",name:"Form",description:"Building forms with React Hook Form and Zod validation, with accessible error messages.",category:"forms",importStatement:'import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@audiogenius/design-system";',props:[{name:"...form",type:"UseFormReturn",required:!0,description:"The react-hook-form form instance spread as props."}],examples:[{title:"Basic Form",code:`const form = useForm({
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
</Form>`}]},{slug:"input",name:"Input",description:"Displays a form input field or a component that looks like an input field.",category:"inputs",importStatement:'import { Input } from "@audiogenius/design-system";',props:[{name:"type",type:"string",defaultValue:'"text"',description:"HTML input type."},{name:"placeholder",type:"string",description:"Placeholder text."},{name:"disabled",type:"boolean",defaultValue:"false",description:"Disables the input."},{name:"value",type:"string",description:"Controlled value."},{name:"onChange",type:"React.ChangeEventHandler<HTMLInputElement>",description:"Change event handler."},{name:"className",type:"string",description:"Additional CSS classes."}],examples:[{title:"Basic Input",code:'<Input type="email" placeholder="Email" />'},{title:"Disabled Input",code:'<Input disabled placeholder="Disabled" />'},{title:"With Label",code:`<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`}]},{slug:"kpi-card",name:"KPICard",description:"A card component for displaying key performance indicators with trend information.",category:"data",importStatement:'import { KPICard } from "@audiogenius/design-system";',props:[{name:"label",type:"string",required:!0,description:"The KPI title/label."},{name:"value",type:"string | number",required:!0,description:"The main KPI value to display."},{name:"trend",type:'"up" | "down" | "neutral"',description:"Trend direction for color coding."},{name:"trendLabel",type:"string",description:"Label describing the trend (e.g. '+20% from last month')."},{name:"sparklineData",type:"number[]",description:"Array of numbers to render a sparkline chart."},{name:"sparklineColor",type:"string",description:"Color for the sparkline chart."}],examples:[{title:"KPI Card",code:`<KPICard
  label="Total Revenue"
  value="$45,231"
  trend="up"
  trendLabel="+20.1% from last month"
/>`}]},{slug:"label",name:"Label",description:"Renders an accessible label associated with controls.",category:"forms",importStatement:'import { Label } from "@audiogenius/design-system";',props:[{name:"htmlFor",type:"string",description:"The ID of the form element this label is for."},{name:"className",type:"string",description:"Additional CSS classes."}],examples:[{title:"Label with Input",code:`<div className="flex flex-col gap-1.5">
  <Label htmlFor="name">Your name</Label>
  <Input id="name" placeholder="Enter your name" />
</div>`}]},{slug:"menubar",name:"Menubar",description:"A visually persistent menu common in desktop applications providing quick access to commands.",category:"navigation",importStatement:`import {
  MenubarRoot, MenubarMenu, MenubarTrigger, MenubarContent,
  MenubarItem, MenubarSeparator, MenubarShortcut
} from "@audiogenius/design-system";`,props:[{name:"value",type:"string",description:"Controlled value of the open menu."},{name:"onValueChange",type:"(value: string) => void",description:"Callback when the open menu changes."}],examples:[{title:"Basic Menubar",code:`<MenubarRoot>
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
</MenubarRoot>`}]},{slug:"multi-select",name:"MultiSelect",description:"An input component for selecting multiple options from a dropdown list.",category:"inputs",importStatement:'import { MultiSelect } from "@audiogenius/design-system";',props:[{name:"options",type:"MultiSelectOption[]",required:!0,description:"Array of options with value and label."},{name:"value",type:"string[]",description:"Controlled selected values."},{name:"onValueChange",type:"(values: string[]) => void",description:"Callback when selection changes."},{name:"placeholder",type:"string",defaultValue:'"Select options..."',description:"Placeholder text."},{name:"maxCount",type:"number",description:"Maximum number of badge chips to show before collapsing."},{name:"disabled",type:"boolean",defaultValue:"false",description:"Disables the multi-select."}],examples:[{title:"Multi Select",code:`const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

<MultiSelect
  options={frameworks}
  placeholder="Select frameworks..."
  maxCount={2}
/>`}]},{slug:"navigation-menu",name:"NavigationMenu",description:"A collection of links for navigating websites with full keyboard support.",category:"navigation",importStatement:`import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem,
  NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink
} from "@audiogenius/design-system";`,props:[{name:"value",type:"string",description:"Controlled open value."},{name:"onValueChange",type:"(value: string) => void",description:"Callback when open value changes."},{name:"delayDuration",type:"number",defaultValue:"200",description:"Duration from when the mouse enters a trigger to when the content opens."}],examples:[{title:"Navigation Menu",code:`<NavigationMenu>
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
</NavigationMenu>`}]},{slug:"pagination",name:"Pagination",description:"Pagination with page navigation, next and previous links.",category:"navigation",importStatement:`import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis
} from "@audiogenius/design-system";`,props:[],examples:[{title:"Basic Pagination",code:`<Pagination>
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
</Pagination>`}]},{slug:"popover",name:"Popover",description:"Displays rich content in a portal, triggered by a button.",category:"overlays",importStatement:'import { Popover, PopoverTrigger, PopoverContent } from "@audiogenius/design-system";',props:[{name:"open",type:"boolean",description:"Controlled open state."},{name:"onOpenChange",type:"(open: boolean) => void",description:"Callback when open state changes."},{name:"defaultOpen",type:"boolean",defaultValue:"false",description:"Initial open state."},{name:"side",type:'"top" | "right" | "bottom" | "left"',defaultValue:'"bottom"',description:"Preferred side of the trigger (on PopoverContent)."},{name:"align",type:'"start" | "center" | "end"',defaultValue:'"center"',description:"Preferred alignment (on PopoverContent)."}],examples:[{title:"Basic Popover",code:`<Popover>
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
</Popover>`}]},{slug:"portal",name:"Portal",description:"A utility component that renders its children into a different DOM node.",category:"utilities",importStatement:'import { Portal } from "@audiogenius/design-system";',props:[{name:"container",type:"HTMLElement | null",description:"Target DOM container. Defaults to document.body."},{name:"asChild",type:"boolean",defaultValue:"false",description:"Render as child element."}],examples:[{title:"Portal Usage",code:`<Portal>
  <div className="fixed inset-0 bg-black/50 pointer-events-none" />
</Portal>`}]},{slug:"progress",name:"Progress",description:"Displays an indicator showing the completion progress of a task.",category:"feedback",importStatement:'import { Progress } from "@audiogenius/design-system";',props:[{name:"value",type:"number | null",description:"The current progress value (0-100). null shows indeterminate."},{name:"max",type:"number",defaultValue:"100",description:"The maximum value."},{name:"className",type:"string",description:"Additional CSS classes."}],examples:[{title:"Progress Bar",code:'<Progress value={60} className="w-[60%]" />'},{title:"Animated Progress",code:`const [progress, setProgress] = React.useState(13);

React.useEffect(() => {
  const timer = setTimeout(() => setProgress(66), 500);
  return () => clearTimeout(timer);
}, []);

<Progress value={progress} className="w-[60%]" />`}]},{slug:"radio-group",name:"RadioGroup",description:"A set of checkable buttons—known as radio buttons—where no more than one can be checked at a time.",category:"inputs",importStatement:'import { RadioGroup, RadioGroupItem } from "@audiogenius/design-system";',props:[{name:"value",type:"string",description:"Controlled selected value."},{name:"defaultValue",type:"string",description:"Initial value when uncontrolled."},{name:"onValueChange",type:"(value: string) => void",description:"Callback when value changes."},{name:"disabled",type:"boolean",defaultValue:"false",description:"Disables all radio buttons."},{name:"orientation",type:'"horizontal" | "vertical"',defaultValue:'"vertical"',description:"Orientation of the group."}],examples:[{title:"Radio Group",code:`<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>`}]},{slug:"resizable",name:"Resizable",description:"Accessible resizable panel groups and layouts with keyboard support.",category:"layout",importStatement:'import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@audiogenius/design-system";',props:[{name:"orientation",type:'"horizontal" | "vertical"',defaultValue:'"horizontal"',description:"The resize orientation for the panel group."},{name:"onLayoutChange",type:"(layout: number[]) => void",description:"Callback when panel sizes change."},{name:"defaultSize",type:"number",description:"Default panel size as a percentage (on ResizablePanel)."},{name:"minSize",type:"number",description:"Minimum size of the panel (on ResizablePanel)."},{name:"withHandle",type:"boolean",defaultValue:"false",description:"Show a drag handle (on ResizableHandle)."}],examples:[{title:"Horizontal Panels",code:`<ResizablePanelGroup orientation="horizontal" className="max-w-md rounded-lg border">
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
</ResizablePanelGroup>`}]},{slug:"scroll-area",name:"ScrollArea",description:"Augments native scroll functionality for custom, cross-browser styling.",category:"layout",importStatement:'import { ScrollArea, ScrollBar } from "@audiogenius/design-system";',props:[{name:"type",type:'"auto" | "always" | "scroll" | "hover"',defaultValue:'"hover"',description:"Scroll visibility strategy."},{name:"scrollHideDelay",type:"number",defaultValue:"600",description:"Delay before scrollbar hides (ms)."},{name:"className",type:"string",description:"Additional CSS classes."}],examples:[{title:"Scroll Area",code:`<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  {Array.from({ length: 20 }).map((_, i) => (
    <div key={i} className="text-sm py-1">Item {i + 1}</div>
  ))}
</ScrollArea>`}]},{slug:"select",name:"Select",description:"Displays a list of options for the user to pick from—triggered by a button.",category:"inputs",importStatement:`import {
  SelectRoot, SelectTrigger, SelectValue, SelectContent,
  SelectItem, SelectGroup, SelectLabel, SelectSeparator
} from "@audiogenius/design-system";`,props:[{name:"value",type:"string",description:"Controlled selected value."},{name:"defaultValue",type:"string",description:"Initial value when uncontrolled."},{name:"onValueChange",type:"(value: string) => void",description:"Callback when value changes."},{name:"disabled",type:"boolean",defaultValue:"false",description:"Disables the select."},{name:"placeholder",type:"string",description:"Placeholder (on SelectValue)."}],examples:[{title:"Basic Select",code:`<SelectRoot>
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
</SelectRoot>`}]},{slug:"separator",name:"Separator",description:"Visually or semantically separates content.",category:"display",importStatement:'import { Separator } from "@audiogenius/design-system";',props:[{name:"orientation",type:'"horizontal" | "vertical"',defaultValue:'"horizontal"',description:"The axis the separator should align with."},{name:"decorative",type:"boolean",defaultValue:"false",description:"Whether the separator is purely visual (no ARIA role)."},{name:"className",type:"string",description:"Additional CSS classes."}],examples:[{title:"Horizontal Separator",code:`<div>
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
</div>`}]},{slug:"sheet",name:"Sheet",description:"Extends the Dialog component to display content that complements the main content of the screen from a side edge.",category:"overlays",importStatement:`import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription
} from "@audiogenius/design-system";`,props:[{name:"open",type:"boolean",description:"Controlled open state."},{name:"onOpenChange",type:"(open: boolean) => void",description:"Callback when open state changes."},{name:"side",type:'"top" | "right" | "bottom" | "left"',defaultValue:'"right"',description:"Side from which the sheet slides (on SheetContent)."}],examples:[{title:"Sheet from Right",code:`<Sheet>
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
</Sheet>`}]},{slug:"skeleton",name:"Skeleton",description:"Use to show a placeholder while content is loading.",category:"feedback",importStatement:'import { Skeleton } from "@audiogenius/design-system";',props:[{name:"className",type:"string",description:"Additional CSS classes to control size and shape."}],examples:[{title:"Skeleton Loading",code:`<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`}]},{slug:"slider",name:"Slider",description:"An input where the user selects a value from within a given range.",category:"inputs",importStatement:'import { Slider } from "@audiogenius/design-system";',props:[{name:"value",type:"number[]",description:"Controlled value(s). Array for range sliders."},{name:"defaultValue",type:"number[]",description:"Initial value when uncontrolled."},{name:"onValueChange",type:"(value: number[]) => void",description:"Callback when value changes."},{name:"min",type:"number",defaultValue:"0",description:"Minimum value."},{name:"max",type:"number",defaultValue:"100",description:"Maximum value."},{name:"step",type:"number",defaultValue:"1",description:"Step increment."},{name:"disabled",type:"boolean",defaultValue:"false",description:"Disables the slider."},{name:"orientation",type:'"horizontal" | "vertical"',defaultValue:'"horizontal"',description:"The orientation of the slider."}],examples:[{title:"Basic Slider",code:'<Slider defaultValue={[33]} max={100} step={1} className="w-[60%]" />'}]},{slug:"sonner",name:"Sonner",description:"An opinionated toast notification component built on Sonner.",category:"feedback",importStatement:'import { SonnerToaster, sonnerToast } from "@audiogenius/design-system";',props:[{name:"position",type:'"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',defaultValue:'"bottom-right"',description:"Position of the toast container."},{name:"expand",type:"boolean",defaultValue:"false",description:"Whether toasts expand to full width."},{name:"richColors",type:"boolean",defaultValue:"false",description:"Whether to use rich colors for success/error/etc."},{name:"theme",type:'"light" | "dark" | "system"',defaultValue:'"system"',description:"Color theme."}],examples:[{title:"Toast Notifications",code:`<SonnerToaster />

<Button
  variant="outline"
  onClick={() => sonnerToast("Event has been created")}
>
  Show Toast
</Button>`}]},{slug:"stat-display",name:"StatDisplay",description:"A compact component for displaying a statistic with optional label and trend indicator.",category:"data",importStatement:'import { StatDisplay } from "@audiogenius/design-system";',props:[{name:"items",type:"KPICardProps[]",required:!0,description:"Array of KPI card data objects to display."},{name:"cols",type:"2 | 3 | 4",defaultValue:"4",description:"Number of columns in the grid layout."}],examples:[{title:"Stat Display",code:`<StatDisplay
  items={[
    { label: "Active Users", value: "2,420", trend: "up", trendLabel: "+15%" },
    { label: "Bounce Rate", value: "38%", trend: "down", trendLabel: "-2%" },
    { label: "Page Views", value: "12.4k" },
  ]}
  cols={3}
/>`}]},{slug:"switch",name:"Switch",description:"A control that allows the user to toggle between checked and not checked.",category:"inputs",importStatement:'import { Switch } from "@audiogenius/design-system";',props:[{name:"checked",type:"boolean",description:"Controlled checked state."},{name:"defaultChecked",type:"boolean",defaultValue:"false",description:"Initial checked state."},{name:"onCheckedChange",type:"(checked: boolean) => void",description:"Callback when checked state changes."},{name:"disabled",type:"boolean",defaultValue:"false",description:"Disables the switch."},{name:"required",type:"boolean",description:"Makes the switch required in forms."}],examples:[{title:"Basic Switch",code:`<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`}]},{slug:"table",name:"Table",description:"A responsive table component with thead, tbody, and pagination support.",category:"data",importStatement:`import {
  Table, TableHeader, TableBody, TableRow,
  TableHead, TableCell, TableCaption
} from "@audiogenius/design-system";`,props:[{name:"className",type:"string",description:"Additional CSS classes."}],examples:[{title:"Basic Table",code:`<Table>
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
</Table>`}]},{slug:"tabs",name:"Tabs",description:"A set of layered sections of content—known as tab panels—that are displayed one at a time.",category:"navigation",importStatement:'import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "@audiogenius/design-system";',props:[{name:"value",type:"string",description:"Controlled active tab value."},{name:"defaultValue",type:"string",description:"Initial active tab when uncontrolled."},{name:"onValueChange",type:"(value: string) => void",description:"Callback when active tab changes."},{name:"orientation",type:'"horizontal" | "vertical"',defaultValue:'"horizontal"',description:"Orientation of the tab list."}],examples:[{title:"Basic Tabs",code:`<TabsRoot defaultValue="account" className="w-[400px]">
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
</TabsRoot>`}]},{slug:"textarea",name:"Textarea",description:"Displays a form textarea or a component that looks like a textarea.",category:"inputs",importStatement:'import { Textarea } from "@audiogenius/design-system";',props:[{name:"placeholder",type:"string",description:"Placeholder text."},{name:"disabled",type:"boolean",defaultValue:"false",description:"Disables the textarea."},{name:"rows",type:"number",description:"Number of visible text rows."},{name:"value",type:"string",description:"Controlled value."},{name:"onChange",type:"React.ChangeEventHandler<HTMLTextAreaElement>",description:"Change event handler."},{name:"className",type:"string",description:"Additional CSS classes."}],examples:[{title:"Basic Textarea",code:'<Textarea placeholder="Type your message here." />'},{title:"With Label",code:`<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your message</Label>
  <Textarea placeholder="Type your message here." id="message" />
</div>`}]},{slug:"toast",name:"Toast",description:"A succinct message that is displayed temporarily, with support for actions.",category:"feedback",importStatement:'import { Toaster, useToast } from "@audiogenius/design-system";',props:[{name:"variant",type:'"default" | "destructive"',defaultValue:'"default"',description:"The visual style of the toast."},{name:"title",type:"string",description:"Toast title."},{name:"description",type:"string",description:"Toast description."},{name:"duration",type:"number",defaultValue:"5000",description:"Auto-dismiss duration in ms."},{name:"action",type:"ToastActionElement",description:"Optional action button element."}],examples:[{title:"Toast Usage",code:`function ToastExample() {
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
}`}]},{slug:"toggle",name:"Toggle",description:"A two-state button that can be either on or off.",category:"inputs",importStatement:'import { Toggle } from "@audiogenius/design-system";',props:[{name:"pressed",type:"boolean",description:"Controlled pressed state."},{name:"defaultPressed",type:"boolean",defaultValue:"false",description:"Initial pressed state when uncontrolled."},{name:"onPressedChange",type:"(pressed: boolean) => void",description:"Callback when pressed state changes."},{name:"variant",type:'"default" | "outline"',defaultValue:'"default"',description:"Visual variant."},{name:"size",type:'"sm" | "md" | "lg"',defaultValue:'"md"',description:"Size of the toggle."},{name:"disabled",type:"boolean",defaultValue:"false",description:"Disables the toggle."}],examples:[{title:"Toggle States",code:`<div className="flex gap-2">
  <Toggle aria-label="Toggle italic">Italic</Toggle>
  <Toggle aria-label="Toggle bold" defaultPressed>Bold</Toggle>
</div>`}]},{slug:"toggle-group",name:"ToggleGroup",description:"A set of two-state buttons that can be toggled on or off.",category:"inputs",importStatement:'import { ToggleGroup, ToggleGroupItem } from "@audiogenius/design-system";',props:[{name:"type",type:'"single" | "multiple"',required:!0,description:"Whether a single or multiple items can be selected."},{name:"value",type:"string | string[]",description:"Controlled selected value(s)."},{name:"onValueChange",type:"(value: string | string[]) => void",description:"Callback when value changes."},{name:"variant",type:'"default" | "outline"',defaultValue:'"default"',description:"Visual variant."},{name:"size",type:'"sm" | "md" | "lg"',defaultValue:'"md"',description:"Size."},{name:"disabled",type:"boolean",defaultValue:"false",description:"Disables all items."}],examples:[{title:"Single Toggle Group",code:`<ToggleGroup type="single">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`}]},{slug:"toolbar",name:"Toolbar",description:"A container for grouping a set of controls, such as buttons, toggle groups or dropdown menus.",category:"navigation",importStatement:`import {
  ToolbarRoot, ToolbarButton, ToolbarLink,
  ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem
} from "@audiogenius/design-system";`,props:[{name:"orientation",type:'"horizontal" | "vertical"',defaultValue:'"horizontal"',description:"The orientation of the toolbar."},{name:"loop",type:"boolean",defaultValue:"true",description:"Whether keyboard navigation loops."}],examples:[{title:"Basic Toolbar",code:`<ToolbarRoot className="flex w-full min-w-max rounded-md border bg-background p-0.5">
  <ToolbarToggleGroup type="multiple">
    <ToolbarToggleItem value="bold">Bold</ToolbarToggleItem>
    <ToolbarToggleItem value="italic">Italic</ToolbarToggleItem>
    <ToolbarToggleItem value="underline">Underline</ToolbarToggleItem>
  </ToolbarToggleGroup>
  <ToolbarSeparator />
  <ToolbarButton>Clear</ToolbarButton>
</ToolbarRoot>`}]},{slug:"tooltip",name:"Tooltip",description:"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",category:"overlays",importStatement:'import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@audiogenius/design-system";',props:[{name:"delayDuration",type:"number",defaultValue:"400",description:"Time in ms from hover to open (on TooltipRoot)."},{name:"side",type:'"top" | "right" | "bottom" | "left"',defaultValue:'"top"',description:"Preferred side of the trigger (on TooltipContent)."},{name:"sideOffset",type:"number",defaultValue:"4",description:"Distance from trigger in px (on TooltipContent)."}],examples:[{title:"Basic Tooltip",code:`<TooltipProvider>
  <TooltipRoot>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </TooltipRoot>
</TooltipProvider>`}]},{slug:"visually-hidden",name:"VisuallyHidden",description:"Hides content visually while keeping it accessible to screen readers.",category:"utilities",importStatement:'import { VisuallyHidden } from "@audiogenius/design-system";',props:[{name:"asChild",type:"boolean",defaultValue:"false",description:"Render as child element via Radix Slot."}],examples:[{title:"Visually Hidden",code:`<button>
  <svg aria-hidden="true">/* icon */</svg>
  <VisuallyHidden>Close dialog</VisuallyHidden>
</button>`}]}];function i(e){return n.find(t=>t.slug===e)}let r=["inputs","display","layout","navigation","overlays","feedback","data","forms","utilities"]}};