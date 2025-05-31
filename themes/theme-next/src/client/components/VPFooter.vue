<script setup lang="ts">
import { useData } from '@theme/data'
import { useSidebar } from '@theme/sidebar'

const { themeLocale, frontmatter } = useData()
const { hasSidebar } = useSidebar()
</script>

<template>
  <footer
    v-if="themeLocale.footer && frontmatter.footer !== false"
    vp-footer
    class="vp-footer"
    :class="{ 'has-sidebar': hasSidebar }"
  >
    <div class="container">
      <p
        v-if="themeLocale.footer.message"
        class="message"
        v-html="themeLocale.footer.message"
      ></p>
      <p
        v-if="themeLocale.footer.copyright"
        class="copyright"
        v-html="themeLocale.footer.copyright"
      ></p>
    </div>
  </footer>
</template>

<style scoped>
.vp-footer {
  position: relative;
  z-index: var(--vp-z-index-footer);

  padding: 32px 24px;
  border-top: 1px solid var(--vp-c-gutter);

  background-color: var(--vp-c-bg);
}

.vp-footer.has-sidebar {
  display: none;
}

.vp-footer :deep(a) {
  transition: color 0.25s;
  text-decoration-line: underline;
  text-underline-offset: 2px;
}

.vp-footer :deep(a:hover) {
  color: var(--vp-c-text);
}

@media (min-width: 768px) {
  .vp-footer {
    padding: 32px;
  }
}

.container {
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  text-align: center;
}

.message,
.copyright {
  color: var(--vp-c-text-mute);
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
}
</style>
