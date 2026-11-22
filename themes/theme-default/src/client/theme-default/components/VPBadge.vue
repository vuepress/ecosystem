<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
    type?:
      | 'info'
      | 'note'
      | 'tip'
      | 'important'
      | 'caution'
      | 'warning'
      | 'danger'
  }>(),
  {
    type: 'tip',
  },
)
</script>

<template>
  <span class="vp-badge" :class="type" dir="auto">
    <slot>{{ text }}</slot>
  </span>
</template>

<style>
.vp-badge {
  display: inline-block;

  margin-inline-start: 0.125rem;
  padding: 0 0.625rem;
  border: 1px solid transparent;
  border-radius: 0.75rem;

  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.8333333;
  white-space: nowrap;

  transform: translateY(-0.125rem);
}

.vp-badge.small {
  padding: 0 0.375rem;
  font-size: 0.625rem;
  line-height: 1.8;
  transform: translateY(-0.5rem);
}

.vp-doc-footer .vp-badge {
  display: none;
}

.vp-doc h1 > .vp-badge,
.vp-doc h2 > .vp-badge {
  vertical-align: middle;
  margin: 0;
  margin-inline-start: 0.125rem;
}

.vp-doc h2 > .vp-badge {
  padding: 0 0.5rem;
}

.vp-doc h3 > .vp-badge {
  vertical-align: middle;
}

.vp-doc h4 > .vp-badge,
.vp-doc h5 > .vp-badge,
.vp-doc h6 > .vp-badge {
  vertical-align: middle;
  line-height: 1.5;
}

.vp-badge.info {
  border-color: var(--vp-badge-info-border);
  background-color: var(--vp-badge-info-bg);
  color: var(--vp-badge-info-text);
}

.vp-badge.note {
  border-color: var(--vp-badge-note-border);
  background-color: var(--vp-badge-note-bg);
  color: var(--vp-badge-note-text);
}

.vp-badge.tip {
  border-color: var(--vp-badge-tip-border);
  background-color: var(--vp-badge-tip-bg);
  color: var(--vp-badge-tip-text);
}

.vp-badge.important {
  border-color: var(--vp-badge-important-border);
  background-color: var(--vp-badge-important-bg);
  color: var(--vp-badge-important-text);
}

.vp-badge.caution {
  border-color: var(--vp-badge-caution-border);
  background-color: var(--vp-badge-caution-bg);
  color: var(--vp-badge-caution-text);
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
