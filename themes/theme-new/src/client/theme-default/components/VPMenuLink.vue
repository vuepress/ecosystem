<script lang="ts" setup generic="T extends DefaultTheme.NavItemWithLink">
import { inject } from 'vue'

import {
  navInjectionKey,
  navScreenInjectionKey,
  useNavItemLink,
} from '../composables/useNav.js'
import type { DefaultTheme } from '../shared.js'
import VPLink from './VPLink.vue'

const props = defineProps<{
  item: T
  rel?: string
}>()

const { href, isActiveLink, isCurrentLink } = useNavItemLink(() => props.item)

const screen = inject(navScreenInjectionKey, false)
const nav = inject(navInjectionKey, null)

function onClick() {
  if (screen) nav?.closeScreen()
}

defineOptions({ inheritAttrs: false })
</script>

<template>
  <li class="vp-menu-link">
    <VPLink
      v-bind="$attrs"
      :class="{
        'active': isActiveLink,
        'vp-nav-screen-menu-group-link': screen,
      }"
      :aria-current="isCurrentLink ? 'page' : undefined"
      :href
      :target="item.target"
      :rel="props.rel ?? item.rel"
      :no-icon="item.noIcon"
      @click="onClick"
    >
      <span dir="auto" v-html="item.text"></span>
    </VPLink>
  </li>
</template>

<style scoped>
.vp-menu-group + .vp-menu-link {
  margin: 0.75rem -0.75rem 0;
  padding: 0.75rem 0.75rem 0;
  border-top: 1px solid var(--vp-c-divider);
}

.vp-menu-group .vp-menu-group + .vp-menu-link {
  margin: 0;
  padding: 0.5rem 0 0;
  border-top: 0;
}

.link {
  display: block;

  padding: 0 0.75rem;
  border-radius: 0.375rem;

  color: var(--vp-c-text-1);

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 2.2857143;
  text-align: start;
  white-space: nowrap;

  transition:
    background-color 0.25s,
    color 0.25s;
}

.link:hover {
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-brand-1);
}

.link.active {
  color: var(--vp-c-brand-1);
}

.vp-nav-screen .vp-menu-link {
  margin: 0;
  padding: 0;
  border: none;
}

.vp-nav-screen .link {
  display: block;

  margin-inline-start: 0.75rem;
  padding: 0;
  border-radius: 0;

  font-weight: 400;
  white-space: normal;
}

.vp-nav-screen .link:hover {
  background-color: transparent;
}
</style>
