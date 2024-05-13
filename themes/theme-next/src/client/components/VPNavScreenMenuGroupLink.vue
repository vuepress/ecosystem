<script lang="ts" setup>
import VPLink from '@theme/VPLink.vue'
import { inject } from 'vue'
import type { ResolvedNavItemWithLink } from '../../shared/resolved/navbar.js'

defineProps<{
  item: ResolvedNavItemWithLink
}>()

const closeScreen = inject('close-screen') as () => void
</script>

<template>
  <VPLink
    class="vpNavScreenMenuGroupLink"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    @click="closeScreen"
  >
    {{ item.text }}
  </VPLink>
</template>

<style scoped>
.vpNavScreenMenuGroupLink {
  display: block;
  margin-left: 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 400;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.vpNavScreenMenuGroupLink:hover {
  color: var(--vp-c-brand-1);
}
</style>
