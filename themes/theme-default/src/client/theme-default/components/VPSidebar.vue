<script lang="ts" setup>
import { ref, useTemplateRef, watch } from 'vue'

import { useBodyScrollLock } from '../composables/useBodyScrollLock.js'
import { useLayout } from '../composables/useLayout.js'
import VPSidebarGroup from './VPSidebarGroup.vue'

const { sidebarGroups, hasSidebar } = useLayout()

const props = defineProps<{
  open: boolean
}>()

// a11y: focus Nav element when menu has opened
const navEl = useTemplateRef('navEl')
const isLocked = useBodyScrollLock()

watch(
  [() => props.open, navEl],
  () => {
    if (props.open) {
      isLocked.value = true
      navEl.value?.focus()
    } else isLocked.value = false
  },
  { immediate: true, flush: 'post' },
)

const key = ref(0)

watch(
  sidebarGroups,
  () => {
    key.value += 1
  },
  { deep: true },
)
</script>

<template>
  <aside
    v-if="hasSidebar"
    class="vp-sidebar"
    :class="{ open }"
    ref="navEl"
    @click.stop
  >
    <div class="curtain" />

    <nav
      class="nav"
      id="vp-sidebar-nav"
      aria-labelledby="sidebar-aria-label"
      tabindex="-1"
    >
      <span class="visually-hidden" id="sidebar-aria-label">
        Sidebar Navigation
      </span>

      <slot name="sidebar-nav-before" />
      <VPSidebarGroup :items="sidebarGroups" :key />
      <slot name="sidebar-nav-after" />
    </nav>
  </aside>
</template>

<style scoped>
.vp-sidebar {
  position: fixed;
  inset-inline-start: 0;
  top: var(--vp-layout-top-height, 0);
  bottom: 0;
  z-index: var(--vp-z-index-sidebar);

  overflow: hidden auto;

  width: calc(100vw - 4rem);
  max-width: 20rem;
  padding: 2rem 2rem 6rem;

  background-color: var(--vp-sidebar-bg-color);
  box-shadow: var(--vp-c-shadow-3);

  opacity: 0;
  overscroll-behavior: contain;

  transition:
    opacity 0.5s,
    transform 0.25s ease;

  transform: translateX(calc(-100% * var(--vp-direction-multiplier)));
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

@media (min-width: 60rem) {
  .vp-sidebar {
    width: var(--vp-sidebar-width);
    max-width: 100%;
    padding-top: var(--vp-nav-height);

    background-color: var(--vp-sidebar-bg-color);
    box-shadow: none;

    opacity: 1;
    visibility: visible;

    transition: background-color var(--vp-t-color);

    transform: translateX(0);
  }
}

@media (min-width: 90rem) {
  .vp-sidebar {
    --vp-sidebar-width-offset: calc(
      (100% - (var(--vp-layout-max-width) - 4rem)) / 2
    );
    width: calc(
      var(--vp-sidebar-width-offset) + var(--vp-sidebar-width) - 2rem
    );
    padding-inline-start: max(
      2rem,
      calc((100% - (var(--vp-layout-max-width) - 4rem)) / 2)
    );
  }
}

@media (min-width: 60rem) {
  .curtain {
    position: sticky;
    inset-inline-start: 0;
    top: calc(var(--vp-nav-height) * -1);
    z-index: 1;

    height: var(--vp-nav-height);
    margin-inline: -2rem;
    margin-top: calc(var(--vp-nav-height) * -1);

    background-color: var(--vp-sidebar-bg-color);
  }
}

.nav {
  outline: 0;
}
</style>
