<template>
  <div class="vp-navbar-search">
    <component :is="searchBox" v-if="searchBox" />
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'

// Any @vuepress search plugin registers a global `SearchBox` component. It is
// read from the app context instead of being referenced in the template, so
// that a site without a search plugin does not trigger a
// "Failed to resolve component: SearchBox" warning.
const searchBox = getCurrentInstance()?.appContext.components.SearchBox
</script>
