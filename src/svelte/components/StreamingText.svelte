<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, size = "md", children, ...restProps }: {
    class?: string;
    size?: "sm" | "md" | "lg";
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  const sizeClasses: Record<string, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  let classes = $derived(cn("inline-block", className, size ? sizeClasses[size] : ""));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
