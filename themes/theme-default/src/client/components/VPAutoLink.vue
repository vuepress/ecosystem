<script setup lang="ts">
import type { RequiredSlot, Slot } from '@vuepress/helper/client'
import type { AutoLinkConfig } from 'vuepress/client'
import { AutoLink } from 'vuepress/client'

const { config } = defineProps<{
  /**
   * The auto link config
   */
  config: AutoLinkConfig
}>()

defineSlots<{
  default?: RequiredSlot<AutoLinkConfig>
  before?: Slot<AutoLinkConfig>
  after?: Slot<AutoLinkConfig>
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
