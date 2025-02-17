<script setup lang="ts">
import VPDarkIcon from '@theme/VPDarkIcon.vue'
import VPLightIcon from '@theme/VPLightIcon.vue'
import { useDarkmode } from '@theme/useDarkmode'
import { useThemeLocaleData } from '@theme/useThemeData'

const themeLocale = useThemeLocaleData()
const isDarkmode = useDarkmode()

const toggleColorMode = (): void => {
  isDarkmode.value = !isDarkmode.value
}
</script>

<template>
  <button
    type="button"
    class="vp-toggle-color-mode-button"
    :title="themeLocale.toggleColorMode"
    @click="toggleColorMode"
  >
    <VPLightIcon v-show="!isDarkmode" />
    <VPDarkIcon v-show="isDarkmode" />
  </button>
</template>

<style lang="scss">
.vp-toggle-color-mode-button {
  display: flex;

  margin: auto;
  margin-left: 1rem;
  border: 0;

  background: none;
  color: var(--vp-c-text);

  opacity: 0.8;
  cursor: pointer;

  @media print {
    display: none;
  }

  &:hover {
    opacity: 1;
  }

  .light-icon,
  .dark-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
