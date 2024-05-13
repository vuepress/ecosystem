<script lang="ts" setup>
import VPNavBarAppearance from '@theme/VPNavBarAppearance.vue'
import VPNavBarExtra from '@theme/VPNavBarExtra.vue'
import VPNavBarHamburger from '@theme/VPNavBarHamburger.vue'
import VPNavBarMenu from '@theme/VPNavBarMenu.vue'
import VPNavBarSearch from '@theme/VPNavBarSearch.vue'
import VPNavBarSocialLinks from '@theme/VPNavBarSocialLinks.vue'
import VPNavBarTitle from '@theme/VPNavBarTitle.vue'
import VPNavBarTranslations from '@theme/VPNavBarTranslations.vue'
import { useWindowScroll } from '@vueuse/core'
import { ref, watchPostEffect } from 'vue'
import { useData } from '../composables/data.js'
import { useSidebar } from '../composables/sidebar.js'

defineProps<{
  isScreenOpen: boolean
}>()

defineEmits<(e: 'toggle-screen') => void>()

const { y } = useWindowScroll()
const { hasSidebar } = useSidebar()
const { frontmatter } = useData()

const classes = ref<Record<string, boolean>>({})

watchPostEffect(() => {
  classes.value = {
    'has-sidebar': hasSidebar.value,
    'home': frontmatter.value.pageLayout === 'home' || !!frontmatter.value.home,
    'top': y.value === 0,
  }
})
</script>

<template>
  <div class="vpNavBar" :class="classes">
    <div class="wrapper">
      <div class="container">
        <div class="title">
          <VPNavBarTitle>
            <template #nav-bar-title-before>
              <slot name="nav-bar-title-before" />
            </template>
            <template #nav-bar-title-after>
              <slot name="nav-bar-title-after" />
            </template>
          </VPNavBarTitle>
        </div>

        <div class="content">
          <div class="content-body">
            <slot name="nav-bar-content-before" />
            <VPNavBarSearch class="search" />
            <VPNavBarMenu class="menu" />
            <VPNavBarTranslations class="translations" />
            <VPNavBarAppearance class="appearance" />
            <VPNavBarSocialLinks class="social-links" />
            <VPNavBarExtra class="extra" />
            <slot name="nav-bar-content-after" />
            <VPNavBarHamburger
              class="hamburger"
              :active="isScreenOpen"
              @click="$emit('toggle-screen')"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="divider">
      <div class="divider-line" />
    </div>
  </div>
</template>

<style scoped>
.vpNavBar {
  position: relative;
  height: var(--vp-nav-height);
  pointer-events: none;
  white-space: nowrap;
  transition: background-color 0.5s;
}

.vpNavBar:not(.home) {
  background-color: var(--vp-nav-bg-color);
}

@media (min-width: 960px) {
  .vpNavBar:not(.home) {
    background-color: transparent;
  }

  .vpNavBar:not(.has-sidebar):not(.home.top) {
    background-color: var(--vp-nav-bg-color);
  }
}

.wrapper {
  padding: 0 8px 0 24px;
}

@media (min-width: 768px) {
  .wrapper {
    padding: 0 32px;
  }
}

@media (min-width: 960px) {
  .vpNavBar.has-sidebar .wrapper {
    padding: 0;
  }
}

.container {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: calc(var(--vp-layout-max-width) - 64px);
  height: var(--vp-nav-height);
  pointer-events: none;
}

.container > .title,
.container > .content {
  pointer-events: none;
}

.container :deep(*) {
  pointer-events: auto;
}

@media (min-width: 960px) {
  .vpNavBar.has-sidebar .container {
    max-width: 100%;
  }
}

.title {
  flex-shrink: 0;
  height: calc(var(--vp-nav-height) - 1px);
  transition: background-color 0.5s;
}

@media (min-width: 960px) {
  .vpNavBar.has-sidebar .title {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    padding: 0 32px;
    width: var(--vp-sidebar-width);
    height: var(--vp-nav-height);
    background-color: transparent;
  }
}

@media (min-width: 1440px) {
  .vpNavBar.has-sidebar .title {
    padding-left: max(
      32px,
      calc((100% - (var(--vp-layout-max-width) - 64px)) / 2)
    );
    width: calc(
      (100% - (var(--vp-layout-max-width) - 64px)) / 2 + var(--vp-sidebar-width) -
        32px
    );
  }
}

.content {
  flex-grow: 1;
}

@media (min-width: 960px) {
  .vpNavBar.has-sidebar .content {
    position: relative;
    z-index: 1;
    padding-right: 32px;
    padding-left: var(--vp-sidebar-width);
  }
}

@media (min-width: 1440px) {
  .vpNavBar.has-sidebar .content {
    padding-right: calc((100vw - var(--vp-layout-max-width)) / 2 + 32px);
    padding-left: calc(
      (100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width)
    );
  }
}

.content-body {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: var(--vp-nav-height);
  transition: background-color 0.5s;
}

@media (min-width: 960px) {
  .vpNavBar:not(.home.top) .content-body {
    position: relative;
    background-color: var(--vp-nav-bg-color);
  }

  .vpNavBar:not(.has-sidebar):not(.home.top) .content-body {
    background-color: transparent;
  }
}

@media (max-width: 767px) {
  .content-body {
    column-gap: 0.5rem;
  }
}

.menu + .translations::before,
.menu + .appearance::before,
.menu + .social-links::before,
.translations + .appearance::before,
.appearance + .social-links::before {
  margin-right: 8px;
  margin-left: 8px;
  width: 1px;
  height: 24px;
  background-color: var(--vp-c-divider);
  content: '';
}

.menu + .appearance::before,
.translations + .appearance::before {
  margin-right: 16px;
}

.appearance + .social-links::before {
  margin-left: 16px;
}

.social-links {
  margin-right: -8px;
}

.divider {
  width: 100%;
  height: 1px;
}

@media (min-width: 960px) {
  .vpNavBar.has-sidebar .divider {
    padding-left: var(--vp-sidebar-width);
  }
}

@media (min-width: 1440px) {
  .vpNavBar.has-sidebar .divider {
    padding-left: calc(
      (100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width)
    );
  }
}

.divider-line {
  width: 100%;
  height: 1px;
  transition: background-color 0.5s;
}

.vpNavBar:not(.home) .divider-line {
  background-color: var(--vp-c-gutter);
}

@media (min-width: 960px) {
  .vpNavBar:not(.home.top) .divider-line {
    background-color: var(--vp-c-gutter);
  }

  .vpNavBar:not(.has-sidebar):not(.home.top) .divider {
    background-color: var(--vp-c-gutter);
  }
}
</style>
