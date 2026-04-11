<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(cn("w-full caption-bottom text-sm", className));
</script>

<div class="relative w-full overflow-auto" {...restProps}>
    <table class={classes}>
      {@render children?.()}
    </table>
  </div>
