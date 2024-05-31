<script setup lang="ts">
interface Props {
  text?: string
  type?: 'info' | 'tip' | 'warning' | 'danger'
}
withDefaults(defineProps<Props>(), {
  type: 'tip',
  text: '',
})
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
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 0 10px;
  line-height: 22px;
  font-size: 12px;
  font-weight: 500;
  transform: translateY(-2px);
}

.vp-badge.small {
  padding: 0 6px;
  line-height: 18px;
  font-size: 10px;
  transform: translateY(-8px);
}

.vp-doc-footer .vp-badge {
  display: none;
}

.vp-doc h1 > .vp-badge {
  margin-top: 4px;
  vertical-align: top;
}

.vp-doc h2 > .vp-badge {
  margin-top: 3px;
  padding: 0 8px;
  vertical-align: top;
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
  color: var(--vp-badge-info-text);
  background-color: var(--vp-badge-info-bg);
}

.vp-badge.tip {
  border-color: var(--vp-badge-tip-border);
  color: var(--vp-badge-tip-text);
  background-color: var(--vp-badge-tip-bg);
}

.vp-badge.warning {
  border-color: var(--vp-badge-warning-border);
  color: var(--vp-badge-warning-text);
  background-color: var(--vp-badge-warning-bg);
}

.vp-badge.danger {
  border-color: var(--vp-badge-danger-border);
  color: var(--vp-badge-danger-text);
  background-color: var(--vp-badge-danger-bg);
}
</style>
