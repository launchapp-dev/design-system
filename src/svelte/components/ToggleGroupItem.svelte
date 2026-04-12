<script lang="ts">
import { cn } from "../utils/cn";

  let { value, disabled = false, class: className, children, ...restProps }: {
  value: string;
  disabled?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

const variantClasses: Record<string, string> = {
  default: "bg-transparent hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
};

const sizeClasses: Record<string, string> = {
  sm: "h-9 px-2.5",
  md: "h-10 px-3",
  lg: "h-11 px-5",
};

let classes = $derived(
  cn(
    "inline-flex items-center justify-center rounded-[--la-radius] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    className,
  ),
);
</script>

<button
    type="button"
    disabled={disabled}
    class={classes}
   {...restProps}>
    {@render children?.()}
  </button>