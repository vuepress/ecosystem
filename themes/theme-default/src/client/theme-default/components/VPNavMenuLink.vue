<script lang="ts" setup>
import { inject } from 'vue'

import { navInjectionKey, useNavItemLink } from '../composables/useNav.js'
import type { DefaultTheme } from '../shared.js'
import VPLink from './VPLink.vue'

const props = defineProps<{
  item: DefaultTheme.NavItemWithLink
  screen?: boolean
}>()

const { href, isActiveLink, isCurrentLink } = useNavItemLink(() => props.item)

const nav = inject(navInjectionKey, null)

function onClick() {
  if (props.screen) nav?.closeScreen()
}
</script>

<template>
  <VPLink
    class="vp-nav-menu-link"
    :class="{
      'vp-navbar-menu-link': !screen,
      'vp-nav-screen-menu-link': screen,
      'active': isActiveLink,
    }"
    :aria-current="isCurrentLink ? 'page' : undefined"
    :href
    :target="item.target"
    :rel="item.rel"
    :no-icon="item.noIcon"
    @click="onClick"
  >
    <span dir="auto" v-html="item.text"></span>
  </VPLink>
</template>

<style scoped>
.vp-nav-menu-link {
  color: var(--vp-c-text-1);
  font-weight: 500;
  font-size: 0.875rem;
  transition: color 0.25s;
}

.vp-nav-menu-link:hover,
.vp-nav-menu-link.active {
  color: var(--vp-c-brand-1);
}

.vp-navbar-menu-link {
  display: flex;
  align-items: center;

  min-height: var(--vp-nav-height);
  padding: 0 0.75rem;

  line-height: 1.5;
}

.vp-nav-screen-menu-link {
  display: block;

  padding: 0.75rem 0 0.6875rem;
  border-bottom: 1px solid var(--vp-c-divider);

  line-height: 1.7142857;

  transition:
    border-color 0.25s,
    color 0.25s;
}
</style>
