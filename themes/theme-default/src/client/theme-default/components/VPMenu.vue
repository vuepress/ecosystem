<script lang="ts" setup generic="T extends DefaultTheme.NavItem">
import type { DefaultTheme } from '../shared.js'
import VPMenuGroup from './VPMenuGroup.vue'
import VPMenuLink from './VPMenuLink.vue'

defineProps<{
  items?: T[]
}>()
</script>

<template>
  <div class="vp-menu">
    <ul v-if="items" class="items">
      <template v-for="item in items" :key="JSON.stringify(item)">
        <VPMenuLink v-if="'link' in item" :item />
        <component
          v-else-if="'component' in item"
          :is="item.component"
          v-bind="item.props"
          menu
        />
        <VPMenuGroup v-else :text="item.text" :items="item.items" />
      </template>
    </ul>

    <slot />
  </div>
</template>

<style scoped>
.vp-menu {
  overflow-y: auto;

  min-width: 8rem;
  max-height: calc(100vh - var(--vp-nav-height));
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;

  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);

  transition: background-color 0.5s;
}

.vp-menu :deep(.group) {
  margin: 0 -0.75rem;
  padding: 0 0.75rem 0.75rem;
}

.vp-menu :deep(.group + .group) {
  padding: 0.6875rem 0.75rem 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.vp-menu :deep(.group:last-child) {
  padding-bottom: 0;
}

.vp-menu :deep(.group + .item) {
  padding: 0.6875rem 1rem 0;
  border-top: 1px solid var(--vp-c-divider);
}

.vp-menu :deep(.item) {
  padding: 0 1rem;
  white-space: nowrap;
}
</style>
