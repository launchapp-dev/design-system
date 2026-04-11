<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, size = "md", children, ...restProps }: {
    class?: string;
    size?: "sm" | "md" | "lg";
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  const sizeClasses: Record<string, string> = {
    sm: "h-24 w-24",
    md: "h-32 w-32",
    lg: "h-40 w-40",
  };

  let classes = $derived(cn("relative inline-flex items-center justify-center", className, size ? sizeClasses[size] : ""));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
