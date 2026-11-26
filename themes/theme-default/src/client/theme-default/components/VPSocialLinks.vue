<script lang="ts" setup>
import type { SocialLink } from '../shared.js'
import VPSocialLink from './VPSocialLink.vue'

withDefaults(
  defineProps<{
    links: SocialLink[]
    me?: boolean
  }>(),
  {
    me: true,
  },
)
</script>

<template>
  <ul class="vp-social-links">
    <li v-for="{ link, icon, ariaLabel, target } in links" :key="link">
      <VPSocialLink :icon :link :ariaLabel :target :me />
    </li>
  </ul>
</template>

<style scoped>
.vp-social-links {
  display: flex;
  justify-content: center;
}

/* Reset styles from vp-doc if used in markdown */
.vp-doc .vp-social-links,
.vp-doc .vp-social-links > li {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
