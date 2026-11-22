<script setup lang="ts">
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { useTemplateRef } from 'vue'

import {
  resolveTitle,
  useActiveAnchor,
} from '../composables/useActiveAnchor.js'
import { useLayout } from '../composables/useLayout.js'
import type { ThemeConfig } from '../shared.js'
import VPDocOutlineItem from './VPDocOutlineItem.vue'

const theme = useThemeLocaleData<ThemeConfig>()

const container = useTemplateRef('container')
const marker = useTemplateRef('marker')

const { headers, hasLocalNav } = useLayout()

useActiveAnchor(container, marker)
</script>

<template>
  <nav
    aria-labelledby="doc-outline-aria-label"
    class="vp-doc-aside-outline"
    :class="{ 'has-outline': hasLocalNav }"
    ref="container"
  >
    <div class="content">
      <div class="outline-marker" ref="marker" />

      <div
        aria-level="2"
        class="outline-title"
        id="doc-outline-aria-label"
        role="heading"
      >
        {{ resolveTitle(theme) }}
      </div>

      <VPDocOutlineItem :headers :root="true" />
    </div>
  </nav>
</template>

<style scoped>
.vp-doc-aside-outline {
  display: none;
}

.vp-doc-aside-outline.has-outline {
  display: block;
}

.content {
  position: relative;

  padding-inline-start: 1rem;
  border-inline-start: 1px solid var(--vp-c-divider);

  font-weight: 500;
  font-size: 0.8125rem;
}

.outline-marker {
  position: absolute;
  inset-inline-start: -1px;
  top: 2rem;
  z-index: 0;

  width: 2px;
  height: 1.125rem;
  border-radius: 2px;

  background-color: var(--vp-c-brand-1);

  opacity: 0;

  transition:
    top 0.25s cubic-bezier(0, 1, 0.5, 1),
    background-color 0.5s,
    opacity 0.25s;
}

.outline-title {
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 2.2857143;
}
</style>
