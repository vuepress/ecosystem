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
  <span class="vpBadge" :class="type">
    <slot>{{ text }}</slot>
  </span>
</template>

<style>
.vpBadge {
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

.vpBadge.small {
  padding: 0 6px;
  line-height: 18px;
  font-size: 10px;
  transform: translateY(-8px);
}

.vpDocFooter .vpBadge {
  display: none;
}

.vp-doc h1 > .vpBadge {
  margin-top: 4px;
  vertical-align: top;
}

.vp-doc h2 > .vpBadge {
  margin-top: 3px;
  padding: 0 8px;
  vertical-align: top;
}

.vp-doc h3 > .vpBadge {
  vertical-align: middle;
}

.vp-doc h4 > .vpBadge,
.vp-doc h5 > .vpBadge,
.vp-doc h6 > .vpBadge {
  vertical-align: middle;
  line-height: 18px;
}

.vpBadge.info {
  border-color: var(--vp-badge-info-border);
  color: var(--vp-badge-info-text);
  background-color: var(--vp-badge-info-bg);
}

.vpBadge.tip {
  border-color: var(--vp-badge-tip-border);
  color: var(--vp-badge-tip-text);
  background-color: var(--vp-badge-tip-bg);
}

.vpBadge.warning {
  border-color: var(--vp-badge-warning-border);
  color: var(--vp-badge-warning-text);
  background-color: var(--vp-badge-warning-bg);
}

.vpBadge.danger {
  border-color: var(--vp-badge-danger-border);
  color: var(--vp-badge-danger-text);
  background-color: var(--vp-badge-danger-bg);
}
</style>
