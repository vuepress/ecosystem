<script setup lang="ts">
import VPSidebarItem from '@theme/VPSidebarItem.vue'
import { useScrollLock } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'
import { useRoutePath } from 'vuepress/client'
import { useSidebar } from '../composables/sidebar.js'
import type { Slot } from '../types.js'
import { inBrowser } from '../utils/index.js'

const props = defineProps<{
  /**
   * Whether the sidebar is open
   */
  open: boolean
}>()

defineSlots<{
  'sidebar-nav-before'?: Slot
  'sidebar-nav-after'?: Slot
}>()

const { sidebarGroups, hasSidebar } = useSidebar()
const routePath = useRoutePath()

// a11y: focus Nav element when menu has opened
const navEl = ref<HTMLElement | null>(null)
const isLocked = useScrollLock(inBrowser ? document.body : null)

watch(
  [props, navEl],
  () => {
    if (props.open) {
      isLocked.value = true
      navEl.value?.focus()
    } else isLocked.value = false
  },
  { immediate: true, flush: 'post' },
)

onMounted(() => {
  const activeItem = document.querySelector(
    `.vp-sidebar .vp-link[href*="${routePath.value}"]`,
  )
  if (!activeItem || !navEl.value) return

  const { top: navTop, height: navHeight } = navEl.value.getBoundingClientRect()
  const { top: activeTop, height: activeHeight } =
    activeItem.getBoundingClientRect()

  if (activeTop < navTop || activeTop + activeHeight > navTop + navHeight)
    activeItem.scrollIntoView({ block: 'center' })
})
</script>

<template>
  <aside
    v-if="hasSidebar"
    ref="navEl"
    vp-sidebar
    class="vp-sidebar"
    :class="{ open }"
    @click.stop
  >
    <div class="curtain" />

    <nav
      id="VPSidebarNav"
      class="nav"
      aria-labelledby="sidebar-aria-label"
      tabindex="-1"
    >
      <span id="sidebar-aria-label" class="visually-hidden">
        Sidebar Navigation
      </span>

      <slot name="sidebar-nav-before" />

      <div v-for="item in sidebarGroups" :key="item.text" class="group">
        <VPSidebarItem :item="item" :depth="0" />
      </div>

      <slot name="sidebar-nav-after" />
    </nav>
  </aside>
</template>

<style scoped>
.vp-sidebar {
  position: fixed;
  top: var(--vp-layout-top-height, 0);
  bottom: 0;
  left: 0;
  z-index: var(--vp-z-index-sidebar);

  overflow-x: hidden;
  overflow-y: auto;

  width: calc(100vw - 64px);
  max-width: 320px;
  padding: 32px 32px 96px;

  background-color: var(--vp-sidebar-bg-color);
  box-shadow: var(--vp-c-shadow-3);

  opacity: 0;
  overscroll-behavior: contain;

  transition:
    opacity 0.5s,
    transform 0.25s ease;

  transform: translateX(-100%);
}

.vp-sidebar.open {
  opacity: 1;
  visibility: visible;
  transition:
    opacity 0.25s,
    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  transform: translateX(0);
}

[data-theme='dark'] .vp-sidebar {
  box-shadow: var(--vp-shadow-1);
}

@media (min-width: 960px) {
  .vp-sidebar {
    width: var(--vp-sidebar-width);
    max-width: 100%;
    padding-top: var(--vp-nav-height);

    background-color: var(--vp-sidebar-bg-color);
    box-shadow: none;

    opacity: 1;
    visibility: visible;

    transform: translateX(0);
  }
}

@media (min-width: 1440px) {
  .vp-sidebar {
    width: calc(
      (100% - (var(--vp-layout-max-width) - 64px)) / 2 + var(--vp-sidebar-width) -
        32px
    );
    padding-left: max(
      32px,
      calc((100% - (var(--vp-layout-max-width) - 64px)) / 2)
    );
  }
}

@media (min-width: 960px) {
  .curtain {
    position: sticky;
    top: -64px;
    left: 0;
    z-index: 1;

    height: var(--vp-nav-height);
    margin-top: calc(var(--vp-nav-height) * -1);
    margin-right: -32px;
    margin-left: -32px;

    background-color: var(--vp-sidebar-bg-color);
  }
}

.nav {
  outline: 0;
}

.group + .group {
  padding-top: 10px;
  border-top: 1px solid var(--vp-c-divider);
}

@media (min-width: 960px) {
  .group {
    width: calc(var(--vp-sidebar-width) - 64px);
    padding-top: 10px;
  }
}
</style>
