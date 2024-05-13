<script setup lang="ts">
import VPDocOutlineItem from '@theme/VPDocOutlineItem.vue'
import { ref, shallowRef } from 'vue'
import { onContentUpdated } from '../composables/content-update.js'
import { useData } from '../composables/data.js'
import {
  getHeaders,
  resolveTitle,
  useActiveAnchor,
} from '../composables/outline.js'
import type { MenuItem } from '../composables/outline.js'

const { frontmatter, theme } = useData()

const headers = shallowRef<MenuItem[]>([])

onContentUpdated(() => {
  headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
})

const container = ref()
const marker = ref()

useActiveAnchor(container, marker)
</script>

<template>
  <nav
    ref="container"
    aria-labelledby="doc-outline-aria-label"
    class="vpDocAsideOutline"
    :class="{ 'has-outline': headers.length > 0 }"
    role="navigation"
  >
    <div class="content">
      <div ref="marker" class="outline-marker" />

      <div
        id="doc-outline-aria-label"
        aria-level="2"
        class="outline-title"
        role="heading"
      >
        {{ resolveTitle(theme) }}
      </div>

      <VPDocOutlineItem :headers="headers" :root="true" />
    </div>
  </nav>
</template>

<style scoped>
.vpDocAsideOutline {
  display: none;
}

.vpDocAsideOutline.has-outline {
  display: block;
}

.content {
  position: relative;
  border-left: 1px solid var(--vp-c-divider);
  padding-left: 16px;
  font-size: 13px;
  font-weight: 500;
}

.outline-marker {
  position: absolute;
  top: 32px;
  left: -1px;
  z-index: 0;
  opacity: 0;
  width: 2px;
  border-radius: 2px;
  height: 18px;
  background-color: var(--vp-c-brand-1);
  transition:
    top 0.25s cubic-bezier(0, 1, 0.5, 1),
    background-color 0.5s,
    opacity 0.25s;
}

.outline-title {
  line-height: 32px;
  font-size: 14px;
  font-weight: 600;
}
</style>
