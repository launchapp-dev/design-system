<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() => cn("[&>svg]:size-3.5", props.class));
</script>

<template>
  <li role="presentation" aria-hidden="true" :class="classes">
    <slot>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </slot>
  </li>
</template>
