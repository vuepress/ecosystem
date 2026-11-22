<script setup lang="ts">
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'

import { useThemePageFrontmatter } from '../../composables/useThemePageData.js'
import { useLayout } from '../composables/useLayout.js'
import type { ThemeConfig } from '../shared.js'

const theme = useThemeLocaleData<ThemeConfig>()
const frontmatter = useThemePageFrontmatter()
const { hasSidebar } = useLayout()
</script>

<template>
  <footer
    v-if="theme.footer && frontmatter.footer !== false"
    class="vp-footer"
    :class="{ 'has-sidebar': hasSidebar }"
  >
    <div class="container">
      <p v-if="theme.footer.message" class="message">
        <bdi v-html="theme.footer.message" />
      </p>
      <p v-if="theme.footer.copyright" class="copyright">
        <bdi v-html="theme.footer.copyright" />
      </p>
    </div>
  </footer>
</template>

<style scoped>
.vp-footer {
  position: relative;
  z-index: var(--vp-z-index-footer);

  padding: 2rem 1.5rem;
  border-top: 1px solid var(--vp-c-gutter);

  background-color: var(--vp-c-bg);
}

.vp-footer.has-sidebar {
  display: none;
}

.vp-footer :deep(a) {
  transition: color 0.25s;
  text-decoration-line: underline;
  text-underline-offset: 0.125rem;
}

.vp-footer :deep(a:hover) {
  color: var(--vp-c-text-1);
}

@media (min-width: 48rem) {
  .vp-footer {
    padding: 2rem;
  }
}

.container {
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  text-align: center;
}

.message,
.copyright {
  color: var(--vp-c-text-2);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.7142857;
}
</style>
