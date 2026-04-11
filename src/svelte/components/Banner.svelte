<script lang="ts">
import { cn } from "../utils/cn";

  let { variant = "default", dismissible = false, class: className, children, ...restProps }: {
  variant?: "default" | "info" | "success" | "warning" | "destructive";
  dismissible?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();




const emit = defineEmits<{
  dismiss: [];
}>();

const variantClasses = {
  default: "bg-[hsl(var(--la-muted))] text-[hsl(var(--la-foreground))]",
  info: "bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-300",
  success: "bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-300",
  warning: "bg-yellow-50 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-300",
  destructive: "bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-300",
};

let classes = $derived(
cn(
    "relative flex items-center justify-between gap-4 rounded-[--la-radius] p-4 text-sm",
    variantClasses[variant],
    className,
  ),
);
</script>

<div class={classes} role="status" {...restProps}>
    <div class="flex items-center gap-2">
      {@render children?.()}
    </div>
    <button
      v-if="dismissible"
      type="button"
      class="ml-auto shrink-0 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))]"
      aria-label="Dismiss"
      @click="emit('dismiss')"
    >
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  </div>
