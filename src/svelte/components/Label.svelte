<script lang="ts">
import { cn } from "../utils/cn";

  let { for: htmlFor, class: className, children, ...restProps }: {
  for?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();

let classes = $derived(
cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className),
);
</script>

<label for={htmlFor} class={classes} {...restProps}>
    {@render children?.()}
  </label>