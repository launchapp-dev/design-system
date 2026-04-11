<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, size = "md", children, ...restProps }: {
    class?: string;
    size?: "sm" | "md" | "lg";
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  const sizeClasses: Record<string, string> = {
    sm: "min-h-[52px]",
    md: "min-h-[64px]",
    lg: "min-h-[76px]",
  };

  let classes = $derived(cn("flex items-end justify-center gap-1 px-3 py-2 rounded-2xl bg-[hsl(var(--la-background)/0.8)] backdrop-blur-xl border border-[hsl(var(--la-border)/0.2)] shadow-lg", className, size ? sizeClasses[size] : ""));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
