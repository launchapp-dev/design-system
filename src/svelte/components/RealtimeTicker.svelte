<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, size = "md", variant = "default", children, ...restProps }: {
    class?: string;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "compact" | "expanded";
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  const sizeClasses: Record<string, string> = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };
  const variantClasses: Record<string, string> = {
    default: "",
    compact: "px-2 py-1",
    expanded: "p-4",
  };

  let classes = $derived(cn("flex items-center gap-2 rounded-[--la-radius] border border-border bg-card px-3 py-2", className, size ? sizeClasses[size] : "", variant ? variantClasses[variant] : ""));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
