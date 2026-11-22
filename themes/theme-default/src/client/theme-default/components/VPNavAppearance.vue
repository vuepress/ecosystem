<script lang="ts" setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { computed, useId } from 'vue'

import { useAppearanceSwitch } from '../composables/useNav.js'
import { useNavOverflow } from '../composables/useNavOverflow.js'
import type { ThemeConfig } from '../shared.js'
import VPSwitchAppearance from './VPSwitchAppearance.vue'

const props = defineProps<{
  /** Labeled row (nav screen and `⋯` menu) instead of the bare switch */
  row?: boolean
  /** Styling context for the row variant */
  screen?: boolean
}>()

const theme = useThemeLocaleData<ThemeConfig>()
const show = useAppearanceSwitch()

// only the inline bar switch participates in the overflow engine
const overflow = props.row ? null : useNavOverflow()

const isCollapsed = computed(() => !!overflow && !overflow.state.appearance)

const labelId = useId()
</script>

<template>
  <div
    v-if="show"
    class="vp-nav-appearance"
    :class="[
      row
        ? screen
          ? 'vp-nav-screen-appearance'
          : 'menu-appearance'
        : 'vp-navbar-appearance',
      { collapsed: isCollapsed },
    ]"
    :ref="
      (el) => overflow?.setClusterEl('appearance', el as HTMLElement | null)
    "
  >
    <p v-if="row" :id="labelId" class="text">
      {{ theme.darkModeSwitchLabel || 'Appearance' }}
    </p>
    <VPSwitchAppearance :aria-labelledby="row ? labelId : undefined" />
  </div>
</template>

<style scoped>
.vp-navbar-appearance {
  display: none;
}

@media (min-width: 48rem) {
  .vp-navbar-appearance {
    display: flex;
    align-items: center;
  }
}

.vp-nav-appearance .text {
  color: var(--vp-c-text-mute);
  font-weight: 500;
  font-size: 0.75rem;
}

/* labeled row inside the nav screen */
.vp-nav-screen-appearance {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-block: 0.75rem;
  padding-inline: 1rem 0.875rem;
  border-radius: 0.5rem;

  background-color: var(--vp-c-bg-soft);
}

.vp-nav-screen-appearance .text {
  line-height: 2;
}

/* labeled row inside the `⋯` menu */
.menu-appearance {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;

  min-width: 11rem;
  padding: 0 0.75rem;
}

/* matches the menu group titles */
.menu-appearance .text {
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 2.2857143;
}
</style>
