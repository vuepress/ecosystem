<script lang="ts" setup>
import { computed } from 'vue'

import type { DefaultTheme } from '../shared.js'
import { isExternal } from '../shared.js'

const props = defineProps<{
  icon: DefaultTheme.SocialLinkIcon
  link: string
  ariaLabel?: string
  target?: string
  me: boolean
}>()

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
    :aria-label="ariaLabel ?? (typeof icon === 'string' ? icon : '')"
    :target="target ?? (isExternal(link) ? '_blank' : undefined)"
    :rel="me ? 'me noopener' : 'noopener'"
  >
    <!-- VPIcon is registered globally by @vuepress/plugin-icon -->
    <VPIcon :icon="qualifiedIcon" />
  </a>
</template>

<style scoped>
.vp-social-link {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.25rem;
  height: 2.25rem;

  color: var(--vp-c-text-2);

  transition: color 0.5s;
}

.vp-social-link:hover {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.vp-social-link > :deep(.vp-icon) {
  width: 1.25rem;
  height: 1.25rem;
}

.vp-social-link :deep(svg) {
  fill: currentcolor;
}
</style>
