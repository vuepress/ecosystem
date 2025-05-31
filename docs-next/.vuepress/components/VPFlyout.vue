<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import VPMenu from '@theme/VPMenu.vue'
import { useFlyout } from '@theme/flyout'
import type { Slot } from '@vuepress/theme-default/client'
import { ref, useTemplateRef } from 'vue'

const {
  icon = '',
  button = undefined,
  label = undefined,
  items = undefined,
  prefixIcon = undefined,
} = defineProps<{
  /**
   * Flyout prefix icon
   */
  prefixIcon?: string
  /**
   * Flyout icon
   */
  icon?: string
  /**
   * Flyout button
   */
  button?: string
  /**
   * Flyout label
   */
  label?: string

  /**
   * Flyout items
   */
  items?: any[]
}>()

defineSlots<{ default?: Slot; before?: Slot }>()

const open = ref(false)
const el = useTemplateRef<HTMLDivElement>('feature')

const onBlur = (): void => {
  open.value = false
}

useFlyout({ el, onBlur })
</script>

<template>
  <div
    ref="feature"
    class="vp-feature"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <button
      type="button"
      class="button"
      aria-haspopup="true"
      :aria-expanded="open"
      :aria-label="label"
      @click="open = !open"
    >
      <span v-if="button || icon" class="text">
        <VPIcon v-if="prefixIcon" :icon="prefixIcon" class="prefix-icon" />
        <span v-if="icon" class="option-icon" :class="[icon]" />
        <span v-if="button" v-html="button"></span>
        <span class="vpi-chevron-down text-icon" />
      </span>

      <span v-else class="vpi-more-horizontal icon" />
    </button>

    <div class="menu">
      <VPMenu :items="items">
        <slot />
      </VPMenu>
    </div>
  </div>
</template>

<style scoped>
.vp-feature {
  position: relative;
}

.vp-feature:hover {
  color: var(--vp-c-accent);
  transition: color 0.25s;
}

.vp-feature:hover .text {
  color: var(--vp-c-text-mute);
}

.vp-feature:hover .icon {
  fill: var(--vp-c-text-mute);
}

.vp-feature.active .text {
  color: var(--vp-c-accent);
}

.vp-feature.active:hover .text {
  color: var(--vp-c-accent-hover);
}

.vp-feature:hover .menu,
.button[aria-expanded='true'] + .menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.button[aria-expanded='false'] + .menu {
  opacity: 0;
  visibility: hidden;
  transform: translateY(0);
}

.button {
  display: flex;
  align-items: center;

  padding: 8px 12px;

  color: var(--vp-c-text);

  transition: color 0.5s;
}

.prefix-icon {
  margin-inline-end: 0.25em;
}

.text {
  display: flex;
  align-items: center;

  color: var(--vp-c-text);

  font-weight: 500;
  font-size: 14px;

  transition: color 0.25s;
}

.option-icon {
  margin-right: 0;
  font-size: 16px;
}

.text-icon {
  margin-left: 4px;
  font-size: 14px;
}

.icon {
  font-size: 20px;
  transition: fill 0.25s;
}

.menu {
  position: absolute;
  top: 100%;
  right: 0;

  opacity: 0;
  visibility: hidden;

  transition:
    opacity 0.25s,
    visibility 0.25s,
    transform 0.25s;
}
</style>
