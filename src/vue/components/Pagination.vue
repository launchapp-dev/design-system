<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  modelValue?: number;
  total: number;
  perPage?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  perPage: 10,
});

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const totalPages = computed(() => Math.ceil(props.total / props.perPage));
const canPrev = computed(() => props.modelValue > 1);
const canNext = computed(() => props.modelValue < totalPages.value);

const pages = computed(() => {
  const current = props.modelValue;
  const total = totalPages.value;
  const delta = 2;
  const range: number[] = [];
  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i);
  }
  if (current - delta > 2) range.unshift(-1);
  if (current + delta < total - 1) range.push(-1);
  if (total > 1) {
    range.unshift(1);
    range.push(total);
  }
  return range;
});

function go(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    emit("update:modelValue", page);
  }
}

const navClass = computed(() => cn("flex items-center gap-1", props.class));
</script>

<template>
  <nav aria-label="Pagination" :class="navClass">
    <button
      type="button"
      :disabled="!canPrev"
      class="inline-flex h-9 w-9 items-center justify-center rounded-[--la-radius] border border-border text-sm hover:bg-accent disabled:opacity-50"
      aria-label="Previous page"
      @click="go(modelValue - 1)"
    >
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
    <template v-for="page in pages" :key="page">
      <span v-if="page === -1" class="px-1 text-muted-foreground">…</span>
      <button
        v-else
        type="button"
        :aria-current="page === modelValue ? 'page' : undefined"
        :class="cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-[--la-radius] border text-sm',
          page === modelValue
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-border hover:bg-accent'
        )"
        @click="go(page)"
      >
        {{ page }}
      </button>
    </template>
    <button
      type="button"
      :disabled="!canNext"
      class="inline-flex h-9 w-9 items-center justify-center rounded-[--la-radius] border border-border text-sm hover:bg-accent disabled:opacity-50"
      aria-label="Next page"
      @click="go(modelValue + 1)"
    >
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  </nav>
</template>
