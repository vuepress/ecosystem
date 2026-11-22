<script lang="ts" setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { computed } from 'vue'

import { useNavOverflow } from '../composables/useNavOverflow.js'
import type { ThemeConfig } from '../shared.js'
import VPSocialLinks from './VPSocialLinks.vue'

const props = defineProps<{
  screen?: boolean
}>()

const theme = useThemeLocaleData<ThemeConfig>()

const overflow = props.screen ? null : useNavOverflow()

const isCollapsed = computed(() => !!overflow && !overflow.state.socialLinks)
</script>

<template>
  <VPSocialLinks
    v-if="theme.socialLinks"
    class="vp-nav-social-links"
    :class="[
      screen ? 'vp-nav-screen-social-links' : 'vp-navbar-social-links',
      { collapsed: isCollapsed },
    ]"
    :links="theme.socialLinks"
    :ref="
      (inst: any) => overflow?.setClusterEl('socialLinks', inst?.$el ?? null)
    "
  />
</template>

<style scoped>
.vp-navbar-social-links {
  display: none;
}

@media (min-width: 48rem) {
  .vp-navbar-social-links {
    display: flex;
    align-items: center;
  }
}
</style>
