<script setup lang="ts">
import VPNavScreenAppearance from '@theme/VPNavScreenAppearance.vue'
import VPNavScreenMenu from '@theme/VPNavScreenMenu.vue'
import VPNavScreenSocialLinks from '@theme/VPNavScreenSocialLinks.vue'
import VPNavScreenTranslations from '@theme/VPNavScreenTranslations.vue'
import { inBrowser } from '@theme/constants'
import { useScrollLock } from '@vueuse/core'
import type { Slot } from '../types.js'

const { open } = defineProps<{
  /**
   * Whether the screen is open
   */
  open: boolean
}>()

defineSlots<{
  'nav-screen-content-before'?: Slot
  'nav-screen-content-after'?: Slot
}>()

const isLocked = useScrollLock(inBrowser ? document.body : null)
</script>

<template>
  <Transition
    name="fade"
    @enter="isLocked = true"
    @after-leave="isLocked = false"
  >
    <div v-if="open" id="VPNavScreen" class="vp-nav-screen">
      <div class="container">
        <slot name="nav-screen-content-before" />
        <VPNavScreenMenu class="menu" />
        <VPNavScreenTranslations class="translations" />
        <VPNavScreenAppearance class="appearance" />
        <VPNavScreenSocialLinks class="social-links" />
        <slot name="nav-screen-content-after" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.vp-nav-screen {
  position: fixed;
  top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px));

  /* rtl:ignore */
  right: 0;
  bottom: 0;

  /* rtl:ignore */
  left: 0;

  overflow-y: auto;

  width: 100%;
  padding: 0 32px;

  background-color: var(--vp-nav-screen-bg-color);

  pointer-events: auto;

  transition: background-color var(--vp-t-color);
}

.vp-nav-screen.fade-enter-active,
.vp-nav-screen.fade-leave-active {
  transition: opacity var(--vp-t-color);
}

.vp-nav-screen.fade-enter-active .container,
.vp-nav-screen.fade-leave-active .container {
  transition: transform var(--vp-t-color);
}

.vp-nav-screen.fade-enter-from,
.vp-nav-screen.fade-leave-to {
  opacity: 0;
}

.vp-nav-screen.fade-enter-from .container,
.vp-nav-screen.fade-leave-to .container {
  transform: translateY(-8px);
}

@media (min-width: 768px) {
  .vp-nav-screen {
    display: none;
  }
}

.container {
  max-width: 288px;
  margin: 0 auto;
  padding: 24px 0 96px;
}

.menu + .translations,
.menu + .appearance,
.translations + .appearance {
  margin-top: 24px;
}

.menu + .social-links {
  margin-top: 16px;
}

.appearance + .social-links {
  margin-top: 16px;
}
</style>
