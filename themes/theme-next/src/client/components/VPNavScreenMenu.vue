<script setup lang="ts">
import VPNavScreenMenuGroup from '@theme/VPNavScreenMenuGroup.vue'
import VPNavScreenMenuLink from '@theme/VPNavScreenMenuLink.vue'
import { useNavbarData } from '@theme/nav'

const navbar = useNavbarData()
</script>

<template>
  <nav v-if="navbar.length" class="vp-nav-screen-menu">
    <template v-for="item in navbar" :key="item.text">
      <VPNavScreenMenuLink v-if="'link' in item" :item="item" />
      <VPNavScreenMenuGroup
        v-else
        :text="item.text || ''"
        :items="item.items"
      />
    </template>
  </nav>
</template>
