<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { cn } from "../utils/cn";

interface Option {
  label: string;
  value: string;
}

  let { modelValue, options, placeholder, disabled = false, max, class: className, ...restProps }: {
  modelValue?: string[];
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  max?: number;
    class?: string;
    [key: string]: any;
  } = $props();




const emit = defineEmits<{
  "update:modelValue": [value: string[]];
}>();

const open = ref(false);
const containerRef = ref<HTMLElement | null>(null);

let selectedOptions = $derived(
options.filter((o) => modelValue.includes(o.value)),
);

function toggle(value: string) {
  const current = modelValue;
  if (current.includes(value)) {
    emit("update:modelValue", current.filter((v) => v !== value));
  } else {
    if (max && current.length >= max) return;
    emit("update:modelValue", [...current, value]);
  }
}

function remove(value: string) {
  emit("update:modelValue", modelValue.filter((v) => v !== value));
}

function onClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    open.value = false;
  }
}

onMounted(() => document.addEventListener("mousedown", onClickOutside));
onUnmounted(() => document.removeEventListener("mousedown", onClickOutside));

let triggerClasses = $derived(
cn(
    "flex min-h-10 w-full flex-wrap items-center gap-1 rounded-[--la-radius] border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] px-3 py-2 text-sm cursor-pointer",
    disabled && "cursor-not-allowed opacity-50",
    className,
  ),
);
</script>

<div ref="containerRef" class="relative" {...restProps}>
    <div class={triggerClasses} @click="!disabled && (open = !open)">
      <template v-if="selectedOptions.length">
        <span
          v-for="opt in selectedOptions"
          :key="opt.value"
          class="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--la-secondary))] px-2 py-0.5 text-xs text-[hsl(var(--la-secondary-foreground))]"
        >
          {{ opt.label }}
          <button
            type="button"
            class="ml-0.5 focus:outline-none"
            @click.stop="remove(opt.value)"
          >
            <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </span>
