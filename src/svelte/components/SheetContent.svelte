<script lang="ts">
import { cn } from "../utils/cn";
import { useDialogContext } from "../composables/useDisclosure";

  let { side = "right", class: className, children, ...restProps }: {
  side?: "top" | "right" | "bottom" | "left";
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();




const { open, close } = useDialogContext();

const sideClasses = {
  top: "inset-x-0 top-0 border-b",
  right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
  bottom: "inset-x-0 bottom-0 border-t",
  left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
};

let contentClasses = $derived(
cn(
    "fixed z-50 gap-4 bg-[hsl(var(--la-background))] p-6 shadow-lg transition ease-in-out",
    sideClasses[side],
    className,
  ),
);
</script>

<Teleport to="body" {...restProps}>
    <div v-if="open">
      <div
        class="fixed inset-0 z-50 bg-black/80"
        @click="close"
      />
      <div
        role="dialog"
        aria-modal="true"
        class={contentClasses}
      >
        {@render children?.()}
      </div>
    </div>
  </Teleport>
