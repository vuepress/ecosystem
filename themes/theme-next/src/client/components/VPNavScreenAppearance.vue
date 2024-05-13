<script lang="ts" setup>
import VPSwitchAppearance from '@theme/VPSwitchAppearance.vue'
import { useData } from '../composables/data'

const { theme } = useData()
</script>

<template>
  <div
    v-if="theme.appearance && theme.appearance !== 'force-dark'"
    class="vpNavScreenAppearance"
  >
    <p class="text">
      {{ theme.darkModeSwitchLabel || 'Appearance' }}
    </p>
    <VPSwitchAppearance />
  </div>
</template>

<style scoped>
.vpNavScreenAppearance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 12px 14px 12px 16px;
  background-color: var(--vp-c-bg-soft);
}

.text {
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
