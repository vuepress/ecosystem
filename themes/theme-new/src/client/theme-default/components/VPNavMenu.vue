<script lang="ts" setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'

import { useNavOverflow } from '../composables/nav-overflow.js'
import type { DefaultTheme } from '../shared.js'
import VPNavMenuGroup from './VPNavMenuGroup.vue'
import VPNavMenuLink from './VPNavMenuLink.vue'

const props = defineProps<{
  screen?: boolean
}>()

const theme = useThemeLocaleData<DefaultTheme.Config>()

// bar only — inside the screen every item is always shown
const overflow = props.screen ? null : useNavOverflow()

function isVisible(index: number) {
  return !overflow || index < overflow.state.visibleItemCount
}
</script>

<template>
  <nav
    v-if="theme.nav"
    :aria-label="theme.navMenuLabel || 'Main Navigation'"
    class="vp-nav-menu"
    :class="screen ? 'vp-nav-screen-menu' : 'vp-navbar-menu'"
    :ref="(el) => overflow?.setMenuEl(el as HTMLElement | null)"
  >
    <ul class="list">
      <li
        v-for="(item, index) in theme.nav"
        :key="JSON.stringify(item)"
        :class="{ collapsed: !isVisible(index) }"
        :ref="(el) => overflow?.setItemEl(index, el as HTMLElement | null)"
      >
        <VPNavMenuLink v-if="'link' in item" :item :screen />
        <component
          v-else-if="'component' in item"
          :is="item.component"
          v-bind="item.props"
          :screen-menu="screen || undefined"
        />
        <VPNavMenuGroup v-else :item :screen />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.vp-navbar-menu {
  position: relative;
  display: none;
  min-width: 0;
}

.vp-navbar-menu .list {
  display: flex;
  justify-content: flex-end;
}

/* collapsed into the `⋯` menu — kept mounted (hidden, out of the a11y tree
   and tab order) so its natural width stays measurable */
.vp-navbar-menu .list > li.collapsed {
  position: absolute;
  inset-inline-start: 0;
  top: 0;

  overflow: hidden;

  max-width: 100%;

  visibility: hidden;
}

@media (min-width: 48rem) {
  .vp-navbar-menu {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
  }
}
</style>
