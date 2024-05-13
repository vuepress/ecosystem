<script lang="ts" setup>
import { useNavbarData } from '../composables/nav.js'
import VPNavBarMenuGroup from './VPNavBarMenuGroup.vue'
import VPNavBarMenuLink from './VPNavBarMenuLink.vue'

const navbar = useNavbarData()
</script>

<template>
  <nav
    v-if="navbar.length"
    aria-labelledby="main-nav-aria-label"
    class="vpNavBarMenu"
  >
    <span id="main-nav-aria-label" class="visually-hidden"
      >Main Navigation</span
    >
    <template v-for="item in navbar" :key="item.text">
      <VPNavBarMenuLink v-if="'link' in item" :item="item" />
      <VPNavBarMenuGroup v-else :item="item" />
    </template>
  </nav>
</template>

<style scoped>
.vpNavBarMenu {
  display: none;
}

@media (min-width: 768px) {
  .vpNavBarMenu {
    display: flex;
  }
}
</style>
