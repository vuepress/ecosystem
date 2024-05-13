<script lang="ts" setup>
import VPSocialLink from '@theme/VPSocialLink.vue'
import type { SocialLink } from '../../shared/index.js'

defineProps<{
  links: SocialLink[]
}>()
</script>

<template>
  <div class="vpSocialLinks">
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
.vpSocialLinks {
  display: flex;
  justify-content: center;
}
</style>
