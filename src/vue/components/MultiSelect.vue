<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { cn } from "../utils/cn";

interface Option {
  label: string;
  value: string;
}

interface Props {
  modelValue?: string[];
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  max?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string[]];
}>();

const open = ref(false);
const containerRef = ref<HTMLElement | null>(null);

const selectedOptions = computed(() =>
  props.options.filter((o) => props.modelValue.includes(o.value)),
);

function toggle(value: string) {
  const current = props.modelValue;
  if (current.includes(value)) {
    emit("update:modelValue", current.filter((v) => v !== value));
  } else {
    if (props.max && current.length >= props.max) return;
    emit("update:modelValue", [...current, value]);
  }
}

function remove(value: string) {
  emit("update:modelValue", props.modelValue.filter((v) => v !== value));
}

function onClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    open.value = false;
  }
}

onMounted(() => document.addEventListener("mousedown", onClickOutside));
onUnmounted(() => document.removeEventListener("mousedown", onClickOutside));

const triggerClasses = computed(() =>
  cn(
    "flex min-h-10 w-full flex-wrap items-center gap-1 rounded-[--la-radius] border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] px-3 py-2 text-sm cursor-pointer",
    props.disabled && "cursor-not-allowed opacity-50",
    props.class,
  ),
);
</script>

<template>
  <div ref="containerRef" class="relative">
    <div :class="triggerClasses" @click="!disabled && (open = !open)">
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
      </template>
      <span v-else class="text-[hsl(var(--la-muted-foreground))]">{{ placeholder }}</span>
      <svg class="ml-auto h-4 w-4 shrink-0 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
    <div
      v-if="open"
      class="absolute z-50 mt-1 w-full overflow-hidden rounded-[--la-radius] border border-[hsl(var(--la-border))] bg-[hsl(var(--la-popover))] p-1 shadow-md"
    >
      <div
        v-for="opt in options"
        :key="opt.value"
        class="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]"
        @click="toggle(opt.value)"
      >
        <div
          class="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-[hsl(var(--la-primary))]"
          :class="modelValue.includes(opt.value) ? 'bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))]' : ''"
        >
          <svg v-if="modelValue.includes(opt.value)" class="h-3 w-3" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        {{ opt.label }}
      </div>
    </div>
  </div>
</template>
