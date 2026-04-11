<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, action = "customized", children, ...restProps }: {
    class?: string;
    action?: "accepted_all" | "rejected_all" | "customized" | "withdrawn";
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  const actionClasses: Record<string, string> = {
    accepted_all: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    rejected_all: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    customized: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    withdrawn: "bg-[hsl(var(--la-muted))] text-[hsl(var(--la-muted-foreground))]",
  };

  let classes = $derived(cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", className, action ? actionClasses[action] : ""));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
