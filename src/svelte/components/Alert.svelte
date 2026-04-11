<script lang="ts">
import { cn } from "../utils/cn";

  let { variant = "default", class: className, children, ...restProps }: {
  variant?: "default" | "destructive";
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();




const variantClasses = {
  default: "bg-[hsl(var(--la-background))] text-[hsl(var(--la-foreground))]",
  destructive: "border-[hsl(var(--la-destructive)/0.5)] text-[hsl(var(--la-destructive))] [&>svg]:text-[hsl(var(--la-destructive))]",
};

let classes = $derived(
cn(
    "relative w-full rounded-[--la-radius] border border-[hsl(var(--la-border))] p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",
    variantClasses[variant],
    className,
  ),
);
</script>

<div role="alert" class={classes} {...restProps}>
    {@render children?.()}
  </div>
