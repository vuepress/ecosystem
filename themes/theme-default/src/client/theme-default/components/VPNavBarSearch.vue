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

<style scoped>
.vp-navbar-search {
  display: flex;
  align-items: center;
}

@media (min-width: 48rem) {
  .vp-navbar-search {
    gap: 0.5rem;
    padding-inline-start: 1.5rem;
  }
}

@media (min-width: 60rem) {
  .vp-navbar-search {
    padding-inline-start: 2rem;
  }
}
</style>
