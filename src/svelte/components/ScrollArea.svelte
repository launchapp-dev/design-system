<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(cn("relative overflow-hidden", className));
</script>

<div class={classes} {...restProps}>
    <div class="h-full w-full overflow-auto">
      {@render children?.()}
    </div>
  </div>
