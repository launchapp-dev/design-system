<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(
cn(
    "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
    className,
  ),
);
</script>

<tr class={classes} {...restProps}>
    {@render children?.()}
  </tr>
