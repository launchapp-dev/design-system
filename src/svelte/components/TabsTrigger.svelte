<script lang="ts">
import { cn } from "../utils/cn";
import { useTabsContext } from "../composables/useTabs";

  let { value, disabled = false, class: className, children, ...restProps }: {
  value: string;
  disabled?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();




const { activeTab, setActiveTab } = useTabsContext();
let isActive = $derived(activeTab.value === value);

let classes = $derived(
cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    isActive.value
      ? "bg-background text-foreground shadow-sm"
      : "text-muted-foreground hover:bg-muted",
    className,
  ),
);
</script>

<button
    role="tab"
    :aria-selected="isActive"
    disabled={disabled}
    class={classes}
    @click="setActiveTab(value)"
   {...restProps}>
    {@render children?.()}
  </button>
