<script setup lang="ts">
import DropdownTransition from '@theme/DropdownTransition.vue'
import { useToggle } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, toRefs } from 'vue'
import type { PropType } from 'vue'
import { AutoLink, useRoute, useRouter } from 'vuepress/client'
import type { SidebarItem } from '../typings.js'
import { isActiveLinkItem } from '../utils/index.js'

const props = defineProps({
  item: {
    type: Object as PropType<SidebarItem>,
    required: true,
  },
  depth: {
    type: Number,
    required: false,
    default: 0,
  },
})

const { item, depth } = toRefs(props)
const route = useRoute()
const router = useRouter()

const collapsible = computed(
  () => 'collapsible' in item.value && item.value.collapsible,
)
const isActive = computed(() => isActiveLinkItem(item.value, route))
const itemClass = computed(() => ({
  'sidebar-item': true,
  'sidebar-heading': depth.value === 0,
  'active': isActive.value,
  'collapsible': collapsible.value,
}))

const isOpenDefault = computed(() =>
  collapsible.value ? isActive.value : true,
)
const [isOpen, toggleIsOpen] = useToggle(isOpenDefault.value)
const onClick = (e: Event): void => {
  if (collapsible.value) {
    e.preventDefault()
    // toggle open status on click
    toggleIsOpen()
  }
}

// reset open status after navigation
const unregisterRouterHook = router.afterEach((to) => {
  nextTick(() => {
    isOpen.value = isOpenDefault.value
  })
})
onBeforeUnmount(() => {
  unregisterRouterHook()
})
</script>

<template>
  <li>
    <AutoLink v-if="item.link" :class="itemClass" :config="item" />
    <p
      v-else
      tabindex="0"
      :class="itemClass"
      @click="onClick"
      @keydown.enter="onClick"
    >
      {{ item.text }}
      <span
        v-if="collapsible"
        class="arrow"
        :class="isOpen ? 'down' : 'right'"
      />
    </p>

    <DropdownTransition v-if="'children' in item && item.children.length">
      <ul v-show="isOpen" class="sidebar-item-children">
        <SidebarItem
          v-for="child in item.children"
          :key="`${depth}${child.text}${child.link}`"
          :item="child"
          :depth="depth + 1"
        />
      </ul>
    </DropdownTransition>
  </li>
</template>
