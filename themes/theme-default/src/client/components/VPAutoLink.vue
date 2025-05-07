<script setup lang="ts">
import type {
  NonNullableSlotContent,
  SlotContent,
} from '@vuepress/helper/client'
import type { AutoLinkConfig } from 'vuepress/client'
import { AutoLink } from 'vuepress/client'

defineProps<{
  /**
   * The auto link config
   */
  config: AutoLinkConfig
}>()

defineSlots<{
  default?: (config: AutoLinkConfig) => NonNullableSlotContent
  before?: (config: AutoLinkConfig) => SlotContent
  after?: (config: AutoLinkConfig) => SlotContent
}>()
</script>

<template>
  <AutoLink :config="config">
    <template v-if="$slots.default" #default>
      <slot v-bind="config" />
    </template>
    <template #before>
      <slot name="before" v-bind="config" />
    </template>
    <template #after>
      <slot name="after" v-bind="config" />
    </template>
  </AutoLink>
</template>
