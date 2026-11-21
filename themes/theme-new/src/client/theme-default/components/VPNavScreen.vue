<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { provide } from 'vue'

import { navScreenInjectionKey, useNav } from '../composables/nav.js'
import { useBodyScrollLock } from '../composables/scroll-lock.js'
import VPNavAppearance from './VPNavAppearance.vue'
import VPNavMenu from './VPNavMenu.vue'
import VPNavSocialLinks from './VPNavSocialLinks.vue'
import VPNavTranslations from './VPNavTranslations.vue'

const props = defineProps<{
  open: boolean
}>()

const isLocked = useBodyScrollLock()

provide(navScreenInjectionKey, true)

const { closeScreen, screenTriggerEl } = useNav()

onKeyStroke('Escape', () => {
  if (!props.open) return
  closeScreen()
  screenTriggerEl.value?.focus()
})
</script>

<template>
  <transition
    name="fade"
    @enter="isLocked = true"
    @after-leave="isLocked = false"
  >
    <div v-if="open" class="vp-nav-screen" id="vp-nav-screen">
      <div class="container">
        <slot name="nav-screen-content-before" />
        <VPNavMenu screen class="menu" />
        <VPNavTranslations screen class="translations" />
        <VPNavAppearance row screen class="appearance" />
        <VPNavSocialLinks screen class="social-links" />
        <slot name="nav-screen-content-after" />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.vp-nav-screen {
  position: fixed;
  inset: 0;

  overflow-y: auto;

  width: 100%;
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 1px)
    2rem 0;

  background-color: var(--vp-nav-screen-bg-color);

  pointer-events: auto;
  overscroll-behavior: contain;

  transition: background-color 0.25s;
}

.vp-nav-screen.fade-enter-active,
.vp-nav-screen.fade-leave-active {
  transition: opacity 0.25s;
}

.vp-nav-screen.fade-enter-active .container,
.vp-nav-screen.fade-leave-active .container {
  transition: transform 0.25s ease;
}

.vp-nav-screen.fade-enter-from,
.vp-nav-screen.fade-leave-to {
  opacity: 0;
}

.vp-nav-screen.fade-enter-from .container,
.vp-nav-screen.fade-leave-to .container {
  transform: translateY(-0.5rem);
}

@media (min-width: 48rem) {
  .vp-nav-screen {
    display: none;
  }
}

.container {
  max-width: 18rem;
  margin: 0 auto;
  padding: 1.5rem 0 6rem;
}

.menu + .translations,
.menu + .appearance,
.translations + .appearance {
  margin-top: 1.5rem;
}

.menu + .social-links {
  margin-top: 1rem;
}

.appearance + .social-links {
  margin-top: 1rem;
}
</style>
