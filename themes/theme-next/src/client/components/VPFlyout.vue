<script setup lang="ts">
import VPMenu from '@theme/VPMenu.vue'
import { ref } from 'vue'
import { useFlyout } from '../composables/flyout.js'

defineProps<{
  icon?: string
  button?: string
  label?: string
  items?: any[]
}>()

const open = ref(false)
const el = ref<HTMLElement>()

useFlyout({ el, onBlur })

function onBlur(): void {
  open.value = false
}
</script>

<template>
  <div
    ref="el"
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
        <span v-if="icon" :class="[icon, 'option-icon']" />
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
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}

.vp-feature:hover .text {
  color: var(--vp-c-text-2);
}

.vp-feature:hover .icon {
  fill: var(--vp-c-text-2);
}

.vp-feature.active .text {
  color: var(--vp-c-brand-1);
}

.vp-feature.active:hover .text {
  color: var(--vp-c-brand-2);
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
  color: var(--vp-c-text-1);
  transition: color 0.5s;
}

.text {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.option-icon {
  margin-right: 0px;
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
