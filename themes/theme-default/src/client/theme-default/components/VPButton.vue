<script setup lang="ts">
import { computed } from 'vue'
import { RouteLink } from 'vuepress/client'

import { EXTERNAL_URL_RE } from '../shared.js'
import { normalizeLink } from '../support/utils.js'

interface Props {
  tag?: string
  size?: 'medium' | 'big'
  theme?: 'brand' | 'alt' | 'sponsor'
  text?: string
  href?: string
  target?: string
  rel?: string
}
const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  theme: 'brand',
})

const isExternal = computed(
  () => !!props.href && EXTERNAL_URL_RE.test(props.href),
)

const component = computed(() => {
  return props.tag || (props.href ? 'a' : 'button')
})

/**
 * Whether the button links to another page of the current site, so that the
 * client router handles it instead of reloading the page
 *
 * 按钮是否链接到站内页面，此时由客户端路由处理而不是刷新页面
 */
const isInternalRoute = computed(
  () => !!props.href && component.value === 'a' && !isExternal.value,
)
</script>

<template>
  <RouteLink
    v-if="isInternalRoute"
    class="vp-button no-icon"
    :class="[size, theme]"
    :to="href!"
  >
    <slot>{{ text }}</slot>
  </RouteLink>
  <component
    :is="component"
    v-else
    class="vp-button no-icon"
    :class="[size, theme]"
    :href="href ? normalizeLink(href) : undefined"
    :target="props.target ?? (isExternal ? '_blank' : undefined)"
    :rel="props.rel ?? (isExternal ? 'noreferrer' : undefined)"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<style scoped>
.vp-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid transparent;

  font-weight: 600;
  text-align: center;
  text-decoration: none;
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
  height: 2.5rem;
  padding: 0 1.25rem;
  border-radius: 1.25rem;
  font-size: 0.875rem;
}

.vp-button.big {
  height: 3rem;
  padding: 0 1.5rem;
  border-radius: 1.5rem;
  font-size: 1rem;
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
