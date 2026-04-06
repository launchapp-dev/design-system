import { cn } from "./utils";

export const touchTargetSize = "min-h-[44px] min-w-[44px]";

export const responsiveContainer = cn(
  "w-full overflow-x-auto",
  "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
);

export const hideScrollbar = cn(
  "scrollbar-none",
  "[-ms-overflow-style:'none']",
  "[scrollbar-width:'none']",
  "[&::-webkit-scrollbar]:hidden",
);

export const safeAreaInsets = {
  top: "pt-[env(safe-area-inset-top)]",
  bottom: "pb-[env(safe-area-inset-bottom)]",
  left: "pl-[env(safe-area-inset-left)]",
  right: "pr-[env(safe-area-inset-right)]",
  all: cn(
    "pt-[env(safe-area-inset-top)]",
    "pb-[env(safe-area-inset-bottom)]",
    "pl-[env(safe-area-inset-left)]",
    "pr-[env(safe-area-inset-right)]",
  ),
};

export const mobileBreakpoint = "md";
export const tabletBreakpoint = "lg";

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;
