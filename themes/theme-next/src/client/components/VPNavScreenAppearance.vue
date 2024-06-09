<script setup lang="ts">
import VPSwitchAppearance from '@theme/VPSwitchAppearance.vue'
import { useData } from '../composables/data'

const { theme } = useData()
</script>

<template>
  <div
    v-if="theme.appearance && theme.appearance !== 'force-dark'"
    class="vp-nav-screen-appearance"
  >
    <p class="text">
      {{ theme.darkModeSwitchLabel || 'Appearance' }}
    </p>
    <VPSwitchAppearance />
  </div>
</template>

<style scoped>
.vp-nav-screen-appearance {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 14px 12px 16px;
  border-radius: 8px;

  background-color: var(--vp-c-bg-soft);
}

.text {
  color: var(--vp-c-text-2);
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
}
</style>
