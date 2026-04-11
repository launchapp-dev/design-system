<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, ...restProps }: {

    class?: string;
    [key: string]: any;
  } = $props();



let classes = $derived(cn("[&>svg]:size-3.5", className));
</script>

<li role="presentation" aria-hidden="true" class={classes} {...restProps}>
    <slot>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </slot>
  </li>
