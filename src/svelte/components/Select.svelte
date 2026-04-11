<script lang="ts">
import { ref, watch } from "vue";
import { provideSelectContext } from "../composables/useSelect";

  let { modelValue, defaultValue = "", disabled = false, class: className, children, ...restProps }: {
  modelValue?: string;
  defaultValue?: string;
  disabled?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();




const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const open = ref(false);
const value = ref(modelValue ?? defaultValue);
const containerRef = ref<HTMLElement | null>(null);

watch(
  () => modelValue,
  (v) => {
    if (v !== undefined) value.value = v;
  },
);

function select(v: string) {
  value.value = v;
  open.value = false;
  emit("update:modelValue", v);
}

function close() {
  open.value = false;
}

function toggle() {
  if (!disabled) open.value = !open.value;
}

provideSelectContext({ open, value, containerRef, select, close, toggle });
</script>

<div ref="containerRef" class="relative" {...restProps}>
    {@render children?.()}
  </div>
