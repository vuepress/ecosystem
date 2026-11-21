<script setup lang="ts">
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { onKeyStroke } from '@vueuse/core'
import { nextTick, ref, useId, useTemplateRef, watch } from 'vue'
import { onContentUpdated } from 'vuepress/client'

import { resolveTitle } from '../composables/outline.js'
import { useBodyScrollLock } from '../composables/scroll-lock.js'
import type { DefaultTheme } from '../shared.js'
import VPDocOutlineItem from './VPDocOutlineItem.vue'

const props = defineProps<{
  headers: DefaultTheme.OutlineItem[]
  navHeight: number
}>()

const theme = useThemeLocaleData<DefaultTheme.Config>()
const open = ref(false)
const vh = ref(0)
const main = useTemplateRef('main')
const items = useTemplateRef('items')
const itemsId = useId()

// lock body scroll while the dropdown is open to prevent scroll chaining
const isLocked = useBodyScrollLock()

function closeOnClickOutside(e: Event) {
  if (!main.value?.contains(e.target as Node)) {
    open.value = false
  }
}

watch(open, (value) => {
  isLocked.value = value
  if (value) {
    document.addEventListener('click', closeOnClickOutside)
    return
  }
  document.removeEventListener('click', closeOnClickOutside)
})

onKeyStroke('Escape', () => {
  open.value = false
})

onContentUpdated(() => {
  open.value = false
})

function toggle() {
  open.value = !open.value
  vh.value = window.innerHeight + Math.min(window.scrollY - props.navHeight, 0)
}

function onItemClick(e: Event) {
  if ((e.target as HTMLElement).classList.contains('outline-link')) {
    // disable animation on hash navigation when page jumps
    if (items.value) {
      items.value.style.transition = 'none'
    }
    nextTick(() => {
      open.value = false
    })
  }
}

function scrollToTop() {
  open.value = false
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}
</script>

<template>
  <div
    ref="main"
    class="vp-local-nav-outline-dropdown"
    :style="{ '--vp-vh': vh + 'px' }"
    data-allow-mismatch="style"
  >
    <button
      v-if="headers.length > 0"
      type="button"
      :aria-expanded="open"
      :aria-controls="itemsId"
      :class="{ open }"
      @click="toggle"
    >
      <span class="menu-text">{{ resolveTitle(theme) }}</span>
      <span class="vpi-chevron-right icon" aria-hidden="true" />
    </button>
    <button v-else type="button" @click="scrollToTop">
      {{ theme.returnToTopLabel || 'Return to top' }}
    </button>
    <Transition name="flyout">
      <div
        v-if="open"
        ref="items"
        :id="itemsId"
        class="items"
        @click="onItemClick"
      >
        <div class="header">
          <a class="top-link" href="#" @click="scrollToTop">
            {{ theme.returnToTopLabel || 'Return to top' }}
          </a>
        </div>
        <div class="outline">
          <VPDocOutlineItem :headers />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.vp-local-nav-outline-dropdown button {
  position: relative;

  display: block;

  color: var(--vp-c-text-2);

  font-weight: 500;
  font-size: 0.75rem;
  line-height: 2;

  transition: color 0.5s;
}

.vp-local-nav-outline-dropdown button:hover {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.vp-local-nav-outline-dropdown button.open {
  color: var(--vp-c-text-1);
}

.icon {
  display: inline-block;
  vertical-align: middle;

  margin-inline-start: 0.125rem;

  font-size: 0.875rem;

  transition: transform 0.25s;

  transform: rotate(0);
}

@media (min-width: 60rem) {
  .vp-local-nav-outline-dropdown button {
    font-size: 0.875rem;
  }

  .icon {
    font-size: 1rem;
  }
}

.open > .icon {
  transform: rotate(90deg);
}

.items {
  position: absolute;
  inset-inline: 1rem;
  top: 2.5rem;

  display: grid;
  gap: 1px;

  overflow: hidden auto;

  max-height: calc(var(--vp-vh, 100vh) - 5.375rem);
  border: 1px solid var(--vp-c-border);
  border-radius: 0.5rem;

  background-color: var(--vp-c-gutter);
  box-shadow: var(--vp-shadow-3);

  overscroll-behavior: contain;
}

@media (min-width: 60rem) {
  .items {
    inset-inline: calc(var(--vp-sidebar-width) + 2rem) auto;
    width: 20rem;
  }
}

.header {
  background-color: var(--vp-c-bg-soft);
}

.top-link {
  display: block;

  padding: 0 1rem;

  color: var(--vp-c-brand-1);

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 3.4285714;
}

.outline {
  padding: 0.5rem 0;
  background-color: var(--vp-c-bg-soft);
}

.flyout-enter-active {
  transition: all 0.2s ease-out;
}

.flyout-leave-active {
  transition: all 0.15s ease-in;
}

.flyout-enter-from,
.flyout-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}
</style>
