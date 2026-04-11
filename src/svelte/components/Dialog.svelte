<script lang="ts">
import { ref, watch } from "vue";
import { provideDialogContext } from "../composables/useDisclosure";

  let { modelValue, defaultOpen = false, class: className, children, ...restProps }: {
  modelValue?: boolean;
  defaultOpen?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();




const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const internalOpen = ref(modelValue ?? defaultOpen);

watch(
  () => modelValue,
  (v) => {
    if (v !== undefined) internalOpen.value = v;
  },
);

function close() {
  internalOpen.value = false;
  emit("update:modelValue", false);
}

provideDialogContext(internalOpen, close);
</script>

{@render children?.()}
