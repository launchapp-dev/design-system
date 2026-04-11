<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, variant = "assistant", children, ...restProps }: {
    class?: string;
    variant?: "user" | "assistant" | "system";
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

  const variantClasses: Record<string, string> = {
    user: "flex-row-reverse",
    assistant: "flex-row",
    system: "flex-row justify-center",
  };

  let classes = $derived(cn("flex gap-3", className, variant ? variantClasses[variant] : ""));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
