<script lang="ts" setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { useTemplateRef, watchEffect } from 'vue'

import { useNav } from '../composables/nav.js'
import type { DefaultTheme } from '../shared.js'

defineProps<{
  active: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()

const theme = useThemeLocaleData<DefaultTheme.Config>()

// register as the screen's trigger so Escape can return focus here
const el = useTemplateRef('el')
const { screenTriggerEl } = useNav()

watchEffect(() => {
  screenTriggerEl.value = el.value
})
</script>

<template>
  <button
    ref="el"
    type="button"
    class="vp-navbar-hamburger"
    :class="{ active }"
    :aria-label="theme.mobileMenuLabel || 'Menu'"
    :aria-expanded="active"
    @click="$emit('click')"
  >
    <span class="container" aria-hidden="true">
      <span class="top" />
      <span class="middle" />
      <span class="bottom" />
    </span>
  </button>
</template>

<style scoped>
.vp-navbar-hamburger {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 3rem;
  height: var(--vp-nav-height);
}

@media (min-width: 48rem) {
  .vp-navbar-hamburger {
    display: none;
  }
}

.container {
  position: relative;

  overflow: hidden;

  width: 1rem;
  height: 0.875rem;

  scale: var(--vp-direction-multiplier) 1;
}

.vp-navbar-hamburger:hover .top {
  top: 0;
  transform: translateX(0.25rem);
}

.vp-navbar-hamburger:hover .middle {
  top: 0.375rem;
  transform: translateX(0);
}

.vp-navbar-hamburger:hover .bottom {
  top: 0.75rem;
  transform: translateX(0.5rem);
}

.vp-navbar-hamburger.active .top {
  top: 0.375rem;
  transform: translateX(0) rotate(225deg);
}

.vp-navbar-hamburger.active .middle {
  top: 0.375rem;
  transform: translateX(1rem);
}

.vp-navbar-hamburger.active .bottom {
  top: 0.375rem;
  transform: translateX(0) rotate(135deg);
}

.vp-navbar-hamburger.active:hover .top,
.vp-navbar-hamburger.active:hover .middle,
.vp-navbar-hamburger.active:hover .bottom {
  background-color: var(--vp-c-text-2);
  transition:
    top 0.25s,
    background-color 0.25s,
    transform 0.25s;
}

.top,
.middle,
.bottom {
  position: absolute;
  inset-inline-start: 0;

  width: 1rem;
  height: 0.125rem;

  background-color: var(--vp-c-text-1);

  transition:
    top 0.25s,
    background-color 0.5s,
    transform 0.25s;
}

.top {
  top: 0;
  transform: translateX(0);
}

.middle {
  top: 0.375rem;
  transform: translateX(0.5rem);
}

.bottom {
  top: 0.75rem;
  transform: translateX(0.25rem);
}
</style>
