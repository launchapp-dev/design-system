<script lang="ts">
import { cn } from "../utils/cn";
import { useDropdownMenuContext } from "../composables/useDropdownMenu";

  let { disabled = false, inset = false, class: className, children, ...restProps }: {
  disabled?: boolean;
  inset?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();




const emit = defineEmits<{
  select: [];
}>();

const { close } = useDropdownMenuContext();

let classes = $derived(
cn(
    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-[hsl(var(--la-accent))] focus:text-[hsl(var(--la-accent-foreground))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
    disabled && "pointer-events-none opacity-50",
    inset && "pl-8",
    className,
  ),
);

function handleClick() {
  if (!disabled) {
    emit("select");
    close();
  }
}
</script>

<div
    role="menuitem"
    class={classes}
    @click="handleClick"
   {...restProps}>
    {@render children?.()}
  </div>
