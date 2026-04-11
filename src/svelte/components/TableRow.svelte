<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(
cn(
    "border-b border-[hsl(var(--la-border))] transition-colors hover:bg-[hsl(var(--la-muted)/0.5)] data-[state=selected]:bg-[hsl(var(--la-muted))]",
    className,
  ),
);
</script>

<tr class={classes} {...restProps}>
    {@render children?.()}
  </tr>
