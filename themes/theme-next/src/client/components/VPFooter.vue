<script setup lang="ts">
import { useData } from '../composables/data.js'
import { useSidebar } from '../composables/sidebar.js'

const { theme, frontmatter } = useData()
const { hasSidebar } = useSidebar()
</script>

<template>
  <footer
    v-if="theme.footer && frontmatter.footer !== false"
    class="vp-footer"
    :class="{ 'has-sidebar': hasSidebar }"
  >
    <div class="container">
      <p
        v-if="theme.footer.message"
        class="message"
        v-html="theme.footer.message"
      ></p>
      <p
        v-if="theme.footer.copyright"
        class="copyright"
        v-html="theme.footer.copyright"
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
  color: var(--vp-c-text-1);
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
  color: var(--vp-c-text-2);
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
}
</style>
