export { cn } from "./lib/utils";
export { useReducedMotion, duration, easing, motionSafe, motionReduce } from "./lib/animation";
export { PaletteSwitcher } from "./components/PaletteSwitcher";
export type { PaletteSwitcherProps } from "./components/PaletteSwitcher";
export { builtinPalettes } from "./themes/palettes";
export type { PaletteTokenSet, Palette } from "./themes/palettes";
export { createTheme } from "./themes/createTheme";
export type { ThemeTokens, ThemeResult } from "./themes/createTheme";
export { Typewriter, BlurIn, FadeUp, LetterReveal } from "./components/TextAnimate";
export type { TypewriterProps, BlurInProps, FadeUpProps, LetterRevealProps } from "./components/TextAnimate";
export { FadeInOnScroll, CountUp, Parallax } from "./components/ScrollAnimate";
export type { FadeInOnScrollProps, CountUpProps, ParallaxProps } from "./components/ScrollAnimate";
export { StaggeredList } from "./components/StaggeredList";
export type { StaggeredListProps } from "./components/StaggeredList";
export { AnimatedHeight } from "./components/AnimatedHeight";
export type { AnimatedHeightProps } from "./components/AnimatedHeight";
export { TabContentCrossfade, TabPanel } from "./components/TabContentCrossfade";
export type { TabContentCrossfadeProps, TabPanelProps } from "./components/TabContentCrossfade";
export { Button, buttonVariants } from "./components/Button";
export type { ButtonProps } from "./components/Button";
export { Input } from "./components/Input";
export type { InputProps } from "./components/Input";
export { Label } from "./components/Label";
export type { LabelProps } from "./components/Label";
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./components/Card";
export type { CardProps, CardHeaderProps, CardTitleProps, CardDescriptionProps, CardContentProps, CardFooterProps } from "./components/Card";
export { Badge, badgeVariants } from "./components/Badge";
export type { BadgeProps } from "./components/Badge";
export {
  SelectRoot,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./components/Select";
export type {
  SelectRootProps,
  SelectGroupProps,
  SelectValueProps,
  SelectTriggerProps,
  SelectContentProps,
  SelectLabelProps,
  SelectItemProps,
  SelectSeparatorProps,
  SelectScrollUpButtonProps,
  SelectScrollDownButtonProps,
} from "./components/Select";
export { Checkbox, type CheckboxProps } from "./components/Checkbox";
export { Switch, type SwitchProps } from "./components/Switch";
export { Avatar, AvatarImage, AvatarFallback } from "./components/Avatar";
export type { AvatarProps } from "./components/Avatar";
export { Separator } from "./components/Separator";
export type { SeparatorProps } from "./components/Separator";
export { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "./components/Tooltip";
export type { TooltipProviderProps, TooltipRootProps, TooltipTriggerProps, TooltipContentProps } from "./components/Tooltip";
export { TabsRoot, TabsList, TabsTrigger, TabsContent } from "./components/Tabs";
export type { TabsRootProps, TabsListProps, TabsTriggerProps, TabsContentProps } from "./components/Tabs";
export { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from "./components/Accordion";
export type { AccordionRootProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps } from "./components/Accordion";
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./components/DropdownMenu";
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverAnchor,
} from "./components/Popover";
export {
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  Toaster,
  toastVariants,
  useToast,
  toast,
  dismiss,
} from "./components/Toast";
export type { ToastData, ToastInput, ToastVariant } from "./components/Toast";
export { Toggle, toggleVariants, type ToggleProps } from "./components/Toggle";
export {
  ToggleGroup,
  ToggleGroupItem,
  type ToggleGroupProps,
  type ToggleGroupItemProps,
} from "./components/ToggleGroup";
export { Progress, type ProgressProps } from "./components/Progress";
export { RadioGroup, RadioGroupItem, type RadioGroupProps, type RadioGroupItemProps } from "./components/RadioGroup";
export { Slider, type SliderProps } from "./components/Slider";
export { Textarea, type TextareaProps } from "./components/Textarea";
export {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./components/Dialog";
export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
} from "./components/Form";
export { Alert, AlertTitle, AlertDescription, alertVariants } from "./components/Alert";
export type { AlertProps } from "./components/Alert";
export { Toaster as SonnerToaster, toast as sonnerToast } from "./components/Sonner";
export type { ToasterProps as SonnerToasterProps } from "./components/Sonner";
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "./components/Command";
export {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./components/AlertDialog";
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./components/Sheet";
export { ScrollArea, ScrollBar } from "./components/ScrollArea";
export type { ScrollAreaProps, ScrollBarProps } from "./components/ScrollArea";
export { AspectRatio } from "./components/AspectRatio";
export type { AspectRatioProps } from "./components/AspectRatio";
export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./components/Resizable";
export type { ResizablePanelGroupProps, ResizablePanelProps, ResizableHandleProps } from "./components/Resizable";
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./components/Table";
export { Skeleton } from "./components/Skeleton";
export type { SkeletonProps } from "./components/Skeleton";
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./components/Collapsible";
export type { CollapsibleProps, CollapsibleTriggerProps, CollapsibleContentProps } from "./components/Collapsible";
export { DataTable } from "./components/DataTable";
export type { DataTableProps } from "./components/DataTable";
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuIndicator,
  navigationMenuTriggerStyle,
} from "./components/NavigationMenu";
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./components/Breadcrumb";
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./components/Pagination";
export { Calendar } from "./components/Calendar";
export type { CalendarProps } from "./components/Calendar";
export { DatePicker } from "./components/DatePicker";
export type { DatePickerProps } from "./components/DatePicker";
export {
  ToolbarRoot,
  ToolbarButton,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
  toolbarButtonVariants,
  toolbarToggleItemVariants,
} from "./components/Toolbar";
export type { ToolbarButtonProps, ToolbarToggleItemProps } from "./components/Toolbar";
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from "./components/ContextMenu";
export {
  MenubarRoot,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarGroup,
  MenubarPortal,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarRadioGroup,
} from "./components/Menubar";
export { Combobox, comboboxTriggerVariants } from "./components/Combobox";
export type { ComboboxProps, ComboboxOption } from "./components/Combobox";
export { MultiSelect, multiSelectTriggerVariants } from "./components/MultiSelect";
export type { MultiSelectProps, MultiSelectOption } from "./components/MultiSelect";
export {
  ChartContainer,
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  CHART_COLORS,
  Line,
  Bar,
  Area,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ChartTooltip,
  Legend,
  ResponsiveContainer,
} from "./components/Chart";
export type {
  ChartConfig,
  ChartContainerProps,
  LineChartProps,
  BarChartProps,
  AreaChartProps,
  PieChartProps,
} from "./components/Chart";
export { KPICard } from "./components/KPICard";
export type { KPICardProps } from "./components/KPICard";
export { StatDisplay } from "./components/StatDisplay";
export type { StatDisplayProps } from "./components/StatDisplay";
export { VisuallyHidden } from "./components/VisuallyHidden";
export type { VisuallyHiddenProps } from "./components/VisuallyHidden";
export { Portal } from "./components/Portal";
export type { PortalProps } from "./components/Portal";
export { FocusScope } from "./components/FocusScope";
export type { FocusScopeProps } from "./components/FocusScope";
export { LoginForm, SignUpForm, ForgotPasswordForm, OTPVerification } from "./blocks/auth";
export type { LoginFormProps, LoginValues, SignUpFormProps, SignUpValues, ForgotPasswordFormProps, ForgotPasswordValues, OTPVerificationProps } from "./blocks/auth";

export { AppSidebar } from "./blocks/navigation";
export type { AppSidebarProps, NavItem, NavSection } from "./blocks/navigation";
export { TopNav } from "./blocks/navigation";
export type { TopNavProps, TopNavItem, TopNavUser } from "./blocks/navigation";
export { MobileNavDrawer } from "./blocks/navigation";
export type { MobileNavDrawerProps } from "./blocks/navigation";

export { ProfileSettings } from "./blocks/settings";
export type { ProfileSettingsProps } from "./blocks/settings";
export { AccountSettings } from "./blocks/settings";
export type { AccountSettingsProps } from "./blocks/settings";
export { NotificationPreferences } from "./blocks/settings";
export type { NotificationPreferencesProps, NotificationGroup, NotificationItem } from "./blocks/settings";
export { BillingPage } from "./blocks/settings";
export type { BillingPageProps, BillingPlan, UsageMeter, PaymentMethod, Invoice } from "./blocks/settings";

export { HeroSection, heroSectionVariants } from "./blocks/marketing/HeroSection";
export type { HeroSectionProps } from "./blocks/marketing/HeroSection";
export { FeatureGrid } from "./blocks/marketing/FeatureGrid";
export type { FeatureGridProps, Feature } from "./blocks/marketing/FeatureGrid";
export { PricingTable } from "./blocks/marketing/PricingTable";
export type { PricingTableProps, PricingTier } from "./blocks/marketing/PricingTable";
export { TestimonialCarousel } from "./blocks/marketing/TestimonialCarousel";
export type { TestimonialCarouselProps, Testimonial } from "./blocks/marketing/TestimonialCarousel";

export { StatsOverview } from "./blocks/dashboard";
export type { StatsOverviewProps, StatsOverviewChartData } from "./blocks/dashboard";
export { ActivityFeed } from "./blocks/dashboard";
export type { ActivityFeedProps, ActivityItem } from "./blocks/dashboard";
export { MetricCards } from "./blocks/dashboard";
export type { MetricCardsProps, MetricCardItem } from "./blocks/dashboard";

export { FullDataTable } from "./blocks/data/FullDataTable";
export type { FullDataTableProps, FilterOption } from "./blocks/data/FullDataTable";
export { KanbanBoard } from "./blocks/data/KanbanBoard";
export type { KanbanBoardProps, KanbanCard, KanbanColumn } from "./blocks/data/KanbanBoard";
export { SearchableDataTable } from "./blocks/data/SearchableDataTable";
export type { SearchableDataTableProps, SearchableDataTableFilterOption } from "./blocks/data/SearchableDataTable";
export { Timeline } from "./blocks/data/Timeline";
export type { TimelineProps, TimelineItem } from "./blocks/data/Timeline";

export { ProductCard, productCardVariants, ProductCardGrid } from "./blocks/ecommerce/ProductCard";
export type { ProductCardProps, ProductCardItem, ProductCardGridProps } from "./blocks/ecommerce/ProductCard";
export { ShoppingCart } from "./blocks/ecommerce/ShoppingCart";
export type { ShoppingCartProps, CartItem } from "./blocks/ecommerce/ShoppingCart";
export { CheckoutForm } from "./blocks/ecommerce/CheckoutForm";
export type { CheckoutFormProps, CheckoutValues, OrderSummaryItem } from "./blocks/ecommerce/CheckoutForm";
export { SaaSLanding } from "./blocks/landing/SaaSLanding";
export type { SaaSLandingProps, SaaSFeature, SaaSPricingTier } from "./blocks/landing/SaaSLanding";
export { Portfolio } from "./blocks/landing/Portfolio";
export type { PortfolioProps, PortfolioProject } from "./blocks/landing/Portfolio";
export { Agency } from "./blocks/landing/Agency";
export type { AgencyProps, AgencyService, AgencyTeamMember, AgencyCaseStudy } from "./blocks/landing/Agency";
export { Startup } from "./blocks/landing/Startup";
export type { StartupProps, SocialProofMetric, StartupTestimonial } from "./blocks/landing/Startup";

export { PostList } from "./blocks/blog/PostList";
export type { PostListProps, BlogPost } from "./blocks/blog/PostList";
export { PostDetail } from "./blocks/blog/PostDetail";
export type { PostDetailProps, TocItem } from "./blocks/blog/PostDetail";
export { NewsletterSignup, newsletterSignupVariants } from "./blocks/blog/NewsletterSignup";
export type { NewsletterSignupProps } from "./blocks/blog/NewsletterSignup";

export { NotFound } from "./blocks/errors/NotFound";
export type { NotFoundProps } from "./blocks/errors/NotFound";
export { ServerError } from "./blocks/errors/ServerError";
export type { ServerErrorProps } from "./blocks/errors/ServerError";
export { Maintenance } from "./blocks/errors/Maintenance";
export type { MaintenanceProps } from "./blocks/errors/Maintenance";

export { MultiStepWizard } from "./blocks/onboarding/MultiStepWizard";
export type { MultiStepWizardProps, WizardStep } from "./blocks/onboarding/MultiStepWizard";
export { OnboardingChecklist } from "./blocks/onboarding/OnboardingChecklist";
export type { OnboardingChecklistProps, ChecklistItem } from "./blocks/onboarding/OnboardingChecklist";
export { WelcomeScreen } from "./blocks/onboarding/WelcomeScreen";
export type { WelcomeScreenProps, WelcomeFeature } from "./blocks/onboarding/WelcomeScreen";

export { DropZone } from "./blocks/files/DropZone";
export type { DropZoneProps } from "./blocks/files/DropZone";
export { FileList } from "./blocks/files/FileList";
export type { FileListProps, UploadFile, UploadStatus } from "./blocks/files/FileList";
export { ImageGallery } from "./blocks/files/ImageGallery";
export type { ImageGalleryProps, GalleryImage } from "./blocks/files/ImageGallery";

export { ChatInterface } from "./blocks/messaging/ChatInterface";
export type { ChatInterfaceProps, ChatMessage } from "./blocks/messaging/ChatInterface";
export { MessageBubbles } from "./blocks/messaging/MessageBubbles";
export type { MessageBubblesProps, BubbleMessage } from "./blocks/messaging/MessageBubbles";
export { TypingIndicator } from "./blocks/messaging/TypingIndicator";
export type { TypingIndicatorProps } from "./blocks/messaging/TypingIndicator";

export { NotificationCenter } from "./blocks/notifications/NotificationCenter";
export type { NotificationCenterProps, AppNotification } from "./blocks/notifications/NotificationCenter";
export { ActivityTimeline } from "./blocks/notifications/ActivityTimeline";
export type { ActivityTimelineProps, TimelineEntry } from "./blocks/notifications/ActivityTimeline";
export { InboxView } from "./blocks/notifications/InboxView";
export type { InboxViewProps, InboxItem } from "./blocks/notifications/InboxView";

export {
  defaultPalette,
  oceanPalette,
  forestPalette,
  sunsetPalette,
  midnightPalette,
  rosePalette,
  amberPalette,
  emeraldPalette,
  violetPalette,
  slatePalette,
  palettes,
  paletteMap,
} from "./themes";
export type { PaletteTokens } from "./themes";

export { GradientMesh, Aurora, GridPattern, DotPattern } from "./components/Background";
export type { GradientMeshProps, AuroraProps, GridPatternProps, DotPatternProps } from "./components/Background";

export { ColorPicker, colorPickerTriggerVariants, DEFAULT_PRESETS } from "./components/ColorPicker";
export type { ColorPickerProps } from "./components/ColorPicker";

export {
  TiltCard,
  SpotlightCard,
  GlassCard,
  MagneticButton,
  ShimmerButton,
  AnimatedBorderCard,
} from "./components/MagicCard";
export type {
  TiltCardProps,
  SpotlightCardProps,
  GlassCardProps,
  MagneticButtonProps,
  ShimmerButtonProps,
  AnimatedBorderCardProps,
} from "./components/MagicCard";
