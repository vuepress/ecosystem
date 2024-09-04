<script setup lang="ts">
import VPLocalNavOutlineDropdown from '@theme/VPLocalNavOutlineDropdown.vue'
import { useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { useData } from '../composables/data.js'
import { useLocalNav } from '../composables/local-nav.js'
import { useSidebar } from '../composables/sidebar.js'

defineProps<{
  /**
   * whether the local nav is open
   */
  open: boolean
}>()

defineEmits<{
  openMenu: []
}>()

const { theme, frontmatter } = useData()
const { hasSidebar } = useSidebar()
const { headers, hasLocalNav } = useLocalNav()
const { y } = useWindowScroll()

const navHeight = ref(0)

onMounted(() => {
  navHeight.value = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      '--vp-nav-height',
    ),
    10,
  )
})

const noLocalNavAndNoSidebar = computed(
  () => !hasLocalNav.value && !hasSidebar.value,
)

const classes = computed(() => ({
  'vp-local-nav': true,
  'has-sidebar': hasSidebar.value,
  'empty': !hasLocalNav.value,
  'fixed': noLocalNavAndNoSidebar.value,
}))
</script>

<template>
  <div
    v-if="
      frontmatter.layout !== 'home' &&
      (!noLocalNavAndNoSidebar || y >= navHeight)
    "
    :class="classes"
  >
    <div class="container">
      <button
        v-if="hasSidebar"
        type="button"
        class="menu"
        :aria-expanded="open"
        aria-controls="VPSidebarNav"
        @click="$emit('openMenu')"
      >
        <span class="vpi-align-left menu-icon"></span>
        <span class="menu-text">
          {{ theme.sidebarMenuLabel || 'Menu' }}
        </span>
      </button>

      <VPLocalNavOutlineDropdown :headers="headers" :nav-height="navHeight" />
    </div>
  </div>
</template>

<style scoped>
.vp-local-nav {
  position: sticky;
  top: 0;

  /* rtl:ignore */
  left: 0;
  z-index: var(--vp-z-index-local-nav);

  width: 100%;
  padding-top: var(--vp-layout-top-height, 0);
  border-bottom: 1px solid var(--vp-c-gutter);

  background-color: var(--vp-local-nav-bg-color);
}

.vp-local-nav.fixed {
  position: fixed;
}

@media (min-width: 960px) {
  .vp-local-nav {
    top: var(--vp-nav-height);
  }

  .vp-local-nav.has-sidebar {
    padding-left: var(--vp-sidebar-width);
  }

  .vp-local-nav.empty {
    display: none;
  }
}

@media (min-width: 1280px) {
  .vp-local-nav {
    display: none;
  }
}

@media (min-width: 1440px) {
  .vp-local-nav.has-sidebar {
    padding-left: calc(
      (100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width)
    );
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

  padding: 12px 24px 11px;

  color: var(--vp-c-text-2);

  font-weight: 500;
  font-size: 12px;
  line-height: 24px;

  transition: color 0.5s;
}

.menu:hover {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

@media (min-width: 768px) {
  .menu {
    padding: 0 32px;
  }
}

@media (min-width: 960px) {
  .menu {
    display: none;
  }
}

.menu-icon {
  margin-right: 8px;
  font-size: 14px;
}

.vp-outline-dropdown {
  padding: 12px 24px 11px;
}

@media (min-width: 768px) {
  .vp-outline-dropdown {
    padding: 12px 32px 11px;
  }
}
</style>
