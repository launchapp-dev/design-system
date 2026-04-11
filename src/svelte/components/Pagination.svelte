<script lang="ts">
import { cn } from "../utils/cn";

  let { modelValue = 1, total, perPage = 10, class: className, ...restProps }: {
  modelValue?: number;
  total: number;
  perPage?: number;
    class?: string;
    [key: string]: any;
  } = $props();




const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

let totalPages = $derived(Math.ceil(total / perPage));
let canPrev = $derived(modelValue > 1);
let canNext = $derived(modelValue < totalPages.value);

const pages = computed(() => {
  const current = modelValue;
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

let navClass = $derived(cn("flex items-center gap-1", className));
</script>

<nav aria-label="Pagination" class={navClass} {...restProps}>
    <button
      type="button"
      :disabled="!canPrev"
      class="inline-flex h-9 w-9 items-center justify-center rounded-[--la-radius] border border-[hsl(var(--la-border))] text-sm hover:bg-[hsl(var(--la-accent))] disabled:opacity-50"
      aria-label="Previous page"
      @click="go(modelValue - 1)"
    >
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
    <template v-for="page in pages" :key="page">
      <span v-if="page === -1" class="px-1 text-[hsl(var(--la-muted-foreground))]">…</span>
      <button
        v-else
        type="button"
        :aria-current="page === modelValue ? 'page' : undefined"
        :class="cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-[--la-radius] border text-sm',
          page === modelValue
            ? 'border-[hsl(var(--la-primary))] bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))]'
            : 'border-[hsl(var(--la-border))] hover:bg-[hsl(var(--la-accent))]'
        )"
        @click="go(page)"
      >
        {{ page }}
      </button>
