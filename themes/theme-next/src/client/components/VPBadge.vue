<script setup lang="ts">
import type { Slot } from '../types.js'

const { type = 'tip', text = '' } = defineProps<{
  /**
   * Badge text
   */
  text?: string
  /**
   * Badge type
   */
  type?: 'danger' | 'info' | 'tip' | 'warning'
}>()

defineSlots<{ default?: Slot }>()
</script>

<template>
  <span class="vp-badge" :class="type">
    <slot>{{ text }}</slot>
  </span>
</template>

<style>
.vp-badge {
  display: inline-block;

  margin-left: 2px;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 12px;

  font-weight: 500;
  font-size: 12px;
  line-height: 22px;

  transform: translateY(-2px);
}

.vp-badge.small {
  padding: 0 6px;
  font-size: 10px;
  line-height: 18px;
  transform: translateY(-8px);
}

.vp-doc-footer .vp-badge {
  display: none;
}

.vp-doc h1 > .vp-badge {
  vertical-align: top;
  margin-top: 4px;
}

.vp-doc h2 > .vp-badge {
  vertical-align: top;
  margin-top: 3px;
  padding: 0 8px;
}

.vp-doc h3 > .vp-badge {
  vertical-align: middle;
}

.vp-doc h4 > .vp-badge,
.vp-doc h5 > .vp-badge,
.vp-doc h6 > .vp-badge {
  vertical-align: middle;
  line-height: 18px;
}

.vp-badge.info {
  border-color: var(--vp-badge-info-border);
  background-color: var(--vp-badge-info-bg);
  color: var(--vp-badge-info-text);
}

.vp-badge.tip {
  border-color: var(--vp-badge-tip-border);
  background-color: var(--vp-badge-tip-bg);
  color: var(--vp-badge-tip-text);
}

.vp-badge.warning {
  border-color: var(--vp-badge-warning-border);
  background-color: var(--vp-badge-warning-bg);
  color: var(--vp-badge-warning-text);
}

.vp-badge.danger {
  border-color: var(--vp-badge-danger-border);
  background-color: var(--vp-badge-danger-bg);
  color: var(--vp-badge-danger-text);
}
</style>
