<script setup lang="ts">
import { isLinkExternal } from '@vuepress/helper/client'
import { computed } from 'vue'
import { resolveRouteFullPath, useRouter, withBase } from 'vuepress/client'

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

declare const __VUEPRESS_BASE__: string

const router = useRouter()

const isExternal = computed(
  () =>
    (props.href && isLinkExternal(props.href), __VUEPRESS_BASE__) ||
    props.target === '_blank',
)

const component = computed(() => {
  return props.tag || props.href ? 'a' : 'button'
})

const link = computed(() => {
  if (!props.href) return undefined
  if (isExternal.value) return props.href
  return resolveRouteFullPath(props.href)
})

const linkTo = (e: Event): void => {
  if (!isExternal.value) {
    e.preventDefault()
    if (link.value) router.push({ path: link.value })
  }
}
</script>

<template>
  <Component
    :is="component"
    class="vp-button"
    :class="[size, theme]"
    :href="withBase(link || '')"
    :target="props.target ?? (isExternal ? '_blank' : undefined)"
    :rel="props.rel ?? (isExternal ? 'noreferrer' : undefined)"
    @click="linkTo"
  >
    {{ text }}
  </Component>
</template>

<style scoped>
.vp-button {
  display: inline-block;

  border: 1px solid transparent;

  font-weight: 600;
  text-align: center;
  white-space: nowrap;

  transition:
    color 0.25s,
    border-color 0.25s,
    background-color 0.25s;
}

.vp-button:active {
  transition:
    color 0.1s,
    border-color 0.1s,
    background-color 0.1s;
}

.vp-button.medium {
  padding: 0 20px;
  border-radius: 20px;
  font-size: 14px;
  line-height: 38px;
}

.vp-button.big {
  padding: 0 24px;
  border-radius: 24px;
  font-size: 16px;
  line-height: 46px;
}

.vp-button.brand {
  border-color: var(--vp-button-brand-border);
  background-color: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}

.vp-button.brand:hover {
  border-color: var(--vp-button-brand-hover-border);
  background-color: var(--vp-button-brand-hover-bg);
  color: var(--vp-button-brand-hover-text);
}

.vp-button.brand:active {
  border-color: var(--vp-button-brand-active-border);
  background-color: var(--vp-button-brand-active-bg);
  color: var(--vp-button-brand-active-text);
}

.vp-button.alt {
  border-color: var(--vp-button-alt-border);
  background-color: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
}

.vp-button.alt:hover {
  border-color: var(--vp-button-alt-hover-border);
  background-color: var(--vp-button-alt-hover-bg);
  color: var(--vp-button-alt-hover-text);
}

.vp-button.alt:active {
  border-color: var(--vp-button-alt-active-border);
  background-color: var(--vp-button-alt-active-bg);
  color: var(--vp-button-alt-active-text);
}

.vp-button.sponsor {
  border-color: var(--vp-button-sponsor-border);
  background-color: var(--vp-button-sponsor-bg);
  color: var(--vp-button-sponsor-text);
}

.vp-button.sponsor:hover {
  border-color: var(--vp-button-sponsor-hover-border);
  background-color: var(--vp-button-sponsor-hover-bg);
  color: var(--vp-button-sponsor-hover-text);
}

.vp-button.sponsor:active {
  border-color: var(--vp-button-sponsor-active-border);
  background-color: var(--vp-button-sponsor-active-bg);
  color: var(--vp-button-sponsor-active-text);
}
</style>
