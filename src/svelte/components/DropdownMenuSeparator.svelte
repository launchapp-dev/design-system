<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, ...restProps }: {

    class?: string;
    [key: string]: any;
  } = $props();



let classes = $derived(cn("-mx-1 my-1 h-px bg-muted", className));
</script>

<div role="separator" class={classes} / {...restProps}>
