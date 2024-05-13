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
    <div v-if="open" id="VPNavScreen" ref="screen" class="vpNavScreen">
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
.vpNavScreen {
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

.vpNavScreen.fade-enter-active,
.vpNavScreen.fade-leave-active {
  transition: opacity 0.25s;
}

.vpNavScreen.fade-enter-active .container,
.vpNavScreen.fade-leave-active .container {
  transition: transform 0.25s ease;
}

.vpNavScreen.fade-enter-from,
.vpNavScreen.fade-leave-to {
  opacity: 0;
}

.vpNavScreen.fade-enter-from .container,
.vpNavScreen.fade-leave-to .container {
  transform: translateY(-8px);
}

@media (min-width: 768px) {
  .vpNavScreen {
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
