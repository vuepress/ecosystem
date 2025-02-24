<script setup lang="ts">
import VPSocialLinks from '@theme/VPSocialLinks.vue'
import { useData } from '../composables/data.js'

const { theme } = useData()
</script>

<template>
  <VPSocialLinks
    v-if="theme.socialLinks"
    class="vp-navbar-social-links"
    :links="theme.socialLinks"
  />
</template>

<style scoped>
.vp-navbar-social-links {
  display: none;
}

@media (min-width: 1280px) {
  .vp-navbar-social-links {
    display: flex;
    align-items: center;
  }
}
</style>
