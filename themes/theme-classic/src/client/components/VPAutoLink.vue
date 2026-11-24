<script setup lang="ts">
import type { RequiredSlot, Slot } from '@vuepress/helper/client'
import { computed } from 'vue'
import type { AutoLinkConfig } from 'vuepress/client'
import { AutoLink, resolveRoutePath, useRoute } from 'vuepress/client'
import { isLinkWithProtocol, splitPath } from 'vuepress/shared'

import VPThemeIcon from '@theme/VPThemeIcon.vue'

const { config } = defineProps<{
  /** The auto link config, with an optional icon resolved from the page */
  config: AutoLinkConfig & { icon?: string }
}>()

const route = useRoute()

/**
 * Whether the link points to a page of the current site
 *
 * It uses the same rule as `AutoLink`, which renders an internal link as a
 * `RouteLink` and an external one as an `<a>` element.
 */
const isInternalLink = computed(
  () => !isLinkWithProtocol(config.link) && config.target !== '_blank',
)

/**
 * Whether the link points to the current page
 *
 * The hash and the query are ignored, so that a link to an anchor of the
 * current page is also marked as the current page.
 */
const isCurrentPage = computed(
  () =>
    isInternalLink.value &&
    resolveRoutePath(splitPath(config.link).pathname, route.path) ===
      route.path,
)

defineSlots<{
  default?: RequiredSlot<AutoLinkConfig>
  before?: Slot<AutoLinkConfig>
  after?: Slot<AutoLinkConfig>
}>()
</script>

<template>
  <AutoLink :config="config" :aria-current="isCurrentPage ? 'page' : undefined">
    <template v-if="$slots.default" #default>
      <slot v-bind="config" />
    </template>
    <template #before>
      <VPThemeIcon
        v-if="config.icon"
        :icon="config.icon"
        class="vp-auto-link-icon"
      />
      <slot name="before" v-bind="config" />
    </template>
    <template #after>
      <slot name="after" v-bind="config" />
    </template>
  </AutoLink>
</template>

<style scoped>
.vp-auto-link-icon {
  vertical-align: middle;
  margin-inline-end: 0.25rem;
}
</style>
