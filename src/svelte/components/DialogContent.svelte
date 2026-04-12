<script lang="ts">
import { cn } from "../utils/cn";
import { useDialogContext } from "../composables/useDisclosure";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



const { open, close } = useDialogContext();

const overlayClasses = "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

let contentClasses = $derived(
cn(
    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-[--la-radius]",
    className,
  ),
);

function onOverlayClick() {
  close();
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}
</script>

<Teleport to="body" {...restProps}>
    <div v-if="open">
      <div class={overlayClasses} @click="onOverlayClick" />
      <div
        role="dialog"
        aria-modal="true"
        class={contentClasses}
        @keydown="onKeydown"
      >
        {@render children?.()}
      </div>
    </div>
  </Teleport>
