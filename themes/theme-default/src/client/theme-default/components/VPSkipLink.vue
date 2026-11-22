<script lang="ts" setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { useTemplateRef, watch } from 'vue'
import { useRoute } from 'vuepress/client'

import type { ThemeConfig } from '../shared.js'

defineProps<{
  // the component has two root nodes, so `inert` can't fall through
  inert?: boolean
}>()

const theme = useThemeLocaleData<ThemeConfig>()
const route = useRoute()
const backToTop = useTemplateRef('backToTop')

watch(
  () => route.path,
  () => backToTop.value?.focus(),
)
</script>

<template>
  <span ref="backToTop" tabindex="-1" />
  <a href="#vp-content" class="vp-skip-link visually-hidden" :inert>
    {{ theme.skipToContentLabel || 'Skip to content' }}
  </a>
</template>

<style scoped>
.vp-skip-link {
  position: fixed;
  inset-inline-start: 0.5rem;
  top: 0.5rem;
  z-index: 999;

  padding: 0.5rem 1rem;
  border-radius: 0.5rem;

  background-color: var(--vp-c-bg);
  color: var(--vp-c-brand);
  box-shadow: var(--vp-shadow-3);

  font-weight: bold;
  font-size: 0.75rem;
  text-decoration: none;
}

.vp-skip-link:focus {
  clip-path: none;
  clip: auto;
  width: auto;
  height: auto;
}

@media (min-width: 80rem) {
  .vp-skip-link {
    inset-inline-start: 1rem;
    top: 0.875rem;
  }
}
</style>
