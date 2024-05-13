<script lang="ts" setup>
import { computed } from 'vue'
import type { SocialLinkIcon } from '../../shared/index.js'

const props = defineProps<{
  icon: SocialLinkIcon
  link: string
  ariaLabel?: string
}>()

const svg = computed(() => {
  if (typeof props.icon === 'object') return props.icon.svg
  return `<span class="vpi-social-${props.icon}" />`
})
</script>

<template>
  <a
    class="vpSocialLink no-icon"
    :href="link"
    :aria-label="ariaLabel ?? (typeof icon === 'string' ? icon : '')"
    target="_blank"
    rel="noopener"
    v-html="svg"
  ></a>
</template>

<style scoped>
.vpSocialLink {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
}

.vpSocialLink:hover {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.vpSocialLink > :deep(svg),
.vpSocialLink > :deep([class^='vpi-social-']) {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>
