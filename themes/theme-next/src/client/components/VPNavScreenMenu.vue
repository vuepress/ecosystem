<script lang="ts" setup>
import VPNavScreenMenuGroup from '@theme/VPNavScreenMenuGroup.vue'
import VPNavScreenMenuLink from '@theme/VPNavScreenMenuLink.vue'
import { useNavbarData } from '../composables/nav.js'

const navbar = useNavbarData()
</script>

<template>
  <nav v-if="navbar.length" class="vpNavScreenMenu">
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
