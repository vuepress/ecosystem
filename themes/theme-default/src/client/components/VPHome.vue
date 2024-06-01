<script setup lang="ts">
import VPHomeFeatures from '@theme/VPHomeFeatures.vue'
import VPHomeFooter from '@theme/VPHomeFooter.vue'
import VPHomeHero from '@theme/VPHomeHero.vue'
import { Content } from 'vuepress/client'
</script>

<template>
  <main class="vp-home">
    <VPHomeHero />
    <VPHomeFeatures />
    <div class="theme-default-content">
      <Content />
    </div>
    <VPHomeFooter />
  </main>
</template>

<style lang="scss">
@import '../styles//variables';

.vp-home {
  padding: var(--navbar-height) 2rem 0;
  max-width: var(--homepage-width);
  margin: 0px auto;
  display: block;

  @media (max-width: $MQMobileNarrow) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .theme-default-content {
    padding: 0;
    margin: 0;
  }
}
</style>
