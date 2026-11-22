<script lang="ts" setup>
import { computed } from 'vue'
import { RouteLink } from 'vuepress/client'

import { isLinkExternal, normalizeLink } from '../support/utils.js'

const props = withDefaults(
  defineProps<{
    tag?: string
    href?: string
    noIcon?: boolean
    external?: boolean
    target?: string
    rel?: string
  }>(),
  {
    external: undefined,
  },
)

const tag = computed(() => props.tag ?? (props.href ? 'a' : 'span'))

const isExternal = computed(() =>
  isLinkExternal(props.href, props.target, props.external),
)

/**
 * Whether the link points to another page of the current site, in which case it
 * is rendered as a `RouteLink` so that it goes through the client router
 * instead of reloading the page
 *
 * 链接是否指向站内页面，此时会被渲染为 `RouteLink`，从而走客户端路由而不是刷新页面
 */
const isInternalRoute = computed(
  () => !!props.href && tag.value === 'a' && !isExternal.value,
)

const classes = computed(() => ({
  'link': !!props.href,
  'vp-external-link-icon': isExternal.value,
  'no-icon': props.noIcon,
}))
</script>

<template>
  <RouteLink
    v-if="isInternalRoute"
    class="vp-link"
    :class="classes"
    :to="href!"
  >
    <slot />
  </RouteLink>
  <component
    :is="tag"
    v-else
    class="vp-link"
    :class="classes"
    :href="href ? normalizeLink(href) : undefined"
    :target="target ?? (isExternal ? '_blank' : undefined)"
    :rel="rel ?? (isExternal ? 'noreferrer' : undefined)"
  >
    <slot />
  </component>
</template>

<style scoped>
.vp-external-link-icon::after {
  color: var(--vp-c-text-subtle);
}
</style>
