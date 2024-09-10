<script setup lang="ts">
import VPSwitch from '@theme/VPSwitch.vue'
import { computed, inject } from 'vue'
import { useDarkMode } from '../composables/dark-mode.js'
import { useData } from '../composables/data.js'

const { theme } = useData()
const isDark = useDarkMode()

const toggleAppearance = inject('toggle-appearance', () => {
  isDark.value = !isDark.value
})

const switchTitle = computed(() =>
  isDark.value
    ? theme.value.lightModeSwitchTitle || 'Switch to light theme'
    : theme.value.darkModeSwitchTitle || 'Switch to dark theme',
)
</script>

<template>
  <VPSwitch
    :title="switchTitle"
    class="vp-switch-appearance"
    :aria-checked="isDark"
    @click="toggleAppearance"
  >
    <span class="vpi-sun sun" />
    <span class="vpi-moon moon" />
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
  /* rtl:ignore */
  transform: translateX(18px);
}
</style>
