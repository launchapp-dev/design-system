import { inject, provide, ref, type Ref } from "vue";

interface DisclosureContext {
  open: Ref<boolean>;
  toggle: () => void;
  close: () => void;
  onOpen: () => void;
}

export function useDisclosure(defaultOpen = false) {
  const open = ref(defaultOpen);
  function toggle() {
    open.value = !open.value;
  }
  function close() {
    open.value = false;
  }
  function onOpen() {
    open.value = true;
  }
  return { open, toggle, close, onOpen };
}

const DIALOG_KEY = Symbol("dialog");

export function provideDialogContext(open: Ref<boolean>, close: () => void) {
  provide<DisclosureContext>(DIALOG_KEY, {
    open,
    toggle: () => {
      open.value = !open.value;
    },
    close,
    onOpen: () => {
      open.value = true;
    },
  });
}

export function useDialogContext(): DisclosureContext {
  const ctx = inject<DisclosureContext>(DIALOG_KEY);
  if (!ctx) throw new Error("Dialog components must be used within <LaDialog>");
  return ctx;
}
