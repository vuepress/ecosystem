<script lang="ts" setup>
import { computed, getCurrentInstance, type Component } from 'vue'

import type { SocialLinkIcon } from '../shared.js'
import { isExternal } from '../shared.js'

const props = defineProps<{
  icon: SocialLinkIcon
  link: string
  ariaLabel?: string
  target?: string
  me: boolean
}>()

// The iconify based `VPIcon` is registered by `@vuepress/plugin-icon`. Resolve
// it from the app context instead of referencing it in the template, so that a
// site which disables the plugin falls back to the letter of the label instead
// of warning about a missing component.
const iconComponent = getCurrentInstance()?.appContext.components.VPIcon as
  | Component
  | undefined

const isSvgIcon = computed(
  () => typeof props.icon === 'object' && 'svg' in props.icon,
)

const svgIcon = computed(() =>
  typeof props.icon === 'object' ? props.icon.svg : '',
)

const label = computed(
  () => props.ariaLabel ?? (typeof props.icon === 'string' ? props.icon : ''),
)

const fallbackLabel = computed(() => label.value.slice(0, 1).toUpperCase())

const qualifiedIcon = computed(() =>
  typeof props.icon === 'string' && !props.icon.includes(':')
    ? `simple-icons:${props.icon}`
    : props.icon,
)
</script>

<template>
  <a
    class="vp-social-link no-icon"
    :href="link"
    :aria-label="label || undefined"
    :target="target ?? (isExternal(link) ? '_blank' : undefined)"
    :rel="me ? 'me noopener' : 'noopener'"
  >
    <!-- a raw SVG is rendered as is, it does not depend on the icon plugin -->
    <span
      v-if="isSvgIcon"
      class="vp-icon vp-icon-svg"
      aria-hidden="true"
      v-html="svgIcon"
    />
    <component
      :is="iconComponent"
      v-else-if="iconComponent"
      :icon="qualifiedIcon"
    />
    <span v-else class="vp-icon vp-icon-fallback" aria-hidden="true">
      {{ fallbackLabel }}
    </span>
  </a>
</template>

<style scoped>
.vp-social-link {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.25rem;
  height: 2.25rem;

  color: var(--vp-c-text-mute);

  transition: color 0.5s;
}

.vp-social-link:hover {
  color: var(--vp-c-text);
  transition: color 0.25s;
}

.vp-social-link > :deep(.vp-icon) {
  width: 1.25rem;
  height: 1.25rem;
}

.vp-social-link :deep(svg) {
  fill: currentcolor;
}

.vp-icon-svg :deep(svg) {
  width: 100%;
  height: 100%;
}

.vp-icon-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1;
}
</style>
