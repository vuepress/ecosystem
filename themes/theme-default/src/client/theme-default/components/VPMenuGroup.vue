<script
  lang="ts"
  setup
  generic="
    T extends
      | NavItemComponent
      | NavItemChildren
      | NavItemWithChildren
      | NavItemWithLink
  "
>
import { computed, inject } from 'vue'

import { navScreenInjectionKey } from '../composables/useNav.js'
import type {
  NavItemChildren,
  NavItemComponent,
  NavItemWithChildren,
  NavItemWithLink,
} from '../shared.js'
import VPMenuLink from './VPMenuLink.vue'
import VPThemeIcon from './VPThemeIcon.vue'

const props = defineProps<{
  text?: string
  icon?: string
  items: T[]
}>()

const screen = inject(navScreenInjectionKey, false)

const hasSubGroups = computed(() =>
  props.items.some((item) => !('link' in item) && !('component' in item)),
)
</script>

<template>
  <li
    class="vp-menu-group"
    :class="{ 'vp-nav-screen-menu-group-section': screen }"
  >
    <p v-if="text" class="title">
      <VPThemeIcon v-if="icon" :icon="icon" class="title-icon" />
      {{ text }}
    </p>

    <ul :class="{ 'sub-groups': hasSubGroups }">
      <template v-for="item in items" :key="JSON.stringify(item)">
        <VPMenuLink v-if="'link' in item" :item />
        <component
          v-else-if="'component' in item"
          :is="item.component"
          v-bind="item.props"
          :screen-menu="screen || undefined"
          :menu="!screen || undefined"
        />
        <VPMenuGroup
          v-else
          :text="item.text"
          :icon="item.icon"
          :items="item.items"
        />
      </template>
    </ul>
  </li>
</template>

<style scoped>
.vp-menu-group {
  margin: 0.75rem -0.75rem 0;
  padding: 0.75rem 0.75rem 0;
  border-top: 1px solid var(--vp-c-divider);
}

.vp-menu-group:first-child {
  margin-top: 0;
  padding-top: 0;
  border-top: 0;
}

.vp-menu-group + .vp-menu-group {
  margin-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.title-icon {
  vertical-align: -0.125em;
  margin-inline-end: 0.375rem;
  font-size: 1.125em;
}

.title {
  padding: 0 0.75rem;

  color: var(--vp-c-text-mute);

  font-weight: 600;
  font-size: 0.875rem;
  line-height: 2.2857143;
  white-space: nowrap;

  transition: color 0.25s;
}

.vp-nav-screen .vp-menu-group {
  margin: 0;
  padding: 0;
  border: none;
}

.vp-nav-screen .title {
  padding: 0;

  font-weight: 700;
  font-size: 0.8125rem;
  line-height: 2.4615385;
  white-space: normal;
}

.vp-menu-group > .sub-groups {
  margin-block: 0.25rem;
  margin-inline: 0.75rem 0;
  padding-inline-start: 0.25rem;
  border-inline-start: 1px solid var(--vp-c-divider);
}

.vp-menu-group .vp-menu-group,
.vp-menu-group .vp-menu-group + .vp-menu-group {
  margin: 0;
  padding: 0.5rem 0 0;
  border-top: 0;
}

.vp-menu-group .vp-menu-group:first-child {
  padding-top: 0;
}
</style>
