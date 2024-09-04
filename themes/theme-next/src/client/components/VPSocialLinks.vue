<script setup lang="ts">
import VPSocialLink from '@theme/VPSocialLink.vue'
import type { SocialLink } from '../../shared/index.js'

defineProps<{
  /**
   * Social links
   */
  links: SocialLink[]
}>()
</script>

<template>
  <div class="vp-social-links">
    <VPSocialLink
      v-for="{ link, icon, ariaLabel } in links"
      :key="link"
      :icon="icon"
      :link="link"
      :aria-label="ariaLabel"
    />
  </div>
</template>

<style scoped>
.vp-social-links {
  display: flex;
  justify-content: center;
}
</style>
