<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, variant = "default", size = "md", children, ...restProps }: {
    class?: string;
    variant?: "default" | "filled" | "outline";
    size?: "sm" | "md" | "lg";
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  const variantClasses: Record<string, string> = {
    default: "border-input",
    filled: "border-transparent bg-muted",
    outline: "border-border",
  };
  const sizeClasses: Record<string, string> = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  let classes = $derived(cn("flex flex-col w-full rounded-lg border bg-background transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2", className, variant ? variantClasses[variant] : "", size ? sizeClasses[size] : ""));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
