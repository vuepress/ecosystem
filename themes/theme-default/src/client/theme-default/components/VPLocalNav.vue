<script lang="ts" setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'

import { useLayout } from '../composables/useLayout.js'
import type { ThemeConfig } from '../shared.js'
import VPLocalNavOutlineDropdown from './VPLocalNavOutlineDropdown.vue'

defineProps<{
  open: boolean
}>()

defineEmits<{
  (e: 'open-menu'): void
}>()

const theme = useThemeLocaleData<ThemeConfig>()
const { isHome, hasSidebar, headers, hasLocalNav } = useLayout()
const { y } = useWindowScroll()

const navHeight = ref(0)

onMounted(() => {
  // getComputedStyle returns custom properties as their raw token ("4rem"),
  // so resolve the height by measuring instead of parsing
  const probe = document.createElement('div')
  probe.style.cssText =
    'position: absolute; visibility: hidden; height: var(--vp-nav-height)'
  document.body.appendChild(probe)
  navHeight.value = probe.offsetHeight
  probe.remove()
})

const isScrolled = computed(() => y.value >= navHeight.value)
</script>

<template>
  <div
    v-if="!isHome && (hasLocalNav || hasSidebar || isScrolled)"
    class="vp-local-nav"
    :class="{
      'has-sidebar': hasSidebar,
      'empty': !hasLocalNav,
      'fixed': !hasLocalNav && !hasSidebar,
    }"
  >
    <div class="container">
      <button
        v-if="hasSidebar"
        type="button"
        class="menu"
        :aria-expanded="open"
        aria-controls="vp-sidebar-nav"
        @click="$emit('open-menu')"
      >
        <span class="vpi-text-align-start menu-icon" aria-hidden="true"></span>
        <span class="menu-text">
          {{ theme.sidebarMenuLabel || 'Menu' }}
        </span>
      </button>

      <VPLocalNavOutlineDropdown :headers :navHeight />
    </div>
  </div>
</template>

<style scoped>
.vp-local-nav {
  position: sticky;
  inset-inline-start: 0;
  top: 0;
  z-index: var(--vp-z-index-local-nav);

  width: 100%;
  padding-top: var(--vp-layout-top-height, 0);
  border-bottom: 1px solid var(--vp-local-nav-divider-color);
}

/* the background surface — below 60rem it covers just this bar; from 60rem
   the bar is pinned under the fixed navbar, so the surface extends up
   behind it and one element carries the backdrop filter for both bars
   (two stacked filters would show a seam at their shared edge) */
.vp-local-nav::before {
  content: '';

  position: absolute;
  inset: 0;
  z-index: -1;

  background-color: var(--vp-local-nav-bg-color);

  backdrop-filter: var(--vp-nav-backdrop-filter);

  transition: background-color 0.25s;
}

.vp-local-nav.fixed {
  position: fixed;
}

@media (min-width: 60rem) {
  .vp-local-nav {
    top: var(--vp-nav-height);
  }

  .vp-local-nav::before {
    top: calc(-1 * var(--vp-nav-height));
  }

  .vp-local-nav.has-sidebar {
    padding-inline-start: var(--vp-sidebar-width);
  }

  .vp-local-nav.empty {
    display: none;
  }
}

@media (min-width: 80rem) {
  .vp-local-nav {
    display: none;
  }
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu {
  display: flex;
  align-items: center;

  color: var(--vp-c-text-mute);

  font-weight: 500;
  font-size: 0.75rem;
  line-height: 2;

  transition: color 0.5s;
}

.menu:hover {
  color: var(--vp-c-text);
  transition: color 0.25s;
}

@media (min-width: 60rem) {
  .menu {
    display: none;
  }
}

.menu-icon {
  margin-inline-end: 0.5rem;
  font-size: 0.875rem;
}

.menu,
:deep(.vp-local-nav-outline-dropdown > button) {
  padding: 0.75rem 1.5rem 0.6875rem;
}

@media (min-width: 48rem) {
  .menu,
  :deep(.vp-local-nav-outline-dropdown > button) {
    padding: 0.75rem 2rem 0.6875rem;
  }
}
</style>
