<script setup lang="ts">
import VPSocialLinks from '@theme/VPSocialLinks.vue'
import { useData } from '@theme/data'

const { themeLocale } = useData()
</script>

<template>
  <VPSocialLinks
    v-if="themeLocale.socialLinks"
    class="vp-nav-screen-social-links"
    :links="themeLocale.socialLinks"
  />
</template>
