<script setup lang="ts">
import type { VNode } from 'vue'
import type { AutoLinkConfig } from 'vuepress/client'
import { AutoLink } from 'vuepress/client'

export interface AutoLinkConfigWithIcon extends AutoLinkConfig {
  icon?: string
}

defineProps<{
  /**
   * The auto link config
   */
  config: AutoLinkConfigWithIcon
}>()

defineSlots<{
  default?: (config: AutoLinkConfigWithIcon) => VNode | VNode[]
  before?: (config: AutoLinkConfigWithIcon) => VNode | VNode[] | null
  after?: (config: AutoLinkConfigWithIcon) => VNode | VNode[] | null
}>()
</script>

<template>
  <AutoLink :config="config">
    <template v-if="$slots.default" #default>
      <slot v-bind="config" />
    </template>
    <template #before>
      <slot name="before" v-bind="config">
        <VPIcon v-if="config.icon" class="auto-link-icon" :icon="config.icon" />
      </slot>
    </template>
    <template #after>
      <slot name="after" v-bind="config" />
    </template>
  </AutoLink>
</template>

<style>
.auto-link-icon {
  margin-inline-end: 0.25em;
}
</style>
