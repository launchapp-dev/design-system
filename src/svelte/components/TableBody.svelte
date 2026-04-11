<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(cn("[&_tr:last-child]:border-0", className));
</script>

<tbody class={classes} {...restProps}>
    {@render children?.()}
  </tbody>
