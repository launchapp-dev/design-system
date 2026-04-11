<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, variant = "info", position = "inline", children, ...restProps }: {
    class?: string;
    variant?: "info" | "warning" | "error" | "success";
    position?: "inline" | "stickyTop" | "stickyBottom";
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  const variantClasses: Record<string, string> = {
    info: "bg-blue-500/15 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
    warning: "bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
    error: "bg-red-500/15 text-red-700 dark:bg-red-500/20 dark:text-red-300 [&>svg]:text-red-600 dark:[&>svg]:text-red-400",
    success: "bg-green-500/15 text-green-700 dark:bg-green-500/20 dark:text-green-300 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
  };
  const positionClasses: Record<string, string> = {
    inline: "rounded-lg",
    stickyTop: "sticky top-0 z-50 border-b border-inherit",
    stickyBottom: "sticky bottom-0 z-50 border-t border-inherit",
  };

  let classes = $derived(cn("relative flex w-full items-center justify-between gap-3 px-4 py-3 text-sm [&>svg]:shrink-0", className, variant ? variantClasses[variant] : "", position ? positionClasses[position] : ""));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
