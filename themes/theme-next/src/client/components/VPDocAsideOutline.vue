<script setup lang="ts">
import VPDocOutlineItem from '@theme/VPDocOutlineItem.vue'
import { ref, shallowRef } from 'vue'
import { onContentUpdated } from '../composables/content-update.js'
import { useData } from '../composables/data.js'
import type { MenuItem } from '../composables/outline.js'
import {
  getHeaders,
  resolveTitle,
  useActiveAnchor,
} from '../composables/outline.js'

const { frontmatter, theme } = useData()

const headers = shallowRef<MenuItem[]>([])

onContentUpdated(() => {
  headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
})

const container = ref<HTMLElement>()
const marker = ref<HTMLElement>()

useActiveAnchor(container, marker)
</script>

<template>
  <nav
    ref="container"
    aria-labelledby="doc-outline-aria-label"
    class="vp-doc-aside-outline"
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
.vp-doc-aside-outline {
  display: none;
}

.vp-doc-aside-outline.has-outline {
  display: block;
}

.content {
  position: relative;

  padding-left: 16px;
  border-left: 1px solid var(--vp-c-divider);

  font-weight: 500;
  font-size: 13px;
}

.outline-marker {
  position: absolute;
  top: 32px;
  left: -1px;
  z-index: 0;

  width: 2px;
  height: 18px;
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
  font-size: 14px;
  line-height: 32px;
}
</style>
