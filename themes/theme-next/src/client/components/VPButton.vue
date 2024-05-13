<script setup lang="ts">
import { isLinkExternal } from '@vuepress/helper/client'
import { computed } from 'vue'
import { resolveRoutePath, useRouter } from 'vuepress/client'

interface Props {
  tag?: string
  size?: 'medium' | 'big'
  theme?: 'brand' | 'alt' | 'sponsor'
  text: string
  href?: string
  target?: string
  rel?: string
}
const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  theme: 'brand',
  href: undefined,
  tag: undefined,
  target: undefined,
  rel: undefined,
})

const router = useRouter()

const isExternal = computed(() => props.href && isLinkExternal(props.href))

const component = computed(() => {
  return props.tag || props.href ? 'a' : 'button'
})

const link = computed(() => {
  if (!props.href) return undefined
  if (isExternal.value) return props.href
  return resolveRoutePath(props.href)
})

function linkTo(e: Event): void {
  if (!isExternal.value) {
    e.preventDefault()
    if (link.value) router.push({ path: link.value })
  }
}
</script>

<template>
  <Component
    :is="component"
    class="vpButton"
    :class="[size, theme]"
    :href="link"
    :target="props.target ?? (isExternal ? '_blank' : undefined)"
    :rel="props.rel ?? (isExternal ? 'noreferrer' : undefined)"
    @click="linkTo"
  >
    {{ text }}
  </Component>
</template>

<style scoped>
.vpButton {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition:
    color 0.25s,
    border-color 0.25s,
    background-color 0.25s;
}

.vpButton:active {
  transition:
    color 0.1s,
    border-color 0.1s,
    background-color 0.1s;
}

.vpButton.medium {
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
}

.vpButton.big {
  border-radius: 24px;
  padding: 0 24px;
  line-height: 46px;
  font-size: 16px;
}

.vpButton.brand {
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
}

.vpButton.brand:hover {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-button-brand-hover-bg);
}

.vpButton.brand:active {
  border-color: var(--vp-button-brand-active-border);
  color: var(--vp-button-brand-active-text);
  background-color: var(--vp-button-brand-active-bg);
}

.vpButton.alt {
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

.vpButton.alt:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.vpButton.alt:active {
  border-color: var(--vp-button-alt-active-border);
  color: var(--vp-button-alt-active-text);
  background-color: var(--vp-button-alt-active-bg);
}

.vpButton.sponsor {
  border-color: var(--vp-button-sponsor-border);
  color: var(--vp-button-sponsor-text);
  background-color: var(--vp-button-sponsor-bg);
}

.vpButton.sponsor:hover {
  border-color: var(--vp-button-sponsor-hover-border);
  color: var(--vp-button-sponsor-hover-text);
  background-color: var(--vp-button-sponsor-hover-bg);
}

.vpButton.sponsor:active {
  border-color: var(--vp-button-sponsor-active-border);
  color: var(--vp-button-sponsor-active-text);
  background-color: var(--vp-button-sponsor-active-bg);
}
</style>
