<script setup lang="ts">
import type { VNode } from 'vue'

withDefaults(
  defineProps<{
    type?: string
    text?: string
    vertical?: string
  }>(),
  {
    type: 'tip',
    text: '',
    vertical: undefined,
  },
)

defineSlots<{
  default?: () => VNode | VNode | string | null
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
  font-size: 14px;
  font-weight: 600;
  height: 18px;
  line-height: 18px;
  border-radius: 3px;
  padding: 0 6px;
  color: var(--c-bg);
  vertical-align: top;
  transition:
    color var(--t-color),
    background-color var(--t-color);

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
