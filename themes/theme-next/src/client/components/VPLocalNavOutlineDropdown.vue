<script setup lang="ts">
import VPDocOutlineItem from '@theme/VPDocOutlineItem.vue'
import { onKeyStroke } from '@vueuse/core'
import { nextTick, ref, watch } from 'vue'
import { onContentUpdated } from '../composables/content-update.js'
import { useData } from '../composables/data.js'
import { resolveTitle } from '../composables/outline.js'
import type { MenuItem } from '../composables/outline.js'

const props = defineProps<{
  headers: MenuItem[]
  navHeight: number
}>()

const { theme } = useData()
const open = ref(false)
const vh = ref(0)
const main = ref<HTMLDivElement>()
const items = ref<HTMLDivElement>()

function closeOnClickOutside(e: Event): void {
  if (!main.value?.contains(e.target as Node)) {
    open.value = false
  }
}

watch(open, (value) => {
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

function toggle(): void {
  open.value = !open.value
  vh.value = window.innerHeight + Math.min(window.scrollY - props.navHeight, 0)
}

function onItemClick(e: Event): void {
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

function scrollToTop(): void {
  open.value = false
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}
</script>

<template>
  <div
    ref="main"
    class="vpLocalNavOutlineDropdown"
    :style="{ '--vp-vh': vh + 'px' }"
  >
    <button v-if="headers.length > 0" :class="{ open }" @click="toggle">
      <span class="menu-text">{{ resolveTitle(theme) }}</span>
      <span class="vpi-chevron-right icon" />
    </button>
    <button v-else @click="scrollToTop">
      {{ theme.returnToTopLabel || 'Return to top' }}
    </button>
    <Transition name="flyout">
      <div v-if="open" ref="items" class="items" @click="onItemClick">
        <div class="header">
          <a class="top-link" href="#" @click="scrollToTop">
            {{ theme.returnToTopLabel || 'Return to top' }}
          </a>
        </div>
        <div class="outline">
          <VPDocOutlineItem :headers="headers" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.vpLocalNavOutlineDropdown {
  padding: 12px 20px 11px;
}

@media (min-width: 960px) {
  .vpLocalNavOutlineDropdown {
    padding: 12px 36px 11px;
  }
}

.vpLocalNavOutlineDropdown button {
  display: block;
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
  position: relative;
}

.vpLocalNavOutlineDropdown button:hover {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.vpLocalNavOutlineDropdown button.open {
  color: var(--vp-c-text-1);
}

.icon {
  display: inline-block;
  vertical-align: middle;
  margin-left: 2px;
  font-size: 14px;
  transform: rotate(0deg);
  transition: transform 0.25s;
}

@media (min-width: 960px) {
  .vpLocalNavOutlineDropdown button {
    font-size: 14px;
  }

  .icon {
    font-size: 16px;
  }
}

.open > .icon {
  transform: rotate(90deg);
}

.items {
  position: absolute;
  top: 40px;
  right: 16px;
  left: 16px;
  display: grid;
  gap: 1px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background-color: var(--vp-c-gutter);
  max-height: calc(var(--vp-vh, 100vh) - 86px);
  overflow: hidden auto;
  box-shadow: var(--vp-shadow-3);
}

@media (min-width: 960px) {
  .items {
    right: auto;
    left: calc(var(--vp-sidebar-width) + 32px);
    width: 320px;
  }
}

.header {
  background-color: var(--vp-c-bg-soft);
}

.top-link {
  display: block;
  padding: 0 16px;
  line-height: 48px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.outline {
  padding: 8px 0;
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
  transform: translateY(-16px);
}
</style>
