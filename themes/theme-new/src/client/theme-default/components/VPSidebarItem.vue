<script setup lang="ts">
import { computed } from 'vue'

import { useSidebarItemControl } from '../composables/sidebar.js'
import type { DefaultTheme } from '../shared.js'
import VPLink from './VPLink.vue'

const props = defineProps<{
  item: DefaultTheme.SidebarItem
  depth: number
}>()

const {
  collapsed,
  collapsible,
  isLink,
  isActiveLink,
  isCurrentLink,
  hasActiveLink,
  hasChildren,
  toggle,
} = useSidebarItemControl(computed(() => props.item))

const linkTag = computed(() => (isLink.value ? 'a' : 'div'))

const textTag = computed(() =>
  hasChildren.value && props.depth < 5 ? `h${props.depth + 2}` : 'p',
)

// a section needs a heading
const sectionTag = computed(() =>
  props.item.text && textTag.value !== 'p' ? 'section' : 'div',
)

function onItemClick() {
  !props.item.link && toggle()
}
</script>

<template>
  <component
    :is="sectionTag"
    class="vp-sidebar-item"
    :class="[
      `level-${depth}`,
      {
        collapsible,
        collapsed,
        'is-link': isLink,
        'is-active': isActiveLink,
        'has-active': hasActiveLink,
      },
    ]"
  >
    <div v-if="item.text" class="item" @click="onItemClick">
      <div class="indicator" />

      <VPLink
        v-if="item.link"
        :tag="linkTag"
        class="link"
        :aria-current="isCurrentLink ? 'page' : undefined"
        :href="item.link"
        :rel="item.rel"
        :target="item.target"
      >
        <component :is="textTag" class="text"
          ><bdi v-html="item.text"
        /></component>
      </VPLink>
      <component v-else :is="textTag" class="text"
        ><bdi v-html="item.text"
      /></component>

      <button
        v-if="item.collapsed != null && item.items && item.items.length"
        type="button"
        class="caret"
        aria-label="toggle section"
        :aria-expanded="!collapsed"
        @click.stop="toggle"
      >
        <span class="vpi-chevron-right caret-icon" />
      </button>
    </div>

    <ul v-if="item.items && item.items.length" class="items">
      <li v-if="depth < 5">
        <VPSidebarItem
          v-for="i in item.items"
          :key="i.text"
          :item="i"
          :depth="depth + 1"
        />
      </li>
    </ul>
  </component>
</template>

<style scoped>
.vp-sidebar-item.level-0 {
  padding-bottom: 1.5rem;
}

.vp-sidebar-item.collapsed.level-0 {
  padding-bottom: 0.625rem;
}

.item {
  position: relative;
  display: flex;
  width: 100%;
}

.vp-sidebar-item.collapsible > .item {
  cursor: pointer;
}

.indicator {
  position: absolute;
  inset-inline-start: calc(-1rem - 1px);
  top: 0.375rem;
  bottom: 0.375rem;

  width: 2px;
  border-radius: 2px;

  transition: background-color 0.25s;
}

.vp-sidebar-item.level-2.is-active > .item > .indicator,
.vp-sidebar-item.level-3.is-active > .item > .indicator,
.vp-sidebar-item.level-4.is-active > .item > .indicator,
.vp-sidebar-item.level-5.is-active > .item > .indicator {
  background-color: var(--vp-c-brand-1);
}

.link {
  display: flex;
  flex-grow: 1;
  align-items: center;
}

.text {
  flex-grow: 1;

  padding: 0.25rem 0;

  font-size: 0.875rem;
  line-height: 1.7142857;

  transition: color 0.25s;
}

.vp-sidebar-item.level-0 .text {
  color: var(--vp-c-text-1);
  font-weight: 700;
}

.vp-sidebar-item.level-1 .text,
.vp-sidebar-item.level-2 .text,
.vp-sidebar-item.level-3 .text,
.vp-sidebar-item.level-4 .text,
.vp-sidebar-item.level-5 .text {
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.vp-sidebar-item.level-0.is-link > .item > .link:hover .text,
.vp-sidebar-item.level-1.is-link > .item > .link:hover .text,
.vp-sidebar-item.level-2.is-link > .item > .link:hover .text,
.vp-sidebar-item.level-3.is-link > .item > .link:hover .text,
.vp-sidebar-item.level-4.is-link > .item > .link:hover .text,
.vp-sidebar-item.level-5.is-link > .item > .link:hover .text {
  color: var(--vp-c-brand-1);
}

.vp-sidebar-item.level-0.has-active > .item > .text,
.vp-sidebar-item.level-1.has-active > .item > .text,
.vp-sidebar-item.level-2.has-active > .item > .text,
.vp-sidebar-item.level-3.has-active > .item > .text,
.vp-sidebar-item.level-4.has-active > .item > .text,
.vp-sidebar-item.level-5.has-active > .item > .text,
.vp-sidebar-item.level-0.has-active > .item > .link > .text,
.vp-sidebar-item.level-1.has-active > .item > .link > .text,
.vp-sidebar-item.level-2.has-active > .item > .link > .text,
.vp-sidebar-item.level-3.has-active > .item > .link > .text,
.vp-sidebar-item.level-4.has-active > .item > .link > .text,
.vp-sidebar-item.level-5.has-active > .item > .link > .text {
  color: var(--vp-c-text-1);
}

.vp-sidebar-item.level-0.is-active > .item .link > .text,
.vp-sidebar-item.level-1.is-active > .item .link > .text,
.vp-sidebar-item.level-2.is-active > .item .link > .text,
.vp-sidebar-item.level-3.is-active > .item .link > .text,
.vp-sidebar-item.level-4.is-active > .item .link > .text,
.vp-sidebar-item.level-5.is-active > .item .link > .text {
  color: var(--vp-c-brand-1);
}

.caret {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 2rem;
  margin-inline-end: -0.4375rem;

  color: var(--vp-c-text-3);

  cursor: pointer;

  transition: color 0.25s;
}

.item:hover .caret {
  color: var(--vp-c-text-2);
}

.item:hover .caret:hover {
  color: var(--vp-c-text-1);
}

.caret-icon {
  font-size: 1.125rem;
  transition: transform 0.25s;
  transform: rotate(90deg);
}

.vp-sidebar-item.collapsed .caret-icon {
  transform: rotate(0);
}

.vp-sidebar-item.level-1 .items,
.vp-sidebar-item.level-2 .items,
.vp-sidebar-item.level-3 .items,
.vp-sidebar-item.level-4 .items,
.vp-sidebar-item.level-5 .items {
  padding-inline-start: 1rem;
  border-inline-start: 1px solid var(--vp-c-divider);
}

.vp-sidebar-item.collapsed .items {
  display: none;
}
</style>
