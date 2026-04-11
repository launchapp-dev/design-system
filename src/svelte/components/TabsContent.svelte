<script lang="ts">
import { cn } from "../utils/cn";
import { useTabsContext } from "../composables/useTabs";

  let { value, class: className, children, ...restProps }: {
  value: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



const { activeTab } = useTabsContext();
let isActive = $derived(activeTab.value === value);
let classes = $derived(
cn("mt-2 ring-offset-[hsl(var(--la-background))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2", className),
);
</script>

<div
    v-if="isActive"
    role="tabpanel"
    class={classes}
   {...restProps}>
    {@render children?.()}
  </div>
