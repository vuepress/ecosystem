<script setup lang="ts">
import VPNavScreenAppearance from '@theme/VPNavScreenAppearance.vue'
import VPNavScreenMenu from '@theme/VPNavScreenMenu.vue'
import VPNavScreenSocialLinks from '@theme/VPNavScreenSocialLinks.vue'
import VPNavScreenTranslations from '@theme/VPNavScreenTranslations.vue'
import { useScrollLock } from '@vueuse/core'
import { ref } from 'vue'
import { inBrowser } from '../utils/index.js'

defineProps<{
  open: boolean
}>()

const screen = ref<HTMLElement | null>(null)
const isLocked = useScrollLock(inBrowser ? document.body : null)
</script>

<template>
  <Transition
    name="fade"
    @enter="isLocked = true"
    @after-leave="isLocked = false"
  >
    <div v-if="open" id="VPNavScreen" ref="screen" class="vp-nav-screen">
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
  top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 1px);
  /*rtl:ignore*/
  right: 0;
  bottom: 0;
  /*rtl:ignore*/
  left: 0;
  padding: 0 32px;
  width: 100%;
  background-color: var(--vp-nav-screen-bg-color);
  overflow-y: auto;
  transition: background-color 0.5s;
  pointer-events: auto;
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
  transform: translateY(-8px);
}

@media (min-width: 768px) {
  .vp-nav-screen {
    display: none;
  }
}

.container {
  margin: 0 auto;
  padding: 24px 0 96px;
  max-width: 288px;
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
