<script lang="ts" setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { inject, ref, watchPostEffect } from 'vue'

import { useDarkMode } from '../../composables/darkMode.js'
import type { DefaultTheme } from '../shared.js'
import VPSwitch from './VPSwitch.vue'

const theme = useThemeLocaleData<DefaultTheme.Config>()
const isDark = useDarkMode()

const toggleAppearance = inject('toggle-appearance', () => {
  isDark.value = !isDark.value
})

const switchTitle = ref('')

watchPostEffect(() => {
  switchTitle.value = isDark.value
    ? theme.value.lightModeSwitchTitle || 'Switch to light theme'
    : theme.value.darkModeSwitchTitle || 'Switch to dark theme'
})
</script>

<template>
  <!-- stable name + aria-checked state; the title stays the action hint -->
  <VPSwitch
    :title="switchTitle"
    class="vp-switch-appearance"
    :aria-label="theme.darkModeSwitchLabel || 'Appearance'"
    :aria-checked="isDark"
    @click="toggleAppearance"
  >
    <span class="vpi-sun sun" aria-hidden="true" />
    <span class="vpi-moon moon" aria-hidden="true" />
  </VPSwitch>
</template>

<style scoped>
.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

[data-theme='dark'] .sun {
  opacity: 0;
}

[data-theme='dark'] .moon {
  opacity: 1;
}

[data-theme='dark'] .vp-switch-appearance :deep(.check) {
  transform: translateX(calc(1.125rem * var(--vp-direction-multiplier)));
}
</style>
