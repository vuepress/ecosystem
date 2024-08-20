<script setup lang="ts">
import type { VNode } from 'vue'

withDefaults(
  defineProps<{
    /**
     * The type of the badge
     */
    type?: string
    /**
     * The text of the badge
     */
    text?: string
    /**
     * The vertical align of the badge
     */
    vertical?: string
  }>(),
  {
    type: 'tip',
    text: '',
    vertical: undefined,
  },
)

defineSlots<{
  default?: () => VNode | VNode[] | string | null
}>()
</script>

<template>
  <span
    class="vp-badge"
    :class="type"
    :style="{
      verticalAlign: vertical,
    }"
  >
    <slot>{{ text }}</slot>
  </span>
</template>

<style lang="scss">
.vp-badge {
  display: inline-block;
  vertical-align: top;

  height: 18px;
  padding: 0 6px;
  border-radius: 3px;

  color: var(--vp-c-accent-text);

  font-weight: 600;
  font-size: 14px;
  line-height: 18px;

  transition:
    color var(--vp-t-color),
    background-color var(--vp-t-color);

  &.tip {
    background-color: var(--c-badge-tip);
  }

  &.warning {
    background-color: var(--c-badge-warning);
    color: var(--c-badge-warning-text);
  }

  &.danger {
    background-color: var(--c-badge-danger);
    color: var(--c-badge-danger-text);
  }

  // update the vertical align for the badge in toc
  .table-of-contents & {
    vertical-align: middle;
  }

  // avoid extra space between badges
  & + & {
    margin-left: 5px;
  }
}
</style>
