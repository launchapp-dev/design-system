"use client";

import { AnimatedGradient } from "@launchapp/design-system";
import { AnimatedBorder } from "@launchapp/design-system";
import { AnimatedHeight } from "@launchapp/design-system";
import { AnimatedText } from "@launchapp/design-system";
import { GridPattern } from "@launchapp/design-system";
import { Banner } from "@launchapp/design-system";
import { BentoGrid, BentoCard } from "@launchapp/design-system";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrev,
} from "@launchapp/design-system";
import { Changelog } from "@launchapp/design-system";
import { ChatBubble } from "@launchapp/design-system";
import { ChatInput } from "@launchapp/design-system";
import { ColorPicker } from "@launchapp/design-system";
import { ConsentHistoryTable } from "@launchapp/design-system";
import { CookieConsent } from "@launchapp/design-system";
import { CookieConsentBanner } from "@launchapp/design-system";
import { CookiePreferencesDialog } from "@launchapp/design-system";
import { CopilotPanel } from "@launchapp/design-system";
import { DashboardGrid } from "@launchapp/design-system";
import { Dock } from "@launchapp/design-system";
import { FunnelChart } from "@launchapp/design-system";
import { Gauge } from "@launchapp/design-system";
import { Heatmap } from "@launchapp/design-system";
import { ImageComparison } from "@launchapp/design-system";
import { InlineEditable } from "@launchapp/design-system";
import { Lightbox } from "@launchapp/design-system";
import { LiveIndicator } from "@launchapp/design-system";
import { MagicCard } from "@launchapp/design-system";
import { Marquee } from "@launchapp/design-system";
import { Masonry } from "@launchapp/design-system";
import { MobileNav } from "@launchapp/design-system";
import { MultiPanelLayout } from "@launchapp/design-system";
import { MultiStepWizard } from "@launchapp/design-system";
import { NotificationBell } from "@launchapp/design-system";
import { PageTransition } from "@launchapp/design-system";
import { PaletteSwitcher } from "@launchapp/design-system";
import { PrivacyDashboard } from "@launchapp/design-system";
import { RealtimeTicker } from "@launchapp/design-system";
import { SankeyDiagram } from "@launchapp/design-system";
import { FadeInOnScroll } from "@launchapp/design-system";
import { ParallaxSection } from "@launchapp/design-system";
import { SmartThemingGenerator } from "@launchapp/design-system";
import { Sparkline } from "@launchapp/design-system";
import { Spotlight } from "@launchapp/design-system";
import { StaggeredList } from "@launchapp/design-system";
import { StatusPage } from "@launchapp/design-system";
import { StreamingText } from "@launchapp/design-system";
import { TabContentCrossfade, TabPanel } from "@launchapp/design-system";
import { TagInput } from "@launchapp/design-system";
import { Terminal } from "@launchapp/design-system";
import { WordReveal } from "@launchapp/design-system";
import { ThemeCard } from "@launchapp/design-system";
import { ThemeGenerator } from "@launchapp/design-system";
import { ThemePreview } from "@launchapp/design-system";
import { ThinkingIndicator } from "@launchapp/design-system";
import { TreeMap } from "@launchapp/design-system";
import { VideoPlayer } from "@launchapp/design-system";

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
} from "@launchapp/design-system";

import { Calendar, Collapsible, CollapsibleTrigger, CollapsibleContent, DatePicker, Progress, Toaster, useToast } from "@launchapp/design-system";

export type PreviewFn = () => React.ReactElement;

export const previews: Record<string, PreviewFn> = {
  calendar: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <div className="p-4 border rounded-md bg-background shadow-sm inline-block">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    );
  },
  collapsible: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2 border rounded-md p-4">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <span className="sr-only">Toggle</span>
              {isOpen ? "Close" : "Open"}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            radix-ui/primitives
          </div>
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            radix-ui/colors
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
  "date-picker": () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <div className="flex flex-col gap-4 max-w-sm">
        <DatePicker
          date={date}
          setDate={setDate}
        />
        <div className="text-sm text-muted-foreground">
          Selected date: {date ? date.toLocaleDateString() : "None"}
        </div>
      </div>
    );
  },
  progress: () => {
    const [progress, setProgress] = React.useState(13);
    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }, []);
    return (
      <div className="w-[60%] flex flex-col gap-4 p-4 border rounded-md">
        <Progress value={progress} className="w-full" />
        <Progress value={100} className="w-full" />
        <div className="text-sm text-muted-foreground text-center">
          Loading resources...
        </div>
      </div>
    );
  },
  toast: () => {
    const { toast } = useToast();
    return (
      <div className="flex flex-col gap-4 p-6 border rounded-md items-center">
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
            });
          }}
        >
          Show Default Toast
        </Button>
        <Button
          variant="default"
          onClick={() => {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          }}
        >
          Show Destructive Toast
        </Button>
        <Toaster />
      </div>
    );
  },
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
        <AccordionContent>Yes. It uses CSS animations for smooth expand/collapse.</AccordionContent>
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
        <div className="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/primitives</div>
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
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md flex items-center justify-center">
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
        label="Total Revenue"
        value="$45,231"
        trend="up"
        trendLabel="+20.1% from last month"
      />
      <KPICard label="Active Users" value="2,350" trend="down" trendLabel="-4.3% from last week" />
    </div>
  ),

  "stat-display": () => (
    <StatDisplay
      items={[
        { label: "Active Users", value: "2,420", trend: "up", trendLabel: "+15%" },
        { label: "Bounce Rate", value: "38%", trend: "down", trendLabel: "-2%" },
        { label: "Page Views", value: "12.4k" },
      ]}
      cols={3}
    />
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
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
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
      revenue: { label: "Revenue", color: "hsl(var(--la-chart-1))" },
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
    return <DatePicker selected={date} onSelect={setDate} placeholder="Pick a date" />;
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
        <Button size="sm" variant="outline">
          Second
        </Button>
        <Button size="sm" variant="ghost">
          Third
        </Button>
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
    return <MultiSelect options={options} placeholder="Select frameworks..." maxCount={2} />;
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
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-primary/40"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
      <div>
        <p className="font-medium text-foreground mb-1">Portal</p>
        <p className="text-xs">
          Renders children outside the DOM hierarchy into a target container (defaults to{" "}
          <code className="font-mono text-primary">document.body</code>).
        </p>
      </div>
    </div>
  ),

  resizable: () => (
    <ResizablePanelGroup orientation="horizontal" className="max-w-md rounded-lg border h-[150px]">
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
        <Button
          variant="outline"
          onClick={() => (sonnerToast as any).error("Something went wrong")}
        >
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
            onClick={() =>
              toast({ title: "Scheduled", description: "Monday, January 3rd at 6:00pm" })
            }
          >
            Show Toast
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              toast({
                title: "Error",
                description: "Something went wrong.",
                variant: "destructive",
              })
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
  "animated-background": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <div className="relative h-64 rounded-xl overflow-hidden">
        <AnimatedGradient />
        <div className="relative z-10 flex h-full items-center justify-center">
          <h1 className="text-3xl font-bold text-white">Hero Title</h1>
        </div>
      </div>
    </div>
  ),
  "animated-border": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <AnimatedBorder>
        <div className="rounded-xl bg-background p-6">
          <h3 className="font-semibold">Featured</h3>
          <p className="text-sm text-muted-foreground">Highlighted with an animated border.</p>
        </div>
      </AnimatedBorder>
    </div>
  ),
  "animated-height": () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
        <button type="button" onClick={() => setOpen(!open)}>
          Toggle
        </button>
        <AnimatedHeight isOpen={open}>
          <div className="p-4 bg-muted rounded-md mt-2">
            <p>Hidden content revealed with smooth animation.</p>
          </div>
        </AnimatedHeight>
      </div>
    );
  },
  "animated-text": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px] p-8 bg-muted/10 rounded-lg">
      <AnimatedText text="Building great products starts here." animation="fadeUp" className="text-2xl font-bold tracking-tight text-primary" />
      <AnimatedText text="With LaunchApp templates." animation="blurIn" className="text-lg text-muted-foreground mt-2" delay={500} />
    </div>
  ),
  background: () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <div className="relative h-48 rounded-xl overflow-hidden">
        <GridPattern />
      </div>
    </div>
  ),
  banner: () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <Banner variant="info" onOpenChange={() => console.log("dismissed")}>
        🎉 New features available — <a href="/changelog">See what's new</a>
      </Banner>
    </div>
  ),
  "bento-grid": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <BentoGrid>
        <BentoCard colSpan={2}>
          <div className="h-32 bg-muted rounded-md" />
        </BentoCard>
        <BentoCard>
          <div className="h-32 bg-muted rounded-md" />
        </BentoCard>
      </BentoGrid>
    </div>
  ),
  carousel: () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="p-4 bg-muted rounded-xl h-48 flex items-center justify-center">
              Slide 1
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-4 bg-muted rounded-xl h-48 flex items-center justify-center">
              Slide 2
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-4 bg-muted rounded-xl h-48 flex items-center justify-center">
              Slide 3
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrev />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  changelog: () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <Changelog
        entries={[
          {
            version: "2.0.0",
            date: "2024-03-01",
            title: "Major release",
            changes: [{ text: "New component library" }, { text: "Dark mode support" }],
          },
          {
            version: "1.5.0",
            date: "2024-02-01",
            title: "Feature update",
            changes: [{ text: "Added Carousel" }, { text: "Improved performance" }],
          },
        ]}
      />
    </div>
  ),
  "chat-bubble": () => (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto items-start justify-center min-h-[200px] p-4 border rounded-xl bg-background/50">
      <ChatBubble timestamp="10:00 AM" variant="received">Hey! How&#39;s it going?</ChatBubble>
      <ChatBubble timestamp="10:01 AM" variant="sent" className="self-end bg-primary text-primary-foreground">Doing well, just working on some UI components!</ChatBubble>
    </div>
  ),
  "chat-input": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-end min-h-[200px] p-6 bg-muted/20 rounded-xl">
      <div className="w-full max-w-lg">
        <ChatInput placeholder="Message #general" onSend={(msg) => console.log("sent:", msg)} />
        <p className="text-xs text-muted-foreground mt-2 text-center">Press Enter to send, Shift+Enter for new line.</p>
      </div>
    </div>
  ),
  "color-picker": () => {
    const [color, setColor] = React.useState("#3b82f6");
    return (
      <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
        <ColorPicker value={color} onChange={setColor} />
      </div>
    );
  },
  "consent-history-table": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <ConsentHistoryTable
        entries={[
          {
            id: "1",
            action: "accepted_all",
            timestamp: "2024-01-01T10:00:00Z",
            categories: { analytics: true, marketing: true },
          },
          {
            id: "2",
            action: "customized",
            timestamp: "2024-01-02T11:00:00Z",
            categories: { analytics: true, marketing: false },
          },
        ]}
      />
    </div>
  ),
  "cookie-consent": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <CookieConsent
        onAcceptAll={() => console.log("accepted all")}
        onRejectAll={() => console.log("denied")}
        onSavePreferences={(prefs) => console.log("saved:", prefs)}
      />
    </div>
  ),
  "cookie-consent-banner": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <CookieConsentBanner
        visible={true}
        onAcceptAll={() => console.log("accepted all")}
        onRejectAll={() => console.log("rejected all")}
      />
    </div>
  ),
  "cookie-preferences-dialog": () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
        <button type="button" onClick={() => setOpen(true)}>
          Cookie Preferences
        </button>
        <CookiePreferencesDialog
          open={open}
          onOpenChange={setOpen}
          onSave={(prefs) => {
            console.log(prefs);
            setOpen(false);
          }}
        />
      </div>
    );
  },
  "copilot-panel": () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
        <button type="button" onClick={() => setOpen(true)}>
          Open Copilot
        </button>
        <CopilotPanel open={open} onOpenChange={setOpen}>
          <div className="p-4 text-sm text-muted-foreground">AI Copilot Panel</div>
        </CopilotPanel>
      </div>
    );
  },
  "dashboard-grid": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <DashboardGrid
        widgets={[
          { id: "revenue", title: "Revenue", children: <div className="h-full bg-muted rounded-lg p-4">Revenue</div> },
          { id: "users", title: "Users", children: <div className="h-full bg-muted rounded-lg p-4">Users</div> },
        ]}
      />
    </div>
  ),
  dock: () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <Dock
        items={[
          { id: "home", icon: <span className="text-2xl">🏠</span>, label: "Home" },
          { id: "files", icon: <span className="text-2xl">📁</span>, label: "Files" },
          { id: "settings", icon: <span className="text-2xl">⚙️</span>, label: "Settings" },
        ]}
      />
    </div>
  ),
  "funnel-chart": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <FunnelChart
        data={[
          { id: "visitors", label: "Visitors", value: 10000 },
          { id: "signups", label: "Sign-ups", value: 3500 },
          { id: "activated", label: "Activated", value: 1200 },
          { id: "paid", label: "Paid", value: 420 },
        ]}
      />
    </div>
  ),
  gauge: () => (
    <div className="flex flex-row gap-8 w-full items-center justify-center min-h-[200px] flex-wrap p-4 bg-card rounded-xl border">
      <Gauge value={72} label="Performance" size="md" color="var(--primary)" />
      <Gauge value={98} label="Accessibility" size="md" color="var(--success, #22c55e)" />
      <Gauge value={45} label="SEO" size="md" color="var(--warning, #eab308)" />
    </div>
  ),
  heatmap: () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <Heatmap
        data={[
          [{ value: 3 }, { value: 7 }, { value: 1 }],
          [{ value: 5 }, { value: 2 }, { value: 9 }],
        ]}
        rowLabels={["Mon", "Tue"]}
        colLabels={["Jan", "Feb", "Mar"]}
      />
    </div>
  ),
  "image-comparison": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <ImageComparison
        beforeSrc="/before.jpg"
        beforeAlt="Before"
        afterSrc="/after.jpg"
        afterAlt="After"
        initialPosition={40}
      />
    </div>
  ),
  "inline-editable": () => {
    const [name, setName] = React.useState("My Project");
    return (
      <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
        <InlineEditable value={name} onChange={setName} placeholder="Enter project name" />
      </div>
    );
  },
  lightbox: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
        <button type="button" onClick={() => setOpen(true)}>
          View Gallery
        </button>
        <Lightbox
          open={open}
          onOpenChange={setOpen}
          images={[
            { src: "/photo1.jpg", alt: "Photo 1" },
            { src: "/photo2.jpg", alt: "Photo 2" },
          ]}
        />
      </div>
    );
  },
  "live-indicator": () => (
    <div className="flex flex-row gap-6 w-full items-center justify-center min-h-[200px] border rounded-lg bg-background p-6">
      <LiveIndicator label="Live" status="online" pulse />
      <LiveIndicator label="Connecting..." status="away" pulse={false} />
      <LiveIndicator label="Offline" status="offline" pulse={false} />
    </div>
  ),
  "magic-card": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <MagicCard effect="glow">
        <div className="p-8">
          <h3 className="text-xl font-bold">Magic Card</h3>
          <p className="text-muted-foreground mt-2">Hover to see the spotlight effect.</p>
        </div>
      </MagicCard>
    </div>
  ),
  marquee: () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <Marquee pauseOnHover>
        {["Acme", "Globex", "Initech", "Umbrella", "Stark Industries"].map((name) => (
          <div key={name} className="mx-8 text-sm font-semibold text-muted-foreground">
            {name}
          </div>
        ))}
      </Marquee>
    </div>
  ),
  masonry: () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <Masonry columns={3} gap="md">
        {[
          { id: "1", src: "/photo1.jpg", alt: "Photo 1" },
          { id: "2", src: "/photo2.jpg", alt: "Photo 2" },
          { id: "3", src: "/photo3.jpg", alt: "Photo 3" },
        ].map((photo) => (
          <img key={photo.id} src={photo.src} alt={photo.alt} className="rounded-lg w-full" />
        ))}
      </Masonry>
    </div>
  ),
  "mobile-nav": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <MobileNav
        items={[
          { label: "Home", href: "/" },
          { label: "Explore", href: "/explore" },
          { label: "Profile", href: "/profile" },
        ]}
      />
    </div>
  ),
  "multi-panel-layout": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <MultiPanelLayout
        panels={[
          { id: "main", children: <div className="p-4">Main content</div>, defaultSize: 60 },
          { id: "sidebar", children: <div className="p-4 bg-muted/30">Sidebar</div>, defaultSize: 25 },
          { id: "inspector", children: <div className="p-4 bg-muted/20">Inspector</div>, defaultSize: 15 },
        ]}
      />
    </div>
  ),
  "multi-step-wizard": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <MultiStepWizard
        steps={[
          { id: "info", title: "Basic Info", content: <div>Step 1 form</div> },
          { id: "config", title: "Configuration", content: <div>Step 2 form</div> },
          { id: "review", title: "Review", content: <div>Summary</div> },
        ]}
        onComplete={() => console.log("done")}
      />
    </div>
  ),
  "notification-bell": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <NotificationBell
        notifications={[
          { id: "1", title: "New message", timestamp: "2m ago", read: false },
          { id: "2", title: "Build passed", description: "main branch", timestamp: "10m ago", read: false },
          { id: "3", title: "Deploy complete", timestamp: "1h ago", read: true },
        ]}
      />
    </div>
  ),
  "page-transition": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <PageTransition variant="fade">
        <div>Page content</div>
      </PageTransition>
    </div>
  ),
  "palette-switcher": () => (
    <div className="flex flex-col gap-6 w-full items-center justify-center min-h-[200px] p-6 border rounded-xl bg-card">
      <div className="text-sm font-medium text-muted-foreground">Select a theme palette</div>
      <PaletteSwitcher onValueChange={(name) => console.log("palette:", name)} />
    </div>
  ),
  "privacy-dashboard": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <PrivacyDashboard
        consentHistory={[
          { id: "1", action: "accepted_all", timestamp: "2024-01-01T10:00:00Z" },
        ]}
        onRequestDataDownload={() => console.log("download")}
        onRequestAccountDeletion={() => console.log("delete account")}
      />
    </div>
  ),
  "realtime-ticker": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <RealtimeTicker
        items={[
          { id: "acme", label: "ACME", value: 142.5, previousValue: 140.2, format: "currency" },
          { id: "glob", label: "GLOB", value: 87.2, previousValue: 88.3, format: "currency" },
        ]}
      />
    </div>
  ),
  "sankey-diagram": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <SankeyDiagram
        nodes={[{ id: "organic", name: "Organic" }, { id: "paid", name: "Paid" }, { id: "signup", name: "Sign-up" }, { id: "purchase", name: "Purchase" }]}
        links={[
          { source: "organic", target: "signup", value: 400 },
          { source: "paid", target: "signup", value: 200 },
          { source: "signup", target: "purchase", value: 350 },
        ]}
      />
    </div>
  ),
  "scroll-animate": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <FadeInOnScroll>
        <div className="p-6 rounded-xl bg-muted">
          <h2 className="text-xl font-bold">Animated section</h2>
          <p className="mt-2 text-muted-foreground">Appears as you scroll down.</p>
        </div>
      </FadeInOnScroll>
    </div>
  ),
  "scroll-effects": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <ParallaxSection speed={0.3}>
        <div className="h-screen bg-gradient-to-b from-primary/10 to-background flex items-center justify-center">
          <h1 className="text-5xl font-bold">Hero Title</h1>
        </div>
      </ParallaxSection>
    </div>
  ),
  "smart-theming-generator": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <SmartThemingGenerator
        apiKey="demo"
        onThemeGenerated={(colors) => console.log("generated:", colors)}
      />
    </div>
  ),
  sparkline: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full items-center justify-center min-h-[200px] p-6">
      <div className="p-4 border rounded-lg bg-card shadow-sm"><Sparkline data={[30, 45, 28, 60, 72, 55, 80, 95]} type="area" color="var(--primary)" /></div>
      <div className="p-4 border rounded-lg bg-card shadow-sm"><Sparkline data={[95, 80, 55, 72, 60, 28, 45, 30]} type="line" color="var(--destructive, #ef4444)" /></div>
    </div>
  ),
  spotlight: () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <div className="relative min-h-[300px] bg-black rounded-xl overflow-hidden">
        <Spotlight size={400} followsMouse={true} />
        <div className="relative z-10 flex items-center justify-center h-64 text-white text-2xl font-bold">
          Move your cursor over me
        </div>
      </div>
    </div>
  ),
  "staggered-list": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <StaggeredList staggerDelay={75}>
        {["Dashboard", "Projects", "Team", "Settings"].map((item) => (
          <div key={item} className="py-2 px-4 rounded-md hover:bg-muted">
            {item}
          </div>
        ))}
      </StaggeredList>
    </div>
  ),
  "status-page": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <StatusPage
        services={[
          { id: "api", name: "API", status: "operational" },
          { id: "db", name: "Database", status: "operational" },
          { id: "cdn", name: "CDN", status: "degraded" },
        ]}
      />
    </div>
  ),
  "streaming-text": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <StreamingText
        text="Here is the analysis you requested. The data shows a 23% increase in user engagement over the past month..."
        speed={40}
        onComplete={() => console.log("done")}
      />
    </div>
  ),
  "tab-content-crossfade": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <TabContentCrossfade activeKey="overview">
        <TabPanel tabKey="overview"><div>Overview content</div></TabPanel>
        <TabPanel tabKey="details"><div>Details content</div></TabPanel>
        <TabPanel tabKey="history"><div>History content</div></TabPanel>
      </TabContentCrossfade>
    </div>
  ),
  "tag-input": () => {
    const [tags, setTags] = React.useState<string[]>(["React", "TypeScript"]);
    return (
      <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
        <TagInput value={tags} onChange={setTags} placeholder="Add skill..." />
      </div>
    );
  },
  terminal: () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <Terminal
        title="Getting Started"
        lines={[
          { type: "input", content: "npm install @launchapp/design-system" },
          { type: "output", content: "added 42 packages in 3.2s" },
          { type: "input", content: "npm run dev" },
          { type: "output", content: "⚡ Server ready on http://localhost:3000" },
        ]}
      />
    </div>
  ),
  "text-animate": () => (
    <div className="flex flex-col gap-6 w-full items-center justify-center min-h-[200px] bg-muted/30 border rounded-xl p-8">
      <WordReveal text="Ship products faster than ever." className="text-3xl font-bold" />
      <WordReveal text="Focus on your business logic, we handle the rest." className="text-lg text-muted-foreground" delay={300} />
    </div>
  ),
  "theme-card": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <ThemeCard
        theme={{
          id: "ocean-blue",
          name: "Ocean Blue",
          description: "A calming blue theme",
          author: { name: "Demo" },
          version: "1.0.0",
          license: "MIT",
          previewColor: "210 80% 56%",
          tokens: { light: {} as never, dark: {} as never },
        }}
        onViewDetails={(id) => console.log("view", id)}
        onUseTheme={(id) => console.log("use", id)}
      />
    </div>
  ),
  "theme-generator": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[300px] p-6 bg-card border rounded-xl shadow-sm max-w-2xl mx-auto">
      <div className="text-center mb-2"><h3 className="font-semibold text-lg">AI Theme Generator</h3><p className="text-sm text-muted-foreground">Describe your brand to generate a palette</p></div>
      <ThemeGenerator onThemeGenerated={(palette) => console.log("generated:", palette)} />
    </div>
  ),
  "theme-preview": () => (
    <div className="flex flex-col gap-6 w-full items-center justify-center min-h-[300px] p-8 border rounded-xl bg-background shadow-sm">
      <div className="w-full max-w-3xl">
        <h4 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">Light Theme</h4>
        <ThemePreview colors={{ primary: "210 80% 56%", secondary: "220 9% 46%", muted: "210 40% 96%", accent: "210 40% 96%", destructive: "0 84% 60%", background: "0 0% 100%", foreground: "222 47% 11%" }} />
      </div>
    </div>
  ),
  "thinking-indicator": () => (
    <div className="flex flex-col gap-8 w-full items-center justify-center min-h-[200px] border rounded-xl p-8 bg-muted/20">
      <ThinkingIndicator label="AI is thinking..." variant="dots" size="md" />
      <ThinkingIndicator label="Generating response" variant="spinner" size="sm" />
      <ThinkingIndicator label="Processing" variant="pulse" size="lg" />
    </div>
  ),
  "tree-map": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <TreeMap
        data={[
          { id: "eng", name: "Engineering", value: 400000 },
          { id: "mkt", name: "Marketing", value: 200000 },
          { id: "des", name: "Design", value: 100000 },
          { id: "ops", name: "Operations", value: 80000 },
        ]}
        height={300}
      />
    </div>
  ),
  "video-player": () => (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[200px]">
      <VideoPlayer
        src="https://example.com/demo.mp4"
        poster="https://example.com/thumb.jpg"
        muted
      />
    </div>
  ),

};
