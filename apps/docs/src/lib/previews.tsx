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
};
