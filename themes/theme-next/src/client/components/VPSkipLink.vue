<script setup lang="ts">
import { useTemplateRef, watch } from 'vue'
import { useRoutePath } from 'vuepress/client'

const routePath = useRoutePath()
const backToTop = useTemplateRef<HTMLSpanElement>('backToTop')

watch(routePath, () => backToTop.value?.focus())

const focusOnTargetAnchor = ({ target }: Event): void => {
  const el = document.getElementById(
    decodeURIComponent((target as HTMLAnchorElement).hash).slice(1),
  )

  if (el) {
    const removeTabIndex = (): void => {
      el.removeAttribute('tabindex')
      el.removeEventListener('blur', removeTabIndex)
    }

    el.setAttribute('tabindex', '-1')
    el.addEventListener('blur', removeTabIndex)
    el.focus()
    window.scrollTo(0, 0)
  }
}
</script>

<template>
  <span ref="backToTop" tabindex="-1" />
  <a
    href="#VPContent"
    class="vp-skip-link visually-hidden"
    @click="focusOnTargetAnchor"
  >
    Skip to content
  </a>
</template>

<style scoped>
.vp-skip-link {
  top: 8px;
  left: 8px;
  z-index: 999;

  padding: 8px 16px;
  border-radius: 8px;

  background-color: var(--vp-c-bg);
  color: var(--vp-c-accent);
  box-shadow: var(--vp-shadow-3);

  font-weight: bold;
  font-size: 12px;
  text-decoration: none;
}

.vp-skip-link:focus {
  clip-path: none;
  clip: auto;
  width: auto;
  height: auto;
}

@media (min-width: 1280px) {
  .vp-skip-link {
    top: 14px;
    left: 16px;
  }
}
</style>
