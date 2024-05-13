<script setup lang="ts">
import VPLink from '@theme/VPLink.vue'
import { computed } from 'vue'
import type { SidebarItem } from '../../shared/index.js'
import { useSidebarControl } from '../composables/sidebar.js'

const props = defineProps<{
  item: SidebarItem
  depth: number
}>()

const {
  collapsed,
  collapsible,
  isLink,
  isActiveLink,
  hasActiveLink,
  hasChildren,
  toggle,
} = useSidebarControl(computed(() => props.item))

const sectionTag = computed(() => (hasChildren.value ? 'section' : `div`))

const linkTag = computed(() => (isLink.value ? 'a' : 'div'))

const textTag = computed(() => {
  return !hasChildren.value
    ? 'p'
    : props.depth + 2 === 7
      ? 'p'
      : `h${props.depth + 2}`
})

const itemRole = computed(() => (isLink.value ? undefined : 'button'))

const classes = computed(() => [
  [`level-${props.depth}`],
  { collapsible: collapsible.value },
  { collapsed: collapsed.value },
  { 'is-link': isLink.value },
  { 'is-active': isActiveLink.value },
  { 'has-active': hasActiveLink.value },
])

function onItemInteraction(e: MouseEvent | Event): void {
  if ('key' in e && e.key !== 'Enter') {
    return
  }
  !props.item.link && toggle()
}

function onCaretClick(): void {
  props.item.link && toggle()
}
</script>

<template>
  <component :is="sectionTag" class="vpSidebarItem" :class="classes">
    <div
      v-if="item.text"
      class="item"
      :role="itemRole"
      :tabindex="item.items && 0"
      v-on="
        item.items
          ? { click: onItemInteraction, keydown: onItemInteraction }
          : {}
      "
    >
      <div class="indicator" />

      <VPLink
        v-if="item.link"
        :tag="linkTag"
        class="link"
        :href="item.link"
        :rel="item.rel"
        :target="item.target"
      >
        <component :is="textTag" class="text" v-html="item.text" />
      </VPLink>
      <component :is="textTag" v-else class="text" v-html="item.text" />

      <div
        v-if="item.collapsed != null && item.items && item.items.length"
        class="caret"
        role="button"
        aria-label="toggle section"
        tabindex="0"
        @click="onCaretClick"
        @keydown.enter="onCaretClick"
      >
        <span class="vpi-chevron-right caret-icon" />
      </div>
    </div>

    <div v-if="item.items && item.items.length" class="items">
      <template v-if="depth < 5">
        <VPSidebarItem
          v-for="i in item.items"
          :key="i.text"
          :item="i"
          :depth="depth + 1"
        />
      </template>
    </div>
  </component>
</template>

<style scoped>
.vpSidebarItem.level-0 {
  padding-bottom: 24px;
}

.vpSidebarItem.collapsed.level-0 {
  padding-bottom: 10px;
}

.item {
  position: relative;
  display: flex;
  width: 100%;
}

.vpSidebarItem.collapsible > .item {
  cursor: pointer;
}

.indicator {
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: -17px;
  width: 2px;
  border-radius: 2px;
  transition: background-color 0.25s;
}

.vpSidebarItem.level-2.is-active > .item > .indicator,
.vpSidebarItem.level-3.is-active > .item > .indicator,
.vpSidebarItem.level-4.is-active > .item > .indicator,
.vpSidebarItem.level-5.is-active > .item > .indicator {
  background-color: var(--vp-c-brand-1);
}

.link {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.text {
  flex-grow: 1;
  padding: 4px 0;
  line-height: 24px;
  font-size: 14px;
  transition: color 0.25s;
}

.vpSidebarItem.level-0 .text {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.vpSidebarItem.level-1 .text,
.vpSidebarItem.level-2 .text,
.vpSidebarItem.level-3 .text,
.vpSidebarItem.level-4 .text,
.vpSidebarItem.level-5 .text {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.vpSidebarItem.level-0.is-link > .item > .link:hover .text,
.vpSidebarItem.level-1.is-link > .item > .link:hover .text,
.vpSidebarItem.level-2.is-link > .item > .link:hover .text,
.vpSidebarItem.level-3.is-link > .item > .link:hover .text,
.vpSidebarItem.level-4.is-link > .item > .link:hover .text,
.vpSidebarItem.level-5.is-link > .item > .link:hover .text {
  color: var(--vp-c-brand-1);
}

.vpSidebarItem.level-0.has-active > .item > .text,
.vpSidebarItem.level-1.has-active > .item > .text,
.vpSidebarItem.level-2.has-active > .item > .text,
.vpSidebarItem.level-3.has-active > .item > .text,
.vpSidebarItem.level-4.has-active > .item > .text,
.vpSidebarItem.level-5.has-active > .item > .text,
.vpSidebarItem.level-0.has-active > .item > .link > .text,
.vpSidebarItem.level-1.has-active > .item > .link > .text,
.vpSidebarItem.level-2.has-active > .item > .link > .text,
.vpSidebarItem.level-3.has-active > .item > .link > .text,
.vpSidebarItem.level-4.has-active > .item > .link > .text,
.vpSidebarItem.level-5.has-active > .item > .link > .text {
  color: var(--vp-c-text-1);
}

.vpSidebarItem.level-0.is-active > .item .link > .text,
.vpSidebarItem.level-1.is-active > .item .link > .text,
.vpSidebarItem.level-2.is-active > .item .link > .text,
.vpSidebarItem.level-3.is-active > .item .link > .text,
.vpSidebarItem.level-4.is-active > .item .link > .text,
.vpSidebarItem.level-5.is-active > .item .link > .text {
  color: var(--vp-c-brand-1);
}

.caret {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -7px;
  width: 32px;
  height: 32px;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: color 0.25s;
  flex-shrink: 0;
}

.item:hover .caret {
  color: var(--vp-c-text-2);
}

.item:hover .caret:hover {
  color: var(--vp-c-text-1);
}

.caret-icon {
  font-size: 18px;
  transform: rotate(90deg);
  transition: transform 0.25s;
}

.vpSidebarItem.collapsed .caret-icon {
  transform: rotate(0);
}

.vpSidebarItem.level-1 .items,
.vpSidebarItem.level-2 .items,
.vpSidebarItem.level-3 .items,
.vpSidebarItem.level-4 .items,
.vpSidebarItem.level-5 .items {
  border-left: 1px solid var(--vp-c-divider);
  padding-left: 16px;
}

.vpSidebarItem.collapsed .items {
  display: none;
}
</style>
