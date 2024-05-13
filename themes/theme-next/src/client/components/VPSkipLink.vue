<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vuepress/client'

const route = useRoute()
const backToTop = ref()

watch(
  () => route.path,
  () => backToTop.value.focus(),
)

function focusOnTargetAnchor({ target }: Event): void {
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
    class="vpSkipLink visually-hidden"
    @click="focusOnTargetAnchor"
  >
    Skip to content
  </a>
</template>

<style scoped>
.vpSkipLink {
  top: 8px;
  left: 8px;
  padding: 8px 16px;
  z-index: 999;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  color: var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-3);
  background-color: var(--vp-c-bg);
}

.vpSkipLink:focus {
  height: auto;
  width: auto;
  clip: auto;
  clip-path: none;
}

@media (min-width: 1280px) {
  .vpSkipLink {
    top: 14px;
    left: 16px;
  }
}
</style>
