<script setup lang="ts">
import VPSocialLinks from '@theme/VPSocialLinks.vue'
import { useData } from '../composables/data.js'

const { theme } = useData()
</script>

<template>
  <VPSocialLinks
    v-if="theme.socialLinks"
    class="vp-nav-screen-social-links"
    :links="theme.socialLinks"
  />
</template>
