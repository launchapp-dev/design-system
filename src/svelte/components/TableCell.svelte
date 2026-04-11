<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(
cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
);
</script>

<td class={classes} {...restProps}>
    {@render children?.()}
  </td>
