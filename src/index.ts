export { cn } from "./lib/utils";
export { useReducedMotion, duration, easing, motionSafe, motionReduce } from "./lib/animation";
export {
  generateComponent,
  generateComponentFromDescription,
  type ComponentGenerationRequest,
  type ComponentGenerationResponse,
} from "./lib/ai-component-generator";
export {
  handleComponentGenerationRequest,
  type APIRequest,
  type APIResponse,
} from "./lib/ai-component-generator-api";
export { PaletteSwitcher } from "./components/PaletteSwitcher";
export type { PaletteSwitcherProps } from "./components/PaletteSwitcher";
export { builtinPalettes } from "./themes/palettes";
export type { PaletteTokenSet, Palette } from "./themes/palettes";
export { createTheme } from "./themes/createTheme";
export type { ThemeTokens, ThemeResult } from "./themes/createTheme";
export { getCommunityThemeRegistry, getCommunityThemeById, listCommunityThemes, getFeaturedCommunityThemeIds } from "./themes/community-registry";
export { validateCommunityTheme, validateHslValue, getCommunityThemesCssString } from "./themes/community-themes";
export type { CommunityTheme, CommunityThemeAuthor, CommunityThemeTokens } from "./themes/community-themes";
export { extractBrandColorsFromUrl, extractBrandColorsFromImage } from "./lib/extract-brand-colors";
export type { ExtractedColor } from "./lib/extract-brand-colors";
export { generatePaletteFromColors } from "./themes/generatePaletteFromColors";
export { ThemeGenerator } from "./components/ThemeGenerator";
export type { ThemeGeneratorProps } from "./components/ThemeGenerator";
export { SmartThemingGenerator } from "./components/SmartThemingGenerator";
export type { SmartThemingGeneratorProps } from "./components/SmartThemingGenerator";
export { ThemePreview } from "./components/ThemePreview";
export type { ThemePreviewProps } from "./components/ThemePreview";
export { ThemeCard } from "./components/ThemeCard";
export type { ThemeCardProps } from "./components/ThemeCard";
export { Typewriter, BlurIn, FadeUp, LetterReveal, WordReveal, GradientText } from "./components/TextAnimate";
export { gradientTextVariants } from "./components/TextAnimate";
export type { TypewriterProps, BlurInProps, FadeUpProps, LetterRevealProps, WordRevealProps, GradientTextProps } from "./components/TextAnimate";
export { FadeInOnScroll, CountUp, Parallax } from "./components/ScrollAnimate";
export type { FadeInOnScrollProps, CountUpProps, ParallaxProps } from "./components/ScrollAnimate";
export { StaggeredList } from "./components/StaggeredList";
export type { StaggeredListProps } from "./components/StaggeredList";
export { AnimatedHeight } from "./components/AnimatedHeight";
export type { AnimatedHeightProps } from "./components/AnimatedHeight";
export { AnimatedText, TextTransition } from "./components/AnimatedText";
export type { AnimatedTextProps, TextTransitionProps } from "./components/AnimatedText";
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
  Lightbox,
  lightboxVariants,
  lightboxContentVariants,
  lightboxImageVariants,
  lightboxThumbnailVariants,
} from "./components/Lightbox";
export type { LightboxProps, LightboxImage } from "./components/Lightbox";
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
export { 
  Banner, 
  BannerContent,
  BannerTitle, 
  BannerDescription, 
  BannerAction,
  BannerActions,
  BannerDismiss,
  bannerVariants 
} from "./components/Banner";
export type { BannerProps, BannerActionProps } from "./components/Banner";
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
export { ColorPicker } from "./components/ColorPicker";
export type { ColorPickerProps } from "./components/ColorPicker";
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
export { Sparkline, sparklineVariants } from "./components/Sparkline";
export type { SparklineProps } from "./components/Sparkline";
export { VisuallyHidden } from "./components/VisuallyHidden";
export type { VisuallyHiddenProps } from "./components/VisuallyHidden";
export { ThinkingIndicator, thinkingIndicatorVariants } from "./components/ThinkingIndicator";
export type { ThinkingIndicatorProps } from "./components/ThinkingIndicator";
export { StreamingText, streamingTextVariants } from "./components/StreamingText";
export type { StreamingTextProps } from "./components/StreamingText";
export { Portal } from "./components/Portal";
export type { PortalProps } from "./components/Portal";
export { FocusScope } from "./components/FocusScope";
export type { FocusScopeProps } from "./components/FocusScope";
export { NotificationBell, notificationBellVariants } from "./components/NotificationBell";
export type { NotificationBellProps, NotificationItem } from "./components/NotificationBell";
export { LoginForm, SignUpForm, ForgotPasswordForm, OTPVerification } from "./blocks/auth";
export type { LoginFormProps, LoginValues, SignUpFormProps, SignUpValues, ForgotPasswordFormProps, ForgotPasswordValues, OTPVerificationProps } from "./blocks/auth";

export { AppSidebar } from "./blocks/navigation";
export type { AppSidebarProps, NavItem, NavSection } from "./blocks/navigation";
export { TopNav } from "./blocks/navigation";
export type { TopNavProps, TopNavItem, TopNavUser } from "./blocks/navigation";
export { MobileNavDrawer } from "./blocks/navigation";
export type { MobileNavDrawerProps } from "./blocks/navigation";

export { MobileNav } from "./components/MobileNav";
export type { MobileNavProps, MobileNavItem } from "./components/MobileNav";

export { ProfileSettings } from "./blocks/settings";
export type { ProfileSettingsProps } from "./blocks/settings";
export { AccountSettings } from "./blocks/settings";
export type { AccountSettingsProps } from "./blocks/settings";
export { NotificationPreferences } from "./blocks/settings";
export type { NotificationPreferencesProps, NotificationGroup, NotificationPreferenceItem } from "./blocks/settings";
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
export { HeroSectionBlock, heroSectionBlockVariants } from "./blocks/landing/HeroSection";
export type { HeroSectionBlockProps, SocialProofMetric as HeroSectionSocialProofMetric } from "./blocks/landing/HeroSection";

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

export { ThemeSubmissionForm } from "./blocks/community/ThemeSubmissionForm";
export type { ThemeSubmissionFormProps } from "./blocks/community/ThemeSubmissionForm";
export { CommunityThemesGallery } from "./blocks/community/CommunityThemesGallery";
export type { CommunityThemesGalleryProps } from "./blocks/community/CommunityThemesGallery";

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

export { LiveIndicator, liveIndicatorVariants, liveDotVariants } from "./components/LiveIndicator";
export type { LiveIndicatorProps } from "./components/LiveIndicator";

export { GradientMesh, Aurora, GridPattern, DotPattern } from "./components/Background";
export type { GradientMeshProps, AuroraProps, GridPatternProps, DotPatternProps } from "./components/Background";

export { Particles, Stars, MatrixRain, NoiseTexture, AnimatedGrid, GradientBackground, AnimatedGradient, ShimmerBackground } from "./components/AnimatedBackground";
export type { ParticlesProps, StarsProps, MatrixRainProps, NoiseTextureProps, AnimatedGridProps, GradientBackgroundProps, AnimatedGradientProps, ShimmerBackgroundProps } from "./components/AnimatedBackground";

export { Spotlight } from "./components/Spotlight";
export type { SpotlightProps } from "./components/Spotlight";

export {
  ChatBubble,
  ChatBubbleGroup,
  ChatBubbleLinkPreview,
  chatBubbleVariants,
  chatBubbleContentVariants,
} from "./components/ChatBubble";
export type { ChatBubbleProps, ChatBubbleGroupProps, LinkPreviewProps } from "./components/ChatBubble";

export {
  TiltCard,
  SpotlightCard,
  GlassCard,
  MagneticButton,
  ShimmerButton,
  AnimatedBorderCard,
  HolographicCard,
  NeonGlowCard,
  RippleButton,
  GlowPulseButton,
  MorphButton,
  morphVariants,
  MagicCard,
  HoverCard,
  AnimatedCard,
} from "./components/MagicCard";
export type {
  TiltCardProps,
  SpotlightCardProps,
  GlassCardProps,
  MagneticButtonProps,
  ShimmerButtonProps,
  AnimatedBorderCardProps,
  HolographicCardProps,
  NeonGlowCardProps,
  RippleButtonProps,
  GlowPulseButtonProps,
  MorphButtonProps,
  MagicCardProps,
  HoverCardProps,
  AnimatedCardProps,
} from "./components/MagicCard";

export { MultiStepWizard as AdvancedMultiStepWizard } from "./components/MultiStepWizard";
export type { MultiStepWizardProps as AdvancedMultiStepWizardProps, WizardStep as AdvancedWizardStep } from "./components/MultiStepWizard";

export { InlineEditable } from "./components/InlineEditable";
export type { InlineEditableProps } from "./components/InlineEditable";

export { TagInput, tagInputVariants, tagVariants } from "./components/TagInput";
export type { TagInputProps } from "./components/TagInput";

export { Marquee, MarqueeItem, marqueeVariants, marqueeContentVariants } from "./components/Marquee";
export type { MarqueeProps, MarqueeItemProps } from "./components/Marquee";

export {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrev,
  CarouselNext,
  CarouselDots,
  CarouselAutoplay,
  carouselVariants,
  carouselItemVariants,
  carouselButtonVariants,
  carouselDotVariants,
  useCarousel,
} from "./components/Carousel";
export type {
  CarouselProps,
  CarouselItemProps,
  CarouselContentProps,
  CarouselPrevProps,
  CarouselNextProps,
  CarouselDotsProps,
  CarouselAutoplayProps,
} from "./components/Carousel";

export {
  CopilotPanel,
  CopilotPanelTrigger,
  CopilotPanelClose,
  CopilotPanelHeader,
  CopilotPanelTitle,
  CopilotPanelDescription,
  CopilotPanelContent,
  CopilotPanelFooter,
  CopilotPanelContext,
  CopilotPanelContextList,
  CopilotPanelSuggestions,
  CopilotPanelSuggestion,
  CopilotPanelDivider,
  CopilotPanelInput,
  CopilotPanelChatHistory,
  copilotPanelVariants,
  copilotSuggestionVariants,
} from "./components/CopilotPanel";
export type {
  CopilotPanelProps,
  CopilotPanelContextProps,
  CopilotPanelContextListProps,
  CopilotSuggestionProps,
  CopilotPanelSuggestionsProps,
  CopilotPanelInputProps,
  CopilotPanelChatHistoryProps,
} from "./components/CopilotPanel";

export { StatusPage, overallStatusVariants } from "./components/StatusPage";
export type { StatusPageProps, StatusService, ServiceStatus, UptimeEntry } from "./components/StatusPage";

export { Changelog, changelogTagVariants } from "./components/Changelog";
export type { ChangelogProps, ChangelogEntry, ChangelogChange, ChangelogTag } from "./components/Changelog";

export { CookieConsent, DEFAULT_CATEGORIES } from "./components/CookieConsent";
export type { CookieConsentProps, CookieCategory } from "./components/CookieConsent";

export { CookieConsentBanner, BANNER_DEFAULT_CATEGORIES, cookieConsentBannerVariants } from "./components/CookieConsentBanner";
export type { CookieConsentBannerProps, CookieConsentBannerCategory } from "./components/CookieConsentBanner";

export { CookiePreferencesDialog, PREFERENCES_DEFAULT_CATEGORIES } from "./components/CookiePreferencesDialog";
export type { CookiePreferencesDialogProps, CookiePreferenceCategory } from "./components/CookiePreferencesDialog";

export { ConsentHistoryTable, actionBadgeVariants, ACTION_LABELS } from "./components/ConsentHistoryTable";
export type { ConsentHistoryTableProps, ConsentHistoryEntry, ConsentAction } from "./components/ConsentHistoryTable";

export { PrivacyDashboard } from "./components/PrivacyDashboard";
export type { PrivacyDashboardProps, DataRequestStatus, DeleteAccountStatus } from "./components/PrivacyDashboard";

export { TreeMap, treeMapVariants } from "./components/TreeMap";
export type { TreeMapProps, TreeMapNode } from "./components/TreeMap";

export { SankeyDiagram, sankeyDiagramVariants } from "./components/SankeyDiagram";
export type { SankeyDiagramProps, SankeyNode, SankeyLink } from "./components/SankeyDiagram";

export { DashboardGrid, dashboardGridVariants } from "./components/DashboardGrid";
export type { DashboardGridProps, DashboardWidget } from "./components/DashboardGrid";

export {
  RealtimeTicker,
  realtimeTickerVariants,
  tickerValueVariants,
  tickerChangeVariants
} from "./components/RealtimeTicker";
export type { RealtimeTickerProps, TickerItem } from "./components/RealtimeTicker";

export { Terminal, TerminalHeader, terminalVariants, terminalHeaderVariants } from "./components/Terminal";
export type { TerminalProps, TerminalHeaderProps, TerminalLine } from "./components/Terminal";

export { AnimatedBorder } from "./components/AnimatedBorder";
export type { AnimatedBorderProps } from "./components/AnimatedBorder";

export {
  StickySection,
  StickyHeader,
  HorizontalScroll,
  ScrollProgress,
  RevealOnScroll,
  ScrollSnapContainer,
  ScrollSnapItem,
  ParallaxSection,
  ProgressIndicator,
} from "./components/ScrollEffects";
export type {
  StickySectionProps,
  StickyHeaderProps,
  HorizontalScrollProps,
  ScrollProgressProps,
  RevealOnScrollProps,
  ScrollSnapContainerProps,
  ScrollSnapItemProps,
  ParallaxSectionProps,
  ProgressIndicatorProps,
} from "./components/ScrollEffects";

export {
  PageTransition,
  TransitionGroup,
  RouteTransition,
  AnimatePresence,
  MorphTransition,
} from "./components/PageTransition";
export type {
  PageTransitionProps,
  TransitionGroupProps,
  RouteTransitionProps,
  AnimatePresenceProps,
  MorphTransitionProps,
} from "./components/PageTransition";

export { Dock, dockVariants, dockItemVariants } from "./components/Dock";
export type { DockProps, DockItemData } from "./components/Dock";

export {
  ImageComparison,
  imageComparisonVariants,
  imageComparisonSliderVariants,
  imageComparisonHandleVariants,
} from "./components/ImageComparison";
export type { ImageComparisonProps } from "./components/ImageComparison";

export { Heatmap, heatmapVariants, cellVariants } from "./components/Heatmap";
export type { HeatmapProps, HeatmapCell } from "./components/Heatmap";

export { Gauge, gaugeVariants } from "./components/Gauge";
export type { GaugeProps, GaugeColorZone } from "./components/Gauge";

export { FunnelChart, funnelChartVariants, funnelStageVariants } from "./components/FunnelChart";
export type { FunnelChartProps, FunnelStage } from "./components/FunnelChart";

export {
  ChatInput,
  chatInputVariants,
  chatInputButtonVariants,
} from "./components/ChatInput";
export type { ChatInputProps } from "./components/ChatInput";

export {
  BentoGrid,
  BentoCard,
  BentoCardHeader,
  BentoCardTitle,
  BentoCardDescription,
  BentoCardBody,
  BentoCardFooter,
  bentoGridVariants,
  bentoCardVariants,
} from "./components/BentoGrid";
export type {
  BentoGridProps,
  BentoCardProps,
  BentoGridVariantsProps,
  BentoCardVariantsProps,
} from "./components/BentoGrid";

export {
  Masonry,
  MasonryCard,
  MasonryItem,
  masonryVariants,
  masonryColumnVariants,
} from "./components/Masonry";
export type { MasonryProps, MasonryVariantsProps } from "./components/Masonry";

export {
  VideoPlayer,
  videoPlayerVariants,
  videoPlayerOverlayVariants,
} from "./components/VideoPlayer";
export type { VideoPlayerProps } from "./components/VideoPlayer";

export { analyzeImageColors } from "./lib/vision";
export type { VisionThemeOptions, VisionColorMap, VisionThemeResult } from "./lib/vision";

export {
  analyzeComponentA11y,
  generateComponentFix,
  batchAnalyzeComponents,
  generateA11yReport,
  verifyWithAxeCore,
} from "./lib/a11y-fixer";
export type {
  A11yViolation,
  A11yFix,
  A11yAnalysisResult,
  A11yFixerOptions,
} from "./lib/a11y-fixer";

export {
  getPluginManager,
  resetPluginManager,
  useVariant,
  getCustomVariant,
  getComponentVariants,
  hasCustomVariant,
} from "./lib/plugins";
export type {
  PluginConfig,
  PluginContext,
  PluginManager,
  HookName,
  HookCallback,
  HookContext,
  CustomVariant,
  VariantRegistry,
} from "./lib/plugins";

export {
  createRegistry,
  defaultRegistry,
} from "./plugins/registry";
export type {
  ComponentPlugin,
  PluginMetadata,
  RegisterPluginOptions,
  PluginQueryResult,
  PluginVariants,
  PluginDefaultVariants,
  BeforeRenderHook,
  AfterRenderHook,
  VariantStyleConfig,
  VariantGroup,
} from "./plugins/types";
export {
  mergeVariants,
  mergeDefaultVariants,
  applyPluginHooks,
  applyAfterRenderHooks,
  getActivePlugins,
  collectPluginVariants,
  collectPluginDefaultVariants,
} from "./plugins/utils";
export {
  useComponentPlugins,
  usePluginVariants,
  usePluginDefaultVariants,
  useApplyPlugins,
  useApplyAfterRenderHooks,
} from "./plugins/hooks";
export {
  gradientButtonPlugin,
  badgeSizePlugin,
  themeVariantPlugin,
  loadingStatePlugin,
  tooltipPlugin,
  statusBadgePlugin,
  characterCountPlugin,
  examplePlugins,
  registerExamplePlugins,
} from "./plugins/examples";
