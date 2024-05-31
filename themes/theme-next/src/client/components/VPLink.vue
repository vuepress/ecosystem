<script setup lang="ts">
import { isLinkExternal } from '@vuepress/helper/client'
import { computed } from 'vue'
import { resolveRoutePath, useRouter, withBase } from 'vuepress/client'

const props = defineProps<{
  tag?: string
  href?: string
  noIcon?: boolean
  target?: string
  rel?: string
}>()

const router = useRouter()

const tag = computed(() => props.tag ?? (props.href ? 'a' : 'span'))

const isExternal = computed(
  () => (props.href && isLinkExternal(props.href)) || props.target === '_blank',
)
const link = computed(() => {
  if (!props.href) return undefined
  if (isExternal.value) return props.href
  return resolveRoutePath(props.href)
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
