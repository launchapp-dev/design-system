<script lang="ts">
import { cn } from "../utils/cn";

  let { variant = "default", class: className, children, ...restProps }: {
  variant?: "default" | "secondary" | "destructive" | "outline";
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();




const variantClasses = {
  default: "border-transparent bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))]",
  secondary: "border-transparent bg-[hsl(var(--la-secondary))] text-[hsl(var(--la-secondary-foreground))]",
  destructive: "border-transparent bg-[hsl(var(--la-destructive))] text-[hsl(var(--la-destructive-foreground))]",
  outline: "text-[hsl(var(--la-foreground))]",
};

let classes = $derived(
cn(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))] focus:ring-offset-2",
    variantClasses[variant],
    className,
  ),
);
</script>

<div class={classes} {...restProps}>
    {@render children?.()}
  </div>
