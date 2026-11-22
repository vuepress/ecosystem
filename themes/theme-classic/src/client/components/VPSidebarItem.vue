<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vuepress/client'

import { isActiveSidebarItem } from '@theme/isActiveSidebarItem'
import VPAutoLink from '@theme/VPAutoLink.vue'
import VPDropdownTransition from '@theme/VPDropdownTransition.vue'

import type { SidebarGroupItem, SidebarItem } from '../typings.js'

const { item, depth = 0 } = defineProps<{
  /** The sidebar item to be rendered */
  item: SidebarItem
  /** The depth of the current sidebar item */
  depth?: number
}>()

const route = useRoute()
const router = useRouter()

const collapsible = computed(() => (item as SidebarGroupItem).collapsible)
const hasChildren = computed(
  () => 'children' in item && item.children.length > 0,
)
/** Whether the item is rendered as a button to toggle its children */
const isDisclosure = computed(
  () => collapsible.value && !item.link && hasChildren.value,
)
const isActive = computed(() => isActiveSidebarItem(item, route))
const itemClass = computed(() => ({
  'vp-sidebar-item': true,
  'vp-sidebar-heading': depth === 0,
  'active': isActive.value,
  // Only items that can be clicked (a link or a disclosure button) show a
  // pointer cursor.
  'collapsible': collapsible.value && (Boolean(item.link) || hasChildren.value),
}))

const isOpenDefault = computed(() =>
  collapsible.value ? isActive.value : true,
)

const [isOpen, toggleIsOpen] = useToggle(isOpenDefault.value)

// reset open status after navigation
const unregisterRouterHook = router.afterEach(() => {
  void nextTick().then(() => {
    isOpen.value = isOpenDefault.value
  })
})
onBeforeUnmount(() => {
  unregisterRouterHook()
})
</script>

<template>
  <li>
    <VPAutoLink v-if="item.link" :class="itemClass" :config="item">
      <template #after>
        <span
          v-if="collapsible"
          class="arrow"
          :class="isOpen ? 'down' : 'right'"
        />
      </template>
    </VPAutoLink>
    <button
      v-else-if="isDisclosure"
      type="button"
      :class="itemClass"
      :aria-expanded="isOpen"
      @click="toggleIsOpen()"
    >
      {{ item.text }}
      <span class="arrow" :class="isOpen ? 'down' : 'right'" />
    </button>
    <p v-else :class="itemClass">
      {{ item.text }}
    </p>

    <VPDropdownTransition v-if="hasChildren">
      <ul v-show="isOpen" class="vp-sidebar-children">
        <VPSidebarItem
          v-for="child in item.children"
          :key="`${depth}${child.text}${child.link}`"
          :item="child"
          :depth="depth + 1"
        />
      </ul>
    </VPDropdownTransition>
  </li>
</template>

<style lang="scss">
@use '../styles/mixins';
@use '../styles/variables' as *;

.vp-sidebar-item {
  border-inline-start: 0.25rem solid transparent;
  color: var(--vp-c-text);
  cursor: default;

  &:focus-visible {
    outline-width: 1px;
    outline-offset: -1px;
  }

  &:is(button) {
    border-block: 0;
    border-inline-end: 0;
    border-radius: 0;

    background: none;

    font-family: inherit;
    line-height: inherit;
    text-align: start;

    appearance: none;
  }

  &.vp-sidebar-heading {
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding-block: 0.35rem;
    padding-inline: 1.25rem 1.5rem;

    font-weight: bold;
    font-size: 1.1em;

    transition: color 0.15s ease;

    + .vp-sidebar-children {
      @include mixins.dropdown-wrapper;

      margin-bottom: 0.75rem;
    }
  }

  &.collapsible {
    cursor: pointer;
  }

  &:not(.vp-sidebar-heading) {
    display: inline-block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding-block: 0.35rem;
    padding-inline: 2rem 1rem;

    font-weight: 400;
    font-size: 1em;
    line-height: 1.4;

    + .vp-sidebar-children {
      padding-inline-start: 1rem;
      font-size: 0.95em;
    }

    .vp-sidebar-children .vp-sidebar-children & {
      padding-block: 0.25rem;
      padding-inline: 1.75rem 1rem;

      &.active {
        border-inline-start-color: transparent;
        font-weight: 500;
      }
    }

    a.vp-sidebar-heading + .vp-sidebar-children &.active {
      border-inline-start-color: transparent;
    }
  }

  &.active:not(:is(p, button).vp-sidebar-heading) {
    border-inline-start-color: var(--vp-c-accent);
    color: var(--vp-c-accent);
    font-weight: 600;
  }

  .auto-link {
    display: block;
  }

  &.auto-link {
    display: block;
    cursor: pointer;

    &:hover {
      color: var(--vp-c-accent);
    }
  }
}
</style>
