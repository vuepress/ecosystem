<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import type { Component } from 'vue'

const {
  /**
   * The icon name, an Iconify name or a theme icon class / 图标名称，Iconify
   * 名称或主题图标类名
   */
  icon,
} = defineProps<{
  icon: string
}>()

// The iconify based `VPIcon` is registered by `@vuepress/plugin-icon`. Resolve
// it from the app context instead of referencing it in the template, so that a
// site without the plugin does not trigger a
// "Failed to resolve component: VPIcon" warning.
const iconComponent = getCurrentInstance()?.appContext.components.VPIcon as
  | Component
  | undefined

const isClassIcon = icon.startsWith('vpi-')
</script>

<template>
  <span v-if="isClassIcon" :class="icon" class="vp-theme-icon" />
  <component
    :is="iconComponent"
    v-else-if="iconComponent"
    class="vp-theme-icon"
    :icon="icon"
  />
</template>

<style scoped>
.vp-theme-icon {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 1em;
  height: 1em;
}
</style>
