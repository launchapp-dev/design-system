<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  variant?: "default" | "info" | "success" | "warning" | "destructive";
  dismissible?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  dismissible: false,
});

const emit = defineEmits<{
  dismiss: [];
}>();

const variantClasses = {
  default: "bg-muted text-foreground",
  info: "bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-300",
  success: "bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-300",
  warning: "bg-yellow-50 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-300",
  destructive: "bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-300",
};

const classes = computed(() =>
  cn(
    "relative flex items-center justify-between gap-4 rounded-[--la-radius] p-4 text-sm",
    variantClasses[props.variant],
    props.class,
  ),
);
</script>

<template>
  <div :class="classes" role="status">
    <div class="flex items-center gap-2">
      <slot />
    </div>
    <button
      v-if="dismissible"
      type="button"
      class="ml-auto shrink-0 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
      aria-label="Dismiss"
      @click="emit('dismiss')"
    >
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
