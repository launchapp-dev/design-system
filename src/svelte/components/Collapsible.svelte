<script lang="ts">
import { ref, watch } from "vue";
import { provideCollapsibleContext } from "../composables/useCollapsible";

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

const open = ref(modelValue ?? defaultOpen);

watch(
  () => modelValue,
  (v) => {
    if (v !== undefined) open.value = v;
  },
);

function toggle() {
  open.value = !open.value;
  emit("update:modelValue", open.value);
}

provideCollapsibleContext({ open, toggle });
</script>

<div {...restProps}>
    {@render children?.()}
  </div>
