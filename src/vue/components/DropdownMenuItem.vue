<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../utils/cn";
import { useDropdownMenuContext } from "../composables/useDropdownMenu";

interface Props {
  disabled?: boolean;
  inset?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  inset: false,
});

const emit = defineEmits<{
  select: [];
}>();

const { close } = useDropdownMenuContext();

const classes = computed(() =>
  cn(
    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-[hsl(var(--la-accent))] focus:text-[hsl(var(--la-accent-foreground))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
    props.disabled && "pointer-events-none opacity-50",
    props.inset && "pl-8",
    props.class,
  ),
);

function handleClick() {
  if (!props.disabled) {
    emit("select");
    close();
  }
}
</script>

<template>
  <div
    role="menuitem"
    :class="classes"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
