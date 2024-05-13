<script lang="ts" setup>
import VPSwitchAppearance from '@theme/VPSwitchAppearance.vue'
import { useData } from '../composables/data.js'

const { theme } = useData()
</script>

<template>
  <div
    v-if="theme.appearance && theme.appearance !== 'force-dark'"
    class="vpNavBarAppearance"
  >
    <VPSwitchAppearance />
  </div>
</template>

<style scoped>
.vpNavBarAppearance {
  display: none;
}

@media (min-width: 1280px) {
  .vpNavBarAppearance {
    display: flex;
    align-items: center;
  }
}
</style>
