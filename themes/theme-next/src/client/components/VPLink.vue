<script setup lang="ts">
import { isLinkExternal } from '@vuepress/helper/client'
import { computed } from 'vue'
import { resolveRouteFullPath, useRouter, withBase } from 'vuepress/client'
import type { Slot } from '../types.js'

const props = defineProps<{
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

const tag = computed(() => props.tag ?? (props.href ? 'a' : 'span'))

const isExternal = computed(
  () => (props.href && isLinkExternal(props.href)) || props.target === '_blank',
)
const link = computed(() => {
  if (!props.href) return undefined
  if (isExternal.value) return props.href
  return resolveRouteFullPath(props.href)
})

const linkTo = (e: Event): void => {
  if (!isExternal.value) {
    e.preventDefault()
    if (link.value) {
      router.push(link.value)
    }
  }
}
</script>

<template>
  <Component
    :is="tag"
    class="vp-link"
    :class="{
      'link': link,
      'vp-external-link-icon': isExternal,
      'no-icon': noIcon,
    }"
    :href="withBase(link || '')"
    :target="target ?? (isExternal ? '_blank' : undefined)"
    :rel="rel ?? (isExternal ? 'noopener noreferrer' : undefined)"
    @click="linkTo"
  >
    <slot />
  </Component>
</template>
