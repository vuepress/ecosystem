<script lang="ts" setup>
import { computed, ref, useId } from 'vue'
import { useRoute } from 'vuepress/client'

import { useThemePageData } from '../../composables/useThemePageData.js'
import type { DefaultTheme } from '../shared.js'
import { isActive } from '../shared.js'
import VPFlyout from './VPFlyout.vue'
import VPMenuGroup from './VPMenuGroup.vue'
import VPMenuLink from './VPMenuLink.vue'
import VPThemeIcon from './VPThemeIcon.vue'

const props = defineProps<{
  item: DefaultTheme.NavItemWithChildren
  /** Accordion inside the nav screen */
  screen?: boolean
  /** Flat titled group inside a menu panel (e.g. the `⋯` menu) */
  menu?: boolean
}>()

const route = useRoute()
const page = useThemePageData()

const isActiveGroup = computed(() => {
  if (props.item.activeMatch) {
    return isActive(
      page.value.filePathRelative ?? '',
      route.hash,
      props.item.activeMatch,
      true,
    )
  }
  return isChildActive(props.item)
})

function isChildActive(navItem: DefaultTheme.NavItem): boolean {
  if ('component' in navItem) return false

  if ('link' in navItem) {
    const href =
      typeof navItem.link === 'function'
        ? navItem.link(page.value)
        : navItem.link

    return isActive(
      page.value.filePathRelative ?? '',
      route.hash,
      navItem.activeMatch || href,
      !!navItem.activeMatch,
    )
  }

  return navItem.items.some(isChildActive)
}

// screen accordion state — resets when the screen unmounts
const isOpen = ref(false)
const groupId = useId()

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <VPMenuGroup
    v-if="menu"
    class="vp-nav-menu-group"
    :text="item.text"
    :icon="item.icon"
    :items="item.items"
  />

  <VPFlyout
    v-else-if="!screen"
    :class="{
      'vp-nav-menu-group': true,
      'vp-navbar-menu-group': true,
      'active': isActiveGroup,
    }"
    :icon="item.icon"
    :button="item.text"
    :items="item.items"
  />

  <div
    v-else
    class="vp-nav-menu-group vp-nav-screen-menu-group"
    :class="{ open: isOpen, active: isActiveGroup }"
  >
    <button
      type="button"
      class="button"
      :aria-expanded="isOpen"
      :aria-controls="groupId"
      @click="toggle"
    >
      <span class="button-text">
        <VPThemeIcon
          v-if="item.icon"
          :icon="item.icon"
          class="button-icon-start"
        />
        <span dir="auto" v-html="item.text"></span>
      </span>
      <span class="vpi-plus button-icon" aria-hidden="true" />
    </button>

    <ul v-show="isOpen" :id="groupId" class="items">
      <template v-for="child in item.items" :key="JSON.stringify(child)">
        <VPMenuLink v-if="'link' in child" :item="child" />
        <li v-else-if="'component' in child">
          <component :is="child.component" v-bind="child.props" screen-menu />
        </li>
        <VPMenuGroup v-else :text="child.text" :items="child.items" />
      </template>
    </ul>
  </div>
</template>

<style scoped>
.vp-nav-screen-menu-group {
  border-bottom: 1px solid var(--vp-c-divider);
  transition: border-color 0.5s;
}

.vp-nav-screen-menu-group.open {
  padding-bottom: 0.625rem;
}

.vp-nav-screen-menu-group.open .button {
  padding-bottom: 0.375rem;
  color: var(--vp-c-brand-1);
}

.vp-nav-screen-menu-group.open .button-icon {
  transform: rotate(45deg);
}

.button {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding-block: 0.75rem 0.6875rem;
  padding-inline: 0 0.25rem;

  color: var(--vp-c-text-1);

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.7142857;

  transition: color 0.25s;
}

.button:hover,
.vp-nav-screen-menu-group.active .button {
  color: var(--vp-c-brand-1);
}

.button-icon {
  transition: transform 0.25s;
}

.button-text {
  display: flex;
  align-items: center;
}

.button-icon-start {
  margin-inline-end: 0.375rem;
}

.items :deep(.vp-menu-group) {
  padding-top: 0.25rem;
}
</style>
