<script setup lang="ts">
import VPSwitchAppearance from '@theme/VPSwitchAppearance.vue'
import { useData } from '@theme/data'

const { themeLocale } = useData()
</script>

<template>
  <div
    v-if="themeLocale.appearance && themeLocale.appearance !== 'force-dark'"
    class="vp-navbar-appearance"
  >
    <VPSwitchAppearance />
  </div>
</template>

<style scoped>
.vp-navbar-appearance {
  display: none;
}

@media (min-width: 1280px) {
  .vp-navbar-appearance {
    display: flex;
    align-items: center;
  }
}
</style>
