"use client";

import * as React from "react";
import {
  Button,
  Input,
  Label,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Progress,
  Slider,
  Switch,
  Checkbox,
  Separator,
  Skeleton,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  RadioGroup,
  RadioGroupItem,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Popover,
  PopoverTrigger,
  PopoverContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  ScrollArea,
  AspectRatio,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  KPICard,
  StatDisplay,
  VisuallyHidden,
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Calendar,
  ChartContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Combobox,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  DataTable,
  DatePicker,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  FocusScope,
  MenubarRoot,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MultiSelect,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  Portal,
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SonnerToaster,
  sonnerToast,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  Toaster,
  useToast,
  ToolbarRoot,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from "@audiogenius/design-system";

export type PreviewFn = () => React.ReactElement;

export const previews: Record<string, PreviewFn> = {
  button: () => (
    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),

  input: () => (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <Input placeholder="Email address" type="email" />
      <Input placeholder="Disabled" disabled />
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="preview-input">Label + Input</Label>
        <Input id="preview-input" placeholder="With label" />
      </div>
    </div>
  ),

  label: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="label-preview">Your email</Label>
      <Input id="label-preview" type="email" placeholder="name@example.com" />
    </div>
  ),

  badge: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),

  alert: () => (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components using the CLI.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    </div>
  ),

  avatar: () => (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AG</AvatarFallback>
      </Avatar>
      <Avatar className="h-8 w-8">
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
    </div>
  ),

  progress: function ProgressPreview() {
    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
      const timer = setTimeout(() => setValue(66), 200);
      return () => clearTimeout(timer);
    }, []);
    return (
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <Progress value={value} />
        <Progress value={33} />
        <Progress value={100} />
      </div>
    );
  },

  slider: () => (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <Slider defaultValue={[33]} max={100} step={1} />
      <Slider defaultValue={[20, 80]} max={100} step={1} />
    </div>
  ),

  switch: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center space-x-2">
        <Switch id="s1" />
        <Label htmlFor="s1">Airplane mode</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="s2" defaultChecked />
        <Label htmlFor="s2">Notifications</Label>
      </div>
    </div>
  ),

  checkbox: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms1" />
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms2" defaultChecked />
        <label htmlFor="terms2" className="text-sm font-medium leading-none">
          Already checked
        </label>
      </div>
    </div>
  ),

  separator: () => (
    <div className="space-y-3">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
      </div>
      <Separator />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <span>Blog</span>
        <Separator orientation="vertical" />
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  ),

  skeleton: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),

  textarea: () => (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <Textarea placeholder="Type your message here." />
      <Textarea placeholder="Disabled" disabled />
    </div>
  ),

  toggle: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle italic">Italic</Toggle>
      <Toggle aria-label="Toggle bold" defaultPressed variant="outline">
        Bold
      </Toggle>
    </div>
  ),

  "toggle-group": () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Left aligned">
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Center aligned">
        Center
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right aligned">
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  ),

  tabs: () => (
    <TabsRoot defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 text-sm">
        Account settings content here.
      </TabsContent>
      <TabsContent value="password" className="p-4 text-sm">
        Password settings content here.
      </TabsContent>
    </TabsRoot>
  ),

  accordion: () => (
    <AccordionRoot type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles using CSS custom properties.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses CSS animations for smooth expand/collapse.
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  ),

  card: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Label htmlFor="card-name">Name</Label>
          <Input id="card-name" placeholder="Name of your project" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),

  select: () => (
    <SelectRoot>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
      </SelectContent>
    </SelectRoot>
  ),

  "radio-group": () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),

  collapsible: function CollapsiblePreview() {
    const [open, setOpen] = React.useState(false);
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Starred repositories</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {open ? "▲" : "▼"}
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/primitives
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/colors</div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">@stitches/react</div>
        </CollapsibleContent>
      </Collapsible>
    );
  },

  popover: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="pop-width">Width</Label>
            <Input id="pop-width" defaultValue="100%" className="col-span-2 h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),

  tooltip: () => (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  ),

  "scroll-area": () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="text-sm font-medium mb-2">Tags</div>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="text-sm py-1 border-b last:border-0">
          Item {i + 1}
        </div>
      ))}
    </ScrollArea>
  ),

  "aspect-ratio": () => (
    <div className="w-[300px]">
      <AspectRatio
        ratio={16 / 9}
        className="bg-muted rounded-md flex items-center justify-center"
      >
        <span className="text-sm text-muted-foreground">16 / 9</span>
      </AspectRatio>
    </div>
  ),

  breadcrumb: () => (
    <Breadcrumb>
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
    </Breadcrumb>
  ),

  pagination: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),

  "kpi-card": () => (
    <div className="flex flex-wrap gap-4">
      <KPICard
        title="Total Revenue"
        value="$45,231"
        change={20.1}
        changeLabel="from last month"
        trend="up"
      />
      <KPICard
        title="Active Users"
        value="2,350"
        change={-4.3}
        changeLabel="from last week"
        trend="down"
      />
    </div>
  ),

  "stat-display": () => (
    <div className="flex flex-wrap gap-6">
      <StatDisplay label="Active Users" value="2,420" trend="up" trendValue="+15%" />
      <StatDisplay label="Bounce Rate" value="38%" trend="down" trendValue="-2%" />
      <StatDisplay label="Page Views" value="12.4k" />
    </div>
  ),

  "visually-hidden": () => (
    <div className="flex items-center gap-4">
      <button className="p-2 rounded border hover:bg-accent">
        <span aria-hidden>✕</span>
        <VisuallyHidden>Close dialog</VisuallyHidden>
      </button>
      <span className="text-sm text-muted-foreground">
        The button above has a hidden accessible label.
      </span>
    </div>
  ),

  "alert-dialog": () => (
    <AlertDialogRoot>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  ),

  calendar: function CalendarPreview() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    );
  },

  chart: () => {
    const data = [
      { month: "Jan", revenue: 186 },
      { month: "Feb", revenue: 305 },
      { month: "Mar", revenue: 237 },
      { month: "Apr", revenue: 273 },
      { month: "May", revenue: 209 },
      { month: "Jun", revenue: 214 },
    ];
    const config = {
      revenue: { label: "Revenue", color: "hsl(var(--ag-chart-1))" },
    };
    return (
      <ChartContainer config={config} className="h-[200px] w-full max-w-md">
        <BarChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        </BarChart>
      </ChartContainer>
    );
  },

  combobox: () => {
    const frameworks = [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte" },
      { value: "next", label: "Next.js" },
    ];
    return (
      <Combobox
        options={frameworks}
        placeholder="Select framework..."
        searchPlaceholder="Search frameworks..."
      />
    );
  },

  command: () => (
    <Command className="rounded-lg border shadow-md w-full max-w-sm">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),

  "context-menu": () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[120px] w-[280px] items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground select-none">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Save Page As...</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),

  "data-table": () => {
    const columns = [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "status", header: "Status" },
    ];
    const data = [
      { name: "Alice Johnson", email: "alice@example.com", status: "Active" },
      { name: "Bob Smith", email: "bob@example.com", status: "Inactive" },
      { name: "Carol White", email: "carol@example.com", status: "Active" },
    ];
    return (
      <div className="w-full max-w-2xl">
        <DataTable
          columns={columns as any}
          data={data}
          filterColumn="name"
          filterPlaceholder="Filter by name..."
        />
      </div>
    );
  },

  "date-picker": function DatePickerPreview() {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
    );
  },

  dialog: () => (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dialog-name">Name</Label>
            <Input id="dialog-name" placeholder="Your name" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dialog-email">Email</Label>
            <Input id="dialog-email" type="email" placeholder="email@example.com" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  ),

  "dropdown-menu": () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
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
    </DropdownMenu>
  ),

  "focus-scope": () => (
    <FocusScope loop>
      <div className="flex gap-2 p-4 border rounded-md items-center">
        <Button size="sm">First</Button>
        <Button size="sm" variant="outline">Second</Button>
        <Button size="sm" variant="ghost">Third</Button>
        <span className="text-xs text-muted-foreground ml-2">Tab cycles within</span>
      </div>
    </FocusScope>
  ),

  form: () => (
    <div className="space-y-4 w-full max-w-sm">
      <div className="space-y-1.5">
        <Label htmlFor="form-preview-username">Username</Label>
        <Input id="form-preview-username" placeholder="Enter username" />
        <p className="text-xs text-muted-foreground">This is your public display name.</p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="form-preview-email">Email</Label>
        <Input id="form-preview-email" type="email" placeholder="email@example.com" />
      </div>
      <Button className="w-full">Submit</Button>
    </div>
  ),

  menubar: () => (
    <MenubarRoot>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab<MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo<MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo<MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Zoom In</MenubarItem>
          <MenubarItem>Zoom Out</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </MenubarRoot>
  ),

  "multi-select": () => {
    const options = [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte" },
      { value: "next", label: "Next.js" },
    ];
    return (
      <MultiSelect
        options={options}
        placeholder="Select frameworks..."
        maxCount={2}
      />
    );
  },

  "navigation-menu": () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 w-[200px] space-y-1">
              <NavigationMenuLink href="#" className="block text-sm hover:underline">
                Introduction
              </NavigationMenuLink>
              <NavigationMenuLink href="#" className="block text-sm hover:underline">
                Installation
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className="text-sm px-4 py-2 hover:underline">
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className="text-sm px-4 py-2 hover:underline">
            GitHub
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),

  portal: () => (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-md text-sm text-center text-muted-foreground">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/40">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
      <div>
        <p className="font-medium text-foreground mb-1">Portal</p>
        <p className="text-xs">Renders children outside the DOM hierarchy into a target container (defaults to <code className="font-mono text-primary">document.body</code>).</p>
      </div>
    </div>
  ),

  resizable: () => (
    <ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border h-[150px]">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm font-medium">Panel One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm font-medium">Panel Two</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),

  sheet: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when done.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="sheet-name">Name</Label>
            <Input id="sheet-name" placeholder="Your name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sheet-email">Email</Label>
            <Input id="sheet-email" type="email" placeholder="email@example.com" />
          </div>
        </div>
        <Button className="w-full">Save changes</Button>
      </SheetContent>
    </Sheet>
  ),

  sonner: () => (
    <div className="flex flex-col items-center gap-3">
      <SonnerToaster position="bottom-right" />
      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant="outline" onClick={() => sonnerToast("Event has been created")}>
          Default
        </Button>
        <Button variant="outline" onClick={() => (sonnerToast as any).success("Profile updated!")}>
          Success
        </Button>
        <Button variant="outline" onClick={() => (sonnerToast as any).error("Something went wrong")}>
          Error
        </Button>
        <Button variant="outline" onClick={() => (sonnerToast as any).warning("Unsaved changes")}>
          Warning
        </Button>
      </div>
    </div>
  ),

  table: () => (
    <Table className="max-w-xl">
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
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
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),

  toast: function ToastPreview() {
    const { toast } = useToast();
    return (
      <>
        <Toaster />
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant="outline"
            onClick={() => toast({ title: "Scheduled", description: "Monday, January 3rd at 6:00pm" })}
          >
            Show Toast
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              toast({ title: "Error", description: "Something went wrong.", variant: "destructive" })
            }
          >
            Error Toast
          </Button>
        </div>
      </>
    );
  },

  toolbar: () => (
    <ToolbarRoot className="flex w-full min-w-max rounded-md border bg-background p-0.5 max-w-sm">
      <ToolbarToggleGroup type="multiple">
        <ToolbarToggleItem value="bold" aria-label="Bold">
          <span className="font-bold text-sm">B</span>
        </ToolbarToggleItem>
        <ToolbarToggleItem value="italic" aria-label="Italic">
          <span className="italic text-sm">I</span>
        </ToolbarToggleItem>
        <ToolbarToggleItem value="underline" aria-label="Underline">
          <span className="underline text-sm">U</span>
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarButton>Share</ToolbarButton>
      <ToolbarButton>Print</ToolbarButton>
    </ToolbarRoot>
  ),
};
