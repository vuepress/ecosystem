<script lang="ts" setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'

import { useLayout } from '../composables/useLayout.js'
import { provideNavOverflow } from '../composables/useNavOverflow.js'
import type { ThemeConfig } from '../shared.js'
import VPNavAppearance from './VPNavAppearance.vue'
import VPNavBarExtra from './VPNavBarExtra.vue'
import VPNavBarHamburger from './VPNavBarHamburger.vue'
import VPNavBarSearch from './VPNavBarSearch.vue'
import VPNavBarTitle from './VPNavBarTitle.vue'
import VPNavMenu from './VPNavMenu.vue'
import VPNavSocialLinks from './VPNavSocialLinks.vue'
import VPNavTranslations from './VPNavTranslations.vue'

defineProps<{
  isScreenOpen: boolean
}>()

defineEmits<{
  (e: 'toggle-screen'): void
}>()

const theme = useThemeLocaleData<ThemeConfig>()
const { isHome, hasSidebar, hasLocalNav } = useLayout()

const { y } = useWindowScroll()
const isTop = computed(() => y.value <= 0)

const overflow = provideNavOverflow({
  itemsKey: () => JSON.stringify(theme.value.nav ?? null),
})
</script>

<template>
  <div
    class="vp-navbar"
    :class="{
      'has-sidebar': hasSidebar,
      'has-local-nav': !isHome && hasLocalNav,
      'home': isHome,
      'top': isTop,
      'screen-open': isScreenOpen,
    }"
  >
    <div class="wrapper">
      <div class="container">
        <div class="title">
          <VPNavBarTitle>
            <template #nav-bar-title-before
              ><slot name="nav-bar-title-before"
            /></template>
            <template #nav-bar-title-after
              ><slot name="nav-bar-title-after"
            /></template>
          </VPNavBarTitle>
        </div>

        <div class="content">
          <div
            class="content-body"
            :ref="(el) => overflow.setContainerEl(el as HTMLElement | null)"
          >
            <slot name="nav-bar-content-before" />
            <VPNavBarSearch class="search" />
            <VPNavMenu class="menu" />
            <VPNavTranslations class="translations" />
            <VPNavAppearance class="appearance" />
            <VPNavSocialLinks class="social-links" />
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
.vp-navbar {
  /* inline-start edge of the background surface and divider — on doc pages the
     sidebar column paints its own surface up to this offset */
  --vp-nav-col-offset: 0px;
  position: relative;
  z-index: 1;

  height: var(--vp-nav-height);

  white-space: nowrap;

  pointer-events: none;
}

/* the single background surface — every state change below is color-only,
   so nothing ever moves */
.vp-navbar::before {
  content: '';

  position: absolute;
  inset-inline: var(--vp-nav-col-offset) 0;
  top: 0;
  bottom: 0;
  z-index: -1;

  background-color: var(--vp-nav-bg-color);

  backdrop-filter: var(--vp-nav-backdrop-filter);

  transition: background-color 0.25s;
}

/* below 60rem the bar scrolls with the page, so home stays transparent */
.vp-navbar.home::before {
  background-color: transparent;
}

@media (min-width: 60rem) {
  .vp-navbar.home::before {
    background-color: var(--vp-nav-bg-color);
  }

  .vp-navbar.home.top::before {
    background-color: var(--vp-nav-home-bg-color);
    backdrop-filter: none;
  }

  .vp-navbar.has-sidebar {
    --vp-nav-col-offset: var(--vp-sidebar-width);
  }
}

@media (min-width: 90rem) {
  .vp-navbar.has-sidebar {
    --vp-nav-col-offset: calc(
      (100% - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width)
    );
  }
}

.vp-navbar.screen-open::before {
  background-color: var(--vp-nav-bg-color);
  transition: none;
}

/* between 60rem and 80rem the local nav is pinned right under the bar and
   its surface extends up behind it, carrying the paint for both bars */
@media (60rem <= width < 80rem) {
  .vp-navbar.has-local-nav::before {
    background-color: transparent;
    backdrop-filter: none;
  }
}

.wrapper {
  padding-block: 0;
  padding-inline: 1.5rem 0.5rem;
}

@media (min-width: 48rem) {
  .wrapper {
    padding: 0 2rem;
  }
}

.container {
  display: flex;
  justify-content: space-between;

  max-width: calc(var(--vp-layout-max-width) - 4rem);
  height: var(--vp-nav-height);
  margin: 0 auto;

  pointer-events: none;
}

.container > .title,
.container > .content {
  pointer-events: none;
}

.container :deep(*) {
  pointer-events: auto;
}

.title {
  /* below the overflow engine's range the title is the only shrinkable
     piece, truncating instead of running over search and the hamburger */
  min-width: 0;
}

@media (min-width: 48rem) {
  .title {
    /* the overflow engine measures fixed occupancy around a rigid title */
    flex-shrink: 0;
  }
}

@media (min-width: 60rem) {
  /* reserve the sidebar column only when it is present; otherwise the title
     keeps its natural width and search sits right next to it */
  .vp-navbar.has-sidebar .title {
    min-width: calc(var(--vp-sidebar-width) - 2rem);
    max-width: calc(var(--vp-sidebar-width) - 2rem);
  }
}

.content {
  flex-grow: 1;

  /* below the engine's range the controls stay rigid and the title absorbs
     all the shrink */
  flex-shrink: 0;
}

@media (min-width: 48rem) {
  .content {
    flex-shrink: 1;
    min-width: 0;
  }
}

.content-body {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  height: var(--vp-nav-height);
}

@media (min-width: 48rem) {
  /* keeps search on the title's side when there is no nav menu to grow
     into the middle; with a menu present its flex-grow wins and this
     margin resolves to zero */
  .content-body > .search {
    margin-inline-end: auto;
  }
}

/* collapsed into the `⋯` menu — kept mounted (hidden, out of the a11y tree
   and tab order) so its natural width stays measurable */
.content-body > .collapsed {
  position: absolute;
  inset-inline-start: 0;
  top: 0;

  overflow: hidden;

  max-width: 100%;

  visibility: hidden;
}

/* separators between whichever cluster units are currently in the bar */
.content-body
  > :where(.menu, .translations, .appearance, .social-links)
  + :where(.translations, .appearance, .social-links)::before {
  content: '';

  width: 1px;
  height: 1.5rem;
  margin-inline: 0.5rem;

  background-color: var(--vp-c-divider);
}

.content-body > :where(.menu, .translations) + .appearance::before {
  margin-inline-end: 1rem;
}

.content-body > .appearance + .social-links::before {
  margin-inline-start: 1rem;
}

.social-links {
  margin-inline-end: -0.5rem;
}

.divider {
  position: relative;

  /* above the background surface, below the bar's content — an open flyout
     panel overlaps the bar's bottom edge and must cover the rule */
  z-index: -1;

  width: 100%;
  height: 1px;
  padding-inline-start: var(--vp-nav-col-offset);

  /* own layer — Safari otherwise sorts the rule behind the sticky local
     nav's surface in their overlapping row (#5399) */
  transform: translateZ(0);
}

/* the sidebar-column segment of the bottom rule — inset from the column
   edges so it lines up with the sidebar's own group dividers */
.vp-navbar.has-sidebar .divider::before {
  content: '';

  position: absolute;
  inset-inline-start: calc(
    var(--vp-nav-col-offset) - var(--vp-sidebar-width) + 2rem
  );
  top: 0;

  width: calc(var(--vp-sidebar-width) - 4rem);
  height: 1px;

  background-color: var(--vp-c-divider);
}

.divider-line {
  width: 100%;
  height: 1px;
  transition: background-color 0.25s;
}

.vp-navbar:not(.home) .divider-line {
  background-color: var(--vp-nav-divider-color);
}

@media (min-width: 60rem) {
  .vp-navbar:not(.home.top) .divider-line {
    background-color: var(--vp-nav-divider-color);
  }
}

.vp-navbar.screen-open .divider-line {
  background-color: var(--vp-c-divider);
}
</style>
