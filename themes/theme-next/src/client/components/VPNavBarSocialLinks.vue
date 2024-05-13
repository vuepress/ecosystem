<script lang="ts" setup>
import VPSocialLinks from '@theme/VPSocialLinks.vue'
import { useData } from '../composables/data.js'

const { theme } = useData()
</script>

<template>
  <VPSocialLinks
    v-if="theme.socialLinks"
    class="vpNavBarSocialLinks"
    :links="theme.socialLinks"
  />
</template>

<style scoped>
.vpNavBarSocialLinks {
  display: none;
}

@media (min-width: 1280px) {
  .vpNavBarSocialLinks {
    display: flex;
    align-items: center;
  }
}
</style>
