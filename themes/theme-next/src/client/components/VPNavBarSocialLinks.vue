<script setup lang="ts">
import VPSocialLinks from '@theme/VPSocialLinks.vue'
import { useData } from '@theme/data'

const { themeLocale } = useData()
</script>

<template>
  <VPSocialLinks
    v-if="themeLocale.socialLinks"
    class="vp-navbar-social-links"
    :links="themeLocale.socialLinks"
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
