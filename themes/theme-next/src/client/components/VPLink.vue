<script setup lang="ts">
import { useData } from '@theme/data'
import { isLinkExternal } from '@vuepress/helper/client'
import { computed } from 'vue'
import {
  resolveRouteFullPath,
  useRoute,
  useRouter,
  withBase,
} from 'vuepress/client'
import type { Slot } from '../types.js'

const {
  tag = undefined,
  href = undefined,
  noIcon = false,
  target = '',
  rel = '',
} = defineProps<{
  /**
   * element tag
   */
  tag?: string
  /**
   * link
   */
  href?: string
  /**
   * whether to remove the icon
   */
  noIcon?: boolean
  /**
   * link target
   */
  target?: string
  /**
   * link rel
   */
  rel?: string
}>()

defineSlots<{ default?: Slot }>()

const router = useRouter()
const route = useRoute()
const { page } = useData()

const tagName = computed(() => tag ?? (href ? 'a' : 'span'))

const isExternal = computed(() => {
  if (!href) return false
  if (target === '_blank' || isLinkExternal(href)) return true
  const filename = href.split(/[#?]/)[0]?.split('/').pop() || ''
  if (filename === '' || filename.endsWith('.html') || filename.endsWith('.md'))
    return false
  return filename.includes('.')
})

const link = computed(() => {
  if (!href) return undefined
  if (isExternal.value) return href
  const currentPath = page.value.filePathRelative
    ? `/${page.value.filePathRelative}`
    : undefined
  const path = resolveRouteFullPath(href, currentPath)
  if (path.includes('#')) {
    if (path.slice(0, path.indexOf('#')) === route.path) {
      return path.slice(path.indexOf('#'))
    }
  }
  return path
})

const linkTo = (e: Event): void => {
  if (!isExternal.value && link.value) {
    e.preventDefault()
    router.push(link.value)
  }
}
</script>

<template>
  <Component
    :is="tagName"
    class="vp-link"
    :class="{
      'link': link,
      'vp-external-link-icon': isExternal,
      'no-icon': noIcon,
    }"
    :href="link ? withBase(link) : undefined"
    :target="target ?? (isExternal ? '_blank' : undefined)"
    :rel="rel ?? (isExternal ? 'noopener noreferrer' : undefined)"
    @click="linkTo($event)"
  >
    <slot />
  </Component>
</template>
